import { NextResponse } from "next/server";
import { Resend } from "resend";

// Reçoit les messages du site :
// - type "contact" : formulaire « publication » (accueil, fenêtre du pied de page) et carte postale (/contact)
// - type "rdv-strategie" : rendez-vous offert de la page Stratégie d'entreprise
// - type "rdv-sport" : rendez-vous offert de la page Management sportif

type Payload = Record<string, unknown>;

const LABELS: Record<string, string> = {
  firstName: "Prénom",
  lastName: "Nom",
  name: "Nom",
  email: "Email",
  phone: "Téléphone",
  profile: "Vous êtes",
  company: "Entreprise",
  club: "Club actuel",
  level: "Niveau de pratique",
  position: "Poste / spécialité",
  message: "Message",
};

const SUBJECTS: Record<string, (who: string) => string> = {
  contact: (who) => `Nouveau message de ${who} via zuriagency.fr`,
  "rdv-strategie": (who) => `Rendez-vous stratégie demandé par ${who}`,
  "rdv-sport": (who) => `Rendez-vous sportif demandé par ${who}`,
  candidature: (who) => `Nouvelle candidature talent de ${who}`,
};

const clean = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 5000) : "");

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Payload;
    const type = clean(body.type) || "contact";
    const fields: Record<string, string> = {};
    for (const k of Object.keys(LABELS)) {
      const v = clean(body[k]);
      if (v) fields[k] = v;
    }
    const who = fields.name || [fields.firstName, fields.lastName].filter(Boolean).join(" ");
    const email = fields.email;

    if (!who || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json({ error: "Nom et email valides sont requis." }, { status: 400 });
    }
    if (type === "contact" && !fields.message) {
      return NextResponse.json({ error: "Le message est vide." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY manquante dans les variables d'env.");
      return NextResponse.json({ error: "Le service d'envoi n'est pas configuré." }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const toAddress = process.env.CONTACT_TO_EMAIL || "contact@zuriagency.fr";
    const fromAddress = process.env.CONTACT_FROM_EMAIL || "Zuri Agency <onboarding@resend.dev>";

    const rows = Object.entries(fields).filter(([k]) => k !== "message");
    const text = rows.map(([k, v]) => `${LABELS[k]} : ${v}`).join("\n") + (fields.message ? `\n\nMessage :\n${fields.message}` : "");
    const html = `<div style="font-family:sans-serif;line-height:1.6">${rows
      .map(([k, v]) => `<p><strong>${LABELS[k]} :</strong> ${escapeHtml(v)}</p>`)
      .join("")}${fields.message ? `<p><strong>Message :</strong></p><p>${escapeHtml(fields.message).replace(/\n/g, "<br>")}</p>` : ""}</div>`;

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: (SUBJECTS[type] || SUBJECTS.contact)(who),
      text,
      html,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json({ error: "L'envoi a échoué. Réessayez dans un instant." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Erreur /api/contact:", err);
    return NextResponse.json({ error: "Une erreur inattendue est survenue." }, { status: 500 });
  }
}

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

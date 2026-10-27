"use client";

// Page Contact : « la carte postale ». Le timbre choisit le profil ; à l'envoi le tampon s'abat
// et la carte s'envole.

import { useEffect } from "react";
import { confetti, createScope, EMAIL_RE, prefersReducedMotion, sendContact, track } from "@/lib/scope";

export default function ContactFx() {
  useEffect(() => {
    const S = createScope();
    const reduce = prefersReducedMotion();
    const w = document.getElementById("ctW")!, c = document.getElementById("ctC") as HTMLFormElement, ok = document.getElementById("ctOk")!;
    const er = c.querySelector(".ct-err") as HTMLElement, send = c.querySelector(".ct-send") as HTMLButtonElement;
    const sts = Array.from(c.querySelectorAll<HTMLElement>(".ct-st"));
    const pick = (s: HTMLElement) =>
      sts.forEach((x) => {
        const on = x === s;
        x.classList.toggle("on", on);
        x.setAttribute("aria-checked", String(on));
      });
    sts.forEach((s) => S.on(s, "click", () => pick(s)));
    // profil passé dans l'adresse (ex. /contact?profil=marque)
    const want = new URLSearchParams(location.search).get("profil");
    if (want) {
      const m = sts.find((s) => s.textContent!.toLowerCase().includes(want.toLowerCase()));
      if (m) pick(m);
    }

    S.on(c, "submit", async (e: Event) => {
      e.preventDefault();
      const g = (id: string) => (c.querySelector(id) as HTMLInputElement).value.trim();
      const prof = c.querySelector(".ct-st.on");
      let msg = "";
      if (!g("#ct-t")) msg = "Écrivez quelques mots sur votre projet.";
      else if (!prof) msg = "Choisissez votre timbre : dites-nous qui vous êtes.";
      else if (!g("#ct-fn")) msg = "Indiquez votre prénom.";
      else if (!g("#ct-n")) msg = "Indiquez votre nom.";
      else if (!EMAIL_RE.test(g("#ct-m"))) msg = "Cet email semble incomplet.";
      er.textContent = msg;
      if (msg) return;
      send.disabled = true;
      const fail = await sendContact({
        type: "contact",
        firstName: g("#ct-fn"),
        lastName: g("#ct-n"),
        email: g("#ct-m"),
        profile: prof!.textContent || "",
        message: g("#ct-t"),
      });
      send.disabled = false;
      if (fail) {
        er.textContent = fail;
        return;
      }
      track("Message envoyé", { profil: prof!.textContent || "", formulaire: "carte postale" });
      c.classList.add("sent");
      S.timeout(() => w.classList.add("go"), reduce ? 0 : 550);
      S.timeout(() => w.classList.add("gone"), reduce ? 0 : 950);
      S.timeout(() => {
        w.style.display = "none";
        ok.classList.add("on");
        if (!reduce) confetti(document.body, innerWidth / 2, innerHeight * 0.45, 46, true);
        ok.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
      }, reduce ? 0 : 2000);
    });
    S.on(document.getElementById("ctAgain")!, "click", () => {
      c.reset();
      c.classList.remove("sent");
      w.classList.remove("go", "gone");
      w.style.display = "";
      ok.classList.remove("on");
      sts.forEach((x) => {
        x.classList.remove("on");
        x.setAttribute("aria-checked", "false");
      });
      er.textContent = "";
      (c.querySelector("#ct-t") as HTMLElement).focus();
    });
    return () => S.dispose();
  }, []);
  return null;
}

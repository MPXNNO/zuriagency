"use client";

// Page Stratégie d'entreprise : « la checklist ».

import { useEffect } from "react";
import { confetti, createScope, EMAIL_RE, prefersReducedMotion, sendContact, track } from "@/lib/scope";

export default function StrategieFx() {
  useEffect(() => {
    const S = createScope();
    const reduce = prefersReducedMotion();

    // titre mot à mot
    const t = document.getElementById("sgTitle")!;
    t.innerHTML = (t.textContent || "")
      .split(" ")
      .map((w, i) => `<span class="w" style="animation-delay:${(0.15 + i * 0.09).toFixed(2)}s">${w}</span>`)
      .join(" ");

    // checklist qui se coche au défilement
    const cks = Array.from(document.querySelectorAll<HTMLElement>(".sg-ck"));
    const rings = document.querySelectorAll<HTMLElement>(".sg-ring");
    const cnt = document.querySelector(".sg-mob .c");
    const done = document.getElementById("sgDone")!;
    const notes = document.getElementById("sgNotes")!;
    let fired = false;
    function upd() {
      const n = document.querySelectorAll(".sg-ck.on").length;
      rings.forEach((r) => {
        (r.querySelector(".fg") as SVGElement).style.strokeDashoffset = String(264 - (264 * n) / 10);
        r.querySelector("b")!.textContent = String(n);
        r.classList.toggle("full", n === 10);
      });
      if (cnt) cnt.textContent = String(n);
      done.classList.toggle("on", n === 10);
      if (n === 10 && !fired && !reduce) {
        fired = true;
        const r = done.getBoundingClientRect(), nr = notes.getBoundingClientRect();
        confetti(notes, r.left - nr.left + r.width / 2, r.top - nr.top, 36);
      }
    }
    function set(el: HTMLElement, on: boolean) {
      el.classList.toggle("on", on);
      el.setAttribute("aria-checked", String(on));
      upd();
    }
    const io = S.observe(cks, (e, o) => {
      if (e.isIntersecting) {
        set(e.target as HTMLElement, true);
        o.unobserve(e.target);
      }
    }, { rootMargin: "0px 0px -45% 0px", threshold: 1 });
    cks.forEach((c) => {
      S.on(c, "click", () => {
        io.unobserve(c);
        set(c, !c.classList.contains("on"));
      });
      S.on(c, "keydown", (e: KeyboardEvent) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          c.click();
        }
      });
    });
    S.reveal([document.getElementById("sgSticky")!], 0.4);

    // fenêtre rendez-vous
    const md = document.getElementById("sgMd")!, card = md.querySelector(".sg-card") as HTMLElement, f = md.querySelector("form") as HTMLFormElement;
    const er = md.querySelector(".er") as HTMLElement, rc = document.getElementById("sgRc")!, send = f.querySelector('button[type="submit"]') as HTMLButtonElement;
    let lastF: HTMLElement | null = null;
    function open(from: HTMLElement) {
      lastF = from;
      card.classList.remove("sent");
      er.textContent = "";
      md.classList.add("on");
      md.setAttribute("aria-hidden", "false");
      md.inert = false;
      S.timeout(() => (md.querySelector("#r-name") as HTMLElement).focus({ preventScroll: true }), 350);
    }
    function close() {
      md.classList.remove("on");
      md.setAttribute("aria-hidden", "true");
      md.inert = true;
      rc.classList.remove("on");
      lastF?.focus({ preventScroll: true });
    }
    md.setAttribute("aria-hidden", "true");
      md.inert = true;
    document.querySelectorAll<HTMLElement>("[data-rdv]").forEach((b) => S.on(b, "click", () => open(b)));
    S.on(rc, "click", () => {
      rc.classList.add("on");
      S.timeout(() => open(rc), reduce ? 0 : 450);
    });
    S.on(md, "click", (e: MouseEvent) => {
      if (e.target === md || (e.target as HTMLElement).closest(".x")) close();
    });
    S.on(window, "keydown", (e: KeyboardEvent) => e.key === "Escape" && md.classList.contains("on") && close());
    S.on(f, "submit", async (e: Event) => {
      e.preventDefault();
      const g = (id: string) => (md.querySelector(id) as HTMLInputElement).value.trim();
      let err = "";
      if (!g("#r-name")) err = "Indiquez votre nom.";
      else if (!EMAIL_RE.test(g("#r-mail"))) err = "Cet email semble incomplet.";
      else if (g("#r-tel").replace(/\D/g, "").length < 9) err = "Indiquez un numéro de téléphone.";
      else if (!g("#r-co")) err = "Indiquez le nom de votre marque ou entreprise.";
      er.textContent = err;
      if (err) return;
      send.disabled = true;
      const fail = await sendContact({
        type: "rdv-strategie",
        name: g("#r-name"),
        email: g("#r-mail"),
        phone: g("#r-tel"),
        company: g("#r-co"),
        message: g("#r-msg"),
      });
      send.disabled = false;
      if (fail) {
        er.textContent = fail;
        return;
      }
      track("Rendez-vous demandé", { pole: "Stratégie d'entreprise" });
      f.reset();
      card.classList.add("sent");
      card.scrollTop = 0;
    });

    return () => S.dispose();
  }, []);

  return null;
}

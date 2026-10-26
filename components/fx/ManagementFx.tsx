"use client";

// Page Management sportif : « l'analyse vidéo ». La timeline avance au défilement,
// chaque repère zoome sur le joueur suivi et affiche un point d'accompagnement.

import { useEffect } from "react";
import { createScope, EMAIL_RE, prefersReducedMotion, sendContact } from "@/lib/scope";

const A = [
  "Analyse du parcours et des objectifs du joueur",
  "Conseils sur l'environnement sportif",
  "Orientation et réflexion autour des choix de clubs",
  "Accompagnement des parents dans leurs questionnements",
  "Conseils sur la progression individuelle",
  "Identification des axes de travail",
  "Mise en place d'un accompagnement complémentaire à l'entraînement du club",
  "Conseils sur la préparation et la régularité",
  "Mise en relation avec des professionnels lorsque cela est pertinent",
];
const LAB = "Notre accompagnement peut notamment porter sur";

export default function ManagementFx() {
  useEffect(() => {
    const S = createScope();
    const reduce = prefersReducedMotion();
    const sw = document.getElementById("spW")!, cv = document.getElementById("spCv") as HTMLCanvasElement, ctx = cv.getContext("2d")!, nav = document.getElementById("nav")!;
    const q = <T extends Element = HTMLElement>(s: string) => sw.querySelector(s) as unknown as T;
    const ann = q(".sp-ann"), aS = ann.querySelector("small")!, aB = ann.querySelector("b") as HTMLElement, oa = q(".sp-ov.a"), ob = q(".sp-ov.b");
    const tri = q(".tr i"), ph = q(".ph"), tc = q(".tc");
    const mks = Array.from(sw.querySelectorAll<HTMLElement>(".mk")), cams = sw.querySelectorAll(".cam span");
    const POS = mks.map((m) => parseFloat(m.style.left));
    const FONT = "500 11px " + getComputedStyle(document.body).fontFamily;
    let W = 0, H = 0, DPR = 1, tl = 0, last = -2, drawT = 0, zoom = 0, zoomT = 0;
    const P = Array.from({ length: 16 }, (_, i) => ({ x: 0.08 + Math.random() * 0.84, y: 0.12 + Math.random() * 0.76, ph: Math.random() * 6, sp: 0.25 + Math.random() * 0.45, team: i < 8 ? 0 : 1 }));
    const trail: Array<[number, number]> = [];

    function size() {
      const r = cv.getBoundingClientRect();
      DPR = Math.min(2, devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      cv.width = W * DPR;
      cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    const prog = () => {
      const r = sw.getBoundingClientRect();
      return Math.max(0, Math.min(1, -r.top / Math.max(1, sw.offsetHeight - innerHeight)));
    };
    function upd() {
      const p = prog();
      tl = p;
      nav.classList.toggle("solid", sw.getBoundingClientRect().bottom < 80);
      tri.style.width = p * 100 + "%";
      ph.style.left = p * 100 + "%";
      const s = Math.round(p * 90 * 60);
      tc.textContent = String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
      oa.classList.toggle("off", p > 0.03);
      ob.classList.toggle("wait", !(p > 0.04 && p < 0.075));
      ob.classList.toggle("off", p >= 0.075);
      let k = -1;
      POS.forEach((v, i) => {
        const on = p * 100 >= v - 0.4;
        mks[i].classList.toggle("on", on);
        if (on) k = i;
      });
      ann.classList.toggle("off", k < 0);
      if (k !== last) {
        last = k;
        drawT = performance.now();
        zoomT = k >= 0 ? 1 : 0;
        cams[0].classList.toggle("on", k < 0);
        cams[1].classList.toggle("on", k >= 0);
        if (k >= 0) {
          aS.textContent = `${LAB} · ${String(k + 1).padStart(2, "0")} / 09`;
          aB.textContent = A[k];
          aB.classList.remove("swap");
          void aB.offsetWidth;
          aB.classList.add("swap");
        }
      }
    }
    mks.forEach((m, i) =>
      S.on(m, "click", () => {
        const top = sw.offsetTop + ((POS[i] + 1.2) / 100) * (sw.offsetHeight - innerHeight);
        window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      })
    );

    let visible = true;
    S.observe(sw, (e) => (visible = e.isIntersecting));
    const t0 = performance.now();
    function draw(now: number) {
      if (!visible || !W) return;
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      zoom += (zoomT - zoom) * 0.04;
      const mx = (0.18 + tl * 0.64 + Math.sin(t * 0.9) * 0.03) * W, my = (0.5 + Math.sin(t * 0.7 + tl * 6) * 0.2) * H;
      ctx.save();
      const z = 1 + zoom * 0.18;
      ctx.translate(mx, my);
      ctx.scale(z, z);
      ctx.translate(-mx, -my);
      ctx.strokeStyle = "rgba(251,248,243,.2)";
      ctx.lineWidth = 1.4;
      ctx.strokeRect(W * 0.04, H * 0.06, W * 0.92, H * 0.88);
      ctx.beginPath();
      ctx.moveTo(W / 2, H * 0.06);
      ctx.lineTo(W / 2, H * 0.94);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, Math.min(W, H) * 0.12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeRect(W * 0.04, H * 0.28, W * 0.13, H * 0.44);
      ctx.strokeRect(W * 0.83, H * 0.28, W * 0.13, H * 0.44);
      ctx.strokeRect(W * 0.04, H * 0.4, W * 0.05, H * 0.2);
      ctx.strokeRect(W * 0.91, H * 0.4, W * 0.05, H * 0.2);
      for (const o of P) {
        const x = (o.x + Math.sin(t * o.sp + o.ph) * 0.05) * W, y = (o.y + Math.cos(t * o.sp * 0.8 + o.ph) * 0.06) * H;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fillStyle = o.team ? "rgba(251,248,243,.82)" : "rgba(154,95,61,.95)";
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(mx + 14 + Math.sin(t * 3) * 3, my + 8, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      trail.push([mx, my]);
      if (trail.length > 50) trail.shift();
      ctx.beginPath();
      trail.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
      ctx.strokeStyle = "rgba(255,90,31,.45)";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      if (last >= 0) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, 110);
        g.addColorStop(0, "rgba(255,216,77,.16)");
        g.addColorStop(1, "rgba(255,216,77,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mx, my, 110, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(mx, my, 9, 0, Math.PI * 2);
      ctx.fillStyle = "#FF5A1F";
      ctx.fill();
      if (last >= 0) {
        const a = Math.min(1, (now - drawT) / 650);
        ctx.strokeStyle = "#FFD84D";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.ellipse(mx, my, 30, 23, -0.3, -Math.PI / 2, -Math.PI / 2 + a * Math.PI * 2);
        ctx.stroke();
        const ang = -1.1 + (last % 3) * 0.55, len = Math.min(W, H) * 0.22, ex = mx + Math.cos(ang) * len * a, ey = my + Math.sin(ang) * len * 0.7 * a;
        ctx.setLineDash([8, 7]);
        ctx.beginPath();
        ctx.moveTo(mx + 28, my - 8);
        ctx.quadraticCurveTo(mx + 60, my - 60, ex + 30, ey);
        ctx.stroke();
        ctx.setLineDash([]);
        if (a >= 1) {
          ctx.beginPath();
          ctx.arc(ex + 30, ey, 12, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.font = FONT;
      ctx.fillStyle = "rgba(251,248,243,.9)";
      ctx.textAlign = "center";
      ctx.fillText("LE JOUEUR", mx, my - 18);
      ctx.restore();
    }
    size();
    upd();
    if (reduce) draw(performance.now());
    else S.loop(draw);
    S.on(window, "scroll", () => {
      upd();
      if (reduce) draw(performance.now());
    }, { passive: true });
    S.on(window, "resize", () => {
      size();
      upd();
    });

    // fenêtre rendez-vous (champs de la page actuelle)
    const md = document.getElementById("spMd")!, card = md.querySelector(".sp-card") as HTMLElement, f = md.querySelector("form") as HTMLFormElement;
    const er = md.querySelector(".er") as HTMLElement, send = f.querySelector('button[type="submit"]') as HTMLButtonElement;
    let lastF: HTMLElement | null = null;
    md.setAttribute("aria-hidden", "true");
      md.inert = true;
    const open = (from: HTMLElement) => {
      lastF = from;
      card.classList.remove("sent");
      er.textContent = "";
      md.classList.add("on");
      md.setAttribute("aria-hidden", "false");
      md.inert = false;
      S.timeout(() => (md.querySelector("#s-name") as HTMLElement).focus({ preventScroll: true }), 350);
    };
    const close = () => {
      md.classList.remove("on");
      md.setAttribute("aria-hidden", "true");
      md.inert = true;
      lastF?.focus({ preventScroll: true });
    };
    document.querySelectorAll<HTMLElement>("[data-sprdv]").forEach((b) => S.on(b, "click", () => open(b)));
    S.on(md, "click", (e: MouseEvent) => {
      if (e.target === md || (e.target as HTMLElement).closest(".x")) close();
    });
    S.on(window, "keydown", (e: KeyboardEvent) => e.key === "Escape" && md.classList.contains("on") && close());
    S.on(f, "submit", async (e: Event) => {
      e.preventDefault();
      const g = (id: string) => (md.querySelector(id) as HTMLInputElement).value.trim();
      let err = "";
      if (!g("#s-name")) err = "Indiquez votre nom.";
      else if (!EMAIL_RE.test(g("#s-mail"))) err = "Cet email semble incomplet.";
      er.textContent = err;
      if (err) return;
      send.disabled = true;
      const fail = await sendContact({
        type: "rdv-sport",
        name: g("#s-name"),
        email: g("#s-mail"),
        phone: g("#s-tel"),
        club: g("#s-club"),
        level: g("#s-niv"),
        position: g("#s-poste"),
        message: g("#s-msg"),
      });
      send.disabled = false;
      if (fail) {
        er.textContent = fail;
        return;
      }
      f.reset();
      card.classList.add("sent");
      card.scrollTop = 0;
    });

    return () => S.dispose();
  }, []);

  return null;
}

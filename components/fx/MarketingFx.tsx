"use client";

// Page Marketing d'influence : « l'onde ». Un talent au centre, une audience tout autour
// qui s'allume intervention après intervention.

import { useEffect } from "react";
import { createScope, prefersReducedMotion } from "@/lib/scope";

const I = [
  "La représentation et le management des talents",
  "La recherche de collaborations et de campagnes",
  "La mise en relation avec les marques et agences",
  "La négociation des collaborations",
  "Le développement de l'image et du positionnement des talents",
  "La stratégie de contenu et de visibilité",
  "L'accompagnement dans les relations avec les marques",
  "Le développement de partenariats à long terme",
];
const LAB = "Nous intervenons notamment sur";

type P = { bx: number; by: number; x: number; y: number; d: number; s: number; ph: number; l: number };

export default function MarketingFx() {
  useEffect(() => {
    const S = createScope();
    const reduce = prefersReducedMotion();
    const sw = document.getElementById("mkW")!, cv = document.getElementById("mkCv") as HTMLCanvasElement, ctx = cv.getContext("2d")!;
    const nav = document.getElementById("nav")!;
    const q = <T extends Element = HTMLElement>(s: string) => sw.querySelector(s) as unknown as T;
    const oa = q(".mk-ov.a"), ob = q(".mk-ov.b"), oc = q(".mk-ov.c"), sc = q(".mk-scroll"), tip = q(".mk-tip");
    const cap = q(".mk-cap"), capB = cap.querySelector("b")!, capS = cap.querySelector("small")!;
    const dots = cap.querySelectorAll(".dots i"), tags = sw.querySelectorAll(".mk-tags span");
    const FONT = "500 11px " + getComputedStyle(document.body).fontFamily;
    let W = 0, H = 0, DPR = 1, Pts: P[] = [], cur = 0, target = 0.05, ca = 0, caT = 0, last = -1, mx = -1e4, my = -1e4;
    let waves: { t: number; x: number; y: number; big?: boolean; r?: number }[] = [];

    function size() {
      const r = cv.getBoundingClientRect();
      DPR = Math.min(2, devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      cv.width = W * DPR;
      cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      Pts = [];
      const N = W < 700 ? 150 : 320, M = Math.hypot(W, H) / 2;
      for (let i = 0; i < N; i++) {
        const a = Math.random() * Math.PI * 2, d = 50 + Math.pow(Math.random(), 0.75) * (M - 30);
        const bx = W / 2 + Math.cos(a) * d, by = H / 2 + Math.sin(a) * d * 0.78;
        Pts.push({ bx, by, x: bx, y: by, d, s: 0.8 + Math.random() * 2.2, ph: Math.random() * 6, l: 0 });
      }
    }
    const prog = () => {
      const r = sw.getBoundingClientRect();
      return Math.max(0, Math.min(1, -r.top / Math.max(1, sw.offsetHeight - innerHeight)));
    };
    function upd() {
      const p = prog();
      nav.classList.toggle("solid", sw.getBoundingClientRect().bottom < 80);
      oa.classList.toggle("off", p > 0.05);
      sc.classList.toggle("off", p > 0.02);
      tip.classList.toggle("off", p > 0.02 && p < 0.9);
      ob.classList.toggle("wait", !(p > 0.07 && p < 0.19));
      ob.classList.toggle("off", p >= 0.19);
      const live = p >= 0.2 && p < 0.9;
      cap.classList.toggle("off", !live);
      oc.classList.toggle("wait", p < 0.9);
      const k = Math.max(-1, Math.min(7, Math.floor(((p - 0.2) / 0.7) * 8)));
      if (live && k !== last && k >= 0) {
        last = k;
        capB.textContent = I[k];
        capS.textContent = `${LAB} · ${String(k + 1).padStart(2, "0")} / 08`;
        capB.classList.remove("swap");
        void (capB as HTMLElement).offsetWidth;
        capB.classList.add("swap");
        waves.push({ t: performance.now(), x: W / 2, y: H / 2, big: true });
      }
      if (p < 0.2) last = -1;
      dots.forEach((d, j) => d.classList.toggle("on", live && j <= k));
      tags.forEach((t, j) => t.classList.toggle("on", live && j <= k));
      caT = p > 0.04 ? 1 : 0;
      target = p < 0.2 ? 0.05 : p >= 0.9 ? 1.05 : (k + 1) / 8;
    }

    S.on(cv, "pointermove", (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    });
    S.on(cv, "pointerleave", () => (mx = my = -1e4));
    S.on(cv, "click", (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      waves.push({ t: performance.now(), x: e.clientX - r.left, y: e.clientY - r.top });
    });

    let visible = true;
    S.observe(sw, (e) => (visible = e.isIntersecting));
    const t0 = performance.now();
    function draw(now: number) {
      if (!visible || !W) return;
      const t = (now - t0) / 1000;
      cur += (target - cur) * 0.05;
      ca += (caT - ca) * 0.06;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2, M = Math.hypot(W, H) / 2, R = cur * M;
      for (let r = 0; r < 3; r++) {
        const qq = (t * 0.4 + r / 3) % 1, rr = 34 + qq * Math.max(R, 70);
        ctx.beginPath();
        ctx.ellipse(cx, cy, rr, rr * 0.78, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,90,31,${0.32 * (1 - qq) * ca})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      waves = waves.filter((w) => {
        const a = Math.max(0, (now - w.t) / (w.big ? 1600 : 1300));
        if (a > 1) return false;
        const rr = a * (w.big ? M * 1.1 : 260);
        ctx.beginPath();
        ctx.ellipse(w.x, w.y, rr, rr * (w.big ? 0.78 : 1), 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,140,80,${0.55 * (1 - a)})`;
        ctx.lineWidth = w.big ? 2.5 : 2;
        ctx.stroke();
        w.r = rr;
        return true;
      });
      for (const o of Pts) {
        const dx = o.bx - mx, dy = o.by - my, dm = Math.hypot(dx, dy), push = dm < 140 ? (140 - dm) / 140 : 0;
        const tx = o.bx + (dm ? dx / dm : 0) * push * 26 + Math.sin(t * 0.6 + o.ph) * 2;
        const ty = o.by + (dm ? dy / dm : 0) * push * 26 + Math.cos(t * 0.5 + o.ph) * 2;
        o.x += (tx - o.x) * 0.12;
        o.y += (ty - o.y) * 0.12;
        let hit = 0;
        for (const w of waves) if (!w.big && w.r && Math.abs(Math.hypot(o.x - w.x, o.y - w.y) - w.r) < 14) hit = 1;
        const lit = o.d < R;
        o.l += ((lit ? 1 : hit ? 0.8 : 0) - o.l) * (hit ? 0.4 : 0.07);
        if (o.l > 0.02) {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(o.x, o.y);
          ctx.strokeStyle = `rgba(217,168,135,${o.l * 0.11 * ca})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        const tw = 0.5 + 0.5 * Math.sin(t * 2 + o.ph);
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.s + o.l * 1.7 + push * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = o.l > 0.45 ? `rgba(255,${Math.round(90 + 80 * tw)},31,${0.55 + 0.45 * o.l})` : `rgba(251,248,243,${0.12 + 0.14 * tw + push * 0.4})`;
        ctx.fill();
      }
      if (mx > -1e3) {
        const gm = ctx.createRadialGradient(mx, my, 0, mx, my, 120);
        gm.addColorStop(0, "rgba(255,90,31,.10)");
        gm.addColorStop(1, "rgba(255,90,31,0)");
        ctx.fillStyle = gm;
        ctx.beginPath();
        ctx.arc(mx, my, 120, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = ca;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
      g.addColorStop(0, "rgba(255,90,31,.95)");
      g.addColorStop(1, "rgba(255,90,31,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 16 + Math.sin(t * 2.4) * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "#FBF8F3";
      ctx.fill();
      ctx.font = FONT;
      ctx.fillStyle = "rgba(251,248,243,.8)";
      ctx.textAlign = "center";
      ctx.fillText("UN TALENT", cx, cy + 40);
      ctx.globalAlpha = 1;
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

    // « Vous êtes une marque / un talent » : le formulaire s'ouvre avec le bon profil (géré par SiteShell via data-who)
    return () => S.dispose();
  }, []);

  return null;
}

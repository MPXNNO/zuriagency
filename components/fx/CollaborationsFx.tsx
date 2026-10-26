"use client";

// Page Nos collaborations : ciel étoilé, étoiles filantes, paillettes au passage de la souris,
// lettres du titre qui s'allument.

import { useEffect } from "react";
import { createScope, prefersReducedMotion } from "@/lib/scope";

export default function CollaborationsFx() {
  useEffect(() => {
    const S = createScope();
    const reduce = prefersReducedMotion();
    const sec = document.getElementById("clSky")!, cv = document.getElementById("clCv") as HTMLCanvasElement, ctx = cv.getContext("2d")!, nav = document.getElementById("nav")!;
    const ls = Array.from(sec.querySelectorAll<HTMLElement & { _t?: number }>(".cl-l"));
    let W = 0, H = 0, DPR = 1;
    let stars: { x: number; y: number; r: number; ph: number; sp: number }[] = [];
    let glitter: { x: number; y: number; vx: number; vy: number; l: number }[] = [];
    let shoot: { x: number; y: number; l: number } | null = null;

    function size() {
      const r = sec.getBoundingClientRect();
      DPR = Math.min(2, devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      cv.width = W * DPR;
      cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const N = Math.round((W * H) / (W < 700 ? 3200 : 4200));
      stars = Array.from({ length: N }, () => ({ x: Math.random() * W, y: Math.random() * H, r: 0.4 + Math.random() * 1.5, ph: Math.random() * 6, sp: 0.5 + Math.random() * 2 }));
    }
    function light(l: HTMLElement & { _t?: number }) {
      l.classList.add("on");
      window.clearTimeout(l._t);
      l._t = window.setTimeout(() => l.classList.remove("on"), 900);
    }
    S.on(sec, "pointermove", (e: PointerEvent) => {
      const r = sec.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      for (let k = 0; k < 2; k++) glitter.push({ x, y, vx: (Math.random() - 0.5) * 1.4, vy: Math.random() * 1.2 + 0.2, l: 1 });
      ls.forEach((l) => {
        const b = l.getBoundingClientRect();
        if (Math.abs(e.clientX - (b.left + b.width / 2)) < 44 && Math.abs(e.clientY - (b.top + b.height / 2)) < 44) light(l);
      });
    });
    // de temps en temps, une lettre s'allume toute seule (utile sur téléphone)
    if (!reduce) S.interval(() => !document.hidden && light(ls[Math.floor(Math.random() * ls.length)]), 700);

    let visible = true;
    S.observe(sec, (e) => (visible = e.isIntersecting));
    const t0 = performance.now();
    function draw(now: number) {
      if (!visible || !W) return;
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        const a = 0.25 + 0.75 * Math.abs(Math.sin(t * s.sp + s.ph));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,240,220,${a})`;
        ctx.fill();
        if (s.r > 1.5 && a > 0.9) {
          ctx.strokeStyle = `rgba(255,220,180,${a - 0.6})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(s.x - 6, s.y);
          ctx.lineTo(s.x + 6, s.y);
          ctx.moveTo(s.x, s.y - 6);
          ctx.lineTo(s.x, s.y + 6);
          ctx.stroke();
        }
      }
      if (!shoot && Math.random() < 0.007) shoot = { x: Math.random() * W * 0.7, y: Math.random() * H * 0.45, l: 1 };
      if (shoot) {
        const sx = shoot.x + (1 - shoot.l) * 460, sy = shoot.y + (1 - shoot.l) * 190;
        const g = ctx.createLinearGradient(sx - 110, sy - 46, sx, sy);
        g.addColorStop(0, "rgba(255,90,31,0)");
        g.addColorStop(1, `rgba(255,230,200,${shoot.l})`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sx - 110, sy - 46);
        ctx.lineTo(sx, sy);
        ctx.stroke();
        shoot.l -= 0.018;
        if (shoot.l <= 0) shoot = null;
      }
      glitter = glitter.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.l -= 0.022;
        if (p.l <= 0) return false;
        ctx.fillStyle = `rgba(255,${140 + Math.round(100 * p.l)},80,${p.l})`;
        ctx.fillRect(p.x, p.y, 2.6, 2.6);
        return true;
      });
    }
    const upd = () => nav.classList.toggle("solid", sec.getBoundingClientRect().bottom < 80);
    size();
    upd();
    if (reduce) draw(performance.now());
    else S.loop(draw);
    S.on(window, "resize", size);
    S.on(window, "scroll", upd, { passive: true });
    return () => S.dispose();
  }, []);
  return null;
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Fond "encre" : des cercles colorés qui dérivent sur fond blanc, contournent
 * les textes et les cartes, et fusionnent avec la goutte qui suit la souris.
 */

const COLORS = [
  "#FF5A1F", "#2A3AFF", "#CFFF3D", "#FF3D7A", "#F0A400", "#00A6A6",
  "#D7263D", "#1FA34A", "#7B2FF7", "#14213D", "#FFD23F", "#0B7285",
];

// Éléments de texte (mesurés au plus juste avec un Range) et blocs (boîte entière)
const TEXT_SEL =
  "h1,h2,h3,p,li,.mono,.eyebrow,.logo,.navlinks a,.nav-cta,.foot-row>*,.legal-bar>span,.legal-links a,label,.info b,.social a,.zuri-letters span,.word,.founder-caption span,.contact-list span,.tag,.big,.construction-tag";
const BOX_SEL =
  ".btn,.tcard,.founder-photo,.modal,.field,.note-block,.tcard-more-banner,.construction-card,.zuri-definition,.form,.navtoggle,.foot-fondateur,.legal-note,.mute-btn,.ink-toggle,.navlinks";

type Circle = {
  x: number; y: number; r: number; r0: number; vx: number; vy: number;
  c: string; ph: number; ps: number; pa: number;
  k: number; stuck: number; dying: boolean;
};
type Rect = { left: number; top: number; right: number; bottom: number };
type Round = { circ: true; cx: number; cy: number; R: number };
type Obstacle = Rect | Round;

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const isRound = (o: Obstacle): o is Round => (o as Round).circ === true;

export default function InkBackground() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settleRef = useRef<() => void>(() => {});
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    pausedRef.current = reduce;
    setPaused(reduce);

    let W = window.innerWidth;
    let H = window.innerHeight;
    let circles: Circle[] = [];
    let obstacles: Obstacle[] = [];
    let textEls: Element[] = [];
    let boxEls: Element[] = [];
    let last = 0;
    let frame = 0;
    let raf = 0;
    const mouse = { x: -9999, y: -9999, on: false, r: 56 };
    const MARGIN = 12;

    function collect() {
      textEls = Array.from(document.querySelectorAll(TEXT_SEL));
      boxEls = Array.from(document.querySelectorAll(BOX_SEL));
    }

    function measure() {
      const raw: Rect[] = [];
      const rounds: Round[] = [];
      const rg = document.createRange();
      const push = (b: DOMRect) => {
        if (b.width < 2 || b.height < 2 || b.bottom < -300 || b.top > H + 300) return;
        raw.push({ left: b.left, top: b.top, right: b.right, bottom: b.bottom });
      };
      for (const el of boxEls) {
        if (!el.getClientRects().length) continue;
        push(el.getBoundingClientRect());
      }
      for (const el of textEls) {
        if (!el.getClientRects().length) continue;
        rg.selectNodeContents(el);
        push(rg.getBoundingClientRect());
      }
      // la vidéo ronde est un obstacle rond
      const vf = document.querySelector(".video-frame");
      if (vf && vf.getClientRects().length) {
        const b = vf.getBoundingClientRect();
        if (b.bottom > -300 && b.top < H + 300) {
          rounds.push({ circ: true, cx: b.left + b.width / 2, cy: b.top + b.height / 2, R: Math.min(b.width, b.height) / 2 + 12 });
        }
      }
      // fusionne les blocs séparés par un écart trop étroit pour un cercle
      const G = MARGIN * 2 + 8;
      let changed = true;
      while (changed) {
        changed = false;
        for (let i = 0; i < raw.length && !changed; i++) {
          for (let j = i + 1; j < raw.length; j++) {
            const a = raw[i], c = raw[j];
            if (a.left - G < c.right && c.left - G < a.right && a.top - G < c.bottom && c.top - G < a.bottom) {
              a.left = Math.min(a.left, c.left);
              a.top = Math.min(a.top, c.top);
              a.right = Math.max(a.right, c.right);
              a.bottom = Math.max(a.bottom, c.bottom);
              raw.splice(j, 1);
              changed = true;
              break;
            }
          }
        }
      }
      obstacles = [...raw, ...rounds];
    }

    function push(c: Circle, ux: number, uy: number, pen: number, soft: boolean) {
      const mv = soft ? Math.min(pen, 16) : pen;
      c.x += ux * mv;
      c.y += uy * mv;
      const vn = c.vx * ux + c.vy * uy;
      if (vn < 0) { c.vx -= 2 * vn * ux; c.vy -= 2 * vn * uy; }
    }

    function avoid(c: Circle, soft: boolean) {
      for (const b of obstacles) {
        if (isRound(b)) {
          const dx = c.x - b.cx, dy = c.y - b.cy;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          const need = c.r + MARGIN + b.R;
          if (d < need) push(c, dx / d, dy / d, need - d, soft);
          continue;
        }
        const nx = Math.max(b.left, Math.min(c.x, b.right));
        const ny = Math.max(b.top, Math.min(c.y, b.bottom));
        const dx = c.x - nx, dy = c.y - ny;
        const d = Math.sqrt(dx * dx + dy * dy);
        const need = c.r + MARGIN;
        if (d >= need) continue;
        let ux: number, uy: number, pen: number;
        if (d > 0) { ux = dx / d; uy = dy / d; pen = need - d; }
        else {
          const l = c.x - b.left, r = b.right - c.x, t = c.y - b.top, bt = b.bottom - c.y;
          const mn = Math.min(l, r, t, bt);
          ux = 0; uy = 0;
          if (mn === l) ux = -1; else if (mn === r) ux = 1; else if (mn === t) uy = -1; else uy = 1;
          pen = mn + need;
        }
        push(c, ux, uy, pen, soft);
      }
    }

    function overlaps(c: Circle, k: number) {
      for (const b of obstacles) {
        if (isRound(b)) { if (Math.hypot(c.x - b.cx, c.y - b.cy) < b.R + c.r * k) return true; continue; }
        const nx = Math.max(b.left, Math.min(c.x, b.right));
        const ny = Math.max(b.top, Math.min(c.y, b.bottom));
        if (Math.hypot(c.x - nx, c.y - ny) < c.r * k) return true;
      }
      return false;
    }

    function relocate(c: Circle) {
      for (let t = 0; t < 40; t++) {
        c.x = rnd(0, W); c.y = rnd(0, H);
        if (overlaps(c, 1)) continue;
        if (circles.some((o) => o !== c && (o.x - c.x) ** 2 + (o.y - c.y) ** 2 < (o.r + c.r) ** 2 * 1.3)) continue;
        break;
      }
      const a = rnd(0, 6.28);
      c.vx = Math.cos(a) * 20; c.vy = Math.sin(a) * 20;
      c.stuck = 0; c.dying = false; c.k = 0.02;
    }

    function build() {
      const s = Math.max(Math.min(W, H * 1.3) / 1000, 0.55);
      const small = W < 600;
      const n = small ? 16 : 38;
      circles = [];
      for (let i = 0; i < n; i++) {
        const r = small ? rnd(9, 26) : rnd(16, 52) * Math.max(s, 0.7) * 1.2;
        const a = rnd(0, 6.28), sp = rnd(10, 30) * s;
        circles.push({
          x: rnd(0, W), y: rnd(0, H), r, r0: r,
          vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
          c: COLORS[i % COLORS.length], ph: rnd(0, 6.28), ps: rnd(0.3, 0.8), pa: rnd(0.04, 0.1),
          k: 1, stuck: 0, dying: false,
        });
      }
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      for (const c of circles) {
        ctx.beginPath();
        ctx.arc(c.x, c.y, Math.max(c.r, 0.1), 0, 6.2832);
        ctx.fillStyle = c.c;
        ctx.fill();
      }
      if (mouse.on) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.r, 0, 6.2832);
        ctx.fillStyle = "#FF3D7A";
        ctx.fill();
      }
    }

    function settle() {
      collect();
      measure();
      for (let k = 0; k < 3; k++) for (const c of circles) avoid(c, false);
      for (const c of circles) if (overlaps(c, 0.85)) { relocate(c); c.k = 1; }
      draw();
    }
    settleRef.current = settle;

    function step(dt: number, t: number) {
      if (frame++ % 40 === 0) collect(); // reprend les éléments (fenêtres, nouvelles pages)
      measure();
      for (let i = 0; i < circles.length; i++) {
        const c = circles[i];
        c.vx += Math.cos(t * 0.0004 + c.ph * 3) * 6 * dt;
        c.vy += Math.sin(t * 0.00035 + c.ph * 2) * 6 * dt;
        for (let j = i + 1; j < circles.length; j++) {
          const o = circles[j];
          const dx = o.x - c.x, dy = o.y - c.y;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          const R = (c.r + o.r) * 1.5;
          if (d < R) {
            const f = (1 - d / R) * 260 * dt;
            c.vx -= (dx / d) * f; c.vy -= (dy / d) * f;
            o.vx += (dx / d) * f; o.vy += (dy / d) * f;
          }
        }
        if (mouse.on) {
          const mx = c.x - mouse.x, my = c.y - mouse.y;
          const md = Math.sqrt(mx * mx + my * my) || 1;
          const MR = c.r + mouse.r + 110;
          if (md < MR) {
            const g = (1 - md / MR) * 140 * dt;
            c.vx += (mx / md) * g; c.vy += (my / md) * g;
          }
        }
        const sp = Math.sqrt(c.vx * c.vx + c.vy * c.vy) || 1;
        const k2 = 1 + ((26 - sp) / sp) * Math.min(1, dt * 1.2);
        c.vx *= k2; c.vy *= k2;
        c.x += c.vx * dt; c.y += c.vy * dt;
        if (c.x < c.r * 0.3 && c.vx < 0) c.vx *= -1;
        if (c.x > W - c.r * 0.3 && c.vx > 0) c.vx *= -1;
        if (c.y < c.r * 0.3 && c.vy < 0) c.vy *= -1;
        if (c.y > H - c.r * 0.3 && c.vy > 0) c.vy *= -1;
        c.r = c.r0 * (1 + Math.sin(t * 0.001 * c.ps + c.ph) * c.pa) * c.k;
        if (c.dying) {
          c.k -= dt * 3.5;
          if (c.k <= 0.02) relocate(c);
        } else {
          avoid(c, true);
          if (c.k < 1) c.k = Math.min(1, c.k + dt * 2.2);
          if (overlaps(c, 0.7)) { if (++c.stuck > 18) c.dying = true; } else c.stuck = 0;
        }
      }
    }

    function loop(ts: number) {
      const dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;
      if (!pausedRef.current) { step(dt, ts); draw(); }
      raf = requestAnimationFrame(loop);
    }

    function resize() {
      const nw = window.innerWidth, nh = window.innerHeight;
      // sur téléphone, la barre d'adresse change la hauteur au scroll : on ne reconstruit pas
      if (circles.length && nw === W && Math.abs(nh - H) < 160) {
        H = nh;
        if (cv!.height !== H) { cv!.height = H; draw(); }
        return;
      }
      W = nw; H = nh;
      cv!.width = W; cv!.height = H;
      mouse.r = W < 600 ? 26 : 56;
      build();
      settle();
    }
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true;
      if (pausedRef.current) draw();
    };
    const onLeave = () => { mouse.on = false; };
    const onScroll = () => { if (pausedRef.current) settle(); };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("touchend", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("load", settle);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(settle);
    raf = requestAnimationFrame((ts) => { last = ts; loop(ts); });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("touchend", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", settle);
    };
  }, []);

  // à chaque changement de page : on remesure le texte et on écarte les cercles
  useEffect(() => {
    const t1 = window.setTimeout(() => settleRef.current(), 60);
    const t2 = window.setTimeout(() => settleRef.current(), 500);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
  }, [pathname]);

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="ink-goo" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b" />
            <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -8.5" />
          </filter>
        </defs>
      </svg>
      <canvas id="ink-field" ref={canvasRef} aria-hidden="true" />
      <button
        type="button"
        className="ink-toggle"
        aria-pressed={paused}
        onClick={() => {
          pausedRef.current = !pausedRef.current;
          setPaused(pausedRef.current);
        }}
      >
        {paused ? "Animer l'encre" : "Figer l'encre"}
      </button>
    </>
  );
}

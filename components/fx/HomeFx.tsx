"use client";

// Animations de l'accueil : notification d'entrée, titre « légende », vidéo qui devient l'avatar,
// bio, stories des pôles, traduction de « Zuri ».

import { useEffect } from "react";
import { createScope, prefersReducedMotion } from "@/lib/scope";
import { sound } from "@/lib/sound";
import { site } from "@/lib/site";

const PAUSE_ICON = '<svg viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1" width="3" height="12"/><rect x="9" y="1" width="3" height="12"/></svg>';
const PLAY_ICON = '<svg viewBox="0 0 14 14" fill="currentColor"><path d="M3 1l10 6-10 6z"/></svg>';

export default function HomeFx() {
  useEffect(() => {
    const S = createScope();
    const reduce = prefersReducedMotion();
    const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
    const body = document.body;

    // ---------- titre : la légende qui s'écrit, puis grandit, puis les hashtags
    const capPost = $("capPost"), capLine = $("capLine"), capTags = $("capTags");
    let captionPlayed = false;
    function playCaption() {
      if (captionPlayed) return;
      captionPlayed = true;
      const TITLE = "Zuri Agency", TAGS = ["#influence", "#strategy", "#sport"];
      if (reduce) {
        capLine.textContent = TITLE;
        capLine.classList.add("grown");
        capTags.innerHTML = TAGS.map((t) => `<span>${t}</span>`).join("");
        return;
      }
      capLine.innerHTML = '<span class="txt"></span><span class="caret"></span>';
      const txt = capLine.firstChild as HTMLElement;
      let i = 0;
      capPost.classList.add("show");
      const type = () => {
        if (i < TITLE.length) {
          txt.textContent += TITLE[i++];
          S.timeout(type, 85 + Math.random() * 75);
          return;
        }
        S.timeout(() => {
          capLine.querySelector(".caret")?.remove();
          capPost.classList.remove("show");
          capLine.classList.add("grown");
          TAGS.forEach((t, k) =>
            S.timeout(() => {
              const sp = document.createElement("span");
              sp.textContent = t;
              capTags.appendChild(sp);
            }, 1000 + k * 320)
          );
        }, 550);
      };
      S.timeout(type, 600);
    }

    // ---------- vidéo : version ordinateur ou téléphone, chargée seulement quand on en a besoin
    const v = $<HTMLVideoElement>("reel");
    const mob = window.matchMedia("(max-width: 700px)").matches;
    v.poster = mob ? "/media/hero-mobile.webp" : "/media/hero-desktop.webp";
    const loadVideo = () => {
      if (v.src) return;
      v.preload = "auto";
      v.src = mob ? "/media/hero-mobile.mp4" : "/media/hero-desktop.mp4";
    };
    const pb = $("pause");
    S.on(pb, "click", () => {
      if (v.paused) {
        v.play().catch(() => {});
        pb.setAttribute("aria-label", "Mettre la vidéo en pause");
        pb.innerHTML = PAUSE_ICON;
      } else {
        v.pause();
        pb.setAttribute("aria-label", "Relancer la vidéo");
        pb.innerHTML = PLAY_ICON;
      }
    });

    // ---------- bio : anneau, texte tapé, « à la une », épinglé
    const bio = $("bio"), bioText = $("bioText"), ring = bio.querySelector(".ring") as HTMLElement;
    const BIO = bioText.textContent || "";
    const KEYS = ["talents", "entrepreneurs", "entreprises"];
    const bioHTML = (t: string) => KEYS.reduce((acc, k) => acc.replace(k, `<em>${k}</em>`), t);
    let bioStarted = false;
    function bioDone() {
      ring.style.setProperty("--ring", "360deg");
      bio.classList.add("on");
      bioText.innerHTML = bioHTML(BIO);
      bio.querySelectorAll(".hl-it").forEach((h) => h.classList.add("on"));
      bio.querySelector(".pin")?.classList.add("on");
    }
    function playBio() {
      if (bioStarted) return;
      bioStarted = true;
      if (reduce) return bioDone();
      bioText.textContent = "";
      const t0 = performance.now();
      const spin = (t: number) => {
        const a = Math.min(360, ((t - t0) / 1100) * 360);
        ring.style.setProperty("--ring", a + "deg");
        if (a < 360) return S.frame(spin);
        bio.classList.add("on");
        let i = 0;
        const type = () => {
          i = Math.min(BIO.length, i + 2);
          bioText.innerHTML = bioHTML(BIO.slice(0, i)) + (i < BIO.length ? '<span class="caret"></span>' : "");
          if (i < BIO.length) return void S.timeout(type, 22);
          bio.querySelectorAll(".hl-it").forEach((h, k) => S.timeout(() => h.classList.add("on"), 200 + k * 180));
          S.timeout(() => bio.querySelector(".pin")?.classList.add("on"), 850);
        };
        type();
      };
      S.frame(spin);
    }

    // ---------- défilement : la vidéo plein écran rétrécit et se pose dans l'avatar de la bio
    const hero = $("hero"), stage = hero.querySelector(".hero-stage") as HTMLElement, nav = $("nav"), frame = hero.querySelector(".hero-frame") as HTMLElement;
    const avatar = ring.querySelector("img") as HTMLElement;
    let landed = false, ticking = false;
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    function onScroll() {
      ticking = false;
      const W = innerWidth, H = innerHeight, y = scrollY;
      stage.style.setProperty("--p", Math.min(1, y / (H * 0.6)).toFixed(4));
      nav.classList.toggle("solid", hero.getBoundingClientRect().bottom < 80);
      if (reduce) return;
      const tr = avatar.getBoundingClientRect(), ringTop = tr.top + y, end = Math.max(1, ringTop - H * 0.28);
      const t = Math.min(1, Math.max(0, y / end)), e = ease(t);
      frame.style.left = tr.left * e + "px";
      frame.style.top = tr.top * e + "px";
      frame.style.width = W + (tr.width - W) * e + "px";
      frame.style.height = H + (tr.height - H) * e + "px";
      frame.style.borderRadius = (tr.width / 2) * e + "px";
      frame.style.setProperty("--shade", (1 - e).toFixed(3));
      if (t >= 1) {
        playBio();
        if (!landed) {
          landed = true;
          S.timeout(() => landed && frame.classList.add("faded"), 1900);
        }
      } else if (landed) {
        landed = false;
        frame.classList.remove("faded");
      }
    }
    if (reduce) {
      frame.style.position = "absolute";
      frame.style.width = "100%";
      frame.style.height = "100%";
      frame.style.zIndex = "0";
      playBio();
    }
    S.on(window, "scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    }, { passive: true });
    S.on(window, "resize", onScroll);
    onScroll();
    // sur grand écran la bio peut être visible sans défilement
    S.observe(bio, (e, io) => {
      if (e.isIntersecting && e.intersectionRatio > 0.6 && scrollY > 10) {
        playBio();
        io.disconnect();
      }
    }, { threshold: [0, 0.6] });

    // ---------- pôles : stories qui s'enchaînent, clic pour choisir
    const stBox = $("stories"), sts = Array.from(stBox.querySelectorAll<HTMLElement>(".st"));
    let stCur = -1, stTimer = 0, stAuto = true;
    function stShow(i: number, manual = false) {
      stCur = i;
      sts.forEach((x, j) => {
        x.classList.toggle("on", j === i);
        x.classList.remove("hold");
        if (j < i) x.classList.add("seen");
      });
      window.clearTimeout(stTimer);
      if (manual) {
        stAuto = false;
        sts[i].classList.add("hold");
        return;
      }
      stTimer = S.timeout(() => stAuto && stShow((stCur + 1) % 3), 4600);
    }
    sts.forEach((x, j) => {
      S.on(x, "click", (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest(".go")) return;
        stShow(j, true);
      });
      S.on(x, "keydown", (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          stShow(j, true);
        }
      });
    });
    if (reduce) {
      sts.forEach((x) => x.classList.add("seen"));
      stShow(0, true);
    } else
      S.observe(stBox, (e, io) => {
        if (e.isIntersecting) {
          io.disconnect();
          stShow(0);
        }
      }, { threshold: 0.35 });

    // ---------- Zuri : la traduction qui se tape
    (() => {
      const box = $("zuriTrad");
      const tin = box.querySelector(".trad-in") as HTMLElement, tout = box.querySelector(".trad-out") as HTMLElement;
      const sw = box.querySelector(".trad-top i") as HTMLElement, note = box.querySelector(".trad-note") as HTMLElement, txt = box.querySelector(".zuri-txt") as HTMLElement;
      if (reduce) return;
      tin.textContent = "";
      tout.textContent = "";
      note.classList.add("wait");
      txt.classList.add("wait");
      const C = '<span class="caret"></span>';
      const pause = (ms: number) => new Promise<void>((r) => S.timeout(r, ms));
      const type = (el: HTMLElement, t: string, sp: number) =>
        new Promise<void>((res) => {
          let i = 0;
          const st = () => {
            el.innerHTML = t.slice(0, i) + C;
            if (i++ < t.length) S.timeout(st, sp);
            else res();
          };
          st();
        });
      const erase = (el: HTMLElement) =>
        new Promise<void>((res) => {
          let t = el.textContent || "";
          const st = () => {
            el.innerHTML = t + C;
            if (t.length) {
              t = t.slice(0, -1);
              S.timeout(st, 35);
            } else res();
          };
          st();
        });
      S.observe(box, async (e, io) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        await pause(300);
        await type(tin, "zuri", 160);
        tin.textContent = "zuri";
        sw.classList.add("spin");
        await pause(600);
        await type(tout, "beau", 70);
        await pause(650);
        await erase(tout);
        await type(tout, "brillant", 70);
        await pause(650);
        await erase(tout);
        await type(tout, "beau, brillant, magnifique", 45);
        tout.textContent = "beau, brillant, magnifique";
        note.classList.remove("wait");
        await pause(300);
        txt.classList.remove("wait");
      }, { threshold: 0.4 });
    })();

    // ---------- son du bouton de la vidéo
    const sb = $("sound");
    const unsub = sound.subscribe((on) => {
      sb.classList.toggle("on", on);
      sb.setAttribute("aria-label", on ? "Couper le son" : "Activer le son");
    });
    S.add(unsub);
    S.on(sb, "click", (e: Event) => {
      e.stopPropagation();
      sound.toggle();
    });

    // ---------- écran d'entrée : la notification
    const gate = $("gate");
    function enterSite(withSound: boolean) {
      if (gate.classList.contains("out")) return;
      site.entered = true;
      site.gateOpen = false;
      if (withSound) {
        sound.chime();
        if (!sound.mutedByUser()) S.timeout(() => sound.on(), reduce ? 0 : 450);
      }
      gate.classList.add("out");
      body.classList.remove("locked");
      body.classList.add("in");
      loadVideo();
      v.currentTime = 0;
      if (!reduce) v.play().catch(() => {});
      S.timeout(() => gate.classList.add("gone"), reduce ? 0 : 1100);
      S.timeout(playCaption, reduce ? 0 : 700);
    }
    if (site.entered) {
      // retour sur l'accueil depuis une autre page : directement la vidéo, sans la notification
      gate.classList.add("gone");
      enterSite(false);
    } else {
      site.gateOpen = true;
      body.classList.add("locked");
      const now = new Date();
      $("gtime").textContent = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
      $("gdate").textContent = now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
      S.timeout(() => {
        gate.classList.add("on");
        loadVideo();
      }, reduce ? 0 : 400);
      const nc = gate.querySelector(".ncard") as HTMLElement;
      nc.setAttribute("role", "button");
      nc.setAttribute("tabindex", "0");
      nc.setAttribute("aria-label", "Ouvrir la notification et entrer sur le site");
      S.on(nc, "click", () => enterSite(true));
      S.on(nc, "keydown", (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          enterSite(true);
        }
      });
      S.timeout(() => nc.focus({ preventScroll: true }), reduce ? 0 : 1000);
    }

    return () => {
      S.dispose();
      site.gateOpen = false;
      body.classList.remove("locked", "in");
      v.pause();
    };
  }, []);

  return null;
}

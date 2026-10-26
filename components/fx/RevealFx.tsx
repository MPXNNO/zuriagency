"use client";

// Fait apparaître des éléments au défilement (ajoute la classe "on" une fois visibles).

import { useEffect } from "react";
import { createScope, prefersReducedMotion } from "@/lib/scope";

export default function RevealFx({ selectors }: { selectors: Array<[string, number]> }) {
  useEffect(() => {
    const S = createScope();
    selectors.forEach(([sel, th]) => {
      const els = document.querySelectorAll(sel);
      if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
        els.forEach((el) => el.classList.add("on"));
        return;
      }
      S.observe(els, (e, io) => {
        if (e.isIntersecting) {
          e.target.classList.add("on");
          io.unobserve(e.target);
        }
      }, { threshold: th, rootMargin: "0px 0px -12% 0px" });
    });
    return () => S.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

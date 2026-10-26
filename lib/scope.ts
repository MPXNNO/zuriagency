// Petit utilitaire pour les animations : tout ce qui est branché (écouteurs, minuteries,
// observateurs, boucles d'animation) est débranché d'un coup quand on quitte la page.

export type Scope = ReturnType<typeof createScope>;

export function createScope() {
  const cleanups: Array<() => void> = [];
  let alive = true;

  return {
    get alive() {
      return alive;
    },
    on<K extends string>(
      target: EventTarget,
      type: K,
      fn: (e: any) => void,
      opts?: AddEventListenerOptions | boolean
    ) {
      target.addEventListener(type, fn as EventListener, opts);
      cleanups.push(() => target.removeEventListener(type, fn as EventListener, opts));
    },
    timeout(fn: () => void, ms: number) {
      const id = window.setTimeout(() => {
        if (alive) fn();
      }, ms);
      cleanups.push(() => window.clearTimeout(id));
      return id;
    },
    interval(fn: () => void, ms: number) {
      const id = window.setInterval(() => {
        if (alive) fn();
      }, ms);
      cleanups.push(() => window.clearInterval(id));
      return id;
    },
    /** Boucle d'animation (appelée à chaque image tant que la page est affichée). */
    loop(fn: (now: number) => void) {
      let id = 0;
      const tick = (now: number) => {
        if (!alive) return;
        fn(now);
        id = requestAnimationFrame(tick);
      };
      id = requestAnimationFrame(tick);
      cleanups.push(() => cancelAnimationFrame(id));
    },
    frame(fn: (now: number) => void) {
      const id = requestAnimationFrame((now) => {
        if (alive) fn(now);
      });
      cleanups.push(() => cancelAnimationFrame(id));
    },
    observe(
      els: Element | Element[] | NodeListOf<Element>,
      cb: (entry: IntersectionObserverEntry, io: IntersectionObserver) => void,
      opts?: IntersectionObserverInit
    ) {
      const io = new IntersectionObserver((entries) => entries.forEach((e) => cb(e, io)), opts);
      const list = els instanceof Element ? [els] : Array.from(els);
      list.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
      return io;
    },
    /** Ajoute la classe "on" à chaque élément quand il apparaît (une seule fois). */
    reveal(sel: string | NodeListOf<Element> | Element[], threshold = 0.3, root: Element | null = null, cb?: (el: Element) => void) {
      const els = typeof sel === "string" ? (root || document).querySelectorAll(sel) : sel;
      if (!("IntersectionObserver" in window)) {
        Array.from(els).forEach((el) => el.classList.add("on"));
        return;
      }
      this.observe(
        els,
        (e, io) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            cb?.(e.target);
            io.unobserve(e.target);
          }
        },
        { threshold, root }
      );
    },
    add(fn: () => void) {
      cleanups.push(fn);
    },
    dispose() {
      alive = false;
      cleanups.splice(0).reverse().forEach((fn) => {
        try {
          fn();
        } catch {
          /* rien */
        }
      });
    },
  };
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Petite pluie de confettis aux couleurs de la DA. */
export function confetti(host: HTMLElement, x: number, y: number, n = 44, fixed = false) {
  const box = document.createElement("div");
  box.className = fixed ? "confetti confetti-fixed" : "confetti";
  host.appendChild(box);
  const colors = ["#FF5A1F", "#D9A887", "#241C17", "#9A5F3D", "#FBF8F3"];
  for (let k = 0; k < n; k++) {
    const c = document.createElement("i");
    c.style.left = x + "px";
    c.style.top = y + "px";
    c.style.background = colors[k % colors.length];
    c.style.setProperty("--x", (Math.random() - 0.5) * 620 + "px");
    c.style.setProperty("--y", -80 - Math.random() * 300 + "px");
    c.style.setProperty("--r", Math.random() * 720 + "deg");
    box.appendChild(c);
  }
  window.setTimeout(() => box.remove(), 1700);
}

/** Envoi d'un message vers /api/contact. Renvoie un message d'erreur, ou "" si tout va bien. */
export async function sendContact(payload: Record<string, string>): Promise<string> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return body.error || "L'envoi a échoué. Réessayez dans un instant.";
    }
    return "";
  } catch {
    return "Connexion impossible. Vérifiez votre réseau et réessayez.";
  }
}

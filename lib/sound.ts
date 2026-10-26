// Musique d'ambiance partagée par tout le site.
// Le lecteur vit au niveau du layout : il ne s'arrête pas quand on change de page.
// Le fichier audio n'est téléchargé qu'au moment où la musique démarre (rien au chargement).

const KEY = "zuri-son";
const POS = "zuri-pos";
const SRC = "/audio/zuri-ambiance.mp3";

type Listener = (on: boolean) => void;

let actx: AudioContext | null = null;
let gain: GainNode | null = null;
let buf: AudioBuffer | null = null;
let src: AudioBufferSourceNode | null = null;
let bufP: Promise<ArrayBuffer | null> | null = null;
let t0 = 0;
let off0 = 0;
let wanted = false;
const listeners = new Set<Listener>();

function get(k: string) {
  try {
    return sessionStorage.getItem(k);
  } catch {
    return null;
  }
}
function set(k: string, v: string) {
  try {
    sessionStorage.setItem(k, v);
  } catch {
    /* navigation privée : on ignore */
  }
}

function ensure() {
  if (actx) return actx;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  actx = new AC();
  gain = actx.createGain();
  gain.gain.value = 0;
  gain.connect(actx.destination);
  return actx;
}

function load() {
  if (!bufP) bufP = fetch(SRC).then((r) => r.arrayBuffer()).catch(() => null);
  return bufP;
}

function position() {
  if (!src || !buf || !actx) return parseFloat(get(POS) || "0") || 0;
  return (off0 + actx.currentTime - t0) % buf.duration;
}

async function start() {
  if (src || !actx) return;
  const ab = await load();
  if (!ab || src || !actx) return;
  try {
    buf = buf || (await actx.decodeAudioData(ab.slice(0)));
  } catch {
    return;
  }
  if (src) return;
  off0 = (parseFloat(get(POS) || "0") || 0) % buf.duration;
  src = actx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  src.connect(gain!);
  t0 = actx.currentTime;
  src.start(0, off0);
}

function ramp(to: number, sec: number) {
  if (!gain || !actx) return;
  const t = actx.currentTime;
  gain.gain.cancelScheduledValues(t);
  gain.gain.setValueAtTime(gain.gain.value, t);
  gain.gain.linearRampToValueAtTime(to, t + sec);
}

function emit() {
  listeners.forEach((fn) => fn(wanted));
}

export const sound = {
  /** Lance (ou relance) la musique en fondu. À appeler depuis un geste de l'utilisateur. */
  on(fade = 2.5) {
    wanted = true;
    set(KEY, "on");
    emit();
    const c = ensure();
    if (!c) return;
    Promise.resolve(c.resume())
      .then(start)
      .then(() => {
        if (wanted && c.state === "running") ramp(0.7, fade);
      });
  },
  off() {
    wanted = false;
    set(KEY, "off");
    ramp(0, 0.6);
    emit();
  },
  toggle() {
    if (wanted) sound.off();
    else sound.on(0.8);
  },
  isOn() {
    return wanted;
  },
  /** Le visiteur a-t-il coupé le son pendant sa visite ? */
  mutedByUser() {
    return get(KEY) === "off";
  },
  /** Le son est-il vraiment en train de jouer ? */
  playing() {
    return !!(actx && actx.state === "running" && src && wanted);
  },
  subscribe(fn: Listener) {
    listeners.add(fn);
    fn(wanted);
    return () => {
      listeners.delete(fn);
    };
  },
  savePosition() {
    if (src) set(POS, String(position()));
  },
  /** Carillon de notification original (synthétisé) joué quand on entre sur le site. */
  chime() {
    const c = ensure();
    if (!c) return;
    c.resume();
    const t = c.currentTime + 0.02;
    const out = c.createGain();
    out.gain.value = 0.55;
    out.connect(c.destination);
    (
      [
        [1318.5, 0, 0.9],
        [1975.5, 0.11, 1.3],
        [2637, 0.11, 0.6],
      ] as const
    ).forEach(([f, d, len]) => {
      const o = c.createOscillator();
      const o2 = c.createOscillator();
      const g = c.createGain();
      const g2 = c.createGain();
      o.type = "sine";
      o2.type = "triangle";
      o.frequency.value = f;
      o2.frequency.value = f * 2.002;
      g2.gain.value = 0.12;
      o.connect(g);
      o2.connect(g2);
      g2.connect(g);
      g.connect(out);
      g.gain.setValueAtTime(0, t + d);
      g.gain.linearRampToValueAtTime(0.32, t + d + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0008, t + d + len);
      o.start(t + d);
      o2.start(t + d);
      o.stop(t + d + len + 0.05);
      o2.stop(t + d + len + 0.05);
    });
    const n = Math.floor(c.sampleRate * 0.6);
    const nb = c.createBuffer(1, n, c.sampleRate);
    const data = nb.getChannelData(0);
    for (let i = 0; i < n; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const ns = c.createBufferSource();
    const bp = c.createBiquadFilter();
    const ng = c.createGain();
    ns.buffer = nb;
    bp.type = "bandpass";
    bp.Q.value = 0.8;
    bp.frequency.setValueAtTime(600, t + 0.15);
    bp.frequency.exponentialRampToValueAtTime(5000, t + 0.7);
    ng.gain.setValueAtTime(0, t + 0.15);
    ng.gain.linearRampToValueAtTime(0.09, t + 0.35);
    ng.gain.linearRampToValueAtTime(0, t + 0.75);
    ns.connect(bp);
    bp.connect(ng);
    ng.connect(out);
    ns.start(t + 0.15);
    load();
  },
};

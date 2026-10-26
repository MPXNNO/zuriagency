// Généré à partir de la maquette validée (balisage statique, rendu côté serveur).
import PublishForm from "@/components/PublishForm";
import Link from "next/link";
import type { CSSProperties } from "react";

export default function HomeMarkup() {
  return (
    <>
<div className="gate" id="gate" role="dialog" aria-modal="true" aria-label="Entrer sur le site">
  <div className="bg"></div>
  <div className="clock"><small id="gdate">lundi 26 octobre</small><b id="gtime">10:30</b></div>
  <div className="stack">
    <div className="ncard">
      <div className="ic">Z<span className="dot">.</span>A</div>
      <div>
        <div className="t">Zuri.Agency <small>maintenant</small></div>
        <p>Nouvelle publication : découvre nos talents.</p>
      </div>
    </div>
  </div>
  <div className="note">Touche la notification<i></i></div>
</div>
<main id="top">
  <section className="hero" id="hero">
    <div className="hero-stage">
      <div className="hero-frame">
        <video id="reel" muted loop playsInline preload="none"></video>
      </div>
      <div className="hero-title">
        <div className="cap-post" id="capPost"><span className="av">Z.</span><span>zuri.agency_ <small>· nouvelle publication</small></span></div>
        <h1><span className="sr-only">Zuri Agency, agence de marketing d&apos;influence, de stratégie d&apos;entreprise et de management sportif à Paris</span><span className="cap-line" id="capLine" aria-hidden="true"></span></h1>
        <p className="tagline" id="capTags" aria-hidden="true"></p>
      </div>
      <div className="reel">
        <div className="scroll-cue"><i></i><span className="label">Défiler</span></div>
        <div className="scroll-cue"><span className="label">Showreel Zuri</span>
          <span className="ctrls"><button id="sound" className="snd-btn" aria-label="Activer le son"><span className="eq"><i></i><i></i><i></i><i></i></span></button>
          <button id="pause" aria-label="Mettre la vidéo en pause"><svg viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1" width="3" height="12" /><rect x="9" y="1" width="3" height="12" /></svg></button></span>
        </div>
      </div>
    </div>
  </section>

  <section className="intro">
    <div className="wrap bio" id="bio">
      <div className="ring"><img src="/img/founder-steve-360.webp" alt="Steve K. Dompe, fondateur de Zuri Agency" /></div>
      <div>
        <div className="bio-name"><h2>Zuri Agency</h2><svg className="verif" viewBox="0 0 24 24" aria-label="Compte vérifié"><path d="M12 1l2.6 2.2 3.4-.4.9 3.3 3 1.7-1.3 3.2 1.3 3.2-3 1.7-.9 3.3-3.4-.4L12 23l-2.6-2.2-3.4.4-.9-3.3-3-1.7L3.4 12 2.1 8.8l3-1.7.9-3.3 3.4.4z" fill="#FF5A1F" /><path d="M7.5 12.3l3 3 6-6.2" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
        <div className="bio-role">Agence · fondée par Steve K. Dompe</div>
        <p className="bio-text" id="bioText">Zuri Agency est une agence créée par Steve K. Dompe, qui accompagne les talents, les entrepreneurs et les entreprises dans leur développement.</p>
        <ul className="hls">
          <li className="hl-it"><a href="#poles"><span>I</span>Influence</a></li>
          <li className="hl-it"><a href="#poles"><span>S</span>Stratégie</a></li>
          <li className="hl-it"><a href="#poles"><span>S</span>Sport</a></li>
        </ul>
        <div className="pin">
          <small><svg viewBox="0 0 16 16" fill="currentColor"><path d="M10 1l5 5-2 1-3 3 .5 3.5L9 15l-3-3-4 4-1-1 4-4-3-3 1.5-1.5L7 7l3-3z" /></svg>Épinglé · Notre ambition</small>
          <p>Notre ambition est simple : identifier le potentiel, construire une stratégie et créer les conditions pour le développer.</p>
          <p>À travers trois pôles d'expertise, Zuri Agency intervient dans les domaines du marketing d'influence, de la stratégie d'entreprise et du management sportif.</p>
        </div>
      </div>
    </div>
  </section>

  <section className="poles" id="poles">
    <div className="wrap">
      <div className="sec-head"><div><div className="eyebrow">Trois pôles d'expertise</div></div></div>
      <div className="stories" id="stories">
        <div className="st" data-k="0" role="button" tabIndex={0} aria-label="Marketing d'influence">
          <div className="art"><svg viewBox="0 0 200 300">
            <rect className="draw" style={{'--len': '640'} as CSSProperties} x="45" y="40" width="110" height="210" rx="18" />
            <circle className="draw" style={{'--len': '120'} as CSSProperties} cx="100" cy="110" r="18" />
            <circle className="draw accent" style={{'--len': '150'} as CSSProperties} cx="100" cy="110" r="24" />
            <path className="draw" style={{'--len': '80'} as CSSProperties} d="M70 150h60M78 164h44" />
            <path className="draw" style={{'--len': '200'} as CSSProperties} d="M62 198h76M62 214h50" />
            <rect className="fadein fill-o" x="80" y="230" width="40" height="4" rx="2" />
          </svg><span className="hearts"><i><svg viewBox="0 0 24 22" fill="currentColor"><path d="M12 20.5S2 14.4 2 7.6A5.1 5.1 0 0 1 12 5.4a5.1 5.1 0 0 1 10 2.2C22 14.4 12 20.5 12 20.5z" /></svg></i><i><svg viewBox="0 0 24 22" fill="currentColor"><path d="M12 20.5S2 14.4 2 7.6A5.1 5.1 0 0 1 12 5.4a5.1 5.1 0 0 1 10 2.2C22 14.4 12 20.5 12 20.5z" /></svg></i><i><svg viewBox="0 0 24 22" fill="currentColor"><path d="M12 20.5S2 14.4 2 7.6A5.1 5.1 0 0 1 12 5.4a5.1 5.1 0 0 1 10 2.2C22 14.4 12 20.5 12 20.5z" /></svg></i><i><svg viewBox="0 0 24 22" fill="currentColor"><path d="M12 20.5S2 14.4 2 7.6A5.1 5.1 0 0 1 12 5.4a5.1 5.1 0 0 1 10 2.2C22 14.4 12 20.5 12 20.5z" /></svg></i></span></div>
          <div className="pb"><i></i></div>
          <div className="who"><span>Z.</span>zuri.agency_ <small>· pôle</small></div>
          <div className="txt"><h3>Marketing d'influence</h3><p>Transformer l'influence en véritable levier de développement.</p><Link className="go" href="/marketing-influence">Découvrir le pôle <svg viewBox="0 0 18 18" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 9h13M10 4l5 5-5 5" /></svg></Link></div>
        </div>
        <div className="st" data-k="1" role="button" tabIndex={0} aria-label="Stratégie d'entreprise">
          <div className="art"><svg viewBox="0 0 200 300">
            <path className="draw" style={{'--len': '600', strokeOpacity: '.35'} as CSSProperties} d="M30 80h140M30 125h140M30 170h140M30 215h140" />
            <path className="draw" style={{'--len': '180', strokeOpacity: '.6'} as CSSProperties} d="M30 60v180h150" />
            <path className="draw accent" style={{'--len': '260', strokeWidth: '2.4'} as CSSProperties} d="M40 215 L75 190 L105 200 L135 150 L165 105" />
            <path className="draw accent" style={{'--len': '40', strokeWidth: '2.4'} as CSSProperties} d="M150 102 L166 104 L162 120" />
            <circle className="fadein fill-o" cx="75" cy="190" r="4" /><circle className="fadein fill-o" cx="105" cy="200" r="4" /><circle className="fadein fill-o" cx="135" cy="150" r="4" />
          </svg></div>
          <div className="pb"><i></i></div>
          <div className="who"><span>Z.</span>zuri.agency_ <small>· pôle</small></div>
          <div className="txt"><h3>Stratégie d'entreprise</h3><p>Transformer une ambition en stratégie.</p><Link className="go" href="/strategie-entreprise">Découvrir le pôle <svg viewBox="0 0 18 18" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 9h13M10 4l5 5-5 5" /></svg></Link></div>
        </div>
        <div className="st" data-k="2" role="button" tabIndex={0} aria-label="Management sportif">
          <div className="art"><svg viewBox="0 0 200 300">
            <rect className="draw" style={{'--len': '700'} as CSSProperties} x="30" y="30" width="140" height="240" rx="3" />
            <path className="draw" style={{'--len': '140'} as CSSProperties} d="M30 150h140" />
            <circle className="draw" style={{'--len': '160'} as CSSProperties} cx="100" cy="150" r="24" />
            <path className="draw" style={{'--len': '200'} as CSSProperties} d="M65 30v38h70V30M65 270v-38h70v38" />
            <path id="ballPath" d="M100 230 C60 200 140 170 100 150 S70 90 100 52" fill="none" />
            <path className="draw accent" style={{'--len': '260', strokeDasharray: '4 7', strokeDashoffset: '0', opacity: '.7'} as CSSProperties} d="M100 230 C60 200 140 170 100 150 S70 90 100 52" />
            <g className="ball"><circle r="7" fill="#FBF8F3" /><circle r="7" fill="none" stroke="#241C17" strokeWidth="1" /><path d="M-3 -2l3-2 3 2-1 3h-4z" fill="#241C17" />
              <animateMotion dur="3.2s" repeatCount="indefinite" rotate="auto"><mpath href="#ballPath" /></animateMotion></g>
          </svg></div>
          <div className="pb"><i></i></div>
          <div className="who"><span>Z.</span>zuri.agency_ <small>· pôle</small></div>
          <div className="txt"><h3>Management sportif</h3><p>Accompagner les joueurs et les familles au-delà du terrain.</p><Link className="go" href="/management-sportif">Découvrir le pôle <svg viewBox="0 0 18 18" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 9h13M10 4l5 5-5 5" /></svg></Link></div>
        </div>
      </div>
    </div>
  </section>

  <section className="zuri">
    <div className="wrap">
      <div className="letters" aria-hidden="true"><span data-l="Z" style={{'--i': '0'} as CSSProperties}>Z<i className="spk"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 0l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" /></svg></i></span><span data-l="U" style={{'--i': '1'} as CSSProperties}>U<i className="spk"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 0l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" /></svg></i></span><span data-l="R" style={{'--i': '2'} as CSSProperties}>R<i className="spk"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 0l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" /></svg></i></span><span data-l="I" style={{'--i': '3'} as CSSProperties}>I<i className="spk"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 0l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" /></svg></i></span></div>
      <div className="zuri-grid" id="zuriTrad">
        <div className="trad">
          <div className="trad-top"><span>Swahili</span><i><svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6h11l-3-3M15 12H4l3 3" /></svg></i><span>Français</span></div>
          <div className="trad-body">
            <div><div className="trad-in">zuri</div><div className="trad-meta">adjectif</div></div>
            <div><div className="trad-out">beau, brillant, magnifique</div><div className="trad-meta"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8v4h3l4 3.5v-11L6 8z" fill="currentColor" /><path d="M13.5 7.5a3.5 3.5 0 0 1 0 5" /></svg>/ˈzuː.ri/</div><p className="trad-note">Se dit de ce qui attire naturellement le regard.</p></div>
          </div>
        </div>
        <div className="zuri-txt">
          <h2>Que veut dire Zuri ?</h2>
          <p>En swahili, <b>zuri</b> veut dire beau, brillant. C'est l'idée derrière l'agence : mettre en valeur ce qui brille déjà chez chaque talent, plutôt que d'essayer de le faire rentrer dans un moule.</p>
        </div>
      </div>
    </div>
  </section>

  <section className="trust" id="marques">
    <div className="wrap rv"><div className="eyebrow">Marques</div><h2>Ils nous font confiance</h2></div>
    <div className="marquee" id="logos"><div className="track"><span className="logo-cell"><img src="/logos/logo-afro-nation.webp" alt="Afro Nation" width="120" height="60" loading="lazy" decoding="async" /></span><span className="logo-cell"><img src="/logos/logo-shein.webp" alt="Shein" width="120" height="60" loading="lazy" decoding="async" className="wm" /></span><span className="logo-cell"><img src="/logos/logo-temu.webp" alt="Temu" width="120" height="60" loading="lazy" decoding="async" /></span><span className="logo-cell"><img src="/logos/logo-teveo.webp" alt="Teveo" width="120" height="60" loading="lazy" decoding="async" /></span><span className="logo-cell"><img src="/logos/logo-paris-fc.webp" alt="Paris FC" width="120" height="60" loading="lazy" decoding="async" /></span><span className="logo-cell"><img src="/logos/logo-cure-vitamine.webp" alt="Cure Vitamine" width="120" height="60" loading="lazy" decoding="async" /></span><span className="logo-cell"><img src="/logos/logo-afro-nation.webp" aria-hidden="true" alt="" width="120" height="60" loading="lazy" decoding="async" /></span><span className="logo-cell"><img src="/logos/logo-shein.webp" aria-hidden="true" alt="" width="120" height="60" loading="lazy" decoding="async" className="wm" /></span><span className="logo-cell"><img src="/logos/logo-temu.webp" aria-hidden="true" alt="" width="120" height="60" loading="lazy" decoding="async" /></span><span className="logo-cell"><img src="/logos/logo-teveo.webp" aria-hidden="true" alt="" width="120" height="60" loading="lazy" decoding="async" /></span><span className="logo-cell"><img src="/logos/logo-paris-fc.webp" aria-hidden="true" alt="" width="120" height="60" loading="lazy" decoding="async" /></span><span className="logo-cell"><img src="/logos/logo-cure-vitamine.webp" aria-hidden="true" alt="" width="120" height="60" loading="lazy" decoding="async" /></span></div></div>
    <div className="marquee names" aria-hidden="true"><div className="track"><span>Teveo</span><span>Paris FC</span><span>Cure Vitamine</span><span>Afro Nation</span><span>Shein</span><span>Temu</span><span>Teveo</span><span>Paris FC</span><span>Cure Vitamine</span><span>Afro Nation</span><span>Shein</span><span>Temu</span></div></div>
  </section>

  <section className="closing" id="contact">
    <PublishForm />
  </section>
</main>
    </>
  );
}

import ContactButton from "@/components/ContactButton";
import ContactLink from "@/components/ContactLink";
import Ticker from "@/components/Ticker";

const TALENT_SLOTS = [
  { num: "01", niche: "Mode & lifestyle" },
  { num: "02", niche: "Football & culture" },
  { num: "03", niche: "Beauté & bien-être" },
  { num: "04", niche: "Tech & gaming" },
  { num: "05", niche: "Cuisine & terroir" },
  { num: "06", niche: "Humour & sketchs" },
  { num: "07", niche: "Entrepreneuriat" },
];

const SERVICES = [
  {
    idx: "Deals",
    title: "Partenariats de marque",
    text: "Sourcing, négociation et suivi des contrats avec des marques alignées sur votre image, jamais l'inverse.",
  },
  {
    idx: "Stratégie",
    title: "Direction éditoriale",
    text: "Calendrier de contenu, formats, positionnement par plateforme. On pense croissance sur la durée, pas vues du jour.",
  },
  {
    idx: "Production",
    title: "Accompagnement créatif",
    text: "Accès à des monteurs, réalisateurs et décors partenaires pour élever la qualité sans exploser le budget.",
  },
  {
    idx: "Business",
    title: "Structuration & gestion",
    text: "Facturation, fiscalité, statut juridique. On vous connecte aux bons experts pour sécuriser vos revenus.",
  },
  {
    idx: "Formation",
    title: "Zuri Academy",
    text: "Ateliers mensuels : prise de parole, négociation, algorithmes, gestion de communauté.",
  },
  {
    idx: "Réseau",
    title: "Communauté de talents",
    text: "Collaborations croisées entre les talents du roster, l'audience de l'un profite à l'audience de l'autre.",
  },
];

const PROCESS = [
  {
    num: "01",
    title: "Candidature",
    text: "Vous nous envoyez vos réseaux, vos chiffres et ce que vous voulez construire. Réponse sous 5 jours ouvrés.",
  },
  {
    num: "02",
    title: "Entretien",
    text: "Un échange avec un manager Zuri pour comprendre votre univers, vos objectifs et vos contraintes.",
  },
  {
    num: "03",
    title: "Stratégie",
    text: "On construit ensemble votre feuille de route à 6 et 12 mois : contenu, marques cibles, revenus visés.",
  },
  {
    num: "04",
    title: "Activation",
    text: "Premiers deals négociés, premiers contrats en poche. Vous créez, on gère le reste.",
  },
];

export default function Home() {
  return (
    <>
      <header>
        <nav>
          <div className="logo">
            ZURI<span>.</span>AGENCY
          </div>
          <div className="navlinks">
            <a href="#talents">Talents</a>
            <a href="#services">Services</a>
            <a href="#manifeste">Manifeste</a>
            <a href="#process">Comment ça marche</a>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <ContactButton className="btn btn-line">
              Nous contacter
            </ContactButton>
            <a href="#join" className="btn btn-fill">
              Rejoindre l&apos;agence
            </a>
          </div>
        </nav>
      </header>

      <Ticker />

      <div className="hero">
        <div className="dots" />
        <div className="wrap">
          <div className="eyebrow mono">✦ Agence de talents</div>
          <h1>
            On a du talent à
            <br />
            revendre. <span className="pop">Il est temps de briller.</span>
          </h1>
          <p className="lead">
            Zuri Agency repère, structure et développe des talents avec
            l&apos;exigence, les contrats et les moyens qu&apos;ils
            méritent.
          </p>
          <div className="hero-ctas">
            <a href="#join" className="btn btn-fill">
              Devenir Zuri
            </a>
            <a href="#talents" className="btn btn-line">
              Voir nos talents →
            </a>
          </div>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="num">0</div>
          <div className="label mono">
            Talents dans l&apos;équipe (pour l&apos;instant)
          </div>
        </div>
        <div className="stat">
          <div className="num">1</div>
          <div className="label mono">Fondateur, zéro sommeil</div>
        </div>
        <div className="stat">
          <div className="num">24/7</div>
          <div className="label mono">Obsession active</div>
        </div>
        <div className="stat">
          <div className="num">∞</div>
          <div className="label mono">Ambition disponible</div>
        </div>
      </div>

      <section className="manifeste" id="manifeste">
        <div className="wrap manifeste-grid">
          <div>
            <div className="kicker">Notre manifeste</div>
            <p>
              Le talent ne suffit pas sans les bonnes portes ouvertes, les
              bons contrats négociés et la bonne stratégie derrière.
            </p>
            <p>
              Zuri ne cherche pas à faire rentrer ses talents dans les cases
              des autres agences. On construit les nôtres, autour de ce qui
              rend chaque voix unique.
            </p>
            <p>
              Chaque talent qui rejoint Zuri garde son ton, son univers, sa
              liberté créative. Notre travail : faire en sorte que cette
              voix porte plus loin, plus vite, et soit payée à sa juste
              valeur.
            </p>
          </div>
          <div className="manifeste-list">
            <div className="manifeste-item">
              <h3>Représentation exigeante</h3>
              <p>
                Une équipe impliquée sur chaque dossier, pas une agence
                généraliste qui gère 200 comptes en pilote automatique.
              </p>
            </div>
            <div className="manifeste-item">
              <h3>Négociation sans compromis</h3>
              <p>
                Des grilles tarifaires claires, indexées sur l&apos;engagement
                réel, pas sur ce qu&apos;une marque propose en premier.
              </p>
            </div>
            <div className="manifeste-item">
              <h3>Trajectoire, pas coup d&apos;un soir</h3>
              <p>
                On construit des carrières sur plusieurs années, jusqu&apos;à
                l&apos;indépendance financière.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="talents">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="kicker">Le roster</div>
              <h2>0 talents. 8 places. 1 place qui a ton nom dessus</h2>
            </div>
            <p className="desc">
              Le roster est vide, littéralement. On préfère le dire plutôt
              que d&apos;inventer des chiffres : les huit premières places
              sont à prendre.
            </p>
          </div>
          <div className="talent-grid">
            {TALENT_SLOTS.map((slot) => (
              <div className="talent-card" key={slot.num}>
                <div className="medal">{slot.num}</div>
                <h3>Place libre</h3>
                <div className="niche mono">{slot.niche}</div>
                <div className="followers">En attente d&apos;un nom</div>
              </div>
            ))}
            <a
              href="#join"
              className="talent-card"
              style={{ background: "var(--lime)", textDecoration: "none" }}
            >
              <div
                className="medal"
                style={{ background: "var(--ink)", color: "var(--lime)" }}
              >
                08
              </div>
              <h3>Toi, peut-être ?</h3>
              <div className="niche mono">Candidate ici</div>
              <div className="followers">On répond sous 5 jours</div>
            </a>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="kicker">Ce qu&apos;on fait</div>
              <h2>De la stratégie de contenu aux contrats de marque</h2>
            </div>
            <p className="desc">
              Une équipe dédiée, pas un interlocuteur unique noyé sous 40
              comptes.
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s) => (
              <div className="service-card" key={s.idx}>
                <div className="idx mono">{s.idx}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="kicker">Le parcours</div>
              <h2>Comment on travaille ensemble</h2>
            </div>
            <p className="desc">
              Un process simple, du premier message au premier contrat en
              poche.
            </p>
          </div>
          <div className="process-list">
            {PROCESS.map((p) => (
              <div className="process-row" key={p.num}>
                <div className="num">{p.num}</div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testi">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="kicker">Pourquoi maintenant</div>
              <h2>Arriver au début, ça change tout</h2>
            </div>
          </div>
          <div className="testi-grid">
            <div className="testi-card">
              <p className="quote">
                &quot;Les huit premiers talents construisent l&apos;agence
                avec nous. Grille tarifaire, positionnement, image de
                marque : votre avis compte autant que le nôtre.&quot;
              </p>
              <div className="who">Steve</div>
              <div className="role">Fondateur, Zuri Agency</div>
            </div>
            <div className="testi-card">
              <p className="quote">
                &quot;Aujourd&apos;hui, chaque marque qui nous contacte
                n&apos;a qu&apos;un seul talent à découvrir. C&apos;est le
                meilleur moment pour être ce talent.&quot;
              </p>
              <div className="who">Steve</div>
              <div className="role">Fondateur, Zuri Agency</div>
            </div>
          </div>
        </div>
      </section>

      <div className="join" id="join">
        <div className="wrap">
          <div className="kicker" style={{ background: "var(--ink)", color: "var(--paper)" }}>
            Rejoindre l&apos;agence
          </div>
          <h2>Ton talent mérite une agence qui le voit vraiment</h2>
          <p>
            Ouvert aux talents de toutes tailles d&apos;audience, dès 10K
            abonnés engagés. Pas de frais d&apos;inscription, pas
            d&apos;exclusivité imposée sur tous les formats.
          </p>
          <div className="hero-ctas">
            <a href="mailto:contact@zuri.agency" className="btn btn-fill">
              Déposer ma candidature
            </a>
            <ContactButton className="btn btn-line">
              Parler à un manager
            </ContactButton>
          </div>
        </div>
      </div>

      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="logo" style={{ color: "var(--paper)" }}>
                ZURI<span style={{ color: "var(--lime)" }}>.</span>AGENCY
              </div>
              <p className="footer-desc">
                L&apos;agence qui repère et développe les talents à fort
                potentiel, en France et à l&apos;international.
              </p>
            </div>
            <div>
              <h4>Agence</h4>
              <ul>
                <li>
                  <a href="#manifeste">Manifeste</a>
                </li>
                <li>
                  <a href="#talents">Talents</a>
                </li>
                <li>
                  <a href="#services">Services</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Talents</h4>
              <ul>
                <li>
                  <a href="#process">Rejoindre</a>
                </li>
                <li>
                  <a href="#">Zuri Academy</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>
                  <ContactLink>Nous contacter</ContactLink>
                </li>
                <li>
                  <a href="mailto:contact@zuri.agency">
                    contact@zuri.agency
                  </a>
                </li>
                <li>
                  <a href="#">Instagram</a>
                </li>
                <li>
                  <a href="#">TikTok</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Zuri Agency. Tous droits réservés.</span>
            <span>Paris, France</span>
          </div>
        </div>
      </footer>
    </>
  );
}

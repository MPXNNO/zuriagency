import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HeroVideo from "@/components/HeroVideo";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <section className="hero">
        <div className="wrap">
          <div className="hero-text">
            <h1>Zuri Agency</h1>
            <p className="hero-tagline">Influence. Strategy. Sport.</p>
            <div className="hero-copy">
              <p>
                Zuri Agency est une agence créée par Steve K. Dompe, qui
                accompagne les talents, les entrepreneurs et les entreprises
                dans leur développement.
              </p>
              <p>
                Notre ambition est simple : identifier le potentiel,
                construire une stratégie et créer les conditions pour le
                développer.
              </p>
              <p>
                À travers trois pôles d&apos;expertise, Zuri Agency intervient
                dans les domaines du marketing d&apos;influence, de la
                stratégie d&apos;entreprise et du management sportif.
              </p>
            </div>
          </div>

          <HeroVideo />
        </div>
      </section>

      <section className="zuri-meaning">
        <div className="wrap zuri-meaning-grid">
          <div>
            <div className="zuri-letters">
              <span>Z</span>
              <span>U</span>
              <span>R</span>
              <span>I</span>
            </div>
            <h2>Que veut dire Zuri ?</h2>
            <p>
              En swahili, <b>zuri</b> veut dire beau, brillant. C&apos;est
              l&apos;idée derrière l&apos;agence : mettre en valeur ce qui
              brille déjà chez chaque talent, plutôt que d&apos;essayer de le
              faire rentrer dans un moule.
            </p>
          </div>
          <div className="zuri-definition">
            <div className="word">zuri</div>
            <div className="pos mono">adjectif · swahili</div>
            <p>
              Beau, brillant, magnifique. Se dit de ce qui attire naturellement
              le regard.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter
        links={[
          { href: "/fondateur", label: "Le mot du fondateur" },
          { href: "/contact", label: "Nous contacter" },
        ]}
      />
    </>
  );
}

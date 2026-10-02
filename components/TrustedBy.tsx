/**
 * Bloc "Ils nous font confiance" de l'accueil.
 * Deux bandeaux qui défilent en sens opposés : les logos, puis les noms en lettres au contour.
 * Chaque liste est écrite deux fois pour que le défilement boucle sans saut.
 * Pour ajouter une marque : déposer son logo dans public/logos/ et ajouter une ligne à BRANDS.
 */

type Brand = { name: string; logo: string; small?: boolean };

const BRANDS: Brand[] = [
  { name: "Afro Nation", logo: "/logos/logo-afro-nation.png" },
  { name: "Shein", logo: "/logos/logo-shein.png", small: true },
  { name: "Temu", logo: "/logos/logo-temu.png" },
  { name: "Teveo", logo: "/logos/logo-teveo.png" },
  { name: "Paris FC", logo: "/logos/logo-paris-fc.png" },
  { name: "Cure Vitamine", logo: "/logos/logo-cure-vitamine.png" },
];

// le second bandeau démarre décalé pour ne pas répéter la même marque juste en dessous
const half = Math.ceil(BRANDS.length / 2);
const SHIFTED = [...BRANDS.slice(half), ...BRANDS.slice(0, half)];

export default function TrustedBy() {
  return (
    <section className="trust">
      <div className="wrap">
        <div className="eyebrow">Marques</div>
        <h2>Ils nous font confiance</h2>
      </div>

      <div className="trust-bands">
        <div className="trust-band">
          <div className="trust-track">
            {[0, 1].map((pass) =>
              BRANDS.map((b) => (
                <span
                  className="trust-logo"
                  key={`${pass}-${b.name}`}
                  aria-hidden={pass === 1 ? true : undefined}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.logo}
                    alt={pass === 0 ? b.name : ""}
                    className={b.small ? "is-wordmark" : undefined}
                    loading="lazy"
                  />
                </span>
              ))
            )}
          </div>
        </div>

        <div className="trust-band rev" aria-hidden="true">
          <div className="trust-track">
            {[0, 1].map((pass) =>
              SHIFTED.map((b) => (
                <span className="trust-item" key={`${pass}-${b.name}`}>
                  <span className="trust-name">{b.name}</span>
                  <span className="trust-sep" />
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

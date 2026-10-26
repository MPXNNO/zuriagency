// Généré à partir de la maquette validée (balisage statique, rendu côté serveur).
import Link from "next/link";

export default function ContactMarkup() {
  return (
    <>
<main>
  <section className="ct wrap">
    <div className="ct-head">
      <div><div className="eyebrow">Contact</div><h1><span className="w" style={{animationDelay: '0.20s'}}>Parlons</span> <span className="w" style={{animationDelay: '0.30s'}}>de</span> <span className="w" style={{animationDelay: '0.40s'}}>votre</span> <span className="w" style={{animationDelay: '0.50s'}}>projet</span></h1><p>Une marque, un talent qui veut nous rejoindre, une question : l'équipe répond sous 48h.</p></div>
      <div className="ct-info"><div><span>Email</span><span>contact@zuriagency.fr</span></div><div><span>Basée à</span><span>Paris, France</span></div><div><span>Réponse</span><span>Sous 48h</span></div></div>
    </div>
    <div className="ct-w" id="ctW">
      <form className="ct-c" id="ctC" noValidate>
        <div className="ct-pm">Paris<br />✦<br />Réponse<br />sous 48h</div>
        <div className="l"><label className="ct-lab" htmlFor="ct-t">Message</label><span className="from">Carte postale · Zuri</span><textarea id="ct-t" placeholder="Parlez-nous de votre projet…"></textarea></div>
        <div className="r">
          <div><span className="ct-lab" style={{textAlign: 'right', marginBottom: '8px'}}>Vous êtes</span><div className="ct-stamps" role="radiogroup" aria-label="Vous êtes"><button type="button" className="ct-st" role="radio" aria-checked="false"><span>Une marque</span></button><button type="button" className="ct-st" role="radio" aria-checked="false"><span>Un talent</span></button><button type="button" className="ct-st" role="radio" aria-checked="false"><span>Un média</span></button><button type="button" className="ct-st" role="radio" aria-checked="false"><span>Autre</span></button></div></div>
          <div className="ct-row"><div><label className="ct-lab" htmlFor="ct-fn">Prénom</label><input id="ct-fn" placeholder="Votre prénom" autoComplete="given-name" /></div><div><label className="ct-lab" htmlFor="ct-n">Nom</label><input id="ct-n" placeholder="Votre nom" autoComplete="family-name" /></div></div>
          <div><label className="ct-lab" htmlFor="ct-m">Email</label><input id="ct-m" type="email" placeholder="vous@marque.com" autoComplete="email" /></div>
          <div className="ct-to">À : Zuri Agency<br />contact@zuriagency.fr<br />Paris, France</div>
          <div className="ct-err" role="alert"></div>
          <button className="ct-send" type="submit">Poster la carte ✉</button>
        </div>
      </form>
    </div>
    <div className="ct-ok" id="ctOk" aria-live="polite"><b>Message envoyé ✦</b><p>Merci, on vous répond sous 48h. En attendant, allez jeter un œil au roster.</p><div className="acts"><Link href="/talents">Voir le roster</Link><button type="button" id="ctAgain">Écrire une autre carte</button></div></div>
  </section>
</main>
    </>
  );
}

// Généré à partir de la maquette validée (balisage statique, rendu côté serveur).

export default function ManagementMarkup() {
  return (
    <>
<main>
  <section className="sp-w" id="spW" aria-label="Management sportif">
    <div className="sp-st">
      <div className="sp-top"><span className="rec"></span>Analyse vidéo · Zuri<span className="cam"><span className="on">Vue tactique</span><span>Joueur suivi</span></span><span className="tc">00:00</span></div>
      <div className="sp-scr">
        <canvas id="spCv" aria-hidden="true"></canvas>
        <div className="sp-ann off" aria-live="polite"><small></small><b></b></div>
        <div className="sp-ov a"><div className="eyebrow">Management sportif</div><h1><span className="w" style={{animationDelay: '0.20s'}}>Accompagner</span> <span className="w" style={{animationDelay: '0.28s'}}>les</span> <span className="w" style={{animationDelay: '0.36s'}}>joueurs</span> <span className="w" style={{animationDelay: '0.44s'}}>et</span> <span className="w" style={{animationDelay: '0.52s'}}>les</span> <span className="w" style={{animationDelay: '0.60s'}}>familles</span> <span className="w" style={{animationDelay: '0.68s'}}>au-delà</span> <span className="w" style={{animationDelay: '0.76s'}}>du</span> <span className="w" style={{animationDelay: '0.84s'}}>terrain.</span></h1><p>Le parcours d'un jeune joueur ou d'un sportif peut être complexe. Choix d'un club, entraînement, développement individuel, orientation, préparation ou compréhension de l'environnement sportif : les bonnes décisions peuvent avoir un impact important sur la progression d'un joueur.</p><div className="sp-play"><i>▶</i>Faites défiler pour lancer l'analyse</div></div>
        <div className="sp-ov b wait"><div className="eyebrow">Un accompagnement sur-mesure</div><h2>Zuri Agency propose un accompagnement destiné aux joueurs et à leurs familles qui souhaitent bénéficier d'un regard extérieur et de conseils pour mieux structurer leur parcours sportif.</h2></div>
      </div>
      <div className="sp-tl"><div className="tr"><i></i></div><button type="button" className="mk" style={{left: '8.0%'}} aria-label="Analyse du parcours et des objectifs du joueur">1</button><button type="button" className="mk" style={{left: '18.5%'}} aria-label="Conseils sur l'environnement sportif">2</button><button type="button" className="mk" style={{left: '29.0%'}} aria-label="Orientation et réflexion autour des choix de clubs">3</button><button type="button" className="mk" style={{left: '39.5%'}} aria-label="Accompagnement des parents dans leurs questionnements">4</button><button type="button" className="mk" style={{left: '50.0%'}} aria-label="Conseils sur la progression individuelle">5</button><button type="button" className="mk" style={{left: '60.5%'}} aria-label="Identification des axes de travail">6</button><button type="button" className="mk" style={{left: '71.0%'}} aria-label="Mise en place d'un accompagnement complémentaire à l'entraînement du club">7</button><button type="button" className="mk" style={{left: '81.5%'}} aria-label="Conseils sur la préparation et la régularité">8</button><button type="button" className="mk" style={{left: '92.0%'}} aria-label="Mise en relation avec des professionnels lorsque cela est pertinent">9</button><span className="ph"></span></div>
    </div>
  </section>
  <ul style={{position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)'}}><li>Analyse du parcours et des objectifs du joueur</li><li>Conseils sur l'environnement sportif</li><li>Orientation et réflexion autour des choix de clubs</li><li>Accompagnement des parents dans leurs questionnements</li><li>Conseils sur la progression individuelle</li><li>Identification des axes de travail</li><li>Mise en place d'un accompagnement complémentaire à l'entraînement du club</li><li>Conseils sur la préparation et la régularité</li><li>Mise en relation avec des professionnels lorsque cela est pertinent</li></ul>
  <section className="sp-note"><div className="wrap"><div className="eyebrow">✦ Notre approche</div><p>L'objectif n'est pas de remplacer le club ou les éducateurs, mais d'apporter <em>un accompagnement complémentaire et personnalisé autour du joueur et de son projet.</em></p></div></section>
  <section className="sp-rdv"><div className="wrap"><div className="box">
    <div className="eyebrow">Rendez-vous offert</div>
    <h2>Un point de 30 minutes sur le parcours du joueur.</h2>
    <p>Parlez-nous du club, du niveau et des objectifs : nous revenons vers vous pour caler un échange de 30 minutes, offert.</p>
    <button className="sp-btn" type="button" data-sprdv>Prendre un rendez-vous de 30 min offert →</button>
  </div></div></section>
</main>
<div className="sp-md" id="spMd" role="dialog" aria-modal="true" aria-label="Réserver un échange sportif"><div className="sp-card"><button className="x" type="button" aria-label="Fermer">✕</button>
  <form noValidate><div className="eyebrow">Rendez-vous offert · 30 min</div><h3>Réservez votre échange sportif</h3><p className="sub">Laissez-nous quelques informations sur le joueur, notre équipe revient vers vous sous 48h pour fixer un créneau.</p>
    <label htmlFor="s-name">Nom (joueur ou parent)</label><input id="s-name" placeholder="Votre nom" autoComplete="name" />
    <div className="row"><div><label htmlFor="s-mail">Email</label><input id="s-mail" type="email" placeholder="vous@email.com" autoComplete="email" /></div><div><label htmlFor="s-tel">Téléphone</label><input id="s-tel" type="tel" placeholder="06 12 34 56 78" autoComplete="tel" /></div></div>
    <div className="row"><div><label htmlFor="s-club">Club actuel</label><input id="s-club" placeholder="Nom du club" /></div><div><label htmlFor="s-niv">Niveau de pratique</label><select id="s-niv"><option>National</option><option>Régional</option><option>Départemental</option><option>Loisir</option><option>Autre</option></select></div></div>
    <label htmlFor="s-poste">Poste / spécialité</label><input id="s-poste" placeholder="Ex : attaquant, milieu..." />
    <label htmlFor="s-msg">Votre besoin (optionnel)</label><textarea id="s-msg" placeholder="Quelques mots sur le parcours et les objectifs"></textarea>
    <div className="er" role="alert"></div>
    <button className="sp-btn" type="submit">Envoyer ma demande →</button></form>
  <div className="ok" aria-live="polite"><div className="eyebrow">Rendez-vous offert · 30 min</div><b>Demande envoyée ✦</b><p>Merci ! Notre équipe revient vers vous sous 48h pour fixer un créneau.</p></div>
</div></div>
    </>
  );
}

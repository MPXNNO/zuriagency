type Talent = {
  name: string;
  photo: string;
  instagram: string;
  tiktok: string;
};

const TALENTS: Talent[] = [
  {
    name: "Antoine",
    photo: "/talents/talent-01.jpg",
    instagram: "https://www.instagram.com/lostantwan/",
    tiktok: "https://www.tiktok.com/search?q=lostantwan&t=1789720978460",
  },
  {
    name: "Clyde",
    photo: "/talents/talent-02.jpg",
    instagram: "https://www.instagram.com/killa_us/",
    tiktok: "https://www.tiktok.com/@killa_us?lang=fr",
  },
  {
    name: "Anaïs",
    photo: "/talents/talent-03.jpg",
    instagram: "https://www.instagram.com/anaismonteiro9/",
    tiktok: "https://www.tiktok.com/@nana.toktok9?lang=fr",
  },
  {
    name: "Mejane",
    photo: "/talents/talent-04.jpg",
    instagram: "https://www.instagram.com/mmandrin/",
    tiktok: "https://www.tiktok.com/@mmandrin?lang=fr",
  },
];

export default function TalentGrid() {
  return (
    <>
      <div className="talent-grid">
        {TALENTS.map((t) => (
          <div className="tcard" key={t.name}>
            <div className="ph">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.photo} alt={`${t.name} — Talent Zuri Agency`} loading="lazy" />
            </div>
            <div className="info">
              <b>{t.name}</b>
              <div className="social">
                <a href={t.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
                <a href={t.tiktok} target="_blank" rel="noopener noreferrer">
                  TikTok
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <a className="tcard-more-banner" href="/contact">
        <span className="plus">+</span>
        <span>Plus de talents ? Nous contacter</span>
      </a>
    </>
  );
}

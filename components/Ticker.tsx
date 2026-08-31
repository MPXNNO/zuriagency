const ITEMS = [
  { text: "TALENT" },
  { text: "AMBITION", color: "pink" },
  { text: "DEALS", color: "blue" },
  { text: "BRILLER", color: "pink" },
  { text: "ZURI AGENCY", color: "blue" },
];

function Loop({ dupKey }: { dupKey: string }) {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={`${dupKey}-${i}`} className="ticker-item">
          {item.text}
          <span className={item.color ?? ""}> •</span>
        </span>
      ))}
    </>
  );
}

export default function Ticker() {
  return (
    <div className="ticker-strip">
      <div className="ticker-track">
        <Loop dupKey="a" />
        <Loop dupKey="b" />
      </div>
    </div>
  );
}

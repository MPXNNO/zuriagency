"use client";

export default function HeroVideo() {
  return (
    <div className="video-shell">
      <div className="diamonds">
        <div
          className="video-frame"
          aria-label="Vidéo de présentation Zuri Agency, lecture automatique"
        >
          <video id="heroVideoEl" autoPlay muted loop playsInline>
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <button
            className="mute-btn"
            id="muteBtn"
            aria-label="Activer le son"
            onClick={(e) => {
              const btn = e.currentTarget;
              const v = document.getElementById(
                "heroVideoEl"
              ) as HTMLVideoElement | null;
              if (!v) return;
              v.muted = !v.muted;
              btn.textContent = v.muted ? "🔇" : "🔊";
            }}
          >
            🔇
          </button>
          <div className="video-caption">
            <span className="tag mono">
              <span className="live-dot" />
              Showreel Zuri
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

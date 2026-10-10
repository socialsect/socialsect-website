'use client'
import { useState, useMemo, useRef, useEffect } from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import { isPreloaded } from '../../lib/videoPreloader'
import './ContentLibrary.css'
import { CONTENT_LIBRARY_REELS as REELS } from '../../lib/contentLibraryReels'

const VERTICALS = [
  "All",
  "Orthopaedics",
  "Med Spa",
  "Dental",
  "Vascular",
  "Counselling",
  "Testimonials",
];


function buildUrls(rawUrl) {
  if (!rawUrl || rawUrl === "REPLACE_ME") {
    return { thumb: null, video: null };
  }
  return { thumb: null, video: rawUrl };
}

function ReelCard({ reel }) {
  const { thumb, video } = buildUrls(reel.url);
  const isReady = Boolean(video);
  const cardRef = useRef(null);
  const cached = isPreloaded(video);
  const [shouldLoad, setShouldLoad] = useState(cached);
  const [isLoaded, setIsLoaded] = useState(cached);

  useEffect(() => {
    if (cached) return;
    if (!cardRef.current) return;
    const el = cardRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [cached]);

  return (
    <div ref={cardRef} className={`reel-card ${!isLoaded ? 'reel-card--loading' : ''}`}>
      <div className="reel-card__media">
        {isReady && shouldLoad ? (
          <VideoPlayer 
            src={video} 
            poster={thumb} 
            onLoadedData={() => setIsLoaded(true)}
          />
        ) : isReady ? (
          <div className="reel-card__placeholder">
            <div className="reel-card__spinner" />
          </div>
        ) : (
          <div className="reel-card__placeholder">
            <span className="reel-card__placeholder-text">
              paste video URL for &ldquo;{reel.title}&rdquo;
            </span>
          </div>
        )}

        <span className="reel-card__number">
          {reel.id}
        </span>
      </div>

      <div className="reel-card__info">
        <span className="reel-card__title">
          {reel.title}
        </span>
        <span className="reel-card__tag">
          {reel.vertical}
        </span>
      </div>
    </div>
  );
}

export default function ContentLibrary() {
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () =>
      active === "All" ? REELS : REELS.filter((r) => r.vertical === active),
    [active]
  );

  const totalReels = String(REELS.length).padStart(3, "0");

  return (
    <main className="content-library">
      <header className="content-library__hero">
        <p className="content-library__overline">CONTENT LIBRARY</p>
        <h1 className="content-library__title">
          Ads we&rsquo;ve shot, cut, and shipped for clinics.
        </h1>
        <p className="content-library__desc">
          Every reel below ran as a live acquisition ad for an orthopaedic,
          dermatology, dental, med spa, or vascular practice , browse by
          specialty.
        </p>
        <div className="content-library__stat">
          <span className="content-library__stat-number">{totalReels}</span>
          <span className="content-library__stat-label">REELS PRODUCED</span>
        </div>
      </header>

      <nav className="content-library__filters" aria-label="Filter by specialty">
        {VERTICALS.map((v) => (
          <button
            key={v}
            onClick={() => setActive(v)}
            className={`content-library__filter ${active === v ? "content-library__filter--active" : ""}`}
          >
            {v}
          </button>
        ))}
      </nav>

      {filtered.length === 0 ? (
        <p className="content-library__empty">
          No reels tagged &ldquo;{active}&rdquo; yet.
        </p>
      ) : (
        <div className="content-library__grid">
          {filtered.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>
      )}
    </main>
  );
}

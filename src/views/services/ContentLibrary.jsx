'use client'
import { useState, useMemo, useRef, useEffect } from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import { isPreloaded } from '../../lib/videoPreloader'
import './ContentLibrary.css'

const VERTICALS = [
  "All",
  "Orthopaedics",
  "Med Spa",
  "Dental",
  "Vascular",
  "Testimonials",
];

const REELS = [
  { id: "001", title: "Ortho Patient Journey", vertical: "Orthopaedics", url: "https://aquamarine-bee-678141.hostingersite.com/videos/%231.mp4" },
  { id: "002", title: "Shoulder Procedure  Surgical Walkthrough", vertical: "Orthopaedics", url: "https://aquamarine-bee-678141.hostingersite.com/videos/0214%20(2)(1).mov" },
  { id: "003", title: "Med Spa Treatment Experience", vertical: "Med Spa", url: "https://aquamarine-bee-678141.hostingersite.com/videos/544.mp4" },
  { id: "004", title: "Aesthetic Results  Before & After", vertical: "Med Spa", url: "https://aquamarine-bee-678141.hostingersite.com/videos/547.mp4" },
  { id: "005", title: "Animated Patient Education Explainer", vertical: "Orthopaedics", url: "https://aquamarine-bee-678141.hostingersite.com/videos/Animated_1.mp4" },
  { id: "006", title: "¿Listo para eliminar tus várices?", vertical: "Vascular", url: "https://aquamarine-bee-678141.hostingersite.com/videos/%C2%BFListo%20para%20eliminar%20tus%20varices%20%F0%9F%92%89%C2%A1Deja%20que%20los%20expertos%20se%20encarguen%20de%20ello!%20En%20@nymetrovein%20.mp4" },
  { id: "007", title: "Miami Clinic  English Ad", vertical: "Orthopaedics", url: "https://aquamarine-bee-678141.hostingersite.com/videos/Miami%20Eng_1.mp4" },
  { id: "008", title: "Miami Clinic  Spanish Ad", vertical: "Orthopaedics", url: "https://aquamarine-bee-678141.hostingersite.com/videos/Miami%20esp_1.mp4" },
  { id: "009", title: "MSI Patient Story  Testimonial 1", vertical: "Testimonials", url: "https://aquamarine-bee-678141.hostingersite.com/videos/Msi%20Testimonial%201.mov" },
  { id: "010", title: "MSI Patient Story  Testimonial 2", vertical: "Testimonials", url: "https://aquamarine-bee-678141.hostingersite.com/videos/Msi%20testimonial%202.mov" },
  { id: "011", title: "Online Course  Practice Growth", vertical: "Orthopaedics", url: "https://aquamarine-bee-678141.hostingersite.com/videos/Online%20course_2.mp4" },
  { id: "012", title: "Remedios vs. Resultados Reales", vertical: "Vascular", url: "https://aquamarine-bee-678141.hostingersite.com/videos/Si%20piensas%20que%20los%20remedios%20untados%20te%20van%20a%20eliminar%20las%20varices%20pues%20no%20pierdas%20tu%20tiempo%20ombe.mp4" },
  { id: "013", title: "Socket Grafting  Dental Procedure", vertical: "Dental", url: "https://aquamarine-bee-678141.hostingersite.com/videos/Socket%20grafting_2.mp4" },
  { id: "014", title: "Vein Treatment  Clinical Results", vertical: "Vascular", url: "https://aquamarine-bee-678141.hostingersite.com/videos/Veins_3_1.mp4" },
  { id: "015", title: "Ortho Ad Campaign  Cut 1", vertical: "Orthopaedics", url: "https://aquamarine-bee-678141.hostingersite.com/videos/Video%201.mp4" },
  { id: "016", title: "Patient Testimonial  Aug 14", vertical: "Testimonials", url: "https://aquamarine-bee-678141.hostingersite.com/videos/WhatsApp%20Video%202025-08-14%20at%202.28.13%20PM.mp4" },
  { id: "017", title: "Patient Testimonial  Aug 21", vertical: "Testimonials", url: "https://aquamarine-bee-678141.hostingersite.com/videos/WhatsApp%20Video%202025-08-21%20at%2010.53.43%20PM%20(1).mp4" },
  { id: "018", title: "Patient Testimonial  Aug 21 (Alt)", vertical: "Testimonials", url: "https://aquamarine-bee-678141.hostingersite.com/videos/WhatsApp%20Video%202025-08-21%20at%205.53.49%20PM%20(1).mp4" },
  { id: "019", title: "Patient Testimonial  Aug 21 (Alt 2)", vertical: "Testimonials", url: "https://aquamarine-bee-678141.hostingersite.com/videos/WhatsApp%20Video%202025-08-21%20at%205.53.49%20PM.mp4" },
  { id: "020", title: "Patient Testimonial  Sep 4", vertical: "Testimonials", url: "https://aquamarine-bee-678141.hostingersite.com/videos/WhatsApp%20Video%202025-09-04%20at%201.18.04%20PM.mp4" },
  { id: "021", title: "A mis 41 años  piernas sanas", vertical: "Vascular", url: "https://aquamarine-bee-678141.hostingersite.com/videos/A%20mis%2041%20a%C3%B1os%20estoy%20contenta%20con%20la%20salud%20de%20mis%20piernas%20%F0%9F%A6%B5%20gracias%20a%20@nymetrovein%20que%20me%20elimin%20(1).mp4" },
  { id: "022", title: "Vascular Patient  Life After Treatment", vertical: "Vascular", url: "https://aquamarine-bee-678141.hostingersite.com/videos/AQPIFdom17VsWLVOxSM4qlVxKrghIv-PFTFZ4fUVLPm7QgbKyRmrs_BDUCT5hD3gtXEzfHa17S_nXzC_67HX5JUg.mp4" },
  { id: "023", title: "Cómo lucir unas piernas hermosas", vertical: "Vascular", url: "https://aquamarine-bee-678141.hostingersite.com/videos/C%C3%B3mo%20lucir%20unas%20piernas%20hermosas%20gracias%20a%20@nymetrovein%20elim%C3%ADnalas%20sin%20dolor%20y%20en%20manos%20de%20m%C3%A9dic.mp4" },
  { id: "024", title: "Respétame  @maicolnova", vertical: "Vascular", url: "https://aquamarine-bee-678141.hostingersite.com/videos/Resp%C3%A9tame%20@maicolnova%20,%20qu%C3%A9%20lo%20m%C3%ADo%20ha%20sido%20palo%20y%20palo%20desde%20el%208%20de%20enero%20,%20pero%20ninguno%20como%20.mp4" },
  { id: "025", title: "Ciudadana Sin Venas Varicosas", vertical: "Vascular", url: "https://aquamarine-bee-678141.hostingersite.com/videos/Si%20soy%20una%20ciudadana%20seria%20,%20pero%20sin%20venas%20varicosas%20tambi%C3%A9n%20un%20chin%20atrevida%20,%20gracias%20a%20@nyme%20(1).mp4" },
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

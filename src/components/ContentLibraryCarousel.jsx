'use client'
import { useRef, useState, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import VideoPlayer from './VideoPlayer'
import './ContentLibraryCarousel.css'

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

function CarouselCard({ reel }) {
  const { thumb, video } = buildUrls(reel.url);
  const isReady = Boolean(video);
  const cardRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (!cardRef.current) return
    const el = cardRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '600px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!isReady) {
    return (
      <div className="clc-card">
        <div className="clc-card__media">
          <div className="clc-card__placeholder" />
        </div>
      </div>
    );
  }

  return (
    <div className="clc-card" ref={cardRef}>
      <div className="clc-card__media">
        {shouldLoad ? (
          <VideoPlayer src={video} poster={thumb} autoPlay loop />
        ) : (
          <div className="clc-card__placeholder">
            <div className="clc-card__spinner" />
          </div>
        )}
      </div>
      <div className="clc-card__info">
        <span className="clc-card__title">{reel.title}</span>
        <span className="clc-card__tag">{reel.vertical}</span>
      </div>
    </div>
  );
}

export default function ContentLibraryCarousel() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  const scroll = useCallback((dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    setTimeout(updateScrollState, 400);
  }, [updateScrollState]);

  return (
    <section className="clc">
      <div className="clc__inner">
        <header className="clc__header">
          <p className="clc__overline">CONTENT LIBRARY</p>
          <h2 className="clc__title">
            Ads we&rsquo;ve shot, cut, and shipped for clinics.
          </h2>
          <p className="clc__desc">
            Every reel below ran as a live acquisition ad. Browse the full library by specialty.
          </p>
        </header>

        <div className="clc__carousel-wrapper">
          <button
            className={`clc__arrow clc__arrow--left ${canScrollLeft ? "clc__arrow--visible" : ""}`}
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft size={22} />
          </button>

          <div
            ref={scrollRef}
            className="clc__track"
            onScroll={updateScrollState}
          >
            {REELS.map((reel) => (
              <CarouselCard key={reel.id} reel={reel} />
            ))}
          </div>

          <button
            className={`clc__arrow clc__arrow--right ${canScrollRight ? "clc__arrow--visible" : ""}`}
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="clc__cta">
          <Link to="/services/brand/content-library" className="clc__cta-btn">
            See the whole content library
            <svg
              className="clc__cta-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

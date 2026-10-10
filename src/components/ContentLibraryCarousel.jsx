'use client'
import { useRef, useState, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import VideoPlayer from './VideoPlayer'
import { isPreloaded } from '../lib/videoPreloader'
import './ContentLibraryCarousel.css'
import { CONTENT_LIBRARY_REELS as REELS } from '../lib/contentLibraryReels'


function buildUrls(rawUrl) {
  if (!rawUrl || rawUrl === "REPLACE_ME") {
    return { thumb: null, video: null };
  }
  return { thumb: null, video: rawUrl };
}

function CarouselCard({ reel, onLoaded }) {
  const { thumb, video } = buildUrls(reel.url);
  const isReady = Boolean(video);
  const cardRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const alreadyPreloaded = useRef(false)

  useEffect(() => {
    alreadyPreloaded.current = isPreloaded(video)
    if (alreadyPreloaded.current) {
      setShouldLoad(true)
      if (onLoaded) onLoaded()
      return
    }
    if (!cardRef.current) return
    const el = cardRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '1200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [video, onLoaded])

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
          <VideoPlayer src={video} poster={thumb} autoPlay loop onLoadedData={onLoaded} />
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

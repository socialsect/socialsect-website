import { useRef, useEffect, useState } from 'react';
import DarkVeil from './DarkVeil.jsx';

/**
 * LazyDarkVeil - A performance-optimized wrapper for DarkVeil animation
 * Uses Intersection Observer to lazy-load the WebGL animation only when it's
 * about to enter the viewport, preventing it from blocking initial page load
 */
export default function LazyDarkVeil({
  hueShift = 0,
  noiseIntensity = 0,
  scanlineIntensity = 0,
  speed = 0.01,
  scanlineFrequency = 0,
  warpAmount = 0,
  resolutionScale = 1,
  blend = 1.2,
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create Intersection Observer with a generous rootMargin to start loading
    // before the element enters the viewport (300px threshold)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we can stop observing
          observer.unobserve(container);
        }
      },
      {
        rootMargin: '300px', // Start loading 300px before the element enters viewport
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="lazy-dark-veil-container"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
      }}
      aria-hidden
    >
      {isVisible && (
        <DarkVeil
          hueShift={hueShift}
          noiseIntensity={noiseIntensity}
          scanlineIntensity={scanlineIntensity}
          speed={speed}
          scanlineFrequency={scanlineFrequency}
          warpAmount={warpAmount}
          resolutionScale={resolutionScale}
          blend={blend}
        />
      )}
    </div>
  );
}

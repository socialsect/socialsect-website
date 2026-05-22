import { useEffect, useRef, useState } from 'react';

export default function DeferredSection({
  load,
  minHeight = 0,
  rootMargin = '300px',
  className,
}) {
  const containerRef = useRef(null);
  const [LoadedComponent, setLoadedComponent] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || LoadedComponent) return;

    let cancelled = false;

    const loadComponent = async () => {
      try {
        const module = await load();
        if (!cancelled) {
          setLoadedComponent(() => module.default);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to load deferred section', error);
        }
      }
    };

    if (!('IntersectionObserver' in window)) {
      loadComponent();
      return () => {
        cancelled = true;
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          loadComponent();
        }
      },
      { rootMargin }
    );

    observer.observe(container);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [LoadedComponent, load, rootMargin]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={minHeight ? { minHeight } : undefined}
    >
      {LoadedComponent ? <LoadedComponent /> : null}
    </div>
  );
}
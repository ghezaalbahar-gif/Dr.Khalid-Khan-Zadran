import { useEffect } from 'react';
import Lenis from 'lenis';

let instance = null;
let paused = false;

/** Lenis keeps its own scroll loop, so a locked menu has to pause it explicitly. */
export function setLenisPaused(value) {
  paused = value;
  if (!instance) return;
  if (value) instance.stop();
  else instance.start();
}

export function scrollToTop({ instant = false } = {}) {
  if (instance) {
    instance.scrollTo(0, instant ? { immediate: true, force: true } : { duration: 1.2 });
    return;
  }
  window.scrollTo({ top: 0, left: 0, behavior: instant ? 'instant' : 'smooth' });
}

/**
 * Inertia scrolling on the window, so IntersectionObserver triggers and the
 * scroll-progress bar keep working. Lenis honours prefers-reduced-motion itself.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
      autoRaf: true,
      anchors: true,
    });
    instance = lenis;
    if (paused) lenis.stop();
    return () => {
      lenis.destroy();
      instance = null;
    };
  }, []);
}

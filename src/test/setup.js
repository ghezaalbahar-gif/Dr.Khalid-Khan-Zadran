import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => cleanup());

// jsdom has no layout engines: these are the minimum browser APIs Framer Motion
// and the smooth-scroll calls rely on.
class Observer {
  constructor(cb) {
    this.cb = cb;
  }
  observe(el) {
    this.cb([{ target: el, isIntersecting: true, intersectionRatio: 1, boundingClientRect: {} }], this);
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

globalThis.IntersectionObserver = Observer;
globalThis.ResizeObserver = Observer;
window.ResizeObserver = Observer;

window.scrollTo = vi.fn();
window.matchMedia =
  window.matchMedia ||
  ((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: () => false,
  }));

Element.prototype.scrollIntoView = Element.prototype.scrollIntoView || vi.fn();

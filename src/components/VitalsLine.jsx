import { motion, useReducedMotion } from 'framer-motion';

const TILE = 160;
const TILES = 12;

function buildPath() {
  let d = '';
  for (let i = 0; i < TILES; i += 1) {
    const x = i * TILE;
    d += `M${x} 20 L${x + 34} 20 L${x + 40} 15 L${x + 46} 20 L${x + 51} 26 L${x + 58} 4 L${x + 65} 34 L${x + 71} 20 L${x + 86} 20 L${x + 94} 12 L${x + 104} 20 L${x + TILE} 20 `;
  }
  return d;
}

const PATH = buildPath();

/** A continuous cardiac trace — the site's living detail line. */
export default function VitalsLine({ className = '', tone = 'accent', duration = 3.2 }) {
  const reduce = useReducedMotion();
  const stroke = tone === 'lite' ? 'var(--color-accent-lite)' : 'var(--color-accent)';
  return (
    <svg viewBox={`0 0 ${TILE * 6} 40`} className={className} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <motion.g
        animate={reduce ? undefined : { x: [0, -TILE * 6] }}
        transition={reduce ? undefined : { duration: duration * 6, repeat: Infinity, ease: 'linear' }}
      >
        <path d={PATH} fill="none" stroke={stroke} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </motion.g>
    </svg>
  );
}

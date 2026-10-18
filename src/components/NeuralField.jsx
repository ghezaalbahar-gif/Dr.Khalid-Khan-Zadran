import { motion, useReducedMotion } from 'framer-motion';

const NODES = [
  { x: 60, y: 120 },
  { x: 190, y: 60 },
  { x: 300, y: 170 },
  { x: 150, y: 250 },
  { x: 420, y: 90 },
  { x: 520, y: 210 },
  { x: 380, y: 300 },
  { x: 240, y: 400 },
  { x: 90, y: 430 },
  { x: 500, y: 420 },
  { x: 430, y: 530 },
  { x: 300, y: 520 },
  { x: 140, y: 560 },
  { x: 560, y: 320 },
];

const EDGES = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 2],
  [2, 4],
  [4, 5],
  [2, 6],
  [6, 7],
  [3, 7],
  [7, 8],
  [6, 9],
  [5, 13],
  [13, 9],
  [9, 10],
  [7, 11],
  [11, 12],
  [11, 10],
  [8, 12],
];

const PULSES = [[1, 2], [4, 5], [6, 7], [9, 10], [0, 3]];

/** The synaptic lattice behind the hero: edges draw in, then signals travel them. */
export default function NeuralField({ className = '' }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true" focusable="false">
      {EDGES.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke="var(--color-accent)"
          strokeWidth="0.7"
          initial={reduce ? { opacity: 0.16 } : { pathLength: 0, opacity: 0 }}
          animate={reduce ? { opacity: 0.16 } : { pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 1.4, delay: 0.35 + i * 0.055, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {NODES.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i % 4 === 0 ? 3 : 1.8}
          fill="var(--color-accent-deep)"
          initial={reduce ? { opacity: 0.45 } : { opacity: 0, scale: 0 }}
          animate={reduce ? { opacity: 0.45 } : { opacity: [0, 0.6, 0.38], scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 + i * 0.07 }}
        />
      ))}

      {!reduce &&
        PULSES.map(([a, b], i) => (
          <motion.circle
            key={`p${i}`}
            r="2.6"
            fill="var(--color-accent)"
            initial={{ cx: NODES[a].x, cy: NODES[a].y, opacity: 0 }}
            animate={{
              cx: [NODES[a].x, NODES[b].x, NODES[b].x],
              cy: [NODES[a].y, NODES[b].y, NODES[b].y],
              opacity: [0, 0.9, 0],
            }}
            transition={{ duration: 5.5, delay: i * 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
    </svg>
  );
}

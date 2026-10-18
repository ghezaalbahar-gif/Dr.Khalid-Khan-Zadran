import { useReducedMotion, motion } from 'framer-motion';

export const EASE = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export const zoom = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: EASE } },
};

export const list = (stagger = 0.09, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const lineMask = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1, ease: EASE } },
};

/**
 * Scroll-triggered entrance. Under prefers-reduced-motion the children render
 * statically instead of being mounted as motion nodes.
 */
export function Reveal({ children, className = '', variant = fadeUp, delay = 0, once = true, ...rest }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const target = delay ? { ...variant, show: { ...variant.show, transition: { ...variant.show.transition, delay } } } : variant;
  return (
    <motion.div className={className} variants={target} initial="hidden" whileInView="show" viewport={{ once, margin: '-70px' }} {...rest}>
      {children}
    </motion.div>
  );
}

/** Heading lines that rise out of a clipping band — the site's signature reveal. */
export function MaskLines({ lines, className = '', as = 'h2', delay = 0, stagger = 0.1 }) {
  const reduce = useReducedMotion();
  const Tag = reduce ? as : motion[as];
  const shared = reduce
    ? {}
    : { variants: list(stagger, delay), initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-70px' } };
  return (
    <Tag className={className} {...shared}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          {reduce ? line : <motion.span className="block" variants={lineMask}>{line}</motion.span>}
        </span>
      ))}
    </Tag>
  );
}

export function useMotionSafe() {
  return !useReducedMotion();
}

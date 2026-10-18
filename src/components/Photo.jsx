import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { photos } from '../data/site';

/**
 * Every photograph on the site uses this one frame: fixed ratio, true colour,
 * soft radius, gentle shadow that deepens on hover. Alt and caption come from
 * the active locale, so a picture never carries an English label into Dari.
 */
export default function Photo({ photoKey, ratio = 'aspect-[3/4]', className = '', caption = true, priority = false, tone = 'light' }) {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const photo = photos[photoKey];
  const dark = tone === 'dark';

  return (
    <figure className={className}>
      <div className={`photo relative bg-tint ${ratio}`}>
        <motion.img
          src={photo.src}
          alt={t(`data.photos.${photoKey}.alt`)}
          width={photo.w}
          height={photo.h}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="h-full w-full object-cover"
          animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
          transition={reduce ? undefined : { duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-ink/5" />
      </div>
      {caption && (
        <figcaption className={`eyebrow mt-4 flex items-center gap-2.5 ${dark ? 'text-white/70' : 'text-muted'}`}>
          <span className={`h-px w-6 ${dark ? 'bg-accent-lite' : 'bg-accent'}`} aria-hidden="true" />
          {t(`data.photos.${photoKey}.caption`)}
        </figcaption>
      )}
    </figure>
  );
}

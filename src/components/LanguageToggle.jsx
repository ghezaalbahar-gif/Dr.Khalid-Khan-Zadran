import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { changeLanguage, languages } from '../i18n';
import { EASE } from '../lib/motion';

/**
 * Three-up language pill, the same shape as the procedure filter chips: the
 * active code is filled, the rest stay quiet. Labels are native, so they do not
 * need translating themselves.
 */
export default function LanguageToggle({ id = 'bar', size = 'sm', className = '' }) {
  const { t, i18n } = useTranslation();
  const current = i18n.language;
  const pad = size === 'lg' ? 'px-4 py-2 text-[0.82rem]' : 'px-3 py-1.5 text-[0.72rem]';

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className={`inline-flex items-center gap-1 rounded-full border border-ink/10 bg-paper p-1 shadow-[var(--shadow-soft)] ${className}`}
    >
      {languages.map((lang) => {
        const active = current === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => changeLanguage(lang.code)}
            aria-pressed={active}
            title={lang.english}
            className={`relative isolate rounded-full font-semibold transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${pad} ${
              active ? 'text-white' : 'text-deep hover:text-accent-deep'
            }`}
          >
            {active && (
              <motion.span
                layoutId={`lang-${id}`}
                className="absolute inset-0 -z-10 rounded-full bg-accent shadow-[var(--shadow-glow)]"
                transition={{ duration: 0.45, ease: EASE }}
              />
            )}
            {lang.code === 'en' ? 'EN' : lang.native}
          </button>
        );
      })}
    </div>
  );
}

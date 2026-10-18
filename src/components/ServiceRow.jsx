import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from './Icon';
import { EASE } from '../lib/motion';

/**
 * A service as an index row, not a card: hairline above, white paper that wipes
 * in from the leading edge on hover, and details that open on demand.
 */
export default function ServiceRow({ service }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const base = `data.services.${service.id}`;

  return (
    <article className="row-hover group relative overflow-hidden rounded-3xl border-t border-line transition-colors duration-500">
      <span
        aria-hidden="true"
        className="row-sweep pointer-events-none absolute inset-0 bg-paper"
        style={open ? { transform: 'scaleX(1)' } : undefined}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 start-0 w-[3px] origin-top bg-gradient-to-b from-accent to-accent-lite transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
        }`}
      />
      <span
        aria-hidden="true"
        className="ghost-num pointer-events-none absolute -bottom-8 end-4 hidden text-accent/10 transition-colors duration-700 group-hover:text-accent/25 md:block"
      >
        {service.index}
      </span>

      <div className="relative grid gap-5 px-4 py-8 md:grid-cols-12 md:items-start md:gap-6 md:py-9">
        <div className="flex items-center gap-4 md:col-span-2">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-deep shadow-[var(--shadow-soft)] transition-colors duration-700 group-hover:bg-accent group-hover:text-white">
            <Icon name={service.icon} className="size-5" />
          </span>
          <span className="row-index eyebrow text-[0.65rem] text-muted transition-colors duration-700">{service.index}</span>
        </div>

        <div className="md:col-span-5">
          <h3 className="font-display text-[clamp(1.4rem,2.6vw,1.9rem)] text-ink transition-colors duration-700 group-hover:text-accent-deep">
            {t(`${base}.title`)}
          </h3>
          <p className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-deep">{t(`${base}.summary`)}</p>
        </div>

        <ul className="space-y-2.5 md:col-span-3">
          {['p1', 'p2'].map((key) => (
            <li key={key} className="flex items-start gap-2.5 text-[0.88rem] leading-snug text-deep">
              <Icon name="check" className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2.2} />
              {t(`${base}.${key}`)}
            </li>
          ))}
        </ul>

        <div className="md:col-span-2 md:text-end">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper px-4 py-2.5 text-[0.82rem] font-semibold text-ink shadow-[var(--shadow-soft)] transition-colors duration-700 hover:border-accent hover:bg-accent hover:text-white"
          >
            {open ? t('ui.close') : t('ui.details')}
            <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.5, ease: EASE }} className="inline-flex">
              <Icon name="plus" className="size-3.5" strokeWidth={2.2} />
            </motion.span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            className="relative overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="grid gap-8 border-t border-line px-4 py-8 md:grid-cols-12">
              <div className="md:col-span-6 md:col-start-3">
                <p className="eyebrow text-accent-deep">{t('ui.relatedProcedures')}</p>
                <ul className="mt-4">
                  {service.related.map((id) => (
                    <li key={id} className="border-b border-line last:border-0">
                      <Link
                        to="/procedures"
                        className="group/row flex items-center justify-between gap-4 py-3 text-[0.92rem] text-ink transition-colors duration-500 hover:text-accent-deep"
                      >
                        <span>
                          <span className="eyebrow block text-[0.58rem] text-muted">{t(`data.procedures.${id}.lay`)}</span>
                          {t(`data.procedures.${id}.name`)}
                        </span>
                        <Icon
                          name="arrow"
                          className="size-4 shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ltr:group-hover/row:translate-x-1.5 rtl:group-hover/row:-translate-x-1.5"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-end md:col-span-3">
                <Link
                  to="/appointment"
                  className="group/cta inline-flex items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-white transition-colors duration-700 hover:bg-accent-deep"
                >
                  <span className="text-[0.82rem] font-semibold">{t('ui.requestConsultation')}</span>
                  <Icon
                    name="arrow"
                    className="size-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ltr:group-hover/cta:translate-x-1.5 rtl:group-hover/cta:-translate-x-1.5"
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

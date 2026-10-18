import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { clinic, focusAreas, nav } from '../data/site';
import Icon from './Icon';
import VitalsLine from './VitalsLine';
import { EASE } from '../lib/motion';
import { scrollToTop } from '../lib/lenis';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative mt-4 overflow-hidden rounded-t-[2.5rem] bg-ink text-white">
      <span aria-hidden="true" className="wash-navy" />
      <VitalsLine tone="lite" className="relative h-8 w-full opacity-35" />

      <div className="relative mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 border-b border-white/12 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow flex items-center gap-3 text-accent-lite">
              <span className="h-px w-8 bg-white/25" aria-hidden="true" />
              {t('doctor.role')}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.1rem)] text-white">
              {t('doctor.nameLead')} <span className="italic text-accent-lite">{t('doctor.lastName')}</span>
            </h2>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-white/70">
              {t('footer.consultations', { place: t('clinic.place'), city: t('clinic.city') })}
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {focusAreas.map((f) => (
                <li
                  key={f.id}
                  className="rounded-full bg-white/10 px-3.5 py-1.5 text-[0.78rem] text-white/80 transition-colors duration-700 hover:bg-accent/45 hover:text-white"
                >
                  {t(`data.focus.${f.id}`)}
                </li>
              ))}
            </ul>
          </div>

          <nav className="lg:col-span-3" aria-label={t('footer.navigate')}>
            <p className="eyebrow text-white/60">{t('footer.navigate')}</p>
            <ul className="mt-5 space-y-1">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center gap-2.5 py-1.5 text-[0.95rem] text-white/80 transition-colors duration-500 hover:text-accent-lite"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-accent-lite transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-5"
                    />
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="eyebrow text-white/60">{t('footer.reach')}</p>
            <ul className="mt-5 space-y-4 text-[0.95rem]">
              <li className="flex items-start gap-3">
                <Icon name="mapPin" className="mt-0.5 size-4 shrink-0 text-accent-lite" />
                <span className="text-white/80">{t('clinic.address')}</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="phone" className="mt-0.5 size-4 shrink-0 text-accent-lite" />
                <a href={clinic.phoneHref} className="text-white/80 transition-colors duration-500 hover:text-accent-lite">
                  {clinic.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="message" className="mt-0.5 size-4 shrink-0 text-accent-lite" />
                <a
                  href={clinic.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 text-white/80 transition-colors duration-500 hover:text-accent-lite"
                >
                  {t('ui.whatsappTheClinic')}
                  <Icon
                    name="arrowOut"
                    className="size-3.5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </li>
            </ul>
            <Link
              to="/appointment"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-[0.9rem] font-semibold text-ink transition-colors duration-700 hover:bg-accent hover:text-white"
            >
              {t('ui.requestAnAppointment')}
              <Icon name="arrow" className="size-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-[0.6rem] text-white/55">
            {t('footer.copyright', { year: 2026, name: t('doctor.name') })}
          </p>
          <p className="max-w-xl text-[0.78rem] leading-relaxed text-white/60">{t('disclaimer')}</p>
          <motion.button
            type="button"
            onClick={() => scrollToTop()}
            className="group inline-flex shrink-0 items-center gap-2 self-start text-white/65 transition-colors duration-500 hover:text-accent-lite sm:self-auto"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <span className="eyebrow">{t('ui.backToTop')}</span>
            <Icon name="arrow" className="size-4 -rotate-90" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

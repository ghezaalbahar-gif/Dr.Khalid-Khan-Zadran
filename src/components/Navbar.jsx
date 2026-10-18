import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { clinic, nav } from '../data/site';
import Icon from './Icon';
import LanguageToggle from './LanguageToggle';
import { setLenisPaused } from '../lib/lenis';
import { EASE } from '../lib/motion';

const sheet = (reduce) =>
  reduce
    ? { open: { opacity: 1 }, closed: { opacity: 0 } }
    : {
        open: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.42, ease: EASE, when: 'startChildren', staggerChildren: 0.05, delayChildren: 0.1 },
        },
        closed: { opacity: 0, y: -14, transition: { duration: 0.22, ease: EASE } },
      };

const row = (reduce) =>
  reduce
    ? { open: { opacity: 1, transition: { duration: 0.15 } }, closed: { opacity: 0, transition: { duration: 0.1 } } }
    : {
        open: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
        closed: { opacity: 0, x: -18, transition: { duration: 0.15, ease: EASE } },
      };

export default function Navbar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    setLenisPaused(open);
    return () => {
      document.body.style.overflow = '';
      setLenisPaused(false);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div
          className={`relative mx-auto flex h-[68px] max-w-[1400px] items-center justify-between rounded-full px-3 transition-[background-color,box-shadow] duration-500 ${
            scrolled ? 'bg-paper/90 shadow-[var(--shadow-panel)] backdrop-blur-xl' : 'bg-transparent'
          }`}
        >
          <motion.div
            className="absolute inset-x-6 bottom-0 h-[3px] origin-left rounded-full bg-accent rtl:origin-right"
            style={{ scaleX: bar }}
          />
          <Link to="/" className="group flex items-center gap-3.5 ps-1" aria-label={t('ui.brandAria')}>
            <img
              src="/images/logo-mark.svg"
              alt=""
              width="44"
              height="44"
              className="size-11 shadow-[var(--shadow-soft)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5"
            />
            <span className="leading-tight">
              <span className="block font-display text-[1.1rem] text-ink">{t('doctor.name')}</span>
              <span className="eyebrow hidden text-[0.6rem] text-accent-deep sm:block">{t('doctor.role')}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label={t('ui.mainNav')}>
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className="group relative px-3.5 py-2">
                {({ isActive }) => (
                  <>
                    <span
                      className={`text-[0.9rem] font-medium transition-colors duration-500 ${
                        isActive ? 'text-accent-deep' : 'text-deep group-hover:text-ink'
                      }`}
                    >
                      {t(`nav.${item.key}`)}
                    </span>
                    <span
                      className={`absolute inset-x-3.5 bottom-0 h-[2px] origin-left rounded-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageToggle id="bar" className="hidden sm:inline-flex" />

            <a
              href={clinic.phoneHref}
              className="hidden items-center gap-2 rounded-full bg-accent-soft px-4 py-2.5 text-accent-deep transition-colors duration-500 hover:bg-accent hover:text-white lg:inline-flex"
            >
              <Icon name="phone" className="size-3.5" />
              <span className="text-[0.82rem] font-semibold">{clinic.phoneDisplay}</span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full border border-ink/10 bg-paper text-ink shadow-[var(--shadow-soft)] transition-[background-color,border-color,color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent hover:text-accent-deep active:scale-95 lg:hidden"
            >
              <span className="sr-only">{open ? t('ui.closeMenu') : t('ui.openMenu')}</span>
              <span className="relative grid size-5 place-items-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={open ? 'close' : 'menu'}
                    className="grid place-items-center"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: -75, scale: 0.6 }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 75, scale: 0.6 }}
                    transition={{ duration: reduce ? 0.12 : 0.26, ease: EASE }}
                  >
                    <Icon name={open ? 'close' : 'menu'} className="size-5" />
                  </motion.span>
                </AnimatePresence>
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 overflow-y-auto bg-paper lg:hidden"
            variants={sheet(reduce)}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <nav className="flex min-h-full flex-col justify-center px-6 pt-24 pb-10" aria-label={t('ui.mobileNav')}>
              {nav.map((item, i) => (
                <motion.div key={item.to} variants={row(reduce)}>
                  <NavLink to={item.to} end={item.to === '/'} className="group flex items-center gap-4 border-b border-line py-5">
                    <span className="eyebrow w-7 text-[0.62rem] text-accent">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1 font-display text-[1.8rem] text-ink transition-colors duration-300 group-hover:text-accent-deep">
                      {t(`nav.${item.key}`)}
                    </span>
                    <Icon
                      name="arrow"
                      className="size-4 text-muted transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent"
                    />
                  </NavLink>
                </motion.div>
              ))}
              <motion.div variants={row(reduce)} className="mt-8 rounded-2xl bg-tint p-6">
                <p className="eyebrow text-accent-deep">{t('ui.theClinic')}</p>
                <p className="mt-2 text-[0.95rem] text-ink">{t('clinic.address')}</p>
                <a href={clinic.phoneHref} className="mt-1 inline-block text-[0.95rem] font-semibold text-accent-deep">
                  {clinic.phoneDisplay}
                </a>
              </motion.div>
              <motion.div variants={row(reduce)} className="mt-6 flex justify-center">
                <LanguageToggle id="sheet" size="lg" />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHead from '../components/SectionHead';
import Photo from '../components/Photo';
import Action from '../components/Action';
import Icon from '../components/Icon';
import { faqs, imagingItems, pathway, procedureGroups, procedures } from '../data/site';
import { EASE, MaskLines, Reveal, fadeUp } from '../lib/motion';

function ProcedureRow({ item }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <motion.li layout variants={fadeUp} className="border-b border-line first:border-t">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group -mx-4 flex w-full flex-wrap items-center gap-5 rounded-2xl px-4 py-6 text-start transition-colors duration-700 hover:bg-accent-soft/70"
      >
        <span className="eyebrow w-24 shrink-0 text-[0.6rem] text-muted transition-colors duration-700 group-hover:text-accent-deep">
          {t(`data.procedures.${item.id}.lay`)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[clamp(1.2rem,2.3vw,1.6rem)] text-ink transition-colors duration-700 group-hover:text-accent-deep">
            {t(`data.procedures.${item.id}.name`)}
          </span>
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className={`grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-700 ${
            open
              ? 'border-accent bg-accent text-white'
              : 'border-line bg-paper text-ink group-hover:border-accent group-hover:text-accent-deep'
          }`}
        >
          <Icon name="plus" className="size-3.5" strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid gap-5 pb-8 md:grid-cols-12">
              <p className="text-[0.95rem] leading-relaxed text-deep md:col-span-7 md:col-start-2">
                {t(`data.procedures.${item.id}.text`)}
              </p>
              <div className="flex items-start gap-3 md:col-span-4">
                <Link
                  to="/appointment"
                  className="group/a inline-flex items-center gap-2.5 rounded-full border border-line bg-paper px-5 py-2.5 text-[0.86rem] font-semibold text-ink shadow-[var(--shadow-soft)] transition-colors duration-700 hover:border-accent hover:bg-accent hover:text-white"
                >
                  {t('ui.requestAConsultation')}
                  <Icon
                    name="arrow"
                    className="size-3.5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ltr:group-hover/a:translate-x-1.5 rtl:group-hover/a:-translate-x-1.5"
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

function Timeline() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <section className="bg-tint">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
        <SectionHead
          kicker={t('procedures.timeline.kicker')}
          title={[
            t('procedures.timeline.title1'),
            <span key="f" className="italic">{t('procedures.timeline.title2')}</span>,
          ]}
        />
        <div ref={ref} className="relative mt-14 ps-8 sm:ps-10">
          <span className="absolute start-[3px] top-0 h-full w-px bg-line sm:start-[5px]" aria-hidden="true" />
          <motion.span
            className="absolute start-[3px] top-0 h-full w-px origin-top bg-accent sm:start-[5px]"
            style={{ scaleY }}
            aria-hidden="true"
          />
          <ol className="space-y-10">
            {pathway.map((step) => (
              <motion.li
                key={step.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className="relative"
              >
                <span
                  className="absolute -start-8 top-2 size-[7px] rounded-full bg-accent-deep sm:-start-10"
                  aria-hidden="true"
                />
                <span className="eyebrow text-[0.62rem] text-muted">{t('procedures.timeline.step', { n: step.n })}</span>
                <h3 className="mt-3 font-display text-[clamp(1.4rem,2.8vw,1.9rem)] text-ink">
                  {t(`data.pathway.${step.id}.title`)}
                </h3>
                <p className="mt-2.5 max-w-xl text-[0.95rem] leading-relaxed text-deep">{t(`data.pathway.${step.id}.text`)}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(0);
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal variant={fadeUp}>
            <p className="eyebrow flex items-center gap-3 text-muted">
              <span className="h-px w-8 bg-line" aria-hidden="true" />
              {t('procedures.faq.kicker')}
            </p>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,4vw,2.9rem)] text-ink">
              {t('procedures.faq.title1')} <span className="italic text-accent">{t('procedures.faq.title2')}</span>
            </h2>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-deep">{t('procedures.faq.intro')}</p>
            <div className="mt-8">
              <Action to="/contact" tone="onLight">
                {t('ui.contactClinic')}
              </Action>
            </div>
          </Reveal>
        </div>

        <ul className="lg:col-span-8">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.id} className="border-t border-line last:border-b">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="group -mx-4 flex w-full flex-wrap items-center gap-5 rounded-2xl px-4 py-6 text-start transition-colors duration-700 hover:bg-accent-soft/70"
                >
                  <span className="eyebrow text-[0.6rem] text-muted">0{i + 1}</span>
                  <span
                    className={`flex-1 font-display text-[clamp(1.15rem,2.2vw,1.55rem)] transition-colors duration-700 ${
                      isOpen ? 'text-accent-deep' : 'text-ink group-hover:text-accent-deep'
                    }`}
                  >
                    {t(`data.faqs.${item.id}.q`)}
                  </span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.45, ease: EASE }}>
                    <Icon name="chevron" className="size-4 text-muted" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 ps-[3.4rem] text-[0.95rem] leading-[1.8] text-deep">
                        {t(`data.faqs.${item.id}.a`)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Imaging() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <span aria-hidden="true" className="wash-navy" />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-12">
        <Reveal variant={fadeUp} className="lg:col-span-5">
          <Photo photoKey="scans" ratio="aspect-[4/5]" tone="dark" />
        </Reveal>
        <div className="lg:col-span-7">
          <SectionHead
            tone="dark"
            kicker={t('procedures.imaging.kicker')}
            title={[
              t('procedures.imaging.title1'),
              <span key="b" className="italic text-accent-lite">{t('procedures.imaging.title2')}</span>,
            ]}
            intro={t('procedures.imaging.intro')}
          />
          <Reveal variant={fadeUp} delay={0.25}>
            <ul className="mt-12 grid gap-3 sm:grid-cols-2">
              {imagingItems.map((item) => (
                <li
                  key={item.id}
                  className="group flex items-center gap-4 rounded-2xl bg-white/8 px-5 py-4 transition-colors duration-700 hover:bg-accent/40"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-lite/15 text-accent-lite transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                    <Icon name={item.icon} className="size-4" />
                  </span>
                  <span className="text-[0.92rem] text-white/85">{t(`data.imaging.${item.id}`)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function Procedures() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const requested = params.get('area');
  const group = procedureGroups.some((g) => g.id === requested) ? requested : 'all';
  const shown = useMemo(() => (group === 'all' ? procedures : procedures.filter((p) => p.group === group)), [group]);

  return (
    <>
      <section className="relative mx-auto max-w-[1400px] overflow-hidden px-5 pb-4 pt-32 sm:px-8 lg:pt-40">
        <span aria-hidden="true" className="wash" />
        <div className="relative grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal variant={fadeUp}>
              <span className="badge-lite">
                <Icon name="microscope" className="size-3.5 text-accent" strokeWidth={2} />
                {t('procedures.badge')}
              </span>
            </Reveal>
            <MaskLines
              as="h1"
              lines={[
                t('procedures.title1'),
                t('procedures.title2'),
                <span key="n" className="italic text-accent">{t('procedures.title3')}</span>,
              ]}
              delay={0.1}
              className="mt-6 text-[clamp(2rem,4.6vw,3.3rem)] text-ink"
            />
          </div>
          <div className="flex flex-col justify-end lg:col-span-8">
            <Reveal variant={fadeUp} delay={0.3}>
              <p className="max-w-xl text-[1rem] leading-relaxed text-deep">{t('procedures.intro')}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-5">
                <span className="eyebrow text-[0.62rem] text-muted">{t('ui.proceduresListed', { count: procedures.length })}</span>
                <span className="eyebrow text-[0.62rem] text-muted">{t('ui.areas')}</span>
                <span className="eyebrow text-[0.62rem] text-accent-deep">{t('ui.consultationFirst')}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="panel p-7 lg:sticky lg:top-28">
              <p className="eyebrow text-[0.62rem] text-muted">{t('procedures.filterKicker')}</p>
              <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label={t('procedures.filterAria')}>
                {procedureGroups.map((g) => {
                  const active = group === g.id;
                  const count = g.id === 'all' ? procedures.length : procedures.filter((p) => p.group === g.id).length;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setParams(g.id === 'all' ? {} : { area: g.id }, { replace: true })}
                      aria-pressed={active}
                      className={`relative isolate inline-flex items-center gap-2 rounded-full border px-4.5 py-2.5 text-[0.86rem] font-semibold transition-colors duration-500 ${
                        active ? 'border-accent text-white' : 'border-line bg-paper text-deep hover:border-accent/60 hover:text-accent-deep'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="chip-active"
                          className="absolute inset-0 -z-10 rounded-full bg-accent shadow-[var(--shadow-glow)]"
                          transition={{ duration: 0.45, ease: EASE }}
                        />
                      )}
                      {t(`data.groups.${g.id}`)}
                      <span className={`text-[0.72rem] font-bold ${active ? 'text-white' : 'text-muted'}`}>{count}</span>
                    </button>
                  );
                })}
              </div>

              <p role="status" aria-live="polite" className="mt-8 border-t border-line pt-5 text-[0.85rem] leading-relaxed text-muted">
                {t('procedures.filterStatus', { shown: shown.length, total: procedures.length })}
              </p>

              <div className="mt-8">
                <Action to="/appointment" tone="solid">
                  {t('ui.requestAConsultation')}
                </Action>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <motion.ul
              layout
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="border-t border-line"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {shown.map((item) => (
                  <ProcedureRow key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>
        </div>
      </section>

      <Imaging />
      <Timeline />
      <Faq />
    </>
  );
}

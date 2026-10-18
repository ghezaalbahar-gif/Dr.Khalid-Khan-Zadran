import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import NeuralField from '../components/NeuralField';
import Photo from '../components/Photo';
import VitalsLine from '../components/VitalsLine';
import SectionHead from '../components/SectionHead';
import ServiceRow from '../components/ServiceRow';
import Action from '../components/Action';
import Icon from '../components/Icon';
import { clinic, focusAreas, pathway, principles, procedures, services } from '../data/site';
import { EASE, MaskLines, Reveal, fadeUp, list, zoom } from '../lib/motion';

function Hero() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const chip = (delay, depth) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: [0, -depth, 0] },
          transition: {
            opacity: { duration: 0.7, delay },
            y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.7, times: [0, 0.5, 1] },
          },
        };

  const stats = [
    ['home.hero.focus', 'ui.areas'],
    ['home.hero.practice', 'clinic.place'],
    ['home.hero.clinicLine', null],
  ];

  return (
    <section className="relative overflow-hidden bg-bone">
      <span aria-hidden="true" className="wash" />
      {/* Pinned to the top of the photo side as a square: the lattice's viewBox is square, so
          stretching it to the hero's height would drop the lines into the middle of the section. */}
      <NeuralField className="pointer-events-none absolute -end-[8%] -top-16 size-[32rem] opacity-60 sm:size-[40rem] lg:size-[48rem]" />

      <div className="relative mx-auto max-w-[1400px] px-5 pb-24 pt-32 sm:px-8 lg:pb-32 lg:pt-40">
        <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal variant={fadeUp}>
              <span className="badge-lite">
                <Icon name="stethoscope" className="size-3.5 text-accent" strokeWidth={2} />
                {t('doctor.role')}
              </span>
            </Reveal>

            <MaskLines
              as="h1"
              lines={[t('home.hero.name1'), <span key="z" className="italic text-accent">{t('home.hero.name2')}</span>]}
              delay={0.15}
              className="mt-6 text-[clamp(2.7rem,6.4vw,5rem)] text-ink"
            />

            <Reveal variant={fadeUp} delay={0.5}>
              <p className="mt-7 max-w-lg text-[1.05rem] leading-relaxed text-deep">
                {t('home.hero.intro', { specialty: t('doctor.specialty') })}
              </p>
            </Reveal>

            <Reveal variant={fadeUp} delay={0.62}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Action to="/appointment" tone="solid">
                  {t('ui.requestAnAppointment')}
                </Action>
                <Action to="/services" tone="onLight">
                  {t('ui.viewServices')}
                </Action>
              </div>
            </Reveal>

            <Reveal variant={fadeUp} delay={0.74}>
              <dl className="panel mt-14 grid max-w-2xl grid-cols-1 sm:grid-cols-3">
                {stats.map(([k, v], i) => (
                  <div key={k} className={`px-6 py-5 ${i ? 'border-t border-line sm:border-t-0 sm:border-s' : ''}`}>
                    <dt className="eyebrow text-[0.6rem] text-muted">{t(k)}</dt>
                    <dd className="mt-2 text-[0.95rem] font-medium text-ink">{v ? t(v) : clinic.phoneDisplay}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <motion.div
            className="relative lg:col-span-5"
            variants={zoom}
            initial="hidden"
            animate="show"
            transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
          >
            <span
              aria-hidden="true"
              className="absolute -end-12 -top-14 size-[19rem] rounded-full bg-accent-lite/30 blur-3xl"
            />
            <div className="relative">
              <Photo photoKey="portrait" ratio="aspect-[4/5]" priority caption={false} />

              <motion.span aria-hidden="true" className="badge-accent absolute -start-4 top-10 sm:-start-7" {...chip(0.45, 5)}>
                <Icon name="brain" className="size-4 text-white" strokeWidth={2} />
                {t('doctor.specialty')}
              </motion.span>

              <motion.span aria-hidden="true" className="badge-accent absolute -end-3 bottom-16 sm:-end-6" {...chip(0.65, 7)}>
                <Icon name="mapPin" className="size-4 text-white" strokeWidth={2} />
                {t('clinic.place')}
              </motion.span>
            </div>

            <figcaption className="mt-5 flex items-center justify-between gap-4">
              <span className="eyebrow text-accent-deep">{t('clinic.city')}</span>
              <span className="h-px flex-1 bg-line" aria-hidden="true" />
              <a
                href={clinic.phoneHref}
                className="group inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-[0.82rem] font-semibold text-ink shadow-[var(--shadow-soft)] transition-colors duration-700 hover:bg-accent hover:text-white"
              >
                <Icon name="phone" className="size-3.5" strokeWidth={2} />
                {t('ui.callTheClinic')}
              </a>
            </figcaption>
          </motion.div>
        </div>
      </div>

      <div className="relative border-t border-line bg-paper">
        <VitalsLine className="h-10 w-full opacity-45" />
      </div>
    </section>
  );
}

function FocusBar() {
  const { t } = useTranslation();

  return (
    <div className="bg-paper">
      <ul className="mx-auto grid max-w-[1400px] gap-4 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {focusAreas.map((area, i) => {
          const count = procedures.filter((p) => p.group === area.id).length;
          return (
            <li key={area.id}>
              <Reveal variant={fadeUp} delay={i * 0.07} className="h-full">
                <Link to={`/procedures?area=${area.id}`} className="panel-tint group lift edge-in flex h-full flex-col px-6 pb-16 pt-6">
                  <span className="font-display text-[1.45rem] text-ink transition-colors duration-700 group-hover:text-accent-deep">
                    {t(`data.focus.${area.id}`)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-4 block h-px w-9 bg-accent/35 transition-[width,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-20 group-hover:bg-accent"
                  />
                  <span className="mt-auto flex items-center gap-2 pt-7 text-[0.82rem] font-semibold text-accent-deep">
                    {t(count === 1 ? 'ui.procedureCount' : 'ui.proceduresCount', { count })}
                    <Icon
                      name="arrow"
                      className="size-3.5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ltr:group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="ghost-num absolute -bottom-8 end-3 text-ink/10 transition-colors duration-700 group-hover:text-accent/25"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CareIndex() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead
        kicker={t('home.care.kicker')}
        title={[t('home.care.title1'), <span key="b" className="italic">{t('home.care.title2')}</span>]}
        intro={t('home.care.intro')}
        aside={
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-ink transition-colors duration-500 hover:text-accent-deep"
          >
            <span className="text-[0.9rem] font-semibold">{t('ui.allServices')}</span>
            <Icon
              name="arrow"
              className="size-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ltr:group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5"
            />
          </Link>
        }
      />
      <div className="mt-14 border-b border-line">
        {services.map((s) => (
          <ServiceRow key={s.id} service={s} />
        ))}
      </div>
    </section>
  );
}

function ProceduresTeaser() {
  const { t } = useTranslation();
  const picks = procedures.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <span aria-hidden="true" className="wash-navy" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead
          tone="dark"
          kicker={t('home.procedures.kicker')}
          title={[t('home.procedures.title1'), <span key="s" className="italic text-accent-lite">{t('home.procedures.title2')}</span>]}
          intro={t('home.procedures.intro')}
          aside={
            <Link
              to="/procedures"
              className="group inline-flex items-center gap-2 text-accent-lite transition-colors duration-500 hover:text-white"
            >
              <span className="text-[0.9rem] font-semibold">{t('ui.seeAllProcedures')}</span>
              <Icon
                name="arrow"
                className="size-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ltr:group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5"
              />
            </Link>
          }
        />

        <motion.ul
          variants={list(0.07, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-70px' }}
          className="mt-14"
        >
          {picks.map((p) => (
            <motion.li key={p.id} variants={fadeUp} className="border-b border-white/12 first:border-t">
              <Link
                to="/procedures"
                className="group -mx-4 flex items-center justify-between gap-6 rounded-2xl px-4 py-5 transition-colors duration-700 hover:bg-accent/25"
              >
                <span className="flex min-w-0 items-baseline gap-5">
                  <span className="eyebrow hidden w-28 shrink-0 text-[0.6rem] text-white/55 sm:block">
                    {t(`data.procedures.${p.id}.lay`)}
                  </span>
                  <span className="truncate font-display text-[clamp(1.2rem,2.2vw,1.6rem)] text-white transition-colors duration-700 group-hover:text-accent-lite">
                    {t(`data.procedures.${p.id}.name`)}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-4">
                  <span className="eyebrow hidden text-[0.6rem] text-white/50 md:block">{t(`data.groups.${p.group}`)}</span>
                  <Icon
                    name="arrow"
                    className="size-4 text-white/60 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ltr:group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 group-hover:text-accent-lite"
                  />
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        <Reveal variant={fadeUp} delay={0.2}>
          <div className="mt-10">
            <Action to="/procedures" tone="onDark">
              {t('ui.browseFullList')}
            </Action>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DoctorSplit() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal variant={zoom} className="h-full">
            <Photo
              photoKey="scans"
              ratio="aspect-[4/5] lg:min-h-[26rem] lg:flex-1 lg:aspect-auto"
              className="flex h-full flex-col"
            />
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <SectionHead
            kicker={t('home.doctor.kicker')}
            title={[t('home.doctor.title1'), <span key="d" className="italic">{t('home.doctor.title2')}</span>]}
            intro={t('doctor.bio')}
          />

          <ul className="mt-12">
            {principles.map((p, i) => (
              <li key={p.id} className="group border-t border-line py-7 last:border-b">
                <div className="flex items-start gap-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-paper text-accent-deep shadow-[var(--shadow-soft)] transition-colors duration-700 group-hover:bg-accent group-hover:text-white">
                    <Icon name={p.icon} className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-3">
                      <span className="eyebrow text-[0.6rem] text-muted">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="font-display text-[1.35rem] text-ink">{t(`data.principles.${p.id}.title`)}</h3>
                    </div>
                    <p className="mt-2.5 max-w-xl text-[0.95rem] leading-relaxed text-deep">{t(`data.principles.${p.id}.text`)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Reveal variant={fadeUp} delay={0.15}>
            <div className="mt-10">
              <Action to="/about" tone="onLight">
                {t('ui.readFullProfile')}
              </Action>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Pathway() {
  const { t } = useTranslation();

  return (
    <section className="bg-tint">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
        <SectionHead
          kicker={t('home.pathway.kicker')}
          title={[t('home.pathway.title1'), <span key="t" className="italic">{t('home.pathway.title2')}</span>]}
        />

        <motion.ol
          variants={list(0.12, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-70px' }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {pathway.map((step) => (
            <motion.li key={step.id} variants={fadeUp} className="panel group lift edge-in px-7 pb-16 pt-8">
              <h3 className="font-display text-[1.4rem] text-ink transition-colors duration-700 group-hover:text-accent-deep">
                {t(`data.pathway.${step.id}.title`)}
              </h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-deep">{t(`data.pathway.${step.id}.text`)}</p>
              <span
                aria-hidden="true"
                className="ghost-num absolute -bottom-9 start-4 text-ink/10 transition-colors duration-700 group-hover:text-accent/25"
              >
                {step.n}
              </span>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

function CtaBand() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
      <div className="panel-navy px-7 py-14 text-white sm:px-12 lg:px-16 lg:py-16">
        <span aria-hidden="true" className="wash-navy" />
        <div className="relative grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <MaskLines
              as="h2"
              lines={[t('home.cta.title1'), <span key="a" className="italic text-accent-lite">{t('home.cta.title2')}</span>]}
              className="text-[clamp(2.1rem,5vw,3.6rem)] text-white"
            />
            <Reveal variant={fadeUp} delay={0.25}>
              <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-white/70">{t('home.cta.intro')}</p>
            </Reveal>
          </div>
          <Reveal variant={fadeUp} delay={0.35} className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between gap-10">
              <div className="lg:text-end">
                <span aria-hidden="true" className="mb-5 block h-px w-16 bg-accent-lite/60 lg:ms-auto" />
                <p className="eyebrow text-[0.6rem] text-accent-lite">{t('home.cta.before')}</p>
                <p className="mt-3 max-w-xs text-[0.88rem] leading-relaxed text-white/70 lg:ms-auto">{t('home.cta.note')}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                <Action to="/appointment" tone="solid">
                  {t('ui.requestAnAppointment')}
                </Action>
                <Action href={clinic.phoneHref} tone="onDark" icon="phone">
                  {clinic.phoneDisplay}
                </Action>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <FocusBar />
      <CareIndex />
      <ProceduresTeaser />
      <DoctorSplit />
      <Pathway />
      <CtaBand />
    </>
  );
}

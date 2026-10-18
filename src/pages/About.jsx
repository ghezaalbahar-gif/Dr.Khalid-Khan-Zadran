import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Photo from '../components/Photo';
import SectionHead from '../components/SectionHead';
import Action from '../components/Action';
import Icon from '../components/Icon';
import VitalsLine from '../components/VitalsLine';
import { clinic, focusAreas, ledgerRows, practiceRows } from '../data/site';
import { EASE, MaskLines, Reveal, fadeUp, list, zoom } from '../lib/motion';

function Intro() {
  const { t } = useTranslation();

  const practiceValues = {
    specialty: t('doctor.specialty'),
    location: `${t('clinic.place')}, ${t('clinic.city')}`,
    line: clinic.phoneDisplay,
    referrals: t('data.practice.referralsValue'),
  };

  return (
    <section className="relative overflow-hidden bg-bone">
      <span aria-hidden="true" className="wash" />
      <div className="relative mx-auto max-w-[1400px] px-5 pb-20 pt-32 sm:px-8 lg:pb-24 lg:pt-40">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal variant={fadeUp}>
              <span className="badge-lite">
                <Icon name="stethoscope" className="size-3.5 text-accent" strokeWidth={2} />
                {t('about.badge')}
              </span>
            </Reveal>
            <MaskLines
              as="h1"
              lines={[t('about.name1'), <span key="z" className="italic text-accent">{t('about.name2')}</span>]}
              delay={0.12}
              className="mt-6 text-[clamp(2.6rem,6vw,4.6rem)] text-ink"
            />
            <Reveal variant={fadeUp} delay={0.45}>
              <p className="mt-7 max-w-lg text-[1.05rem] leading-relaxed text-deep">{t('doctor.tagline')}</p>
            </Reveal>

            <Reveal variant={fadeUp} delay={0.55}>
              <dl className="panel mt-14 divide-y divide-line px-6 sm:px-7">
                {practiceRows.map((row) => (
                  <div key={row.id} className="grid gap-1 py-4 sm:grid-cols-3 sm:items-baseline">
                    <dt className="eyebrow text-[0.6rem] text-muted">{t(`data.practice.${row.id}`)}</dt>
                    <dd className="text-[0.95rem] font-medium text-ink sm:col-span-2">{practiceValues[row.id]}</dd>
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
            transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
          >
            <span
              aria-hidden="true"
              className="absolute -start-14 -top-12 size-[17rem] rounded-full bg-accent-lite/25 blur-3xl"
            />
            <div className="relative">
              <Photo photoKey="conference" ratio="aspect-[4/3]" />
              {/* On top of the photograph: below it the pill landed on the caption line. */}
              <span className="badge-accent absolute start-5 top-5 z-10">
                <Icon name="mapPin" className="size-4 text-white" strokeWidth={2} />
                {t('clinic.city')}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="border-t border-line bg-paper">
        <VitalsLine className="h-9 w-full opacity-40" />
      </div>
    </section>
  );
}

function Biography() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal variant={fadeUp}>
          <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-paper py-1.5 ps-2.5 pe-3.5 text-accent-deep shadow-[var(--shadow-soft)]">
            <span className="grid size-5 place-items-center rounded-full bg-accent-soft" aria-hidden="true">
              <span className="size-1.5 rounded-full bg-accent" />
            </span>
            {t('about.bioKicker')}
          </span>
        </Reveal>
        <div className="mt-8">
          <MaskLines
            as="p"
            lines={[
              t('about.bio1'),
              t('about.bio2'),
              <span key="c" className="italic text-accent-deep">{t('about.bio3')}</span>,
            ]}
            className="font-display text-[clamp(1.4rem,3.1vw,2.15rem)] leading-[1.28] text-ink"
          />
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <Reveal variant={fadeUp} delay={0.2}>
              <p className="text-[0.98rem] leading-[1.85] text-deep">{t('doctor.bio')}</p>
            </Reveal>
            <Reveal variant={fadeUp} delay={0.3}>
              <p className="text-[0.98rem] leading-[1.85] text-deep">{t('about.bioSecond')}</p>
            </Reveal>
          </div>

          <motion.ul
            variants={list(0.08, 0.35)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-70px' }}
            className="mt-12 flex flex-wrap justify-center gap-2.5"
          >
            {focusAreas.map((f) => (
              <motion.li
                key={f.id}
                variants={fadeUp}
                className="rounded-full border border-line bg-paper px-4.5 py-2 text-[0.86rem] font-medium text-deep transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent hover:bg-accent-soft hover:text-accent-deep"
              >
                {t(`data.focus.${f.id}`)}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

function Ledger() {
  const { t } = useTranslation();
  return (
    <section className="bg-tint">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
        <SectionHead
          kicker={t('about.credentials.kicker')}
          title={[t('about.credentials.title1'), <span key="a" className="italic">{t('about.credentials.title2')}</span>]}
          intro={t('about.credentials.intro')}
        />

        <motion.ul
          variants={list(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-70px' }}
          className="mt-14 border-t border-line"
        >
          {ledgerRows.map((row) => (
            <motion.li key={row.id} variants={fadeUp} className="group border-b border-line">
              <div className="grid items-start gap-4 py-8 md:grid-cols-12">
                <h3 className="font-display text-[1.45rem] text-ink md:col-span-5">{t(`data.ledger.${row.id}.label`)}</h3>
                <p className="text-[0.92rem] leading-relaxed text-deep md:col-span-5">{t(`data.ledger.${row.id}.note`)}</p>
                <div className="md:col-span-2 md:text-end">
                  <span className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-paper px-3.5 py-1.5 text-[0.75rem] font-semibold text-signal">
                    <span className="size-1.5 rounded-full bg-signal" aria-hidden="true" />
                    {t('data.ledger.status')}
                  </span>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <Reveal variant={fadeUp} delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-deep">
              <Icon name="shield" className="size-4" />
            </span>
            <p className="max-w-2xl text-[0.85rem] leading-relaxed text-muted">{t('about.credentials.note')}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Study() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead
        kicker={t('about.photos.kicker')}
        title={[t('about.photos.title1'), <span key="w" className="italic">{t('about.photos.title2')}</span>]}
      />
      <div className="mt-14 grid items-start gap-8 sm:gap-10 lg:grid-cols-12">
        <Reveal variant={fadeUp} className="lg:col-span-7">
          <Photo photoKey="theatre" ratio="aspect-[4/3]" />
        </Reveal>
        <Reveal variant={fadeUp} delay={0.12} className="lg:col-span-5">
          <Photo photoKey="loupes" ratio="aspect-[4/5]" />
        </Reveal>
        <Reveal variant={fadeUp} delay={0.18} className="lg:col-span-4">
          <Photo photoKey="atTable" ratio="aspect-[3/4]" />
        </Reveal>
        <Reveal variant={fadeUp} delay={0.24} className="lg:col-span-8">
          <Photo photoKey="theatreWide" ratio="aspect-[4/3]" />
        </Reveal>
        <Reveal variant={fadeUp} delay={0.3} className="lg:col-span-5">
          <Photo photoKey="surgery" ratio="aspect-[4/3]" />
        </Reveal>
        <Reveal variant={fadeUp} delay={0.36} className="lg:col-span-7">
          <div className="panel px-8 py-10 sm:px-10">
            <p className="font-display text-[clamp(1.3rem,2.4vw,1.85rem)] leading-[1.3] text-ink">{t('about.photos.quote')}</p>
            <div className="mt-8">
              <Action to="/procedures" tone="onLight">
                {t('ui.seeAllProcedures')}
              </Action>
            </div>
            <span aria-hidden="true" className="ghost-num absolute -bottom-8 end-6 text-accent/10">
              &ldquo;
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <Intro />
      <Biography />
      <Ledger />
      <Study />
    </>
  );
}

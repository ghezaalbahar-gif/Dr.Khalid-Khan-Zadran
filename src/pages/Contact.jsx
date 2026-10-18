import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Icon from '../components/Icon';
import Action from '../components/Action';
import SectionHead from '../components/SectionHead';
import VitalsLine from '../components/VitalsLine';
import { clinic, contactChannels, visitItems } from '../data/site';
import { EASE, MaskLines, Reveal, fadeUp, list } from '../lib/motion';

function Masthead() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-bone">
      <span aria-hidden="true" className="wash" />
      <div className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-32 sm:px-8 lg:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant={fadeUp}>
            <span className="badge-lite">
              <Icon name="phone" className="size-3.5 text-accent" strokeWidth={2} />
              {t('contact.badge')}
            </span>
          </Reveal>
          <MaskLines
            as="h1"
            lines={[t('contact.title1'), <span key="c" className="italic text-accent">{t('contact.title2')}</span>]}
            delay={0.12}
            className="mt-6 text-[clamp(2.4rem,7vw,4.8rem)] text-ink"
          />
          <Reveal variant={fadeUp} delay={0.4}>
            <p className="mx-auto mt-6 max-w-xl text-[1.02rem] leading-relaxed text-deep">
              {t('contact.intro', { name: t('doctor.name'), city: t('clinic.city') })}
            </p>
            <a
              href={clinic.phoneHref}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2.5 text-[0.86rem] font-semibold text-accent-deep transition-colors duration-700 hover:bg-accent hover:text-white"
            >
              <Icon name="phone" className="size-3.5" />
              {clinic.phoneDisplay}
            </a>
          </Reveal>
        </div>
      </div>
      <div className="border-t border-line bg-paper">
        <VitalsLine className="h-9 w-full opacity-40" />
      </div>
    </section>
  );
}

function Channels() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
      <ul className="border-t border-line">
        {contactChannels.map((c, i) => (
          <motion.li
            key={c.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.08 }}
            className="row-hover group relative overflow-hidden rounded-3xl border-b border-line"
          >
            <span aria-hidden="true" className="row-sweep pointer-events-none absolute inset-0 bg-paper" />
            <span
              aria-hidden="true"
              className="ghost-num pointer-events-none absolute -bottom-9 end-3 text-accent/0 transition-colors duration-700 group-hover:text-accent/15"
            >
              0{i + 1}
            </span>
            <a
              href={c.href}
              target={c.external ? '_blank' : undefined}
              rel="noreferrer"
              className="relative grid items-baseline gap-3 px-3 py-9 md:grid-cols-12"
            >
              <span className="eyebrow flex items-center gap-3.5 text-muted md:col-span-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-paper text-accent-deep shadow-[var(--shadow-soft)] transition-colors duration-700 group-hover:bg-accent group-hover:text-white">
                  <Icon name={c.icon} className="size-4" />
                </span>
                <span className="row-index">{t(`data.channels.${c.id}.label`)}</span>
              </span>
              <span className="font-display text-[clamp(1.4rem,3vw,2.1rem)] text-ink transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ltr:group-hover:translate-x-2 rtl:group-hover:-translate-x-2 md:col-span-6">
                {t(`data.channels.${c.id}.value`)}
              </span>
              <span className="flex items-center justify-between gap-4 md:col-span-3 md:justify-end">
                <span className="max-w-[16rem] text-end text-[0.82rem] leading-snug text-muted">{t(`data.channels.${c.id}.note`)}</span>
                <Icon
                  name="arrowOut"
                  className="size-4 shrink-0 text-muted transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-deep"
                />
              </span>
            </a>
          </motion.li>
        ))}
      </ul>

      <Reveal variant={fadeUp} delay={0.15}>
        <div className="panel mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 px-7 py-6">
          <p className="flex items-center gap-2.5 text-[0.88rem] text-deep">
            <Icon name="shield" className="size-4 shrink-0 text-accent-deep" />
            {t('contact.verified')}
          </p>
          <p className="text-[0.82rem] text-muted">{t('contact.onlyChannels')}</p>
        </div>
      </Reveal>
    </section>
  );
}

function PlanVisit() {
  const { t } = useTranslation();
  return (
    <section className="bg-tint">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionHead
            kicker={t('contact.plan.kicker')}
            title={[t('contact.plan.title1'), <span key="t" className="italic">{t('contact.plan.title2')}</span>]}
          />
          <motion.ul
            variants={list(0.1, 0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-70px' }}
            className="mt-12"
          >
            {visitItems.map((item) => (
              <motion.li key={item.id} variants={fadeUp} className="group border-t border-line py-6 last:border-b">
                <div className="flex items-start gap-4">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[2.2]" />
                  <div>
                    <h3 className="font-display text-[1.3rem] text-ink">{t(`data.visit.${item.id}.title`)}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-deep">{t(`data.visit.${item.id}.text`)}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="lg:col-span-6">
          <Reveal variant={fadeUp} delay={0.2} className="h-full">
            <div className="panel-navy h-full min-h-[24rem] w-full text-white">
              <span aria-hidden="true" className="wash-navy" />
              <svg
                viewBox="0 0 400 300"
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
                focusable="false"
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 36} x2="400" y2={i * 36} stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 36} y1="0" x2={i * 36} y2="300" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
                ))}
                <motion.path
                  d="M0 210 L120 210 L160 150 L400 150"
                  fill="none"
                  stroke="var(--color-accent-lite)"
                  strokeWidth="1.6"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: EASE }}
                />
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
                  style={{ transformOrigin: '160px 150px' }}
                >
                  <circle cx="160" cy="150" r="16" fill="var(--color-accent-lite)" opacity="0.2" />
                  <circle cx="160" cy="150" r="5" fill="var(--color-accent-lite)" />
                </motion.g>
              </svg>
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 bg-gradient-to-t from-ink via-ink/80 to-transparent p-6">
                <div>
                  <p className="eyebrow text-[0.6rem] text-white/65">{t('contact.mapNote')}</p>
                  <p className="mt-2 font-display text-[1.4rem] text-white">{t('clinic.place')}</p>
                  <p className="text-[0.85rem] text-white/65">{t('clinic.city')}</p>
                </div>
                <a
                  href={clinic.mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[0.86rem] font-semibold text-ink transition-colors duration-700 hover:bg-accent hover:text-white"
                >
                  {t('ui.openInMaps')}
                  <Icon
                    name="arrowOut"
                    className="size-3.5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Emergency() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
      <Reveal variant={fadeUp}>
        <div className="panel flex flex-col gap-6 border border-signal/25 px-8 py-9 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div className="flex items-start gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-signal/12 text-signal">
              <Icon name="alert" className="size-5" />
            </span>
            <div>
              <h2 className="font-display text-[1.5rem] text-ink">{t('contact.emergencyTitle')}</h2>
              <p className="mt-2.5 max-w-xl text-[0.95rem] leading-relaxed text-deep">{t('disclaimer')}</p>
            </div>
          </div>
          <div className="shrink-0">
            <Action to="/appointment" tone="solid">
              {t('ui.requestAnAppointment')}
            </Action>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function Contact() {
  return (
    <>
      <Masthead />
      <Channels />
      <PlanVisit />
      <Emergency />
    </>
  );
}

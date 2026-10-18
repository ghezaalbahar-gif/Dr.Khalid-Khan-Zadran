import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHead from '../components/SectionHead';
import ServiceRow from '../components/ServiceRow';
import Action from '../components/Action';
import Icon from '../components/Icon';
import { pathway, services } from '../data/site';
import { MaskLines, Reveal, fadeUp } from '../lib/motion';

function Intro() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden">
      <span aria-hidden="true" className="wash" />
      <div className="relative mx-auto max-w-[1400px] px-5 pb-6 pt-32 sm:px-8 lg:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant={fadeUp}>
            <span className="badge-lite">
              <Icon name="stethoscope" className="size-3.5 text-accent" strokeWidth={2} />
              {t('services.badge')}
            </span>
          </Reveal>
          <MaskLines
            as="h1"
            lines={[t('services.title1'), <span key="b" className="italic text-accent">{t('services.title2')}</span>]}
            delay={0.1}
            className="mt-6 text-[clamp(2.1rem,5.2vw,3.8rem)] text-ink"
          />
          <Reveal variant={fadeUp} delay={0.35}>
            <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-relaxed text-deep">{t('services.intro')}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
      <div className="border-b border-line">
        {services.map((s) => (
          <ServiceRow key={s.id} service={s} />
        ))}
      </div>
    </section>
  );
}

function Unsure() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 sm:py-14">
      <div className="panel-navy px-7 py-12 text-white sm:px-12 lg:py-14">
        <span aria-hidden="true" className="wash-navy" />
        <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(1.7rem,3.6vw,2.5rem)] text-white">{t('services.unsureTitle')}</h2>
            <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-white/75">{t('services.unsureIntro')}</p>
          </div>
          <Reveal variant={fadeUp} delay={0.15} className="lg:col-span-5">
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Action to="/appointment" tone="solid">
                {t('ui.requestAnAppointment')}
              </Action>
              <Action to="/procedures" tone="onLight">
                {t('ui.relatedProcedures')}
              </Action>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Steps() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead
        kicker={t('services.steps.kicker')}
        title={[
          t('services.steps.title1'),
          <span key="n" className="italic">{t('services.steps.title2')}</span>,
        ]}
      />
      <ol className="mt-14 border-t border-line">
        {pathway.map((step, i) => (
          <motion.li
            key={step.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="group relative overflow-hidden rounded-3xl border-b border-line"
          >
            <span
              aria-hidden="true"
              className="ghost-num pointer-events-none absolute -bottom-9 end-2 text-accent/0 transition-colors duration-700 group-hover:text-accent/15"
            >
              {step.n}
            </span>
            <div className="relative grid items-center gap-4 py-7 md:grid-cols-12">
              <span className="grid size-10 place-items-center rounded-full bg-ink text-[0.8rem] font-bold text-white shadow-[var(--shadow-soft)] transition-colors duration-700 group-hover:bg-accent md:col-span-1">
                {i + 1}
              </span>
              <h3 className="font-display text-[1.4rem] text-ink transition-colors duration-700 group-hover:text-accent-deep md:col-span-4">
                {t(`data.pathway.${step.id}.title`)}
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-deep md:col-span-6">{t(`data.pathway.${step.id}.text`)}</p>
              <span className="hidden justify-end md:col-span-1 md:flex">
                <Icon
                  name="clock"
                  className="size-4 text-line transition-colors duration-700 group-hover:text-accent"
                />
              </span>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

export default function Services() {
  return (
    <>
      <Intro />
      <Index />
      <Unsure />
      <Steps />
    </>
  );
}

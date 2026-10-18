import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppointmentForm from '../components/AppointmentForm';
import SectionHead from '../components/SectionHead';
import Icon from '../components/Icon';
import Action from '../components/Action';
import { clinic, contactChannels, nextSteps, services } from '../data/site';
import { MaskLines, Reveal, fadeUp, list } from '../lib/motion';

function Aside() {
  const { t } = useTranslation();
  return (
    <div className="panel">
      <div className="px-7 pt-8 pb-7 sm:px-8">
        <p className="eyebrow flex items-center gap-3 text-accent-deep">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {t('appointment.reach')}
        </p>
        <ul className="mt-6 border-t border-line">
          {contactChannels.map((c) => (
            <li key={c.id} className="border-b border-line last:border-0">
              <a
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel="noreferrer"
                className="group flex items-center gap-4 py-4 text-[0.95rem] text-deep transition-colors duration-500 hover:text-accent-deep"
              >
                <Icon name={c.icon} className="size-4 shrink-0 text-accent" />
                <span className="flex-1">{t(`data.channels.${c.id}.value`)}</span>
                <Icon
                  name="arrowOut"
                  className="size-3.5 opacity-0 transition-all duration-500 ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 group-hover:opacity-100"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-line bg-signal/6 px-7 py-6 sm:px-8">
        <p className="flex items-center gap-2.5 text-[0.86rem] font-semibold text-ink">
          <Icon name="alert" className="size-4 shrink-0 text-signal" />
          {t('appointment.emergencyTitle')}
        </p>
        <p className="mt-2 text-[0.85rem] leading-relaxed text-deep">{t('appointment.emergencyText')}</p>
      </div>

      <Reveal variant={fadeUp} delay={0.15}>
        <div className="border-t border-line px-7 py-6 sm:px-8">
          <p className="eyebrow text-muted">{t('appointment.whichService')}</p>
          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li key={s.id}>
                <Link to="/services" className="group flex items-baseline gap-3 text-[0.9rem] text-deep">
                  <span className="eyebrow text-[0.6rem] text-muted">{s.index}</span>
                  <span className="border-b border-transparent pb-0.5 transition-colors duration-500 group-hover:border-accent group-hover:text-accent-deep">
                    {t(`data.services.${s.id}.title`)}
                  </span>
                  <Icon
                    name="arrow"
                    className="size-3 self-center opacity-0 transition-all duration-500 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 group-hover:opacity-100 group-hover:text-accent"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.82rem] leading-relaxed text-muted">
            {t('appointment.unsure1')}{' '}
            <span className="font-medium text-ink">{t('data.services.neurosurgical-evaluation.title')}</span>{' '}
            {t('appointment.unsure2')}
          </p>
        </div>
      </Reveal>
    </div>
  );
}

function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative mx-auto max-w-[1400px] overflow-hidden px-5 pb-4 pt-32 sm:px-8 lg:pt-40">
      <span aria-hidden="true" className="wash" />
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal variant={fadeUp}>
          <span className="badge-lite">
            <Icon name="calendar" className="size-3.5 text-accent" strokeWidth={2} />
            {t('appointment.badge')}
          </span>
        </Reveal>
        <MaskLines
          as="h1"
          lines={[t('appointment.title1'), <span key="c" className="italic text-accent">{t('appointment.title2')}</span>]}
          delay={0.1}
          className="mt-6 text-[clamp(2.2rem,5.6vw,4rem)] text-ink"
        />
        <Reveal variant={fadeUp} delay={0.3}>
          <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-relaxed text-deep">{t('appointment.intro')}</p>
        </Reveal>
      </div>
    </section>
  );
}

function NextSteps() {
  const { t } = useTranslation();
  return (
    <section className="bg-tint">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
        <SectionHead
          kicker={t('appointment.next.kicker')}
          title={[
            t('appointment.next.title1'),
            <span key="a" className="italic">{t('appointment.next.title2')}</span>,
          ]}
        />
        <motion.ul
          variants={list(0.12, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-70px' }}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {nextSteps.map((step, i) => (
            <motion.li key={step.id} variants={fadeUp} className="panel group lift p-8">
              <span className="badge">
                <Icon name={step.icon} className="size-3.5 text-accent-lite" strokeWidth={2} />
                0{i + 1}
              </span>
              <h3 className="mt-8 font-display text-[1.35rem] text-ink transition-colors duration-700 group-hover:text-accent-deep">
                {t(`data.nextSteps.${step.id}.title`)}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-deep">{t(`data.nextSteps.${step.id}.text`)}</p>
            </motion.li>
          ))}
        </motion.ul>

        <Reveal variant={fadeUp} delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Action href={clinic.phoneHref} tone="onLight" icon="phone">
              {t('ui.callInstead')}
            </Action>
            <Action to="/contact" tone="onLight">
              {t('ui.clinicDetails')}
            </Action>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Appointment() {
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <AppointmentForm />
          </div>
          <div className="lg:col-span-5">
            <Aside />
          </div>
        </div>
      </section>
      <NextSteps />
    </>
  );
}

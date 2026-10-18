import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { nav } from '../data/site';
import Action from '../components/Action';
import Icon from '../components/Icon';
import { MaskLines, Reveal, fadeUp } from '../lib/motion';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="relative mx-auto flex min-h-[70vh] max-w-[1400px] flex-col justify-center overflow-hidden px-5 pt-32 sm:px-8">
      <span aria-hidden="true" className="wash" />
      <span aria-hidden="true" className="ghost-num pointer-events-none absolute -top-2 end-0 text-accent/10">
        404
      </span>
      <div className="relative">
        <Reveal variant={fadeUp}>
          <span className="badge-lite">
            <Icon name="arrow" className="size-3.5 text-accent" strokeWidth={2} />
            {t('notFound.badge')}
          </span>
        </Reveal>
        <MaskLines
          as="h1"
          lines={[t('notFound.title1'), <span key="m" className="italic text-accent">{t('notFound.title2')}</span>]}
          className="mt-6 text-[clamp(2.2rem,6vw,4rem)] text-ink"
        />
        <Reveal variant={fadeUp} delay={0.3}>
          <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-deep">{t('notFound.intro')}</p>
        </Reveal>
        <Reveal variant={fadeUp} delay={0.4}>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="group flex items-center gap-2 text-ink transition-colors duration-500 hover:text-accent-deep"
                >
                  <span className="h-px w-0 bg-accent transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-4" />
                  <span className="text-[0.9rem] font-semibold">{t(`nav.${item.key}`)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal variant={fadeUp} delay={0.5}>
          <div className="mt-10">
            <Action to="/" tone="onLight">
              {t('notFound.back')}
            </Action>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

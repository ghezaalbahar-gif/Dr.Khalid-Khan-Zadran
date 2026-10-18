import { MaskLines, Reveal, fadeUp } from '../lib/motion';

/** Section header: the label sits directly above its own headline, with an optional action on the right. */
export default function SectionHead({ kicker, title, intro, tone = 'light', aside }) {
  const dark = tone === 'dark';
  return (
    <header className="grid gap-8 md:grid-cols-12 md:items-end md:gap-6">
      <div className={aside ? 'md:col-span-8' : 'md:col-span-12'}>
        <Reveal variant={fadeUp}>
          <span
            className={`eyebrow inline-flex items-center gap-2 rounded-full py-1.5 ps-2.5 pe-3.5 ${
              dark ? 'bg-white/12 text-accent-lite ring-1 ring-inset ring-white/15' : 'bg-paper text-accent-deep shadow-[var(--shadow-soft)]'
            }`}
          >
            <span
              className={`grid size-5 place-items-center rounded-full ${dark ? 'bg-accent-lite/20' : 'bg-accent-soft'}`}
              aria-hidden="true"
            >
              <span className={`size-1.5 rounded-full ${dark ? 'bg-accent-lite' : 'bg-accent'}`} />
            </span>
            {kicker}
          </span>
        </Reveal>

        <MaskLines
          as="h2"
          lines={title}
          className={`mt-6 text-[clamp(2rem,5.2vw,3.4rem)] ${dark ? 'text-white' : 'text-ink'}`}
        />
        {intro && (
          <Reveal variant={fadeUp} delay={0.25}>
            <p className={`mt-5 max-w-xl text-[1rem] leading-relaxed ${dark ? 'text-white/75' : 'text-deep'}`}>{intro}</p>
          </Reveal>
        )}
      </div>

      {aside && (
        <div className="md:col-span-4 md:pb-1 md:text-end">
          <Reveal variant={fadeUp} delay={0.3}>
            <div className={`text-[0.9rem] ${dark ? 'text-white/75' : 'text-muted'}`}>{aside}</div>
          </Reveal>
        </div>
      )}
    </header>
  );
}

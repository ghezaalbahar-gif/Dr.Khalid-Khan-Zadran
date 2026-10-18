import { Link } from 'react-router-dom';
import Icon from './Icon';

/**
 * `--flow` is the colour of the circle that slides in on hover; the text flips
 * to white as it lands, so every tone stays readable.
 */
const tones = {
  solid:
    'bg-accent text-white border border-accent shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] [--flow:var(--color-accent-deep)]',
  tint: 'bg-accent-soft text-accent-deep border border-accent-soft hover:text-white [--flow:var(--color-accent)]',
  onLight: 'text-ink bg-paper border border-ink/12 hover:text-white hover:shadow-[var(--shadow-glow)] [--flow:var(--color-accent)]',
  onDark: 'text-white border border-white/25 hover:border-accent hover:shadow-[var(--shadow-glow)] [--flow:var(--color-accent)]',
};

/** A call to action: pill, a circle that flows in and fills it, an arrow that steps forward. */
export default function Action({ to, href, children, tone = 'onLight', icon = 'arrow', className = '' }) {
  const inner = (
    <>
      <span className="font-semibold text-[0.86rem]">{children}</span>
      <Icon
        name={icon}
        className="size-4 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ltr:group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 group-hover:scale-110"
      />
    </>
  );
  const cls =
    `group inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 py-3 leading-[1.6] tracking-[0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] active:scale-[0.97] btn-flow ${tones[tone]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <button type="submit" className={cls}>
      {inner}
    </button>
  );
}

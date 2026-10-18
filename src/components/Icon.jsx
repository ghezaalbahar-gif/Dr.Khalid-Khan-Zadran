import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  AlertTriangle,
  Brain,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  MapPin,
  Menu,
  MessageCircle,
  Microscope,
  Phone,
  Plus,
  ScanLine,
  Send,
  ShieldCheck,
  Stethoscope,
  X,
  Zap,
} from 'lucide-react';

const map = {
  activity: Activity,
  arrow: ArrowRight,
  arrowOut: ArrowUpRight,
  alert: AlertTriangle,
  brain: Brain,
  calendar: CalendarDays,
  check: Check,
  chevron: ChevronDown,
  clock: Clock,
  mapPin: MapPin,
  menu: Menu,
  message: MessageCircle,
  microscope: Microscope,
  phone: Phone,
  plus: Plus,
  scan: ScanLine,
  send: Send,
  shield: ShieldCheck,
  stethoscope: Stethoscope,
  close: X,
  zap: Zap,
};

/** Directional glyphs have to point the other way once the page runs right-to-left. */
const mirrors = {
  arrow: 'rtl:rotate-180',
  arrowOut: 'rtl:scale-x-[-1]',
};

export default function Icon({ name, className = 'size-5', strokeWidth = 1.5 }) {
  const Cmp = map[name];
  if (!Cmp) return null;
  return <Cmp className={`${className} ${mirrors[name] ?? ''}`} strokeWidth={strokeWidth} aria-hidden="true" />;
}

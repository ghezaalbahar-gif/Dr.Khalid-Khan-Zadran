import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from './Icon';
import { EASE } from '../lib/motion';

const methods = [
  { id: 'phone', key: 'methodPhone', icon: 'phone' },
  { id: 'whatsapp', key: 'methodWhatsapp', icon: 'message' },
  { id: 'either', key: 'methodEither', icon: 'check' },
];

const empty = { name: '', phone: '', date: '', method: 'phone', message: '' };

/** Every message is a locale key, so the errors speak the language of the form. */
function validate(values, t) {
  const errors = {};
  const name = values.name.trim();
  if (!name) errors.name = t('form.errorName');
  else if (name.length < 2) errors.name = t('form.errorNameShort');

  const digits = values.phone.replace(/[^\d]/g, '');
  if (!values.phone.trim()) errors.phone = t('form.errorPhone');
  else if (digits.length < 9) errors.phone = t('form.errorPhoneDigits');

  if (!values.date) errors.date = t('form.errorDate');
  else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(values.date) < today) errors.date = t('form.errorDatePast');
  }

  if (values.message.length > 500) errors.message = t('form.errorMessage');
  return errors;
}

function Field({ id, label, error, children, hint }) {
  return (
    <div className="group/field">
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="eyebrow cursor-text text-[0.62rem] text-deep transition-colors duration-500 group-focus-within/field:text-accent-deep"
        >
          {label}
        </label>
        {hint && <span className="text-[0.72rem] text-muted">{hint}</span>}
      </div>
      <div className="relative mt-2.5">{children}</div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mt-2 flex items-center gap-2 text-[0.8rem] text-signal"
          >
            <Icon name="alert" className="size-3.5" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputBase =
  'w-full rounded-xl border border-line bg-paper px-4 py-3 text-[1rem] text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-muted focus:border-accent focus:shadow-[var(--shadow-soft)]';

export default function AppointmentForm() {
  const { t } = useTranslation();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);

  const set = (key) => (event) => {
    const { value } = event.target;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const next = validate(values, t);
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(values);
      return;
    }
    const first = ['name', 'phone', 'date', 'message'].find((k) => next[k]);
    document.getElementById(`req-${first}`)?.focus();
  };

  return (
    <div className="panel relative px-6 py-8 sm:px-9 sm:py-10">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <motion.svg viewBox="0 0 48 48" className="size-12 text-accent" aria-hidden="true">
              <motion.circle
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: EASE }}
              />
              <motion.path
                d="M14 25l7 7 14-16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
              />
            </motion.svg>

            <h3 className="mt-6 font-display text-[clamp(1.7rem,3.4vw,2.4rem)] text-ink">
              {t('form.doneTitle', { name: sent.name.split(' ')[0] })}
            </h3>
            <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-deep">{t('form.doneText')}</p>

            <dl className="mt-9 border-t border-line">
              {[
                ['form.summary.patient', sent.name],
                ['form.summary.phone', sent.phone],
                ['form.summary.date', sent.date],
                [
                  'form.summary.reply',
                  t(`form.${methods.find((m) => m.id === sent.method).key}`),
                ],
                sent.message.trim() && ['form.summary.note', sent.message.trim()],
              ]
                .filter(Boolean)
                .map(([k, v]) => (
                  <motion.div
                    key={k}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="grid gap-1 border-b border-line py-4 sm:grid-cols-4"
                  >
                    <dt className="eyebrow text-[0.6rem] text-muted">{t(k)}</dt>
                    <dd className="text-[0.95rem] text-ink sm:col-span-3">{v}</dd>
                  </motion.div>
                ))}
            </dl>

            <button
              type="button"
              onClick={() => {
                setSent(null);
                setValues(empty);
                setErrors({});
              }}
              className="group mt-9 inline-flex items-center gap-3 rounded-full border border-line bg-paper px-6 py-3 text-[0.9rem] font-semibold text-ink shadow-[var(--shadow-soft)] transition-colors duration-700 hover:border-accent hover:text-accent-deep"
            >
              {t('form.again')}
              <Icon
                name="arrow"
                className="size-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ltr:group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5"
              />
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="space-y-7"
          >
            <Field id="req-name" label={t('form.name')} error={errors.name}>
              <input
                id="req-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder={t('form.namePlaceholder')}
                value={values.name}
                onChange={set('name')}
                aria-invalid={Boolean(errors.name)}
                className={`${inputBase} ${errors.name ? 'border-signal' : ''}`}
              />
            </Field>

            <Field id="req-phone" label={t('form.phone')} error={errors.phone} hint={t('form.phoneHint')}>
              <input
                id="req-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder={t('form.phonePlaceholder')}
                value={values.phone}
                onChange={set('phone')}
                aria-invalid={Boolean(errors.phone)}
                className={`${inputBase} ${errors.phone ? 'border-signal' : ''}`}
              />
            </Field>

            <Field id="req-date" label={t('form.date')} error={errors.date}>
              <input
                id="req-date"
                name="date"
                type="date"
                value={values.date}
                onChange={set('date')}
                aria-invalid={Boolean(errors.date)}
                className={`${inputBase} ${errors.date ? 'border-signal' : ''}`}
              />
            </Field>

            <div>
              <span className="eyebrow text-[0.62rem] text-deep">{t('form.methodQuestion')}</span>
              <div className="mt-3 flex flex-wrap gap-2.5" role="radiogroup" aria-label={t('form.methodAria')}>
                {methods.map((m) => {
                  const active = values.method === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setValues((v) => ({ ...v, method: m.id }))}
                      className={`relative isolate inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-[0.86rem] font-semibold transition-colors duration-500 ${
                        active
                          ? 'border-accent text-white'
                          : 'border-line bg-paper text-deep hover:border-accent/60 hover:text-accent-deep'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="method-active"
                          className="absolute inset-0 -z-10 rounded-full bg-accent shadow-[var(--shadow-glow)]"
                          transition={{ duration: 0.45, ease: EASE }}
                        />
                      )}
                      <Icon name={m.icon} className="size-4" />
                      {t(`form.${m.key}`)}
                    </button>
                  );
                })}
              </div>
            </div>

            <Field
              id="req-message"
              label={t('form.message')}
              error={errors.message}
              hint={`${values.message.length}/500`}
            >
              <textarea
                id="req-message"
                name="message"
                rows={3}
                placeholder={t('form.messagePlaceholder')}
                value={values.message}
                onChange={set('message')}
                aria-invalid={Boolean(errors.message)}
                className={`${inputBase} resize-none ${errors.message ? 'border-signal' : ''}`}
              />
            </Field>

            <div className="flex flex-wrap items-center gap-5 pt-1">
              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-[0.9rem] font-semibold text-white shadow-[var(--shadow-glow)] transition-colors duration-700 hover:bg-accent-deep hover:shadow-none"
              >
                {t('form.send')}
                <Icon
                  name="send"
                  className="size-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ltr:group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5"
                />
              </motion.button>
              <p className="max-w-xs text-[0.8rem] leading-relaxed text-muted">{t('form.demoNote')}</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

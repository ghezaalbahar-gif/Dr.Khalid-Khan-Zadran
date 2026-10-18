/**
 * Language-neutral data only: ids, icons, indexes, links and image geometry.
 * Every piece of copy lives in src/i18n/locales so English, Dari and Pashto
 * share one structure.
 */

export const clinic = {
  phoneDisplay: '+93 78 765 4751',
  phoneHref: 'tel:+93787654751',
  whatsappHref: 'https://wa.me/93787654751',
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=Rifah+Medical+Complex+Kabul',
};

export const nav = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/services', key: 'services' },
  { to: '/procedures', key: 'procedures' },
  { to: '/appointment', key: 'appointment' },
  { to: '/contact', key: 'contact' },
];

export const focusAreas = [{ id: 'brain' }, { id: 'spine' }, { id: 'nerves' }, { id: 'head-injury' }];

export const services = [
  { id: 'brain-surgery-consultation', index: '01', icon: 'brain', related: ['craniotomy-tumour', 'hydrocephalus-shunt', 'emergency-craniotomy'] },
  { id: 'spine-surgery-consultation', index: '02', icon: 'activity', related: ['discectomy', 'laminectomy-stenosis', 'spinal-fusion'] },
  { id: 'nerve-disorder-assessment', index: '03', icon: 'zap', related: ['median-decompression', 'peripheral-decompression'] },
  { id: 'neurosurgical-evaluation', index: '04', icon: 'stethoscope', related: ['haematoma-evacuation', 'spinal-fracture', 'skull-fracture'] },
];

export const procedureGroups = [{ id: 'all' }, { id: 'brain' }, { id: 'spine' }, { id: 'nerves' }, { id: 'head-injury' }];

export const procedures = [
  { id: 'craniotomy-tumour', group: 'brain' },
  { id: 'hydrocephalus-shunt', group: 'brain' },
  { id: 'haematoma-evacuation', group: 'brain' },
  { id: 'discectomy', group: 'spine' },
  { id: 'laminectomy-stenosis', group: 'spine' },
  { id: 'spinal-fusion', group: 'spine' },
  { id: 'spinal-fracture', group: 'spine' },
  { id: 'median-decompression', group: 'nerves' },
  { id: 'peripheral-decompression', group: 'nerves' },
  { id: 'emergency-craniotomy', group: 'head-injury' },
  { id: 'skull-fracture', group: 'head-injury' },
];

export const pathway = [
  { id: 'consultation', n: '01' },
  { id: 'scans', n: '02' },
  { id: 'plan', n: '03' },
  { id: 'recovery', n: '04' },
];

export const principles = [
  { id: 'assessment', icon: 'brain' },
  { id: 'one-clinic', icon: 'mapPin' },
  { id: 'scans-first', icon: 'scan' },
  { id: 'plain-language', icon: 'message' },
];

export const faqs = [{ id: 'operation' }, { id: 'bring' }, { id: 'recovery' }, { id: 'book' }];

export const ledgerRows = [{ id: 'education' }, { id: 'memberships' }, { id: 'career' }];

export const practiceRows = [{ id: 'specialty' }, { id: 'location' }, { id: 'line' }, { id: 'referrals' }];

export const contactChannels = [
  { id: 'phone', icon: 'phone', href: clinic.phoneHref, external: false },
  { id: 'whatsapp', icon: 'message', href: clinic.whatsappHref, external: true },
  { id: 'location', icon: 'mapPin', href: clinic.mapsHref, external: true },
];

export const visitItems = [{ id: 'images' }, { id: 'medicines' }, { id: 'someone' }];

export const nextSteps = [{ id: 'review', icon: 'check' }, { id: 'bring', icon: 'calendar' }, { id: 'consultation', icon: 'stethoscope' }];

export const imagingItems = [
  { id: 'brain', icon: 'brain' },
  { id: 'spine', icon: 'activity' },
  { id: 'nerves', icon: 'zap' },
  { id: 'reports', icon: 'microscope' },
];

export const photos = {
  portrait: { src: '/images/portrait-desk.jpg', w: 960, h: 1280 },
  scans: { src: '/images/reviewing-scans.jpg', w: 960, h: 1280 },
  conference: { src: '/images/conference.jpg', w: 1280, h: 852 },
  theatre: { src: '/images/operating-room.jpg', w: 1080, h: 810 },
  surgery: { src: '/images/in-surgery.jpg', w: 1280, h: 906 },
  theatreWide: { src: '/images/theatre-wide.jpg', w: 960, h: 704 },
  loupes: { src: '/images/with-loupes.jpg', w: 750, h: 1212 },
  atTable: { src: '/images/at-the-table.jpg', w: 720, h: 1280 },
};

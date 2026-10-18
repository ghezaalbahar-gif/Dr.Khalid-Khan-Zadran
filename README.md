# Dr. Khalid Khan Zadran — Neurosurgeon Portfolio & Appointment Website

A modern, responsive medical website for **Dr. Khalid Khan Zadran, Consultant Neurosurgeon and Brain & Spine
Specialist**, practising at Rifah Medical Complex, Kabul, Afghanistan.

Built with React 19, Tailwind CSS 4, Framer Motion, Lucide React, React Router 7, i18next and Lenis.

---

## 1. Quick start

```bash
# 1 — install dependencies
npm install

# 2 — start the development server (http://localhost:5173)
npm run dev

# 3 — run the test suite
npm test

# 4 — create a production build in dist/
npm run build

# 5 — preview the production build locally
npm run preview
```

Requires Node.js 20 or newer.

## 2. Scripts

| Script            | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Vite dev server with fast refresh              |
| `npm test`        | Runs the Vitest + React Testing Library suite  |
| `npm run test:watch` | Re-runs tests on change                     |
| `npm run build`   | Production bundle into `dist/`                 |
| `npm run preview` | Serves the built bundle locally                |

## 3. Pages

| Route          | Page          | What it contains                                                                 |
| -------------- | ------------- | -------------------------------------------------------------------------------- |
| `/`            | Home          | Animated hero, areas of care (each linking to its filtered procedures), service index, procedure teaser, doctor profile, pathway, call to action |
| `/about`       | About         | Biography, practice facts, credential ledger, photo study                        |
| `/services`    | Services      | Four expandable consultation services with related procedures                    |
| `/procedures`  | Procedures    | Eleven filterable procedures (`?area=brain·spine·nerves·head-injury`), imaging, recovery timeline, questions |
| `/appointment` | Appointment   | Controlled, validated demo request form with animated feedback                   |
| `/contact`     | Contact       | Clinic channels, plan-your-visit guidance, location panel, emergency notice       |
| `*`            | Not found     | Ranks the real pages so no visitor is stranded                                   |

The navbar (with its language switcher), footer, scroll-progress bar and route transitions are shared through
`src/components/Layout.jsx`.

## 4. Design system

Defined once in `src/index.css` with Tailwind 4 `@theme` tokens.

- **Colour** — surgical navy (`#0b2545`) as the only dark, cool bone (`#f5f8fb`) and white paper as the page
  ground, a clinical azure accent (`#0e7c9b` / `#0a5d76`) with a light cyan (`#6fd0e8`) reserved for text on
  navy, one tinted surface (`#e9f2f7`), and a terracotta signal (`#b4442c`) kept aside for safety notices.
  Bright sections carry the atmosphere; at most two navy bands appear on a page, never a dark-on-dark site.
- **Type** — Lora, a text serif with real italics, for every headline; Manrope for body copy and for the
  wide-tracked uppercase labels. When the page turns right-to-left, both roles move to Vazirmatn through the
  `--font-display`/`--font-sans` tokens, letter-spacing and uppercase tracking are switched off, and italics
  fall back to upright, because Arabic script has neither. No monospace faces.
- **Structure** — one card level only: a soft gradient `panel` with no border, never nested inside another.
  Hairline rules separate index rows, pills carry actions, `1.25rem`/`1.75rem` radii, and oversized ghost
  numerals bleed off panel edges as decoration. The navbar floats as a rounded pill above the page and
  gains its shadow on scroll. Every page uses a different layout rather than repeating the same card grid.
  Body clipping is `overflow-x: clip` rather than `hidden` — `hidden` turns the body into a scroll container
  and silently disables every `position: sticky` on the site, including the procedure filter panel.
- **Hover states** — every hover lands on a saturated accent tint (`accent`, `accent/25`–`accent/45`,
  `accent-soft/70`), never a pale white or paper wash, so the label keeps at least 4.5:1 against the new
  background. Buttons and phone pills carry `whitespace-nowrap` + `shrink-0` so a hover can never re-wrap them.
  Nothing moves vertically: cards darken their shadow, hairlines widen, colour shifts — no `translateY`.
  Every hover shares one slow 650–700ms `ease-out-expo` curve (the button fill runs 1000ms) so a hover settles
  as a single move instead of four that end at different moments.
- **Labels** — a section kicker sits directly above the headline it belongs to (`SectionHead`, and the masthead
  of each page), never floated into a side grid column. `/services`, `/appointment` and `/contact` centre their
  mastheads. Any pill placed over a photograph is `badge-accent`: azure with white text, because both the navy
  `badge` and the frosted `badge-lite` vanish against a busy or dark backdrop.
- **Brand mark** — `public/images/logo-mark.svg`: the Lucide brain glyph (two hemispheres, central fissure and
  brainstem) stroked in cyan on a navy gradient tile, used for both the navbar brand and the favicon. The
  brainstem draws itself once on load through CSS inside the SVG, which still honours
  `prefers-reduced-motion`. No letter monogram.

### Languages and right-to-left

English, Dari (`fa-AF`) and Pashto (`ps-AF`) are switchable from the pill in the navbar and at the foot of the
mobile sheet; the choice is stored under `localStorage.lang` and restored on the next visit.

- Every string lives in `src/i18n/locales/{en,fa,ps}.js`, all three holding the same 320-key tree, and
  `src/data/site.js` keeps only language-neutral ids, icons, indexes, links and image geometry. Components look
  copy up by id: `t(\`data.procedures.${p.id}.name\`)`.
- `applyDocumentLanguage()` sets `lang`, `dir` and `data-lang` on `<html>`, plus the document title and
  description. A small inline script in `index.html` repeats the stored choice before the first paint, so a
  right-to-left visitor never sees a left-to-right flash.
- Layout mirrors through logical properties (`start-*`, `end-*`, `ps-*`, `text-end`), Tailwind's built-in
  `rtl:` variant flips arrow glyphs and the scroll-progress bar, and the hover sweeps (`row-sweep`,
  `edge-in::after`, `btn-flow::before`) reverse their origin in CSS.
- RTL overrides are written **outside** `@layer base`: rules inside a layer lose to Tailwind utilities
  whatever their specificity, while unlayered rules outrank every layer.
- **Control geometry is pinned, never inherited.** `html[dir='rtl'] body { line-height: 1.95 }` is a reading
  measure for paragraphs; left to itself it leaked into every pill and field, so the same button measured
  52.8px in Dari against 48px in English. `Action`, `badge-lite`, `badge-accent` and every `a`, `button`,
  `input`, `select` and `textarea` now declare their own `1.6` (the two chips also carry a `min-height`), so
  all three languages render the same boxes, and Arabic script drops the Latin `0.01em` tracking.
- **Ambient art is square and logically anchored.** The hero lattice is a `600×600` viewBox inside a fixed
  `size-[32rem] / [40rem] / [48rem]` box pinned with `-end-[8%]`; stretching it to the hero's height painted a
  band floating mid-section, because the section grows taller in Arabic script. `wash` and `wash-navy` mirror
  with `scaleX(-1)` so the light always falls from the reading side.
- **Photography** — one treatment everywhere: true colour, `1.75rem` radius, a soft shadow that deepens on
  hover, and a slow breathing scale. Each file is displayed at or below its natural size, with an honest
  caption (`Photo` takes `tone="dark"` when it sits on a navy band so the caption keeps its contrast).

### Custom utilities

| Utility       | Purpose                                                              |
| ------------- | -------------------------------------------------------------------- |
| `eyebrow`     | Manrope, uppercase, wide-tracked section labels                        |
| `card`        | Flat paper surface with one gentle shadow                              |
| `panel`       | The site's single card level: white-to-blue gradient, no border        |
| `panel-tint`  | The same panel in tinted blue, for grouped cards                       |
| `panel-navy`  | The same panel in navy, for the dark bands                             |
| `badge`       | Navy pill label, used on light ground                                  |
| `badge-lite`  | Frosted white pill label, for quiet labels on light or navy ground       |
| `badge-accent`| Azure pill with white text — the only pill allowed on top of a photograph |
| `ghost-num`   | Oversized serif numeral; position and colour come from the call site    |
| `lift`        | The single hover move for cards and rows — a deeper shadow, no travel  |
| `edge-in`     | A 3px accent hairline that draws itself across a panel's top edge on hover |
| `btn-flow`    | A circle of accent that swells from the corner to fill a button (1000ms) |
| `photo`       | The one shared image grade and its hover shadow                        |
| `row-sweep`   | Paper tint that sweeps across an index row on hover or when open       |
| `wash`        | Ambient light gradient that keeps bright sections from looking flat; mirrors in RTL |
| `wash-navy`   | The same ambient light tuned for the navy bands                        |

## 5. Animation (Framer Motion)

Twelve meaningful, purpose-built motions:

1. **Hero headline** rises out of a clipping band, line by line (`MaskLines`), while two azure clinic
   pills settle in and then drift slowly on a loop (skipped entirely under reduced motion).
2. **Synaptic lattice** — SVG edges draw themselves with `pathLength`, then signal dots travel them.
3. **Cardiac trace** — a continuous ECG line scrolls across the hero and footer rules.
4. **Scroll reveals** — sections fade and lift into view once, via `whileInView`.
5. **Staggered entrances** — service rows, procedure lists and pathway steps arrive in sequence.
6. **Accordion expansion** — service and procedure details animate `height: auto`.
7. **Layout animation** — filtering the procedure list re-flows rows, and the active filter chip
   slides between positions with `layoutId`.
8. **Hover interactions** — a circle of accent swelling to fill each button, accent sweeps, growing hairlines
   and arrows that step forward (leftward in right-to-left), all on one shared slow curve.
9. **Route transitions** — each page fades and lifts as the previous one exits (`AnimatePresence`).
10. **Form feedback** — error messages animate in, the submit focus jumps to the first invalid field,
    and the confirmation draws its own checkmark.
11. **Mobile menu** — the sheet fades down while its links cascade in from the left and the burger icon
    rotates between states; the same cascade reverses on close, and reduced motion collapses it to a fade.
12. **Inertia scrolling** — Lenis (`src/lib/lenis.js`, `autoRaf`, `duration: 1.1`) smooths the wheel, the
    skip link and back-to-top. It keeps driving the real window scroll, so `whileInView` reveals, the
    scroll-linked timeline and the navbar progress bar all still read `window.scrollY`. The menu opens by
    pausing Lenis rather than hiding the body's overflow, which would break every sticky panel, and
    `respectReducedMotion` makes Lenis fall back to native scrolling on its own.

Scroll-linked detail: the recovery timeline on `/procedures` fills its vertical rule as you scroll.

### Reduced motion

`src/lib/motion.jsx` reads `useReducedMotion()`. When the visitor prefers reduced motion, `Reveal`
and `MaskLines` render plain static markup instead of motion nodes, the mobile menu drops its slide and
rotation for a plain fade, Lenis disables itself in favour of native scrolling, and a CSS guard clamps every
animation and transition duration.

## 6. Accessibility

- Skip-to-content link, semantic landmarks, one `h1` per page, ordered headings.
- Every icon is `aria-hidden`; meaning lives in the text beside it.
- The language switcher is a labelled `role=group` of `aria-pressed` buttons, and switching language updates
  `<html lang>`, `<html dir>` and the document title, so screen readers announce the right reading order.
- Form fields have real `<label for>` associations, `aria-invalid`, visible focus rings, and errors
  announced through an `aria-live` status region.
- Filter chips expose `aria-pressed`; the mobile menu exposes `aria-expanded`, locks body scroll, and closes
  on <kbd>Esc</kbd> or after choosing a link.
- Text colours meet WCAG AA (4.5:1) at the smallest sizes used.
- Fully keyboard operable; tested down to a 320 px viewport.

## 7. Testing

`src/test/app.test.jsx` runs 17 tests under Vitest + React Testing Library (jsdom):

- routing: hero renders, unknown routes hit the not-found page, navigation changes the page, and each
  focus-area card on the home page points at its filtered procedure list;
- procedures: all eleven are listed, filtering narrows the list and updates the live region, `?area=brain`
  opens already filtered, an unknown area falls back to all, rows expand;
- appointment form: empty submit is blocked with three field errors, past dates are rejected, a valid
  request confirms **without claiming that data was sent**;
- content integrity: unverified credentials stay marked *Pending verification*, and a guard test fails
  the build if outcome rates, patient volumes, ratings or testimonials are ever added;
- languages: Dari and Pashto carry exactly the same key tree as English, and choosing one translates the
  page, sets `dir="rtl"` and `lang="ps-AF"`, and persists the choice.

## 8. Project structure

```
neurosurgeon-portfolio/
├── index.html
├── vite.config.js
├── public/images/            # clinic photography + logo-mark.svg (navbar brand & favicon)
└── src/
    ├── main.jsx              # router + React root
    ├── App.jsx
    ├── index.css             # design tokens, RTL overrides and custom utilities
    ├── i18n/
    │   ├── index.js          # i18next setup, language list, lang/dir/title sync
    │   └── locales/          # en.js · fa.js (Dari) · ps.js (Pashto)
    ├── data/site.js          # language-neutral ids, icons, links and image geometry
    ├── lib/motion.jsx        # variants, Reveal, MaskLines, reduced-motion gate
    ├── lib/lenis.js          # inertia scrolling, pause/stop and back-to-top
    ├── components/
    │   ├── Layout.jsx        # navbar, routes, transitions, footer, scroll progress
    │   ├── Navbar.jsx  Footer.jsx  SectionHead.jsx
    │   ├── Action.jsx  Icon.jsx  Photo.jsx  LanguageToggle.jsx
    │   ├── NeuralField.jsx  VitalsLine.jsx
    │   ├── ServiceRow.jsx  AppointmentForm.jsx
    └── pages/
        ├── Home.jsx  About.jsx  Services.jsx
        ├── Procedures.jsx  Appointment.jsx  Contact.jsx  NotFound.jsx
```

Every translated string lives in `src/i18n/locales`, and `src/data/site.js` holds only the ids, icons,
indexes, links and image geometry those strings are looked up by.

## 9. Content policy

This site publishes only information verified with the clinic: the doctor's name, specialty, practice
location, phone line, and general descriptions of the consultations and procedures offered.

- No testimonials, patient counts, success rates or outcome claims appear anywhere.
- Education, memberships and career highlights are deliberately held back and marked
  *Pending verification* until the clinic confirms them.
- No social media or email addresses are linked, because none have been verified.
- Photographs are only the ones shared for this project, each captioned with what is visibly happening in
  the frame — no place, date or achievement is claimed. Images that could not be verified were left out:
  a portrait carrying an AI-generation watermark, a shot in academic regalia that would read as a claimed
  qualification, and a group photograph whose other participants cannot be identified.
- The Google Maps link runs a **search for the clinic name** rather than embedding unverified coordinates,
  and the location graphic is labelled as indicative.
- The appointment form is a frontend demonstration. It holds state in React, never calls a backend,
  and says so on screen.

## 10. Deployment

The site is a static SPA. On **Vercel** or **Netlify**:

- Framework preset: *Vite*
- Build command: `npm run build` · Output directory: `dist`
- Add one rewrite so client-side routes resolve:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

## 11. Screenshots

Capture these after `npm run dev` for the project presentation:

1. Home hero with the synaptic lattice drawn in
2. Services index with one row expanded
3. Procedures page filtered to *Spine*
4. Appointment form showing validation errors
5. Appointment confirmation with the drawn checkmark
6. Mobile navigation open, and the site at 320 px
7. Any page switched to Pashto or Dari, to show the right-to-left layout

---

**Emergency notice.** This website is a demonstration. The appointment form does not send or store any
data. For a sudden severe headache, head injury, seizure, weakness or loss of consciousness, go to the
nearest emergency department immediately.

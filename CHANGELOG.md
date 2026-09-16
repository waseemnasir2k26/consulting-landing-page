# Changelog

All notable changes to this project are documented in this file.

## [2026.09] - 2026-09-16

- Maintenance review of `consulting-landing-page` — a single-page marketing site for "Apex Consulting", a demo strategic-business-transformation brand.
- Status: React 19 + Vite + Tailwind CSS 4, no router. The entire page is one ~740-line `src/App.jsx` with anchored services, process, testimonials and about sections, supported by three components: hand-built `HeroGraphic` and `ProcessGraphic` SVGs and an `EmailModal` capture dialog. Untouched since the April 2026 build commit.
- Reviewed September 2026: the README, which was still the stock `create-vite` React template text, now describes what this repo actually is; the original template notes were kept below as a clearly labelled section. CHANGELOG added and the project versioned as v2026.09.
- Known gaps: no LICENSE file; no tests or CI (`npm run lint` is the only check); no deploy config in the repo (no `vercel.json`) and no live URL stated; the email modal has no documented backend endpoint; the brand, testimonials and figures are demo content, not a real client engagement.
- No application code, styles or dependencies were changed in this release — documentation and version metadata only.

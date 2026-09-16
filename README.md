# consulting-landing-page — Apex Consulting

A single-page marketing site for "Apex Consulting", a demo strategic-business-transformation brand
(`<title>Apex Consulting | Strategic Business Transformation`). React 19 + Vite + Tailwind CSS 4,
no router — the whole page lives in `src/App.jsx` with anchor sections for services, process,
testimonials and about, plus hand-built SVG graphics and an email-capture modal.

## Status


Last reviewed: September 2026 · release v2026.09

## Structure

```
src/App.jsx                      the whole page (~740 lines)
src/components/HeroGraphic.jsx   hero SVG illustration
src/components/ProcessGraphic.jsx process-step SVG
src/components/EmailModal.jsx    email-capture modal
```

## Develop

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

---

## Vite template notes

The sections below are the stock notes from the `create-vite` React template this project was
scaffolded from.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

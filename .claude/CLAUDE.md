# Alex Palaghia — Portfolio Website

## Who

Alex Palaghia is a Romanian movie director. This site is his professional portfolio.

## Language

English only — all UI text, copy, and code comments in English.

## Tech Stack

- React 19, TypeScript ~5.9, Vite 7 (SWC)
- Frontend lives in `frontend/`; backend TBD
- Design notes in `todo.txt` (Romanian)

## Planned Pages

1. **Home** — cinematic hero, intro reel
2. **About** — biography, career highlights
3. **Film / Portfolio** — grid of projects with detail views
4. **Contact** — form or social links

## Design Vibe

Modern, classy, cinematic, dark theme. See `design-direction` rule for details.

## Rules

Individual `.md` files in `.claude/rules/`. Only read when relevant to the current task.

| File | Topic |
|------|-------|
| `design-direction.md` | Visual style, animations, typography |
| `code-architecture.md` | Component reuse, layouts, file organization |

## Conventions (TBD)

These will be pinned as decisions are made:

- **Styling**: Plain `.css` files (no Tailwind, no CSS-in-JS)
- **Animation**: TBD (Framer Motion / GSAP / CSS)
- **Routing**: React Router v7 (declarative mode, `react-router` package)
- **State management**: TBD
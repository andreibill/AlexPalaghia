# CLAUDE.md

Portfolio website for Alex Palaghia (Romanian movie director).
See `.claude/CLAUDE.md` for full project context and rules index.

## Frontend Commands

All commands run from the `frontend/` directory:

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # TypeScript check + Vite production build
npm run lint      # ESLint across the project
npm run preview   # Preview production build locally
```

## Tech Stack

- **Frontend**: React 19, TypeScript ~5.9, Vite 7 with SWC plugin (`@vitejs/plugin-react-swc`)
- **Linting**: ESLint 9 flat config with `typescript-eslint`, `react-hooks`, and `react-refresh` plugins
- **Backend**: Not yet implemented

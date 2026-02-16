# Code Architecture

## Component Reuse

- Prefer expanding an existing component over creating a new one
- Extract repeated patterns into reusable components
- Keep components small, focused, and composable

## Layouts

- Use shared layout components (e.g., `PageLayout`, `SectionLayout`) for consistent page structure
- Pages should compose layouts, not duplicate structural markup

## File Organization

```
frontend/src/
  components/    # Shared/reusable components
  layouts/       # Page and section layout components
  pages/         # Page-level components (one per route)
  assets/        # Images, fonts, static files
  styles/        # Global and shared CSS files
```

- Group by feature/page when complexity grows
- Shared components live in `components/`; page-specific components live alongside their page

## Styling

- All styles in plain `.css` files — no Tailwind, no CSS-in-JS
- One `.css` file per component when scoping is needed
- Shared/global styles in `styles/`

## General

- Don't create a new file for something that fits naturally in an existing one
- Avoid premature abstraction — extract only when a pattern repeats
- Keep the dependency tree shallow and predictable
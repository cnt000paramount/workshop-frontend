# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Teaching repo for *Workshop AI — Modulo 2, Lab 4: generating React components with Claude Code*. React 18 + TypeScript + Vite. The codebase is intentionally a starting point: `App.tsx` renders a deliberately "raw" product grid that the lab exercise replaces with a generated `<ProductCard>` component. Comments, docs, and UI strings are in Italian — match that when editing.

## Commands

```bash
npm run dev          # Vite dev server on http://localhost:5173
npm run build        # tsc --noEmit (type-check) then vite build
npm test             # vitest run (one-shot)
npm run test:watch   # vitest in watch mode
npx vitest run src/App.test.tsx   # run a single test file
```

`npm run build` runs the type-check itself, so there is no separate lint/typecheck script — use `npm run build` to verify types.

## Backend dependency

This frontend has no backend of its own. It calls `GET /api/products`, and `vite.config.ts` proxies `/api` → `http://localhost:3000` (the `workshop-starter` backend from Lab 1, run separately). The proxy is why there's no CORS config and why the dev server is on 5173, not 3000. With no backend running, the app shows an error state — that is expected, not a bug to fix.

`fetchProducts()` (`src/api.ts`) tolerates both a bare array and an `{ items: [...] }` envelope from the backend.

## Conventions

- **CSS Modules**: styling goes through `*.module.css` imported as `styles` (see `App.module.css`). New components follow the same pattern (e.g. `ProductCard.module.css`).
- **Tests**: Vitest + React Testing Library, jsdom environment, globals enabled (no per-file imports of `describe`/`it` needed, though existing tests import them explicitly). `src/test/setup.ts` wires up jest-dom matchers. `App.test.tsx` is the reference model — it stubs `fetch` with `vi.stubGlobal`.
- The `Product` type (`src/types.ts`) mirrors the Lab 1 backend schema; keep them aligned.

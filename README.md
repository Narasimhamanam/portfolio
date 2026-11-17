# Narasimha Manam — Portfolio

A responsive personal portfolio with an ivory and charcoal liquid-glass interface, an interactive Three.js workspace, scroll reveals, project case studies and a browser-local chess room.

## Run locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

## Production and checks

```sh
npm run build
npm run preview
npx playwright install chromium
npm test
```

The production build includes TypeScript checking. Playwright checks desktop and mobile layouts, project dialogs, navigation, reduced-motion behavior, chess interactions and direct routes. GitHub Actions runs the build and browser checks on pushes and pull requests.

## Structure

- `src/studio/Portfolio.tsx`: portfolio content, navigation, case studies and contact interactions.
- `src/studio/Scene.tsx`: progressively loaded 3D workspace, visibility-aware animation and cleanup.
- `src/studio/studio.css`: responsive design and reduced-motion styles.
- `src/studio/ChessRoom.tsx`: local chess opponent using chess.js; no API or account required.
- `src/config.ts`: profile, contact, resume and experience data.

The 3D scene retains a portrait fallback when WebGL or model loading fails. Animation can be paused and respects reduced-motion preferences. The chess opponent is a simple two-ply material search; it is not a strong chess engine. Promotions use a queen.

## Deployment

Existing Vercel deployment: https://narasimha-manam-portfolio.vercel.app

Build command: `npm run build`; output directory: `dist`. `vercel.json` supplies the SPA rewrite for `/play` and `/myworks`. On another static host, configure an equivalent rewrite from `/*` to `/index.html` with status 200. No environment secrets are needed for the portfolio.

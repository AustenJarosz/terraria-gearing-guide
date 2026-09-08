# Terraria Gearing Guide

A small React site for class loadouts across Pre-Hardmode, Hardmode, and endgame.

The roadmap includes 11 stops (3 Pre-Hardmode, 8 Hardmode) and 44 class loadouts. Optional events share an Event upgrades stop; Duke Fishron and Empress share an Optional bosses stop. Expand an encounter for unlock and summon instructions, preparation advice, and rewards separate from first-clear equipment. Stop selection is navigation, not completion tracking. The late-game route is a suggested order; optional encounters may be tackled earlier according to their stated unlocks.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

Item images are served locally from `public/items`. The site targets Desktop 1.4.5.7; content provenance and sprite regeneration instructions are in [CONTENT_SOURCES.md](CONTENT_SOURCES.md).

Checks: `npm run build`, `npm run lint`, and `node scripts/verify.mjs`.

Item cards: hover pauses briefly before fading in; click/tap pins the card. Escape dismisses it. Keyboard users can focus an item and press Arrow Down to reach its wiki link.

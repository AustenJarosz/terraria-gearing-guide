# Terraria Gearing Guide

A React and Vite guide for **Terraria Desktop 1.4.5.7, Master Mode**, in ordinary worlds without mods or special seeds.

The site has four views:

- **Gearing roadmap:** class loadouts across 11 stops, with weapon/accessory pairings, replacement choices, acquisition previews, and expandable potions and buffs. Builds use six accessory slots before the Demon Heart and seven afterward. Selecting a stop does not mark earlier encounters complete.
- **Boss & event checklist:** manually track encounters and Dungeon visits, browse useful loot, and read spawn/access conditions with linked summon recipes. Dungeon visits appear here rather than in the roadmap.
- **NPC guide:** recruitment conditions and useful shop stock, grouped by progression with additional sale requirements.
- **Fishing guide:** guaranteed Angler milestones, useful random rewards and their conditional base chances, plus a manual quest counter.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually `http://localhost:5173`. Item sprites and custom backgrounds are served from committed files in `public/`; running the site does not require Terraria or a wiki connection.

## Saved progress

The selected class, roadmap stop, main view, gear layout, artwork dimming, checklist completion, and manual fishing count use browser local storage. They are saved for that browser profile and site address, not to a Terraria save or an online account. They do not automatically transfer between devices, browsers, or different development/deployment addresses. Clearing site data removes them; when browser storage is unavailable, changes only last in the open page.

The roadmap's bottom-left **New / Classic / Compact** switch compares full-width gear sections, the original three-column layout, and a refined three-column layout with tighter cards and accessory swaps grouped directly beneath the item they replace. All three use the same current recommendations.

## Editing content

Start with [CONTENT_SOURCES.md](CONTENT_SOURCES.md), which links all seven content guides and their source references. Common edit locations are:

- `src/data/loadouts.js`: gear lists, accessory alternatives, and encounter notes.
- `src/data/equipmentLinks.js` and `itemNotes.js`: pairing labels and reusable item guidance.
- `src/data/preparation.js` and `preparationItems.js`: potions, buffs, and stations.
- `src/data/gearAcquisition.js` and `summonAcquisition.js`: recipes and acquisition details.
- `src/data/checklist.js`, `checklistSpawns.js`, and the boss/event/Dungeon loot datasets: checklist encounters and rewards.
- `src/data/npcs.js` and `fishing.js`: the NPC and fishing views.

Keep saved checklist IDs stable. Verify progression and Master Mode conditions before changing recommendations or drop rates. The live wiki can describe patches newer than this guide's target.

## Checks

```bash
npm run check
npm run lint
npm run build
```

`check` runs all content and behavior verification scripts in `scripts/`. It checks data consistency, assets, and known regressions; it does not prove combat rankings. Also review changed interactions and layouts in the browser at desktop and mobile widths.

Item previews support hover, click/tap, and keyboard focus. Escape dismisses an open preview. Keyboard users can focus an item and press Arrow Down to enter its preview and follow wiki links.

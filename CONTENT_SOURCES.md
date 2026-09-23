# Content sources and maintenance

Current index: September 22, 2026. The guide targets **Terraria Desktop 1.4.5.7, Master Mode**, in ordinary worlds without mods or special seeds. It curates practical gear and useful rewards; it is not an exhaustive item catalog or a measured DPS ranking.

## Editing and references

Use the relevant guide below for data fields, content decisions, references, and focused checks:

- [Loadouts](docs/LOADOUT_CONTENT.md): `src/data/loadouts.js`, the item catalogs, weapon/accessory pairings, and encounter-specific notes. The roadmap has six equipped accessory slots before the Demon Heart and seven afterward, with alternatives replacing a named slot.
- [Potions and buffs](docs/PREPARATION_CONTENT.md): `src/data/preparation.js` and `preparationItems.js`; progression, class buffs, flasks, stations, and preparation notes.
- [Acquisition previews](docs/ACQUISITION_CONTENT.md): `src/data/gearAcquisition.js` and `summonAcquisition.js`; recipes, vendors, enemy drops, and source links. Shared loot datasets supply drop rates instead of repeating them in recipes.
- [Boss and event checklist](docs/CHECKLIST_CONTENT.md): `src/data/checklist.js`, spawn conditions, boss/event loot, grouping, and stable completion IDs. Spawn instructions belong in this view.
- [Dungeon loot](docs/DUNGEON_CONTENT.md): `src/data/dungeonDrops.js` and `dungeonChests.js`; pre-/post-Plantera enemy and chest rewards. Both visits are in the checklist, not the gearing roadmap.
- [NPC guide](docs/NPC_CONTENT.md): `src/data/npcs.js`; recruitment, useful shop stock, progression gates, and additional sale conditions.
- [Fishing guide](docs/FISHING_CONTENT.md): `src/data/fishing.js`; Angler milestones, useful random rewards, eligibility, and the distinction between conditional roll rates and absolute quest odds.

Roadmap presentation lives in `src/data/gear.js` and `roadmap.js`; environment artwork is configured in `src/data/environments.js`. Main view layout is in `src/App.jsx` and `src/App.css`. Browser persistence is shared through `src/hooks/usePersistentState.js` and `src/data/storage.js`.

## Source policy

Individual item, NPC, boss, and event records link to the [Official Terraria Wiki](https://terraria.wiki.gg/wiki/Terraria_Wiki). The guides above identify the sources used for their version-sensitive rules. Check patch-specific claims against Re-Logic's release notes and the installed game's `changelog.txt`, specifically its **1.4.5.7** section. A live wiki page or a newer installed game may describe later changes; do not silently import those into this version's recommendations.

Keep difficulty, progression, bag versus direct drops, and extra conditions attached to loot rates. Qualitative gear recommendations still require editorial judgment. Automated checks can catch inconsistent data and known regressions; they do not establish that every recommendation is optimal or every external source is current.

## Images

Terraria item, NPC, and boss sprites are extracted from the user's installed game using ItemID/NPC IDs and the export scripts in `scripts/`. The committed sprite manifest and specialized exporters preserve asset mappings and handle animated inventory frames. See each content guide for its exporter. Regeneration needs a local Terraria installation; the built website serves committed assets from `public/` and does not need the game at runtime. Terraria assets belong to Re-Logic.

Custom environment illustrations are separate generated artwork in `public/images/`. Earlier illustration prompts and source research remain in [CONTENT_HISTORY.md](docs/CONTENT_HISTORY.md). That archive preserves the design history, including superseded layouts and advice; it is not the current maintenance guide.

## Validation

Run `npm run check` for every `scripts/verify*.mjs` content and behavior verifier, then `npm run lint` and `npm run build`. See [README.md](README.md) for local startup. Changes to layouts, overlays, or interactions also need browser checks at desktop and mobile widths.

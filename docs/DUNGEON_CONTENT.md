# Dungeon checklist content

Dungeon visits live in the checklist after Skeletron and after Plantera. They are excluded from the visible gearing roadmap and its previous/next navigation. Historical loadout records remain in the data; saved selections of either retired Dungeon stop move to the next gearing stage.

- `src/data/checklist.js`: checklist order, names and encounter categories. Keep IDs stable to preserve completion saved on the user's device.
- `src/data/dungeonChests.js`: unique chest rewards, chances, key requirements and world restrictions. The early visit shows Gold and wooden chests; the return visit starts with Biome Chests and retains the early loot.
- `src/data/dungeonDrops.js`: per-enemy loot for both visits. Returning enemies retain their original drops.
- `src/DungeonChests.jsx`: chest grouping and access notes. Standard-world gear, keys and crafting stations are included; common supplies, decorations and special-seed substitutions are outside this list.

Chest percentages describe generated contents, not enemy drops. The seven Gold Chest primary rewards follow a world-generation cycle, so they are labeled “1 of 7.” Secondary-item exceptions are explained beneath the list. Biome weapons are guaranteed in their matching chest, but require Plantera's defeat and the correct key.

Checked against the Official Terraria Wiki for Desktop 1.4.5.7:

- [Gold Chest — Dungeon loot](https://terraria.wiki.gg/wiki/Gold_Chest#Dungeon)
- [Biome Chests](https://terraria.wiki.gg/wiki/Biome_Chests)
- [Biome Keys](https://terraria.wiki.gg/wiki/Biome_Keys)
- [Dungeon](https://terraria.wiki.gg/wiki/Dungeon)

Sprites are exported from the installed game through `scripts/export-loadout-sprites.mjs`. Validate with `node scripts/verify-checklist.mjs` and `node scripts/verify.mjs`.

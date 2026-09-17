# Acquisition previews

The gear and summon previews share `src/Acquisition.jsx`.

- Edit gear recipes, vendors, and special drop sources in `src/data/gearAcquisition.js`.
- Edit summon recipes and drop sources in `src/data/summonAcquisition.js`.
- Recipes list `[ingredient name, quantity]` pairs and alternate crafting stations. An ingredient name can be an array of alternatives; the quantity is for one chosen alternative, not each option.
- Armor summaries are explicitly labeled full-set material totals. They do not claim that the entire set is crafted in one action.
- Boss, event, and Dungeon enemy drop rates are reused from the existing loot datasets. Rates are Master Mode, with bag/direct-drop conditions retained.
- Broad biome drops, chests, and catches use short notes instead of unnecessary enemy tables.
- Ingredients, results, stations, and named enemies link to their Official Terraria Wiki pages.

Recipe references are the corresponding item pages on https://terraria.wiki.gg/wiki/. Checked against modern Desktop references, including the updated Amazon, Blade of Grass, Hive-Five, Spider equipment, and Flinx Staff recipes. The source links remain available in each preview. Full-set totals use the corresponding armor pages.

Sprites come from the user's installed Terraria game and retain Re-Logic attribution. `scripts/export-acquisition-sprites.mjs` prepares recipe icons using the committed sprite manifest and optionally an ItemID map in `tmp/item-ids.json` when adding new sprites; the generated site assets do not require the game or that temporary map at runtime.

Run `node scripts/verify-acquisition.mjs` to check content coverage, recipe quantities, alternative matching, and PNG assets.

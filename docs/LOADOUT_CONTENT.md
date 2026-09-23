# Master Mode gearing

Reviewed September 22, 2026 for Desktop **1.4.5.7**, ordinary worlds and solo-friendly first clears. These are practical recommendations with optional upgrades and fallbacks, not simulated DPS rankings. Specialized arena strategies, mixed-armor optimization and mounts replacing flight accessories are outside the default builds.

## Editing

- `src/data/loadouts.js`: stage/class armor, weapons, equipped accessories, replacement choices and encounter notes. Each named build contains four classes. The 56 stored builds include older Dungeon/optional entries for compatibility; the roadmap shows 44 builds across 11 stops.
- `src/data/items.js`: base item catalog. `loadoutItems.js`, `weaponSupportItems.js` and `preparationItems.js` supply additional catalog entries. Keep each item ID defined in one place.
- `src/data/equipmentLinks.js`: weapon families, compatible ammunition, matching labels and weapon-support accessory choices.
- `src/data/itemNotes.js`: reusable item guidance. A build's item notes override these where the encounter needs different advice.
- `src/data/accessorySlots.js`: combines baseline accessories, choice groups and swaps into one row per equipped slot. `src/AccessoryGuide.jsx` renders the rows; `accessoryCaptions.js` provides choice qualifiers for New and fuller benefit captions for Compact.
- `src/data/gearAcquisition.js`: recipes and shop conditions; it reuses boss, event and Dungeon loot rather than duplicating their drop percentages. See [acquisition previews](ACQUISITION_CONTENT.md).
- `src/data/preparation.js`: potions, flasks and stations for each stage/class. See [potions and buffs](PREPARATION_CONTENT.md).

`build(armor, weapons, accessories, notes, accessorySwaps, itemNotes)` takes space-separated item IDs for its first three arguments. Armor and weapons are alternatives; the first weapon is the suggested starting choice. Partial outfits and class-specific headpieces have explicit guidance.

## Display and slot rules

The bottom-left **New / Classic / Compact** switch persists under `terraria-guide-layout`. New is the default presentation described below. `ClassicEquipmentGuide.jsx` restores the original three-column Armor / Weapons / Accessories cards, choose-one groups and separate accessory-swaps dropdown. `CompactEquipmentGuide.jsx` refines the same three-column order with tighter cards and accessory swaps grouped beneath the item they replace. Each accessory has its own outlined card; alternatives match the starting item's width and follow a choose-one divider within the numbered slot group. Weapon and armor notes stay on the cards; accessory guidance remains in the hover/tap preview. Ammo sits beneath weapons. At tablet widths armor and weapons share a row above accessories; phones stack all three. All three layouts share the current loadout data, item previews, potions and build notes; the switch is only shown in the gearing roadmap.

All recommended weapons stay in one visible list. Accessories have their own full-width section with six or seven numbered slot groups. The starting accessory and all its alternatives stay visible together, with text-and-color labels connecting compatible weapons and gear. Cards share column widths and a common name/metadata arrangement; a single alternative occupies the same width as an option in a larger group. Extra alternatives can use additional card rows without stretching the starting item. Narrow screens stack alternatives at the same width below their starting item. Terraria rarity colors are separate from these labels.

Armor, weapons and ammunition use matching full-width sections with tight spacing and flat item rows. Generic stat/type subtitles and section descriptions are omitted; stats remain in item previews. Headpiece/build notes and pairing labels stay visible. Only accessories use slot numbers; weapon lists can include complementary minions, whips and support weapons. `EquipmentGuide.jsx` scopes this presentation so potion and reward cards keep their existing layout.

The equipped baseline contains **six slots before the Wall of Flesh's Demon Heart, seven afterward**. A replacement names its slot; it does not add another slot. Choice groups retain the baseline ID for counting. World-evil defense, balloons, mana support, yoyo support and bow quivers are alternatives within those slots.

Yoyos have visible String/Strung Counterweight choices before Hardmode, Glove/Bag at the first mechanical bosses, and Magic/plain Bag later. Bags include their component effects. Ammo connects to the correct bows, guns, darts, Star Cannon, Flamethrower or Stynger. Meteor and gem armor connect to compatible spells. Summoner tags distinguish frequent-hit/flat-tag pairings from heavy-hit Firecracker/Vulgar Display of Flower pairings; these are suggestions rather than exclusive compatibility rules. Twilight Grasp supports three tags, not every listed whip at once.

Potions & buffs starts collapsed. In the New layout, accessory recipes, stats, complete build guidance and choice explanations live in each item's hover/tap preview. Only useful qualifiers such as world evil, requirements, difficult acquisition and fallbacks stay beneath the item name; generic benefits are omitted. Accessory alternatives never need a separate dropdown or weapon setup selector in this layout. Run `node scripts/verify-accessory-slots.mjs` to check slot merging and guidance preservation.

## Progression and encounter rules

- First-entry builds never require their own encounter's rewards. Dungeon entry data remains valid even though the Dungeon now appears only in the checklist.
- Grouped events use earlier equipment. Fishron/Empress builds may show optional event upgrades alongside earlier fallbacks, but never their own rewards. Later stages label optional farms.
- Mechanical-boss advice distinguishes Destroyer piercing from single-target weapons for Twins/Prime. Chlorophyte crafting follows all three mechanical bosses.
- Cultist ammunition avoids Chlorophyte Bullets' homing penalty; the pillars emphasize enemy groups, and Moon Lord starts with fragment weapons.
- Lunar armor requires a Moon Lord kill. Daytime Empress/Terraprisma is not required. Moon Bite invalidates healing from Spectre Hood and Vampire Knives during its effect.
- Current mana regeneration, gem-robe effects, whip-tag slots, and Kraken's Fishron source follow 1.4.5.7. Do not apply later patch changes silently.

## Audit and checks

The September 22 pass corrected gem-staff recipes (7 metal bars), removed the extra wood claim from Hive-Five, fixed Molten Quiver's Flaming Arrow description, corrected verified rarity colors, and removed a shadowed Sanguine Staff catalog entry. Combined accessory validation caught and removed a second Shackle recommendation in the same pre-boss mage build.

Run `node scripts/verify-loadouts.mjs`, `node scripts/verify-acquisition.mjs`, `node scripts/verify-preparation.mjs`, `node scripts/verify.mjs`, `npm run build` and `npm run lint`.

Validation covers every class/stage, exact slots, all combinations of choices and replacements, duplicates, flight dependencies, pairing partners, compatible ammo, source/recipe coverage, progression gates and first-entry constraints. It cannot prove combat rankings.

## References

Item previews link to their individual official wiki pages. Version-sensitive facts are also checked against the installed game's **1.4.5.7** changelog section; live wiki pages may already describe newer patches.

- [Class setups](https://terraria.wiki.gg/wiki/Guide:Class_setups), [Master Mode](https://terraria.wiki.gg/wiki/Master_Mode), [Demon Heart](https://terraria.wiki.gg/wiki/Demon_Heart).
- [Wall of Flesh](https://terraria.wiki.gg/wiki/Guide:Wall_of_Flesh_strategies), [Destroyer](https://terraria.wiki.gg/wiki/Guide:The_Destroyer_strategies), [Plantera](https://terraria.wiki.gg/wiki/Guide:Plantera_strategies), [Cultist](https://terraria.wiki.gg/wiki/Guide:Lunatic_Cultist_strategies), [Moon Lord](https://terraria.wiki.gg/wiki/Guide:Moon_Lord_strategies).
- [Yoyos](https://terraria.wiki.gg/wiki/Yoyos), [Strung Counterweight](https://terraria.wiki.gg/wiki/Strung_Counterweight), [Kraken](https://terraria.wiki.gg/wiki/Kraken), [Hive-Five](https://terraria.wiki.gg/wiki/Hive-Five), [Molten Quiver](https://terraria.wiki.gg/wiki/Molten_Quiver).
- [Gem staves](https://terraria.wiki.gg/wiki/Gem_staves), [Mana Cloak](https://terraria.wiki.gg/wiki/Mana_Cloak), [Master Ninja Gear](https://terraria.wiki.gg/wiki/Master_Ninja_Gear), [Whips](https://terraria.wiki.gg/wiki/Whips), [Ruinous Staff](https://terraria.wiki.gg/wiki/Ruinous_Staff).
- [Nano Bullet](https://terraria.wiki.gg/wiki/Nano_Bullet), [Chlorophyte Bullet](https://terraria.wiki.gg/wiki/Chlorophyte_Bullet), [Wooden Arrow recipes](https://terraria.wiki.gg/wiki/Wooden_Arrow), [rarity 4 catalog](https://terraria.wiki.gg/wiki/Category:Items_of_rarity_4).

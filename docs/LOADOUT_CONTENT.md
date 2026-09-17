# Master Mode gearing audit

Reviewed September 17, 2026 for Desktop **1.4.5.7**, ordinary worlds, solo-friendly first clears. This is a practical selection of coherent builds, not a claim that every recommended item is the maximum possible DPS configuration. Mixed armor, mounts replacing flight accessories, and specialized arena strategies are outside these default builds.

## Where to edit

- `src/data/loadouts.js`: every stage/class recommendation, including Dungeon entry builds and the grouped optional encounters. Each named section contains four classes; the final `byStage` map assigns them to the roadmap. The existing optional pre-Hardmode data is maintained, even though that extra stop is currently hidden from the roadmap UI.
- `src/data/items.js` and `src/data/loadoutItems.js`: item names, images, summaries, and wiki links. New audit items are in the latter and merged into the main catalog.
- `src/data/gearAcquisition.js`: structured recipe ingredients/stations, drop percentages, and shop conditions used by item previews. Existing checklist and Dungeon loot is reused where names match.
- `src/data/itemNotes.js`: reusable visible item conditions. A loadout's `itemNotes` overrides these for that particular recommendation.
- `src/data/roadmap.js`: encounter descriptions and rewards to chase after winning. It no longer contains a second, conflicting set of loadouts.

`build(armor, weapons, accessories, notes, accessorySwaps, itemNotes)` accepts space-separated item IDs for its first three arguments. Armor and weapons are alternatives; the first weapon is the suggested starting choice. Partial outfits such as Flinx Fur Coat have explicit notes about the remaining pieces. Class-specific armor headpieces are added automatically for the ore/Hallowed/Chlorophyte sets.

The `accessories` list is a complete equipped build: **six** in pre-Hardmode, including the Wall of Flesh fight; **seven** in Hardmode, assuming the Demon Heart has been consumed. A swap names its replacement: `swap('brainConfusion', 'wormScarf', 'Crimson-world alternative...')`. Do not add an eighth accessory to the baseline to express a choice.

## Decisions from this pass

- Filled all accessory slots with a balance of mobility, class damage, and survival. Swaps explain bow/gun/yoyo variants, world-evil alternatives, optional flight rewards, and missing rare drops.
- Reviewed weapons at every stop, including better early melee projectiles, appropriate Wall of Flesh piercing options, mechanical-boss weapon/ammo roles, post-Plantera Dungeon upgrades, and fragment weapons before Moon Lord.
- Kept Dungeon entry sets obtainable before the visit. The grouped event and optional-boss kits use post-Golem equipment without assuming their own rewards. Later pages label optional farms and offer fallbacks.
- Removed obsolete slot-pool wording. Preserved Master-only scope and the existing compact roadmap rather than adding difficulty controls or more progression stops.
- Added current-version mana and whip upgrades. Different whip tags require extra slots; Firecracker is paired with heavier minion hits rather than blindly recommended for Blade Staff. Mage sets distinguish Mask/Hood and avoid relying on Hood healing against Moon Lord.
- Lunar armor still requires Luminite from Moon Lord. Daytime Empress and Terraprisma are not first-clear requirements.
- Added local sprites and structured acquisition previews for the new gear. `scripts/export-loadout-sprites.mjs` records their installed-game ItemID mappings.

## References

The live wiki is still being revised for the newer patches. Cross-check version-specific mechanics against the installed game's **1.4.5.7** changelog section; do not silently adopt later balance changes.

- Slot rules: [Master Mode](https://terraria.wiki.gg/wiki/Master_Mode), [Demon Heart](https://terraria.wiki.gg/wiki/Demon_Heart).
- Broad progression cross-check: [class setups](https://terraria.wiki.gg/wiki/Guide:Class_setups). Recommendations here are an editorial selection, not a copy of every entry or ranking.
- Encounter context: [Wall of Flesh](https://terraria.wiki.gg/wiki/Guide:Wall_of_Flesh_strategies), [Destroyer](https://terraria.wiki.gg/wiki/Guide:The_Destroyer_strategies), [Plantera](https://terraria.wiki.gg/wiki/Guide:Plantera_strategies), [Lunatic Cultist](https://terraria.wiki.gg/wiki/Guide:Lunatic_Cultist_strategies), [Moon Lord](https://terraria.wiki.gg/wiki/Guide:Moon_Lord_strategies).
- Mobility/gates: [Wings](https://terraria.wiki.gg/wiki/Wings/List), [Amphibian Boots](https://terraria.wiki.gg/wiki/Amphibian_Boots), [Magiluminescence](https://terraria.wiki.gg/wiki/Magiluminescence), [Master Ninja Gear](https://terraria.wiki.gg/wiki/Master_Ninja_Gear).
- Pairings and current crafting: [Ruinous Staff](https://terraria.wiki.gg/wiki/Ruinous_Staff), [Vulgar Display of Flower](https://terraria.wiki.gg/wiki/Vulgar_Display_of_Flower), [Whips](https://terraria.wiki.gg/wiki/Whips), [Magic Yoyo Bag](https://terraria.wiki.gg/wiki/Magic_Yoyo_Bag), [Strung Counterweight](https://terraria.wiki.gg/wiki/Strung_Counterweight), [Molten Quiver](https://terraria.wiki.gg/wiki/Molten_Quiver), [Obsidian Shield](https://terraria.wiki.gg/wiki/Obsidian_Shield).
- Magic sustain and survival: [Mana Regeneration Band](https://terraria.wiki.gg/wiki/Mana_Regeneration_Band), [Mana Cloak](https://terraria.wiki.gg/wiki/Mana_Cloak), [Black Belt](https://terraria.wiki.gg/wiki/Black_Belt), [Dodge](https://terraria.wiki.gg/wiki/Dodge), [Spectre armor](https://terraria.wiki.gg/wiki/Spectre_armor).
- Individual item pages are linked from every item preview, including new weapon recipes and shops. Master drop percentages are shared with the existing encounter loot data when available.

## Validation

Run `node scripts/verify-loadouts.mjs`, `node scripts/verify.mjs`, `node scripts/verify-acquisition.mjs`, `npm run build`, and `npm run lint` after editing.

The loadout verifier checks all class/stage combinations, exact slot counts, valid replacements, duplicate/redundant mobility items, flight for Soaring Insignia, bow accessories, crafting-preview coverage, progression gates, and first-entry encounter constraints. These checks protect content rules; they do not simulate boss fights or establish a DPS ranking.


Accessory choice groups
-----------------------

The exported loadouts include accessoryChoices keyed by equipped slot ID. Each group counts as one slot, regardless of the number of alternatives. Shared world-evil, balloon, and mana-support choices are defined in withAccessoryChoices in src/data/loadouts.js. Keep the baseline accessory in the group. Other situational replacements remain in accessorySwaps.

This pass adds Mystic Bloom and Glacier Fang to pre-boss mage, upgrades balloon slots to Bundle of Horseshoe Balloons with a Cloud in a Balloon fallback, and offers Magnet Flower / Celestial Cuffs choices. Recipes and effects checked against the official Terraria wiki:
- https://terraria.wiki.gg/wiki/Vine
- https://terraria.wiki.gg/wiki/Bundle_of_Horseshoe_Balloons
- https://terraria.wiki.gg/wiki/Magnet_Flower
- https://terraria.wiki.gg/wiki/Celestial_Cuffs

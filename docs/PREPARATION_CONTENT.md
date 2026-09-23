# Potions and buffs

Curated for the guide's Desktop **1.4.5.7**, Master Mode, ordinary-world first clears. Reviewed September 22, 2026. Recommendations are useful options, not a requirement to farm every buff.

## Editing the selection

- `src/data/preparation.js`: stage progression, shared essentials, class potions, flask alternatives, stations, and encounter-specific extras. `getPreparation(stageId, classId)` resolves every loadout. Edit the arrays here to curate what appears.
- `src/data/preparationItems.js`: names, effects, base durations, descriptions, recipes, sources, and installed-game sprite IDs. These entries merge into the existing item catalog and acquisition previews.
- `src/PreparationGuide.jsx`: the initially collapsed disclosure with three columns; stacks on small screens. Only rendered within the gearing roadmap's equipment guide.

Each visible item retains the existing hover/tap preview and wiki link. Recipe quantities are output batch sizes. Shimmer transmutation uses the same ingredient layout and a linked Shimmer station without a misleading item icon.

## Content decisions

- Healing advances from 100-HP Healing Potions to 150-HP Greater Healing, 180-HP Jungle Juice after the mechanical bosses, and 200-HP Super Healing after the pillars. Lesser Healing is mentioned as an early fallback. Life Fruit should raise permanent health before being spent on Juice. This is a practical default; rare healing alternatives are intentionally omitted.
- Mage mana advances from 100 to 200, then 400 after the post-Plantera Dungeon. Super Mana uses the changed 1.4.5.7 Ectoplasm recipe. First Dungeon entries do not require their own rewards.
- Common combat buffs: Ironskin, Regeneration, Swiftness, Endurance; Lifeforce is included when Hallow fishing makes it renewable. Seafood Dinner is one repeatable food example, not a demand to use that specific meal.
- Wrath and Rage are labeled with their fishing biomes and may stack. Rage is omitted for summoners. Archery is explicitly limited to arrow weapons. Ale is optional and advertises its defense penalty.
- Weapon flasks require Queen Bee's Witch Doctor and Imbuing Station. Pre-Skeletron uses Fire; Wall of Flesh uses Poison. Hardmode offers Ichor/Cursed Flames; post-Plantera offers Venom, Ichor, or Nanites. Nanites is the sole Cultist recommendation because its 1.4.5.7 direct-damage multiplier works despite his debuff immunity. Only one flask at a time; whips apply flask effects, but minions do not. Nanites does not multiply minion damage. The Destroyer's immunity is called out.
- Sharpening Station can be found in Jungle cabins early, then purchased in Hardmode. Ammo Box (Arms Dealer) and Crystal Ball (Wizard) start in Hardmode. Summoners get the Bewitching Table after the first Dungeon visit and an optional War Table for sentries. Alchemy Flask is available after that visit via Shimmer and should be activated before drinking potions.
- Nearby arena buffs are separate from stations that are activated once. Campfire/Heart Lantern persist only within range; mage adds Star in a Bottle. Warmth, Obsidian Skin, and Heartreach are limited to relevant encounter pages.
- Warmth includes its 1.4.5.7 Chilled/Frozen duration reductions. All weapon flasks use their verified light-red rarity.
- Default durations do not include the Alchemy Flask's 20% extension. Food and weapon flask durations are not extended.

## Sources

Item previews link directly to their official wiki pages. Recipes/effects were checked against these pages and version changes against the installed game's `changelog.txt`:

- [Recovery potions](https://terraria.wiki.gg/wiki/Recovery_potions), [Jungle Juice](https://terraria.wiki.gg/wiki/Jungle_Juice), [Super Mana Potion](https://terraria.wiki.gg/wiki/Super_Mana_Potion), [Super Healing Potion](https://terraria.wiki.gg/wiki/Super_Healing_Potion).
- [Buff potions](https://terraria.wiki.gg/wiki/Buff_potions), [Archery Potion](https://terraria.wiki.gg/wiki/Archery_Potion), [Ammo Reservation Potion](https://terraria.wiki.gg/wiki/Ammo_Reservation_Potion), [Endurance Potion](https://terraria.wiki.gg/wiki/Endurance_Potion), [Ale](https://terraria.wiki.gg/wiki/Ale), [Seafood Dinner](https://terraria.wiki.gg/wiki/Seafood_Dinner).
- [Flasks](https://terraria.wiki.gg/wiki/Flasks), [Flask of Nanites](https://terraria.wiki.gg/wiki/Flask_of_Nanites), [Flask of Ichor](https://terraria.wiki.gg/wiki/Flask_of_Ichor), [Witch Doctor](https://terraria.wiki.gg/wiki/Witch_Doctor), [Wall of Flesh preparation](https://terraria.wiki.gg/wiki/Guide:Wall_of_Flesh_strategies).
- [Sharpening Station](https://terraria.wiki.gg/wiki/Sharpening_Station), [Arms Dealer](https://terraria.wiki.gg/wiki/Arms_Dealer), [Crystal Ball](https://terraria.wiki.gg/wiki/Crystal_Ball), [Bewitching Table](https://terraria.wiki.gg/wiki/Bewitching_Table), [War Table](https://terraria.wiki.gg/wiki/War_Table), [Alchemy Flask](https://terraria.wiki.gg/wiki/Alchemy_Flask).
- [Campfires](https://terraria.wiki.gg/wiki/Campfires), [Heart Lantern](https://terraria.wiki.gg/wiki/Heart_Lantern), [Star in a Bottle](https://terraria.wiki.gg/wiki/Star_in_a_Bottle), [Warmth Potion](https://terraria.wiki.gg/wiki/Warmth_Potion), [Heartreach Potion](https://terraria.wiki.gg/wiki/Heartreach_Potion).

## Checks

Run `node scripts/verify-preparation.mjs`, `node scripts/verify-acquisition.mjs`, `node scripts/verify-loadouts.mjs`, `node scripts/verify.mjs`, `npm run build`, and `npm run lint`. The preparation checks protect first-entry progression, class restrictions, unique recommendations, recipe batches, and sprite presence. They do not simulate fights or prove a DPS ranking.

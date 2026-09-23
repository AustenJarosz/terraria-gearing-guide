# Boss, event and checklist content

Current target: Desktop 1.4.5.7, Master Mode, ordinary worlds, neutral luck. The checklist includes 32 boss/event/exploration entries. Its order is a suggestion, not a strict set of unlocks. Dungeon visits remain checklist-only.

## Editing

- `src/data/checklist.js`: stable completion IDs, order, categories, and links to the smaller gearing roadmap.
- `src/data/checklistSpawns.js`: checklist-only spawn/access conditions. World-evil bosses have separate instructions; Dungeon entries use an Access label. Natural-spawn requirements are separate from summon-item requirements.
- `src/data/summonAcquisition.js`: structured summon recipes, enemy drop rates, vendor sources and short collection notes. Recipe groups such as Any Wood remain explicit in the ingredient list.
- `src/data/bossDrops.js`, `hardmodeDrops.js`, `prehardmodeOptional.js`: curated boss and later-event rewards. Every row states its bag/direct-drop method. Enemy groups and progression gates prevent mixing sources or unlocks.
- `src/data/checklistEvents.js`, `eventLoot.js`: early events and Blood Moon/Army tiers. Hardmode Blood Moons and Goblin Armies retain the earlier enemy rewards. Identical enemy pools share records.
- `src/data/dungeonDrops.js`, `dungeonChests.js`: Dungeon enemies and chest rewards, described further in [Dungeon content](DUNGEON_CONTENT.md).

Scope remains gear, useful supplies, progression materials and rare pets/mounts. Routine healing potions, currency, trophies, relics, vanity, dye and decorative furniture are omitted. Defender Medals are retained as gear-upgrade currency; important guaranteed items such as Demon Heart and Bone Glove remain.

## September 22 review

The review checked every data group and spawn entry, compared current boss pools and event/Dungeon rates with the Official Wiki, and checked the installed changelog against the 1.4.5.7 target. Notable corrections:

- Ordinary goblins drop Spiky Balls at 49.75%, in stacks of 1–5. They are consumable ranged weapons; Harpoon is also ranged. Hardmode now retains these drops alongside Warlock weapons.
- Eye of Cthulhu includes its missing Master pet, Suspicious Grinning Eye, and Unholy Arrows ×20–50. Pirate Invasion includes The Black Spot mount. Pets dropped directly from bosses are distinguished from bag rewards.
- Blood Moon includes The Bride/The Groom's Bloody Tear source. The 20% chance is per enemy killed.
- Martian loot includes common-enemy gear and the Scutlix Gunner's mount. The gunner must be killed while mounted. Those drops are separate from the Saucer's weapon pool.
- Tier 3 Dark Mage's Squire's Shield and Apprentice's Scarf are each 50% in Master; one accessory is guaranteed. The Ogre's tier 3 accessories remain 8.33% each. The checklist preserves the requested Dark Mage / Ogre / Betsy focus for tiers 1 / 2 / 3.
- Gold Chest generation, post-Plantera Biome Chest locks, Eclipse unlock gates, Frost Moon wave-dependent rates, and the newer Fishron/Plantera/Moon Lord weapon pools were rechecked. Cosmetic Prismatic Dye was removed from the curated Empress list.

## Sources

- [Treasure Bags](https://terraria.wiki.gg/wiki/Treasure_Bag), [King Slime](https://terraria.wiki.gg/wiki/King_Slime), [Queen Slime](https://terraria.wiki.gg/wiki/Queen_Slime), [Golem](https://terraria.wiki.gg/wiki/Golem), [Duke Fishron](https://terraria.wiki.gg/wiki/Duke_Fishron), [Moon Lord](https://terraria.wiki.gg/wiki/Moon_Lord).
- [Suspicious Grinning Eye](https://terraria.wiki.gg/wiki/Suspicious_Grinning_Eye), [Goblin Sorcerer](https://terraria.wiki.gg/wiki/Goblin_Sorcerer), [Goblin Army](https://terraria.wiki.gg/wiki/Goblin_Army), [Flying Dutchman](https://terraria.wiki.gg/wiki/Flying_Dutchman), [The Black Spot](https://terraria.wiki.gg/wiki/The_Black_Spot), [Bloody Tear](https://terraria.wiki.gg/wiki/Bloody_Tear).
- [Dark Mage](https://terraria.wiki.gg/wiki/Dark_Mage), [Squire's Shield](https://terraria.wiki.gg/wiki/Squire%27s_Shield), [Ogre](https://terraria.wiki.gg/wiki/Ogre), [Betsy](https://terraria.wiki.gg/wiki/Betsy).
- [Martian Saucer](https://terraria.wiki.gg/wiki/Martian_Saucer), [Laser Drill](https://terraria.wiki.gg/wiki/Laser_Drill), [Charged Blaster Cannon](https://terraria.wiki.gg/wiki/Charged_Blaster_Cannon), [Scutlix](https://terraria.wiki.gg/wiki/Scutlix), [Brain Scrambler mount](https://terraria.wiki.gg/wiki/Brain_Scrambler_%28item%29).
- [Solar Eclipse](https://terraria.wiki.gg/wiki/Solar_Eclipse), [Frost Moon](https://terraria.wiki.gg/wiki/Frost_Moon), [Ice Queen](https://terraria.wiki.gg/wiki/Ice_Queen), [Celestial Sigil](https://terraria.wiki.gg/wiki/Celestial_Sigil), [Gold Chest](https://terraria.wiki.gg/wiki/Gold_Chest), [Dungeon](https://terraria.wiki.gg/wiki/Dungeon).

Run `node scripts/verify-checklist.mjs`, `node scripts/verify.mjs`, and `node scripts/verify-acquisition.mjs` after edits. These check complete checklist access/loot coverage, filter visibility, source metadata, rates, progression gates, valid local images, and recipe icons. Data checks catch regressions; they do not prove every gameplay claim or strategy optimal.

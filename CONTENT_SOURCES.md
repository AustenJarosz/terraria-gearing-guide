# Content and image sources

Target: Terraria Desktop **1.4.5.7**, normal progression, no mods or special seeds.
Reviewed 2026-09-05. This is a selection of practical alternatives, not an exhaustive item list or DPS ranking. Accessories are alternatives, not a claim that every listed accessory fits simultaneously. Expert/Master drops remain explicitly identified.

## Sources

- Re-Logic's [1.4.5.7 announcement and changelog](https://store.steampowered.com/news/posts/?appids=105600&feed=steam_community_announcements).
- The installed game's `changelog.txt`, including the 1.4.5.7 section and the separate 1.4.5.8 section. Only 1.4.5.7 behavior is described in the guide.
- [Official Wiki class setups](https://terraria.wiki.gg/wiki/Guide:Class_setups) and individual item pages linked in the catalog. The live wiki can describe later versions; the 1.4.5.7 changelog takes precedence for patch-specific changes.
- [Whips](https://terraria.wiki.gg/wiki/Whips), [Constellation](https://terraria.wiki.gg/wiki/Constellation), [Wings list](https://terraria.wiki.gg/wiki/Wings/List), [Obsidian armor](https://terraria.wiki.gg/wiki/Obsidian_armor), [Wicked Armlet](https://terraria.wiki.gg/wiki/Wicked_Armlet), and [Spider Staff](https://terraria.wiki.gg/wiki/Spider_Staff) for relevant changes and progression gates.
- New starter recipes cross-checked against the [community 1.4.5.7 acquisition list](https://www.reddit.com/r/Terraria/comments/1vt8qkw/guide_to_obtaining_all_the_new_1457_items/).

## Review changes

Corrected acquisition errors for Hive-Five, Chain Gun, Desert Tiger Staff, Terraprisma, Venom Staff, Recon Scope, Mana Cloak and others. Corrected obsolete descriptions of Shadow armor, mana regeneration, whip-tag stacking and lunar armor requirements. Removed Charm of Myths before Hardmode and Leaf Wings before Plantera. Replaced early Flame Wings with Frozen Wings. Added flight alternatives to Hardmode lists.

Added relevant 1.4.5.7 starter weapons and whip accessories, Mana Regeneration Band and gem-robe guidance, the reworked Chlorophyte swords, and the lunar Constellation whip. The catalog intentionally uses qualitative descriptions instead of a complete numerical damage/defense table. Item rarity colors are decorative catalog metadata rather than a numerical stat reference.

## Roadmap expansion · 2026-09-07

The roadmap has 11 stops, including 8 in Hardmode. Event upgrades groups Solar Eclipse, Pumpkin Moon, Frost Moon, Martian Madness, and Old One’s Army tier 3/Betsy. Optional bosses groups Duke Fishron and nighttime Empress of Light. Each encounter expands within its group, preserving its instructions and rewards; Celestial Pillars remains a separate stop. The displayed order is an editorial suggestion for a first playthrough, not an unlock dependency. Fishron is available in Hardmode; Empress and the moons can be attempted after Plantera. Optional stops use first-clear Golem/Dungeon equipment and show encounter rewards separately. Earlier stages include preparation and onward-route guidance.

Progression references: [Golem](https://terraria.wiki.gg/wiki/Golem), [Solar Eclipse](https://terraria.wiki.gg/wiki/Solar_Eclipse), [Pumpkin Moon](https://terraria.wiki.gg/wiki/Pumpkin_Moon), [Frost Moon](https://terraria.wiki.gg/wiki/Frost_Moon), [Martian Madness](https://terraria.wiki.gg/wiki/Martian_Madness), [Duke Fishron](https://terraria.wiki.gg/wiki/Duke_Fishron), [Empress of Light](https://terraria.wiki.gg/wiki/Empress_of_Light), [Old One’s Army](https://terraria.wiki.gg/wiki/Old_One%27s_Army), and [Lunar Events](https://terraria.wiki.gg/wiki/Lunar_Events). Each stop links its source in the site. The live wiki describes newer patches too; this change concerns established progression gates, not revised numerical stats.

## Manual progression editing

### Item conditions and Master Mode loot

Crafting materials are included even when guaranteed. Optional `quantity` (the sixth `drop()` argument) displays a count or range beside the name; `note` states world restrictions. Eye of Cthulhu includes 30–90 Demonite Ore in Corruption worlds or 30–90 Crimtane Ore in Crimson worlds per bag, plus Binoculars at 1/30 (3.33%). References: [Eye bag contents](https://terraria.wiki.gg/wiki/Treasure_Bag_%28Betsy%29) and [Binoculars](https://terraria.wiki.gg/wiki/Binoculars). These rows describe normal worlds, not special-seed exceptions.

Loot presentation now uses one local sprite, item name, kind, and chance per row. The `drop(name, rate, kind, source, note)` helper in `bossDrops.js` derives the sprite filename from the wiki page name. Optional `dropNotes` entries explain shared rolls once beneath the list. Routine guaranteed rewards are omitted; standout build accessories may remain. Skeletron's Book of Skulls and Hand use the bag's one-in-three roll; its Possessed Skull pet has a separate 25% boss roll. References: [Skeletron bag contents](https://terraria.wiki.gg/wiki/Treasure_Bag_%28Wall_of_Flesh%29), [Book of Skulls](https://terraria.wiki.gg/wiki/Book_of_Skulls), and [Possessed Skull](https://terraria.wiki.gg/wiki/Possessed_Skull). New loot sprites are exported from the installed game with the same manifest workflow as the other items.

`src/data/itemNotes.js` stores visible conditions beneath item cards. Add an item ID with an array of `{ label, text }` notes. Use “Requires” for a genuine requirement, “Use with” for a pairing, and “Keep in mind” for a limitation. A particular loadout in `gear.js` or `roadmap.js` can override the defaults with `itemNotes: { magicQuiver: [{ label: 'Use with', text: 'Your advice here.' }] }`. An empty array hides the default note for that loadout. Notes appear without requiring hover or a click.

`src/data/bossDrops.js` stores the expandable Master Mode loot panels, keyed by stage ID or individual optional encounter ID. Each row has `name`, `rate`, `context`, and an Official Wiki `source` page. State whether the rate is per Treasure Bag or a direct drop, and include conditions. These are selected rewards, not complete loot tables; unreviewed encounters link to their source without invented percentages. Event wave-dependent rates must retain their conditions.

Initial loot references: [Wall of Flesh loot](https://terraria.wiki.gg/wiki/Guide:Wall_of_Flesh_strategies), [Shield of Cthulhu](https://terraria.wiki.gg/wiki/Shield_of_Cthulhu), [Plantera](https://terraria.wiki.gg/wiki/Plantera), [Spore Sac](https://terraria.wiki.gg/wiki/Spore_Sac), [Shiny Stone](https://terraria.wiki.gg/wiki/Shiny_Stone), [Kaleidoscope](https://terraria.wiki.gg/wiki/Kaleidoscope), and [Soaring Insignia](https://terraria.wiki.gg/wiki/Soaring_Insignia). Pairing notes use the corresponding item pages and [Shroomite armor](https://terraria.wiki.gg/wiki/Shroomite_armor). Boss availability and summon instructions are retained in data but are no longer displayed.

The guide is data-driven. Most boss and event text can be changed without touching the React components:

- Edit `src/data/roadmap.js` → `mainRouteDetails` for the main route (`pre-boss` through `pre-moon-lord`). Each entry contains `unlock`, `summon`, `prepare`, `payoff`, and `source`.
- Edit `src/data/roadmap.js` → `sideEncounters` for individual optional bosses and events. The `rewards` object controls the class-specific reward cards shown when an encounter is expanded.
- Edit `src/data/gear.js` → `coreLoadouts` for the four class kits at each main-route stop. `src/data/roadmap.js` → `kits` and `sideLoadouts` control the shared first-clear kits for optional stops.
- Edit `src/data/gear.js` → `routeStages`, plus `sideStages` and `pillarStage` in `roadmap.js`, to change the visible stop order and grouping.
- Edit `src/data/bossArt.js` only when changing which portrait is shown; it does not change progression or recommendations.

After changing data, run `npm run lint`, `node scripts/verify.mjs`, and `npm run build`. The verifier catches invalid item IDs, duplicate loadouts, broken stage references, and missing boss art. Keep recommendations as alternatives: Master Mode has seven available accessory slots after the Demon Heart, but a loadout should still offer a practical pool rather than imply that every listed item is equipped at once.

## Sprite provenance

Boss portraits in `public/bosses` are decoded from the installed game's `NPC_Head_Boss_*.xnb` textures with `node scripts/export-bosses.mjs`. The [Official Wiki NPC head ID reference](https://terraria.wiki.gg/zh/wiki/NPC_Head_IDs) identifies these textures. They are decorative portraits for the selected encounter, with grouped portraits for multi-boss stops. Artwork remains credited to Re-Logic.

The PNGs in `public/items` were decoded from the user's installed Terraria item textures (installed version 1.4.5.8). Its changelog lists no item-sprite changes relative to 1.4.5.7. They are local assets; there is no runtime wiki image dependency. Terraria artwork belongs to Re-Logic, credited in the page footer.

`node scripts/export-sprites.mjs [Terraria installation directory]` reproduces the images using the checked-in item-ID manifest. The game installation is needed only to regenerate images, not to build or run this site. XNB decoding is a development dependency, not part of the browser bundle.

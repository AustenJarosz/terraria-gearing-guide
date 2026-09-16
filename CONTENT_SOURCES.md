# Content and image sources

## Event checklist expansion

The checklist includes regular-world combat events, separate early/Hardmode Blood Moons and Goblin Armies, all three Old One’s Army tiers, and optional weather, peaceful and seasonal experiences. Special-seed-only rain variants are outside this guide’s normal-world scope. Existing detailed event loot is reused; newly listed events use concise reward summaries and direct wiki links, without unverified drop percentages.

Sources: [Events](https://terraria.wiki.gg/wiki/Events), [Blood Moon](https://terraria.wiki.gg/wiki/Blood_Moon), [Goblin Army](https://terraria.wiki.gg/wiki/Goblin_Army), [Old One’s Army](https://terraria.wiki.gg/wiki/Old_One%27s_Army), [Frost Moon](https://terraria.wiki.gg/wiki/Frost_Moon), [Christmas](https://terraria.wiki.gg/wiki/Christmas). Reviewed September 15, 2026.

## Checklist loot additions — September 15, 2026

- [Treasure Bags](https://terraria.wiki.gg/wiki/Treasure_Bag): Eater of Worlds and Brain of Cthulhu Master bag material ranges, accessories and 5% pets. Extra segment/Creeper materials are excluded from bag quantities.
- [Eater of Worlds](https://terraria.wiki.gg/wiki/Eater_of_Worlds), [Brain of Cthulhu](https://terraria.wiki.gg/wiki/Brain_of_Cthulhu) and [Queen Slime](https://terraria.wiki.gg/wiki/Queen_Slime): Master pet chances and Queen Slime equipment. Two distinct Crystal Assassin pieces per bag (2/3 each).
- Added item sprites exported from the installed game using its ItemID constants. Evil boss loot is filtered by boss; Queen Slime remains separate from mechanical bosses.

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

Useful guaranteed equipment and progression rewards are included: [Bone Glove](https://terraria.wiki.gg/wiki/Bone_Glove) from Skeletron, and [Demon Heart](https://terraria.wiki.gg/wiki/Demon_Heart) and [Pwnhammer](https://terraria.wiki.gg/wiki/Pwnhammer) from Wall of Flesh. Each is 100% in the corresponding Master Mode bag; Demon Heart is conditional on not having consumed one already. Routine currency, potions, trophies and relics remain omitted.

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

## Hardmode loot review · 2026-09-13

`src/data/hardmodeDrops.js` contains loot for every Hardmode boss and event stop, with separate boss filters for shared loot lists. Queen Slime and mechanical cart components are omitted from the mechanical-boss stop. Edit a row as `[name, chance, type, quantity, condition]`; quantity and condition are optional. `bag()` and `kill()` label the reward's origin, and `hardmodeDropNotes` holds explanations shared by a whole encounter. These rows are merged into `bossDrops.js`. Useful guaranteed equipment, progression materials, ammunition bundled with weapons, pets and mounts are included; routine coins, potions, trophies, relics and vanity masks remain omitted.

Rates describe Master Mode at neutral luck, with event wave ranges and special conditions stated explicitly. Old One's Army rows use tier 3. Main sources: [Treasure Bags](https://terraria.wiki.gg/wiki/Treasure_Bag), [Queen Slime](https://terraria.wiki.gg/wiki/Queen_Slime), [Golem](https://terraria.wiki.gg/wiki/Golem), [Duke Fishron](https://terraria.wiki.gg/wiki/Duke_Fishron), [Possession](https://terraria.wiki.gg/wiki/Possession), [Celestial Towers](https://terraria.wiki.gg/wiki/Celestial_Tower), [Mourning Wood](https://terraria.wiki.gg/wiki/Mourning_Wood), [Pumpking](https://terraria.wiki.gg/wiki/Pumpking), [Everscream](https://terraria.wiki.gg/wiki/Everscream), [Santa-NK1](https://terraria.wiki.gg/wiki/Santa-NK1), [Ice Queen](https://terraria.wiki.gg/wiki/Ice_Queen), [Martian Saucer](https://terraria.wiki.gg/wiki/Martian_Saucer), [Dark Mage](https://terraria.wiki.gg/wiki/Dark_Mage), [Ogre](https://terraria.wiki.gg/wiki/Ogre), and [Solar Eclipse](https://terraria.wiki.gg/wiki/Solar_Eclipse). Each item also links to its own Wiki page in the interface. Newer 1.4.5 rewards are included, such as Mobius Strip, Arc Surge, and Possession; the installed changelog was checked against the 1.4.5.7 target.

The verifier requires loot for every Hardmode encounter, validates chances and conditional ranges, and checks every loot sprite. Add any new sprite to `scripts/sprite-manifest.json` using its Terraria item ID, then regenerate it with the sprite export script.

## Sprite provenance

Boss portraits in `public/bosses` are decoded from the installed game's `NPC_Head_Boss_*.xnb` textures with `node scripts/export-bosses.mjs`. The [Official Wiki NPC head ID reference](https://terraria.wiki.gg/zh/wiki/NPC_Head_IDs) identifies these textures. They are decorative portraits for the selected encounter, with grouped portraits for multi-boss stops. Artwork remains credited to Re-Logic.

The PNGs in `public/items` were decoded from the user's installed Terraria item textures (installed version 1.4.5.8). Its changelog lists no item-sprite changes relative to 1.4.5.7. They are local assets; there is no runtime wiki image dependency. Terraria artwork belongs to Re-Logic, credited in the page footer.

`node scripts/export-sprites.mjs [Terraria installation directory]` reproduces the images using the checked-in item-ID manifest. The game installation is needed only to regenerate images, not to build or run this site. XNB decoding is a development dependency, not part of the browser bundle.

## Dungeon visits · 2026-09-13

Two exploration stops now sit after Skeletron and after Plantera. Edit their copy and class reward selections in `src/data/dungeon.js`. Entry kits reuse the pre-Skeletron and pre-Plantera pools respectively, keeping the visit's rewards separate. Dungeon rewards are curated item cards with acquisition notes, not percentage loot tables. The [Official Wiki Dungeon reference](https://terraria.wiki.gg/wiki/Dungeon) was checked for access, biome-chest restrictions, Ectoplasm, and wall-dependent enemy pools.

Selecting either visit applies the Dungeon environment tokens independently of the equipment class. Leaving restores the selected class theme. The illustration is used as a fixed background, an in-page scene, and a thumbnail on both roadmap buttons.

### Dungeon illustration provenance

Current balanced Paladin version: `public/images/dungeon-awakened-guard.png`, edited using built-in imagegen. Final prompt:

> Edit the provided dungeon scene. Replace the tiny hard-to-see hammer-and-shield Paladin on the right of the arch with a clearly noticeable medium-size Paladin closer to the viewer on the right side. He should occupy about 45 percent of image height, full body from x=72% to x=90%, head around y=40%, feet around y=88%. Readable closed bucket helmet, broad battered rectangular shield, heavy square hammer, realistic sturdy proportions. Weathered matte gray steel with subtle tarnished bronze details, restrained pale teal edge lighting and visible midtone armor planes. Clearly distinct from the dark wall, but no bright gold, no glowing armor, no exaggerated cartoon proportions, no giant foreground hero. Match the gritty pixel-art-inspired environment. Preserve the rest of the image exactly: central spirits and enemies, damaged arch, left-hand area for text, composition and colors. No text or watermark.

Revised current artwork: `public/images/dungeon-awakened-shadow.png`, built-in imagegen edit with the original awakened scene as reference. This replaces the oversized foreground Paladin. Final prompt:

> Edit this image very subtly. Add one ominous Paladin guard in the middle distance on the right beside the broken doorway, only about 28% of image height. Weathered dark iron armor, simple closed helmet, battered rectangular shield and heavy square hammer. Natural human proportions, understated tarnished metal, nearly lost in shadow with a faint turquoise rim light. The guard must look embedded in the same gritty atmospheric dungeon painting, NOT a bright cartoon character or foreground hero, no oversized shoulders, no shiny gold trim, no thick outlines. Match the exact existing texture, low contrast and level of detail of the distant figures. Preserve all other scene elements, palette, ghosts, composition and wide dimensions. No text.

Current post-Plantera artwork: `public/images/dungeon-awakened-paladin.png`, edited with built-in imagegen. Final prompt:

> Edit this awakened Terraria dungeon illustration: add a prominent Terraria Paladin standing on the RIGHT side in the foreground, taking up about the rightmost quarter and 60% of image height. Recognizable stout massive knight with closed silver-gray bucket helmet, broad silver plate armor, gold accents, large rectangular gold-edged shield and heavy square-headed hammer (not a sword). Face turned slightly toward the viewer and center, imposing guard pose. Match existing pixel-art-inspired painting texture and turquoise spectral rim lighting. Preserve the existing central ruined arch, ghosts, distant enemies, left side dark area for website text, wide landscape size and composition. Only add the Paladin and necessary local occlusion/shadows on right; keep other scene elements unchanged. No text, no logos.

Post-Plantera variant: `public/images/dungeon-awakened.png`, made with the built-in imagegen tool using the first-descent scene as an edit reference. Its stage `art` property controls the roadmap thumbnail, card background, feature scene, and world background independently. Final prompt:

> Create an awakened post-Plantera variant of this Terraria-inspired dungeon illustration. Preserve the wide landscape composition, same recognizable central arched corridor, pixel-art-inspired painting style, and dark readable space at lower left for website text. Make the transformation unmistakable: shattered arch stones, broken iron gates, luminous turquoise ectoplasmic spirits spiraling out of the central doorway, and two threatening skeletal armored silhouettes emerging deeper inside. Strong spectral green-blue light from within outlines the wrecked masonry; cold violet shadows at the edges. This is the much more dangerous return to the same place, dramatic and haunted rather than quiet. Keep detailed dungeon architecture, chains, bones, skull banners. No text, no UI, no watermark. Not just a recolor: visibly change the doorway damage, enemies and spectral activity.

Saved asset: `public/images/dungeon-depths.png`. Created with the built-in imagegen tool; original illustration, not an extracted Terraria screenshot. Final prompt:

> Use case: stylized-concept. Asset type: wide background illustration for a Terraria dungeon guide website. Create a dark scary underground dungeon interior inspired by Terraria: ancient blue-gray brick corridors, deep arched doorway descending into darkness, rusty iron bars, hanging chains, scattered old bones, sparse cold cyan candlelight, faint ectoplasmic mist. Rich atmospheric pixel-art-inspired game concept painting with readable blocky stone textures, not a screenshot or UI. Wide landscape composition, ominous doorway centered, interesting masonry and candles near outer edges, spacious dark center so website panels can overlay it. Moody near-black slate, desaturated teal, aged ivory; restrained lighting, no bright spotlight, no people, no text, no logos, no watermark. Make this feel like a special dangerous place to explore.
# Dungeon enemy loot (September 2026)

Edit `src/data/dungeonDrops.js` to change enemy filters, Master Mode rates, quantities, or item notes. `src/DungeonLoot.jsx` renders the lists for both visits. Pre-Plantera enemies retain their original loot in the post-Plantera returning-enemy group. Identical cosmetic/combat variants share a filter. No chest loot, generic biome-wide drops, coins, food, banners, or decoration-only items are included in these enemy tables. Dungeon Guardian is outside these post-Skeletron visits.

Rates checked against the current Desktop Official Wiki enemy/item tables (Expert rates also apply in Master), rounded as displayed there; base rates exclude player luck. Ectoplasm's 100% is per Dungeon Spirit, not per preceding kill. Sprite IDs verified from the installed game's ItemID constants and exported using `scripts/export-sprites.mjs`.

- [Angry Bones](https://terraria.wiki.gg/wiki/Angry_Bones), [Dark Caster](https://terraria.wiki.gg/wiki/Dark_Caster), [Librarian Skeleton](https://terraria.wiki.gg/wiki/Librarian_Skeleton), [Cursed Skull](https://terraria.wiki.gg/wiki/Cursed_Skull), [Dungeon Slime](https://terraria.wiki.gg/wiki/Dungeon_Slime), [Water Bolt Mimic](https://terraria.wiki.gg/wiki/Water_Bolt_Mimic).
- [Blue Armored Bones](https://terraria.wiki.gg/wiki/Blue_Armored_Bones), [Rusty Armored Bones](https://terraria.wiki.gg/wiki/Rusty_Armored_Bones), [Hell Armored Bones](https://terraria.wiki.gg/wiki/Hell_Armored_Bones), [Wisp in a Bottle](https://terraria.wiki.gg/wiki/Wisp_in_a_Bottle), [Bone Feather](https://terraria.wiki.gg/wiki/Bone_Feather).
- [Paladin](https://terraria.wiki.gg/wiki/Paladin), [Tabi](https://terraria.wiki.gg/wiki/Tabi), [Black Belt](https://terraria.wiki.gg/wiki/Black_Belt), [Skeleton Sniper](https://terraria.wiki.gg/wiki/Skeleton_Sniper), [Tactical Skeleton](https://terraria.wiki.gg/wiki/Tactical_Skeleton), [Skeleton Commando](https://terraria.wiki.gg/wiki/Skeleton_Commando).
- [Shadowbeam Staff](https://terraria.wiki.gg/wiki/Shadowbeam_Staff), [Ragged Caster](https://terraria.wiki.gg/wiki/Ragged_Caster), [Inferno Fork](https://terraria.wiki.gg/wiki/Inferno_Fork), [Giant Cursed Skull](https://terraria.wiki.gg/wiki/Giant_Cursed_Skull), [Dungeon Spirit](https://terraria.wiki.gg/wiki/Dungeon_Spirit).
# Pre-Hardmode optional bosses

`src/data/prehardmodeOptional.js` defines King Slime, Queen Bee and Deerclops, their grouped roadmap stop and curated Master loot. One stop appears before Skeletron; King Slime can be attempted earlier. Shared equipment excludes Queen Bee rewards. Hardmode groups retain their own encounters and equipment.

Sources: [King Slime](https://terraria.wiki.gg/wiki/King_Slime), [Treasure Bags](https://terraria.wiki.gg/wiki/Treasure_Bag), [Queen Bee](https://terraria.wiki.gg/wiki/Queen_Bee), [Deerclops](https://terraria.wiki.gg/wiki/Deerclops). Rates are per bag except explicitly marked direct Master pet drops. Queen Bee gives one weapon, Beenades ×10–29 and Bee Wax ×17–29 per bag. King Slime's 1.4.5 Slime Staff drop is included. Decoration-only and vanity items (including Dizzy's Rare Gecko Chester) are omitted. Local sprites are exported from the installed game.
# Checklist sprite audit

## Blood Moon and Old One's Army loot review — 2026-09-15

`src/data/eventLoot.js` contains curated Master Mode Blood Moon loot, grouped by enemy, and the tier 1 Dark Mage / tier 2 Ogre rewards. Hardmode retains the early Blood Moon groups. The checklist's tier 3 entry filters the shared Army loot to Betsy; the gearing roadmap retains all tier 3 enemies. Vanity, banners, trophies and relics remain excluded; useful guaranteed drops such as War Table and Sanguine Staff remain included. Rates apply to regular worlds and naturally spawned enemies.

Sources: [Blood Zombie](https://terraria.wiki.gg/wiki/Blood_Zombie), [Drippler](https://terraria.wiki.gg/wiki/Drippler), [Bloody Tear](https://terraria.wiki.gg/wiki/Bloody_Tear), [Clown](https://terraria.wiki.gg/wiki/Clown), [Trifold Map](https://terraria.wiki.gg/wiki/Trifold_Map), [Zombie Merman](https://terraria.wiki.gg/wiki/Zombie_Merman), [Hemogoblin Shark](https://terraria.wiki.gg/wiki/Hemogoblin_Shark), [Blood Eel](https://terraria.wiki.gg/wiki/Blood_Eel), [Dreadnautilus](https://terraria.wiki.gg/wiki/Dreadnautilus), [Chum Bucket](https://terraria.wiki.gg/wiki/Chum_Bucket), [Dark Mage](https://terraria.wiki.gg/wiki/Dark_Mage), [Ogre](https://terraria.wiki.gg/wiki/Ogre), [Old One's Army](https://terraria.wiki.gg/wiki/Old_One%27s_Army).

Corrected Dark Mage's Tome to a mount, added missing Ogre weapons and sentry accessories, and excluded Ogre's Club from tier 2 (it is tier 3 only). Corrected the roadmap's tier 3 Dark Mage sentry accessory rates to 8.33%. New sprites use installed game Item IDs.

Compared the sprite manifest to the installed game's `Terraria.ID.ItemID` constants, including review of internal-name aliases. Laser Rifle incorrectly used Clockwork Assault Rifle ID 434; corrected to 514 and re-exported. Constellation remains 5479 (`ConstellationWhip`), not the unrelated internal constant `Constellation` at 5238.

Checked boss-head mapping against [NPC Head IDs](https://terraria.wiki.gg/zh/wiki/NPC_Head_IDs?variant=zh-mo). Checklist now uses Eater of Worlds 2, Brain of Cthulhu 23, Queen Slime 38, Retinazer 15 + Spazmatism 20 for Twins, and Skeletron Prime 18. Shared `bossArt` entries drive the corrected checklist images and export/verification scripts. Laser Rifle also verified against the [Official Wiki weapon table](https://terraria.wiki.gg/wiki/List_of_magic_weapons).

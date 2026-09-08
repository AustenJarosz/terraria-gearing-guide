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

## Sprite provenance

Boss portraits in `public/bosses` are decoded from the installed game's `NPC_Head_Boss_*.xnb` textures with `node scripts/export-bosses.mjs`. The [Official Wiki NPC head ID reference](https://terraria.wiki.gg/zh/wiki/NPC_Head_IDs) identifies these textures. They are decorative portraits for the selected encounter, with grouped portraits for multi-boss stops. Artwork remains credited to Re-Logic.

The PNGs in `public/items` were decoded from the user's installed Terraria item textures (installed version 1.4.5.8). Its changelog lists no item-sprite changes relative to 1.4.5.7. They are local assets; there is no runtime wiki image dependency. Terraria artwork belongs to Re-Logic, credited in the page footer.

`node scripts/export-sprites.mjs [Terraria installation directory]` reproduces the images using the checked-in item-ID manifest. The game installation is needed only to regenerate images, not to build or run this site. XNB decoding is a development dependency, not part of the browser bundle.

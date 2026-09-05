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

## Sprites

The PNGs in `public/items` were decoded from the user's installed Terraria item textures (installed version 1.4.5.8). Its changelog lists no item-sprite changes relative to 1.4.5.7. They are local assets; there is no runtime wiki image dependency. Terraria artwork belongs to Re-Logic, credited in the page footer.

`node scripts/export-sprites.mjs [Terraria installation directory]` reproduces the images using the checked-in item-ID manifest. The game installation is needed only to regenerate images, not to build or run this site. XNB decoding is a development dependency, not part of the browser bundle.

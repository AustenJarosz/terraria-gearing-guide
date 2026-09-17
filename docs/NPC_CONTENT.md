# NPC guide content

Edit `src/data/npcs.js` to change recruitment or shop entries. The `stock(stage, 'Item|Item', condition)` helper creates one group; stage numbers index `npcStages`. The renderer combines groups by stage, then displays any additional requirements per item. Stage 0 means on recruitment, not before Hardmode for every NPC. Inventory-possession unlocks stay at stage 0 and explicitly name the required item, even when that item normally comes much later.

Scope: standard Desktop 1.4.5 worlds, gear and useful supplies. 26 permanent/seasonal town NPCs plus Traveling Merchant and Skeleton Merchant. Old Man is represented by the Clothier recruitment; pets and slimes do not have shops. Vanity, decorative furniture, paintings and most cosmetic stock are intentionally excluded. Service NPCs are included without presenting rewards or death drops as purchases. Shared biome pylons are explained once above the list. Prices are omitted except where Defender Medals and the changing Eternia Crystal price are useful.

Checked September 16, 2026 against the current Official Terraria Wiki pages, linked from every NPC entry (`https://terraria.wiki.gg/wiki/<NPC_name>#Items_sold`). Item links lead to the corresponding wiki entry.

Important sources and version-sensitive checks:

- [NPCs](https://terraria.wiki.gg/wiki/NPCs): 1.4.5 homeless arrivals and housing.
- [Dye Trader](https://terraria.wiki.gg/wiki/Dye_Trader), [Painter](https://terraria.wiki.gg/wiki/Painter), [Party Girl](https://terraria.wiki.gg/wiki/Party_Girl): current population requirements, including town pets.
- [Witch Doctor](https://terraria.wiki.gg/wiki/Witch_Doctor): Pygmy Necklace at night; Leaf Wings after Plantera, in Jungle at night; Hercules Beetle in Jungle after Plantera; Tiki armor no longer requires carrying a Pygmy Staff.
- [Mechanic](https://terraria.wiki.gg/wiki/Mechanic): pre-Hardmode Teleporter; Spectre Goggles in Graveyard.
- [Tavernkeep](https://terraria.wiki.gg/wiki/Tavernkeep): rods on recruitment, canes/tier-two armor after one mechanical boss, staves/tier-three armor after Golem. Defender Medal prices are per piece.
- [Dryad](https://terraria.wiki.gg/wiki/Dryad): current planter boxes available on recruitment; opposite-evil seeds in Hardmode Graveyards.
- [Traveling Merchant](https://terraria.wiki.gg/wiki/Traveling_Merchant), [Revolver](https://terraria.wiki.gg/wiki/Revolver), [Gray Zapinator](https://terraria.wiki.gg/wiki/Gray_Zapinator), [Code 1](https://terraria.wiki.gg/wiki/Code_1), [Code 2](https://terraria.wiki.gg/wiki/Code_2), [Fishing poles](https://terraria.wiki.gg/wiki/Fishing_poles): random inventories and separate progression requirements. Celestial Magnet is no longer sold by this NPC.
- [Skeleton Merchant](https://terraria.wiki.gg/wiki/Skeleton_Merchant): moon-phase rotation, Magic String after a mechanical boss, roller skate stock.
- [Steampunker](https://terraria.wiki.gg/wiki/Steampunker), [Cyborg](https://terraria.wiki.gg/wiki/Cyborg): solution biomes/events, post-Golem wings, post-Martian cluster rockets.

Sprites are extracted from the user's installed Terraria game. `scripts/export-npc-sprites.mjs` uses the committed sprite manifest plus an optional local ItemID reflection export when adding new items. The app never needs the installation or temporary export at runtime. NPC head IDs were checked against the installed game's `Terraria.ID.NPCHeadID` constants.

Validation: `node scripts/verify-npcs.mjs`, `npm run build`, `npm run lint`. Check desktop and narrow viewport layouts, item search, recruitment filter, details keyboard interaction, wiki links, and persistence of the selected main view.

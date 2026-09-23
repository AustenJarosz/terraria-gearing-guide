# Fishing guide

The fourth main view is `src/FishingGuide.jsx`. Edit the milestones, useful random rewards and upgrade ingredients in `src/data/fishing.js`. This is a focused Angler rewards guide for standard Desktop 1.4.5.7, not a complete fishing loot catalogue.

The optional counter records completed turn-ins manually under `terraria-guide-fishing-quests` in localStorage. It has no connection to Terraria save files, boss completion or NPC recruitment. It is one local count; users are told to adjust it when changing characters. Reached milestone styling means the entered quest count has passed the milestone, not that an item is in the user's inventory.

Checked September 16, 2026:

- [Angler](https://terraria.wiki.gg/wiki/Angler#Quest_rewards): fixed rewards at quests 5, 10, 15, 20, 25 and 30; random rewards and conditions; 4:30 AM quest reset; completed count belongs to the character.
- [Bottomless buckets](https://terraria.wiki.gg/wiki/Bottomless_Buckets): Bottomless Water Bucket is guaranteed on quest 25, available before Hardmode, and can also be rolled earlier.
- [Angler armor](https://terraria.wiki.gg/wiki/Angler_armor): each piece adds 5 fishing power.
- [Fishing poles](https://terraria.wiki.gg/wiki/Fishing_poles): Golden Fishing Rod has 50% fishing power; Hotline Fishing Hook has 45%, requires Hardmode and more than 25 completed quests, and remains random.
- [Fishing](https://terraria.wiki.gg/wiki/Fishing): 300-tile water / 200-tile honey targets and lava fishing requirements.
- [Angler Tackle Bag](https://terraria.wiki.gg/wiki/Angler_Tackle_Bag), [Fish Finder](https://terraria.wiki.gg/wiki/Fish_Finder): three-ingredient combinations at Tinkerer's Workshop.
- [High Test Fishing Line](https://terraria.wiki.gg/wiki/High_Test_Fishing_Line): Shimmer interchangeability of the fishing accessory trio.
- [Fishing Bobbers](https://terraria.wiki.gg/wiki/Fishing_Bobbers): +10 fishing power.

Percentages are unmodified base roll chances, conditional on reaching that roll after earlier main rewards failed, not absolute chances per turn-in. They do not update with the manual quest counter. Golden Bug Net is 1/80; Sponge and Fin Wings are 1/70; Hotline Fishing Hook is 1/100. Milestones are 100% on their specific turn-ins.

The current [accessory reward calculation](https://terraria.wiki.gg/wiki/Angler#Accessory_rewards) combines three virtual 1/40 rolls, three 1/30 rolls and one 1/25 roll, then multiplies the combined success chance by 0.8. At multiplier 1 this is 15.7008404% for the shared pool; division by seven eligible items gives 2.2429772% each. Do not label the virtual 2.5%, 3.33% and 4% values as the individual accessory chances: the selection from eligible accessories is uniform. Ownership changes that selection, not the shared-roll success probability. Upgrades, portable storage and all loadout/social slots count; ordinary chests do not. All seven return to the pool once all are owned.

The expanded UI explanation covers quest-count improvement (capped at 150), happiness, ownership, and reward priority. Luck does not affect these rewards. It deliberately avoids predicting absolute odds without world state, quest fish, happiness, accessory inventory and prior-roll eligibility.

Local sprites come from the installed game's ItemID constants and XNB assets, exported with `scripts/export-fishing-sprites.mjs`. Runtime needs only committed PNGs. Validate with `node scripts/verify-fishing.mjs`, build/lint, and browser checks for counter updates, reload persistence, keyboard access, and narrow layouts.

September 22, 2026 audit: rechecked the complete milestone/random-reward list against [Angler main rewards](https://terraria.wiki.gg/wiki/Angler#Main_rewards) and the accessory calculation. Added the useful Fish Hook and Minecarp rewards (each 1/60 conditional base chance) and local inventory sprites. Clarified that Sponge and Fin Wings first become eligible on quest 11, while Hotline first becomes eligible on quest 26 and also requires Hardmode. Bottomless Water Bucket can roll from quest 11 at 1/70; repeat Golden Fishing Rods can roll from quest 76 at 1/250. These remain subject to earlier reward rolls and milestone priority. The existing seven-accessory pool calculation was correct; the explanatory percentages now read from that same data instead of separate hard-coded values.

Regression checks cover first-eligible quests, Hardmode flags, reward uniqueness, fixed/random separation, all seven equal accessory shares and every local sprite. The counter remains a user-entered estimate and does not change displayed base chances.

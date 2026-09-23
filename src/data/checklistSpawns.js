// Checklist-only instructions for standard worlds; secret seeds can change conditions.
// Sources are the corresponding Official Terraria Wiki pages, checked September 22, 2026.
const entry = (source, summon, conditions, natural, icon) => ({ source, summon, conditions, natural, icon })
const blood = entry('Blood_Moon', 'Use a Bloody Tear at night.', 'Night: 7:30 PM–4:30 AM. Fishing during the event can summon its fishing enemies.', 'Can begin at dusk when a player has more than 120 maximum health and the moon is not new.', 'Bloody_Tear.png')
const goblin = entry('Goblin_Army', 'Use a Goblin Battle Standard.', 'At least one player needs 200 maximum health; another invasion cannot be active.', 'Can begin at dawn after a Shadow Orb or Crimson Heart has been broken, with the same health requirement.', 'Goblin_Battle_Standard.png')
const army = tier => entry("Old_One%27s_Army", 'Buy an Eternia Crystal and an Eternia Crystal Stand from the Tavernkeep; interact with the stand to insert the crystal.', `${tier} Use a flat, solid arena with at least 61 tiles on each side of the stand’s center and 10 tiles of headroom.`, undefined, 'Eternia_Crystal.png')
const mechanical = (source, item) => entry(source, `Use a ${item} at night.`, 'Night: 7:30 PM–4:30 AM. Summon items are normally obtained in Hardmode.', 'After an altar is destroyed in Hardmode, an undefeated mechanical boss can be selected to appear at night. Stay above ground for the natural spawn.')

export const checklistSpawns = {
  'blood-moon-early': blood,
  'blood-moon-hardmode': { ...blood, conditions: `${blood.conditions} Hardmode adds Clowns and stronger fishing enemies.` },
  'king-slime': entry('King_Slime', 'Use a Slime Crown in any biome.', 'Any time of day; no boss defeat required.', 'Also appears after 150 Slime Rain kills (75 after a previous victory), or rarely on grassy surfaces in the outer sixths of the world during daytime.'),
  'pre-boss': entry('Eye_of_Cthulhu', 'Use a Suspicious Looking Eye at night.', 'Night: 7:30 PM–4:30 AM; it leaves at dawn.', 'Can appear before its first defeat with 200 maximum health, 11 defense, and four town NPCs present. Stay above ground.'),
  'evil-boss': {
    variants: [
      { name: 'Eater of Worlds · Corruption', ...entry('Eater_of_Worlds', 'Use Worm Food, or break every third Shadow Orb.', 'In the Corruption, at any time. Remain in the biome during the fight.') },
      { name: 'Brain of Cthulhu · Crimson', ...entry('Brain_of_Cthulhu', 'Use a Bloody Spine, or break every third Crimson Heart.', 'In the Crimson, at any time. Remain in the biome during the fight.') },
    ],
  },
  'goblin-army-early': goblin,
  'goblin-army-hardmode': { ...goblin, conditions: `${goblin.conditions} Hardmode adds Goblin Warlocks; no new summon item is needed.` },
  'old-ones-army-1': army('Tier 1: after Eater of Worlds or Brain of Cthulhu, before any mechanical boss. Find the Tavernkeep after defeating the evil-biome boss.'),
  'old-ones-army-2': army('Tier 2: after any mechanical boss, before Golem. The tier changes automatically.'),
  'old-ones-army': army('Tier 3: after Golem. The tier changes automatically; Betsy arrives on wave 7.'),
  'queen-bee': entry('Queen_Bee', 'Break a Larva inside a Jungle hive, or use an Abeemination in the Jungle.', 'Any time. Fight in the Underground Jungle to avoid her enraged behavior.'),
  deerclops: entry('Deerclops', 'Use a Deer Thing in the Snow or Ice biome.', 'Any time when using the item; no prior boss defeat required.', 'Can appear at midnight during a surface Snow blizzard with 200 maximum health or 9 defense, away from town NPCs and without conflicting bosses or invasions.'),
  'pre-skeletron': entry('Skeletron', 'Speak to the Old Man at the Dungeon entrance at night and choose “Curse”.', 'Night: 7:30 PM–4:30 AM. For another fight, equip a Clothier Voodoo Doll and kill the Clothier at night.'),
  'dungeon-pre-plantera': { ...entry('Dungeon', 'Defeat Skeletron, then enter the Dungeon.', 'Any time. Golden Keys unlock its Gold Chests; Biome Chests remain locked until Plantera is defeated.'), actionLabel: 'Access' },
  'pre-wof': entry('Wall_of_Flesh', 'Drop a Guide Voodoo Doll into lava in the Underworld while the Guide is alive.', 'Any time. The Guide is sacrificed, so wait for him to return before trying again. Directly killing him in Underworld lava also works.'),
  'pirate-invasion': entry('Pirate_Invasion', 'Use a Pirate Map, dropped by enemies in the Ocean during Hardmode.', 'At least one player needs 200 maximum health; another invasion cannot be active.', 'Can begin at dawn in Hardmode after an altar has been destroyed, with at least 200 maximum health.', 'Pirate_Map.png'),
  'queen-slime': entry('Queen_Slime', 'Use a Gelatin Crystal in the Hallow.', 'Any time. Look for the crystal among Crystal Shards in the Underground Hallow during Hardmode.'),
  destroyer: mechanical('The_Destroyer', 'Mechanical Worm'),
  twins: mechanical('The_Twins', 'Mechanical Eye'),
  prime: mechanical('Skeletron_Prime', 'Mechanical Skull'),
  'pre-plantera': entry('Plantera', 'Break a Plantera’s Bulb in the Underground Jungle.', 'Bulbs grow after all three mechanical bosses are defeated in Hardmode. Any time; stay in the Underground Jungle.'),
  'dungeon-post-plantera': { ...entry('Dungeon', 'Return to the Dungeon after defeating Plantera.', 'Skeletron must also be defeated. Stronger enemies now appear, and the matching Biome Keys can unlock Biome Chests.'), actionLabel: 'Access' },
  'solar-eclipse': entry('Solar_Eclipse', 'Use a Solar Tablet during daytime.', 'Day: 4:30 AM–7:30 PM in Hardmode. Tablets and fragments are found in the Jungle Temple; Plantera unlocks Mothron and later enemies.', 'Can begin at dawn after at least one mechanical boss has been defeated.', 'Solar_Tablet.png'),
  'pumpkin-moon': entry('Pumpkin_Moon', 'Use a Pumpkin Moon Medallion at night.', 'Night: 7:30 PM–4:30 AM. Crafting it needs Ectoplasm from the post-Plantera Dungeon. Start at dusk for the most time.'),
  'frost-moon': entry('Frost_Moon', 'Use a Naughty Present at night.', 'Night: 7:30 PM–4:30 AM. Crafting it needs Ectoplasm from the post-Plantera Dungeon. No real-world holiday is required.'),
  'pre-golem': entry('Golem', 'Activate the Lihzahrd Altar with a Lihzahrd Power Cell in your inventory.', 'Any time, in a Hardmode world where Plantera has been defeated. Her Temple Key opens the Jungle Temple.'),
  'martian-madness': entry('Martian_Madness', 'Let a Martian Probe detect you, turn red, and escape without killing it.', 'After Golem. Search the outer thirds of the world above ground, especially Space. Probes cannot appear during the Lunar Events.'),
  'duke-fishron': entry('Duke_Fishron', 'Fish in the Ocean with a Truffle Worm as bait; reel in when it bites.', 'Any time. Catch Truffle Worms in an underground Glowing Mushroom biome in Hardmode; no mechanical boss, Plantera, or Golem kill is needed.'),
  'empress-of-light': entry('Empress_of_Light', 'Kill a Prismatic Lacewing in the Hallow, or release a captured one there and kill it.', 'Lacewings appear in the surface Hallow after Plantera, from 7:30 PM to midnight. A captured one also works by day, when the Empress is enraged.'),
  'pre-lunatic': entry('Lunatic_Cultist', 'Kill the four cultists gathered at the Dungeon entrance.', 'They appear after Golem, when no conflicting boss or event is active. Any time; defeating the Lunatic Cultist immediately starts the Lunar Events.'),
  'celestial-pillars': entry('Lunar_Events', 'Defeat the Lunatic Cultist to spawn all four Celestial Pillars.', 'Any time. Find the pillars on the map; destroying the last one starts Moon Lord’s 60-second countdown.'),
  'pre-moon-lord': entry('Moon_Lord', 'Destroy all four Celestial Pillars, or use a Celestial Sigil.', 'Any time. The pillars give a 60-second delay; the Sigil gives 12 seconds. The Sigil requires Golem defeated, no active boss or invasion (including Lunar Events), and the Dungeon tablet off-screen for every player.'),
}

// A suggested route, not a claim that optional encounters must be cleared in order.
export const sideEncounters = [
  {
    id: 'solar-eclipse', name: 'Solar Eclipse', next: 'Mothron & eclipse enemies',
    when: 'Post-Plantera rewards; suggested here after Golem', kind: 'Optional event',
    unlock: 'Eclipses can occur after a mechanical boss. Plantera unlocks Mothron and the late-game drops.',
    summon: 'Use a Solar Tablet during daytime. Find tablets or their fragments in the Jungle Temple.',
    prepare: 'Make a surface fighting area with room above it for Mothron. This is a useful first detour for melee and summoner upgrades.',
    payoff: 'Farm Mothron for a Broken Hero Sword to finish Terra Blade. Deadly Spheres offer a new minion.',
    rewards: { melee: ['terraBlade', 'eyeYoyo'], summoner: ['deadlySphere'] },
    source: 'Solar_Eclipse',
  },
  {
    id: 'pumpkin-moon', name: 'Pumpkin Moon', next: 'Mourning Wood & Pumpking',
    when: 'Available after Plantera; a valuable summoner detour', kind: 'Optional event',
    unlock: 'Plantera opens the Dungeon enemies that drop Ectoplasm for the summon.',
    summon: 'Craft a Pumpkin Moon Medallion and use it at night. Start at dusk to give yourself more time.',
    prepare: 'Build for crowds and flying bosses. Repeat the event for materials and drops; a perfect wave clear is not needed to move on.',
    payoff: 'Especially useful for summoners: Spooky Wood armor, scroll accessories, and Raven Staff. Other classes also get weapon options.',
    rewards: { ranged: ['candyCorn'], mage: ['batScepter'], summoner: ['spookyArmor', 'necromanticScroll', 'papyrusScarab', 'ravenStaff'] },
    source: 'Pumpkin_Moon',
  },
  {
    id: 'frost-moon', name: 'Frost Moon', next: 'Everscream, Santa-NK1 & Ice Queen',
    when: 'Available after Plantera; try after improving your crowd damage', kind: 'Optional event',
    unlock: 'The Naughty Present recipe uses Ectoplasm from the post-Plantera Dungeon.',
    summon: 'Craft a Naughty Present and use it at night, ideally at dusk. This is separate from the Frost Legion.',
    prepare: 'Bring piercing or area damage for early waves and a mobile setup for Ice Queen. You can return later for higher waves.',
    payoff: 'A weapon-farming stop rather than a progression gate. Ranged players can hunt Santa-NK1 for the Chain Gun.',
    rewards: { ranged: ['chainGun'] }, source: 'Frost_Moon',
  },
  {
    id: 'martian-madness', name: 'Martian Madness', next: 'Martian Saucer',
    when: 'Unlocks after Golem', kind: 'Optional event',
    unlock: 'Defeat Golem; Martian Probes can then appear in the outer parts of the world.',
    summon: 'Let a Martian Probe detect you and escape. Search the outer thirds of the map, especially Space.',
    prepare: 'Prepare near your base before triggering the invasion. Leave room to move out of the Saucer’s death ray; blocks do not stop it.',
    payoff: 'A broad upgrade stop with Saucer weapons for all four classes and a chance at the Cosmic Car Key mount.',
    rewards: { melee: ['influxWaver'], ranged: ['xenopopper', 'electrosphere'], mage: ['laserMachinegun'], summoner: ['xenoStaff'] },
    source: 'Martian_Madness',
  },
  {
    id: 'duke-fishron', name: 'Duke Fishron', next: 'Duke Fishron',
    when: 'Available from early Hardmode; suggested here for a first playthrough', kind: 'Optional boss',
    unlock: 'Hardmode lets Truffle Worms spawn. Neither Plantera nor Golem is required.',
    summon: 'Catch a Truffle Worm in an underground Glowing Mushroom biome, then use it as fishing bait in the Ocean.',
    prepare: 'Build an Ocean arena and stay in the Ocean during the fight. Favor flight and a dash; practice moving around the tornadoes.',
    payoff: 'Strong weapons across classes and a chance at Fishron Wings. You can tackle this earlier if you are comfortable with the fight.',
    rewards: { ranged: ['tsunami'], mage: ['razorTyphoon'], summoner: ['tempestStaff'] }, source: 'Duke_Fishron',
  },
  {
    id: 'empress-of-light', name: 'Empress of Light', next: 'Empress of Light · night',
    when: 'Available after Plantera; suggested here with upgraded mobility', kind: 'Optional boss',
    unlock: 'After Plantera, Prismatic Lacewings spawn in the surface Hallow from dusk until midnight.',
    summon: 'Kill a Prismatic Lacewing in the Hallow. For a first clear, summon her at night and finish before dawn.',
    prepare: 'Leave plenty of open air to learn the attack patterns. Daytime is a separate challenge: Terraprisma requires all damage to be dealt during daytime.',
    payoff: 'Kaleidoscope is a major whip upgrade; Nightglow is a magic option. Expert/Master also awards Soaring Insignia, which still needs wings or rocket boots.',
    rewards: { mage: ['nightglow'], summoner: ['kaleidoscope'] }, source: 'Empress_of_Light',
  },
  {
    id: 'old-ones-army', name: 'Old One’s Army III', next: 'Betsy · wave 7',
    when: 'Tier 3 unlocks after Golem; revisit after other upgrades', kind: 'Optional event',
    unlock: 'Golem raises Old One’s Army to its final tier. Earlier tiers are available before this stop.',
    summon: 'Buy an Eternia Crystal and stand from the Tavernkeep. Place the stand on a long, flat, unobstructed arena.',
    prepare: 'Protect the crystal on both sides while fighting Betsy. Spend the event’s Etherian Mana on sentries; Defender Medals buy permanent Tavernkeep upgrades.',
    payoff: 'Betsy offers powerful weapons, while Defender Medals open more armor and sentry options. Skip or revisit if defending both lanes is slowing you down.',
    rewards: { melee: ['flyingDragon'], mage: ['betsysWrath'] }, source: 'Old_One%27s_Army',
  },
].map(stage => ({ ...stage, era: 'hardmode', optional: true }))

export const sideStages = [
  {
    id: 'event-upgrades', name: 'Event upgrades', next: 'Eclipse, moons, Martians & Betsy',
    when: 'Optional detours around Golem', kind: 'Optional events', era: 'hardmode', optional: true,
    prepare: 'Pick an event for the rewards you want. You do not need to clear all five, and you can return after other upgrades. The shared starter kit below assumes Golem is defeated.',
    encounters: sideEncounters.filter(encounter => encounter.kind === 'Optional event'),
  },
  {
    id: 'optional-bosses', name: 'Optional bosses', next: 'Duke Fishron & Empress of Light',
    when: 'Two optional challenges before the Lunar Events', kind: 'Optional bosses', era: 'hardmode', optional: true,
    prepare: 'Try either boss when you feel ready, in whichever order you prefer. Both unlock earlier than this suggested stop; the shared starter kit below is for a post-Golem attempt.',
    encounters: sideEncounters.filter(encounter => encounter.kind === 'Optional boss'),
  },
]

export const pillarStage = {
  id: 'celestial-pillars', era: 'hardmode', name: 'Celestial Pillars', next: 'Solar, Vortex, Nebula & Stardust', kind: 'Main route',
  when: 'After Lunatic Cultist; before lunar weapons are crafted',
  unlock: 'Defeating Lunatic Cultist starts the Lunar Events and spawns all four pillars.',
  summon: 'Travel to a pillar, defeat its enemies to remove its shield, then destroy it.',
  prepare: 'Start with your class’s pillar: Solar for melee, Vortex for ranged, Nebula for mage, Stardust for summoner. Craft its weapons at the Ancient Manipulator before continuing.',
  payoff: 'Prepare your Moon Lord arena and supplies before destroying the last pillar: Moon Lord arrives about one minute later. Lunar armor still needs Moon Lord drops.',
  rewards: { melee: ['solarEruption', 'daybreak'], ranged: ['phantasm', 'vortexBeater'], mage: ['nebulaBlaze', 'nebulaArcanum'], summoner: ['stardustDragon', 'stardustCell', 'constellation'] },
  source: 'Lunar_Events',
}

export const mainRouteDetails = {
  'pre-boss': {
    unlock: 'Start by exploring the surface and underground for health, armor, and movement accessories.',
    summon: 'Use a Suspicious Looking Eye at night when you are ready for Eye of Cthulhu.',
    prepare: 'Build a platform arena. King Slime is an optional early practice fight. After Eye, tackle your evil biome boss, then consider Queen Bee before Skeletron.',
    payoff: 'This leads into the evil biome and Jungle upgrades used in the next kit. Eye of Cthulhu itself is not a mandatory gate.', source: 'Guide:Game_progression',
  },
  'pre-skeletron': {
    unlock: 'Gear up through Eater of Worlds or Brain of Cthulhu. Queen Bee is an optional source of bee weapons and summoner gear.',
    summon: 'Speak to the Old Man at the Dungeon entrance at night and choose Curse.',
    prepare: 'Set up platforms outside the Dungeon and start at dusk. Avoid exploring deep inside until Skeletron is defeated.',
    payoff: 'Open the Dungeon for weapons, accessories, and materials before heading to the Underworld.', source: 'Skeletron',
  },
  'pre-wof': {
    unlock: 'Explore the Dungeon and Underworld, then finish your pre-Hardmode equipment.',
    summon: 'With the Guide alive, drop a Guide Voodoo Doll into lava in the Underworld.',
    prepare: 'Clear a long Underworld route and bring buffs. Optional detours include Deerclops and Old One’s Army tier 1.',
    payoff: 'Defeating Wall of Flesh starts Hardmode and changes the world. Prepare housing, storage, and travel routes first.', source: 'Wall_of_Flesh',
  },
  'pre-mechanicals': {
    unlock: 'Enter Hardmode. Mine Hardmode ores, gather Souls, and upgrade your mobility.',
    summon: 'Use a Mechanical Eye, Mechanical Worm, or Mechanical Skull at night for the corresponding boss.',
    prepare: 'Fight the three separately in whichever order suits your class. Queen Slime, Pirates, and Blood Moon fishing are optional gear detours. Old One’s Army tier 2 opens after your first mech.',
    payoff: 'Defeat all three mechanical bosses to make Plantera’s Bulbs begin appearing in the Underground Jungle.', source: 'Mechanical_bosses',
  },
  'pre-plantera': {
    unlock: 'Defeat all three mechanical bosses and locate a Plantera’s Bulb in the Underground Jungle.',
    summon: 'Break a Plantera’s Bulb when your nearby arena is ready.',
    prepare: 'Mine Chlorophyte, collect Life Fruit, and clear a large arena that stays within the Underground Jungle.',
    payoff: 'Unlock the Temple key, stronger Dungeon enemies, and several new boss and event options.', source: 'Plantera',
  },
  'pre-golem': {
    unlock: 'Defeat Plantera and use the Temple Key to enter the Jungle Temple.',
    summon: 'Use a Lihzahrd Power Cell at the Lihzahrd Altar inside the Temple.',
    prepare: 'Visit the post-Plantera Dungeon first and clear Temple traps. Eclipse, moon events, and Empress can already be attempted; this route saves them for after Golem.',
    payoff: 'Golem unlocks Martian Madness, Old One’s Army tier 3, and the Cultist route. Choose your detours before beginning the Lunar Events.', source: 'Golem',
  },
  'pre-lunatic': {
    unlock: 'Defeat Golem and Skeletron, then visit the cultists at the Dungeon entrance.',
    summon: 'Defeat the cultists outside the Dungeon to begin the Lunatic Cultist fight.',
    prepare: 'Finish any optional farming you want and prepare a Moon Lord arena. You may skip every optional stop; use your Golem/Dungeon kit if you do.',
    payoff: 'The Cultist drops the Ancient Manipulator and immediately starts the Celestial Pillars. Lunar weapon crafting comes after your first pillar.', source: 'Lunatic_Cultist',
  },
  'pre-moon-lord': {
    unlock: 'Craft fragment weapons after defeating the corresponding pillars.',
    summon: 'Destroying the last Celestial Pillar brings Moon Lord about one minute later.',
    prepare: 'Have your arena, healing, buffs, and equipment ready before finishing that last pillar. Keep pre-Moon Lord armor; Luminite armor is a reward for winning.',
    payoff: 'Moon Lord drops Luminite and endgame weapons. After your first win, craft lunar armor and return to any skipped bosses or events.', source: 'Moon_Lord',
  },
}

// First-clear kits use Golem and Dungeon gear, without assuming any side boss/event loot.
const kits = {
  melee: { armor: ['beetleArmor'], weapons: ['possessedHatchet', 'seedler', 'paladinsHammer'], accessories: ['fireGauntlet', 'avengerEmblem', 'frozenShield', 'masterNinja', 'leafWings'] },
  ranged: { armor: ['shroomiteArmor'], weapons: ['stynger', 'venusMagnum', 'megashark'], accessories: ['rangerEmblem', 'destroyerEmblem', 'reconScope', 'masterNinja', 'leafWings'] },
  mage: { armor: ['spectreArmor'], weapons: ['magnetSphere', 'infernoFork', 'waspGun'], accessories: ['celestialEmblem', 'manaCloak', 'sorcererEmblem', 'masterNinja', 'leafWings', 'manaRegenBand'] },
  summoner: { armor: ['tikiArmor'], weapons: ['pygmyStaff', 'desertTiger', 'morningStar'], accessories: ['pygmyNecklace', 'summonerEmblem', 'avengerEmblem', 'masterNinja', 'leafWings', 'twilightGrasp'] },
}

export const sideLoadouts = sideStages.flatMap(stage => Object.entries(kits).map(([classId, kit]) => ({
  ...kit, classId, stageId: stage.id,
  notes: 'First-clear kit for the suggested post-Golem route; no optional boss or event drops required. Keep any stronger rewards you have already earned.' + (classId === 'summoner' ? ' Desert Tiger needs a Desert Key; use Pygmy Staff if you do not have one.' : ''),
})))

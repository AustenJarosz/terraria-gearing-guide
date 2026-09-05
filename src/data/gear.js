export const classes = [
  {
    "id": "melee",
    "name": "Melee",
    "blurb": "Swords, spears, flails, and yoyos. Highest defense."
  },
  {
    "id": "ranged",
    "name": "Ranged",
    "blurb": "Bows, guns, and launchers. Bring ammo."
  },
  {
    "id": "mage",
    "name": "Mage",
    "blurb": "Magic weapons and mana. Huge burst damage."
  },
  {
    "id": "summoner",
    "name": "Summoner",
    "blurb": "Minions and whips. Fragile, but they shred."
  }
]

export const eras = [
  {
    "id": "pre-hardmode",
    "name": "Pre-Hardmode"
  },
  {
    "id": "hardmode",
    "name": "Hardmode"
  }
]

export const stages = [
  {
    "id": "pre-boss",
    "era": "pre-hardmode",
    "name": "Pre-Boss",
    "next": "Eye of Cthulhu",
    "when": "World spawn until your first boss"
  },
  {
    "id": "pre-skeletron",
    "era": "pre-hardmode",
    "name": "Pre-Skeletron",
    "next": "Skeletron",
    "when": "After Eye of Cthulhu / evil boss / Queen Bee"
  },
  {
    "id": "pre-wof",
    "era": "pre-hardmode",
    "name": "Pre–Wall of Flesh",
    "next": "Wall of Flesh",
    "when": "Dungeon unlocked, then the Underworld"
  },
  {
    "id": "pre-mechanicals",
    "era": "hardmode",
    "name": "Pre-Mechanicals",
    "next": "The Twins, Destroyer, Skeletron Prime",
    "when": "Smash altars and gear on Hardmode ores"
  },
  {
    "id": "pre-plantera",
    "era": "hardmode",
    "name": "Pre-Plantera",
    "next": "Plantera",
    "when": "After all three Mechanical bosses"
  },
  {
    "id": "pre-golem",
    "era": "hardmode",
    "name": "Pre-Golem",
    "next": "Golem",
    "when": "Post-Plantera dungeon, jungle temple key"
  },
  {
    "id": "pre-lunatic",
    "era": "hardmode",
    "name": "Pre-Lunatic",
    "next": "Lunatic Cultist",
    "when": "Golem, Martians, moons, and optional Fishron / Empress"
  },
  {
    "id": "pre-moon-lord",
    "era": "hardmode",
    "name": "Pre–Moon Lord",
    "next": "Moon Lord",
    "when": "Celestial Pillars and lunar fragment gear"
  }
]

export const loadouts = [
  {
    "classId": "melee",
    "stageId": "pre-boss",
    "armor": [
      "platinumArmor",
      "goldArmor"
    ],
    "weapons": [
      "enchantedSword",
      "amazon",
      "spear",
      "enchantedBoomerang"
    ],
    "accessories": [
      "hermesBoots",
      "cloudBottle",
      "regenBand",
      "sharkTooth"
    ],
    "notes": "Prioritize mobility and an arena. These are alternative weapons and armor sets; you do not need to farm every item."
  },
  {
    "classId": "melee",
    "stageId": "pre-skeletron",
    "armor": [
      "shadowArmor",
      "crimsonArmor"
    ],
    "weapons": [
      "lightsBane",
      "bloodButcherer",
      "bladeOfGrass",
      "beeKeeper",
      "hiveFive",
      "thornChakram"
    ],
    "accessories": [
      "shieldCthulhu",
      "spectreBoots",
      "feralClaws",
      "wormScarf",
      "brainConfusion"
    ],
    "notes": "After the evil boss, Queen Bee provides materials for Hive-Five. Choose Shadow or Crimson armor for your world, or work toward Molten armor."
  },
  {
    "classId": "melee",
    "stageId": "pre-wof",
    "armor": [
      "moltenArmor"
    ],
    "weapons": [
      "nightsEdge",
      "sunfury",
      "cascade",
      "darkLance",
      "muramasa"
    ],
    "accessories": [
      "obsidianShield",
      "lightningBoots",
      "feralClaws"
    ],
    "notes": "Craft Night’s Edge from the four component swords. Molten armor is a strong melee set. Charm of Myths requires Hardmode and is not part of this stage."
  },
  {
    "classId": "melee",
    "stageId": "pre-mechanicals",
    "armor": [
      "adamantiteArmor",
      "titaniumArmor"
    ],
    "weapons": [
      "fetidBaghnakhs",
      "shadowflameKnife",
      "amarok",
      "cutlass",
      "iceSickle"
    ],
    "accessories": [
      "warriorEmblem",
      "powerGlove",
      "wingsEarly",
      "wormScarf",
      "brainConfusion"
    ],
    "notes": "Frozen Wings and ore armor are available before the mechanical bosses. Fetid Baghnakhs require a Crimson Mimic and close-range positioning."
  },
  {
    "classId": "melee",
    "stageId": "pre-plantera",
    "armor": [
      "hallowedArmor",
      "turtleArmor"
    ],
    "weapons": [
      "trueExcalibur",
      "trueNightsEdge",
      "yelets",
      "deathSickle",
      "chlorophyteSaber",
      "chlorophyteClaymore"
    ],
    "accessories": [
      "fireGauntlet",
      "warriorEmblem",
      "avengerEmblem",
      "wingsEarly"
    ],
    "notes": "All three mechanical bosses unlock the mining tools needed for Chlorophyte. Try the reworked Chlorophyte swords alongside the True swords."
  },
  {
    "classId": "melee",
    "stageId": "pre-golem",
    "armor": [
      "turtleArmor",
      "chlorophyteArmor"
    ],
    "weapons": [
      "terraBlade",
      "vampireKnives",
      "seedler",
      "flowerPow",
      "paladinsHammer"
    ],
    "accessories": [
      "fireGauntlet",
      "avengerEmblem",
      "frozenShield",
      "masterNinja",
      "leafWings"
    ],
    "notes": "Plantera unlocks Mothron’s Broken Hero Sword for Terra Blade and the stronger Dungeon enemies. Vampire Knives require a Crimson world’s Dungeon chest."
  },
  {
    "classId": "melee",
    "stageId": "pre-lunatic",
    "armor": [
      "beetleArmor"
    ],
    "weapons": [
      "possessedHatchet",
      "influxWaver",
      "eyeYoyo",
      "flyingDragon",
      "terraBlade"
    ],
    "accessories": [
      "fireGauntlet",
      "celestialShell",
      "destroyerEmblem",
      "masterNinja",
      "leafWings"
    ],
    "notes": "Golem provides Beetle Husks. Martian Madness and tier-three Old One’s Army offer optional alternatives before the Cultist."
  },
  {
    "classId": "melee",
    "stageId": "pre-moon-lord",
    "armor": [
      "beetleArmor"
    ],
    "weapons": [
      "solarEruption",
      "daybreak",
      "terraBlade"
    ],
    "accessories": [
      "celestialShell",
      "ankhShield",
      "fireGauntlet",
      "destroyerEmblem",
      "soaringInsignia",
      "leafWings"
    ],
    "notes": "Use Beetle armor with Solar-fragment weapons. Solar Flare armor requires Luminite from Moon Lord. Keep wings equipped if using Soaring Insignia."
  },
  {
    "classId": "ranged",
    "stageId": "pre-boss",
    "armor": [
      "fossilArmor",
      "platinumArmor"
    ],
    "weapons": [
      "goldBow",
      "boomstick",
      "musket",
      "undertaker"
    ],
    "accessories": [
      "hermesBoots",
      "cloudBottle",
      "sharkTooth",
      "regenBand"
    ],
    "notes": "Fossil armor is crafted with Sturdy Fossils. A Shadow Orb or Crimson Heart gives a world-specific gun; breaking a third summons the evil boss."
  },
  {
    "classId": "ranged",
    "stageId": "pre-skeletron",
    "armor": [
      "fossilArmor"
    ],
    "weapons": [
      "minishark",
      "beesKnees",
      "moltenFury"
    ],
    "accessories": [
      "spectreBoots",
      "sharkTooth",
      "shieldCthulhu"
    ],
    "notes": "Choose a bow or gun and bring suitable ammunition. Molten Fury requires Hellstone access; The Bee’s Knees is a Queen Bee drop."
  },
  {
    "classId": "ranged",
    "stageId": "pre-wof",
    "armor": [
      "necroArmor"
    ],
    "weapons": [
      "hellwingBow",
      "phoenixBlaster",
      "moltenFury",
      "minishark"
    ],
    "accessories": [
      "obsidianShield",
      "lightningBoots",
      "sharkTooth"
    ],
    "notes": "Craft Necro armor with Dungeon Bones and Cobwebs. Hellwing Bow with Wooden Arrows is useful for piercing Wall of Flesh targets."
  },
  {
    "classId": "ranged",
    "stageId": "pre-mechanicals",
    "armor": [
      "adamantiteArmor",
      "titaniumArmor"
    ],
    "weapons": [
      "daedalus",
      "clockwork",
      "onyxBlaster"
    ],
    "accessories": [
      "rangerEmblem",
      "magicQuiver",
      "wingsEarly",
      "lightningBoots"
    ],
    "notes": "Use the ranged headpiece of your ore set. Stormbow works best with room overhead; Megashark needs Souls of Might from the Destroyer."
  },
  {
    "classId": "ranged",
    "stageId": "pre-plantera",
    "armor": [
      "hallowedArmor",
      "chlorophyteArmor"
    ],
    "weapons": [
      "megashark",
      "shotbow",
      "dartRifle",
      "daedalus"
    ],
    "accessories": [
      "rangerEmblem",
      "moltenQuiver",
      "avengerEmblem",
      "wingsEarly"
    ],
    "notes": "Megashark and Chlorophyte Shotbow are accessible here. Match accessories to bullets or arrows; quivers do not improve guns."
  },
  {
    "classId": "ranged",
    "stageId": "pre-golem",
    "armor": [
      "shroomiteArmor"
    ],
    "weapons": [
      "tsunami",
      "venusMagnum",
      "grenadeLauncher",
      "sniperRifle",
      "chainGun"
    ],
    "accessories": [
      "moltenQuiver",
      "rangerEmblem",
      "avengerEmblem",
      "reconScope",
      "leafWings"
    ],
    "notes": "Craft Shroomite after Plantera. Its 1.4.5.7 stealth can build while attacking and moving below maximum running speed. Fishron and Frost Moon gear are optional."
  },
  {
    "classId": "ranged",
    "stageId": "pre-lunatic",
    "armor": [
      "shroomiteArmor"
    ],
    "weapons": [
      "stynger",
      "electrosphere",
      "xenopopper",
      "candyCorn",
      "tsunami"
    ],
    "accessories": [
      "moltenQuiver",
      "rangerEmblem",
      "destroyerEmblem",
      "masterNinja",
      "leafWings"
    ],
    "notes": "Choose the Shroomite headpiece matching bows, guns or specialist weapons. Martian gear is optional, not required for the Cultist."
  },
  {
    "classId": "ranged",
    "stageId": "pre-moon-lord",
    "armor": [
      "shroomiteArmor"
    ],
    "weapons": [
      "phantasm",
      "vortexBeater",
      "tsunami"
    ],
    "accessories": [
      "celestialShell",
      "rangerEmblem",
      "destroyerEmblem",
      "moltenQuiver",
      "ankhShield",
      "leafWings"
    ],
    "notes": "Craft Vortex-fragment weapons, keep Shroomite armor, and match ammo and accessories to your weapon. Vortex armor requires a Moon Lord kill."
  },
  {
    "classId": "mage",
    "stageId": "pre-boss",
    "armor": [
      "diamondRobe",
      "platinumArmor",
      "goldArmor"
    ],
    "weapons": [
      "daybloomStaff",
      "glacierFang",
      "diamondStaff",
      "rubyStaff",
      "thunderZapper"
    ],
    "accessories": [
      "hermesBoots",
      "regenBand",
      "cloudBottle",
      "manaRegenBand"
    ],
    "notes": "1.4.5.7 adds early wand options and reworks gem staffs. Gem robes add their gem effect to staffs; matching gems strengthen shots. Use Mana Crystals to expand your mana."
  },
  {
    "classId": "mage",
    "stageId": "pre-skeletron",
    "armor": [
      "meteorArmor",
      "jungleArmor"
    ],
    "weapons": [
      "spaceGun",
      "beeGun",
      "grayZap"
    ],
    "accessories": [
      "spectreBoots",
      "manaFlower",
      "shieldCthulhu",
      "manaRegenBand"
    ],
    "notes": "Meteor armor removes Space Gun’s mana cost. Mana regenerates while attacking in 1.4.5.7; regeneration accessories and Mana Regeneration Potions are useful."
  },
  {
    "classId": "mage",
    "stageId": "pre-wof",
    "armor": [
      "jungleArmor",
      "meteorArmor"
    ],
    "weapons": [
      "waterBolt",
      "flamelash",
      "demonScythe",
      "grayZap"
    ],
    "accessories": [
      "manaFlower",
      "celestialCuffs",
      "obsidianShield",
      "lightningBoots",
      "manaRegenBand"
    ],
    "notes": "Water Bolt is a post-Skeletron Dungeon find. Mana-star pickups grant Mana Surge in 1.4.5.7. Mana Regeneration Band is an alternative to relying only on mana potions."
  },
  {
    "classId": "mage",
    "stageId": "pre-mechanicals",
    "armor": [
      "forbiddenArmor",
      "adamantiteArmor"
    ],
    "weapons": [
      "skyFracture",
      "crystalSerpent",
      "goldenShower",
      "cursedFlames",
      "meteorStaff"
    ],
    "accessories": [
      "sorcererEmblem",
      "manaFlower",
      "celestialCuffs",
      "wingsEarly",
      "manaRegenBand"
    ],
    "notes": "Choose the magic headpiece. Golden Shower and Cursed Flames depend on world evil. In 1.4.5.7 empty mana slows casting rather than stopping it."
  },
  {
    "classId": "mage",
    "stageId": "pre-plantera",
    "armor": [
      "hallowedArmor",
      "chlorophyteArmor"
    ],
    "weapons": [
      "lifeDrain",
      "venomStaff",
      "goldenShower",
      "nimbusRod"
    ],
    "accessories": [
      "sorcererEmblem",
      "avengerEmblem",
      "manaCloak",
      "wingsEarly",
      "manaRegenBand"
    ],
    "notes": "Build a spacious Plantera arena. Nimbus Rod supplies stationary damage; keep a mobile weapon ready and use regeneration support."
  },
  {
    "classId": "mage",
    "stageId": "pre-golem",
    "armor": [
      "spectreArmor"
    ],
    "weapons": [
      "nettleBurst",
      "waspGun",
      "magnetSphere",
      "infernoFork",
      "batScepter"
    ],
    "accessories": [
      "celestialEmblem",
      "manaCloak",
      "sorcererEmblem",
      "avengerEmblem",
      "leafWings",
      "manaRegenBand"
    ],
    "notes": "Spectre armor requires Chlorophyte Bars and Ectoplasm. Mask favors damage; Hood favors healing. Mana Cloak now generates mana stars on magic hits."
  },
  {
    "classId": "mage",
    "stageId": "pre-lunatic",
    "armor": [
      "spectreArmor"
    ],
    "weapons": [
      "razorTyphoon",
      "nightglow",
      "betsysWrath",
      "laserMachinegun",
      "magnetSphere"
    ],
    "accessories": [
      "celestialEmblem",
      "manaCloak",
      "sorcererEmblem",
      "destroyerEmblem",
      "leafWings",
      "manaRegenBand"
    ],
    "notes": "Fishron, Empress, Martian Madness and tier-three Old One’s Army provide optional weapons. Choose based on the encounters you want to farm."
  },
  {
    "classId": "mage",
    "stageId": "pre-moon-lord",
    "armor": [
      "spectreArmor"
    ],
    "weapons": [
      "nebulaBlaze",
      "nebulaArcanum",
      "razorTyphoon",
      "nightglow"
    ],
    "accessories": [
      "celestialShell",
      "celestialEmblem",
      "manaCloak",
      "ankhShield",
      "leafWings",
      "manaRegenBand"
    ],
    "notes": "Craft Nebula-fragment weapons while retaining Spectre armor. Nebula armor and Last Prism require Moon Lord drops. Mana regeneration remains valuable."
  },
  {
    "classId": "summoner",
    "stageId": "pre-boss",
    "armor": [
      "flinxCoat",
      "platinumArmor"
    ],
    "weapons": [
      "clayBud",
      "flinxStaff",
      "finchStaff",
      "leatherWhip"
    ],
    "accessories": [
      "hermesBoots",
      "cloudBottle",
      "regenBand"
    ],
    "notes": "Clay Bud Staff is a new craftable starter. Flinx Fur Coat is a chest piece; pair it with ore head and leg pieces. Minions and whips work together."
  },
  {
    "classId": "summoner",
    "stageId": "pre-skeletron",
    "armor": [
      "beeArmor",
      "obsidianArmor"
    ],
    "weapons": [
      "hornetStaff",
      "vampireFrog",
      "snapthorn",
      "impStaff"
    ],
    "accessories": [
      "spectreBoots",
      "shieldCthulhu",
      "wormScarf",
      "brainConfusion"
    ],
    "notes": "Bee armor favors minions; Obsidian armor improves whips. Both require boss materials. Use a whip alongside your chosen minion."
  },
  {
    "classId": "summoner",
    "stageId": "pre-wof",
    "armor": [
      "obsidianArmor",
      "beeArmor"
    ],
    "weapons": [
      "impStaff",
      "spinalTap",
      "vampireFrog"
    ],
    "accessories": [
      "pygmyNecklace",
      "lightningBoots",
      "obsidianShield",
      "silverBracer"
    ],
    "notes": "Dungeon loot unlocks Spinal Tap and Silver Bracer. In 1.4.5.7, additional whip-tag effects require the appropriate accessories."
  },
  {
    "classId": "summoner",
    "stageId": "pre-mechanicals",
    "armor": [
      "spiderArmor"
    ],
    "weapons": [
      "spiderStaff",
      "queenSpider",
      "firecracker",
      "coolWhip",
      "bladeStaff"
    ],
    "accessories": [
      "summonerEmblem",
      "pygmyNecklace",
      "wingsEarly",
      "wickedClaws"
    ],
    "notes": "Spider armor needs no mechanical souls. Queen Slime and Dreadnautilus are optional routes to Blade or Sanguine Staff. Whip-tag accessories offer additional build choices."
  },
  {
    "classId": "summoner",
    "stageId": "pre-plantera",
    "armor": [
      "hallowedArmor",
      "spiderArmor"
    ],
    "weapons": [
      "opticStaff",
      "bladeStaff",
      "durendal",
      "sanguineStaff"
    ],
    "accessories": [
      "summonerEmblem",
      "avengerEmblem",
      "pygmyNecklace",
      "wingsEarly",
      "twilightGrasp"
    ],
    "notes": "Use Hallowed Hood for summoner armor. Durendal’s 1.4.5.7 enchantment adds a minion-triggered hit. Equip tag-slot accessories when combining different whip tags."
  },
  {
    "classId": "summoner",
    "stageId": "pre-golem",
    "armor": [
      "tikiArmor"
    ],
    "weapons": [
      "pygmyStaff",
      "desertTiger",
      "morningStar",
      "tempestStaff"
    ],
    "accessories": [
      "necromanticScroll",
      "pygmyNecklace",
      "summonerEmblem",
      "avengerEmblem",
      "leafWings",
      "twilightGrasp"
    ],
    "notes": "Tiki armor becomes available after Plantera. Desert Tiger requires the Dungeon’s Desert Chest and key. Fishron and Pumpkin Moon are optional upgrades."
  },
  {
    "classId": "summoner",
    "stageId": "pre-lunatic",
    "armor": [
      "spookyArmor"
    ],
    "weapons": [
      "ravenStaff",
      "xenoStaff",
      "deadlySphere",
      "kaleidoscope",
      "terraprisma"
    ],
    "accessories": [
      "papyrusScarab",
      "pygmyNecklace",
      "summonerEmblem",
      "necromanticScroll",
      "leafWings",
      "twilightGrasp"
    ],
    "notes": "Spooky armor and Ravens come from Pumpkin Moon; Xeno Staff comes from Martian Saucers. Terraprisma requires all damage to Empress during daytime and is optional."
  },
  {
    "classId": "summoner",
    "stageId": "pre-moon-lord",
    "armor": [
      "spookyArmor"
    ],
    "weapons": [
      "constellation",
      "stardustDragon",
      "stardustCell",
      "kaleidoscope",
      "terraprisma"
    ],
    "accessories": [
      "papyrusScarab",
      "celestialShell",
      "summonerEmblem",
      "soaringInsignia",
      "leafWings",
      "twilightGrasp"
    ],
    "notes": "Craft Constellation and Stardust-fragment minion weapons; keep Spooky armor until Moon Lord. Constellation’s cosmic energy grows on minion hits and releases on a follow-up whip hit."
  }
]

// Master Mode, Desktop 1.4.5.7. Edit these stage/class entries to tune the guide.
// accessories = one complete equipped build (6 slots, or 7 after the Demon Heart).
// accessorySwaps = alternatives, with the exact equipped item they replace.
// Weapons and armor are choices, not a shopping list. The first weapon is the default.
const ids = value => value.split(' ')
const note = (label, text) => [{ label, text }]
const swap = (id, replaces, text) => ({ id, replaces, text })
const crimson = () => swap('brainConfusion', 'wormScarf', 'Crimson-world alternative to the Corruption drop. Use the one available in your world.')
const boots = () => swap('lightningBoots', 'amphibianBoots', 'Use your running boots if you have not fished up the Amphibian Boots ingredients; you lose the extra wing ascent.')
const build = (armor, weapons, accessories, notes, accessorySwaps = [], itemNotes = {}) => ({
  armor: ids(armor), weapons: ids(weapons), accessories: ids(accessories), notes, accessorySwaps, itemNotes,
})

const earlySwaps = replaces => [
  swap('magiluminescence', replaces, 'More ground speed and acceleration. Mine evil ore with bombs; a boss kill is not required for the bars.'),
  swap('shackle', 'shinyBalloon', 'Temporary defense slot if you have not found a balloon. Upgrade when you can.'),
]
const grounded = 'Use Hermes, Flurry, Sailfish, or Dunerider Boots for the running slot. Armor sets and weapons shown are alternatives; choose what you can obtain.'
const evilRoute = 'This shared kit assumes Eye of Cthulhu and the evil-biome boss are defeated, but does not require Queen Bee or Deerclops loot. For an earlier King Slime, use the Pre-Boss kit.'
const preBoss = {
  melee: build('platinumArmor goldArmor', 'starfury enchantedSword amazon', 'hermesBoots cloudBottle shinyBalloon regenBand sharkTooth feralClaws',
    `${grounded} Use Starfury or Enchanted Sword to keep some distance; Amazon is the craftable yoyo alternative.`, earlySwaps('regenBand'), {
      starfury: note('Use with', 'Open sky so the falling star reaches the Eye. Change weapons when terrain blocks it.'),
      amazon: note('Alternative', 'Craftable in the Jungle if you cannot find a good sword. Keep the yoyo on the target.'),
    }),
  ranged: build('fossilArmor platinumArmor goldArmor', 'goldBow boomstick musket undertaker', 'hermesBoots cloudBottle shinyBalloon regenBand sharkTooth magiluminescence',
    `${grounded} Fossil armor is the damage option; ore armor trades damage for defense. A Platinum or Gold Bow with Frostburn Arrows is a practical first-boss weapon.`, [swap('shackle', 'magiluminescence', 'Easy temporary defense if you have not mined evil ore.')], {
      goldBow: note('Ammo', 'Frostburn Arrows. A Gold Bow is the equivalent choice in a gold world.'),
      musket: note('Corruption option', 'From a Shadow Orb. Use Silver or Tungsten Bullets when available.'),
      undertaker: note('Crimson option', 'From a Crimson Heart; an alternative to the Corruption-only Musket.'),
    }),
  mage: build('jungleArmor diamondRobe', 'mysticBloom glacierFang diamondStaff rubyStaff thunderZapper', 'hermesBoots cloudBottle shinyBalloon regenBand bandStarpower sharkTooth',
    `${grounded} Increase maximum mana with Mana Crystals. Jungle armor is the full-set target; a gem robe is an alternative, not a complete armor set.`, [
      ...earlySwaps('sharkTooth'), swap('shackle', 'bandStarpower', 'Temporary Crimson-world option if you cannot obtain the mana accessory yet.'),
    ], {
      mysticBloom: note('Jungle craft', 'Homing petals help track the Eye. Gather its materials before any boss; Jungle exploration is the challenge.'),
      glacierFang: note('Ice alternative', 'Use if found in a Frozen Chest or fishing crate; it is not a required farm.'),
      diamondRobe: note('Pair with', 'Wizard Hat if Tim drops one; otherwise an available defensive helmet and leggings. Any good gem robe can bridge the gap to Jungle armor.'),
      diamondStaff: note('World alternative', 'Use Ruby Staff in a gold world. Both are craftable options; you do not need both.'),
    }),
  summoner: build('flinxCoat', 'flinxStaff vampireFrog snapthorn', 'hermesBoots cloudBottle shinyBalloon regenBand sharkTooth feralClaws',
    `${grounded} A Flinx Staff with Snapthorn is the attainable core. Vampire Frog is an optional Blood Moon fishing upgrade, not required.`, earlySwaps('regenBand'), {
      flinxCoat: note('Complete the outfit', 'Wear your best defensive helmet and leggings with this chest piece; it is not a full armor set.'),
      snapthorn: note('Pair with', 'Keep its tag on the Eye so your minion benefits. The whip is not a replacement for a summoned minion.'),
      vampireFrog: note('Optional farm', 'Blood Moon fishing enemies are dangerous this early. Keep Flinx if you have not obtained it.'),
    }),
}

const earlyOptional = {
  melee: build('moltenArmor shadowArmor crimsonArmor', 'volcano starfury thornChakram', 'spectreBoots horseshoeBalloons shieldCthulhu wormScarf feralClaws sharkTooth',
    `${evilRoute} Volcano is the close-range option; use Starfury or Thorn Chakram when you need to stay away.`, [crimson(), swap('magiluminescence', 'sharkTooth', 'Trade some damage for faster running and acceleration.')]),
  ranged: build('fossilArmor crimsonArmor shadowArmor', 'moltenFury boomstick minishark', 'spectreBoots horseshoeBalloons shieldCthulhu wormScarf sharkTooth regenBand',
    `${evilRoute} Molten Fury or Boomstick offers a substantial damage upgrade over the starter bow.`, [crimson(), swap('magiluminescence', 'regenBand', 'Use for a ground-running build.')], {
      moltenFury: note('Ammo', 'Frostburn Arrows are a useful boss option; Jester’s Arrows help pierce bees and other enemies.'),
      minishark: note('Use with', 'Shark Tooth Necklace helps its small individual hits. Carry plenty of bullets.'),
    }),
  mage: build('jungleArmor meteorArmor', 'demonScythe spaceGun diamondStaff', 'spectreBoots horseshoeBalloons shieldCthulhu wormScarf manaRegenBand magnetFlower',
    `${evilRoute} Demon Scythe is a strong farmable upgrade. Jungle armor supports ordinary magic weapons; Meteor armor is specifically useful with Space Gun.`, [crimson(), swap('sharkTooth', 'magnetFlower', 'For the Meteor armor + Space Gun setup, which does not need automatic mana potions.')], {
      meteorArmor: note('Pair with', 'Space Gun for zero mana cost. Use Jungle armor for Demon Scythe or a gem staff.'),
      demonScythe: note('Primary upgrade', 'Farm Demons in the Underworld; piercing scythes are useful against bees as well as the boss.'),
    }),
  summoner: build('obsidianArmor flinxCoat', 'impStaff vampireFrog flinxStaff snapthorn', 'spectreBoots horseshoeBalloons shieldCthulhu wormScarf feralClaws sharkTooth',
    `${evilRoute} Obsidian armor favors active whipping. Imp can reach airborne targets; Frog and Flinx are alternatives when they can stay in contact.`, [crimson(), swap('magiluminescence', 'sharkTooth', 'A mobility option if you spend much of the fight running.')], {
      flinxCoat: note('Fallback outfit', 'Use with your best defensive helmet and leggings until you can craft the full Obsidian set.'),
    }),
}

const skeletron = {
  melee: build('moltenArmor', 'starfury volcano hiveFive', 'lightningBoots horseshoeBalloons shieldCthulhu wormScarf feralClaws stingerNecklace',
    'Keep a ranged melee attack for the hands and spinning skull. Molten armor is available after obtaining an evil-biome pickaxe; no Dungeon loot is needed.', [crimson(), swap('sharkTooth', 'stingerNecklace', 'Keep the base necklace if you skipped Queen Bee or did not obtain Honey Comb.')], {
      volcano: note('Close-range option', 'Use during safe openings; switch to Starfury or Hive-Five when keeping distance.'),
      hiveFive: note('Optional Queen Bee craft', 'Uses Bee Wax. Starfury works if you skipped Queen Bee.'),
    }),
  ranged: build('fossilArmor', 'beesKnees moltenFury starCannon', 'lightningBoots horseshoeBalloons shieldCthulhu wormScarf sharkTooth regenBand',
    'Use Fossil armor until the Dungeon supplies Bones for Necro armor. The Bee’s Knees is an optional Queen Bee reward; Molten Fury is the craftable fallback.', [crimson(), swap('hivePack', 'regenBand', 'Use with The Bee’s Knees and Wooden Arrows; keep regeneration for non-bee weapons.')], {
      beesKnees: note('Ammo', 'Wooden Arrows create the bees. Requires defeating Queen Bee.'),
      moltenFury: note('Ammo', 'Frostburn Arrows; use when you have not obtained The Bee’s Knees.'),
      starCannon: note('Resource-heavy option', 'Consumes Fallen Stars. Save enough ammunition for the full fight.'),
    }),
  mage: build('jungleArmor meteorArmor', 'demonScythe spaceGun grayZap', 'lightningBoots horseshoeBalloons shieldCthulhu wormScarf manaRegenBand magnetFlower',
    'Demon Scythe with Jungle armor is the main damage setup. Do not rely on finding Water Bolt before entering the Dungeon.', [crimson(), swap('sharkTooth', 'magnetFlower', 'For Meteor armor with Space Gun or Gray Zapinator, whose mana cost is removed by the set.')], {
      meteorArmor: note('Pair with', 'Space Gun or Gray Zapinator. For Demon Scythe, wear Jungle armor instead.'),
      grayZap: note('Optional vendor roll', 'Traveling Merchant stock is random. Space Gun is the reliable crafted alternative.'),
    }),
  summoner: build('beeArmor obsidianArmor', 'vampireFrog impStaff snapthorn', 'lightningBoots horseshoeBalloons shieldCthulhu wormScarf pygmyNecklace feralClaws',
    'Bee armor favors minion count; Obsidian armor favors whip use. Pygmy Necklace is already sold at night by the Witch Doctor after Queen Bee, well before Plantera.', [crimson(), swap('sharkTooth', 'pygmyNecklace', 'If you skipped Queen Bee and have no Witch Doctor yet, use this with Obsidian armor.')], {
      vampireFrog: note('Use when it connects', 'Strong if frogs can reach the hands or head. Mix in an Imp when the skull stays out of reach.'),
    }),
}

const dungeonEarly = {
  melee: build('moltenArmor', 'volcano starfury hiveFive', 'lightningBoots horseshoeBalloons shieldCthulhu wormScarf feralClaws boneGlove',
    'Entry gear after Skeletron. Bone Glove is guaranteed from his Master bag. Find Muramasa inside to complete Night’s Edge; it is a reward for this visit, not an entry requirement.', [crimson()]),
  ranged: build('fossilArmor', 'moltenFury beesKnees boomstick', 'lightningBoots horseshoeBalloons shieldCthulhu wormScarf sharkTooth boneGlove',
    'Enter in Fossil armor, then craft Necro armor as you collect Bones. Find a Handgun to upgrade into Phoenix Blaster.', [crimson()], {
      beesKnees: note('Optional Queen Bee reward', 'Use Wooden Arrows; keep Molten Fury if you skipped Queen Bee.'),
    }),
  mage: build('jungleArmor meteorArmor', 'demonScythe spaceGun', 'lightningBoots horseshoeBalloons shieldCthulhu wormScarf manaRegenBand magnetFlower',
    'These weapons are available before entering. Water Bolt, Magic Missile, and other Dungeon weapons are upgrades to collect during the visit.', [crimson(), swap('boneGlove', 'magnetFlower', 'Use with Meteor armor + Space Gun, where automatic mana potions are unnecessary.')], {
      meteorArmor: note('Pair with', 'Space Gun; otherwise use Jungle armor for your magic weapons.'),
    }),
  summoner: build('beeArmor obsidianArmor', 'impStaff vampireFrog snapthorn', 'lightningBoots horseshoeBalloons shieldCthulhu wormScarf pygmyNecklace feralClaws',
    'Enter with your Skeletron equipment. Craft Spinal Tap from Bones and Cobwebs, and look for Silver Bracer to support a second whip tag.', [crimson(), swap('boneGlove', 'pygmyNecklace', 'Use if Queen Bee is still unbeaten and the Witch Doctor is unavailable.')]),
}

const wall = {
  melee: build('moltenArmor', 'nightsEdge sunfury darkLance', 'lightningBoots horseshoeBalloons shieldCthulhu wormScarf feralClaws boneGlove',
    'Night’s Edge is the main recommendation: its large attack handles the Hungry while damaging the Wall. You still have six accessory slots for this fight; the Demon Heart comes afterward.', [crimson(), swap('obsidianShield', 'horseshoeBalloons', 'A bridge-focused option for knockback immunity if you can give up the extra jump.')]),
  ranged: build('necroArmor', 'hellwingBow phoenixBlaster starCannon beenades', 'lightningBoots horseshoeBalloons shieldCthulhu wormScarf stingerNecklace boneGlove',
    'Hellwing Bow is the main piercing option. Phoenix Blaster is an alternative gun; Beenades are supplemental consumables, not something you must farm for every attempt.', [crimson(), swap('hivePack', 'stingerNecklace', 'For a Beenade-heavy fight; keep the necklace for the bow or gun setup.')], {
      hellwingBow: note('Ammo', 'Wooden Arrows produce piercing bats. Other arrow types lose the special bat conversion.'),
      phoenixBlaster: note('Ammo', 'Meteor Shot gives piercing against the Hungry. Aim through them toward the Wall.'),
      starCannon: note('Ammo', 'Fallen Stars. Strong piercing, but bring enough to finish the fight.'),
    }),
  mage: build('jungleArmor meteorArmor', 'demonScythe waterBolt flamelash spaceGun', 'lightningBoots horseshoeBalloons shieldCthulhu wormScarf restorationShield magnetFlower',
    'Demon Scythe is the primary recommendation for piercing through the Hungry. Use Jungle armor for it; Meteor armor with Space Gun is the lower-maintenance fallback.', [crimson(), swap('boneGlove', 'magnetFlower', 'For the zero-mana Meteor armor + Space Gun setup.')], {
      waterBolt: note('Alternative', 'Use if your Dungeon supplied it; bouncing projectiles depend on nearby terrain.'),
      meteorArmor: note('Pair with', 'Space Gun. It does not remove Demon Scythe’s mana cost.'),
    }),
  summoner: build('obsidianArmor beeArmor', 'vampireFrog impStaff flinxStaff spinalTap snapthorn', 'lightningBoots horseshoeBalloons shieldCthulhu wormScarf pygmyNecklace silverShield',
    'Use Spinal Tap to cut through the Hungry and tag the Wall. Frog/Flinx need reachable ground; keep an Imp for coverage. Obsidian armor supports whipping, while Bee armor adds a minion.', [crimson(), swap('feralClaws', 'silverShield', 'For a simpler Spinal Tap-only build. Without the extra tag slot, do not assume two different whip tags stack.')], {
      snapthorn: note('Pair with', 'Silver Shield lets Snapthorn’s tag coexist with Spinal Tap’s. Refresh it when practical; Spinal Tap remains the main whip.'),
      silverShield: note('Why this slot', 'Desktop 1.4.5.7 requires extra tag slots to stack different whip tags.'),
    }),
}

const mechanicals = {
  melee: build('adamantiteArmor titaniumArmor', 'shadowflameKnife bananarang chainGuillotines amarok', 'wingsEarly amphibianBoots shieldCthulhu warriorEmblem powerGlove wormScarf charmMyths',
    'Wear the melee helmet. Start with mobile projectile weapons rather than trying to facetank a Master boss. Consume the Demon Heart for the seventh slot. After a first mechanical kill, Hallowed armor and Excalibur are available; True Night’s Edge and Fire Gauntlet need all three.', [crimson(), boots(), swap('yoyoBag', 'charmMyths', 'Only for Amarok or another yoyo. Use the normal build for knives, boomerangs, or blades.')], {
      shadowflameKnife: note('Primary option', 'Hardmode Goblin Warlock drop; effective for Twins and Prime while moving.'),
      bananarang: note('Alternative farm', 'From Clowns in a Hardmode Blood Moon. Works as a projectile option if the Goblin drop is unavailable.'),
      chainGuillotines: note('Corruption option', 'Corrupt Mimic drop; do not require it in a Crimson world.'),
      amarok: note('Yoyo variant', 'Equip Yoyo Bag in the swap below. Do not leave it equipped for the other weapons.'),
    }),
  ranged: build('adamantiteArmor titaniumArmor', 'daedalus onyxBlaster dartRifle dartPistol', 'wingsEarly amphibianBoots shieldCthulhu rangerEmblem wormScarf stingerNecklace charmMyths',
    'Wear the ranged helmet. The base accessories work with guns and darts; use the quiver swap for Stormbow. Defeating the Destroyer lets you craft Megashark for the other two; Prime unlocks Flamethrower. Hallowed armor becomes an option after your first mechanical kill.', [crimson(), boots(), swap('phoenixQuiver', 'stingerNecklace', 'For Daedalus Stormbow. Use Magic or Molten Quiver until you have the Harpy Charm upgrade.')], {
      daedalus: note('Destroyer / ammo', 'Piercing Unholy Arrows work well on its segments. Holy Arrows are another option; this bow needs clear overhead space.'),
      onyxBlaster: note('Twins / Prime', 'Use Crystal Bullets for single-target damage; Ichor Bullets are a Crimson alternative.'),
      dartRifle: note('Corruption option', 'Cursed Darts are useful for spreading damage across the Destroyer; it is immune to ordinary debuffs.'),
      dartPistol: note('Crimson option', 'Ichor Darts split into several projectiles. Ichor helps against Twins and Prime, but cannot debuff the Destroyer.'),
    }),
  mage: build('adamantiteArmor titaniumArmor', 'skyFracture spiritFlame lifeDrain nimbusRod goldenShower', 'wingsEarly amphibianBoots shieldCthulhu sorcererEmblem wormScarf restorationShield manaCloak',
    'Wear the magic headpiece. Sky Fracture or Spirit Flame covers single targets; Life Drain and Nimbus Rod suit the Destroyer. After The Twins, Rainbow Rod is a useful upgrade for the others. Bring Mana Regeneration Potions and mana potions.', [crimson(), boots(), swap('charmMyths', 'manaCloak', 'A defensive alternative if you manage mana manually with the quick-mana key.')], {
      skyFracture: note('Twins / Prime', 'An aimed single-target option; requires a Magic Missile from the pre-Hardmode Dungeon.'),
      lifeDrain: note('Destroyer option', 'Crimson Mimic drop; can hit multiple segments. It is not available from Corrupt Mimics.'),
      nimbusRod: note('Supplemental damage', 'Place clouds where the Destroyer will pass, then return to your main weapon.'),
      goldenShower: note('Utility · Crimson', 'Refresh Ichor against Twins or Prime, then switch to your damage weapon. The Destroyer is immune.'),
    }),
  summoner: build('spiderArmor', 'ruinousStaff sanguineStaff bladeStaff firecracker coolWhip', 'wingsEarly amphibianBoots shieldCthulhu summonerEmblem pygmyNecklace twilightGrasp wormScarf',
    'Choose Ruinous/Sanguine with Firecracker, or Blade Staff with flat-tag whips. Spider Staff remains a starter while farming. Queen Slime and Dreadnautilus are optional farms. After your first mechanical kill, craft Durendal; Hallowed armor with its Hood is another upgrade.', [crimson(), boots(), swap('berserkerGlove', 'twilightGrasp', 'Crimson defensive option for a one-whip build. Do not keep stacking tags without the extra tag slots.')], {
      ruinousStaff: note('Pair with', 'Firecracker. Its heavy individual minion hits suit the explosion tag.'),
      sanguineStaff: note('Optional Dreadnautilus reward', 'Reliable tracking for flying targets. Pair with Firecracker; Ruinous Staff is the craftable alternative.'),
      bladeStaff: note('Optional Queen Slime reward', 'Use Cool Whip plus Snapthorn if desired and keep Twilight Grasp for multiple tags. Firecracker is a poor fit for its small hits.'),
      coolWhip: note('Use with', 'Blade Staff’s rapid hits. Also provides supplemental damage while working toward another minion.'),
    }),
}

const plantera = {
  melee: build('turtleArmor hallowedArmor', 'trueNightsEdge trueExcalibur chlorophyteClaymore yelets', 'wingsEarly amphibianBoots shieldCthulhu fireGauntlet warriorEmblem wormScarf charmMyths',
    'All three mechanical bosses are down, so True Night’s Edge and the Chlorophyte sword upgrades are now available. Turtle armor favors protection; Hallowed armor offers Holy Protection with its melee helmet.', [crimson(), boots(), swap('magicYoyoBag', 'charmMyths', 'Use with Yelets. Keep the normal accessory for sword builds.')], {
      yelets: note('Yoyo variant', 'Use Magic Yoyo Bag; Yoyo Bag works if you have not obtained Magic String.'),
      trueExcalibur: note('Alternative', 'Strong at closer range; use True Night’s Edge or Chlorophyte Claymore when keeping more distance.'),
    }),
  ranged: build('hallowedArmor chlorophyteArmor', 'megashark flamethrower shotbow', 'wingsEarly amphibianBoots shieldCthulhu rangerEmblem avengerEmblem wormScarf charmMyths',
    'Choose the ranged headpiece. Megashark is the flexible main weapon; Flamethrower is excellent when Plantera and its tentacles stay within the flames.', [crimson(), boots(), swap('phoenixQuiver', 'charmMyths', 'For Chlorophyte Shotbow; keep the base build for Megashark or Flamethrower.')], {
      megashark: note('Ammo', 'Crystal Bullets for damage. Chlorophyte Bullets trade some output for reliable hits while dodging.'),
      flamethrower: note('Ammo / range', 'Gel. Crafting requires Skeletron Prime’s Souls of Fright; fight at flame range without touching Plantera.'),
      shotbow: note('Bow variant', 'Holy or Ichor Arrows, plus the Phoenix Quiver swap. Do not put a quiver on the gun/flame setup.'),
    }),
  mage: build('hallowedArmor chlorophyteArmor', 'venomStaff rainbowRod skyFracture goldenShower', 'wingsEarly amphibianBoots shieldCthulhu celestialEmblem restorationShield manaCloak wormScarf',
    'Wear the magic headpiece. Venom Staff is now craftable with Chlorophyte; Rainbow Rod provides tracking while you dodge. Hallowed armor is a strong defensive choice.', [crimson(), boots(), swap('charmMyths', 'manaCloak', 'Use if you prefer manual mana potions and more healing uptime.')], {
      venomStaff: note('Primary option', 'Use at a distance where several projectiles connect. Requires Poison Staff plus Chlorophyte Bars.'),
      goldenShower: note('Utility · Crimson', 'Apply Ichor, then switch to Venom Staff or Rainbow Rod for damage.'),
    }),
  summoner: build('hallowedArmor', 'bladeStaff sanguineStaff ruinousStaff durendal firecracker', 'wingsEarly amphibianBoots shieldCthulhu pygmyNecklace summonerEmblem twilightGrasp wormScarf',
    'Use Hallowed Hood, not a melee/ranged/magic headpiece. Durendal is an important post-mechanical upgrade in 1.4.5.7; the minion and whip should be chosen as a pair.', [crimson(), boots(), swap('berserkerGlove', 'wormScarf', 'Crimson-world defense and whip speed if you prefer it to the evil-boss accessory.')], {
      bladeStaff: note('Pair with', 'Durendal for its minion-triggered damage; add another flat tag only with Twilight Grasp equipped.'),
      sanguineStaff: note('Alternative route', 'Use Firecracker with its larger hits. Requires Dreadnautilus; Ruinous Staff is craftable.'),
      ruinousStaff: note('Pair with', 'Firecracker. Keep Durendal as an additional tag with Twilight Grasp.'),
      firecracker: note('Use with', 'Ruinous or Sanguine minions, rather than Blade Staff.'),
    }),
}

const dungeonLate = {
  melee: build('turtleArmor hallowedArmor', 'trueNightsEdge seedler chlorophyteClaymore', 'leafWings amphibianBoots shieldCthulhu fireGauntlet warriorEmblem wormScarf charmMyths',
    'Entry build for the newly strengthened Dungeon. Leaf Wings can now be bought in the Jungle at night. Paladin’s Hammer, Frozen Shield, and Master Ninja Gear are upgrades to find inside, not prerequisites.', [crimson(), boots()], {
      seedler: note('Plantera reward', 'Use if it dropped; the crafted swords work without repeating Plantera.'),
    }),
  ranged: build('shroomiteArmor hallowedArmor', 'megashark shotbow flamethrower', 'leafWings amphibianBoots shieldCthulhu rangerEmblem avengerEmblem wormScarf charmMyths',
    'Shroomite is available from the Truffle’s Autohammer after Plantera, before collecting any Dungeon loot. Use Hallowed armor if you have not set up that shop. Hunt Tactical Shotgun and Rifle Scope inside.', [crimson(), boots(), swap('phoenixQuiver', 'charmMyths', 'For Chlorophyte Shotbow; match Shroomite’s headpiece to arrows.')], {
      megashark: note('Ammo', 'Crystal Bullets; Chlorophyte Bullets are the homing alternative for awkward corridors.'),
      shotbow: note('Ammo', 'Holy or Ichor Arrows; use Shroomite Headgear and the quiver swap.'),
    }),
  mage: build('hallowedArmor chlorophyteArmor', 'venomStaff rainbowRod waspGun goldenShower', 'leafWings amphibianBoots shieldCthulhu celestialEmblem restorationShield manaCloak wormScarf',
    'Enter in your magic Hallowed or Chlorophyte set. Spectre armor requires Ectoplasm from this visit, so it is an upgrade target rather than entry gear.', [crimson(), boots()], {
      waspGun: note('Plantera reward', 'An optional crowd weapon if it dropped; Venom Staff and Rainbow Rod require no Dungeon revisit.'),
      goldenShower: note('Utility · Crimson', 'Apply Ichor to vulnerable enemies, then use your main weapon.'),
    }),
  summoner: build('tikiArmor hallowedArmor', 'pygmyStaff sanguineStaff vulgarFlower durendal firecracker', 'leafWings amphibianBoots shieldCthulhu pygmyNecklace summonerEmblem herculesBeetle twilightGrasp',
    'Tiki armor and Hercules Beetle are now available from the Witch Doctor (Jungle for the beetle). Use your previous minion if Plantera did not drop Pygmy Staff. Morning Star and Desert Tiger are goals inside the Dungeon.', [boots(), swap('brainConfusion', 'herculesBeetle', 'Crimson defensive swap; use Worm Scarf instead in a Corruption world.')], {
      pygmyStaff: note('Plantera reward', 'Durendal supports its minion hits. Your previous minions remain usable if this did not drop.'),
      vulgarFlower: note('Plantera reward', 'An upgrade for high-hit-damage minions. Keep Firecracker if it did not drop; add Durendal with Twilight Grasp.'),
      sanguineStaff: note('Pair with', 'Firecracker. Use Durendal as an additional tag with Twilight Grasp.'),
    }),
}

const golem = {
  melee: build('turtleArmor hallowedArmor', 'terraBlade seedler paladinsHammer trueNightsEdge', 'leafWings amphibianBoots masterNinja fireGauntlet warriorEmblem frozenShield charmMyths',
    'Turtle or melee Hallowed armor works for the first Golem. Beetle armor needs his Beetle Husks, so it comes afterward. Terra Blade is available now only if you already farmed a post-Plantera Solar Eclipse.', [boots(), swap('wormScarf', 'charmMyths', 'More damage reduction; Brain of Confusion is the Crimson alternative.')], {
      terraBlade: note('Optional early Eclipse', 'Requires a Broken Hero Sword from Mothron after Plantera. Use Seedler or True Night’s Edge if you have not done that event.'),
      paladinsHammer: note('Dungeon alternative', 'Piercing and returns through nearby targets. Requires farming Paladins; it is not a Golem drop.'),
    }),
  ranged: build('shroomiteArmor', 'tacticalShotgun venusMagnum shotbow', 'leafWings amphibianBoots masterNinja rangerEmblem avengerEmblem reconScope frozenShield',
    'Wear Shroomite Mask for the guns, or Headgear for the bow. Moving during a boss fight is normal; the set does not require you to stand still to make its base bonuses useful.', [boots(), swap('phoenixQuiver', 'avengerEmblem', 'For Chlorophyte Shotbow; keep the emblem for the guns.')], {
      tacticalShotgun: note('Ammo', 'Crystal Bullets are a strong match for Golem’s large body. Megashark remains a fallback if the Dungeon gun has not dropped.'),
      venusMagnum: note('Ammo / alternative', 'Crystal or Ichor Bullets. Requires a Plantera drop; you do not need it as well as Tactical Shotgun.'),
      shotbow: note('Bow variant', 'Holy or Ichor Arrows; use the quiver swap and Shroomite Headgear.'),
    }),
  mage: build('spectreArmor', 'infernoFork magnetSphere venomStaff', 'leafWings amphibianBoots masterNinja celestialEmblem manaCloak mysticArtsSash frozenShield',
    'Use Spectre Mask for damage. Spectre Hood is an optional healing tradeoff for this fight. Carry mana potions; keep a Mana Regeneration Potion active for sustained casting.', [boots(), swap('sorcererEmblem', 'frozenShield', 'More damage if you are comfortable giving up the shield’s protection.')], {
      magnetSphere: note('Supplemental weapon', 'Cast the sphere, then attack with Inferno Fork or Venom Staff while it fires.'),
      venomStaff: note('Fallback', 'Use if your Dungeon has not supplied Inferno Fork; its spread connects well with a large target.'),
    }),
  summoner: build('tikiArmor hallowedArmor', 'desertTiger pygmyStaff vulgarFlower durendal firecracker', 'leafWings amphibianBoots masterNinja pygmyNecklace summonerEmblem herculesBeetle twilightGrasp',
    'Tiki armor is the damage/minion-count option; Hallowed Hood retains Holy Protection. Desert Tiger is powerful but requires a rare Desert Key, so Pygmy Staff is the practical fallback.', [boots(), swap('frozenShield', 'herculesBeetle', 'A defensive option for surviving contact and reducing knockback.')], {
      desertTiger: note('Pair with', 'Vulgar Display of Flower; use Firecracker if Plantera did not drop the whip. Repeated summons strengthen one tiger.'),
      pygmyStaff: note('Pair with', 'Vulgar Display of Flower and Durendal tags, supported by Twilight Grasp.'),
      vulgarFlower: note('Plantera upgrade', 'Its petals scale with the triggering minion hit. Refresh it alongside Durendal; Firecracker is the fallback.'),
    }),
}

// Shared post-Golem starting equipment, deliberately without rewards from any grouped detour.
const detour = {
  melee: build('beetleArmor', 'possessedHatchet seedler paladinsHammer', 'steampunkWings amphibianBoots masterNinja fireGauntlet warriorEmblem celestialShell frozenShield',
    'Use Beetle Shell for defense or Scale Mail for damage. This starting kit needs Golem and Dungeon gear, but no Pumpkin/Frost Moon, Martian, Fishron, or Empress rewards.', [boots(), swap('wormScarf', 'warriorEmblem', 'A defensive Corruption option; Brain of Confusion fills the same role in Crimson.')], {
      possessedHatchet: note('Mobile option', 'Homing helps against airborne bosses. Seedler is a fallback if this did not drop from Golem.'),
      paladinsHammer: note('Crowds', 'Piercing is useful against clustered event enemies; switch to a tracking weapon for fast flying targets.'),
    }),
  ranged: build('shroomiteArmor', 'tacticalShotgun stynger venusMagnum shotbow', 'steampunkWings amphibianBoots masterNinja rangerEmblem destroyerEmblem reconScope frozenShield',
    'Match the Shroomite headpiece: Mask for bullets, Helmet for Stynger, Headgear for arrows. The starting kit does not assume weapons dropped by the events or optional bosses.', [boots(), swap('phoenixQuiver', 'destroyerEmblem', 'For Chlorophyte Shotbow. The base accessories support the gun and Stynger options.')], {
      tacticalShotgun: note('Ammo', 'Crystal Bullets for damage; Chlorophyte Bullets for fast targets you struggle to track.'),
      stynger: note('Crowds / large targets', 'Buy Stynger Bolts from the Witch Doctor while carrying the weapon. Use the Shroomite Helmet.'),
      shotbow: note('Bow alternative', 'Holy or Ichor Arrows with the quiver swap. Works if you have not obtained the Dungeon/Golem weapons.'),
    }),
  mage: build('spectreArmor', 'heatRay infernoFork magnetSphere', 'steampunkWings amphibianBoots masterNinja celestialEmblem manaCloak mysticArtsSash frozenShield',
    'Use Spectre Mask for damage, with Hood as an optional healing tradeoff. Heat Ray covers single targets; Inferno Fork and Magnet Sphere help with crowds. No optional-event reward is required to start.', [boots(), swap('sorcererEmblem', 'frozenShield', 'A damage-focused swap if you can give up the shield’s protection.')], {
      heatRay: note('Single targets', 'Golem drop; use Inferno Fork if you did not obtain it.'),
      magnetSphere: note('Supplemental damage', 'Cast it, then switch back to your main weapon while the sphere fires.'),
    }),
  summoner: build('tikiArmor hallowedArmor', 'desertTiger pygmyStaff vulgarFlower durendal firecracker', 'steampunkWings amphibianBoots masterNinja pygmyNecklace summonerEmblem herculesBeetle twilightGrasp',
    'Use Tiki armor for more minions or Hallowed Hood for Holy Protection. Start the detours with your Dungeon/Plantera kit; Spooky armor, scrolls, Xeno Staff, and Kaleidoscope are rewards to earn here.', [boots(), swap('frozenShield', 'herculesBeetle', 'A defensive alternative if the event or boss is killing you before your damage pays off.')], {
      desertTiger: note('Pair with', 'Vulgar Display of Flower, or Firecracker if Plantera did not drop it. Requires a Desert Key; Pygmy Staff is the easier fallback.'),
      pygmyStaff: note('Pair with', 'Vulgar Display of Flower and Durendal with Twilight Grasp for the extra tag slots.'),
      vulgarFlower: note('Plantera reward', 'A strong upgrade for large individual minion hits. This does not require a side event or optional boss.'),
    }),
}

const lateSwaps = (damageSlot, defensiveSlot) => [
  boots(),
  swap('fishronWings', 'steampunkWings', 'Optional Duke Fishron flight upgrade; keep the purchased wings if it has not dropped.'),
  swap('soaringInsignia', 'amphibianBoots', 'After Empress of Light, trade the running boots for infinite wing flight. Keep wings equipped.'),
  swap('wormScarf', defensiveSlot, 'Corruption defensive alternative; Brain of Confusion is the Crimson option.'),
  ...(damageSlot ? [swap('celestialShell', damageSlot, 'A balanced damage, defense, and regeneration option in place of the class emblem.')] : []),
]
const cultist = {
  melee: build('beetleArmor', 'terraBlade influxWaver possessedHatchet eyeYoyo flyingDragon', 'steampunkWings amphibianBoots masterNinja fireGauntlet warriorEmblem celestialShell frozenShield',
    'Choose Beetle Shell for defense or Scale Mail for damage. Aim at the real Cultist; accurate manual attacks help avoid the clones. Optional-detour weapons are upgrades, not requirements.', [...lateSwaps(null, 'warriorEmblem'), swap('magicYoyoBag', 'warriorEmblem', 'Only for The Eye of Cthulhu yoyo; use the emblem for swords and other melee weapons.')], {
      terraBlade: note('Requires an Eclipse', 'Craft after obtaining a Broken Hero Sword from post-Plantera Mothron.'),
      influxWaver: note('Optional Martian reward', 'Strong aimed attacks. Use Possessed Hatchet or your existing sword if you skipped Martian Madness.'),
      possessedHatchet: note('Golem fallback', 'Usable if you skipped detours; control which enemy you are targeting when clones appear.'),
      eyeYoyo: note('Optional Eclipse reward', 'Equip the Magic Yoyo Bag swap. This is the yoyo, not the early boss summon.'),
      flyingDragon: note('Optional Betsy reward', 'A powerful aimed projectile option if you completed Old One’s Army III.'),
    }),
  ranged: build('shroomiteArmor', 'xenopopper tacticalShotgun tsunami eventide', 'steampunkWings amphibianBoots masterNinja rangerEmblem reconScope destroyerEmblem frozenShield',
    'Use Shroomite Mask for the guns and Headgear for bows. Tactical Shotgun is the Dungeon fallback if you skipped optional bosses/events. Aim at the real Cultist; do not build around Ichor, to which he is immune.', [...lateSwaps('rangerEmblem', 'destroyerEmblem'), swap('phoenixQuiver', 'destroyerEmblem', 'For Tsunami or Eventide. Keep the emblem for guns.')], {
      xenopopper: note('Optional Martian reward', 'Crystal Bullets for aimed damage. Chlorophyte Bullets help tracking but can make clone targeting less predictable.'),
      tacticalShotgun: note('Fallback / ammo', 'Crystal Bullets; you can use this without completing optional boss detours.'),
      tsunami: note('Optional Fishron reward', 'Holy Arrows for damage; use the quiver swap and Shroomite Headgear.'),
      eventide: note('Optional Empress reward', 'Wooden Arrows activate its special projectiles. Use the quiver swap.'),
    }),
  mage: build('spectreArmor', 'razorpine razorTyphoon heatRay nightglow', 'steampunkWings amphibianBoots masterNinja celestialEmblem manaCloak mysticArtsSash frozenShield',
    'Spectre Mask is the damage default. Razorpine, Razorblade Typhoon, and Nightglow need optional encounters; Heat Ray is the Golem fallback. Ordinary debuffs such as Ichor do not work on the Cultist.', lateSwaps(null, 'frozenShield'), {
      razorpine: note('Optional Frost Moon reward', 'Aim its needles at the real Cultist; keep mana regeneration and potions ready.'),
      razorTyphoon: note('Optional Fishron reward', 'Homing is convenient but be deliberate around the clone phase.'),
      nightglow: note('Optional Empress reward', 'Another tracking option; Heat Ray is available without the detour.'),
    }),
  summoner: build('spookyArmor tikiArmor', 'xenoStaff ravenStaff pygmyStaff kaleidoscope morningStar', 'steampunkWings amphibianBoots masterNinja papyrusScarab necromanticScroll summonerEmblem twilightGrasp',
    'Spooky armor and both scroll accessories require Pumpkin Moon. Tiki armor and the swaps below keep this build usable if you skipped it. Xeno Staff and Kaleidoscope are optional upgrades; whip the real Cultist to focus your minions.', [
      ...lateSwaps(null, 'summonerEmblem'),
      swap('herculesBeetle', 'papyrusScarab', 'If you have not obtained a Necromantic Scroll from Mourning Wood.'),
      swap('pygmyNecklace', 'necromanticScroll', 'If you skipped Pumpkin Moon or have only one scroll to craft Papyrus Scarab.'),
    ], {
      xenoStaff: note('Optional Martian reward', 'Reliable tracking for the moving Cultist; Pygmy Staff is the no-detour fallback.'),
      ravenStaff: note('Optional Pumpkin Moon reward', 'An alternative if you completed Pumpkin Moon but not Martian Madness.'),
      kaleidoscope: note('Optional Empress reward', 'Use with your minions. Twilight Grasp allows another whip tag alongside it.'),
      morningStar: note('Dungeon fallback', 'Use if you have not beaten Empress. Can also add a tag alongside Kaleidoscope with Twilight Grasp.'),
    }),
}

const pillarItemNotes = {
  melee: { possessedHatchet: note('Golem fallback', 'Homing helps with scattered enemies if you skipped the optional events.') },
  ranged: { xenopopper: note('Optional Martian reward', 'Crystal Bullets for aimed damage, or Chlorophyte Bullets for tracking scattered enemies.') },
  mage: {
    razorpine: note('Optional Frost Moon reward', 'Focus priority targets with the needles; keep mana regeneration and potions ready.'),
    razorTyphoon: note('Optional Fishron reward', 'Homing and piercing are useful against groups around the pillars.'),
  },
  summoner: { xenoStaff: note('Optional Martian reward', 'Reliable tracking for flying enemies. Use your whips to focus dangerous targets.') },
}
// Pillars reuse the available pre-Cultist equipment, but get their own fight-specific advice.
const pillars = Object.fromEntries(Object.entries(cultist).map(([classId, kit]) => [classId, {
  ...kit,
  itemNotes: { ...kit.itemNotes, ...pillarItemNotes[classId] },
  notes: {
    melee: 'Start with your pre-Cultist equipment. Terra Blade and Influx Waver handle crowds; be careful with attacks near Selenians because they can reflect projectiles while spinning. After Solar falls, craft Daybreak or Solar Eruption for the remaining pillars.',
    ranged: 'Start with your gun or bow setup and match Shroomite’s headpiece. Piercing and area damage help with crowds. Once Vortex falls, craft Phantasm or Vortex Beater; they are not needed to clear the first pillar.',
    mage: 'Spectre Mask for damage; Hood can help recover between groups at a damage cost. Razorblade Typhoon is a useful optional crowd weapon, while Heat Ray works without Fishron loot. Craft Nebula weapons after clearing that pillar.',
    summoner: 'Start with your existing minions and tag-whip setup. Clear Stardust to craft Dragon or Cell Staff and Constellation for the other pillars. Stardust armor still requires defeating Moon Lord.',
  }[classId],
}]))

const moon = {
  melee: build('beetleArmor', 'daybreak solarEruption', 'steampunkWings amphibianBoots masterNinja fireGauntlet warriorEmblem celestialShell frozenShield',
    'Use Beetle Shell for a forgiving first clear, or Scale Mail for damage. Daybreak lets you keep distance; Solar Eruption requires closer range. Solar armor is not available until after this fight. Moon Bite prevents Vampire Knives healing.', lateSwaps(null, 'warriorEmblem'), {
      daybreak: note('Primary weapon', 'Keep spears embedded in the eye you are focusing. Craft from Solar Fragments after the pillar.'),
      solarEruption: note('Close-range alternative', 'Useful when several parts are within reach; do not chase contact range at the expense of dodging.'),
    }),
  ranged: build('shroomiteArmor', 'phantasm vortexBeater', 'steampunkWings amphibianBoots masterNinja rangerEmblem phoenixQuiver reconScope frozenShield',
    'The default is a Phantasm bow build with Shroomite Headgear. For Vortex Beater, change to Shroomite Mask and replace the quiver using the swap below. Vortex armor requires a Moon Lord kill.', [
      ...lateSwaps('rangerEmblem', 'frozenShield'), swap('destroyerEmblem', 'phoenixQuiver', 'Required build change for Vortex Beater: quivers only improve arrows.'),
    ], {
      phantasm: note('Ammo / pairing', 'Holy Arrows or Ichor Arrows, Shroomite Headgear, and Phoenix Quiver. Keep firing at a vulnerable eye to sustain the bow’s firing rate.'),
      vortexBeater: note('Gun alternative', 'Chlorophyte Bullets for reliable tracking, or Crystal Bullets if you can aim consistently. Use Mask and the Destroyer Emblem swap.'),
    }),
  mage: build('spectreArmor', 'nebulaBlaze razorTyphoon nebulaArcanum betsysWrath', 'steampunkWings amphibianBoots masterNinja celestialEmblem manaCloak mysticArtsSash frozenShield',
    'Wear Spectre Mask. Moon Bite blocks Spectre Hood healing, leaving its damage penalty without the usual benefit. Nebula armor requires Luminite after the first kill. Keep Mana Regeneration Potions and mana potions ready.', lateSwaps(null, 'frozenShield'), {
      spectreArmor: note('Use the Mask', 'Avoid relying on the Hood: Moon Bite disables its healing during the fight.'),
      nebulaBlaze: note('Primary option', 'Fast homing projectiles suit exposed eyes. Crafted from Nebula Fragments.'),
      razorTyphoon: note('Optional Fishron alternative', 'Reliable tracking if you already have it; a Fishron kill is not required for Nebula Blaze.'),
      nebulaArcanum: note('Situational option', 'Slow projectiles need time to reach a vulnerable part. Use Blaze when eyes are opening only briefly.'),
      betsysWrath: note('Optional support weapon', 'Apply Betsy’s Curse to a vulnerable part, then return to Nebula Blaze. Requires Betsy; it is not part of the pillar crafting route.'),
    }),
  summoner: build('spookyArmor tikiArmor', 'stardustDragon stardustCell constellation kaleidoscope firecracker', 'steampunkWings amphibianBoots masterNinja papyrusScarab necromanticScroll summonerEmblem twilightGrasp',
    'Choose Dragon or Cell Staff, then use Constellation to support minion hits. Spooky is the damage set; Tiki remains the fallback. Stardust armor is a post-Moon Lord reward, and daytime Empress/Terraprisma is not required.', [
      ...lateSwaps(null, 'summonerEmblem'),
      swap('herculesBeetle', 'papyrusScarab', 'If you skipped Pumpkin Moon; use Tiki armor too.'),
      swap('pygmyNecklace', 'necromanticScroll', 'If you lack a second scroll after crafting Papyrus Scarab.'),
    ], {
      stardustDragon: note('Pair with', 'Firecracker suits its large hits. Repeated summons lengthen the same dragon instead of creating separate dragons.'),
      stardustCell: note('Alternative minion', 'Use Constellation and flat-tag whips. Choose this route if you prefer its targeting over the Dragon.'),
      constellation: note('Lunar whip', 'Minion hits build cosmic energy; a follow-up whip hit releases it. Keep Twilight Grasp if combining its tag with other whips.'),
      kaleidoscope: note('Optional Empress upgrade', 'Use as another tag with Twilight Grasp. Constellation works without an Empress kill.'),
    }),
}

const byStage = {
  'pre-boss': preBoss,
  'pre-hardmode-optional': earlyOptional,
  'pre-skeletron': skeletron,
  'dungeon-pre-plantera': dungeonEarly,
  'pre-wof': wall,
  'pre-mechanicals': mechanicals,
  'pre-plantera': plantera,
  'dungeon-post-plantera': dungeonLate,
  'pre-golem': golem,
  'event-upgrades': detour,
  'optional-bosses': Object.fromEntries(Object.entries(detour).map(([classId, kit]) => [classId, {
    ...kit,
    ...(classId === 'summoner' ? {
      weapons: ids('sanguineStaff ruinousStaff desertTiger vulgarFlower durendal firecracker'),
      itemNotes: {
        sanguineStaff: note('Airborne targets', 'Optional Dreadnautilus reward with reliable tracking. Use Vulgar Display of Flower, or Firecracker if you lack it.'),
        ruinousStaff: note('Craftable alternative', 'Heavy minion hits pair with Vulgar Display of Flower or Firecracker. Requires no optional boss drop.'),
        desertTiger: note('Rare-key alternative', 'Use if you have the Desert Chest weapon. Its strong hits pair with Vulgar Display of Flower.'),
        vulgarFlower: kit.itemNotes.vulgarFlower,
      },
    } : {}),
    notes: `${kit.notes} For Fishron and nighttime Empress, prioritize tracking and mobility. Upgrade to their rewards after the first win; this is not a daytime Empress no-hit build.`,
  }])),
  'pre-lunatic': cultist,
  'celestial-pillars': pillars,
  'pre-moon-lord': moon,
}


// Choices share one equipped slot. Keep baseline IDs for counts and replacement targets.
const withAccessoryChoices = kit => {
  const accessoryChoices = {}
  const add = (slot, label, options, text) => {
    if (kit.accessories.includes(slot)) accessoryChoices[slot] = { label, ids: options, text }
  }
  for (const slot of ['wormScarf', 'brainConfusion']) {
    add(slot, 'World evil · choose one', ['wormScarf', 'brainConfusion'],
      'Worm Scarf: Corruption damage reduction. Brain of Confusion: Crimson dodge chance. Use the one from your world; this is one slot.')
  }
  add('horseshoeBalloons', 'Jumps · choose one', ['horseshoeBalloons', 'cloudBalloon'],
    'The bundle is the upgrade target. Keep Cloud in a Balloon while collecting the other balloons and Lucky Horseshoe; the base balloon does not prevent fall damage.')
  add('magnetFlower', 'Mana support · choose one', ['magnetFlower', 'celestialCuffs', 'manaFlower'],
    'Magnet Flower: automatic potions and mana-star pickup. Celestial Cuffs: more maximum mana and mana when hit, with the same pickup range; use quick mana yourself. Mana Flower is the fallback without a Celestial Magnet. Do not take hits deliberately.')
  add('manaCloak', 'Mana support · choose one', ['manaCloak', 'magnetFlower', 'celestialCuffs'],
    'Mana Cloak adds stars when hit. Magnet Flower trades that for mana-star pickup range. Both automate potions. Celestial Cuffs favor maximum mana and pickup, but need manual quick mana.')
  return {
    accessoryChoices,
    accessorySwaps: kit.accessorySwaps.filter(swap => !accessoryChoices[swap.replaces]?.ids.includes(swap.id)),
  }
}

const headpieces = {
  adamantiteArmor: { melee: 'Helmet', ranged: 'Mask', mage: 'Headgear' },
  titaniumArmor: { melee: 'Mask', ranged: 'Helmet', mage: 'Headgear' },
  hallowedArmor: { melee: 'Mask', ranged: 'Helmet', mage: 'Headgear', summoner: 'Hood' },
  chlorophyteArmor: { melee: 'Mask', ranged: 'Helmet', mage: 'Headgear' },
}
export const loadouts = Object.entries(byStage).flatMap(([stageId, builds]) =>
  Object.entries(builds).map(([classId, kit]) => ({
    classId, stageId, ...kit,
    ...withAccessoryChoices(kit),
    itemNotes: {
      ...Object.fromEntries(kit.armor.filter(id => headpieces[id]?.[classId]).map(id => [id, note('Headpiece', `Use the ${headpieces[id][classId]} for this class.`)])),
      ...kit.itemNotes,
    },
  })),
)

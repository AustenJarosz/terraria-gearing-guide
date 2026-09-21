import { items } from './items.js'
import { bossDrops } from './bossDrops.js'
import { dungeonDrops } from './dungeonDrops.js'
import { checklistEvents } from './checklistEvents.js'
import { preparationAcquisition } from './preparationItems.js'
import { weaponSupportAcquisition } from './weaponSupportItems.js'

const anvil = ['Iron Anvil', 'Lead Anvil']
const hardAnvil = ['Mythril Anvil', 'Orichalcum Anvil']
const altar = ['Demon Altar', 'Crimson Altar']
const workshop = ["Tinkerer's Workshop"]
const ancient = ['Ancient Manipulator']
const craft = (ingredients, stations = anvil, note) => ({ recipes: [{ ingredients, stations }], note })
const set = (ingredients, stations = anvil, note = 'Total materials for a full set with one headpiece. Craft each armor piece separately.') => ({ ...craft(ingredients, stations, note), heading: 'Full-set materials' })
const combine = (...ingredients) => craft(ingredients.map(name => [name, 1]), workshop)
const drops = (...rows) => ({ drops: rows.map(([enemy, rate, note]) => ({ enemy, rate, note })) })

export const gearAcquisition = {
  ...preparationAcquisition,
  ...weaponSupportAcquisition,
  trimarang: craft([['Enchanted Boomerang', 1], ['Shroomerang', 1], ['Ice Boomerang', 1]], ['Work Bench']),
  pyroclasticStone: { ...combine('Snapping Stone', 'Magma Stone'), note: 'Possible before any boss, but requires the Goblin Tinkerer’s workshop and difficult early materials. An optional upgrade, not required for the Eye.' },
  whiteString: craft([['Cobweb', 30]], ['Loom']),
  frostburnArrow: { recipes: [{ ingredients: [['Wooden Arrow', 10], ['Ice Torch', 1]], stations: ['By Hand'], quantity: 10 }] },
  musketBall: { vendor: 'Arms Dealer', note: 'Always available once the Arms Dealer moves in.' },
  mysticBloom: craft([["Nature's Gift", 1], ['Moonglow', 2], ['Vine', 3], ['Rich Mahogany', 7]]),
  horseshoeBalloons: { ...combine('Bundle of Balloons', 'Lucky Horseshoe'), note: 'Bundle of Balloons combines Cloud in a Balloon, Blizzard in a Balloon, and Sandstorm in a Balloon at the same workshop.' },
  magnetFlower: combine('Mana Flower', 'Celestial Magnet'),
  restorationShield: combine('Mana Regeneration Band', 'Cobalt Shield'),
  mysticArtsSash: combine('Mana Regeneration Band', 'Black Belt'),
  silverShield: combine('Silver Bracer', 'Obsidian Shield'),
  phoenixQuiver: combine('Molten Quiver', 'Harpy Charm'),
  vulgarFlower: drops(['Plantera', '12.5%', 'Treasure Bag weapon roll']),
  volcano: craft([['Hellstone Bar', 20]]),
  starCannon: craft([['Minishark', 1], ['Meteorite Bar', 20], ['Fallen Star', 5]]),
  beenades: { ...craft([['Grenade', 1], ['Bee Wax', 1]]), note: 'Also dropped by Queen Bee. This recipe makes one Beenade.' },
  flamethrower: craft([[['Iron Bar', 'Lead Bar'], 20], ['Illegal Gun Parts', 1], ['Soul of Fright', 20]], hardAnvil),
  spiritFlame: craft([['Desert Spirit Lamp', 1], ['Forbidden Fragment', 2], ['Soul of Night', 12]], hardAnvil),
  rainbowRod: craft([['Crystal Shard', 10], ['Unicorn Horn', 2], ['Pixie Dust', 10], ['Soul of Light', 8], ['Soul of Sight', 15]], hardAnvil),
  ruinousStaff: craft([['Dark Shard', 1], ['Light Shard', 1], ['Forbidden Fragment', 2], ['Soul of Night', 5], ['Soul of Light', 5]], hardAnvil),
  cloudBalloon: combine('Cloud in a Bottle', 'Shiny Red Balloon'),
  magiluminescence: craft([[['Demonite Bar', 'Crimtane Bar'], 12], ['Topaz', 5]]),
  bandStarpower: { ...craft([['Panic Necklace', 1], ['Mana Crystal', 1]], workshop, 'Graveyard biome required for this recipe. Also found in Shadow Orbs and Corruption fishing crates.') },
  stingerNecklace: combine('Shark Tooth Necklace', 'Honey Comb'),
  amphibianBoots: combine('Sailfish Boots', 'Frog Leg'),
  berserkerGlove: combine('Power Glove', 'Flesh Knuckles'),
  mechanicalGlove: combine('Power Glove', 'Avenger Emblem'),
  yoyoBag: { ...combine('Yoyo Glove', 'Strung Counterweight'), note: 'Make Strung Counterweight from White String + any Counterweight at the Workshop. Yoyo Glove is sold by the Skeleton Merchant in Hardmode.' },
  magicYoyoBag: { ...combine('Yoyo Bag', 'Magic String'), note: 'Magic String is sold by the Skeleton Merchant after any mechanical boss.' },
  steampunkWings: { vendor: 'Steampunker', note: 'Sold after Golem.' },
  herculesBeetle: { vendor: 'Witch Doctor', note: 'Sold in the Jungle after Plantera.' },
  chainGuillotines: drops(['Corrupt Mimic', '20%']),
  dartPistol: drops(['Crimson Mimic', '20%']),
  shackle: drops(['Zombie', '2%'], ['Raincoat Zombie', '2%'], ['Frozen Zombie', '2%']),
  platinumArmor: set([['Platinum Bar', 75]]),
  goldArmor: set([['Gold Bar', 75]]),
  fossilArmor: set([['Sturdy Fossil', 60]]),
  necroArmor: set([['Bone', 150], ['Cobweb', 135]], ['Work Bench']),
  shadowArmor: set([['Demonite Bar', 60], ['Shadow Scale', 45]]),
  crimsonArmor: set([['Crimtane Bar', 60], ['Tissue Sample', 45]]),
  moltenArmor: set([['Hellstone Bar', 45]]),
  jungleArmor: set([['Jungle Spores', 32], ['Stinger', 10], ['Vine', 2]]),
  meteorArmor: set([['Meteorite Bar', 45]]),
  beeArmor: set([['Bee Wax', 30]]),
  obsidianArmor: set([['Obsidian', 60], ['Silk', 30], [['Shadow Scale', 'Tissue Sample'], 20]], ['Hellforge']),
  flinxCoat: craft([['Silk', 10], ['Flinx Fur', 8], [['Gold Bar', 'Platinum Bar'], 8]], ['Loom']),
  adamantiteArmor: set([['Adamantite Bar', 54]], hardAnvil),
  titaniumArmor: set([['Titanium Bar', 59]], hardAnvil),
  forbiddenArmor: set([[['Adamantite Bar', 'Titanium Bar'], 46], ['Forbidden Fragment', 3]], hardAnvil),
  hallowedArmor: set([['Hallowed Bar', 54]], hardAnvil),
  chlorophyteArmor: set([['Chlorophyte Bar', 54]], hardAnvil),
  turtleArmor: set([['Chlorophyte Bar', 54], ['Turtle Shell', 3]], hardAnvil),
  beetleArmor: set([['Turtle Helmet', 1], ['Turtle Scale Mail', 1], ['Turtle Leggings', 1], ['Beetle Husk', 18]], hardAnvil, 'Total for a full set with either Beetle Scale Mail or Beetle Shell. Upgrade each Turtle piece separately.'),
  shroomiteArmor: set([['Shroomite Bar', 54]], hardAnvil, 'Full set with one headpiece. Make Shroomite Bars from Chlorophyte Bars and Glowing Mushrooms at an Autohammer.'),
  spectreArmor: set([['Spectre Bar', 54]], hardAnvil),
  tikiArmor: { vendor: 'Witch Doctor', note: 'Sold after Plantera. Buy the three armor pieces separately.' },
  spookyArmor: set([['Spooky Wood', 750]], ['Work Bench']),
  spiderArmor: set([['Spider Fang', 36]], hardAnvil),
  solarArmor: set([['Solar Fragment', 45], ['Luminite Bar', 36]], ancient),
  vortexArmor: set([['Vortex Fragment', 45], ['Luminite Bar', 36]], ancient),
  nebulaArmor: set([['Nebula Fragment', 45], ['Luminite Bar', 36]], ancient),
  stardustArmor: set([['Stardust Fragment', 45], ['Luminite Bar', 36]], ancient),
  amazon: craft([['Rich Mahogany', 8], ['Stinger', 12], ['Vine', 1], ['Jungle Spores', 9]]),
  enchantedBoomerang: craft([['Wooden Boomerang', 1], ['Fallen Star', 1]], ['By Hand']),
  lightsBane: craft([['Demonite Bar', 10]]),
  bloodButcherer: craft([['Crimtane Bar', 10]]),
  bladeOfGrass: craft([['Jungle Spores', 15], ['Stinger', 12], ['Vine', 3]]),
  hiveFive: craft([['Bee Wax', 14]]),
  thornChakram: craft([['Jungle Spores', 6], ['Stinger', 9]]),
  nightsEdge: craft([[['Light\'s Bane', 'Blood Butcherer'], 1], ['Muramasa', 1], ['Blade of Grass', 1], ['Volcano', 1]], altar),
  trueExcalibur: craft([['Excalibur', 1], ['Chlorophyte Bar', 24]], hardAnvil),
  trueNightsEdge: craft([["Night's Edge", 1], ['Soul of Fright', 20], ['Soul of Might', 20], ['Soul of Sight', 20]], hardAnvil),
  terraBlade: craft([["True Night's Edge", 1], ['True Excalibur', 1], ['Broken Hero Sword', 1]], hardAnvil),
  solarEruption: craft([['Solar Fragment', 18]], ancient),
  daybreak: craft([['Solar Fragment', 18]], ancient),
  goldBow: craft([['Platinum Bar', 7]]),
  moltenFury: craft([['Hellstone Bar', 15]]),
  phoenixBlaster: craft([['Handgun', 1], ['Hellstone Bar', 10]]),
  onyxBlaster: craft([['Shotgun', 1], ['Dark Shard', 2], ['Soul of Night', 10]], hardAnvil),
  megashark: craft([['Minishark', 1], ['Illegal Gun Parts', 1], ['Shark Fin', 5], ['Soul of Might', 20]], hardAnvil),
  shotbow: craft([['Chlorophyte Bar', 12]], hardAnvil),
  phantasm: craft([['Vortex Fragment', 18]], ancient),
  vortexBeater: craft([['Vortex Fragment', 18]], ancient),
  diamondStaff: craft([['Platinum Bar', 10], ['Diamond', 8]]),
  rubyStaff: craft([['Gold Bar', 10], ['Ruby', 8]]),
  spaceGun: craft([['Meteorite Bar', 20]]),
  skyFracture: craft([['Magic Missile', 1], ['Light Shard', 2], ['Soul of Light', 16]], hardAnvil),
  goldenShower: craft([['Spell Tome', 1], ['Ichor', 20], ['Soul of Night', 15]], ['Bookcase']),
  cursedFlames: craft([['Spell Tome', 1], ['Cursed Flame', 20], ['Soul of Night', 15]], ['Bookcase']),
  meteorStaff: craft([['Meteorite Bar', 20], ['Pixie Dust', 10], ['Soul of Light', 10]], hardAnvil),
  venomStaff: craft([['Poison Staff', 1], ['Chlorophyte Bar', 14]], hardAnvil),
  nebulaBlaze: craft([['Nebula Fragment', 18]], ancient),
  nebulaArcanum: craft([['Nebula Fragment', 18]], ancient),
  flinxStaff: craft([['Flinx Fur', 6], [['Gold Bar', 'Platinum Bar'], 10]], ['Work Bench']),
  hornetStaff: craft([['Bee Wax', 14]]),
  snapthorn: craft([['Stinger', 15], ['Vine', 3], ['Jungle Spores', 12]]),
  impStaff: craft([['Hellstone Bar', 17]]),
  spinalTap: craft([['Bone', 90], ['Cobweb', 55]], ['Work Bench']),
  spiderStaff: craft([['Spider Fang', 16]], hardAnvil),
  queenSpider: craft([['Spider Fang', 24]], hardAnvil),
  coolWhip: craft([['Soul of Light', 8], ['Soul of Night', 8], ['Frost Core', 1]], hardAnvil),
  opticStaff: craft([['Black Lens', 1], ['Lens', 2], ['Hallowed Bar', 12], ['Soul of Sight', 20]], hardAnvil),
  durendal: craft([['Hallowed Bar', 12]], hardAnvil),
  stardustDragon: craft([['Stardust Fragment', 18]], ancient),
  stardustCell: craft([['Stardust Fragment', 18]], ancient),
  spectreBoots: craft([[['Hermes Boots', 'Flurry Boots', 'Sailfish Boots', 'Dunerider Boots'], 1], ['Rocket Boots', 1]], workshop),
  lightningBoots: combine('Spectre Boots', 'Aglet', 'Anklet of the Wind'),
  obsidianShield: combine('Cobalt Shield', 'Obsidian Skull'),
  charmMyths: combine('Band of Regeneration', "Philosopher's Stone"),
  destroyerEmblem: combine('Avenger Emblem', 'Eye of the Golem'),
  avengerEmblem: craft([[['Warrior Emblem', 'Ranger Emblem', 'Sorcerer Emblem', 'Summoner Emblem'], 1], ['Soul of Might', 5], ['Soul of Sight', 5], ['Soul of Fright', 5]], workshop),
  powerGlove: combine('Titan Glove', 'Feral Claws'),
  fireGauntlet: combine('Mechanical Glove', 'Magma Stone'),
  wingsEarly: craft([['Ice Feather', 1], ['Soul of Flight', 20]], hardAnvil),
  frozenShield: combine("Paladin's Shield", 'Frozen Turtle Shell'),
  masterNinja: combine('Tiger Climbing Gear', 'Tabi', 'Black Belt'),
  reconScope: combine('Sniper Scope', 'Putrid Scent'),
  moltenQuiver: combine('Magic Quiver', 'Magma Stone'),
  celestialCuffs: combine('Magic Cuffs', 'Celestial Magnet'),
  manaFlower: combine("Nature's Gift", 'Mana Potion'),
  manaCloak: combine('Mana Flower', 'Star Cloak'),
  celestialEmblem: combine('Avenger Emblem', 'Celestial Magnet'),
  papyrusScarab: combine('Necromantic Scroll', 'Hercules Beetle'),
  celestialShell: combine('Celestial Stone', 'Moon Shell'),
  ankhShield: combine('Obsidian Shield', 'Ankh Charm'),
  manaRegenBand: combine('Band of Starpower', 'Band of Regeneration'),
  diamondRobe: craft([['Robe', 1], ['Diamond', 10]], ['Loom']),
  daybloomStaff: craft([['Daybloom', 3], ['Gel', 5], ['Wood', 12]], ['By Hand']),
  clayBud: craft([['Clay Block', 30], ['Lesser Healing Potion', 1], ['Daybloom', 1], ['Blinkroot', 1]], ['Furnace']),
  wickedClaws: combine('Wicked Armlet', 'Feral Claws'),
  twilightGrasp: combine('Silver Bracer', 'Wicked Armlet'),
  constellation: craft([['Stardust Fragment', 18]], ancient),
  chlorophyteSaber: craft([['Chlorophyte Bar', 12]], hardAnvil),
  chlorophyteClaymore: craft([['Chlorophyte Bar', 12]], hardAnvil),
  minishark: { vendor: 'Arms Dealer', note: 'Base price: 35 gold; NPC happiness changes the price.' },
  grayZap: { vendor: 'Traveling Merchant', note: 'Random stock before Hardmode, after an eligible early boss has been defeated.' },
  leatherWhip: { vendor: 'Zoologist', note: 'Requires 10% Bestiary completion. Price changes with happiness.' },
  leafWings: { vendor: 'Witch Doctor', note: 'In the Jungle at night, after Plantera. Base price: 1 platinum 50 gold.' },
  pygmyNecklace: { vendor: 'Witch Doctor', note: 'Sold at night; NPC happiness changes the price.' },
  fetidBaghnakhs: drops(['Crimson Mimic', '20%']),
  daedalus: drops(['Hallowed Mimic', '25%']),
  dartRifle: drops(['Corrupt Mimic', '20%']),
  lifeDrain: drops(['Crimson Mimic', '20%']),
  demonScythe: drops(['Demon', '2.86%'], ['Voodoo Demon', '2.86%']),
  nimbusRod: drops(['Angry Nimbus', '6.67%', 'Hardmode rain']),
  magicQuiver: drops(['Skeleton Archer', '1.25%', 'Hardmode Cavern layer']),
  iceSickle: drops(['Armored Viking', '1%', 'Hardmode Snow/Ice'], ['Ice Elemental', '1%', 'Hardmode Snow/Ice'], ['Ice Tortoise', '1%', 'Hardmode Snow/Ice'], ['Icy Merman', '1%', 'Hardmode Snow/Ice']),
}

// Reuse the same Master Mode rates shown in the checklist and Dungeon loot panels.
const normalize = name => name.replaceAll('’', "'").toLowerCase()
const byName = new Map()
const addDrop = (drop, enemy, method, note) => {
  const key = normalize(drop.name)
  const rows = byName.get(key) || []
  const row = { enemy: drop.enemy || enemy, rate: drop.rate, note: [drop.method || method, drop.note || note].filter(Boolean).join(' · ') }
  if (row.enemy && !rows.some(old => old.enemy === row.enemy && old.rate === row.rate && old.note === row.note)) rows.push(row)
  byName.set(key, rows)
}
const bosses = { 'pre-boss': 'Eye of Cthulhu', 'pre-skeletron': 'Skeletron', 'pre-wof': 'Wall of Flesh' }
for (const [stage, list] of Object.entries(bossDrops)) for (const row of list) addDrop(row, bosses[stage], bosses[stage] ? 'Treasure Bag' : undefined)
for (const groups of Object.values(dungeonDrops)) for (const group of groups) for (const enemy of group.enemies) for (const row of enemy.drops) addDrop(row, enemy.name)
for (const event of Object.values(checklistEvents)) for (const row of event.drops) addDrop(row, event.id === 'pirate-invasion' ? 'Flying Dutchman' : event.id === 'goblin-army-hardmode' ? 'Goblin Warlock' : undefined)
for (const [id, item] of Object.entries(items)) {
  if (gearAcquisition[id]) continue
  const rows = byName.get(normalize(item.name))
  gearAcquisition[id] = rows?.length ? { drops: rows } : { note: item.obtain }
}
// Water Bolt has both a world-object source and an enemy source.
gearAcquisition.waterBolt.note = 'Also found as a special blue book on Dungeon shelves below the surface.'

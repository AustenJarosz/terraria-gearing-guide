import { hardmodeDrops, hardmodeDropNotes } from './hardmodeDrops.js'
import { earlyOptionalDrops } from './prehardmodeOptional.js'
// Curated gear, crafting materials, pets and mounts. Omit routine currency, potions, trophies and relics.
// Include useful guaranteed equipment and progression rewards, not just rare drops.
// Each row records whether its roll comes from a bag or the boss itself.
const drop = (name, rate, kind, source, note, quantity) => ({ name, rate, kind, source, file: `${source}.png`, note, quantity, method: 'Treasure Bag' })
export const bossDrops = {
  ...earlyOptionalDrops,
  'evil-boss': [
    ...[
      drop('Worm Scarf', '100%', 'Accessory', 'Worm_Scarf'),
      drop('Demonite Ore', '100%', 'Material', 'Demonite_Ore', 'Corruption boss', '110–135'),
      drop('Shadow Scale', '100%', 'Material', 'Shadow_Scale', undefined, '30–50'),
      { ...drop("Eater’s Bone", '5%', 'Pet', 'Eaters_Bone'), source: 'Eater%27s_Bone' },
    ].map(item => ({ ...item, enemy: 'Eater of Worlds', method: 'Treasure Bag' })),
    { ...drop('Writhing Remains', '25%', 'Pet', 'Writhing_Remains'), enemy: 'Eater of Worlds', method: 'Master boss drop' },
    ...[
      drop('Brain of Confusion', '100%', 'Accessory', 'Brain_of_Confusion'),
      drop('Crimtane Ore', '100%', 'Material', 'Crimtane_Ore', 'Crimson boss', '110–135'),
      drop('Tissue Sample', '100%', 'Material', 'Tissue_Sample', undefined, '30–50'),
      drop('Bone Rattle', '5%', 'Pet', 'Bone_Rattle'),
    ].map(item => ({ ...item, enemy: 'Brain of Cthulhu', method: 'Treasure Bag' })),
    { ...drop('Brain in a Jar', '25%', 'Pet', 'Brain_in_a_Jar'), enemy: 'Brain of Cthulhu', method: 'Master boss drop' },
  ],
  'queen-slime': [
    ...[
      drop('Volatile Gelatin', '100%', 'Accessory', 'Volatile_Gelatin'),
      drop('Blade Staff', '33.33%', 'Summon weapon', 'Blade_Staff'),
      drop('Hook of Dissonance', '50%', 'Hook', 'Hook_of_Dissonance'),
      drop('Gelatinous Pillion', '50%', 'Mount', 'Gelatinous_Pillion'),
      ...['Hood', 'Shirt', 'Pants'].map(piece => drop(`Crystal Assassin ${piece}`, '66.67%', 'Armor', `Crystal_Assassin_${piece}`)),
    ].map(item => ({ ...item, enemy: 'Queen Slime', method: 'Treasure Bag' })),
    { ...drop('Regal Delicacy', '25%', 'Pet', 'Regal_Delicacy'), enemy: 'Queen Slime', method: 'Master boss drop' },
  ],
  'pre-boss': [
    drop('Shield of Cthulhu', '100%', 'Accessory', 'Shield_of_Cthulhu'),
    drop('Binoculars', '3.33%', 'Tool', 'Binoculars'),
    drop('Demonite Ore', '100%', 'Material', 'Demonite_Ore', 'Corruption world only', '30–90'),
    drop('Crimtane Ore', '100%', 'Material', 'Crimtane_Ore', 'Crimson world only', '30–90'),
    drop('Unholy Arrow', '100%', 'Ammunition', 'Unholy_Arrow', 'Available in either world evil', '20–50'),
    { ...drop('Suspicious Grinning Eye', '25%', 'Pet', 'Suspicious_Grinning_Eye'), method: 'Master boss drop' },
  ],
  'pre-skeletron': [
    drop('Bone Glove', '100%', 'Accessory', 'Bone_Glove'),
    drop('Book of Skulls', '33.33%', 'Magic weapon', 'Book_of_Skulls'),
    drop('Skeletron Hand', '33.33%', 'Hook', 'Skeletron_Hand'),
    { ...drop('Possessed Skull', '25%', 'Pet', 'Possessed_Skull'), method: 'Master boss drop' },
  ],
  'pre-wof': [
    drop('Demon Heart', '100%', 'Permanent upgrade', 'Demon_Heart', 'Only before you have consumed one · unlocks your seventh Master Mode accessory slot'),
    drop('Pwnhammer', '100%', 'Hammer', 'Pwnhammer', 'Breaks Demon and Crimson Altars to unlock Hardmode ores'),
    ...['Warrior', 'Ranger', 'Sorcerer', 'Summoner'].map(type => drop(`${type} Emblem`, '25%', 'Accessory', `${type}_Emblem`)),
    drop('Breaker Blade', '25%', 'Melee weapon', 'Breaker_Blade'),
    drop('Clockwork Assault Rifle', '25%', 'Ranged weapon', 'Clockwork_Assault_Rifle'),
    drop('Laser Rifle', '25%', 'Magic weapon', 'Laser_Rifle'),
    drop('Firecracker', '25%', 'Whip', 'Firecracker'),
    { ...drop('Goat Skull', '25%', 'Mount', 'Goat_Skull'), method: 'Master boss drop' },
  ],
  ...hardmodeDrops,
}
export const dropNotes = {
  'evil-boss': 'Eater of Worlds is the Corruption boss; Brain of Cthulhu is the Crimson boss. Material quantities are per Treasure Bag opened in Master Mode, excluding extra drops from segments or Creepers. Master pets roll separately on the boss.',
  'queen-slime': 'Each bag contains two different Crystal Assassin armor pieces. The mount, hook and Blade Staff roll separately. Regal Delicacy drops directly from the boss.',
  'king-slime': 'Each bag contains two different Ninja armor pieces. Master pets drop directly from the boss.',
  'queen-bee': 'Each bag rolls one of the three bee weapons. Bee Wax crafts Bee armor, Hornet Staff and Hive-Five. The Master pet drops directly from the boss.',
  deerclops: 'Each bag rolls one of Pew-matic Horn, Weather Pain, Houndius Shootius or Lucy the Axe. The Master pet drops directly from the boss.',
  ...hardmodeDropNotes,
  'pre-boss': 'The world’s evil determines the ore in each bag; you do not receive both in a normal world. The Master pet drops directly from the boss.',
  'pre-skeletron': 'The bag rolls one of Book of Skulls, Skeletron Hand or the omitted vanity mask. The pet rolls separately on the boss.',
  'pre-wof': 'Each bag contains one emblem and one weapon. The mount rolls separately on the boss.',
}

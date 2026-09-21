// Weapon-pairing additions for Desktop 1.4.5.7.
const item = (name, file, rarity, stats, info, obtain, wiki = name.replaceAll(' ', '_')) => ({ name, file: `${file}.png`, rarity, stats, info, obtain, source: `https://terraria.wiki.gg/wiki/${wiki}` })
const ammo = (name, file, rarity, info, obtain) => item(name, file, rarity, 'Ammunition', info, obtain)
export const weaponSupportItems = {
  strungCounterweight: item('Strung Counterweight', 'Strung_Counterweight', 'orange', 'Accessory · yoyos', 'Combines String range with a counterweight projectile. A pre-Hardmode upgrade; it does not create a second yoyo.', "Combine White String and any Counterweight at a Tinkerer's Workshop."),
  yoyoGlove: item('Yoyo Glove', 'Yoyo_Glove', 'light-red', 'Accessory · yoyos', 'Adds a second yoyo after hitting an enemy. Its effect is already included in Yoyo Bag and Magic Yoyo Bag.', 'Sold by the Skeleton Merchant in Hardmode.'),
  spectreStaff: item('Spectre Staff', 'Spectre_Staff', 'yellow', 'Magic · homing', 'Tracking projectiles let you concentrate on moving. A Dungeon alternative before the optional boss rewards.', 'Dropped by Ragged Casters in the post-Plantera Dungeon.'),
  kraken: item('Kraken', 'Kraken', 'yellow', 'Melee · yoyo', 'In 1.4.5.7, a whirlpool surrounds the yoyo and repeated hits release waves. Use a yoyo bag.', 'Dropped by Duke Fishron in 1.4.5.7; no longer a Dungeon drop.'),
  electricEel: item('Electric Eel', 'Electric_Eel', 'yellow', 'Summon · whip', 'Minion hits trigger its electric energy, which resonates with nearby enemies. Particularly useful against groups.', 'Dropped by Duke Fishron. Optional before the Celestial Pillars.'),
  silverBullet: ammo('Silver Bullet', 'Silver_Bullet', 'white', 'An early bullet upgrade over Musket Balls. Use the one matching your available metal; Tungsten Bullets fill the same role.', 'Craft 70 Musket Balls and a Silver Bar at an anvil, or buy during a Blood Moon in a Silver world.'),
  tungstenBullet: ammo('Tungsten Bullet', 'Tungsten_Bullet', 'white', 'An early bullet upgrade over Musket Balls. An alternative to Silver Bullets for Tungsten worlds.', 'Craft 70 Musket Balls and a Tungsten Bar at an anvil, or buy during a Blood Moon in a Tungsten world.'),
  woodenArrow: ammo('Wooden Arrow', 'Wooden_Arrow', 'white', 'Required for the special projectiles of The Bee’s Knees, Hellwing Bow and Eventide.', 'Craft Wood + Stone Block at a Work Bench, or buy from the Merchant.'),
  unholyArrow: ammo('Unholy Arrow', 'Unholy_Arrow', 'blue', 'Pierces multiple targets; useful with Stormbow against the Destroyer. Does not rely on a debuff.', 'Craft Wooden Arrows with a Worm Tooth or Vertebra at an anvil.'),
  holyArrow: ammo('Holy Arrow', 'Holy_Arrow', 'orange', 'Creates falling stars on impact. A general Hardmode bow option; effectiveness depends on where the stars land.', 'Craft 200 Wooden Arrows, 3 Pixie Dust and a Unicorn Horn at a Hardmode anvil.'),
  ichorArrow: ammo('Ichor Arrow', 'Ichor_Arrow', 'orange', 'Lowers the defense of susceptible enemies. The Destroyer and Lunatic Cultist are immune to Ichor.', 'Craft 150 Wooden Arrows with Ichor at a Hardmode anvil. Ichor comes from the Crimson.'),
  venomArrow: ammo('Venom Arrow', 'Venom_Arrow', 'orange', 'High direct damage; an option for multi-arrow bows even against enemies immune to venom.', 'Craft 35 Wooden Arrows and a Vial of Venom at a Hardmode anvil. The Witch Doctor sells the vial after Plantera.'),
  meteorShot: ammo('Meteor Shot', 'Meteor_Shot', 'blue', 'Can pierce one enemy or bounce once. Useful for shooting through the Hungry with Phoenix Blaster.', 'Craft 70 Musket Balls and a Meteorite Bar at an anvil.'),
  crystalBullet: ammo('Crystal Bullet', 'Crystal_Bullet', 'orange', 'Impact shards can hit the same target for extra damage. Useful against large or pursuing bosses.', 'Craft 100 Musket Balls and a Crystal Shard at a Hardmode anvil.'),
  ichorBullet: ammo('Ichor Bullet', 'Ichor_Bullet', 'orange', 'Lowers susceptible enemies’ defense. A Crimson alternative or support round; the Destroyer and Lunatic Cultist are immune.', 'Craft 150 Musket Balls and Ichor at a Hardmode anvil.'),
  chlorophyteBullet: ammo('Chlorophyte Bullet', 'Chlorophyte_Bullet', 'lime', 'Homing helps wide-spread guns connect while dodging. Requires all three mechanical bosses for normal Chlorophyte mining.', 'Craft 60 Musket Balls and a Chlorophyte Bar at a Hardmode anvil.'),
  nanoBullet: ammo('Nano Bullet', 'Nano_Bullet', 'orange', 'In 1.4.5.7, direct shots receive 25% extra combined gun-and-bullet damage. Bounces toward enemies after hitting a block, with reduced damage.', 'Craft 50 Empty Bullets and Nanites at a Work Bench. Nanites are sold by the Cyborg after Plantera.'),
  cursedDart: ammo('Cursed Dart', 'Cursed_Dart', 'orange', 'Pierces and leaves damaging flames. Good against the Destroyer’s segments even though it is immune to the debuff.', 'Craft a Cursed Flame into 100 darts at a Hardmode anvil; Corruption material.'),
  ichorDart: ammo('Ichor Dart', 'Ichor_Dart', 'orange', 'Splits into several darts and lowers susceptible enemies’ defense. Both Dart Rifle and Dart Pistol can use it.', 'Craft Ichor into 100 darts at a Hardmode anvil; Crimson material.'),
  crystalDart: ammo('Crystal Dart', 'Crystal_Dart', 'orange', 'Ricochets between targets or walls. Both dart weapons can use it, in either world evil.', 'Craft a Crystal Shard into 100 darts at a Hardmode anvil.'),
  gelAmmo: ammo('Gel', 'Gel', 'white', 'Ammunition for Flamethrower. Bullets, arrows and quivers do not improve the flame ammunition.', 'Dropped by most Slimes.'),
  styngerBolt: ammo('Stynger Bolt', 'Stynger_Bolt', 'pink', 'The Stynger uses these bolts, not arrows, bullets or ordinary rockets.', 'Sold by the Witch Doctor while carrying a Stynger.'),
  fallenStarAmmo: ammo('Fallen Star', 'Fallen_Star', 'blue', 'Star Cannon ammunition. Gather a full fight’s supply; a Mana Crystal cannot be used as ammunition.', 'Collect naturally falling stars at night.'),
}

const hardAnvil = ['Mythril Anvil', 'Orichalcum Anvil']
const anvil = ['Iron Anvil', 'Lead Anvil']
const recipe = (quantity, ingredients, stations = hardAnvil) => ({ recipes: [{ quantity, ingredients, stations }] })
export const weaponSupportAcquisition = {
  strungCounterweight: recipe(1, [['White String', 1], [['Black Counterweight', 'Blue Counterweight', 'Green Counterweight', 'Purple Counterweight', 'Red Counterweight', 'Yellow Counterweight'], 1]], ["Tinkerer's Workshop"]),
  yoyoGlove: { vendor: 'Skeleton Merchant', note: 'Sold in Hardmode. A component of Yoyo Bag; do not equip both for the same glove effect.' },
  silverBullet: recipe(70, [['Musket Ball', 70], ['Silver Bar', 1]], anvil),
  tungstenBullet: recipe(70, [['Musket Ball', 70], ['Tungsten Bar', 1]], anvil),
  woodenArrow: recipe(25, [['Any Wood', 1], ['Stone Block', 1]], ['Work Bench']),
  unholyArrow: { recipes: [
    { quantity: 20, ingredients: [['Wooden Arrow', 20], ['Worm Tooth', 1]], stations: anvil },
    { quantity: 10, ingredients: [['Wooden Arrow', 10], ['Vertebra', 1]], stations: anvil },
  ] },
  holyArrow: recipe(200, [['Wooden Arrow', 200], ['Pixie Dust', 3], ['Unicorn Horn', 1]]),
  ichorArrow: recipe(150, [['Wooden Arrow', 150], ['Ichor', 1]]),
  venomArrow: { ...recipe(35, [['Wooden Arrow', 35], ['Vial of Venom', 1]]), note: 'Vials of Venom are sold by the Witch Doctor only after Plantera.' },
  meteorShot: recipe(70, [['Musket Ball', 70], ['Meteorite Bar', 1]], anvil),
  crystalBullet: recipe(100, [['Musket Ball', 100], ['Crystal Shard', 1]]),
  ichorBullet: recipe(150, [['Musket Ball', 150], ['Ichor', 1]]),
  chlorophyteBullet: recipe(60, [['Musket Ball', 60], ['Chlorophyte Bar', 1]]),
  nanoBullet: { ...recipe(50, [['Empty Bullet', 50], ['Nanites', 1]], ['Work Bench']), note: 'Buy Empty Bullets from the Arms Dealer in Hardmode; buy Nanites from the Cyborg after Plantera.' },
  cursedDart: recipe(100, [['Cursed Flame', 1]]),
  ichorDart: recipe(100, [['Ichor', 1]]),
  crystalDart: recipe(100, [['Crystal Shard', 1]]),
  gelAmmo: { note: 'A common drop from most Slimes. Save a stack for Flamethrower.' },
  styngerBolt: { vendor: 'Witch Doctor', note: 'Only sold while a Stynger is in your inventory.' },
  fallenStarAmmo: { note: 'Gather Fallen Stars from the ground at night, before they disappear at dawn.' },
}

export const weaponSupportSpriteIds = {
  'Electric_Eel.png': 5478, 'Silver_Bullet.png': 278, 'Tungsten_Bullet.png': 4915, 'Ichor_Bullet.png': 1335,
  'Silver_Bar.png': 21, 'Tungsten_Bar.png': 705, 'Worm_Tooth.png': 69, 'Vertebra.png': 1330,
  'Black_Counterweight.png': 3309, 'Blue_Counterweight.png': 3310, 'Green_Counterweight.png': 3311,
  'Purple_Counterweight.png': 3312, 'Red_Counterweight.png': 3313, 'Yellow_Counterweight.png': 3314,
  'Yoyo_Glove.png': 3334, 'Strung_Counterweight.png': 5547, 'Spectre_Staff.png': 1446, 'Kraken.png': 3291,
  'Wooden_Arrow.png': 40, 'Unholy_Arrow.png': 47, 'Holy_Arrow.png': 516, 'Ichor_Arrow.png': 1334, 'Venom_Arrow.png': 1341,
  'Meteor_Shot.png': 234, 'Crystal_Bullet.png': 515, 'Chlorophyte_Bullet.png': 1179, 'Nano_Bullet.png': 1350,
  'Cursed_Dart.png': 3010, 'Ichor_Dart.png': 3011, 'Crystal_Dart.png': 3009, 'Gel.png': 23, 'Stynger_Bolt.png': 1261,
  'Empty_Bullet.png': 1432, 'Nanites.png': 1346,
}

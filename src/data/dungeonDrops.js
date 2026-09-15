// Desktop 1.4.5, Master Mode, ordinary worlds, base rates before luck.
// Enemy variants with identical loot share one filter. Sources are each enemy's Official Wiki page.
const drop = (name, rate, kind, quantity, note) => ({
  name, rate, kind, quantity, note, source: name.replaceAll(' ', '_'), file: `${name.replaceAll(' ', '_')}.png`,
})
const enemy = (name, drops, note) => ({ name, source: name.replaceAll(' ', '_'), drops, note })
const bones = [
  drop('Bone', '100%', 'Material', '2–6'),
  drop('Tally Counter', '1%', 'Accessory'),
  drop('Golden Key', '1.52%', 'Chest key'),
  drop('Bone Wand', '0.4%', 'Building tool'),
]
const skeletonExtras = [
  drop('Ancient Necro Helmet', '0.22%', 'Armor'),
  drop('Clothier Voodoo Doll', '0.33%', 'Accessory'),
]
const earlyEnemies = [
  enemy('Angry Bones', [...bones, ...skeletonExtras]),
  enemy('Dark Caster', [...bones, ...skeletonExtras]),
  enemy('Librarian Skeleton', [...bones, ...skeletonExtras]),
  enemy('Cursed Skull', [...bones, drop('Nazar', '1.99%', 'Accessory')]),
  enemy('Dungeon Slime', [drop('Golden Key', '100%', 'Chest key')]),
  enemy('Water Bolt Mimic', [drop('Water Bolt', '2.5%', 'Magic weapon')]),
]
const armoredDrops = [
  drop('Morning Star', '1%', 'Whip'),
  drop('Keybrand', '1%', 'Melee weapon'),
  drop('Magnet Sphere', '0.67%', 'Magic weapon'),
  drop('Wisp in a Bottle', '0.5%', 'Light pet'),
  drop('Bone Feather', '0.33%', 'Material', undefined, 'Crafts Bone Wings with Souls of Flight'),
]
const lateEnemies = [
  enemy('Paladin', [drop("Paladin's Hammer", '12.89%', 'Melee weapon'), drop("Paladin's Shield", '19%', 'Accessory')]),
  enemy('Bone Lee', [drop('Tabi', '15.97%', 'Accessory'), drop('Black Belt', '15.97%', 'Accessory')], 'Tabi + Black Belt + Tiger Climbing Gear craft Master Ninja Gear.'),
  enemy('Skeleton Sniper', [drop('Sniper Rifle', '15.97%', 'Ranged weapon'), drop('Rifle Scope', '15.97%', 'Accessory')]),
  enemy('Tactical Skeleton', [drop('Tactical Shotgun', '15.97%', 'Ranged weapon')]),
  enemy('Skeleton Commando', [drop('Rocket Launcher', '10.8%', 'Ranged weapon')]),
  enemy('Necromancer', [drop('Shadowbeam Staff', '9.75%', 'Magic weapon')]),
  enemy('Ragged Caster', [drop('Spectre Staff', '9.75%', 'Magic weapon')]),
  enemy('Diabolist', [drop('Inferno Fork', '9.75%', 'Magic weapon')]),
  enemy('Blue Armored Bones', [...armoredDrops, drop('Armor Polish', '1.99%', 'Accessory')]),
  enemy('Rusty Armored Bones', [...armoredDrops, drop('Adhesive Bandage', '1.99%', 'Accessory')]),
  enemy('Hell Armored Bones', [...armoredDrops]),
  enemy('Giant Cursed Skull', [drop('Shadow Jousting Lance', '7.84%', 'Melee weapon'), drop('Nazar', '1.99%', 'Accessory')]),
  enemy('Dungeon Spirit', [drop('Ectoplasm', '100%', 'Material', '1–2')], 'Ectoplasm drops from the Spirit itself, not directly from the enemy that releases it.'),
]
export const dungeonDrops = {
  'dungeon-pre-plantera': [{ name: 'Dungeon enemies', enemies: earlyEnemies }],
  'dungeon-post-plantera': [
    { name: 'Post-Plantera enemies', enemies: lateEnemies },
    { name: 'Returning enemies', enemies: earlyEnemies },
  ],
}

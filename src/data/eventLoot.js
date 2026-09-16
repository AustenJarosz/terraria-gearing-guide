// Master Mode in regular worlds. Sources and review notes: CONTENT_SOURCES.md.
const drops = (enemy, rows) => rows.map(([name, rate, kind, note, quantity]) => ({
  name, rate, kind, note, quantity, enemy, method: 'Direct drop',
  source: name.replaceAll(' ', '_'), file: `${name.replaceAll(' ', '_')}.png`,
}))

export const bloodMoonEarlyDrops = [
  ...drops('Blood Zombie & Drippler', [
    ['Money Trough', '1%', 'Storage', 'Summons a flying piggy bank; shares your Piggy Bank inventory.'],
    ['Shark Tooth Necklace', '1.33%', 'Accessory', 'Adds 5 armor penetration.'],
    ['Bloody Tear', '1%', 'Event summon'],
  ]),
  ...drops('Wandering Eye Fish & Zombie Merman', [
    ['Blood Rain Bow', '12.5%', 'Ranged weapon'],
    ['Vampire Frog Staff', '12.5%', 'Summon weapon'],
    ['Chum Caster', '12.5%', 'Fishing rod', 'Increases the chance of fishing up Blood Moon enemies.'],
    ['Money Trough', '6.67%', 'Storage', 'Portable access to your Piggy Bank inventory.'],
    ['Bloody Tear', '4%', 'Event summon'],
    ['Chum Bucket', '50%', 'Fishing consumable', undefined, '4–6'],
  ]),
]

export const bloodMoonHardmodeDrops = [
  ...bloodMoonEarlyDrops,
  ...drops('Clown', [
    ['Bananarang', '10%', 'Melee weapon'],
    ['KO Cannon', '20%', 'Melee weapon'],
    ['Trifold Map', '1.99%', 'Accessory', 'Confusion immunity; used to craft the Ankh Charm.'],
    ['Bloody Tear', '10%', 'Event summon'],
  ]),
  ...drops('Hemogoblin Shark', [
    ['Blood Thorn', '12.5%', 'Magic weapon'],
    ['Haemorrhaxe', '12.5%', 'Hamaxe'],
    ['Bloody Tear', '4%', 'Event summon'],
    ['Chum Bucket', '50%', 'Fishing consumable', undefined, '7–10'],
  ]),
  ...drops('Blood Eel', [
    ['Drippler Crippler', '12.5%', 'Melee weapon'],
    ['Haemorrhaxe', '12.5%', 'Hamaxe'],
    ['Bloody Tear', '4%', 'Event summon'],
    ['Chum Bucket', '50%', 'Fishing consumable', undefined, '7–10'],
  ]),
  ...drops('Dreadnautilus', [
    ['Sanguine Staff', '100%', 'Summon weapon'],
    ['Bloody Tear', '100%', 'Event summon'],
    ['Chum Bucket', '50%', 'Fishing consumable', undefined, '7–10'],
  ]),
]

export const darkMageDrops = drops('Dark Mage · tier 1', [
  ["Squire's Shield", '50%', 'Accessory', 'One of the two sentry accessories drops per kill.'],
  ["Apprentice's Scarf", '50%', 'Accessory', 'One of the two sentry accessories drops per kill.'],
  ['War Table', '100%', 'Buff station', 'Grants one extra sentry slot.'],
  ['Dragon Egg', '25%', 'Pet'],
  ['Gato Egg', '25%', 'Pet'],
  ["Dark Mage's Tome", '25%', 'Mount'],
])

export const ogreDrops = drops('Ogre · tier 2', [
  ["Huntress's Buckler", '25%', 'Accessory'],
  ["Monk's Belt", '25%', 'Accessory'],
  ...[
    ['Tome of Infinite Wisdom', 'Magic weapon'], ['Phantom Phoenix', 'Ranged weapon'],
    ['Brand of the Inferno', 'Melee weapon'], ['Sleepy Octopod', 'Melee weapon'], ['Ghastly Glaive', 'Melee weapon'],
  ].map(([name, kind]) => [name, '20%', kind, 'One of five weapons drops per kill.']),
  ['War Table', '50%', 'Buff station', 'Grants one extra sentry slot.'],
  ['Creeper Egg', '25%', 'Light pet'],
])

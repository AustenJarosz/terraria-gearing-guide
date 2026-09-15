export const earlyEncounters = [
  { id: 'king-slime', name: 'King Slime', next: 'Early mobility & summons', when: 'Early pre-Hardmode', source: 'King_Slime', rewards: {}, payoff: 'Royal Gel, a slime mount, and a chance at Slime Staff.' },
  { id: 'queen-bee', name: 'Queen Bee', next: 'Bee weapons & summoner upgrades', when: 'Suggested after the evil biome boss', source: 'Queen_Bee', rewards: { melee: ['beeKeeper', 'hiveFive'], ranged: ['beesKnees'], mage: ['beeGun'], summoner: ['beeArmor', 'hornetStaff'] }, payoff: 'Bee weapons, Hive Pack, and Bee Wax for crafted upgrades.' },
  { id: 'deerclops', name: 'Deerclops', next: 'Bone Helm, weapons & Chester', when: 'Mid-to-late pre-Hardmode', source: 'Deerclops', rewards: {}, payoff: 'Bone Helm, a sentry, and useful pet storage.' },
].map(encounter => ({ ...encounter, era: 'pre-hardmode', kind: 'Optional boss', optional: true, unlock: encounter.when, summon: 'Optional pre-Hardmode encounter.', prepare: 'Use the shared starter gear or any stronger equipment you already have.' }))

export const earlyOptionalStage = {
  id: 'pre-hardmode-optional', name: 'Optional bosses', next: 'King Slime, Queen Bee & Deerclops',
  era: 'pre-hardmode', kind: 'Optional bosses', optional: true,
  when: 'Optional upgrades throughout pre-Hardmode',
  prepare: 'King Slime can be fought early. The shared kit below is for Queen Bee and Deerclops after your evil biome boss; none of these bosses is required to continue.',
  encounters: earlyEncounters,
}

const group = (enemy, rows, method = 'Treasure Bag') => rows.map(([name, rate, kind, quantity, note]) => ({ name, rate, kind, quantity, note, enemy, method, source: name.replaceAll(' ', '_'), file: `${name.replaceAll(' ', '_')}.png` }))
export const earlyOptionalDrops = {
  'king-slime': [
    ...group('King Slime', [['Royal Gel', '100%', 'Accessory'], ['Slimy Saddle', '50%', 'Mount'], ['Slime Hook', '50%', 'Hook'], ['Slime Staff', '3.33%', 'Summon weapon'], ...['Ninja Hood', 'Ninja Shirt', 'Ninja Pants'].map(name => [name, '66.67%', 'Armor'])]),
    ...group('King Slime', [['Royal Delight', '25%', 'Pet']], 'Direct drop'),
  ],
  'queen-bee': [
    ...group('Queen Bee', [['Hive Pack', '100%', 'Accessory'], ['Bee Keeper', '33.33%', 'Melee weapon'], ["The Bee's Knees", '33.33%', 'Ranged weapon'], ['Bee Gun', '33.33%', 'Magic weapon'], ['Honey Comb', '33.33%', 'Accessory'], ['Beenade', '100%', 'Consumable weapon', '10–29'], ['Bee Wax', '100%', 'Material', '17–29'], ['Nectar', '11.11%', 'Pet'], ['Honeyed Goggles', '11.11%', 'Mount']]),
    ...group('Queen Bee', [['Sparkling Honey', '25%', 'Pet']], 'Direct drop'),
  ],
  deerclops: [
    ...group('Deerclops', [['Bone Helm', '100%', 'Accessory'], ['Pew-matic Horn', '25%', 'Ranged weapon'], ['Weather Pain', '25%', 'Magic weapon'], ['Houndius Shootius', '25%', 'Sentry'], ['Lucy the Axe', '25%', 'Axe'], ['Eye Bone', '33.33%', 'Pet', undefined, 'Chester provides access to Piggy Bank storage']]),
    ...group('Deerclops', [['Deerclops Eyeball', '25%', 'Pet']], 'Direct drop'),
  ],
}

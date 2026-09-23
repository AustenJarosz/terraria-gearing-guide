// Master Mode, normal worlds, Desktop 1.4.5.7. See CONTENT_SOURCES.md.
// Rows: [name, chance, type, optional quantity, optional condition].
// Each group records the actual enemy and whether loot comes from a bag or a kill.
const group = (enemy, method, rows) => rows.map(([name, rate, kind, quantity, note]) => ({
  name, rate, kind, quantity, note,
  enemy, method,
  source: name.replaceAll(' ', '_'),
  file: `${name.replaceAll(' ', '_')}.png`,
}))
const bag = (enemy, rows) => group(enemy, 'Treasure Bag', rows)
const kill = (enemy, rows) => group(enemy, 'Direct drop', rows)

// Enemy spawn gates apply to every reward in that enemy's filtered list.
// Source: https://terraria.wiki.gg/wiki/Solar_Eclipse
export const lootProgression = {
  'solar-eclipse': {
    Eyezor: 'Any Solar Eclipse',
    Vampire: 'Any Solar Eclipse',
    'Creature from the Deep': 'Any Solar Eclipse',
    Reaper: 'After all 3 mechanical bosses',
    Mothron: 'Post-Plantera',
    Butcher: 'Post-Plantera',
    'Deadly Sphere': 'Post-Plantera',
    'Dr. Man Fly': 'Post-Plantera',
    Nailhead: 'Post-Plantera',
    Psycho: 'Post-Plantera',
  },
}

export const hardmodeDrops = {
  'pre-mechanicals': [
    ...bag('The Destroyer', [
      ['Soul of Might', '100%', 'Material', '25–40'],
      ['Hallowed Bar', '100%', 'Material', '20–35'],
    ]),
    ...kill('The Destroyer', [['Deactivated Probe', '25%', 'Pet']]),
    ...bag('The Twins', [
      ['Soul of Sight', '100%', 'Material', '25–40'],
      ['Hallowed Bar', '100%', 'Material', '20–35'],
    ]),
    ...kill('The Twins', [['Pair of Eyeballs', '25%', 'Pet']]),
    ...bag('Skeletron Prime', [
      ['Soul of Fright', '100%', 'Material', '25–40'],
      ['Hallowed Bar', '100%', 'Material', '20–35'],
    ]),
    ...kill('Skeletron Prime', [['Robotic Skull', '25%', 'Pet']]),
  ],
  'pre-plantera': [
    ...bag('Plantera', [
      ['Temple Key', '100%', 'Progression item'],
      ['Spore Sac', '100%', 'Accessory'],
      ...['Grenade Launcher', 'Venus Magnum', 'Nettle Burst', 'Leaf Blower', 'Seedler', 'Flower Pow', 'Wasp Gun', 'Vulgar Display of Flower'].map(name => [name, '12.5%', 'Weapon', null, 'One of eight weapons per bag']),
      ['Rocket I', '12.5%', 'Ammunition', '50–149', 'Included when Grenade Launcher is rolled'],
      ['Pygmy Staff', '50%', 'Summon weapon'],
      ['Thorn Hook', '10%', 'Hook'],
      ['The Axe', '5%', 'Tool'],
      ['Seedling', '6.67%', 'Pet'],
    ]),
    ...kill('Plantera', [['Plantera Seedling', '25%', 'Pet']]),
  ],
  'pre-golem': [
    ...bag('Golem', [
      ['Shiny Stone', '100%', 'Accessory'],
      ['Beetle Husk', '100%', 'Material', '18–23'],
      ['Picksaw', '33.33%', 'Tool'],
      ['Mobius Strip', '16.67%', 'Accessory'],
      ...['Stynger', 'Possessed Hatchet', 'Sun Stone', 'Eye of the Golem', 'Heat Ray', 'Staff of Earth', 'Golem Fist'].map(name => [name, '14.29%', ['Sun Stone', 'Eye of the Golem'].includes(name) ? 'Accessory' : 'Weapon', null, 'One of seven main rewards per bag']),
      ['Stynger Bolt', '14.29%', 'Ammunition', '60–99', 'Included when Stynger is rolled'],
    ]),
    ...kill('Golem', [['Guardian Golem', '25%', 'Pet']]),
  ],
  'duke-fishron': [
    ...bag('Duke Fishron', [
      ...['Bubble Gun', 'Flairon', 'Razorblade Typhoon', 'Tempest Staff', 'Tsunami', 'Electric Eel', 'Kraken'].map(name => [name, '14.29%', 'Weapon', null, 'One of seven weapons per bag']),
      ['Fishron Wings', '10%', 'Wings'],
      ['Shrimpy Truffle', '100%', 'Mount'],
    ]),
    ...kill('Duke Fishron', [['Pork of the Sea', '25%', 'Pet']]),
  ],
  'empress-of-light': [
    ...bag('Empress of Light', [
      ...['Starlight', 'Nightglow', 'Eventide', 'Kaleidoscope'].map(name => [name, '25%', 'Weapon', null, 'One of four main weapons per bag']),
      ['Soaring Insignia', '100%', 'Accessory'],
      ['Empress Wings', '10%', 'Wings'],
      ['Stellar Tune', '5%', 'Magic weapon'],
      ['Rainbow Cursor', '5%', 'Utility'],
    ]),
    ...kill('Empress of Light', [
      ['Terraprisma', '100%*', 'Summon weapon', null, 'Only when all damage to Empress is dealt during daytime'],
      ['Jewel of Light', '25%', 'Light pet'],
    ]),
  ],
  'pre-lunatic': kill('Lunatic Cultist', [
    ['Ancient Manipulator', '100%', 'Crafting station'],
    ['Tablet Fragment', '25%', 'Pet'],
  ]),
  'celestial-pillars': [
    ...['Solar', 'Vortex', 'Nebula', 'Stardust'].flatMap(name => kill(`${name} Pillar`, [[`${name} Fragment`, '100%', 'Material', '24–100']])),
  ],
  'pre-moon-lord': [
    ...bag('Moon Lord', [
      ...['Meowmere', 'Terrarian', 'Star Wrath', 'S.D.M.G.', 'Celebration Mk2', 'Last Prism', 'Lunar Flare', 'Rainbow Crystal Staff', 'Lunar Portal Staff', 'Possession'].map(name => [name, '20%', 'Weapon', null, 'Two different weapons from the ten-weapon pool']),
      ['Luminite', '100%', 'Material', '90–110'],
      ['Gravity Globe', '100%', 'Accessory'],
      ['Celestial Starboard', '100%', 'Wings'],
      ['Suspicious Looking Tentacle', '100%', 'Light pet'],
      ['Portal Gun', '100%*', 'Tool', null, 'Only if no Portal Gun is in your inventory'],
      ['Meowmere Minecart', '10%', 'Minecart'],
    ]),
    ...kill('Moon Lord', [['Piece of Moon Squid', '25%', 'Pet']]),
  ],
  'old-ones-army': [
    ...kill('Dark Mage · tier 3', [
      ["Squire's Shield", '50%', 'Accessory', null, 'One of the two sentry accessories per kill'],
      ["Apprentice's Scarf", '50%', 'Accessory', null, 'One of the two sentry accessories per kill'],
      ['War Table', '25%', 'Buff station'],
      ['Dragon Egg', '8.33%', 'Pet'],
      ['Gato Egg', '8.33%', 'Pet'],
      ["Dark Mage's Tome", '25%', 'Mount'],
    ]),
    ...kill('Ogre · tier 3', [
      ["Huntress's Buckler", '8.33%', 'Accessory'],
      ["Monk's Belt", '8.33%', 'Accessory'],
      ...['Tome of Infinite Wisdom', 'Phantom Phoenix', 'Brand of the Inferno', 'Sleepy Octopod', 'Ghastly Glaive'].map(name => [name, '5%', 'Weapon']),
      ['War Table', '25%', 'Buff station'],
      ['Creeper Egg', '10%', 'Light pet'],
      ["Ogre's Club", '25%', 'Pet'],
    ]),
    ...bag('Betsy', [
      ...['Aerial Bane', 'Flying Dragon', "Betsy's Wrath", "Sky Dragon's Fury"].map(name => [name, '25%', 'Weapon', null, 'One of four weapons per bag']),
      ["Betsy's Wings", '25%', 'Wings'],
      ['Defender Medal', '100%', 'Upgrade currency', '30–49'],
    ]),
    ...kill('Betsy', [["Betsy's Egg", '25%', 'Pet']]),
  ],
  'martian-madness': [
    ...kill('Martian Saucer', [
      ...['Xenopopper', 'Xeno Staff', 'Laser Machinegun', 'Electrosphere Launcher', 'Influx Waver', 'Cosmic Car Key'].map(name => [name, '16.67%', name === 'Cosmic Car Key' ? 'Mount' : 'Weapon', null, 'One of six main rewards per Saucer']),
      ['Arc Surge', '2%', 'Magic weapon'],
      ['Cosmic Skateboard', '25%', 'Pet'],
    ]),
    ...kill('Common Martians', [
      ['Laser Drill', '0.13%', 'Tool'],
      ['Anti-Gravity Hook', '0.13%', 'Hook'],
      ['Charged Blaster Cannon', '0.13%', 'Magic weapon'],
    ]),
    ...kill('Scutlix Gunner', [
      ['Brain Scrambler', '3.33%', 'Mount', null, 'Kill the rider before its mount; otherwise it becomes a Ray Gunner'],
    ]).map(drop => ({ ...drop, source: 'Brain_Scrambler_(item)', file: 'Brain_Scrambler_(item).png' })),
  ],
  'pumpkin-moon': [
    ...kill('Mourning Wood', [
      ...['Spooky Hook', 'Spooky Twig', 'Stake Launcher', 'Cursed Sapling', 'Necromantic Scroll'].map((name, i) => [name, '5–20%', ['Hook', 'Material', 'Ranged weapon', 'Pet', 'Accessory'][i], null, 'Chance increases with wave']),
      ['Stake', '5–20%', 'Ammunition', '30–60', 'Included with Stake Launcher; wave-dependent'],
      ["Witch's Broom", '5–20%', 'Mount', null, 'Chance increases with wave'],
      ['Hexxed Branch', '6.25–25%', 'Mount', null, 'Chance increases with wave'],
      ['Spooky Wood', '100%', 'Material', '30–50'],
    ]),
    ...kill('Pumpking', [
      ...['Candy Corn Rifle', "Jack 'O Lantern Launcher", 'Black Fairy Dust', "The Horseman's Blade", 'Bat Scepter', 'Raven Staff', 'Dark Harvest', 'Spider Egg'].map((name, i) => [name, '6.25–12.5%', i === 2 ? 'Material' : i === 7 ? 'Pet' : 'Weapon', null, 'Chance increases with wave']),
      ['Candy Corn', '6.25–12.5%', 'Ammunition', '50–100', 'Included with Candy Corn Rifle; wave-dependent'],
      ["Explosive Jack 'O Lantern", '6.25–12.5%', 'Ammunition', '25–50', 'Included with its launcher; wave-dependent'],
      ['Pumpkin Scented Candle', '12.5–25%', 'Light pet', null, 'Chance increases with wave'],
    ]),
  ],
  'frost-moon': [
    ...kill('Everscream', [
      ...['Christmas Tree Sword', 'Christmas Hook', 'Razorpine'].map(name => [name, '6.22–31.11%', name === 'Christmas Hook' ? 'Hook' : 'Weapon', null, 'Chance increases with wave']),
      ['Festive Wings', '1.33–6.67%', 'Wings', null, 'Chance increases with wave'],
      ['Shrub Star', '5–25%', 'Pet', null, 'Chance increases with wave'],
    ]),
    ...kill('Santa-NK1', [
      ['Elf Melter', '12.5–50%', 'Ranged weapon', null, 'Chance increases with wave'],
      ['Chain Gun', '12.5–50%', 'Ranged weapon', null, 'Chance increases with wave'],
      ['Toy Tank', '6.25–25%', 'Mount', null, 'Chance increases with wave'],
    ]),
    ...kill('Ice Queen', [
      ...['Blizzard Staff', 'North Pole', 'Snowman Cannon'].map(name => [name, '15.56–31.11%', 'Weapon', null, '15.56% on waves 11–13; 31.11% from wave 14']),
      ['Reindeer Bells', '6.67%*', 'Mount', null, 'Wave 15 onwards only'],
      ["Baby Grinch's Mischief Whistle", '3.33–6.67%', 'Pet', null, '3.33% on waves 11–13; 6.67% from wave 14'],
      ['Frozen Crown', '12.5–25%', 'Pet', null, '12.5% on waves 11–13; 25% from wave 14'],
    ]),
  ],
  'solar-eclipse': [
    ...kill('Eyezor', [['Eye Spring', '10%', 'Pet']]),
    ...kill('Vampire', [
      ['Broken Bat Wing', '2.5%', 'Material'],
      ['Moon Stone', '5.63%', 'Accessory'],
      ['Amulet of the Night', '2.5%', 'Mount'],
    ]),
    ...kill('Creature from the Deep', [["Neptune's Shell", '3.96%', 'Accessory']]),
    ...kill('Reaper', [['Death Sickle', '4.94%', 'Melee weapon']]),
    ...kill('Mothron', [
      ['Broken Hero Sword', '43.75%', 'Material'],
      ['The Eye of Cthulhu', '55.56%', 'Melee weapon'],
      ['Mothron Wings', '9.75%', 'Wings'],
    ]),
    ...kill('Butcher', [["Butcher's Chainsaw", '4.94%', 'Tool / weapon']]),
    ...kill('Deadly Sphere', [['Deadly Sphere Staff', '6.56%', 'Summon weapon']]),
    ...kill('Dr. Man Fly', [['Toxic Flask', '4.94%', 'Magic weapon']]),
    ...kill('Nailhead', [
      ['Nail Gun', '7.84%', 'Ranged weapon'],
      ['Nail', '7.84%', 'Ammunition', '100–200', 'Included when Nail Gun drops'],
    ]),
    ...kill('Psycho', [['Psycho Knife', '4.94%', 'Melee weapon']]),
  ],
}

export const hardmodeDropNotes = {
  'pre-mechanicals': 'Each mechanical boss has its own Treasure Bag. Select a boss to see its drops.',
  'pre-plantera': 'Pygmy Staff is a separate roll from the eight-weapon pool. Temple Key unlocks the Jungle Temple.',
  'pre-golem': 'Picksaw and Mobius Strip roll separately from the seven main rewards.',
  'duke-fishron': 'Normal-world loot. Wings and Shrimpy Truffle are separate from the weapon roll.',
  'empress-of-light': 'Terraprisma has a daytime damage condition; it is not part of the nighttime bag weapon pool.',
  'celestial-pillars': 'Fragments drop from the destroyed pillar. Multiplayer adds 12–20 fragments per additional player. Craft fragment weapons afterwards; those weapons are not direct drops.',
  'pre-moon-lord': 'Moon Lord drops two distinct weapons per bag. These are victory rewards, not equipment for your first clear.',
  'pumpkin-moon': 'Ranges are per enemy kill across waves at neutral luck. Later waves improve the chance; these enemies do not drop Treasure Bags.',
  'frost-moon': 'Ranges depend on the wave at the time of the kill and assume neutral luck. These enemies do not drop Treasure Bags.',
  'martian-madness': 'Rates are per enemy defeated. Common Martians include Brain Scramblers, Gigazappers, Gray Grunts, Engineers, Officers, Walkers, Ray Gunners and Scutlix Gunners; spawned Tesla Turrets and the Scutlix mount do not share that loot.',
}

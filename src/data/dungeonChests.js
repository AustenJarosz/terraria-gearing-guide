// Desktop 1.4.5.7, ordinary worlds. See docs/DUNGEON_CONTENT.md for sources.
const item = (name, kind, rate, note) => ({ name, kind, rate, note, source: name.replaceAll(' ', '_'), file: `${name.replaceAll(' ', '_')}.png` })
const primary = (name, kind) => item(name, kind, '1 of 7')
const biome = (name, kind, chest, key, world) => ({ ...item(name, kind, '100%'), chest, key, world })

export const goldChestLoot = {
  primary: [
    primary('Muramasa', 'Melee · sword'),
    primary('Cobalt Shield', 'Accessory · knockback immunity'),
    primary('Aqua Scepter', 'Magic weapon'),
    primary('Blue Moon', 'Melee · flail'),
    primary('Magic Missile', 'Magic weapon'),
    primary('Valor', 'Melee · yoyo'),
    primary('Handgun', 'Ranged · gun'),
  ],
  secondary: [
    item('Shadow Key', 'Key', '33.33%*', 'Reusable key for Shadow Chests in the Underworld'),
    item('Ram Rune', 'Accessory', '12.5%*'),
    item('Silver Bracer', 'Summoner accessory', '25%'),
    item('Bone Welder', 'Crafting station', '12.5%'),
  ],
}

export const biomeChestLoot = [
  biome('Piranha Gun', 'Ranged · gun', 'Jungle Chest', 'Jungle Key'),
  biome('Scourge of the Corruptor', 'Melee weapon', 'Corruption Chest', 'Corruption Key', 'Corruption world'),
  biome('Vampire Knives', 'Melee · thrown knives', 'Crimson Chest', 'Crimson Key', 'Crimson world'),
  biome('Rainbow Gun', 'Magic weapon', 'Hallowed Chest', 'Hallowed Key'),
  biome('Staff of the Frost Hydra', 'Summon · sentry', 'Ice Chest', 'Frozen Key'),
  biome('Desert Tiger Staff', 'Summon · minion', 'Desert Chest', 'Desert Key'),
]

export const woodenChestLoot = [item('Golden Key', 'Key', '100%', 'One in each naturally generated wooden Dungeon chest')]

export const dungeonChestGroups = {
  'dungeon-pre-plantera': ['gold', 'wooden'],
  'dungeon-post-plantera': ['biome', 'gold', 'wooden'],
}

export const dungeonChestSpriteIds = {
  'Aqua_Scepter.png': 157, 'Blue_Moon.png': 163, 'Valor.png': 3317,
  'Shadow_Key.png': 329, 'Ram_Rune.png': 5465, 'Bone_Welder.png': 2192,
  'Piranha_Gun.png': 1156, 'Scourge_of_the_Corruptor.png': 1571,
  'Rainbow_Gun.png': 1260, 'Staff_of_the_Frost_Hydra.png': 1572,
}

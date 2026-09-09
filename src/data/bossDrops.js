// Curated gear, crafting materials, pets and mounts. Omit currency, potions, keys, trophies and relics.
// Keep guaranteed items only when they are standout build rewards.
// Rates are per bag; Pet/Mount entries here are direct boss drops.
const drop = (name, rate, kind, source, note, quantity) => ({ name, rate, kind, source, file: `${source}.png`, note, quantity })
export const bossDrops = {
  'pre-boss': [
    drop('Shield of Cthulhu', '100%', 'Accessory', 'Shield_of_Cthulhu'),
    drop('Binoculars', '3.33%', 'Tool', 'Binoculars'),
    drop('Demonite Ore', '100%', 'Material', 'Demonite_Ore', 'Corruption world only', '30–90'),
    drop('Crimtane Ore', '100%', 'Material', 'Crimtane_Ore', 'Crimson world only', '30–90'),
  ],
  'pre-skeletron': [
    drop('Book of Skulls', '33.33%', 'Magic weapon', 'Book_of_Skulls'),
    drop('Skeletron Hand', '33.33%', 'Hook', 'Skeletron_Hand'),
    drop('Possessed Skull', '25%', 'Pet', 'Possessed_Skull'),
  ],
  'pre-wof': [
    ...['Warrior', 'Ranger', 'Sorcerer', 'Summoner'].map(type => drop(`${type} Emblem`, '25%', 'Accessory', `${type}_Emblem`)),
    drop('Breaker Blade', '25%', 'Melee weapon', 'Breaker_Blade'),
    drop('Clockwork Assault Rifle', '25%', 'Ranged weapon', 'Clockwork_Assault_Rifle'),
    drop('Laser Rifle', '25%', 'Magic weapon', 'Laser_Rifle'),
    drop('Firecracker', '25%', 'Whip', 'Firecracker'),
    drop('Goat Skull', '25%', 'Mount', 'Goat_Skull'),
  ],
  'empress-of-light': [
    drop('Kaleidoscope', '25%', 'Whip', 'Kaleidoscope'),
    drop('Soaring Insignia', '100%', 'Accessory', 'Soaring_Insignia'),
  ],
}
export const dropNotes = {
  'pre-boss': 'Per Eye of Cthulhu Treasure Bag. The world’s evil determines which ore you receive; you do not receive both in a normal world.',
  'pre-skeletron': 'The bag rolls one of Book of Skulls, Skeletron Hand or the omitted vanity mask. The pet rolls separately on the boss.',
  'pre-wof': 'Each bag contains one emblem and one weapon. The mount rolls separately on the boss.',
}

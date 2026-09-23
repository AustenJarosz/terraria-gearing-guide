import { bloodMoonEarlyDrops, bloodMoonHardmodeDrops, darkMageDrops, ogreDrops } from './eventLoot.js'
// Suggested checklist positions, not mandatory progression gates.
const loot = (name, rate, kind, note, quantity) => { const source = name.replaceAll(' ', '_').replaceAll('’', "'"); return { name, rate, kind, note, quantity, source, file: `${source}.png`, method: 'Direct drop' } }
const event = (id, name, source, note, stageId, art = [], drops = []) => ({ id, name, source, note, stageId, art, drops, event: true, optional: true })
const goblinDrops = [
  loot('Harpoon', '0.5%', 'Ranged weapon'),
  loot('Spiky Ball', '49.75%', 'Consumable ranged weapon', undefined, '1–5'),
].map(drop => ({ ...drop, enemy: 'Common goblins' }))
export const checklistEvents = {
  bloodEarly: event('blood-moon-early', 'Blood Moon · Pre-Hardmode', 'Blood_Moon', 'Select an enemy group to see its rewards. Rates are per enemy killed in Master Mode.', 'pre-boss', [0], bloodMoonEarlyDrops),
  goblinEarly: event('goblin-army-early', 'Goblin Army · Pre-Hardmode', 'Goblin_Army', 'Rates are per ordinary goblin defeated. Clearing the invasion makes the Goblin Tinkerer available to find.', 'pre-skeletron', [34], goblinDrops),
  armyOne: event('old-ones-army-1', 'Old One’s Army · Tier 1', 'Dark_Mage', 'Dark Mage rewards · Tier 1 · Master Mode.', 'pre-skeletron', [34], darkMageDrops),
  bloodHard: event('blood-moon-hardmode', 'Blood Moon · Hardmode', 'Blood_Moon', 'Earlier Blood Moon rewards remain available. Clowns and the three Hardmode fishing enemies add new gear.', 'pre-mechanicals', [0], bloodMoonHardmodeDrops),
  goblinHard: event('goblin-army-hardmode', 'Goblin Army · Hardmode', 'Goblin_Army', 'Each Goblin Warlock drops one Shadowflame weapon in Master Mode. Ordinary goblins retain their earlier rewards.', 'pre-mechanicals', [34], [
    ...[loot('Shadowflame Knife', '33.33%', 'Melee weapon'), loot('Shadowflame Bow', '33.33%', 'Ranged weapon'), loot('Shadowflame Hex Doll', '33.33%', 'Magic weapon')].map(drop => ({ ...drop, enemy: 'Goblin Warlock' })),
    ...goblinDrops,
  ]),
  pirates: event('pirate-invasion', 'Pirate Invasion', 'Pirate_Invasion', 'Rates shown are per Flying Dutchman defeated. The Black Spot is a Master-only mount; other pirates can drop the remaining gear at lower rates.', 'pre-mechanicals', [4], [
    loot('Pirate Staff', '6.67%', 'Summon weapon'),
    loot('Coin Gun', '2%', 'Ranged weapon'),
    loot('Barrel Launcher', '10%', 'Ranged weapon'),
    loot('Lucky Coin', '6.67%', 'Accessory'),
    loot('Discount Card', '6.67%', 'Accessory'),
    loot('Gold Ring', '6.67%', 'Accessory'),
    loot('Cutlass', '10%', 'Melee weapon'),
    loot('The Black Spot', '25%', 'Mount'),
  ].map(drop => ({ ...drop, enemy: 'Flying Dutchman' }))),
  armyTwo: event('old-ones-army-2', 'Old One’s Army · Tier 2', 'Ogre', 'Ogre rewards · Tier 2 · Master Mode. Available after one mechanical boss and before Golem.', 'pre-plantera', [34], ogreDrops),
}

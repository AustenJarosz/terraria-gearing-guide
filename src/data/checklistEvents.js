import { bloodMoonEarlyDrops, bloodMoonHardmodeDrops, darkMageDrops, ogreDrops } from './eventLoot.js'
// Suggested checklist positions, not mandatory progression gates.
const loot = (name, rate, kind, note) => { const source = name.replaceAll(' ', '_').replaceAll('’', "'"); return { name, rate, kind, note, source, file: `${source}.png` } }
const event = (id, name, source, note, stageId, art = [], drops = []) => ({ id, name, source, note, stageId, art, drops, event: true, optional: true })
export const checklistEvents = {
  bloodEarly: event('blood-moon-early', 'Blood Moon · Pre-Hardmode', 'Blood_Moon', 'Select an enemy group to see its rewards. Rates are per enemy killed in Master Mode.', 'pre-boss', [0], bloodMoonEarlyDrops),
  goblinEarly: event('goblin-army-early', 'Goblin Army · Pre-Hardmode', 'Goblin_Army', 'Harpoon and Spiky Balls drop here. Clearing the invasion makes the Goblin Tinkerer available to find.', 'pre-skeletron', [34], [loot('Harpoon', '0.5%', 'Melee weapon'), loot('Spiky Ball', '100%', 'Ammo')]),
  armyOne: event('old-ones-army-1', 'Old One’s Army · Tier 1', 'Dark_Mage', 'Dark Mage rewards · Tier 1 · Master Mode.', 'pre-skeletron', [34], darkMageDrops),
  bloodHard: event('blood-moon-hardmode', 'Blood Moon · Hardmode', 'Blood_Moon', 'Earlier Blood Moon rewards remain available. Clowns and the three Hardmode fishing enemies add new gear.', 'pre-mechanicals', [0], bloodMoonHardmodeDrops),
  goblinHard: event('goblin-army-hardmode', 'Goblin Army · Hardmode', 'Goblin_Army', 'Goblin Warlocks add Shadowflame weapons to the earlier rewards.', 'pre-mechanicals', [34], [loot('Shadowflame Knife', '33.33%', 'Melee weapon'), loot('Shadowflame Bow', '33.33%', 'Ranged weapon'), loot('Shadowflame Hex Doll', '33.33%', 'Magic weapon')]),
  pirates: event('pirate-invasion', 'Pirate Invasion', 'Pirate_Invasion', 'Rates shown are per Flying Dutchman defeated. Ordinary pirates have lower drop chances.', 'pre-mechanicals', [4], [
    loot('Pirate Staff', '6.67%', 'Summon weapon'),
    loot('Coin Gun', '2%', 'Ranged weapon'),
    loot('Barrel Launcher', '10%', 'Ranged weapon'),
    loot('Lucky Coin', '6.67%', 'Accessory'),
    loot('Discount Card', '6.67%', 'Accessory'),
    loot('Gold Ring', '6.67%', 'Accessory'),
    loot('Cutlass', '10%', 'Melee weapon'),
  ]),
  armyTwo: event('old-ones-army-2', 'Old One’s Army · Tier 2', 'Ogre', 'Ogre rewards · Tier 2 · Master Mode. Available after one mechanical boss and before Golem.', 'pre-plantera', [34], ogreDrops),
}

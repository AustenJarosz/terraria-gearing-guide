import { items } from './items'

const accessoryRequirements = {
  wormScarf: 'Corruption', brainConfusion: 'Crimson',
  strungCounterweight: 'Requires Goblin Tinkerer',
  soaringInsignia: 'Requires wings or Rocket Boots',
}
const accessoryCaptions = {
  ...accessoryRequirements,
  whiteString: 'Yoyo range & duration', feralClaws: 'Melee speed & autoswing',
  magnetFlower: 'Auto potions · mana pickup', celestialCuffs: 'Mana on hit · mana pickup',
  manaFlower: 'Automatic mana potions',
  manaCloak: 'Auto potions · Mana Surge', frozenShield: 'Knockback immunity · defense',
  spectreBoots: 'Running speed · flight', celestialEmblem: 'Magic damage · mana pickup',
  papyrusScarab: 'Minion slot · summon damage', necromanticScroll: 'Minion slot · summon damage',
  warriorEmblem: 'Melee damage', rangerEmblem: 'Ranged damage',
  sorcererEmblem: 'Magic damage', summonerEmblem: 'Summon damage',
  reconScope: 'Ranged bonuses · zoom',
}
const readableBenefits = {
  run: 'Running speed', jump: 'Double jump', regen: 'Life regeneration',
  'armor pen': 'Armor penetration', DR: 'Damage reduction',
  'auto-drink': 'Automatic mana potions', 'no knockback': 'Knockback immunity',
}

// In the New layout, keep only qualifiers that affect the choice or its use.
export function accessoryQualifier({ id, notes }) {
  return accessoryRequirements[id] || notes.find(note => /difficult|fallback|only|meteor alternative|up to|requires/i.test(note.label))?.label
}

export function accessoryCaption({ id, notes }) {
  if (accessoryCaptions[id]) return accessoryCaptions[id]
  const guidance = notes.find(note => /difficult|fallback|only|meteor alternative|up to/i.test(note.label))
  const benefit = items[id].stats.replace(/^Accessory\s*·\s*/i, '')
  return guidance?.label || readableBenefits[benefit] || benefit
}

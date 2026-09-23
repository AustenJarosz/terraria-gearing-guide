// Standard Desktop 1.4.5.7 Angler progression. See docs/FISHING_CONTENT.md.
// At chance multiplier 1, conditional on reaching the accessory reward roll.
// The virtual 2.5% / 3.33% / 4% rolls form ONE pool, not individual item rates.
export const accessoryBaseChance = (1 - (1 - 1 / 40) ** 3 * (1 - 1 / 30) ** 3 * (1 - 1 / 25)) * 0.8
const accessoryRate = { baseChance: accessoryBaseChance / 7, accessoryPool: true }
export const fishingMilestones = [
  { count: 5, name: 'Fuzzy Carrot', id: 2428, benefit: 'Summons the Bunny mount.' },
  { count: 10, name: 'Angler Hat', id: 2367, benefit: '+5 fishing power while equipped.' },
  { count: 15, name: 'Angler Vest', id: 2368, benefit: '+5 fishing power while equipped.' },
  { count: 20, name: 'Angler Pants', id: 2369, benefit: '+5 fishing power. Completes the +15 fishing power armor set.' },
  { count: 25, name: 'Bottomless Water Bucket', id: 3031, benefit: 'Unlimited water for building fishing ponds and other projects.' },
  { count: 30, name: 'Golden Fishing Rod', id: 2294, benefit: '50% fishing power. A lasting upgrade, obtainable before Hardmode.' },
]

export const fishingRewards = [
  { name: 'High Test Fishing Line', id: 2373, ...accessoryRate, group: 'Fishing gear', benefit: 'Prevents fishing line from breaking.', unlock: 'Random quest reward' },
  { name: 'Angler Earring', id: 2374, ...accessoryRate, group: 'Fishing gear', benefit: '+10 fishing power.', unlock: 'Random quest reward' },
  { name: 'Tackle Box', id: 2375, ...accessoryRate, group: 'Fishing gear', benefit: 'Reduces bait consumption.', unlock: 'Random quest reward' },
  { name: 'Fishing Bobber', id: 5139, ...accessoryRate, group: 'Fishing gear', benefit: '+10 fishing power; can be upgraded to glowing variants.', unlock: 'Random quest reward' },
  { name: 'Golden Bug Net', id: 3183, baseChance: 1 / 80, group: 'Useful tools', benefit: 'A larger net that can catch lava bait in the Underworld.', unlock: 'Random quest reward' },
  { name: 'Super Absorbant Sponge', id: 3032, baseChance: 1 / 70, firstQuest: 11, group: 'Useful tools', benefit: 'Removes water without filling up. Available before Hardmode.', unlock: 'Random reward from quest 11 onward' },
  { name: 'Fish Hook', id: 2360, baseChance: 1 / 60, group: 'Useful tools', benefit: 'A grappling hook for exploration and mobility; not a fishing accessory.', unlock: 'Random quest reward' },
  { name: 'Minecarp', id: 4067, baseChance: 1 / 60, group: 'Useful tools', benefit: 'A minecart that keeps its speed underwater.', unlock: 'Random quest reward' },
  { name: 'Hotline Fishing Hook', id: 2422, baseChance: 1 / 100, firstQuest: 26, hardmode: true, group: 'Hardmode rewards', benefit: '45% fishing power and built-in lava fishing. Quest 26 unlocks the chance; it does not guarantee the rod.', unlock: 'Hardmode · random reward from quest 26 onward' },
  { name: 'Fin Wings', id: 2494, baseChance: 1 / 70, firstQuest: 11, hardmode: true, group: 'Hardmode rewards', benefit: 'An early Hardmode flight option if the reward rolls your way.', unlock: 'Hardmode · random reward from quest 11 onward' },
  { name: "Fisherman's Pocket Guide", id: 3120, ...accessoryRate, group: 'Information accessories', benefit: 'Displays current fishing power.', unlock: 'Random quest reward' },
  { name: 'Weather Radio', id: 3037, ...accessoryRate, group: 'Information accessories', benefit: 'Displays the weather.', unlock: 'Random quest reward' },
  { name: 'Sextant', id: 3096, ...accessoryRate, group: 'Information accessories', benefit: 'Displays the moon phase.', unlock: 'Random quest reward' },
]

export const fishingCombines = [
  { name: 'Angler Tackle Bag', id: 3721, ingredients: ['High Test Fishing Line', 'Angler Earring', 'Tackle Box'], benefit: 'Combines all three fishing bonuses into one accessory.' },
  { name: 'Fish Finder', id: 3036, ingredients: ["Fisherman's Pocket Guide", 'Weather Radio', 'Sextant'], benefit: 'Combines the three readouts and is a component of the PDA.' },
]

export const fishingExtras = [
  { name: 'Bottomless Honey Bucket', id: 5302 },
  { name: 'Honey Absorbant Sponge', id: 5303 },
  { name: 'Fishing Potion', id: 2354 },
  { name: 'Sonar Potion', id: 2355 },
  { name: 'Crate Potion', id: 2356 },
]

export const allFishingItems = [...fishingMilestones, ...fishingRewards, ...fishingCombines, ...fishingExtras]

// The tracker is manual and local, independent of boss-checklist progress.
export function normalizeFishingCount(value) {
  const count = Number(value)
  return Number.isFinite(count) ? Math.max(0, Math.min(9999, Math.floor(count))) : 0
}

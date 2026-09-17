import assert from 'node:assert/strict'
import fs from 'node:fs'
import { fishingMilestones, fishingRewards, allFishingItems, normalizeFishingCount, accessoryBaseChance } from '../src/data/fishing.js'
assert.deepEqual(fishingMilestones.map(item => [item.count, item.name]), [
  [5, 'Fuzzy Carrot'], [10, 'Angler Hat'], [15, 'Angler Vest'],
  [20, 'Angler Pants'], [25, 'Bottomless Water Bucket'], [30, 'Golden Fishing Rod'],
])
assert(!fishingMilestones.some(item => item.name === 'Hotline Fishing Hook'))
assert.match(fishingRewards.find(item => item.name === 'Hotline Fishing Hook').unlock, /Hardmode.*25.*random/)
assert.equal(fishingRewards.find(item => item.name === 'Hotline Fishing Hook').baseChance, .01)
assert.equal(fishingRewards.find(item => item.name === 'Golden Bug Net').baseChance, 1 / 80)
const accessoryRewards = fishingRewards.filter(item => item.accessoryPool)
assert.equal(accessoryRewards.length, 7)
assert(Math.abs(accessoryBaseChance - .157008404) < 1e-10)
assert(Math.abs(accessoryRewards.reduce((total, item) => total + item.baseChance, 0) - accessoryBaseChance) < 1e-10)
assert(accessoryRewards.every(item => (item.baseChance * 100).toFixed(2) === '2.24'))
assert(fishingRewards.every(item => item.baseChance > 0 && item.baseChance < 1))
for (const [input, expected] of [[null, 0], ['', 0], ['invalid', 0], [-3, 0], [Infinity, 0], ['24', 24], [25.8, 25], [10000, 9999]]) assert.equal(normalizeFishingCount(input), expected)
assert.equal(fishingMilestones.find(item => item.count > 24).name, 'Bottomless Water Bucket')
assert.equal(fishingMilestones.find(item => item.count > 25).name, 'Golden Fishing Rod')
assert.equal(fishingMilestones.find(item => item.count > 30), undefined)
for (const { id, name } of allFishingItems) {
  const file = fs.readFileSync(`public/items/fishing-${id}.png`)
  assert.equal(file.subarray(1, 4).toString(), 'PNG', name)
}
console.log(`Verified six guaranteed milestones, random-reward separation, quest counter boundaries and ${allFishingItems.length} sprites.`)

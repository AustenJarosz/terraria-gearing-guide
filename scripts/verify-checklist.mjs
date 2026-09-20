import assert from 'node:assert/strict'
import fs from 'node:fs'
import { checklistGroups, checklistType } from '../src/data/checklist.js'
import { roadmapStages, retiredStageFallbacks } from '../src/data/gear.js'
import { checklistArt } from '../src/data/checklistArt.js'
import { dungeonDrops } from '../src/data/dungeonDrops.js'
import { biomeChestLoot, dungeonChestGroups, goldChestLoot, woodenChestLoot, dungeonChestSpriteIds } from '../src/data/dungeonChests.js'

const rows = checklistGroups.flatMap(group => group.rows)
assert.equal(new Set(rows.map(row => row.id)).size, rows.length, 'Checklist IDs must be unique for saved completion')
const dungeons = rows.filter(row => checklistType(row) === 'Dungeons')
assert.deepEqual(dungeons.map(row => row.id), ['dungeon-pre-plantera', 'dungeon-post-plantera'])
for (const [dungeon, precedingBoss, nextGear] of [
  ['dungeon-pre-plantera', 'pre-skeletron', 'pre-wof'],
  ['dungeon-post-plantera', 'pre-plantera', 'pre-golem'],
]) {
  assert.equal(rows.findIndex(row => row.id === dungeon), rows.findIndex(row => row.id === precedingBoss) + 1, 'Dungeon visits must follow their unlock boss')
  assert(!roadmapStages.some(stage => stage.id === dungeon), 'Dungeon must not remain in roadmap navigation')
  assert.equal(retiredStageFallbacks[dungeon], nextGear, 'Saved Dungeon selections should move to the next gearing stage')
  assert(dungeonDrops[dungeon]?.length && dungeonChestGroups[dungeon]?.length, 'Both enemy drops and chest loot must remain accessible')
}
assert(roadmapStages.every(stage => stage.id !== 'pre-hardmode-optional'))
for (const row of rows) {
  if (row.stageId) assert(roadmapStages.some(stage => stage.id === row.stageId), `Broken checklist-to-roadmap link: ${row.id}`)
  assert(checklistArt[row.id] || row.art?.length, `Missing checklist portrait: ${row.id}`)
  assert.equal(checklistType(row), row.kind === 'Dungeon' ? 'Dungeons' : row.event ? 'Events' : 'Bosses')
}

assert.deepEqual(goldChestLoot.primary.map(item => item.name).sort(), ['Aqua Scepter', 'Blue Moon', 'Cobalt Shield', 'Handgun', 'Magic Missile', 'Muramasa', 'Valor'])
assert(goldChestLoot.primary.every(item => item.rate === '1 of 7'), 'Generated chest order is not a fresh random roll on opening')
assert.deepEqual(Object.fromEntries(goldChestLoot.secondary.map(item => [item.name, item.rate])), { 'Shadow Key': '33.33%*', 'Ram Rune': '12.5%*', 'Silver Bracer': '25%', 'Bone Welder': '12.5%' })
assert(!dungeonChestGroups['dungeon-pre-plantera'].includes('biome'), 'Biome Chest weapons are locked until Plantera')
assert(dungeonChestGroups['dungeon-post-plantera'].includes('gold'), 'Early chests remain available after Plantera')
assert.equal(dungeonChestGroups['dungeon-post-plantera'][0], 'biome', 'The return visit should show newly unlocked chests first')
assert.deepEqual(biomeChestLoot.map(item => [item.name, item.chest, item.key]), [
  ['Piranha Gun', 'Jungle Chest', 'Jungle Key'],
  ['Scourge of the Corruptor', 'Corruption Chest', 'Corruption Key'],
  ['Vampire Knives', 'Crimson Chest', 'Crimson Key'],
  ['Rainbow Gun', 'Hallowed Chest', 'Hallowed Key'],
  ['Staff of the Frost Hydra', 'Ice Chest', 'Frozen Key'],
  ['Desert Tiger Staff', 'Desert Chest', 'Desert Key'],
])
assert(biomeChestLoot.every(item => item.rate === '100%'))
assert.deepEqual(biomeChestLoot.filter(item => item.world).map(item => item.world).sort(), ['Corruption world', 'Crimson world'])
const loot = [...goldChestLoot.primary, ...goldChestLoot.secondary, ...biomeChestLoot, ...woodenChestLoot]
assert.equal(new Set(loot.map(item => item.name)).size, loot.length)
for (const item of loot) {
  assert(item.source && item.kind && item.rate, `Missing chest information: ${item.name}`)
  const png = fs.readFileSync(`public/items/${item.file}`)
  assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `Invalid chest sprite: ${item.name}`)
}
const manifest = JSON.parse(fs.readFileSync('scripts/sprite-manifest.json'))
for (const [file, id] of Object.entries(dungeonChestSpriteIds)) assert.equal(manifest[file], id, `Incorrect chest sprite: ${file}`)
console.log(`Verified ${rows.length} checklist entries, both Dungeon visits, ${loot.length} chest rewards and roadmap links.`)

import assert from 'node:assert/strict'
import fs from 'node:fs'
import { checklistGroups, checklistType } from '../src/data/checklist.js'
import { roadmapStages, retiredStageFallbacks } from '../src/data/gear.js'
import { checklistArt } from '../src/data/checklistArt.js'
import { dungeonDrops } from '../src/data/dungeonDrops.js'
import { biomeChestLoot, dungeonChestGroups, goldChestLoot, woodenChestLoot, dungeonChestSpriteIds } from '../src/data/dungeonChests.js'
import { bossDrops } from '../src/data/bossDrops.js'
import { checklistEvents } from '../src/data/checklistEvents.js'
import { checklistSpawns } from '../src/data/checklistSpawns.js'
import { lootProgression } from '../src/data/hardmodeDrops.js'
import { summonAcquisition } from '../src/data/summonAcquisition.js'

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
  const spawn = checklistSpawns[row.id]
  assert(spawn, `Missing checklist access or spawn conditions: ${row.id}`)
  for (const info of spawn.variants || [spawn]) {
    assert(info.source && info.summon && info.conditions, `Incomplete spawn information: ${row.id}`)
    if (info.icon) assert(fs.existsSync(`public/items/${info.icon}`), `Missing summon icon: ${info.icon}`)
  }
  if (row.kind !== 'Dungeon') {
    const drops = bossDrops[row.id] || row.drops || bossDrops[row.stageId]
    assert(drops?.length, `Empty checklist loot: ${row.id}`)
    if (row.enemy) assert(drops.some(drop => drop.enemy === row.enemy), `Empty enemy filter: ${row.id}/${row.enemy}`)
  }
}

// Every loot panel uses the same per-source contract, including earlier event data.
const lootTables = [...Object.entries(bossDrops), ...Object.values(checklistEvents).map(event => [event.id, event.drops])]
let rewardCount = 0
for (const [id, rewards] of lootTables) {
  assert.equal(new Set(rewards.map(drop => `${drop.enemy || ''}/${drop.name}`)).size, rewards.length, `Duplicate loot rows: ${id}`)
  assert(!rewards.some(drop => drop.enemy) || rewards.every(drop => drop.enemy), `Enemy filters would hide ungrouped drops: ${id}`)
  for (const drop of rewards) {
    rewardCount++
    assert(drop.name && drop.kind && drop.source && drop.method, `Missing source metadata: ${id}/${drop.name}`)
    assert(/^\d+(?:\.\d+)?(?:–\d+(?:\.\d+)?)?%\*?$/.test(drop.rate), `Invalid loot chance: ${id}/${drop.name}`)
    const rates = drop.rate.match(/\d+(?:\.\d+)?/g).map(Number)
    assert(rates.every(rate => rate > 0 && rate <= 100), `Out-of-range chance: ${id}/${drop.name}`)
    if (rates.length > 1) assert(rates[0] < rates[1] && drop.note, `Unexplained or reversed chance range: ${id}/${drop.name}`)
    if (drop.rate.includes('*')) assert(drop.note, `Conditional loot needs an explanation: ${id}/${drop.name}`)
    const png = fs.readFileSync(`public/items/${drop.file}`)
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `Invalid loot image: ${drop.file}`)
  }
}
const findDrop = (rewards, name, enemy) => rewards.find(drop => drop.name === name && (!enemy || drop.enemy === enemy))
assert.equal(findDrop(checklistEvents.goblinEarly.drops, 'Harpoon').kind, 'Ranged weapon')
assert.equal(findDrop(checklistEvents.goblinEarly.drops, 'Spiky Ball').rate, '49.75%')
assert.equal(findDrop(checklistEvents.goblinEarly.drops, 'Spiky Ball').quantity, '1–5')
for (const drop of checklistEvents.goblinEarly.drops) assert.deepEqual(findDrop(checklistEvents.goblinHard.drops, drop.name, drop.enemy), drop, 'Hardmode goblins retain ordinary-goblin loot')
for (const drop of checklistEvents.bloodEarly.drops) assert.deepEqual(findDrop(checklistEvents.bloodHard.drops, drop.name, drop.enemy), drop, 'Hardmode Blood Moons retain the early enemy drops')
assert.equal(findDrop(checklistEvents.pirates.drops, 'The Black Spot').rate, '25%')
assert.equal(findDrop(bossDrops['pre-boss'], 'Suspicious Grinning Eye').method, 'Master boss drop')
for (const name of ["Squire's Shield", "Apprentice's Scarf"]) assert.equal(findDrop(bossDrops['old-ones-army'], name, 'Dark Mage · tier 3').rate, '50%', 'T3 Dark Mage accessories are not the Ogre accessory pool')
assert.equal(findDrop(bossDrops['martian-madness'], 'Brain Scrambler', 'Scutlix Gunner').source, 'Brain_Scrambler_(item)', 'Mount links must not open the unrelated enemy page')
for (const name of ['Laser Drill', 'Anti-Gravity Hook', 'Charged Blaster Cannon']) assert.equal(findDrop(bossDrops['martian-madness'], name, 'Common Martians').rate, '0.13%', 'Common Martian gear no longer drops from the Saucer')
assert.equal(lootProgression['solar-eclipse'].Mothron, 'Post-Plantera')
assert.equal(lootProgression['solar-eclipse'].Reaper, 'After all 3 mechanical bosses')
for (const drop of bossDrops['solar-eclipse']) assert(lootProgression['solar-eclipse'][drop.enemy], `Missing Eclipse unlock: ${drop.enemy}`)
assert.equal(findDrop(bossDrops['duke-fishron'], 'Kraken').rate, '14.29%', '1.4.5.7 moved Kraken into Fishron’s seven-weapon pool')
assert(!Object.values(dungeonDrops).flatMap(groups => groups.flatMap(group => group.enemies)).some(enemy => enemy.drops.some(drop => drop.name === 'Kraken')), 'Kraken no longer drops in the Dungeon')
assert.deepEqual(summonAcquisition['Celestial Sigil'].recipes[0].ingredients.map(([, quantity]) => quantity), [12, 12, 12, 12])

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
console.log(`Verified ${rows.length} checklist entries and spawn methods, ${rewardCount} boss/event loot rows, both Dungeon visits, ${loot.length} chest rewards and roadmap links.`)

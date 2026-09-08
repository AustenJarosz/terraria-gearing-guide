import assert from 'node:assert/strict'
import fs from 'node:fs'
import { items } from '../src/data/items.js'
import { classes, stages, loadouts } from '../src/data/gear.js'
import { sideStages, sideEncounters } from '../src/data/roadmap.js'
import { bossArt } from '../src/data/bossArt.js'
for (const stage of stages) assert(bossArt[stage.id]?.length, `Missing boss art: ${stage.id}`)
for (const id of new Set(Object.values(bossArt).flat())) {
 const png = fs.readFileSync(`public/bosses/${id}.png`)
 assert.equal(png.subarray(0,8).toString('hex'), '89504e470d0a1a0a', `Invalid boss portrait: ${id}`)
 assert(png.readUInt32BE(16) > 0 && png.readUInt32BE(20) > 0)
}
assert.equal(new Set(stages.map(stage => stage.id)).size, stages.length, 'Duplicate roadmap stop')
const sideRewards = new Set(sideEncounters.flatMap(stage => Object.values(stage.rewards).flat()))
const lunarWeapons = ['solarEruption', 'daybreak', 'phantasm', 'vortexBeater', 'nebulaBlaze', 'nebulaArcanum', 'stardustDragon', 'stardustCell', 'constellation']
const groupedEncounters = sideStages.flatMap(stage => stage.encounters)
assert.equal(new Set(groupedEncounters.map(encounter => encounter.id)).size, sideEncounters.length, 'Missing or duplicated grouped encounter')
assert.equal(groupedEncounters.length, sideEncounters.length, 'Duplicate grouped encounter')
for (const stage of [...stages.filter(stage => !stage.encounters), ...groupedEncounters]) {
 assert(stage.unlock && stage.summon && stage.prepare && stage.payoff && stage.source, `Incomplete roadmap: ${stage.id}`)
 for (const id of Object.values(stage.rewards || {}).flat()) assert(items[id], `Unknown reward: ${id}`)
}
const seen = new Set()
for (const loadout of loadouts) {
 const key = `${loadout.classId}/${loadout.stageId}`
 assert(!seen.has(key), `Duplicate loadout: ${key}`)
 seen.add(key)
 const stage = stages.findIndex(s => s.id === loadout.stageId)
 assert(stage >= 0 && classes.some(c => c.id === loadout.classId))
 const ids = [...loadout.armor, ...loadout.weapons, ...loadout.accessories]
 assert.equal(new Set(ids).size, ids.length, `Duplicate item: ${key}`)
 for (const id of ids) assert(items[id], `Unknown item: ${id}`)
 if (stages[stage].era === 'pre-hardmode') assert(!ids.includes('charmMyths'), 'Charm of Myths requires Hardmode')
 if (['pre-boss', 'pre-skeletron', 'pre-wof', 'pre-mechanicals', 'pre-plantera'].includes(loadout.stageId)) assert(!ids.includes('leafWings'), 'Leaf Wings require Plantera')
 if (sideStages.some(s => s.id === loadout.stageId)) {
  for (const id of ids) assert(!sideRewards.has(id), `First-clear kit assumes optional rewards: ${key}/${id}`)
 }
 if (loadout.stageId !== 'pre-moon-lord') {
  for (const id of ids) assert(!lunarWeapons.includes(id), `Lunar weapon before pillar clear: ${key}/${id}`)
 }
 assert(!loadout.armor.some(id => ['solarArmor','vortexArmor','nebulaArmor','stardustArmor'].includes(id)), 'Luminite armor requires Moon Lord')
}
assert.equal(seen.size, classes.length * stages.length)
for (const item of Object.values(items)) {
 const png = fs.readFileSync(`public/items/${item.file}`)
 assert.equal(png.subarray(0,8).toString('hex'), '89504e470d0a1a0a', `Invalid PNG: ${item.file}`)
 assert(png.readUInt32BE(16) > 0 && png.readUInt32BE(20) > 0)
 assert(item.info && item.obtain && item.source)
}
console.log(`Verified ${seen.size} loadouts and ${Object.keys(items).length} PNG assets; progression checks passed.`)

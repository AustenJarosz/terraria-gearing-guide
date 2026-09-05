import assert from 'node:assert/strict'
import fs from 'node:fs'
import { items } from '../src/data/items.js'
import { classes, stages, loadouts } from '../src/data/gear.js'
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
 if (stage < 3) assert(!ids.includes('charmMyths'), 'Charm of Myths requires Hardmode')
 if (stage < 5) assert(!ids.includes('leafWings'), 'Leaf Wings require Plantera')
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

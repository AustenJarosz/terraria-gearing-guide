import assert from 'node:assert/strict'
import fs from 'node:fs'
import { items } from '../src/data/items.js'
import { gearAcquisition } from '../src/data/gearAcquisition.js'
import { summonAcquisition } from '../src/data/summonAcquisition.js'
import { acquisitionIcons } from '../src/data/acquisitionIcons.js'
import { splitSummonText } from '../src/data/summonItems.js'

for (const id of Object.keys(items)) assert(gearAcquisition[id], `Missing acquisition: ${id}`)
for (const [name, data] of [...Object.entries(gearAcquisition), ...Object.entries(summonAcquisition)]) {
  assert(data.recipes?.length || data.drops?.length || data.vendor || data.note, `Empty acquisition: ${name}`)
  for (const recipe of data.recipes || []) {
    assert(recipe.ingredients.length && recipe.stations.length, `Incomplete recipe: ${name}`)
    for (const [ingredient, amount] of recipe.ingredients) {
      assert(Number.isInteger(amount) && amount > 0, `Invalid quantity: ${name}`)
      for (const option of Array.isArray(ingredient) ? ingredient : [ingredient]) assert(acquisitionIcons[option], `Missing ingredient icon: ${option}`)
    }
    for (const station of recipe.stations) assert(station === 'By Hand' || acquisitionIcons[station], `Missing station icon: ${station}`)
  }
  for (const row of data.drops || []) assert(row.enemy && row.rate.includes('%'), `Incomplete drop: ${name}`)
}
for (const file of Object.values(acquisitionIcons)) {
  const bytes = fs.readFileSync(`public/items/${file}`)
  assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `Invalid sprite: ${file}`)
}
assert.deepEqual(gearAcquisition.trueNightsEdge.recipes[0].ingredients, [["Night's Edge", 1], ['Soul of Fright', 20], ['Soul of Might', 20], ['Soul of Sight', 20]])
assert.equal(gearAcquisition.yelets.drops, undefined, 'Broad biome sources should stay concise')
assert.equal(summonAcquisition['Bloody Tear'].drops.find(row => row.enemy === 'Dreadnautilus').rate, '100%')
assert.deepEqual(splitSummonText('Eternia Crystal Stand'), ['', 'Eternia Crystal Stand', ''])
console.log(`Verified ${Object.keys(gearAcquisition).length} gear entries, ${Object.keys(summonAcquisition).length} summon entries, and ${Object.keys(acquisitionIcons).length} acquisition icons.`)

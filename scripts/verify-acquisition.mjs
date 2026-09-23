import assert from 'node:assert/strict'
import fs from 'node:fs'
import { items } from '../src/data/items.js'
import { loadoutItems } from '../src/data/loadoutItems.js'
import { preparationItems } from '../src/data/preparationItems.js'
import { weaponSupportItems } from '../src/data/weaponSupportItems.js'
import { gearAcquisition } from '../src/data/gearAcquisition.js'
import { summonAcquisition } from '../src/data/summonAcquisition.js'
import { acquisitionIcons } from '../src/data/acquisitionIcons.js'
import { splitSummonText } from '../src/data/summonItems.js'

// The catalog must preserve imported definitions rather than silently shadowing
// them with a stale second entry in items.js.
for (const catalog of [loadoutItems, preparationItems, weaponSupportItems]) {
  for (const [id, item] of Object.entries(catalog)) assert.deepEqual(items[id], item, `Shadowed item definition: ${id}`)
}
for (const [id, item] of Object.entries(items)) {
  assert(gearAcquisition[id], `Missing acquisition: ${id}`)
  assert.match(item.source, /^https:\/\/terraria\.wiki\.gg\/wiki\//, `Missing official item source: ${id}`)
}
for (const [name, data] of [...Object.entries(gearAcquisition), ...Object.entries(summonAcquisition)]) {
  assert(data.recipes?.length || data.drops?.length || data.vendor || data.note, `Empty acquisition: ${name}`)
  for (const recipe of data.recipes || []) {
    assert(recipe.ingredients.length && recipe.stations.length, `Incomplete recipe: ${name}`)
    assert(Number.isInteger(recipe.quantity ?? 1) && (recipe.quantity ?? 1) > 0, `Invalid output batch: ${name}`)
    assert.equal(new Set(recipe.stations).size, recipe.stations.length, `Duplicate crafting station: ${name}`)
    for (const [ingredient, amount] of recipe.ingredients) {
      assert(Number.isInteger(amount) && amount > 0, `Invalid quantity: ${name}`)
      const alternatives = Array.isArray(ingredient) ? ingredient : [ingredient]
      assert(alternatives.length && new Set(alternatives).size === alternatives.length, `Invalid ingredient alternatives: ${name}`)
      for (const option of alternatives) assert(acquisitionIcons[option], `Missing ingredient icon: ${option}`)
    }
    for (const station of recipe.stations) assert(['By Hand', 'Shimmer'].includes(station) || acquisitionIcons[station], `Missing station icon: ${station}`)
  }
  for (const row of data.drops || []) {
    assert(row.enemy && /^\d+(?:\.\d+)?(?:–\d+(?:\.\d+)?)?%\*?$/.test(row.rate), `Incomplete drop: ${name}`)
    const chances = row.rate.replace(/[%*]/g, '').split('–').map(Number)
    assert(chances.every(value => value > 0 && value <= 100), `Invalid drop chance: ${name}`)
    if (chances.length === 2) assert(chances[0] <= chances[1] && row.note, `Unexplained drop range: ${name}`)
    if (row.rate.includes('*')) assert(row.note, `Unexplained conditional drop: ${name}`)
  }
}
for (const file of Object.values(acquisitionIcons)) {
  const bytes = fs.readFileSync(`public/items/${file}`)
  assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `Invalid sprite: ${file}`)
}
assert.deepEqual(gearAcquisition.trueNightsEdge.recipes[0].ingredients, [["Night's Edge", 1], ['Soul of Fright', 20], ['Soul of Might', 20], ['Soul of Sight', 20]])
assert.deepEqual(gearAcquisition.diamondStaff.recipes[0].ingredients, [['Platinum Bar', 7], ['Diamond', 8]], '1.4.5.7 reduced gem-staff metal costs')
assert.deepEqual(gearAcquisition.rubyStaff.recipes[0].ingredients, [['Gold Bar', 7], ['Ruby', 8]])
assert.deepEqual(gearAcquisition.hiveFive.recipes[0].ingredients, [['Bee Wax', 14]])
assert(!items.hiveFive.obtain.includes('Mahogany'), 'The text must agree with the Bee Wax-only recipe')
assert.equal(gearAcquisition.yelets.drops, undefined, 'Broad biome sources should stay concise')
assert.equal(summonAcquisition['Bloody Tear'].drops.find(row => row.enemy === 'Dreadnautilus').rate, '100%')
assert.deepEqual(splitSummonText('Eternia Crystal Stand'), ['', 'Eternia Crystal Stand', ''])
console.log(`Verified ${Object.keys(gearAcquisition).length} gear entries, ${Object.keys(summonAcquisition).length} summon entries, and ${Object.keys(acquisitionIcons).length} acquisition icons.`)

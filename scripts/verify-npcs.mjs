import assert from 'node:assert/strict'
import fs from 'node:fs'
import { npcs, npcStages, npcEras, findNpcs } from '../src/data/npcs.js'
import { npcItemIcons } from '../src/data/npcItemIcons.js'
assert.equal(npcs.length, 28)
assert.equal(new Set(npcs.map(npc => npc.id)).size, npcs.length)
for (const npc of npcs) {
  assert(npc.unlock && npc.source && npc.role, npc.name)
  assert(npcEras.includes(npc.era), `${npc.name}: unknown recruitment group`)
  const uniqueStock = new Set()
  assert(fs.existsSync(`public/npcs/${npc.head ?? 'skeleton'}.png`), npc.name)
  for (const group of npc.shops) {
    assert(npcStages[group.stage], `${npc.name}: invalid unlock stage`)
    for (const item of group.items) {
      const stockKey = `${group.stage}:${item.name}:${item.condition}`
      assert(!uniqueStock.has(stockKey), `${npc.name}: repeated ${item.name} stock`)
      uniqueStock.add(stockKey)
      assert(npcItemIcons[item.name], `${item.name}: missing icon`)
      const image = fs.readFileSync(`public/items/${npcItemIcons[item.name]}`)
      assert.equal(image.subarray(1,4).toString(), 'PNG', item.name)
    }
  }
}
const stage = (npc, item) => npcs.find(n => n.name === npc).shops.find(group => group.items.some(i => i.name === item))?.stage
assert.equal(stage('Witch Doctor', 'Leaf Wings'), 7)
assert.equal(stage('Witch Doctor', 'Pygmy Necklace'), 0)
assert.equal(stage('Truffle', 'Autohammer'), 7)
assert.equal(stage('Mechanic', 'Teleporter'), 0)
assert.equal(stage('Traveling Merchant', 'Pulse Bow'), 6)
assert.equal(stage('Traveling Merchant', 'Celestial Magnet'), undefined)
assert.equal(stage('Tavernkeep', 'Flameburst Cane'), 5)
assert.equal(stage('Tavernkeep', 'Flameburst Staff'), 8)
assert.equal(stage('Cyborg', 'Cluster Rocket II'), 9)
assert.equal(stage('Traveling Merchant', 'Black Counterweight'), 0)
assert.equal(stage('Traveling Merchant', 'Yellow Counterweight'), 0)
assert.equal(stage('Skeleton Merchant', 'Magic String'), 5)
assert.equal(stage('Skeleton Merchant', 'Format:C'), undefined)
assert.equal(stage('Witch Doctor', 'Hercules Beetle'), 7)
assert.equal(stage('Arms Dealer', 'Ammo Box'), 4)
assert.deepEqual(findNpcs('  LEAF wings JUNGLE ').map(npc => npc.name), ['Witch Doctor'])
assert(findNpcs('post plantera').some(npc => npc.name === 'Truffle'), 'Stage labels must be searchable')
assert.deepEqual(findNpcs('Tinkerer’s Workshop').map(npc => npc.name), ['Goblin Tinkerer'])
assert.deepEqual(findNpcs('counterweight', 'Travelers').map(npc => npc.name), ['Traveling Merchant', 'Skeleton Merchant'])
assert.equal(findNpcs('counterweight', 'Hardmode').length, 0)
assert.equal(findNpcs('something-that-does-not-exist').length, 0)
assert.equal(findNpcs(' ').length, npcs.length)
console.log(`Verified ${npcs.length} NPCs, stage gates, and ${Object.keys(npcItemIcons).length} shop icons.`)

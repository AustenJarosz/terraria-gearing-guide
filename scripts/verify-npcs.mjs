import assert from 'node:assert/strict'
import fs from 'node:fs'
import { npcs, npcStages } from '../src/data/npcs.js'
import { npcItemIcons } from '../src/data/npcItemIcons.js'
assert.equal(npcs.length, 28)
assert.equal(new Set(npcs.map(npc => npc.id)).size, npcs.length)
for (const npc of npcs) {
  assert(npc.unlock && npc.source && npc.role, npc.name)
  assert(fs.existsSync(`public/npcs/${npc.head ?? 'skeleton'}.png`), npc.name)
  for (const group of npc.shops) {
    assert(npcStages[group.stage], `${npc.name}: invalid unlock stage`)
    for (const item of group.items) {
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
console.log(`Verified ${npcs.length} NPCs, stage gates, and ${Object.keys(npcItemIcons).length} shop icons.`)

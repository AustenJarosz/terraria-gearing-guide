import assert from 'node:assert/strict'
import { getAccessorySlots } from '../src/data/accessorySlots.js'
import { loadouts, stages } from '../src/data/gear.js'
import { items } from '../src/data/items.js'
import { itemNotes } from '../src/data/itemNotes.js'

for (const loadout of loadouts) {
  const key = `${loadout.stageId}/${loadout.classId}`
  const before = structuredClone(loadout)
  const rows = getAccessorySlots(loadout)
  const stage = stages.find(stage => stage.id === loadout.stageId)
  assert.equal(rows.length, stage.era === 'hardmode' ? 7 : 6, `Wrong slot count: ${key}`)
  assert.deepEqual(rows.map(row => row.id), loadout.accessories, `Baseline order changed: ${key}`)
  assert.deepEqual(loadout, before, `Mutated source loadout: ${key}`)

  for (const row of rows) {
    assert.equal(row.options[0].id, row.id, `Baseline must appear first: ${key}/${row.id}`)
    const ids = row.options.map(option => option.id)
    assert.equal(new Set(ids).size, ids.length, `Repeated option: ${key}/${row.id}`)
    assert.equal(row.note, loadout.accessoryChoices[row.id]?.text ?? '', `Lost choice guidance: ${key}/${row.id}`)
    assert(!row.label.toLowerCase().includes('choose one'), `Redundant choice label: ${key}/${row.id}`)
    for (const id of loadout.accessoryChoices[row.id]?.ids ?? []) {
      assert(ids.includes(id), `Lost choice: ${key}/${row.id}/${id}`)
    }
    for (const swap of loadout.accessorySwaps.filter(swap => swap.replaces === row.id)) {
      const option = row.options.find(option => option.id === swap.id)
      assert(option, `Lost swap: ${key}/${row.id}/${swap.id}`)
      assert(option.notes.some(note => note.text === swap.text), `Lost swap guidance: ${key}/${swap.id}`)
      if (['wormScarf', 'brainConfusion'].includes(swap.id)) {
        assert(ids.includes('wormScarf') && ids.includes('brainConfusion'), `Missing world alternative: ${key}/${row.id}`)
      }
    }
    for (const option of row.options) {
      assert(items[option.id], `Unknown option: ${key}/${option.id}`)
      for (const note of loadout.itemNotes[option.id] ?? itemNotes[option.id] ?? []) {
        assert(option.notes.some(candidate => candidate.label === note.label && candidate.text === note.text), `Lost item note: ${key}/${option.id}`)
      }
    }
  }
  for (const swap of loadout.accessorySwaps) {
    assert(rows.some(row => row.id === swap.replaces && row.options.some(option => option.id === swap.id)), `Orphan swap: ${key}/${swap.id}`)
  }
  const visible = rows.flatMap(row => row.options.map(option => option.id))
  assert.equal(visible.length, new Set(visible).size, `Option displayed in two slots: ${key}`)
}

const findRow = (stageId, classId, id) => getAccessorySlots(loadouts.find(loadout => loadout.stageId === stageId && loadout.classId === classId)).find(row => row.id === id)
assert.deepEqual(findRow('pre-wof', 'melee', 'horseshoeBalloons').options.map(option => option.id), ['horseshoeBalloons', 'cloudBalloon', 'obsidianShield'])
assert.deepEqual(findRow('pre-skeletron', 'melee', 'stingerNecklace').options.map(option => option.id), ['stingerNecklace', 'sharkTooth', 'hivePack'])
assert.deepEqual(findRow('pre-mechanicals', 'mage', 'manaCloak').options.map(option => option.id), ['manaCloak', 'magnetFlower', 'celestialCuffs', 'charmMyths'])
assert.deepEqual(findRow('pre-lunatic', 'melee', 'amphibianBoots').options.map(option => option.id), ['amphibianBoots', 'lightningBoots', 'soaringInsignia'])
assert.deepEqual(findRow('pre-lunatic', 'melee', 'warriorEmblem').options.map(option => option.id), ['warriorEmblem', 'magicYoyoBag', 'yoyoBag', 'wormScarf', 'brainConfusion'])
const brain = findRow('pre-lunatic', 'melee', 'warriorEmblem').options.find(option => option.id === 'brainConfusion')
assert(brain.notes.some(note => note.text.startsWith('Crimson-world alternative')))
assert(!brain.notes.some(note => note.text.startsWith('Corruption defensive alternative')))
const scarf = findRow('dungeon-post-plantera', 'summoner', 'herculesBeetle').options.find(option => option.id === 'wormScarf')
assert(scarf.notes.some(note => note.text.startsWith('Corruption-world alternative')))

// An item mentioned by both a choice and a swap should retain both pieces of
// guidance without rendering twice or mutating the notes shared by its caller.
const fixture = {
  accessories: ['manaCloak'],
  accessoryChoices: { manaCloak: { label: 'Mana · choose one', ids: ['manaCloak', 'magnetFlower'], text: 'Choose your mana setup.' } },
  accessorySwaps: [{ id: 'magnetFlower', replaces: 'manaCloak', text: 'More pickup range.' }, { id: 'magnetFlower', replaces: 'manaCloak', text: 'More pickup range.' }],
  itemNotes: { magnetFlower: [{ label: 'Pairing', text: 'Keep mana potions available.' }] },
}
const fixtureBefore = structuredClone(fixture)
const [fixtureRow] = getAccessorySlots(fixture)
assert.equal(fixtureRow.options.length, 2)
assert.equal(fixtureRow.options[1].notes.length, 2)
assert.equal(fixtureRow.label, 'Mana')
assert.deepEqual(fixture, fixtureBefore)
fixtureRow.options[1].notes[0].text = 'Mutated returned note'
assert.deepEqual(fixture, fixtureBefore)

console.log(`Verified unified accessory rows, alternatives, and guidance for ${loadouts.length} Master Mode builds.`)

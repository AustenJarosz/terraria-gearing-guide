import assert from 'node:assert/strict'
import fs from 'node:fs'
import { loadouts, stages } from '../src/data/gear.js'
import { items } from '../src/data/items.js'
import { gearAcquisition } from '../src/data/gearAcquisition.js'
import { getPreparation } from '../src/data/preparation.js'

const flatten = prep => ['essentials', 'classPotions', 'flasks', 'stations', 'nearby', 'extras'].flatMap(key => prep[key])
for (const loadout of loadouts) {
  const { stageId, classId } = loadout
  const prep = getPreparation(stageId, classId)
  const ids = flatten(prep)
  assert.equal(ids.length, new Set(ids).size, `Duplicate preparation: ${stageId}/${classId}`)
  for (const id of ids) {
    assert(items[id] && gearAcquisition[id], `Missing item/preview: ${id}`)
    const bytes = fs.readFileSync(`public/items/${items[id].file}`)
    assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `Invalid sprite: ${id}`)
    assert(!loadout.accessories.includes(id), `Consumable counted as accessory slot: ${id}`)
  }
  const hardmode = stages.find(stage => stage.id === stageId).era === 'hardmode'
  if (!hardmode) for (const id of ['greaterHealingPotion', 'jungleJuice', 'superHealingPotion', 'greaterManaPotion', 'superManaPotion', 'ammoBox', 'crystalBall', 'flaskIchor', 'flaskCursedFlames', 'flaskVenom', 'flaskNanites']) assert(!ids.includes(id), `Premature unlock: ${stageId}/${id}`)
  if (['pre-mechanicals', 'pre-plantera'].includes(stageId)) for (const id of ['flaskVenom', 'flaskNanites']) assert(!ids.includes(id), `Post-Plantera vendor ingredient before Plantera: ${stageId}/${id}`)
  if (classId !== 'mage') for (const id of ['manaPotion', 'greaterManaPotion', 'superManaPotion', 'magicPowerPotion', 'manaRegenerationPotion', 'crystalBall', 'starBottle']) assert(!ids.includes(id), `Mage buff on ${classId}`)
  if (classId !== 'ranged') for (const id of ['archeryPotion', 'ammoReservationPotion', 'ammoBox']) assert(!ids.includes(id), `Ranged buff on ${classId}`)
  if (classId === 'summoner') assert(!ids.includes('ragePotion') && !ids.includes('sharpeningStation'), 'Do not recommend ordinary crit or melee-only armor penetration for summons')
  if (['mage', 'ranged'].includes(classId)) assert.equal(prep.flasks.length, 0)
  if (['pre-boss', 'pre-hardmode-optional', 'pre-skeletron', 'dungeon-pre-plantera'].includes(stageId)) assert(!ids.includes('bewitchingTable') && !ids.includes('alchemyFlask'), 'Do not require Dungeon rewards for entry')
  if (stageId === 'dungeon-post-plantera') assert(!ids.includes('superManaPotion'), 'Do not require Ectoplasm before entering the post-Plantera Dungeon')
  if (stageId === 'pre-mechanicals') assert(!ids.includes('jungleJuice'), 'First mech must not require Life Fruit')
  assert.equal(ids.includes('superHealingPotion'), stageId === 'pre-moon-lord', 'Lunar fragments belong after the pillars')
  if (prep.flasks.length) assert.match(prep.flaskNote, /one flask at a time/)
}
assert.deepEqual(getPreparation('pre-wof', 'melee').flasks, ['flaskPoison'], 'Wall of Flesh is immune to fire')
assert.deepEqual(getPreparation('pre-skeletron', 'melee').flasks, ['flaskFire'], 'Skeletron is immune to poison')
assert.match(getPreparation('pre-mechanicals', 'summoner').flaskNote, /Destroyer is immune/)
for (const classId of ['melee', 'summoner']) assert.deepEqual(getPreparation('pre-lunatic', classId).flasks, ['flaskNanites'], 'Cultist is immune to the other recommended flask debuffs')
assert.deepEqual(gearAcquisition.flaskNanites.recipes[0].ingredients, [['Bottled Water', 1], ['Nanites', 5]])
assert.deepEqual(gearAcquisition.superManaPotion.recipes[0].ingredients, [['Greater Mana Potion', 8], ['Fallen Star', 2], ['Ectoplasm', 1]])
assert.equal(gearAcquisition.superManaPotion.recipes[0].quantity, 8)
assert.equal(gearAcquisition.jungleJuice.recipes[0].quantity, 3)
assert.equal(gearAcquisition.superHealingPotion.recipes[0].quantity, 4)
for (const [file, frameHeight] of [['Ale.png', 20], ['Seafood_Dinner.png', 22], ['Fallen_Star.png', 26]]) {
  assert.equal(fs.readFileSync(`public/items/${file}`).readUInt32BE(20), frameHeight, `${file} must be an inventory frame, not a sprite strip`)
}
console.log(`Verified preparation for all ${loadouts.length} class/stage builds, progression gates, class restrictions, recipes, and local sprites.`)

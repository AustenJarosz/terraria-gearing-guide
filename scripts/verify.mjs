import assert from 'node:assert/strict'
import fs from 'node:fs'
import { items } from '../src/data/items.js'
import { classes, stages, loadouts } from '../src/data/gear.js'
import { sideStages, sideEncounters } from '../src/data/roadmap.js'
import { bossArt, enemyArt } from '../src/data/bossArt.js'
import { bossDrops } from '../src/data/bossDrops.js'
import { checklistEvents } from '../src/data/checklistEvents.js'
import { checklistArt } from '../src/data/checklistArt.js'
const earlyBlood = checklistEvents.bloodEarly.drops
const hardBlood = checklistEvents.bloodHard.drops
assert(earlyBlood.some(drop => drop.name === 'Money Trough' && drop.enemy === 'Blood Zombie & Drippler' && drop.rate === '1%'))
assert(earlyBlood.some(drop => drop.name === 'Shark Tooth Necklace' && drop.rate === '1.33%'))
assert(!earlyBlood.some(drop => drop.enemy === 'Clown'), 'Clowns require Hardmode')
assert(hardBlood.some(drop => drop.name === 'Bananarang' && drop.enemy === 'Clown'))
assert(earlyBlood.every(drop => hardBlood.includes(drop)), 'Earlier Blood Moon rewards remain in Hardmode')
assert.equal(checklistEvents.armyOne.drops.find(drop => drop.name === "Dark Mage's Tome").kind, 'Mount')
assert.equal(checklistEvents.armyTwo.drops.filter(drop => drop.rate === '20%').length, 5, 'Tier 2 Ogre has five weapon rewards')
assert(!checklistEvents.armyTwo.drops.some(drop => drop.name === "Ogre's Club"), 'Ogre pet is tier 3 only')
for (const event of Object.values(checklistEvents)) {
 assert(checklistArt[event.id], `Missing event icon: ${event.name}`)
 for (const file of [checklistArt[event.id], ...event.drops.map(drop => drop.file)]) {
  const png = fs.readFileSync(`public/items/${file}`)
  assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `Invalid checklist sprite: ${file}`)
 }
}
assert.deepEqual([...new Set(bossDrops['evil-boss'].map(drop => drop.enemy))], ['Eater of Worlds', 'Brain of Cthulhu'])
assert.equal(bossDrops['queen-slime'].length, 8)
assert(!bossDrops['pre-mechanicals'].some(drop => drop.enemy === 'Queen Slime'))
const spriteManifest = JSON.parse(fs.readFileSync('scripts/sprite-manifest.json'))
assert.equal(spriteManifest['Laser_Rifle.png'], 514, 'Laser Rifle must not use Clockwork Assault Rifle sprite')
assert.deepEqual(bossArt.twins, [15, 20], 'Twins must show Retinazer and Spazmatism')
assert.deepEqual(bossArt.prime, [18], 'Skeletron Prime portrait')
assert.deepEqual(bossArt['evil-boss'], [2, 23], 'Both world-evil boss portraits')
assert.deepEqual(bossArt['queen-slime'], [38], 'Queen Slime portrait')
import { dungeonDrops } from '../src/data/dungeonDrops.js'
for (const [stageId, groups] of Object.entries(dungeonDrops)) {
 const enemies = groups.flatMap(group => group.enemies)
 assert.equal(new Set(enemies.map(enemy => enemy.name)).size, enemies.length, `Duplicate Dungeon enemy: ${stageId}`)
 for (const enemy of enemies) {
  assert(enemy.source && enemy.drops.length, `Missing Dungeon loot: ${enemy.name}`)
  assert.equal(new Set(enemy.drops.map(drop => drop.name)).size, enemy.drops.length)
  for (const drop of enemy.drops) {
   const rate = Number(drop.rate.replace('%', ''))
   assert(rate > 0 && rate <= 100, `Invalid Dungeon rate: ${drop.name}`)
   const png = fs.readFileSync(`public/items/${drop.file}`)
   assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `Invalid Dungeon sprite: ${drop.name}`)
  }
 }
}
const firstDungeon = dungeonDrops['dungeon-pre-plantera'].flatMap(group => group.enemies)
const lateDungeon = dungeonDrops['dungeon-post-plantera'][0].enemies
assert(!firstDungeon.some(enemy => enemy.drops.some(drop => drop.name === 'Ectoplasm')), 'Ectoplasm requires Plantera')
assert.equal(lateDungeon.find(enemy => enemy.name === 'Dungeon Spirit').drops[0].quantity, '1–2')
assert(!lateDungeon.some(enemy => enemy.drops.some(drop => drop.name === 'Tally Counter')), 'Tally Counter belongs to early enemies')
assert.equal(dungeonDrops['dungeon-post-plantera'][1].enemies, dungeonDrops['dungeon-pre-plantera'][0].enemies, 'Returning enemies retain their loot')
for (const stage of [...stages, ...sideEncounters].filter(stage => stage.era === 'hardmode' && !stage.encounters && stage.kind !== 'Dungeon')) {
 assert(bossDrops[stage.id]?.length, `Missing Hardmode loot: ${stage.id}`)
 for (const drop of bossDrops[stage.id]) {
  assert(drop.enemy && drop.method, `Missing drop origin: ${drop.name}`)
  const rates = drop.rate.replace(/[%*]/g, '').split('–').map(Number)
  assert(rates.every(rate => Number.isFinite(rate) && rate > 0 && rate <= 100), `Invalid drop chance: ${drop.name}`)
  assert(rates.length === 1 || (rates.length === 2 && rates[0] <= rates[1]), `Invalid chance range: ${drop.name}`)
  if (rates.length > 1 || drop.rate.includes('*')) assert(drop.note, `Missing drop condition: ${drop.name}`)
 }
}
for (const [stageId, drops] of Object.entries(bossDrops)) {
 assert(['evil-boss', 'queen-slime'].includes(stageId) || [...stages, ...sideEncounters].some(stage => stage.id === stageId), `Unknown loot stage: ${stageId}`)
 assert.equal(new Set(drops.map(drop => `${drop.enemy || ''}/${drop.name}`)).size, drops.length, `Duplicate loot: ${stageId}`)
 for (const drop of drops) {
  assert(drop.kind && drop.source && drop.rate, `Incomplete drop: ${drop.name}`)
  const png = fs.readFileSync(`public/items/${drop.file}`)
  assert.equal(png.subarray(0,8).toString('hex'), '89504e470d0a1a0a', `Invalid loot sprite: ${drop.name}`)
 }
}
for (const stage of stages) {
 if (stage.kind === 'Dungeon') {
  assert(stage.rewards && stage.rewardNote && stage.theme === 'dungeon', `Incomplete Dungeon visit: ${stage.id}`)
  assert(stage.art && fs.existsSync(`public${stage.art}`), `Missing Dungeon illustration: ${stage.id}`)
 } else assert(bossArt[stage.id]?.length, `Missing boss art: ${stage.id}`)
}
for (const stage of sideEncounters) assert(bossArt[stage.id]?.length || enemyArt[stage.id]?.length, `Missing encounter art: ${stage.id}`)
for (const enemy of Object.values(enemyArt).flat()) {
 const png = fs.readFileSync(`public/bosses/npc-${enemy.id}.png`)
 assert.equal(png.subarray(0,8).toString('hex'), '89504e470d0a1a0a')
 assert.equal(png.readUInt32BE(16), enemy.width)
 assert.equal(png.readUInt32BE(20) % enemy.frameHeight, 0, `Invalid portrait frame: ${enemy.name}`)
}
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

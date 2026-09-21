import assert from 'node:assert/strict'
import { classes, stages, loadouts } from '../src/data/gear.js'
import { items } from '../src/data/items.js'
import { gearAcquisition } from '../src/data/gearAcquisition.js'
import { equipmentLinkTypes, weaponFamilies, ammoFamilies } from '../src/data/equipmentLinks.js'

// First-entry progression gates. Some optional bosses can be fought sooner than
// the suggested route; their gear still cannot be required to beat themselves.
const gates = [
  ['pre-mechanicals', 'yoyoGlove holyArrow ichorArrow crystalBullet ichorBullet cursedDart ichorDart crystalDart'],
  ['pre-plantera', 'chlorophyteBullet'],
  ['dungeon-post-plantera', 'venomArrow nanoBullet'],
  ['pre-golem', 'spectreStaff'],
  ['event-upgrades', 'styngerBolt'],
  ['pre-lunatic', 'kraken electricEel'],
  ['pre-hardmode-optional', 'shieldCthulhu wormScarf brainConfusion moltenArmor moltenFury volcano impStaff obsidianArmor meteorArmor spaceGun grayZap'],
  ['pre-skeletron', 'beeArmor hornetStaff hiveFive beesKnees beeGun beeKeeper hivePack stingerNecklace pygmyNecklace'],
  ['dungeon-pre-plantera', 'boneGlove'],
  ['pre-wof', 'necroArmor nightsEdge darkLance waterBolt flamelash phoenixBlaster hellwingBow spinalTap silverBracer silverShield restorationShield obsidianShield'],
  ['pre-mechanicals', 'adamantiteArmor titaniumArmor spiderArmor wingsEarly warriorEmblem rangerEmblem sorcererEmblem summonerEmblem powerGlove charmMyths manaCloak shadowflameKnife bananarang chainGuillotines amarok daedalus onyxBlaster dartRifle dartPistol spiritFlame skyFracture lifeDrain nimbusRod goldenShower ruinousStaff sanguineStaff bladeStaff firecracker coolWhip yoyoBag berserkerGlove twilightGrasp magicQuiver moltenQuiver phoenixQuiver'],
  ['pre-plantera', 'hallowedArmor turtleArmor chlorophyteArmor trueNightsEdge trueExcalibur chlorophyteClaymore megashark flamethrower shotbow rainbowRod venomStaff durendal opticStaff avengerEmblem fireGauntlet mechanicalGlove celestialEmblem magicYoyoBag'],
  ['dungeon-post-plantera', 'leafWings tikiArmor herculesBeetle shroomiteArmor seedler pygmyStaff waspGun vulgarFlower'],
  ['pre-golem', 'spectreArmor masterNinja mysticArtsSash frozenShield paladinsHammer tacticalShotgun reconScope infernoFork magnetSphere desertTiger morningStar terraBlade'],
  ['event-upgrades', 'beetleArmor steampunkWings celestialShell destroyerEmblem possessedHatchet stynger heatRay'],
  ['pre-moon-lord', 'daybreak solarEruption phantasm vortexBeater nebulaBlaze nebulaArcanum stardustDragon stardustCell constellation'],
]
const rank = id => stages.findIndex(stage => stage.id === id)
const earliest = new Map(gates.flatMap(([stage, ids]) => ids.split(' ').map(id => [id, rank(stage)])))
const oneOf = [
  ['hermesBoots', 'spectreBoots', 'lightningBoots', 'amphibianBoots'],
  ['wingsEarly', 'leafWings', 'steampunkWings', 'fishronWings'],
  ['shieldCthulhu', 'masterNinja'],
  ['manaFlower', 'magnetFlower', 'manaCloak', 'celestialCuffs'],
  ['manaRegenBand', 'restorationShield', 'mysticArtsSash'],
  ['whiteString', 'strungCounterweight', 'yoyoGlove', 'yoyoBag', 'magicYoyoBag'],
  ['cloudBottle', 'cloudBalloon', 'horseshoeBalloons'],
]
const validateEquipped = (accessories, key) => {
  assert.equal(new Set(accessories).size, accessories.length, `Duplicate equipped accessory: ${key}`)
  for (const family of oneOf) assert(accessories.filter(id => family.includes(id)).length <= 1, `Redundant accessory family: ${key}/${family}`)
  if (accessories.includes('soaringInsignia')) assert(accessories.some(id => oneOf[1].includes(id)), `Insignia without wings: ${key}`)
}

for (const stage of stages) for (const cls of classes) {
  const key = `${stage.id}/${cls.id}`
  const matches = loadouts.filter(kit => kit.stageId === stage.id && kit.classId === cls.id)
  assert.equal(matches.length, 1, `Missing or duplicate build: ${key}`)
  const kit = matches[0]
  assert.equal(kit.accessories.length, stage.era === 'hardmode' ? 7 : 6, `Unfilled Master slots: ${key}`)
  assert(kit.armor.length && kit.weapons.length && kit.notes, `Incomplete build: ${key}`)
  validateEquipped(kit.accessories, key)
  const listed = [...kit.armor, ...kit.weapons, ...kit.accessories, ...kit.ammo]
  for (const [slot, choice] of Object.entries(kit.accessoryChoices)) {
    assert(kit.accessories.includes(slot), 'Choice must replace an equipped slot: ' + key)
    assert(choice.ids.includes(slot) && choice.ids.length > 1 && choice.label, 'Incomplete choice: ' + key)
    assert.equal(new Set(choice.ids).size, choice.ids.length)
    for (const id of choice.ids) {
      validateEquipped(kit.accessories.map(base => base === slot ? id : base), key + ' choice ' + id)
      listed.push(id)
    }
  }
  for (const alternative of kit.accessorySwaps) {
    assert(kit.accessories.includes(alternative.replaces), `Swap has no equipped target: ${key}/${alternative.id}`)
    assert(!kit.accessories.includes(alternative.id), `Swap already equipped: ${key}/${alternative.id}`)
    assert(alternative.text, `Unexplained swap: ${key}/${alternative.id}`)
    validateEquipped(kit.accessories.map(id => id === alternative.replaces ? alternative.id : id), `${key} swap ${alternative.id}`)
    listed.push(alternative.id)
  }
  for (const [id, links] of Object.entries(kit.itemLinks)) {
    assert(listed.includes(id), 'Badge on unlisted item: ' + key + '/' + id)
    assert(links.every(link => equipmentLinkTypes[link]), 'Unknown equipment label: ' + key)
  }
  for (const link of new Set(Object.values(kit.itemLinks).flat())) {
    assert(kit.weapons.some(id => kit.itemLinks[id]?.includes(link)), 'Pairing label needs a weapon: ' + key)
    const connected = [...new Set(listed)].filter(id => kit.itemLinks[id]?.includes(link))
    assert(connected.length >= 2, 'Pairing label needs distinct partners: ' + key + '/' + link)
    if (['rapidHits', 'heavyHits'].includes(link)) {
      assert(connected.some(id => weaponFamilies[link].includes(id)), 'Missing minion for whip pairing: ' + key)
      assert(connected.some(id => weaponFamilies.whips.includes(id)), 'Missing whip for minion pairing: ' + key)
    } else {
      assert(connected.some(id => !kit.weapons.includes(id)), 'Pairing needs matching armor, accessory or ammo: ' + key + '/' + link)
    }
  }
  const visibleAccessories = [...kit.accessories, ...Object.values(kit.accessoryChoices).flatMap(choice => choice.ids)]
  if (kit.weapons.some(id => weaponFamilies.yoyo.includes(id))) {
    assert(visibleAccessories.some(id => oneOf[5].includes(id)), 'Yoyo support hidden or absent: ' + key)
    const expectedSupport = stage.era === 'hardmode' ? 'yoyoBag' : 'strungCounterweight'
    assert(visibleAccessories.includes(expectedSupport), 'Missing stage-appropriate yoyo pairing: ' + key)
  }
  if (kit.weapons.includes('bladeStaff')) assert(!kit.itemLinks.bladeStaff?.includes('heavyHits'), 'Blade Staff needs flat tags, not Firecracker')
  if (kit.itemLinks.meteorArmor) assert(kit.weapons.some(id => ['spaceGun', 'grayZap'].includes(id)), 'Meteor set needs a compatible gun')
  for (const [family, ammoIds] of Object.entries(ammoFamilies)) {
    if (cls.id === 'ranged' && kit.weapons.some(id => weaponFamilies[family].includes(id))) {
      assert(kit.ammo.some(id => ammoIds.includes(id)), 'Missing compatible ammunition: ' + key + '/' + family)
    }
  }
  for (const id of kit.ammo) {
    assert(Object.entries(ammoFamilies).some(([family, ammoIds]) => ammoIds.includes(id) && kit.weapons.some(weapon => weaponFamilies[family].includes(weapon))), 'Ammo without a matching weapon: ' + key + '/' + id)
  }
  if (kit.weapons.some(id => ['beesKnees', 'hellwingBow', 'eventide'].includes(id))) assert(kit.ammo.includes('woodenArrow'), 'Missing special-conversion ammo: ' + key)
  for (const id of listed) {
    assert(items[id] && gearAcquisition[id], `Unknown item or acquisition: ${key}/${id}`)
    if (earliest.has(id)) assert(rank(stage.id) >= earliest.get(id), `Item before its progression gate: ${key}/${id}`)
  }
  for (const [id, notes] of Object.entries(kit.itemNotes)) {
    assert(listed.includes(id), `Note for an unlisted item: ${key}/${id}`)
    assert(notes.every(row => row.label && row.text), `Incomplete item guidance: ${key}/${id}`)
  }
  if (cls.id === 'summoner') assert(!kit.accessories.includes('destroyerEmblem'), `Crit accessory in minion build: ${key}`)
  if (kit.accessories.some(id => ['magicQuiver', 'moltenQuiver', 'phoenixQuiver'].includes(id))) {
    assert(cls.id === 'ranged' && ['daedalus', 'shotbow', 'tsunami', 'eventide', 'phantasm'].includes(kit.weapons[0]), `Quiver on the default gun build: ${key}`)
  }
}

// Encounter-specific constraints that a generic chronological ordering misses.
const forbiddenAtEntry = {
  'dungeon-pre-plantera': ['necroArmor', 'nightsEdge', 'waterBolt', 'phoenixBlaster', 'spinalTap', 'silverBracer', 'silverShield', 'restorationShield'],
  'dungeon-post-plantera': ['spectreArmor', 'masterNinja', 'frozenShield', 'mysticArtsSash', 'morningStar', 'desertTiger', 'tacticalShotgun', 'reconScope'],
  'optional-bosses': ['fishronWings', 'soaringInsignia', 'tsunami', 'eventide', 'razorTyphoon', 'kaleidoscope', 'terraprisma', 'kraken', 'electricEel'],
  'event-upgrades': ['terraBlade', 'eyeYoyo', 'spookyArmor', 'papyrusScarab', 'necromanticScroll', 'xenoStaff', 'razorpine', 'influxWaver', 'flyingDragon'],
}
for (const kit of loadouts) for (const id of forbiddenAtEntry[kit.stageId] || []) {
  assert(![...kit.armor, ...kit.weapons, ...kit.accessories, ...kit.accessorySwaps.map(swap => swap.id), ...kit.ammo, ...Object.values(kit.accessoryChoices).flatMap(choice => choice.ids)].includes(id), `Entry kit needs its own rewards: ${kit.stageId}/${kit.classId}/${id}`)
}
for (const kit of loadouts.filter(kit => kit.stageId === 'pre-lunatic')) {
  assert(!kit.ammo.includes('chlorophyteBullet'), 'Avoid the Cultist homing-ammo penalty in recommended ammunition')
}
console.log(`Verified ${loadouts.length} complete Master Mode builds, swaps, pairings, and first-entry progression gates.`)

// Small, named badges connect compatible gear across columns. They never
// filter the weapon list or change Terraria's item-rarity colors.
export const equipmentLinkTypes = {
  swords: { label: 'Swords' }, boomerangs: { label: 'Boomerangs' }, yoyo: { label: 'Yoyo' },
  bows: { label: 'Bows' }, guns: { label: 'Guns' }, darts: { label: 'Darts' },
  stars: { label: 'Star Cannon' }, gel: { label: 'Flames' }, bolts: { label: 'Stynger' },
  bees: { label: 'Bees' }, meteor: { label: 'Meteor set' }, gems: { label: 'Gem set' }, mana: { label: 'Mana' },
  rapidHits: { label: 'Rapid hits' }, heavyHits: { label: 'Heavy hits' }, whips: { label: 'Whips' },
}

const ids = text => text.split(' ')
export const weaponFamilies = {
  swords: ids('bladeOfGrass starfury enchantedSword volcano nightsEdge trueNightsEdge trueExcalibur chlorophyteClaymore terraBlade influxWaver flyingDragon'),
  boomerangs: ids('trimarang thornChakram bananarang possessedHatchet paladinsHammer'),
  yoyo: ids('amazon hiveFive cascade amarok yelets eyeYoyo kraken'),
  bows: ids('goldBow moltenFury beesKnees hellwingBow daedalus shotbow tsunami eventide phantasm'),
  guns: ids('boomstick musket undertaker minishark phoenixBlaster onyxBlaster megashark tacticalShotgun venusMagnum xenopopper chainGun vortexBeater clockwork'),
  darts: ids('dartRifle dartPistol'), stars: ['starCannon'], gel: ['flamethrower'], bolts: ['stynger'],
  bees: ids('hiveFive beesKnees beenades'), meteor: ids('spaceGun grayZap'), gems: ids('diamondStaff rubyStaff'),
  rapidHits: ids('flinxStaff vampireFrog impStaff hornetStaff bladeStaff opticStaff xenoStaff ravenStaff stardustCell pygmyStaff'),
  heavyHits: ids('ruinousStaff sanguineStaff desertTiger stardustDragon pygmyStaff'),
  whips: ids('snapthorn spinalTap coolWhip firecracker durendal vulgarFlower morningStar darkHarvest electricEel kaleidoscope constellation'),
}
export const ammoFamilies = {
  bows: ids('woodenArrow frostburnArrow unholyArrow holyArrow ichorArrow venomArrow'),
  guns: ids('silverBullet tungstenBullet musketBall meteorShot crystalBullet ichorBullet chlorophyteBullet nanoBullet'),
  darts: ids('cursedDart ichorDart crystalDart'), stars: ['fallenStarAmmo'], gel: ['gelAmmo'], bolts: ['styngerBolt'],
}
const stageAmmo = {
  'pre-boss': ids('frostburnArrow silverBullet tungstenBullet musketBall'),
  'pre-hardmode-optional': ids('frostburnArrow silverBullet tungstenBullet musketBall'),
  'pre-skeletron': ids('woodenArrow frostburnArrow fallenStarAmmo'),
  'dungeon-pre-plantera': ids('frostburnArrow woodenArrow silverBullet tungstenBullet musketBall'),
  'pre-wof': ids('woodenArrow meteorShot fallenStarAmmo'),
  'pre-mechanicals': ids('unholyArrow holyArrow crystalBullet ichorBullet cursedDart ichorDart crystalDart'),
  'pre-plantera': ids('crystalBullet chlorophyteBullet ichorBullet gelAmmo holyArrow ichorArrow'),
  'dungeon-post-plantera': ids('nanoBullet crystalBullet chlorophyteBullet venomArrow ichorArrow gelAmmo'),
  'pre-golem': ids('nanoBullet crystalBullet chlorophyteBullet ichorBullet venomArrow ichorArrow gelAmmo'),
  'event-upgrades': ids('nanoBullet crystalBullet chlorophyteBullet styngerBolt venomArrow ichorArrow'),
  'optional-bosses': ids('chlorophyteBullet nanoBullet crystalBullet venomArrow ichorArrow'),
  'pre-lunatic': ids('nanoBullet crystalBullet venomArrow woodenArrow'),
  'celestial-pillars': ids('nanoBullet crystalBullet chlorophyteBullet venomArrow woodenArrow'),
  'pre-moon-lord': ids('venomArrow holyArrow ichorArrow chlorophyteBullet nanoBullet crystalBullet'),
}

export function getLinkedEquipment(stageId, classId, kit) {
  const accessoryChoices = { ...kit.accessoryChoices }
  const itemNotes = {}
  let meteorAlternative
  const has = family => kit.weapons.some(id => weaponFamilies[family].includes(id))
  const choice = (slot, label, options) => { accessoryChoices[slot] = { ...accessoryChoices[slot], label, ids: [...new Set([slot, ...options])] } }
  if (classId === 'melee' && has('yoyo')) {
    const hardmode = kit.accessories.some(id => ['wingsEarly', 'leafWings', 'steampunkWings'].includes(id))
    if (!hardmode) {
      choice('feralClaws', 'Weapon support · choose one', ['strungCounterweight', 'whiteString'])
      itemNotes.strungCounterweight = [{ label: 'Yoyo upgrade', text: 'Use instead of Feral Claws for this yoyo setup. Requires the Goblin Tinkerer; White String is the easy fallback.' }]
    } else {
      const oldSwap = kit.accessorySwaps.find(swap => ['yoyoBag', 'magicYoyoBag'].includes(swap.id))
      const slot = oldSwap?.replaces || (kit.accessories.includes('charmMyths') ? 'charmMyths' : 'warriorEmblem')
      choice(slot, 'Yoyo support · choose one', stageId === 'pre-mechanicals' ? ['yoyoBag', 'yoyoGlove'] : ['magicYoyoBag', 'yoyoBag'])
      itemNotes.yoyoBag = [{ label: 'Yoyos only', text: 'Combines glove, string and counterweight effects in one slot. Use the ordinary accessory in this group with other weapons.' }]
      if (stageId !== 'pre-mechanicals') itemNotes.magicYoyoBag = [{ label: 'Yoyo alternative', text: 'Adds Magic String’s detached throw. Keep Yoyo Bag if you prefer normal retraction; do not equip both bags.' }]
      else itemNotes.yoyoGlove = [{ label: 'Yoyo fallback', text: 'Use while collecting the bag components. The bag already includes its second-yoyo effect.' }]
    }
  }
  if (stageId === 'pre-boss' && classId === 'melee') choice('sharkTooth', 'Damage · choose one', ['pyroclasticStone'])
  if (classId === 'mage' && has('meteor')) {
    const swap = kit.accessorySwaps.find(row => row.replaces === 'magnetFlower')
    if (swap) {
      meteorAlternative = swap.id
      choice('magnetFlower', 'Mana / Meteor · choose one', [...accessoryChoices.magnetFlower.ids, swap.id])
      itemNotes[swap.id] = [{ label: 'Meteor alternative', text: 'Use with Meteor armor and Space Gun / Gray Zapinator, which do not need automatic mana potions. Keep mana support for the other spells.' }]
    }
  }
  if (classId === 'ranged' && has('bows')) {
    const swap = kit.accessorySwaps.find(row => row.id === 'phoenixQuiver' || row.replaces === 'phoenixQuiver')
    if (swap) {
      choice(swap.replaces, 'Weapon support · choose one', [swap.id, 'magicQuiver'])
      itemNotes.phoenixQuiver = [{ label: 'Arrows only', text: 'Choose the quiver for bows; use the other accessory in this slot with guns, darts or Stynger. Magic Quiver is the base fallback.' }]
    }
  }
  const ammo = classId === 'ranged' ? (stageAmmo[stageId] || []).filter(id => Object.entries(ammoFamilies).some(([family, members]) => members.includes(id) && has(family))) : []
  const accessorySwaps = kit.accessorySwaps.filter(swap => !accessoryChoices[swap.replaces]?.ids.includes(swap.id))
  const listed = new Set([...kit.weapons, ...kit.armor, ...kit.accessories, ...ammo, ...accessorySwaps.map(swap => swap.id), ...Object.values(accessoryChoices).flatMap(group => group.ids)])
  const itemLinks = {}
  const link = (id, family) => { if (listed.has(id)) itemLinks[id] = [...new Set([...(itemLinks[id] || []), family])] }
  const connect = (family, partners) => {
    if (!has(family) || !partners.some(id => listed.has(id))) return
    weaponFamilies[family].forEach(id => link(id, family))
    partners.forEach(id => link(id, family))
  }
  connect('yoyo', ids('whiteString strungCounterweight yoyoGlove yoyoBag magicYoyoBag'))
  connect('swords', ids('feralClaws powerGlove fireGauntlet mechanicalGlove'))
  connect('boomerangs', ids('feralClaws powerGlove fireGauntlet mechanicalGlove'))
  connect('bees', ['hivePack'])
  connect('meteor', ['meteorArmor', meteorAlternative])
  connect('gems', ['diamondRobe'])
  for (const [family, members] of Object.entries(ammoFamilies)) connect(family, members)
  if (has('bows')) for (const id of ids('phoenixQuiver magicQuiver moltenQuiver')) link(id, 'bows')
  if (classId === 'mage') {
    kit.weapons.filter(id => !weaponFamilies.meteor.includes(id)).forEach(id => link(id, 'mana'))
    ids('bandStarpower manaRegenBand restorationShield mysticArtsSash magnetFlower manaFlower manaCloak celestialCuffs').forEach(id => link(id, 'mana'))
  }
  connect('rapidHits', ids('snapthorn spinalTap coolWhip durendal morningStar electricEel kaleidoscope constellation'))
  connect('heavyHits', ids('firecracker vulgarFlower'))
  connect('whips', ids('feralClaws wickedClaws berserkerGlove silverShield twilightGrasp'))
  if (listed.has('twilightGrasp')) itemNotes.twilightGrasp = [{ label: 'Up to three tags', text: 'Adds two tag slots. Maintain at most three different whip tags; the listed whips are choices, not a requirement to cycle every one.' }]
  if (listed.has('ichorArrow')) itemNotes.ichorArrow = [{ label: 'Crimson material', text: 'Use to lower susceptible targets’ defense; choose the other listed arrows if you cannot obtain Ichor.' }]
  if (listed.has('ichorBullet')) itemNotes.ichorBullet = [{ label: 'Crimson material', text: 'Use against targets vulnerable to Ichor, then switch to your damage ammo if desired. Crystal Bullets are available in either world.' }]
  if (listed.has('ichorDart')) itemNotes.ichorDart = [{ label: 'Crimson material', text: 'Either dart weapon can fire it. The Destroyer is immune to Ichor, although the splitting darts still deal damage.' }]
  if (listed.has('cursedDart')) itemNotes.cursedDart = [{ label: 'Corruption material', text: 'Either dart weapon can fire it. Crystal Darts are the alternative available in either world.' }]
  return { accessoryChoices, accessorySwaps, ammo, itemLinks, itemNotes }
}

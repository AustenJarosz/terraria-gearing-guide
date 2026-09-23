// First-clear recommendations. Keep progression and encounter exceptions here.
const preHardmode = { healing: 'healingPotion', mana: 'manaPotion' }
const hardmode = { healing: 'greaterHealingPotion', mana: 'greaterManaPotion', hardmode: true, dungeonVisited: true, sentryStation: true }
const postMechs = { ...hardmode, healing: 'jungleJuice' }
const postPlantera = { ...postMechs, postPlantera: true }
const postDungeon = { ...postPlantera, mana: 'superManaPotion' }

export const preparationStages = {
  'pre-boss': { ...preHardmode },
  'pre-hardmode-optional': { ...preHardmode, extras: ['warmthPotion'] },
  'pre-skeletron': { ...preHardmode, queenBeeOptional: true, sentryStation: true },
  'dungeon-pre-plantera': { ...preHardmode, queenBeeOptional: true, sentryStation: true },
  'pre-wof': { ...preHardmode, queenBeeOptional: true, dungeonVisited: true, sentryStation: true, extras: ['obsidianSkinPotion', 'heartreachPotion'] },
  'pre-mechanicals': { ...hardmode, extras: ['heartreachPotion'] },
  'pre-plantera': { ...postMechs },
  'dungeon-post-plantera': { ...postPlantera },
  'pre-golem': { ...postDungeon },
  'event-upgrades': { ...postDungeon, extras: ['heartreachPotion', 'warmthPotion'] },
  'optional-bosses': { ...postDungeon },
  'pre-lunatic': { ...postDungeon },
  'celestial-pillars': { ...postDungeon, extras: ['heartreachPotion'] },
  'pre-moon-lord': { ...postDungeon, healing: 'superHealingPotion' },
}

const note = (label, text) => [{ label, text }]

export function getPreparation(stageId, classId) {
  const stage = preparationStages[stageId]
  if (!stage) throw new Error(`Missing preparation recommendations for ${stageId}`)
  const essentials = [stage.healing, 'seafoodDinner', 'ironskinPotion', 'regenerationPotion', 'swiftnessPotion', 'endurancePotion']
  if (stage.hardmode) essentials.push('lifeforcePotion')
  const classPotions = {
    melee: ['ale'],
    ranged: ['archeryPotion', 'ammoReservationPotion'],
    mage: [stage.mana, 'magicPowerPotion', 'manaRegenerationPotion'],
    summoner: ['summoningPotion'],
  }[classId]
  if (!classPotions) throw new Error(`Unknown preparation class: ${classId}`)
  classPotions.push('wrathPotion')
  if (classId !== 'summoner') classPotions.push('ragePotion')

  const stations = []
  if (classId === 'melee') stations.push('sharpeningStation')
  if (classId === 'ranged' && stage.hardmode) stations.push('ammoBox')
  if (classId === 'mage' && stage.hardmode) stations.push('crystalBall')
  if (classId === 'summoner' && stage.dungeonVisited) stations.push('bewitchingTable')
  if (classId === 'summoner' && stage.sentryStation) stations.push('warTable')
  if (stage.dungeonVisited) stations.push('alchemyFlask')
  const nearby = ['campfire', 'heartLantern']
  if (classId === 'mage') nearby.push('starBottle')

  let flasks = []
  if (['melee', 'summoner'].includes(classId)) {
    if (stageId === 'pre-lunatic') flasks = ['flaskNanites']
    else if (stage.postPlantera) flasks = ['flaskVenom', 'flaskIchor', 'flaskNanites']
    else if (stage.hardmode) flasks = ['flaskIchor', 'flaskCursedFlames']
    else if (stage.queenBeeOptional) flasks = [stageId === 'pre-wof' ? 'flaskPoison' : 'flaskFire']
  }

  const notes = {
    seafoodDinner: note('Food example', 'Any food buff helps. Use Exquisitely Stuffed food if you have it; food buffs do not stack.'),
    ale: note('Optional offense', 'Costs 4 defense. Skip it if you need more survivability.'),
    wrathPotion: note('Corruption fish', classId === 'summoner' ? 'Boosts minions too. Needs Ebonkoi; not a required farm in a Crimson world.' : 'Use what your world supplies. Stacks with Rage if you obtain both.'),
    ragePotion: note('Crimson fish', 'Use what your world supplies. Stacks with Wrath if you obtain both.'),
    archeryPotion: note('Bows / repeaters', 'Skip for guns, rockets, darts, or thrown weapons.'),
    sharpeningStation: note('Activate', stage.hardmode ? 'Buy from the Merchant, or reuse your Jungle find.' : 'Optional early Jungle-cabin find. No boss kill required.'),
    ammoBox: note('Activate', 'Sold by the Arms Dealer in Hardmode.'),
    crystalBall: note('Activate', 'Sold by the Wizard in Hardmode.'),
    bewitchingTable: note('Activate', 'Stacks with Summoning Potion. Summon the extra minion afterward.'),
    warTable: note('Sentries only', 'Optional Old One’s Army reward. Does not add another minion.'),
    alchemyFlask: note('Activate first', 'Use before drinking potions. Does not extend food or weapon flasks.'),
    heartLantern: note('Spare Life Crystal', 'Upgrade permanent health first. Stacks with Campfire.'),
    flaskIchor: note('Crimson · defense debuff', 'Less useful if another weapon already keeps Ichor applied.'),
    flaskCursedFlames: note('Corruption · damage over time', 'An alternative when Ichor is unavailable.'),
    flaskVenom: note('Post-Plantera', 'Strong damage over time; pairs well with a separate Ichor weapon.'),
    flaskNanites: note('Direct damage', 'Adds 5% to melee and whip hits in 1.4.5.7, even when the enemy cannot be confused. Does not increase minion damage.'),
  }
  if (stage.healing === 'healingPotion') notes.healingPotion = note('Early upgrade', 'Craft before bosses. Lesser Healing Potions restore 50 health if you need a cheaper fallback.')
  if (stage.healing === 'jungleJuice') notes.jungleJuice = note('Spare Life Fruit', 'Reach 500 permanent health first. Greater Healing Potions (150 health) are the cheaper fallback.')
  if (stage.mana === 'manaPotion') notes.manaPotion = note('Mana supply', 'Lesser Mana Potions (50 mana) from the Merchant are a cheaper fallback.')
  if (stage.mana === 'superManaPotion') notes.superManaPotion = note('Post-Dungeon upgrade', 'Uses Ectoplasm. Greater Mana Potions (200 mana) remain a cheaper fallback.')
  if (stageId === 'dungeon-pre-plantera' && classId === 'summoner') notes.summoningPotion = note('First visit', 'Pick up a Bewitching Table inside the Dungeon for another minion; it is not required to enter.')
  if (stageId === 'pre-mechanicals') notes.heartreachPotion = note('Destroyer', 'Helps collect hearts dropped by Probes.')
  if (stageId === 'pre-wof') {
    notes.heartreachPotion = note('The Hungry / Leeches', 'Collect their hearts from farther away. Craft with a Crimson fish, or use looted potions in either world.')
    notes.obsidianSkinPotion = note('Optional safety', 'For lava hazards along the fight, not protection from the boss’s attacks.')
  }
  if (stageId === 'event-upgrades') {
    notes.warmthPotion = note('Frost Moon', 'Useful against Ice Queen and other cold enemies. Not a general buff for all four events.')
    notes.heartreachPotion = note('Event waves', 'Collect hearts left by defeated enemies and minibosses.')
  }
  if (stageId === 'pre-hardmode-optional') notes.warmthPotion = note('Deerclops', 'For cold attacks, not Queen Bee or King Slime.')
  if (stageId === 'pre-lunatic') notes.flaskNanites = note('Cultist option', 'The damage bonus still works against the Cultist. Ichor and damage-over-time flasks do not help against his debuff immunity.')
  if (stageId === 'celestial-pillars') notes.heartreachPotion = note('Pillar enemies', 'Collect hearts during the enemy waves.')

  let flaskNote = 'Only one flask at a time. Applies to melee attacks and whips; minions do not apply it. Craft at the Witch Doctor’s Imbuing Station after Queen Bee.'
  if (stageId === 'pre-mechanicals') flaskNote += ' The Destroyer is immune to these flask debuffs; use them for the Twins or Skeletron Prime.'
  return { essentials, classPotions, flasks, flaskNote, stations, nearby, extras: stage.extras || [], notes }
}

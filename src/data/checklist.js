import { earlyEncounters } from './prehardmodeOptional.js'
import { sideEncounters } from './roadmap.js'
import { bossArt } from './bossArt.js'
import { checklistEvents as events } from './checklistEvents.js'

const boss = (id, name, source, art, stageId = id, enemy) => ({ id, name, source, art: bossArt[id] || art, stageId, enemy })
const existingEvent = id => ({ ...sideEncounters.find(row => row.id === id), event: true, art: bossArt[id] || [], stageId: 'event-upgrades' })
const dungeon = phase => ({ id: `dungeon-${phase}-plantera`, name: `Dungeon · ${phase === 'pre' ? 'Pre' : 'Post'}-Plantera`, kind: 'Dungeon', source: 'Dungeon', art: [] })

export const checklistGroups = [
  { name: 'Pre-Hardmode', note: 'Early encounters → ready for Hardmode', rows: [
    events.bloodEarly,
    { ...earlyEncounters[0], art: [7], stageId: 'pre-boss' },
    boss('pre-boss', 'Eye of Cthulhu', 'Eye_of_Cthulhu', [0]),
    boss('evil-boss', 'Eater of Worlds / Brain of Cthulhu', 'Bosses', [], 'pre-skeletron'),
    events.goblinEarly,
    events.armyOne,
    { ...earlyEncounters[1], art: [14], stageId: 'pre-skeletron' },
    { ...earlyEncounters[2], art: [39], stageId: 'pre-skeletron' },
    boss('pre-skeletron', 'Skeletron', 'Skeletron', [19]),
    dungeon('pre'),
    boss('pre-wof', 'Wall of Flesh', 'Wall_of_Flesh', [22]),
  ] },
  { name: 'Hardmode', note: 'Mechanical bosses → Moon Lord', rows: [
    events.bloodHard,
    events.goblinHard,
    events.pirates,
    boss('queen-slime', 'Queen Slime', 'Queen_Slime', [], 'pre-mechanicals'),
    boss('destroyer', 'The Destroyer', 'The_Destroyer', [25], 'pre-mechanicals', 'The Destroyer'),
    boss('twins', 'The Twins', 'The_Twins', [15, 20], 'pre-mechanicals', 'The Twins'),
    boss('prime', 'Skeletron Prime', 'Skeletron_Prime', [18], 'pre-mechanicals', 'Skeletron Prime'),
    events.armyTwo,
    boss('pre-plantera', 'Plantera', 'Plantera', [11]),
    dungeon('post'),
    existingEvent('solar-eclipse'),
    existingEvent('pumpkin-moon'),
    existingEvent('frost-moon'),
    boss('pre-golem', 'Golem', 'Golem', [5]),
    existingEvent('martian-madness'),
    { ...existingEvent('old-ones-army'), name: 'Old One’s Army · Tier 3', enemy: 'Betsy' },
    ...sideEncounters.filter(row => row.era === 'hardmode' && row.kind === 'Optional boss').map(row => ({ ...row, stageId: 'optional-bosses', art: bossArt[row.id] })),
    boss('pre-lunatic', 'Lunatic Cultist', 'Lunatic_Cultist', [24]),
    { ...boss('celestial-pillars', 'Lunar Events', 'Lunar_Events', [27, 28, 29, 30]), event: true },
    boss('pre-moon-lord', 'Moon Lord', 'Moon_Lord', [8]),
  ] },
]

export const checklistType = row => row.kind === 'Dungeon' ? 'Dungeons' : row.event ? 'Events' : 'Bosses'

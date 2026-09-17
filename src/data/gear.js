import { sideStages, pillarStage, mainRouteDetails } from './roadmap.js'
import { dungeonStages } from './dungeon.js'

export const classes = [
  {
    "id": "melee",
    "name": "Melee",
    "blurb": "Swords, spears, flails, and yoyos. Highest defense."
  },
  {
    "id": "ranged",
    "name": "Ranged",
    "blurb": "Bows, guns, and launchers. Bring ammo."
  },
  {
    "id": "mage",
    "name": "Mage",
    "blurb": "Magic weapons and mana. Huge burst damage."
  },
  {
    "id": "summoner",
    "name": "Summoner",
    "blurb": "Minions and whips. Fragile, but they shred."
  }
]

export const eras = [
  {
    "id": "pre-hardmode",
    "name": "Pre-Hardmode"
  },
  {
    "id": "hardmode",
    "name": "Hardmode"
  }
]

const routeStages = [
  {
    "id": "pre-boss",
    "era": "pre-hardmode",
    "name": "Pre-Boss",
    "next": "Eye of Cthulhu",
    "when": "World spawn until your first boss"
  },
  {
    ...sideStages.find(stage => stage.era === 'pre-hardmode'),
  },
  {
    "id": "pre-skeletron",
    "era": "pre-hardmode",
    "name": "Pre-Skeletron",
    "next": "Skeletron",
    "when": "After Eye of Cthulhu / evil boss / Queen Bee"
  },
  {
    ...dungeonStages[0],
  },
  {
    "id": "pre-wof",
    "era": "pre-hardmode",
    "name": "Pre–Wall of Flesh",
    "next": "Wall of Flesh",
    "when": "Dungeon unlocked, then the Underworld"
  },
  {
    "id": "pre-mechanicals",
    "era": "hardmode",
    "name": "Pre-Mechanicals",
    "next": "The Twins, Destroyer, Skeletron Prime",
    "when": "Smash altars and gear on Hardmode ores"
  },
  {
    "id": "pre-plantera",
    "era": "hardmode",
    "name": "Pre-Plantera",
    "next": "Plantera",
    "when": "After all three Mechanical bosses"
  },
  {
    ...dungeonStages[1],
  },
  {
    "id": "pre-golem",
    "era": "hardmode",
    "name": "Pre-Golem",
    "next": "Golem",
    "when": "Post-Plantera dungeon, jungle temple key"
  },
  ...sideStages.filter(stage => stage.era === 'hardmode'),
  {
    "id": "pre-lunatic",
    "era": "hardmode",
    "name": "Pre-Lunatic",
    "next": "Lunatic Cultist",
    "when": "After Golem; finish whichever optional detours you want before starting the Lunar Events"
  },
  pillarStage,
  {
    "id": "pre-moon-lord",
    "era": "hardmode",
    "name": "Pre–Moon Lord",
    "next": "Moon Lord",
    "when": "Celestial Pillars and lunar fragment gear"
  }
]

export const stages = routeStages.map(stage => ({ ...stage, ...mainRouteDetails[stage.id] }))

export { loadouts } from "./loadouts.js"

// Dungeon visits are exploration stops, with rewards kept separate from entry gear.
export const dungeonStages = [
  {
    art: '/images/dungeon-pixel-depths-2k.png',
    id: 'dungeon-pre-plantera', name: 'Dungeon · first descent', next: 'Pre-Plantera',
    era: 'pre-hardmode', kind: 'Dungeon', theme: 'dungeon',
    when: 'After Skeletron · return any time before Plantera',
    unlock: 'Defeat Skeletron before exploring below the entrance.',
    summon: 'Enter the Dungeon after defeating Skeletron.',
    prepare: 'Bring light, a hook, and a way home. Check for spikes and hidden passages as you explore.',
    payoff: 'Collect early Dungeon gear and mark the biome chests for a later return.',
    source: 'Dungeon',
    rewards: { melee: ['muramasa'], ranged: ['phoenixBlaster', 'necroArmor'], mage: ['waterBolt'], summoner: ['spinalTap'] },
    rewardNote: 'A mix of finds and crafted upgrades: Phoenix Blaster uses the Handgun, Necro armor uses Bones, and Spinal Tap is crafted from Bones and Cobwebs. Check each card for its source.',
  },
  {
    art: '/images/dungeon-pixel-awakened-2k.png',
    id: 'dungeon-post-plantera', name: 'Dungeon · awakened', next: 'Post-Plantera',
    era: 'hardmode', kind: 'Dungeon', theme: 'dungeon',
    when: 'After Plantera · before the Jungle Temple',
    unlock: 'Defeat Plantera to unlock the stronger Dungeon enemies and biome chests.',
    summon: 'Return to the Dungeon after defeating Plantera.',
    prepare: 'Bring your Plantera kit and fight from a cleared stretch of corridor. Watch for attacks through walls.',
    payoff: 'Collect Ectoplasm, hunt class upgrades, and open biome chests if you have their keys.',
    source: 'Dungeon',
    rewards: { melee: ['paladinsHammer', 'vampireKnives', 'frozenShield'], ranged: ['sniperRifle', 'reconScope'], mage: ['magnetSphere', 'infernoFork', 'spectreArmor'], summoner: ['morningStar', 'desertTiger'] },
    rewardNote: 'Enemy drops, biome-chest rewards, and crafted upgrades are shown together here. The item cards explain the source and requirements; these are goals for your run, not required entry gear.',
  },
]

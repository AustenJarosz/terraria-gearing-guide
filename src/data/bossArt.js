// NPC_Head_Boss texture IDs; local portraits, not loot or progression requirements.
export const bossArt = {
  'pre-boss': [0], 'pre-skeletron': [19], 'pre-wof': [22],
  'pre-mechanicals': [15, 20, 18, 25], 'pre-plantera': [11], 'pre-golem': [5],
  'event-upgrades': [13, 6, 9, 34], 'optional-bosses': [4, 37],
  'pre-lunatic': [24], 'celestial-pillars': [27, 28, 29, 30], 'pre-moon-lord': [8],
  'pumpkin-moon': [10, 13], 'frost-moon': [3, 17, 6], 'martian-madness': [9],
  'duke-fishron': [4], 'empress-of-light': [37], 'old-ones-army': [34],
}

// Full NPC textures are animation strips; show only their first frame.
export const enemyArt = {
  'solar-eclipse': [
    { id: 477, name: 'Mothron', width: 156, frameHeight: 120 },
    { id: 253, name: 'Reaper', width: 34, frameHeight: 78 },
    { id: 159, name: 'Vampire', width: 40, frameHeight: 60 },
  ],
}

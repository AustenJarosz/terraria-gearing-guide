// Small, named badges connect compatible gear across columns. They never
// filter the weapon list or change Terraria's item-rarity colors.
export const equipmentLinkTypes = {
  swords: { label: 'Swords' },
  boomerangs: { label: 'Boomerangs' },
  yoyo: { label: 'Yoyo' },
  bows: { label: 'Bows' },
  guns: { label: 'Guns' },
}

export const linkedEquipment = {
  'pre-boss': {
    melee: {
      itemLinks: {
        bladeOfGrass: ['swords'], starfury: ['swords'], enchantedSword: ['swords'], feralClaws: ['swords', 'boomerangs'],
        trimarang: ['boomerangs'], thornChakram: ['boomerangs'],
        amazon: ['yoyo'], whiteString: ['yoyo'],
      },
      accessoryChoices: {
        feralClaws: {
          label: 'Weapon support · choose one', ids: ['feralClaws', 'whiteString'],
        },
        sharkTooth: { label: 'Damage · choose one', ids: ['sharkTooth', 'pyroclasticStone'] },
      },
    },
    ranged: {
      itemLinks: {
        goldBow: ['bows'], frostburnArrow: ['bows'],
        boomstick: ['guns'], musket: ['guns'], undertaker: ['guns'], musketBall: ['guns'],
      },
      ammo: ['frostburnArrow', 'musketBall'],
    },
  },
}

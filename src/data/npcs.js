// Standard Desktop worlds. Shop groups are unlocks, not a player's current progress.
// Sources: each NPC's Official Terraria Wiki page; see docs/NPC_CONTENT.md.
const stock = (stage, names, condition = '') => ({ stage, items: names.split('|').map(name => ({ name, condition })) })
const npc = (name, head, era, unlock, role, shops = [], service = '') => ({
  id: name.toLowerCase().replaceAll(' ', '-'), name, head, era, unlock, role, shops, service,
  source: name.replaceAll(' ', '_'),
})
export const npcStages = ['On recruitment', 'After an early boss', 'After the evil boss', 'Post-Skeletron', 'Hardmode', 'After one mechanical boss', 'After all mechanical bosses', 'Post-Plantera', 'Post-Golem', 'Post-Martian Madness', 'Post-Moon Lord']
export const npcs = [
  npc('Guide', 1, 'Starting out', 'Already present when a normal world is created.', 'Crafting help', [], 'Show him a material to see its crafting recipes. He has no shop.'),
  npc('Merchant', 2, 'Starting out', 'Players carry more than 50 silver combined. Coins in storage do not count.', 'Supplies & storage', [
    stock(0, 'Mining Helmet|Piggy Bank|Iron Anvil|Bug Net|Copper Pickaxe|Copper Axe|Torch|Lesser Healing Potion|Lesser Mana Potion|Wooden Arrow|Shuriken|Rope|Sickle'),
    stock(0, 'Glowstick', 'Night'), stock(0, 'Throwing Knife', 'Blood Moon'), stock(0, 'Marshmallow', 'Snow biome'), stock(0, 'Furnace', 'Jungle'),
    stock(0, 'Flare|Blue Flare', 'Carry a Flare Gun'), stock(0, 'Nail', 'Carry a Nail Gun'),
    stock(3, 'Safe'), stock(4, 'Healing Potion|Mana Potion|Sharpening Station|Gold Dust'),
  ]),
  npc('Nurse', 3, 'Starting out', 'Merchant is present and a player has more than 100 maximum health.', 'Healing', [], 'Restores health and removes curable debuffs for coins. Fees increase with progression and are higher in Master Mode. No item shop.'),
  npc('Demolitionist', 4, 'Starting out', 'Merchant is present and a player carries an explosive such as a Bomb.', 'Explosives & digging', [
    stock(0, 'Grenade|Bomb|Dynamite|Portable Kiln|Mitey-Titey'),
    ...['Dry Bomb','Wet Bomb','Lava Bomb','Honey Bomb'].map(name => stock(0, name, `Carry a ${name}`)),
    stock(1, 'Freeze Bomb', 'King Slime OR Eye of Cthulhu defeated; night'),
    stock(4, 'Hellfire Arrow|Explosive Powder'), stock(7, 'Land Mine', 'Also defeat a Pirate Invasion'),
  ]),
  npc('Zoologist', 26, 'Starting out', 'Complete at least 10% of the Bestiary.', 'Whips, mounts & utility', [
    stock(0, 'Leather Whip|Squirrel Hook|Guide to Critter Companionship|Cat License'),
    stock(0, 'Fairy Glowstick', 'All three fairy entries in the Bestiary'),
    stock(0, 'Swarm Grenade', 'During a Party'),
    stock(0, 'Dog License|Mollusk Whistle|Digging Molecart', '25% Bestiary'),
    stock(0, 'Dusty Rawhide Saddle|Royal Gilded Saddle|Black Studded Saddle', '30% Bestiary'),
    stock(0, 'Bunny License', '45% Bestiary'), stock(0, 'Lightning Carrot', '50% Bestiary'),
    stock(0, "Ball O' Fuse Wire", '70% Bestiary'), stock(4, 'Jousting Lance', '30% Bestiary'),
    stock(10, 'Universal Pylon', '100% Bestiary; defeating Moon Lord alone is not enough'),
  ]),
  npc('Arms Dealer', 6, 'Starting out', 'A player carries a bullet or a gun that fires bullets. A Flare Gun does not qualify.', 'Guns & ammunition', [
    stock(0, 'Musket Ball|Flintlock Pistol|Minishark'), stock(0, 'Illegal Gun Parts', 'Night'),
    stock(0, 'Silver Bullet', 'Silver world: Blood Moon before Hardmode; anytime in Hardmode'),
    stock(0, 'Tungsten Bullet', 'Tungsten world: Blood Moon before Hardmode; anytime in Hardmode'),
    stock(2, 'Unholy Arrow', 'Eater of Worlds OR Brain of Cthulhu defeated, at night; anytime in Hardmode'),
    stock(3, 'Quad-Barrel Shotgun', 'Graveyard'), stock(4, 'Ammo Box|Shotgun|Empty Bullet'),
    ...[['Stynger Bolt','Stynger'],['Stake','Stake Launcher'],['Nail','Nail Gun'],['Candy Corn','Candy Corn Rifle'],["Explosive Jack 'O Lantern","Jack 'O Lantern Launcher"]].map(([name, gun]) => stock(0, name, `Carry a ${gun}; possession unlock, not a boss check`)),
  ]),
  npc('Angler', 22, 'Starting out', 'Wake the Sleeping Angler at either Ocean.', 'Fishing rewards', [], 'Gives one fishing quest per in-game day. Fishing gear, bait and information accessories are quest rewards, not purchases.'),
  npc('Golfer', 25, 'Starting out', 'Find and speak to the Golfer in the Underground Desert.', 'Golf & transport', [
    stock(0, 'Worn Golf Club (Iron)|Worn Golf Club (Driver)|Worn Golf Club (Wedge)|Worn Golf Club (Putter)|Golf Ball|Golf Tee|Golf Cup|Golf Whistle|Lawn Mower'),
    stock(0, 'Golf Club (Iron)|Golf Club (Driver)|Golf Club (Wedge)|Golf Club (Putter)', 'Golf score above 500'),
    stock(0, 'Fancy Golf Club (Iron)|Fancy Golf Club (Driver)|Fancy Golf Club (Wedge)|Fancy Golf Club (Putter)', 'Golf score above 1,000'),
    stock(0, 'Premium Golf Club (Iron)|Premium Golf Club (Driver)|Premium Golf Club (Wedge)|Premium Golf Club (Putter)', 'Golf score above 2,000'),
    stock(3, 'Golf Cart Keys', 'Golf score above 2,000'),
  ]),
  npc('Dye Trader', 14, 'Starting out', 'Carry a dye, dye ingredient, Strange Plant or Dye Vat; at least four other town NPCs are present.', 'Dye crafting', [stock(0, 'Dye Vat')], 'Trades Strange Plants for dyes in Hardmode. Cosmetic dyes are omitted from this gear-focused list.'),
  npc('Stylist', 20, 'Starting out', 'Free the Webbed Stylist in a Spider Nest in the Cavern layer.', 'Hair styling', [], 'Changes hair style and color, and sells cosmetic hair dyes. No combat gear or practical supplies in this selection.'),
  npc('Painter', 17, 'Starting out', 'At least eight other town NPCs are present.', 'Building tools', [
    stock(0, 'Paintbrush|Paint Roller|Paint Scraper'), stock(0, 'Illuminant Coating', 'Graveyard'),
    stock(3, 'Echo Coating', 'Graveyard and Mechanic present; after Plantera, Mechanic presence is no longer required'),
  ], 'Decorative paints, paintings and wallpaper are omitted.'),
  npc('Dryad', 5, 'Pre-Hardmode milestones', 'Defeat Eye of Cthulhu, Eater of Worlds, Brain of Cthulhu OR Skeletron.', 'Farming & biome control', [
    stock(0, 'Acorn|Dirt Rod|Pumpkin Seed|Guide to Environmental Preservation|Daybloom Planter Box|Moonglow Planter Box|Blinkroot Planter Box|Deathweed Planter Box|Waterleaf Planter Box|Shiverthorn Planter Box|Fireblossom Planter Box'),
    stock(0, 'Purification Powder|Grass Seeds|Sunflower', 'Outside a Blood Moon'), stock(0, 'Ash Grass Seeds', 'Underworld'), stock(0, 'Mushroom Grass Seeds', 'Glowing Mushroom biome'),
    stock(0, 'Vile Powder|Corrupt Seeds', 'Corruption world, during a Blood Moon'), stock(0, 'Vicious Powder|Crimson Seeds', 'Crimson world, during a Blood Moon'),
    stock(4, 'Hallowed Seeds'), stock(4, 'Crimson Seeds', 'Corruption world, in a Graveyard'), stock(4, 'Corrupt Seeds', 'Crimson world, in a Graveyard'),
  ]),
  npc('Goblin Tinkerer', 9, 'Pre-Hardmode milestones', 'Defeat the Goblin Army, then free the Bound Goblin in the Cavern layer.', 'Accessory crafting & reforging', [stock(0, "Rocket Boots|Ruler|Tinkerer's Workshop|Grappling Hook|Toolbelt|Spiky Ball|Rubblemaker")], 'Reforges eligible weapons and accessories for coins.'),
  npc('Tavernkeep', 24, 'Pre-Hardmode milestones', 'Defeat Eater of Worlds OR Brain of Cthulhu, then wake the Unconscious Man found on the surface.', 'Sentries & hybrid armor', [
    stock(0, 'Ale|Eternia Crystal Stand'), stock(0, 'Eternia Crystal', 'Base price: 25 silver → 1 gold after one mechanical boss → 4 gold after Golem'),
    stock(0, "Defender's Forge", '50 Defender Medals'), stock(0, 'Flameburst Rod|Ballista Rod|Explosive Trap Rod|Lightning Aura Rod', '5 Defender Medals each'),
    stock(5, 'Flameburst Cane|Ballista Cane|Explosive Trap Cane|Lightning Aura Cane', '15 Defender Medals each'),
    stock(5, "Monk's Bushy Brow Bald Cap|Monk's Shirt|Monk's Pants|Squire's Great Helm|Squire's Plating|Squire's Greaves|Huntress's Wig|Huntress's Jerkin|Huntress's Pants|Apprentice's Hat|Apprentice's Robe|Apprentice's Trousers", '15 Defender Medals per piece'),
    stock(8, 'Flameburst Staff|Ballista Staff|Explosive Trap Staff|Lightning Aura Staff', '60 Defender Medals each'),
    stock(8, "Valhalla Knight's Helm|Valhalla Knight's Breastplate|Valhalla Knight's Greaves|Dark Artist's Hat|Dark Artist's Robes|Dark Artist's Leggings|Red Riding Hood|Red Riding Dress|Red Riding Leggings|Shinobi Infiltrator's Helmet|Shinobi Infiltrator's Torso|Shinobi Infiltrator's Pants", '50 Defender Medals per piece'),
  ], 'Defender Medals come from Old One’s Army. These sentries can be used outside the event after completing an Old One’s Army invasion.'),
  npc('Witch Doctor', 18, 'Pre-Hardmode milestones', 'Defeat Queen Bee.', 'Summoner gear & flasks', [
    stock(0, 'Imbuing Station|Blowgun'), stock(0, 'Pygmy Necklace', 'Night'), stock(0, 'Cauldron', 'Halloween; works as a Cooking Pot'),
    stock(0, 'Stynger Bolt', 'Carry a Stynger'), stock(0, 'Stake', 'Carry a Stake Launcher'),
    stock(4, 'Bewitching Table', 'Wizard is present'), stock(7, 'Tiki Mask|Tiki Shirt|Tiki Pants|Vial of Venom'), stock(7, 'Hercules Beetle', 'Jungle'), stock(7, 'Leaf Wings', 'Jungle, at night'),
  ]),
  npc('Clothier', 7, 'Pre-Hardmode milestones', 'Defeat Skeletron to free the Old Man from his curse.', 'Clothing', [], 'Sells vanity clothing. No combat armor in his shop; cosmetic stock is omitted.'),
  npc('Mechanic', 8, 'Pre-Hardmode milestones', 'After Skeletron, free the Bound Mechanic inside the Dungeon.', 'Wiring & teleporters', [
    stock(0, 'Red Wrench|Blue Wrench|Green Wrench|Yellow Wrench|Wire Cutter|Wire|Lever|Switch|Red Pressure Plate|Green Pressure Plate|Gray Pressure Plate|Brown Pressure Plate|Blue Pressure Plate|Yellow Pressure Plate|Orange Pressure Plate|Teal Pressure Pad|Booster Track|Actuator|Teleporter|Junction Box|Mechanical Ruler|Mechanical Lens|Wire Bulb|5 Second Timer|3 Second Timer|1 Second Timer|1/2 Second Timer|1/4 Second Timer'),
    stock(0, 'Spectre Goggles', 'Graveyard'), stock(0, "Mechanic's Rod", 'Angler present; waning gibbous, waning crescent, waxing crescent or waxing gibbous'),
  ]),
  npc('Party Girl', 15, 'Pre-Hardmode milestones', '20 other town NPCs present. She has a 2.5% eligibility roll every two minutes, so arrival can take time. Town pets, Old Man and Traveling Merchant count; Skeleton Merchant does not.', 'Arena supplies', [
    stock(0, 'Confetti|Smoke Bomb|Pogo Stick|Party Center'), stock(0, 'Happy Grenade', 'Carry Happy Grenades'), stock(0, 'Pigronata', 'During a Party'),
    stock(4, 'Bubble'), stock(8, 'Celebration'),
  ], 'The first player to speak to her during a naturally occurring Party receives a Slice of Cake. It is a free buff station, not shop stock.'),
  npc('Wizard', 10, 'Hardmode', 'Free the Bound Wizard in the Cavern layer after entering Hardmode.', 'Magic & mana', [stock(0, 'Crystal Ball|Ice Rod|Greater Mana Potion|Bell|Harp|Spell Tome|Book|Empty Dropper'), stock(4, 'Killing Deck', 'Blood Moon')]),
  npc('Tax Collector', 23, 'Hardmode', 'Use Purification Powder on a Tortured Soul in the Underworld during Hardmode.', 'Passive income', [], 'Collects coins from housed town NPCs. Speak to him to claim the money; he has no shop.'),
  npc('Truffle', 12, 'Hardmode', 'Provide a suitable house in a surface Glowing Mushroom biome during Hardmode.', 'Shroomite crafting', [stock(0, 'Dark Blue Solution'), stock(5, 'Mushroom Spear|Hammush'), stock(7, 'Autohammer')]),
  npc('Pirate', 19, 'Hardmode', 'Defeat a Pirate Invasion.', 'Cannons', [stock(0, 'Cannon|Cannonball'), stock(5, 'Bunny Cannon', 'Hardmode and Party Girl present')]),
  npc('Steampunker', 13, 'Hardmode', 'Defeat any one mechanical boss.', 'Biome tools & mobility', [
    stock(0, 'Clentaminator|Static Hook|Blend-O-Matic|Cog|Steampunk Minecart|Conveyor Belt (Clockwise)|Conveyor Belt (Counter Clockwise)|Logic Gate (AND)|Logic Gate (OR)|Logic Gate (NAND)|Logic Gate (NOR)|Logic Gate (XOR)|Logic Gate (XNOR)|Logic Gate Lamp (On)|Logic Gate Lamp (Off)|Logic Gate Lamp (Faulty)'),
    stock(0, 'Jetpack', 'New moon, waxing crescent, first quarter or waxing gibbous'),
    stock(0, 'Green Solution', 'Outside Hallow; no Blood Moon or Solar Eclipse'), stock(0, 'Blue Solution', 'Hallow; no Blood Moon or Solar Eclipse'),
    stock(0, 'Purple Solution', 'Corruption world; Blood Moon or Solar Eclipse'), stock(0, 'Red Solution', 'Crimson world; Blood Moon or Solar Eclipse'),
    stock(8, 'Steampunk Wings'), stock(10, 'Yellow Solution|White Solution|Brown Solution'),
  ]),
  npc('Cyborg', 16, 'Hardmode', 'Defeat Plantera.', 'Rockets & launchers', [
    stock(0, 'Rocket I|Dry Rocket|Proximity Mine Launcher|Nanites'), stock(0, 'Rocket II', 'Blood Moon'), stock(0, 'Rocket III', 'Night OR Solar Eclipse'), stock(0, 'Rocket IV', 'Solar Eclipse'),
    stock(0, 'Spectre Goggles|Echo Block', 'Graveyard'), stock(0, 'Portal Gun Station', 'Carry a Portal Gun or Portal Gun Station'),
    stock(9, 'Cluster Rocket I|Night Vision Helmet'), stock(9, 'Cluster Rocket II', 'Blood Moon OR Solar Eclipse'),
  ]),
  npc('Princess', 45, 'Hardmode', 'All other permanent town NPCs must be present, except Santa Claus and town pets. This includes the post-Plantera Cyborg.', 'Royal cosmetics', [], 'Her normal-world shop is cosmetic. The Resonance Scepter is a death drop, not a purchase. Special-seed shops are outside this guide.'),
  npc('Santa Claus', 11, 'Hardmode', 'Defeat Frost Legion and have Christmas active (December 15–31, or the temporary Christmas unlocked by reaching Frost Moon wave 15).', 'Seasonal resident', [], 'Sells seasonal decorations and vanity, omitted here. Leaves when Christmas ends.'),
  npc('Traveling Merchant', 21, 'Travelers', 'May visit in the morning once at least two town NPCs are present. He leaves in the evening and does not move into a house.', 'Rotating rare stock', [
    stock(0, 'Stopwatch|Lifeform Analyzer|DPS Meter|Katana|Gi|Mystic Robe|Magic Hat|Black Counterweight|Yellow Counterweight|Brick Layer|Extendo Grip|Paint Sprayer|Portable Cement Mixer|Presserator|Sake|Pho|Pad Thai|Blue Roller Skates', 'Random visit inventory; not guaranteed'),
    stock(0, 'Revolver', 'Random stock after smashing a Shadow Orb or Crimson Heart'),
    stock(1, 'Code 1', 'Eye of Cthulhu defeated; random visit inventory'),
    stock(1, 'Gray Zapinator', 'Any pre-Hardmode boss defeated; pre-Hardmode only; random visit inventory'),
    stock(3, "Sitting Duck's Fishing Pole", 'Random visit inventory'), stock(4, 'Gatligator|Orange Zapinator', 'Random visit inventory'),
    stock(5, 'Code 2', 'Random visit inventory'), stock(6, 'Pulse Bow', 'Random visit inventory'),
  ], 'Eligible does not mean in stock: his selection is rolled when he arrives. Check back on later visits.'),
  npc('Skeleton Merchant', null, 'Travelers', 'Found randomly in the Cavern layer. He cannot move into a house.', 'Yoyo gear & exploration', [
    stock(0, 'Strange Brew', 'Full moon, third quarter, new moon or first quarter'),
    stock(0, 'Lesser Healing Potion', 'Waning gibbous, waning crescent, waxing crescent or waxing gibbous'),
    stock(0, 'Glowstick', 'Daytime, except during a full moon'),
    stock(0, 'Bone Torch|Torch', 'Alternates every real-time second'),
    stock(0, 'Bone Arrow', 'Full moon, waning gibbous, new moon or waxing crescent'),
    stock(0, 'Wooden Arrow', 'Third quarter, waning crescent, first quarter or waxing gibbous'),
    stock(0, 'Bomb|Rope'), ...[['Wooden Boomerang','full moon'],['Umbrella','waning gibbous'],['Wand of Sparking','third quarter'],['Step Stool','waning crescent'],['Aglet','new moon'],['Climbing Claws','waxing crescent'],['Guide to Plant Fiber Cordage','first quarter'],['Radar','waxing gibbous']].map(([name, moon]) => stock(0, name, moon)),
    stock(0, 'Blue Counterweight', 'Full or new moon'), stock(0, 'Red Counterweight', 'Waning gibbous or waxing crescent'), stock(0, 'Purple Counterweight', 'Third or first quarter'), stock(0, 'Green Counterweight', 'Waning crescent or waxing gibbous'),
    stock(0, 'Spelunker Glowstick', 'Night, or all day during a full moon'), stock(0, 'Spelunker Flare', 'Carry a Flare Gun; night, or all day during a full moon'), stock(0, 'Magic Lantern', 'Full moon, at night'),
    stock(0, 'Artisan Loaf', 'Waning crescent, new moon or waxing crescent; player has not consumed one yet'),
    stock(0, 'Green Roller Skates', 'Waning gibbous or third quarter'), stock(0, 'Classic Roller Skates', 'Waning or waxing crescent'), stock(0, 'Party Roller Skates', 'First quarter or waxing gibbous'),
    stock(4, 'Gradient|Yoyo Glove'), stock(4, 'Healing Potion', 'Waning gibbous, waning crescent, waxing crescent or waxing gibbous'), stock(4, 'Slap Hand', 'Blood Moon'), stock(5, 'Magic String'),
  ]),
]

export const npcEras = ['Starting out', 'Pre-Hardmode milestones', 'Hardmode', 'Travelers']

// Search the labels people see as well as names, including progression and
// conditional stock. Punctuation must not make "post plantera" miss its stage.
const searchText = value => value.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, ' ').trim()
export function findNpcs(query = '', era = 'All NPCs') {
  const words = searchText(query).split(' ').filter(Boolean)
  return npcs.filter(resident => {
    if (era !== 'All NPCs' && resident.era !== era) return false
    const text = searchText([
      resident.name, resident.role, resident.era, resident.unlock, resident.service,
      ...resident.shops.flatMap(group => [npcStages[group.stage], ...group.items.flatMap(item => [item.name, item.condition])]),
    ].join(' '))
    return words.every(word => text.includes(word))
  })
}

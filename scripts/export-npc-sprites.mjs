import fs from 'node:fs'
import { unpackToFiles } from 'xnb'
import { npcs } from '../src/data/npcs.js'
import { acquisitionIcons } from '../src/data/acquisitionIcons.js'
const root = 'C:/Program Files (x86)/Steam/steamapps/common/Terraria/Content/Images'
const normalize = name => name.toLowerCase().replace(/[^a-z0-9]/g, '')
const ids = fs.existsSync('tmp/npc-shop-item-ids.json') ? JSON.parse(fs.readFileSync('tmp/npc-shop-item-ids.json', 'utf8').replace(/^\uFEFF/, '')) : {}
const byName = Object.fromEntries(Object.entries(ids).map(([name, id]) => [normalize(name), id]))
const manifest = JSON.parse(fs.readFileSync('scripts/sprite-manifest.json', 'utf8'))
const existing = Object.fromEntries(Object.keys(manifest).map(file => [normalize(file.replace('.png', '')), file]))
const aliases = { 'Mystic Robe':'GypsyRobe', 'Eternia Crystal Stand':'DD2ElderCrystalStand', 'Eternia Crystal':'DD2ElderCrystal', "Defender's Forge":'DD2DefendersForge', 'Wire Cutter':'WireCutter', 'Red Wrench':'Wrench', 'Classic Roller Skates':'RollerSkates', 'Killing Deck':'KillingDeck' }
const icons = {}, missing = []
Object.assign(aliases, { 'Illuminant Coating':'GlowPaint', 'Presserator':'ActuationAccessory', 'Celebration':'FireworksLauncher', 'Swarm Grenade':'DeadCellsSwarmGrenade' })
Object.assign(aliases, {
  'Guide to Critter Companionship':'DontHurtCrittersBook', 'Cat License':'LicenseCat', 'Dog License':'LicenseDog', 'Bunny License':'LicenseBunny', 'Digging Molecart':'DiggingMoleMinecart', 'Dusty Rawhide Saddle':'PaintedHorseSaddle', 'Royal Gilded Saddle':'MajesticHorseSaddle', 'Black Studded Saddle':'DarkHorseSaddle', "Ball O' Fuse Wire":'BallOfFuseWire', 'Universal Pylon':'TeleportationPylonVictory', 'Golf Cart Keys':'GolfCart', 'Guide to Environmental Preservation':'DontHurtNatureBook', 'Deathweed Planter Box':'CorruptPlanterBox', 'Rubblemaker':'RubblemakerSmall', 'Teal Pressure Pad':'ProjectilePressurePad', 'Junction Box':'WirePipe', 'Mechanical Ruler':'LaserRuler', '5 Second Timer':'Timer5Second', '3 Second Timer':'Timer3Second', '1 Second Timer':'Timer1Second', '1/2 Second Timer':'TimerOneHalfSecond', '1/4 Second Timer':'TimerOneFourthSecond', 'Party Center':'PartyMonolith', 'Happy Grenade':'PartyGirlGrenade', 'Killing Deck':'DeadCellsKillingDeck', 'Conveyor Belt (Clockwise)':'ConveyorBeltRight', 'Conveyor Belt (Counter Clockwise)':'ConveyorBeltLeft', 'Logic Gate (XNOR)':'LogicGate_NXOR', 'Yellow Solution':'SandSolution', 'White Solution':'SnowSolution', 'Brown Solution':'DirtSolution', "Sitting Duck's Fishing Pole":'SittingDucksFishingRod', 'Orange Zapinator':'ZapinatorOrange', 'Step Stool':'PortableStool', 'Guide to Plant Fiber Cordage':'CordageGuide', 'Green Roller Skates':'RollerSkatesGreenMountItem', 'Classic Roller Skates':'RollerSkatesClassicMountItem', 'Party Roller Skates':'RollerSkatesPartyMountItem', 'Blue Roller Skates':'RollerSkatesBlueMountItem',
})
for (const [prefix, metals] of [['Worn', ['Stone','Wood','Bronze','Rusty']], ['Fancy', ['Mythril','Pearlwood','Gold','Lead']], ['Premium', ['Titanium','Chlorophyte','Diamond','Shroomite']]]) ['Iron','Driver','Wedge','Putter'].forEach((type, i) => { aliases[`${prefix} Golf Club (${type})`] = `GolfClub${metals[i]}${type}` })
for (const [name, internal] of [['Flameburst','FlameburstTower'],['Ballista','BallistraTower'],['Explosive Trap','ExplosiveTrap'],['Lightning Aura','LightningAura']]) ['Rod','Cane','Staff'].forEach((tier, i) => { aliases[`${name} ${tier}`] = `DD2${internal}T${i + 1}Popper` })
for (const [names, internals] of [
  ["Monk's Bushy Brow Bald Cap|Monk's Shirt|Monk's Pants", 'MonkBrows|MonkShirt|MonkPants'],
  ["Squire's Great Helm|Squire's Plating|Squire's Greaves", 'SquireGreatHelm|SquirePlating|SquireGreaves'],
  ["Huntress's Wig|Huntress's Jerkin|Huntress's Pants", 'HuntressWig|HuntressJerkin|HuntressPants'],
  ["Apprentice's Hat|Apprentice's Robe|Apprentice's Trousers", 'ApprenticeHat|ApprenticeRobe|ApprenticeTrousers'],
  ["Valhalla Knight's Helm|Valhalla Knight's Breastplate|Valhalla Knight's Greaves", 'SquireAltHead|SquireAltShirt|SquireAltPants'],
  ["Dark Artist's Hat|Dark Artist's Robes|Dark Artist's Leggings", 'ApprenticeAltHead|ApprenticeAltShirt|ApprenticeAltPants'],
  ['Red Riding Hood|Red Riding Dress|Red Riding Leggings', 'HuntressAltHead|HuntressAltShirt|HuntressAltPants'],
  ["Shinobi Infiltrator's Helmet|Shinobi Infiltrator's Torso|Shinobi Infiltrator's Pants", 'MonkAltHead|MonkAltShirt|MonkAltPants'],
]) names.split('|').forEach((name,i) => { aliases[name] = internals.split('|')[i] })
async function exportPng(input, output) {
  const result = (await unpackToFiles(Uint8Array.from(fs.readFileSync(`${root}/${input}.xnb`)), { fileName: `${input}.xnb` })).find(file => file.extension === 'png')
  if (!result) throw new Error(`No PNG: ${input}`)
  fs.writeFileSync(output, new Uint8Array(await result.data.arrayBuffer()))
}
fs.mkdirSync('public/npcs', { recursive: true })
for (const npc of npcs) if (npc.head !== null) await exportPng(`NPC_Head_${npc.head}`, `public/npcs/${npc.head}.png`)
// Skeleton Merchant has no housing head icon. Its committed portrait is cropped
// from the first frame of NPC_453.xnb (44 x 32), instead of using a different NPC.
for (const name of new Set(npcs.flatMap(npc => npc.shops.flatMap(group => group.items.map(item => item.name))))) {
  if (acquisitionIcons[name]) { icons[name] = acquisitionIcons[name]; continue }
  if (existing[normalize(name)]) { icons[name] = existing[normalize(name)]; continue }
  const id = ids[aliases[name]] ?? byName[normalize(name)]
  if (id === undefined) { missing.push(name); continue }
  const file = `${name.replace(/[^a-zA-Z0-9]+/g, '_')}.png`
  await exportPng(`Item_${id}`, `public/items/${file}`)
  icons[name] = file
  manifest[file] = id
}
fs.writeFileSync('src/data/npcItemIcons.js', `// Local Terraria inventory sprites. Generated by scripts/export-npc-sprites.mjs.\nexport const npcItemIcons = ${JSON.stringify(icons, null, 2)}\n`)
fs.writeFileSync('scripts/sprite-manifest.json', JSON.stringify(manifest, null, 2) + '\n')
console.log(`Prepared ${Object.keys(icons).length} shop icons. Missing: ${missing.join(', ')}`)

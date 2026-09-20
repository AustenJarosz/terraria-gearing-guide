import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { unpackToFiles } from 'xnb'
import { loadoutItems } from '../src/data/loadoutItems.js'
import { preparationItems, preparationSpriteIds } from '../src/data/preparationItems.js'
import { dungeonChestSpriteIds } from '../src/data/dungeonChests.js'
import { acquisitionIcons } from '../src/data/acquisitionIcons.js'
import { gearAcquisition } from '../src/data/gearAcquisition.js'

// ItemID constants from the installed Terraria build, not guessed wiki image URLs.
const additions = {
  ...preparationSpriteIds,
  ...dungeonChestSpriteIds,
  'Trimarang.png': 5298, 'Pyroclastic_Stone.png': 6178, 'Snapping_Stone.png': 6167,
  'Magma_Stone.png': 1322, 'Shroomerang.png': 4764, 'Ice_Boomerang.png': 670,
  'White_String.png': 3306, 'Frostburn_Arrow.png': 988, 'Musket_Ball.png': 97, 'Ice_Torch.png': 974,
  'Mystic_Bloom.png': 6154, 'Bundle_of_Horseshoe_Balloons.png': 5331, 'Magnet_Flower.png': 4000,
  'Bundle_of_Balloons.png': 1164, 'Lucky_Horseshoe.png': 158, 'Moonglow.png': 314,
  'Restoration_Shield.png': 6188, 'Mystic_Arts_Sash.png': 6189, 'Silver_Shield.png': 6183,
  'Phoenix_Quiver.png': 6181, 'Harpy_Charm.png': 6166, 'Vulgar_Display_of_Flower.png': 5477,
  'Starfury.png': 65, 'Volcano.png': 121, 'Bananarang.png': 1324,
  'Chain_Guillotines.png': 3012, 'Star_Cannon.png': 197, 'Beenade.png': 1130,
  'Dart_Pistol.png': 3007, 'Flamethrower.png': 506, 'Tactical_Shotgun.png': 679,
  'Eventide.png': 4953, 'Spirit_Flame.png': 3779, 'Rainbow_Rod.png': 495,
  'Heat_Ray.png': 1295, 'Razorpine.png': 1930, 'Ruinous_Staff.png': 6164,
  'Sanguine_Staff.png': 4269, 'Dark_Harvest.png': 4680, 'Shiny_Red_Balloon.png': 159,
  'Cloud_in_a_Balloon.png': 399, 'Magiluminescence.png': 5107, 'Band_of_Starpower.png': 111,
  'Shackle.png': 216, 'Stinger_Necklace.png': 4007, 'Hive_Pack.png': 3333,
  'Bone_Glove.png': 3245, 'Amphibian_Boots.png': 3990, 'Berserker_s_Glove.png': 3992,
  'Mechanical_Glove.png': 936, 'Yoyo_Bag.png': 3366, 'Magic_Yoyo_Bag.png': 5541,
  'Steampunk_Wings.png': 948, 'Fishron_Wings.png': 2609, 'Hercules_Beetle.png': 1167,
  'Crystal_Shard.png': 502, 'Unicorn_Horn.png': 526, 'Topaz.png': 180,
  'Desert_Spirit_Lamp.png': 3795, 'Flesh_Knuckles.png': 3016,
  'Strung_Counterweight.png': 5547, 'Mana_Crystal.png': 109,
  'Honey_Comb.png': 1132, 'Frog_Leg.png': 2423, 'Panic_Necklace.png': 1290,
}
const gameImages = process.argv[2] || 'C:/Program Files (x86)/Steam/steamapps/common/Terraria/Content/Images'
const manifest = JSON.parse(fs.readFileSync('scripts/sprite-manifest.json', 'utf8'))
let exported = 0
for (const [file, id] of Object.entries(additions)) {
  if (!fs.existsSync(`public/items/${file}`) || manifest[file] !== id) {
    const input = Uint8Array.from(fs.readFileSync(path.join(gameImages, `Item_${id}.xnb`)))
    const png = (await unpackToFiles(input, { fileName: `Item_${id}.xnb` })).find(result => result.extension === 'png')
    if (!png) throw new Error(`No PNG in Item_${id}.xnb`)
    fs.writeFileSync(`public/items/${file}`, new Uint8Array(await png.data.arrayBuffer()))
    exported++
  }
  manifest[file] = id
}
// Food textures contain inventory / held / plated sprites; Fallen Star animates.
// Export only their first inventory frame instead of a misleading sprite strip.
for (const [file, frameHeight] of [['Ale.png', 20], ['Seafood_Dinner.png', 22], ['Fallen_Star.png', 26]]) {
  const outputPath = path.resolve('public/items', file)
  if (fs.readFileSync(outputPath).readUInt32BE(20) === frameHeight) continue
  const literal = outputPath.replaceAll("'", "''")
  execFileSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', `
    $ErrorActionPreference = 'Stop'
    Add-Type -AssemblyName System.Drawing
    $spriteImage = [System.Drawing.Bitmap]::FromFile('${literal}')
    try { $spriteFrame = $spriteImage.Clone([System.Drawing.Rectangle]::new(0, 0, $spriteImage.Width, ${frameHeight}), $spriteImage.PixelFormat) }
    finally { $spriteImage.Dispose() }
    try { $spriteFrame.Save('${literal}', [System.Drawing.Imaging.ImageFormat]::Png) }
    finally { $spriteFrame.Dispose() }
  `])
}
const icons = { ...acquisitionIcons }
icons['Placed Bottle'] = 'Bottle.png'
for (const [file] of Object.entries(additions)) icons[file.slice(0, -4).replaceAll('_', ' ')] = file
for (const item of Object.values(loadoutItems)) icons[item.name] = item.file
for (const item of Object.values(preparationItems)) icons[item.name] = item.file
// Ingredients that were previously only equipment cards also need recipe icons.
icons['Cloud in a Bottle'] = 'Cloud_in_a_Bottle.png'
icons['Shark Tooth Necklace'] = 'Shark_Tooth_Necklace.png'
icons['Power Glove'] = 'Power_Glove.png'
icons['Avenger Emblem'] = 'Avenger_Emblem.png'
const normalize = name => name.toLowerCase().replace(/[^a-z0-9]/g, '')
const byName = Object.fromEntries(Object.keys(manifest).map(file => [normalize(file.slice(0, -4)), file]))
for (const data of Object.values(gearAcquisition)) for (const recipe of data.recipes || []) {
  const names = [...recipe.ingredients.flatMap(([name]) => Array.isArray(name) ? name : [name]), ...recipe.stations]
  for (const name of names) if (!icons[name] && byName[normalize(name)]) icons[name] = byName[normalize(name)]
}
fs.writeFileSync('scripts/sprite-manifest.json', JSON.stringify(manifest, null, 2) + '\n')
fs.writeFileSync('src/data/acquisitionIcons.js', `// Local Terraria item sprites used by acquisition previews.\nexport const acquisitionIcons = ${JSON.stringify(icons, null, 2)}\n`)
console.log(`Exported ${exported} missing loadout/recipe sprites; registered ${Object.keys(additions).length} item IDs.`)

import fs from 'node:fs'
import path from 'node:path'
import { unpackToFiles } from 'xnb'
import { summonAcquisition } from '../src/data/summonAcquisition.js'
import { gearAcquisition } from '../src/data/gearAcquisition.js'
import { items } from '../src/data/items.js'
const normalize = text => text.toLowerCase().replace(/[^a-z0-9]/g, '')
// Optional reflection export for adding new sprites; existing recipes use the committed manifest.
const ids = fs.existsSync('tmp/item-ids.json') ? JSON.parse(fs.readFileSync('tmp/item-ids.json', 'utf8').replace(/^\uFEFF/, '')) : {}
const byName = Object.fromEntries(Object.entries(ids).map(([name, id]) => [normalize(name), id]))
const manifest = JSON.parse(fs.readFileSync('scripts/sprite-manifest.json', 'utf8'))
const files = Object.fromEntries(Object.keys(manifest).map(file => [normalize(file.replace('.png', '')), file]))
const names = new Set()
const allData = { ...summonAcquisition, ...Object.fromEntries(Object.entries(gearAcquisition).map(([id, data]) => [items[id].name, data])) }
for (const [name, data] of Object.entries(allData)) {
  names.add(name)
  for (const recipe of data.recipes || []) {
    names.add(recipe.result || name)
    recipe.ingredients.forEach(([ingredient]) => (Array.isArray(ingredient) ? ingredient : [ingredient]).forEach(n => names.add(n)))
    recipe.stations.forEach(n => names.add(n))
  }
}
const icons = {}
const aliases = { 'Vertebra': 'Vertebrae', 'Eternia Crystal Stand': 'DD2ElderCrystalStand', 'Gelatin Crystal': 'QueenSlimeCrystal', 'Prismatic Lacewing': 'EmpressButterfly', 'Sturdy Fossil': 'FossilOre', 'Luminite Bar': 'LunarBar', 'Volcano': 'FieryGreatsword', 'Dunerider Boots': 'SandBoots', 'Solar Tablet Fragment': 'LunarTabletFragment', 'Forbidden Fragment': 'AncientBattleArmorMaterial' }
const itemFiles = Object.fromEntries(Object.values(items).map(item => [item.name, item.file]))
for (const name of names) {
  const normalized = normalize(name)
  if (itemFiles[name]) { icons[name] = itemFiles[name]; continue }
  if (files[normalized]) { icons[name] = files[normalized]; continue }
  const id = aliases[name] ? ids[aliases[name]] : byName[normalized]
  if (id === undefined) continue
  const file = `${name.replaceAll(' ', '_').replaceAll('’', "'")}.png`
  const input = Uint8Array.from(fs.readFileSync(path.join('C:/Program Files (x86)/Steam/steamapps/common/Terraria/Content/Images', `Item_${id}.xnb`)))
  const png = (await unpackToFiles(input, { fileName: file.replace('.png', '.xnb') })).find(o => o.extension === 'png')
  if (!png) throw new Error(`Missing PNG for ${name}`)
  fs.writeFileSync(`public/items/${file}`, new Uint8Array(await png.data.arrayBuffer()))
  icons[name] = file
  manifest[file] = id
}
fs.writeFileSync('src/data/acquisitionIcons.js', `// Local Terraria item sprites used by acquisition previews.\nexport const acquisitionIcons = ${JSON.stringify(icons, null, 2)}\n`)
fs.writeFileSync('scripts/sprite-manifest.json', JSON.stringify(manifest, null, 2) + '\n')
console.log(`Prepared ${Object.keys(icons).length} icons. No inventory sprite: ${[...names].filter(n=>!icons[n]).join(', ')}`)

import fs from 'node:fs'
import { unpackToFiles } from 'xnb'
import { allFishingItems } from '../src/data/fishing.js'
// IDs checked against Terraria.ID.ItemID from the installed Desktop game.
for (const { id } of allFishingItems) {
  const filename = `Item_${id}.xnb`
  const input = fs.readFileSync(`C:/Program Files (x86)/Steam/steamapps/common/Terraria/Content/Images/${filename}`)
  const png = (await unpackToFiles(Uint8Array.from(input), { fileName: filename })).find(file => file.extension === 'png')
  if (!png) throw new Error(`No sprite for ${id}`)
  fs.writeFileSync(`public/items/fishing-${id}.png`, new Uint8Array(await png.data.arrayBuffer()))
}
console.log(`Exported ${allFishingItems.length} fishing sprites.`)

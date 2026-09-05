import fs from 'node:fs'
import path from 'node:path'
import { unpackToFiles } from 'xnb'
const gamePath = process.argv[2] || 'C:/Program Files (x86)/Steam/steamapps/common/Terraria'
const manifest = JSON.parse(fs.readFileSync(new URL('./sprite-manifest.json', import.meta.url)))
const outputDirectory = new URL('../public/items/', import.meta.url)
fs.mkdirSync(outputDirectory, { recursive: true })
for (const [file, id] of Object.entries(manifest)) {
  // Copy out of Node's pooled Buffer before passing it to the decoder.
  const input = Uint8Array.from(fs.readFileSync(path.join(gamePath, 'Content', 'Images', `Item_${id}.xnb`)))
  const output = (await unpackToFiles(input, { fileName: file.replace('.png', '.xnb') })).find(o => o.extension === 'png')
  if (!output) throw new Error(`No PNG decoded for ${file}`)
  fs.writeFileSync(new URL(file, outputDirectory), new Uint8Array(await output.data.arrayBuffer()))
}
console.log(`Exported ${Object.keys(manifest).length} local item sprites.`)

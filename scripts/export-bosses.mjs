import fs from 'node:fs'
import path from 'node:path'
import { unpackToFiles } from 'xnb'
import { bossArt } from '../src/data/bossArt.js'

const gamePath = process.argv[2] || 'C:/Program Files (x86)/Steam/steamapps/common/Terraria'
const directory = new URL('../public/bosses/', import.meta.url)
fs.mkdirSync(directory, { recursive: true })
const ids = new Set(Object.values(bossArt).flat())
for (const id of ids) {
  const input = Uint8Array.from(fs.readFileSync(path.join(gamePath, 'Content', 'Images', `NPC_Head_Boss_${id}.xnb`)))
  const output = (await unpackToFiles(input, { fileName: `${id}.xnb` })).find(file => file.extension === 'png')
  if (!output) throw new Error(`Missing portrait ${id}`)
  fs.writeFileSync(new URL(`${id}.png`, directory), new Uint8Array(await output.data.arrayBuffer()))
}
console.log(`Exported ${ids.size} boss portraits.`)

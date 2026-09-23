import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

// Food textures contain inventory / held / plated sprites; Fallen Star animates.
// Both sprite exporters must keep only the first inventory frame.
export const inventoryFrameHeights = { 'Ale.png': 20, 'Seafood_Dinner.png': 22, 'Fallen_Star.png': 26 }

export function cropInventoryFrame(filePath) {
  const outputPath = path.resolve(filePath)
  const frameHeight = inventoryFrameHeights[path.basename(outputPath)]
  if (!frameHeight) return false
  const png = fs.readFileSync(outputPath)
  if (png.length < 24 || png.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error(`Invalid sprite PNG: ${outputPath}`)
  const height = png.readUInt32BE(20)
  if (height === frameHeight) return false
  if (height < frameHeight) throw new Error(`Sprite is shorter than its inventory frame: ${outputPath}`)

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
  return true
}

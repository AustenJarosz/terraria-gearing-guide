import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url))
const checks = fs.readdirSync(scriptsDirectory)
  .filter(file => file !== 'verify-all.mjs' && (file === 'verify.mjs' || (file.startsWith('verify-') && file.endsWith('.mjs'))))
  .sort()

for (const file of checks) {
  console.log(`\nRunning ${file}`)
  const result = spawnSync(process.execPath, [path.join(scriptsDirectory, file)], {
    cwd: path.dirname(scriptsDirectory),
    stdio: 'inherit',
  })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}
console.log(`\nAll ${checks.length} verification scripts passed.`)

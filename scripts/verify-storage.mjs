import assert from 'node:assert/strict'
import { readStoredValue, updateStoredValue } from '../src/data/storage.js'

function storage(initial = {}) {
  const values = new Map(Object.entries(initial))
  return {
    blocked: false, quotaFull: false,
    getItem(key) {
      if (this.blocked) throw new Error('Storage access denied')
      return values.get(key) ?? null
    },
    setItem(key, value) {
      if (this.blocked || this.quotaFull) throw new Error('Cannot save')
      values.set(key, String(value))
    },
    removeItem(key) { values.delete(key) },
  }
}

const local = storage({ malformed: '{invalid', counter: '8', checklist: '["eye"]' })
const getStorage = () => local
const parseChecks = value => {
  const checks = JSON.parse(value)
  return Array.isArray(checks) ? checks.filter(id => typeof id === 'string') : []
}

assert.deepEqual(readStoredValue(getStorage, 'missing', [], parseChecks), { value: [], saved: true })
assert.deepEqual(readStoredValue(getStorage, 'malformed', [], parseChecks), { value: [], saved: true })
local.setItem('malformed', '{"not":"an array"}')
assert.deepEqual(readStoredValue(getStorage, 'malformed', [], parseChecks), { value: [], saved: true })
assert.deepEqual(readStoredValue(() => { throw new Error('Blocked storage getter') }, 'blocked-getter', 0, Number), { value: 0, saved: false })

// A stale tab must base a relative update on the latest persisted checkmarks.
const staleChecks = readStoredValue(getStorage, 'checklist', [], parseChecks)
local.setItem('checklist', '["eye","skeletron"]')
assert.deepEqual(updateStoredValue(getStorage, 'checklist', staleChecks, checks => [...checks, 'wall'], parseChecks, JSON.stringify, []), {
  value: ['eye', 'skeletron', 'wall'], saved: true,
})
local.removeItem('checklist')
assert.deepEqual(updateStoredValue(getStorage, 'checklist', staleChecks, checks => [...checks, 'moon'], parseChecks, JSON.stringify, []), {
  value: ['moon'], saved: true,
}, 'Removing the saved key must reset the next relative update to its fallback')

// Failed edits must beat the old disk value after leaving and re-entering a view.
let counter = readStoredValue(getStorage, 'counter', 0, Number)
local.quotaFull = true
counter = updateStoredValue(getStorage, 'counter', counter, value => value + 1, Number, String, 0)
assert.deepEqual(counter, { value: 9, saved: false })
assert.equal(local.getItem('counter'), '8')
assert.deepEqual(readStoredValue(getStorage, 'counter', 0, Number), counter, 'Remount lost the unsaved counter')
counter = updateStoredValue(getStorage, 'counter', counter, value => value + 1, Number, String, 0)
assert.deepEqual(counter, { value: 10, saved: false }, 'The old persisted count must not erase failed increments')
local.blocked = true
assert.deepEqual(readStoredValue(getStorage, 'counter', 0, Number), counter)
assert.deepEqual(readStoredValue(getStorage, 'new-blocked-key', [], parseChecks), { value: [], saved: false })
const failedChecks = updateStoredValue(getStorage, 'blocked-checklist', { value: [], saved: false }, ['queen-bee'], parseChecks, JSON.stringify, [])
assert.deepEqual(readStoredValue(getStorage, 'blocked-checklist', [], parseChecks), failedChecks)

// Recovery saves every local edit, then releases the fallback for external sync.
local.blocked = false
local.quotaFull = false
counter = updateStoredValue(getStorage, 'counter', counter, value => value + 1, Number, String, 0)
assert.deepEqual(counter, { value: 11, saved: true })
assert.equal(local.getItem('counter'), '11')
local.setItem('counter', '20')
assert.deepEqual(readStoredValue(getStorage, 'counter', 0, Number), { value: 20, saved: true })
assert.deepEqual(updateStoredValue(getStorage, 'counter', counter, value => value + 1, Number, String, 0), { value: 21, saved: true })
assert.deepEqual(updateStoredValue(getStorage, 'blocked-checklist', failedChecks, checks => [...checks, 'plantera'], parseChecks, JSON.stringify, []), {
  value: ['queen-bee', 'plantera'], saved: true,
})

// An initial read failure is different from a local edit that failed to save.
local.setItem('recovered-read', '5')
local.blocked = true
const unavailable = readStoredValue(getStorage, 'recovered-read', 0, Number)
local.blocked = false
assert.deepEqual(updateStoredValue(getStorage, 'recovered-read', unavailable, value => value + 1, Number, String, 0), { value: 6, saved: true })

// Repeated mounts and unrelated keys must not consume or share pending edits.
local.quotaFull = true
const zero = updateStoredValue(getStorage, 'pending-zero', { value: 1, saved: true }, 0, Number, String, 0)
assert.deepEqual(zero, { value: 0, saved: false })
for (let mount = 0; mount < 3; mount++) assert.deepEqual(readStoredValue(getStorage, 'pending-zero', 99, Number), zero)
assert.deepEqual(readStoredValue(getStorage, 'different-key', 3, Number), { value: 3, saved: true })

console.log('Verified corrupt/missing/blocked storage, quota failures, failed-save remounts, recovery, and fresh cross-tab relative updates.')

// Keep storage failures separate from the in-memory value: private browsing and
// a full quota must not prevent progress from working for the current session.
// Only failed writes live here. Successful reads still use the browser's latest
// value, while unsaved edits survive conditional guide-view unmounts.
const pendingValues = new Map()

export function readStoredValue(getStorage, key, fallback, parse) {
  if (pendingValues.has(key)) return { value: pendingValues.get(key), saved: false }
  try {
    const raw = getStorage().getItem(key)
    try { return { value: raw === null ? fallback : parse(raw), saved: true } }
    catch { return { value: fallback, saved: true } }
  } catch { return { value: fallback, saved: false } }
}

export function updateStoredValue(getStorage, key, previous, update, parse, serialize, fallback = previous.value) {
  const pending = pendingValues.has(key)
  let value = pending ? pendingValues.get(key) : previous.value
  // Read the latest successful value before a relative update, so two open
  // tabs usually preserve each other's edits. Storage is not transactional, so
  // truly simultaneous writes can still race. Local failed edits take priority
  // over older persisted data until a subsequent write succeeds.
  if (typeof update === 'function' && !pending) {
    try {
      const raw = getStorage().getItem(key)
      value = raw === null ? fallback : parse(raw)
    } catch { /* Retain the usable in-memory value. */ }
  }
  const next = typeof update === 'function' ? update(value) : update
  try {
    getStorage().setItem(key, serialize(next))
    pendingValues.delete(key)
    return { value: next, saved: true }
  } catch {
    pendingValues.set(key, next)
    return { value: next, saved: false }
  }
}

import { useCallback, useEffect, useRef, useState } from 'react'
import { readStoredValue, updateStoredValue } from '../data/storage'

const identity = value => value
const browserStorage = () => window.localStorage

export function usePersistentState(key, fallback, { parse = identity, serialize = String } = {}) {
  const options = useRef({ fallback, parse, serialize })
  useEffect(() => { options.current = { fallback, parse, serialize } }, [fallback, parse, serialize])
  const [state, setState] = useState(() => readStoredValue(browserStorage, key, fallback, parse))
  const current = useRef(state)
  const setValue = useCallback(update => {
    const { fallback: defaultValue, parse: decode, serialize: encode } = options.current
    const next = updateStoredValue(browserStorage, key, current.current, update, decode, encode, defaultValue)
    current.current = next
    setState(next)
  }, [key])

  useEffect(() => {
    const sync = event => {
      if (event.key !== null && event.key !== key) return
      try { if (event.storageArea && event.storageArea !== window.localStorage) return } catch { return }
      const { fallback: defaultValue, parse: decode } = options.current
      const next = readStoredValue(browserStorage, key, defaultValue, decode)
      current.current = next
      setState(next)
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [key])
  return [state.value, setValue, state.saved]
}

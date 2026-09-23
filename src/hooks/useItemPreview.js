import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'

// Equipment and summon-item previews share one open panel, positioning,
// keyboard behavior, and dismissal when their containing disclosure closes.
export function useItemPreview() {
  const id = useId()
  const trigger = useRef(null)
  const panel = useRef(null)
  const timer = useRef(null)
  const pinned = useRef(false)
  const skipFocus = useRef(false)
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const cancel = () => clearTimeout(timer.current)
  const close = (restoreFocus = false) => {
    cancel()
    pinned.current = false
    if (restoreFocus && panel.current?.contains(document.activeElement)) {
      skipFocus.current = true
      const target = trigger.current?.matches('button, a') ? trigger.current : trigger.current?.querySelector('button, a')
      target?.focus()
    }
    setOpen(false)
  }
  const show = () => {
    cancel()
    window.dispatchEvent(new CustomEvent('guide-preview-open', { detail: id }))
    setOpen(true)
  }
  const leave = () => { cancel(); if (!pinned.current) timer.current = setTimeout(() => setOpen(false), 180) }

  useEffect(() => {
    const other = event => {
      if (event.detail !== id) { clearTimeout(timer.current); pinned.current = false; setOpen(false) }
    }
    window.addEventListener('guide-preview-open', other)
    return () => { clearTimeout(timer.current); window.removeEventListener('guide-preview-open', other) }
  }, [id])

  useLayoutEffect(() => {
    if (!open) return
    const dismiss = () => { clearTimeout(timer.current); pinned.current = false; setOpen(false) }
    const place = () => {
      if (!trigger.current || !panel.current) return
      const box = trigger.current.getBoundingClientRect()
      const tip = panel.current.getBoundingClientRect()
      const below = window.innerHeight - box.bottom
      const top = below >= tip.height + 12 ? box.bottom + 8 : box.top - tip.height - 8
      setPosition({ top: Math.max(12, Math.min(top, window.innerHeight - tip.height - 12)), left: Math.max(12, Math.min(box.left, document.documentElement.clientWidth - tip.width - 12)) })
    }
    const outside = event => { if (!trigger.current?.contains(event.target) && !panel.current?.contains(event.target)) dismiss() }
    const escape = event => {
      if (event.key !== 'Escape') return
      if (panel.current?.contains(document.activeElement)) {
        skipFocus.current = true
        const target = trigger.current?.matches('button, a') ? trigger.current : trigger.current?.querySelector('button, a')
        target?.focus()
      }
      dismiss()
    }
    const collapse = event => { if (event.target.tagName === 'DETAILS' && !event.target.open && event.target.contains(trigger.current)) dismiss() }
    place()
    const observer = new ResizeObserver(place)
    observer.observe(panel.current)
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    document.addEventListener('toggle', collapse, true)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
      document.removeEventListener('toggle', collapse, true)
    }
  }, [open])

  const focus = event => {
    if (skipFocus.current) { skipFocus.current = false; return }
    if (event.target.matches(':focus-visible')) show()
  }
  const blur = event => {
    if (!panel.current?.contains(event.relatedTarget) && !trigger.current?.contains(event.relatedTarget)) {
      pinned.current = false
      leave()
    }
  }
  const keyDown = event => {
    if (event.key !== 'ArrowDown') return
    event.preventDefault()
    pinned.current = true
    show()
    requestAnimationFrame(() => panel.current?.querySelector('a')?.focus())
  }
  return {
    id, trigger, panel, open, position, cancel, close, leave, focus, blur, keyDown,
    toggle: () => { if (pinned.current) close(); else { pinned.current = true; show() } },
    enter: event => { if (event.pointerType === 'mouse') { cancel(); timer.current = setTimeout(show, 220) } },
  }
}

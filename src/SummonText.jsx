import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { summonItems, summonWiki, splitSummonText } from './data/summonItems'
import { summonAcquisition } from './data/summonAcquisition'
import { Acquisition } from './Acquisition'

function SummonLink({ name }) {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const id = useId()
  const trigger = useRef(null)
  const panel = useRef(null)
  const timer = useRef(null)
  const pinned = useRef(false)
  const cancel = () => clearTimeout(timer.current)
  const show = () => { cancel(); setOpen(true) }
  const leave = () => { cancel(); if (!pinned.current) timer.current = setTimeout(() => setOpen(false), 180) }
  useEffect(() => () => clearTimeout(timer.current), [])
  useLayoutEffect(() => {
    if (!open) return
    const place = () => {
      const box = trigger.current.getBoundingClientRect()
      const tip = panel.current.getBoundingClientRect()
      const top = box.bottom + tip.height + 20 <= window.innerHeight ? box.bottom + 8 : box.top - tip.height - 8
      setPosition({ top: Math.max(8, top), left: Math.max(8, Math.min(box.left, document.documentElement.clientWidth - tip.width - 8)) })
    }
    const outside = event => { if (!trigger.current.contains(event.target) && !panel.current.contains(event.target)) { pinned.current = false; setOpen(false) } }
    const escape = event => { if (event.key === 'Escape') { cancel(); pinned.current = false; setOpen(false) } }
    place()
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [open])
  const blur = event => { if (!trigger.current?.contains(event.relatedTarget) && !panel.current?.contains(event.relatedTarget)) { pinned.current = false; leave() } }
  return <span ref={trigger} className="summon-item" onPointerEnter={event => { if (event.pointerType === 'mouse') show() }} onPointerLeave={event => { if (event.pointerType === 'mouse') leave() }} onBlur={blur}>
    <a href={summonWiki(name)} target="_blank" rel="noreferrer" onFocus={show} aria-describedby={open ? id : undefined}>{name}</a>
    <button type="button" className="summon-info" aria-label={`How to get ${name}`} aria-expanded={open} aria-controls={id} onClick={() => { cancel(); pinned.current = !pinned.current; setOpen(pinned.current) }}>ⓘ</button>
    {open && createPortal(<aside ref={panel} id={id} className="summon-preview" style={position} aria-label={`How to get ${name}`} onPointerEnter={cancel} onPointerLeave={event => { if (event.pointerType === 'mouse') leave() }} onBlur={blur}>
      <strong>{name}</strong><span className="summon-preview-label">How to get it</span>
      <Acquisition data={summonAcquisition[name]} name={name} />
      <a href={summonWiki(name)} target="_blank" rel="noreferrer">Full recipe & details ↗</a>
    </aside>, document.body)}
  </span>
}

export function SummonText({ text }) {
  return splitSummonText(text).map((part, index) => summonItems[part] ? <SummonLink key={index} name={part} /> : part)
}

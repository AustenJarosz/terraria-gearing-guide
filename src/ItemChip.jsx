import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { items, wikiPage, wikiSrc } from './data/items'

function ItemChip({ id }) {
  const item = items[id]
  const detailId = useId()
  const trigger = useRef(null)
  const panel = useRef(null)
  const timer = useRef(null)
  const pinned = useRef(false)
  const skipFocus = useRef(false)
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const cancel = () => clearTimeout(timer.current)
  const close = () => { cancel(); pinned.current = false; setOpen(false) }
  const show = () => {
    cancel()
    window.dispatchEvent(new CustomEvent('gear-detail-open', { detail: detailId }))
    setOpen(true)
  }
  const leave = () => { cancel(); if (!pinned.current) timer.current = setTimeout(() => setOpen(false), 180) }

  useEffect(() => {
    const other = event => { if (event.detail !== detailId) { clearTimeout(timer.current); pinned.current = false; setOpen(false) } }
    window.addEventListener('gear-detail-open', other)
    return () => { clearTimeout(timer.current); window.removeEventListener('gear-detail-open', other) }
  }, [detailId])

  useLayoutEffect(() => {
    if (!open) return
    const place = () => {
      const box = trigger.current.getBoundingClientRect()
      const tooltip = panel.current.getBoundingClientRect()
      const below = window.innerHeight - box.bottom
      const top = below >= tooltip.height + 12 ? box.bottom + 8 : box.top - tooltip.height - 8
      setPosition({ top: Math.max(12, Math.min(top, window.innerHeight - tooltip.height - 12)), left: Math.max(12, Math.min(box.left, document.documentElement.clientWidth - tooltip.width - 12)) })
    }
    const outside = event => { if (!trigger.current.contains(event.target) && !panel.current.contains(event.target)) { pinned.current = false; setOpen(false) } }
    const escape = event => { if (event.key === 'Escape') { clearTimeout(timer.current); pinned.current = false; setOpen(false); if (panel.current.contains(document.activeElement)) { skipFocus.current = true; trigger.current.focus() } } }
    place()
    const observer = new ResizeObserver(place)
    observer.observe(panel.current)
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => { observer.disconnect(); window.removeEventListener('resize', place); window.removeEventListener('scroll', place, true); document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape) }
  }, [open])

  if (!item) return <span>Unknown item: {id}</span>
  const blur = event => { if (!panel.current?.contains(event.relatedTarget) && !trigger.current?.contains(event.relatedTarget)) { pinned.current = false; leave() } }
  return <div className="item-card">
    <button ref={trigger} type="button" className="item-chip" aria-expanded={open} aria-controls={detailId}
      onPointerEnter={event => { if (event.pointerType === 'mouse') { cancel(); timer.current = setTimeout(show, 220) } }}
      onPointerLeave={leave} onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); pinned.current = true; show(); requestAnimationFrame(() => panel.current?.querySelector('a')?.focus()) } }} onFocus={event => { if (skipFocus.current) { skipFocus.current = false; return } if (event.currentTarget.matches(':focus-visible')) show() }} onBlur={blur}
      onClick={() => { if (pinned.current) close(); else { pinned.current = true; show() } }}>
      <span className="item-icon"><img src={wikiSrc(item.file)} alt="" loading="lazy" /></span>
      <span className={`item-name rarity-${item.rarity}`}>{item.name}</span>
      <span className="item-toggle" aria-hidden="true">ⓘ</span>
    </button>
    {createPortal(<section ref={panel} id={detailId} role="region" aria-label={`${item.name} details`} aria-hidden={!open} inert={!open}
      className={`item-popover ${open ? 'is-open' : ''}`} style={position} onPointerEnter={cancel} onPointerLeave={leave} onBlur={blur}>
      <div className="tip-heading"><img src={wikiSrc(item.file)} alt="" /><strong className={`rarity-${item.rarity}`}>{item.name}</strong><button type="button" onClick={close} aria-label="Close item details">×</button></div>
      <p className="tip-stats">{item.stats}</p><p>{item.info}</p>
      <p className="tip-obtain"><strong>HOW TO GET IT</strong><br />{item.obtain}</p>
      <a href={wikiPage(item.wiki || item.name)} target="_blank" rel="noreferrer">Terraria Wiki ↗</a>
    </section>, document.body)}
  </div>
}

export function ItemGrid({ ids }) {
  return <div className="item-grid">{ids.map(id => <ItemChip key={id} id={id} />)}</div>
}



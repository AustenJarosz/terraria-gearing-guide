import { useLayoutEffect, useRef } from 'react'

export function GearLayoutControl({ value, onChange }) {
  const anchor = useRef(null)

  // Keep the item being compared near the same screen position after reflow.
  useLayoutEffect(() => {
    const previous = anchor.current
    anchor.current = null
    if (!previous) return
    const item = [...document.querySelectorAll('.equipment-guide [data-item-id]')]
      .find(element => element.dataset.itemId === previous.id && element.getClientRects().length)
    if (item) window.scrollBy({ top: item.getBoundingClientRect().top - previous.top, behavior: 'instant' })
  }, [value])

  function select(next) {
    if (next === value) return
    const visibleItem = [...document.querySelectorAll('.equipment-guide [data-item-id]')]
      .find(element => {
        const bounds = element.getBoundingClientRect()
        return element.getClientRects().length && bounds.bottom > 0 && bounds.top < window.innerHeight
      })
    anchor.current = visibleItem ? { id: visibleItem.dataset.itemId, top: visibleItem.getBoundingClientRect().top } : null
    window.dispatchEvent(new CustomEvent('guide-preview-open'))
    onChange(next)
  }

  return <div className="gear-layout-control" role="group" aria-label="Gear layout">
    <span>Layout</span>
    <button type="button" aria-label="New layout" aria-pressed={value === 'modern'} onClick={() => select('modern')}>New</button>
    <button type="button" aria-label="Classic layout" aria-pressed={value === 'classic'} onClick={() => select('classic')}>Classic</button>
    <button type="button" aria-label="Compact layout" aria-pressed={value === 'compact'} onClick={() => select('compact')}>Compact</button>
  </div>
}

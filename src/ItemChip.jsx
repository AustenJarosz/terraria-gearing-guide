import { useItemPreview } from './hooks/useItemPreview'
import { createPortal } from 'react-dom'
import { items, wikiPage, wikiSrc } from './data/items'
import { itemNotes } from './data/itemNotes'
import { gearAcquisition } from './data/gearAcquisition'
import { Acquisition } from './Acquisition'
import { equipmentLinkTypes } from './data/equipmentLinks'

export function ItemChip({ id, notes, links = [], showStats = false, variant, caption, showNotesInline = false }) {
  const item = items[id]
  const guidance = notes ?? itemNotes[id] ?? []
  const previewGuidance = !showNotesInline && (variant === 'accessory' || variant === 'compact')
  const preview = useItemPreview()
  const { id: detailId, trigger, panel, open, position, cancel, leave, blur } = preview
  const metadata = <>
    {caption && <span className="item-caption">{caption}</span>}
    {links.length > 0 && <span className="equipment-links">{links.map(link => <span key={link} className={`equipment-link equipment-link-${link}`}><span aria-hidden="true">◆</span> {equipmentLinkTypes[link].label}</span>)}</span>}
  </>

  if (!item) return <span>Unknown item: {id}</span>
  return <div className={`item-card${variant ? ` item-card-${variant}` : ''}`} data-item-id={id}>
    <button ref={trigger} type="button" className="item-chip" aria-expanded={open} aria-controls={open ? detailId : undefined}
      onPointerEnter={preview.enter} onPointerLeave={leave} onKeyDown={preview.keyDown} onFocus={preview.focus} onBlur={blur}
      onClick={preview.toggle}>
      <span className="item-icon"><img src={wikiSrc(item.file)} alt="" loading="lazy" /></span>
      <span className="item-title">
        <span className={`item-name rarity-${item.rarity}`}>{item.name}</span>
        {variant === 'accessory' ? <span className="accessory-item-meta">{metadata}</span> : metadata}
        {variant === 'compact' && !showNotesInline && guidance.length > 0 && ![caption, 'Alternative'].includes(guidance[0].label) && <span className="item-note-label">{guidance[0].label}</span>}
      </span>
      <span className="item-toggle" aria-hidden="true">ⓘ</span>
    </button>
    {showStats && <p className="item-summary">{item.stats}</p>}
    {!previewGuidance && guidance.length > 0 && <div className="item-guidance">{guidance.map((note, index) => <p key={index}><strong>{note.label}</strong> {note.text}</p>)}</div>}
    {open && createPortal(<section ref={panel} id={detailId} role="region" aria-label={`${item.name} details`} aria-hidden={!open} inert={!open}
      className={`item-popover ${open ? 'is-open' : ''}`} style={position} onPointerEnter={cancel} onPointerLeave={leave} onBlur={blur}>
      <div className="tip-heading"><img src={wikiSrc(item.file)} alt="" /><strong className={`rarity-${item.rarity}`}>{item.name}</strong><button type="button" onClick={() => preview.close(true)} aria-label="Close item details">×</button></div>
      <p className="tip-stats">{item.stats}</p><p>{item.info}</p>
      {previewGuidance && guidance.length > 0 && <div className="item-guidance accessory-preview-notes">{guidance.map((note, index) => <p key={index}><strong>{note.label}</strong> {note.text}</p>)}</div>}
      <div className="tip-obtain"><strong>HOW TO GET IT</strong><Acquisition data={gearAcquisition[id]} name={item.name} /></div>
      <a href={wikiPage(item.wiki || item.name)} target="_blank" rel="noreferrer">Terraria Wiki ↗</a>
    </section>, document.body)}
  </div>
}

export function ItemGrid({ ids, notes = {}, links = {}, showStats = false }) {
  return <div className="item-grid">{ids.map(id => <ItemChip key={id} id={id} notes={notes[id]} links={links[id]} showStats={showStats} />)}</div>
}

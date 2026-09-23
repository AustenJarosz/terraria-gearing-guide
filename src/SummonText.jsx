import { createPortal } from 'react-dom'
import { summonItems, summonWiki, splitSummonText } from './data/summonItems'
import { summonAcquisition } from './data/summonAcquisition'
import { Acquisition } from './Acquisition'
import { useItemPreview } from './hooks/useItemPreview'

function SummonLink({ name }) {
  const { id, trigger, panel, open, position, cancel, close, leave, focus, blur, keyDown, enter, toggle } = useItemPreview()
  return <span ref={trigger} className="summon-item" onPointerEnter={enter} onPointerLeave={leave} onBlur={blur} onKeyDown={keyDown}>
    <a href={summonWiki(name)} target="_blank" rel="noreferrer" onFocus={focus}>{name}</a>
    <button type="button" className="summon-info" aria-label={`How to get ${name}`} aria-expanded={open} aria-controls={open ? id : undefined} onClick={toggle}>ⓘ</button>
    {open && createPortal(<aside ref={panel} id={id} className="summon-preview" style={position} aria-label={`How to get ${name}`} onPointerEnter={cancel} onPointerLeave={leave} onBlur={blur}>
      <div className="tip-heading"><strong>{name}</strong><button type="button" onClick={() => close(true)} aria-label="Close item details">×</button></div>
      <span className="summon-preview-label">How to get it</span>
      <Acquisition data={summonAcquisition[name]} name={name} />
      <a href={summonWiki(name)} target="_blank" rel="noreferrer">Full recipe & details ↗</a>
    </aside>, document.body)}
  </span>
}

export function SummonText({ text }) {
  return splitSummonText(text).map((part, index) => summonItems[part] ? <SummonLink key={index} name={part} /> : part)
}

import { ItemChip } from './ItemChip'
import { items } from './data/items'
import { getAccessorySlots } from './data/accessorySlots'
import { accessoryQualifier } from './data/accessoryCaptions'

export function AccessoryGuide({ loadout, hardmode }) {
  const slots = getAccessorySlots(loadout)
  const renderItem = (option, slot) => <ItemChip key={option.id} id={option.id} variant="accessory"
    caption={accessoryQualifier(option)} links={loadout.itemLinks[option.id]}
    notes={slot.note ? [...option.notes, { label: slot.label || 'Slot choice', text: slot.note }] : option.notes} />

  return <section className="accessory-guide" aria-label="Accessory loadout">
    <div className="accessory-heading">
      <div><h3>Accessories</h3><p>One item per row.</p></div>
      <div className="accessory-capacity"><strong>{slots.length}<span> slots</span></strong></div>
    </div>
    <div className="accessory-column-labels" aria-hidden="true"><span>Slot</span><span>Suggested setup</span><span>Alternatives · same slot</span></div>
    <ol className="accessory-rack">
      {slots.map((slot, index) => <li className={`accessory-row${slot.options.length > 1 ? ' has-alternatives' : ''}`} key={slot.id}>
        <span className="accessory-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <div className="accessory-primary">{renderItem(slot.options[0], slot)}</div>
        {slot.options.length > 1 ? <div className="accessory-alternatives" role="group" aria-label={`Slot ${index + 1} alternatives to ${items[slot.id].name}`}>
          <span className="accessory-or">or</span>
          <div className="accessory-options">{slot.options.slice(1).map(option => renderItem(option, slot))}</div>
        </div> : <span className="accessory-no-swap" aria-hidden="true">—</span>}
      </li>)}
    </ol>
    {hardmode && <p className="accessory-unlock">The seventh slot requires consuming the Wall of Flesh’s Demon Heart.</p>}
  </section>
}

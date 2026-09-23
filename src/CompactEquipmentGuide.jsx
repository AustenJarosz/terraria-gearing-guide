import { ItemChip } from './ItemChip'
import { accessoryCaption } from './data/accessoryCaptions'
import { getAccessorySlots } from './data/accessorySlots'
import { items } from './data/items'
import './CompactEquipmentGuide.css'

function CompactItems({ ids, loadout }) {
  return <ul className="compact-items">
    {ids.map(id => <li key={id}>
      <ItemChip id={id} variant="compact" caption={items[id].stats} showNotesInline
        notes={loadout.itemNotes[id]} links={loadout.itemLinks[id]} />
    </li>)}
  </ul>
}

export function CompactEquipmentGuide({ loadout, stage }) {
  const slots = getAccessorySlots(loadout)
  const hardmode = stage.era === 'hardmode'

  return <div className="compact-equipment">
      <section className="compact-panel compact-armor" aria-label="Armor recommendations">
        <div className="compact-heading"><h3>Armor</h3><p>Sets & alternatives</p></div>
        <CompactItems ids={loadout.armor} loadout={loadout} />
      </section>
      <section className="compact-panel compact-weapons" aria-label="Weapon recommendations">
        <div className="compact-heading"><h3>Weapons</h3><p>Damage & support</p></div>
        <CompactItems ids={loadout.weapons} loadout={loadout} />
        {loadout.ammo.length > 0 && <section className="compact-ammo" aria-label="Ammunition recommendations">
          <h4>Ammunition</h4>
          <CompactItems ids={loadout.ammo} loadout={loadout} />
        </section>}
      </section>
    <section className="compact-panel compact-accessories" aria-label="Accessory loadout">
      <div className="compact-heading">
        <h3>Accessories <span className="compact-capacity">{slots.length} slots</span></h3>
        <p>Choose one item per slot</p>
      </div>
      <ol className="compact-slots">
        {slots.map((slot, index) => <li className="compact-slot" key={slot.id}>
          <span className="compact-slot-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div className="compact-slot-options" role="group" aria-label={`Slot ${index + 1}${slot.options.length > 1 ? ' · choose one accessory' : ''}`}>
            {slot.options.map((option, optionIndex) => <div className={`compact-option${optionIndex === 0 ? ' is-suggested' : ''}`} key={option.id}>
              {optionIndex === 1 && <p className="compact-alternative-label">Alternatives · choose one</p>}
              <ItemChip id={option.id} variant="compact" caption={accessoryCaption(option)}
                links={loadout.itemLinks[option.id]}
                notes={slot.note ? [...option.notes, { label: slot.label || 'Slot choice', text: slot.note }] : option.notes} />
            </div>)}
          </div>
        </li>)}
      </ol>
      {hardmode && <p className="compact-unlock">The seventh slot requires consuming the Wall of Flesh’s Demon Heart.</p>}
    </section>
  </div>
}

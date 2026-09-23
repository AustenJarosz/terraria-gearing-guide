import { ItemChip, ItemGrid } from './ItemChip'
import { items } from './data/items'
import { itemNotes } from './data/itemNotes'
import './ClassicEquipmentGuide.css'

function ClassicAccessoryGrid({ ids, notes = {}, choices = {}, links = {} }) {
  return <div className="item-grid">{ids.map(id => {
    const choice = choices[id]
    return choice ? <div className="accessory-choice" key={id} role="group" aria-label={choice.label}>
      <div className="accessory-choice-heading"><strong>{choice.label}</strong><span>1 slot</span></div>
      {choice.ids.map(option => <ItemChip key={option} id={option} notes={notes[option]} links={links[option]} />)}
      {choice.text && <p>{choice.text}</p>}
    </div> : <ItemChip key={id} id={id} notes={notes[id]} links={links[id]} />
  })}</div>
}

export function ClassicEquipmentGuide({ loadout, stage }) {
  return <div className="classic-equipment">
    <div className="slots">
      <article className="slot">
        <h3>Armor</h3>
        <ItemGrid ids={loadout.armor} notes={loadout.itemNotes} links={loadout.itemLinks} />
      </article>
      <article className="slot">
        <h3>Weapons</h3>
        <ItemGrid ids={loadout.weapons} notes={loadout.itemNotes} links={loadout.itemLinks} />
      </article>
      <article className="slot">
        <h3>Accessories <span className="slot-count">{loadout.accessories.length} / {stage.era === 'hardmode' ? 7 : 6} slots</span></h3>
        {stage.era === 'hardmode' && <p className="accessory-choice-hint">The seventh slot requires consuming the Wall of Flesh’s Demon Heart.</p>}
        {Object.keys(loadout.accessoryChoices).length > 0 && <p className="accessory-choice-hint">Pick one item from each “choose one” group. Each group fills a single slot.</p>}
        <ClassicAccessoryGrid ids={loadout.accessories} notes={loadout.itemNotes} choices={loadout.accessoryChoices} links={loadout.itemLinks} />
      </article>
    </div>
    {loadout.ammo.length > 0 && <section className="loadout-ammo" aria-label="Ammunition">
      <h3>Ammunition</h3>
      <ItemGrid ids={loadout.ammo} notes={loadout.itemNotes} links={loadout.itemLinks} />
    </section>}
    {loadout.accessorySwaps?.length > 0 && <details className="loadout-swaps">
      <summary>Accessory swaps <span>{loadout.accessorySwaps.length} {loadout.accessorySwaps.length === 1 ? 'alternative' : 'alternatives'}</span></summary>
      <p className="gear-hint">Replace the named accessory; these alternatives use the same slot.</p>
      <div className="loadout-swap-grid">
        {loadout.accessorySwaps.map(swap => {
          const worldChoice = ['wormScarf', 'brainConfusion'].includes(swap.id)
          const swapNotes = [...(loadout.itemNotes[swap.id] ?? itemNotes[swap.id] ?? []), { label: `Replace ${items[swap.replaces].name}`, text: swap.text }]
          return <ClassicAccessoryGrid key={`${swap.id}-${swap.replaces}`} ids={[swap.id]}
            links={loadout.itemLinks}
            choices={worldChoice ? { [swap.id]: { label: 'World evil · choose one', ids: ['wormScarf', 'brainConfusion'], text: `Replace ${items[swap.replaces].name}. Worm Scarf is the Corruption option; Brain of Confusion is the Crimson option. Use either for this slot. ${swap.text}` } } : {}}
            notes={worldChoice ? loadout.itemNotes : { [swap.id]: swapNotes }} />
        })}
      </div>
    </details>}
  </div>
}

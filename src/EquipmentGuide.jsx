import { AccessoryGrid, ItemGrid } from './ItemChip'
import { items } from './data/items'
import { PreparationGuide } from './PreparationGuide'

export function EquipmentGuide({ base: loadout, stage }) {
  return <div>
      <p className="gear-hint">Hover for a preview; tap to keep it open. Accessories fill all {stage.era === 'hardmode' ? '7 Master Mode slots after consuming the Wall of Flesh’s Demon Heart' : '6 Master Mode slots'}.{Object.keys(loadout.itemLinks).length > 0 && ' Match the small labels across weapons and gear. Item-name colors still show rarity.'}</p>
      <div className="slots">
        <article className="slot">
          <h3>Armor</h3>
          <ItemGrid ids={loadout.armor} notes={loadout.itemNotes} />
        </article>
        <article className="slot">
          <h3>Weapons</h3>
          <ItemGrid ids={loadout.weapons} notes={loadout.itemNotes} links={loadout.itemLinks} />
        </article>
        <article className="slot">
          <h3>Accessories <span className="slot-count">{loadout.accessories.length} / {stage.era === 'hardmode' ? 7 : 6} slots</span></h3>
          {Object.keys(loadout.accessoryChoices).length > 0 && <p className="accessory-choice-hint">Pick one item from each “choose one” group. Each group fills a single slot.</p>}
          <AccessoryGrid ids={loadout.accessories} notes={loadout.itemNotes} choices={loadout.accessoryChoices} links={loadout.itemLinks} />
        </article>
      </div>
      {loadout.ammo.length > 0 && <section className="loadout-ammo" aria-label="Ammunition">
        <h3>Ammunition</h3>
        <ItemGrid ids={loadout.ammo} notes={loadout.itemNotes} links={loadout.itemLinks} />
      </section>}
      {loadout.accessorySwaps?.length > 0 && <details className="loadout-swaps">
        <summary>Accessory swaps <span>{loadout.accessorySwaps.length} {loadout.accessorySwaps.length === 1 ? 'alternative' : 'alternatives'}</span></summary>
        <p className="gear-hint">Replace the named accessory; these are alternatives for this build, not extra slots.</p>
        <div className="loadout-swap-grid">
          {loadout.accessorySwaps.map(swap => {
            const worldChoice = ['wormScarf', 'brainConfusion'].includes(swap.id)
            return <AccessoryGrid key={`${swap.id}-${swap.replaces}`} ids={[swap.id]}
              choices={worldChoice ? { [swap.id]: { label: 'World evil · choose one', ids: ['wormScarf', 'brainConfusion'], text: `Replace ${items[swap.replaces].name}. Worm Scarf is the Corruption option; Brain of Confusion is the Crimson option. Use either for this slot.` } } : {}}
              notes={worldChoice ? {} : { [swap.id]: [{ label: `Replace ${items[swap.replaces].name}`, text: swap.text }] }} />
          })}
        </div>
      </details>}
      <PreparationGuide stageId={stage.id} classId={loadout.classId} />
      <aside className="notes"><h3>Build notes</h3><p>{loadout.notes}</p></aside>
    </div>
}

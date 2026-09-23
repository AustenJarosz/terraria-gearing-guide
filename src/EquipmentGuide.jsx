import { ItemChip } from './ItemChip'
import { AccessoryGuide } from './AccessoryGuide'
import { ClassicEquipmentGuide } from './ClassicEquipmentGuide'
import { CompactEquipmentGuide } from './CompactEquipmentGuide'
import { PreparationGuide } from './PreparationGuide'

function EquipmentSection({ title, kind, ids, loadout }) {
  if (!ids.length) return null
  return <section className={`equipment-section equipment-${kind}`} aria-label={`${title} recommendations`}>
    <div className="equipment-heading"><h3>{title}</h3></div>
    <ul className="equipment-options">
      {ids.map(id => <li key={id}>
        <ItemChip id={id} variant="equipment"
          notes={loadout.itemNotes[id]} links={loadout.itemLinks[id]} />
      </li>)}
    </ul>
  </section>
}

export function EquipmentGuide({ base: loadout, stage, layout = 'modern' }) {
  return <div className={`equipment-guide layout-${layout}`}>
      <p className="gear-hint">Hover or tap an item for its recipe and build notes.{Object.keys(loadout.itemLinks).length > 0 && ' Matching labels connect weapons with their supporting gear.'}</p>
      {layout === 'classic' ? <ClassicEquipmentGuide loadout={loadout} stage={stage} /> : layout === 'compact' ? <CompactEquipmentGuide loadout={loadout} stage={stage} /> : <>
      <EquipmentSection title="Armor" kind="armor" ids={loadout.armor} loadout={loadout} />
      <EquipmentSection title="Weapons" kind="weapons" ids={loadout.weapons} loadout={loadout} />
      <EquipmentSection title="Ammunition" kind="ammo" ids={loadout.ammo} loadout={loadout} />
      <AccessoryGuide loadout={loadout} hardmode={stage.era === 'hardmode'} />
      </>}
      <PreparationGuide stageId={stage.id} classId={loadout.classId} />
      <aside className="notes"><h3>Build notes</h3><p>{loadout.notes}</p></aside>
    </div>
}

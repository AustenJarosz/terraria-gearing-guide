import { useState } from 'react'
import { ChecklistSpawn } from './ChecklistSpawn'
import { checklistGroups as groups, checklistType } from './data/checklist'
import { checklistArt } from './data/checklistArt'

export function BossChecklist({ renderLoot, onGear }) {
  const [checked, setChecked] = useState(() => {
    try { const value = JSON.parse(localStorage.getItem('terraria-boss-checklist') || '[]'); return Array.isArray(value) ? value.filter(id => typeof id === 'string') : [] } catch { return [] }
  })
  const [filter, setFilter] = useState('All')
  const [type, setType] = useState('Everything')
  const [saved, setSaved] = useState(true)
  const count = groups.flatMap(group => group.rows).filter(row => checked.includes(row.id)).length
  const total = groups.flatMap(group => group.rows).length
  function toggle(id) {
    const next = checked.includes(id) ? checked.filter(value => value !== id) : [...checked, id]
    setChecked(next)
    try { localStorage.setItem('terraria-boss-checklist', JSON.stringify(next)); setSaved(true) } catch { setSaved(false) }
  }
  return <section className="panel plaque checklist" aria-label="Boss and event checklist">
    <div className="checklist-heading"><div><p className="kicker">Your world · Master Mode</p><h2>Bosses, events & loot</h2><p className="gear-hint">A suggested order, not a required route. Check bosses after a victory, events after clearing them, and Dungeon visits after exploring.</p></div><div className="checklist-count"><strong>{count}<small> / {total}</small></strong><span>completed</span></div></div>
    <progress className="checklist-progress" value={count} max={total} aria-label="Encounters completed" />
    <div className="drop-filters" role="group" aria-label="Encounter type">{['Everything', 'Bosses', 'Events', 'Dungeons'].map(value => <button key={value} aria-pressed={type === value} onClick={() => setType(value)}>{value}</button>)}</div>
    <div className="drop-filters" role="group" aria-label="Completion status">{['All', 'Remaining', 'Completed'].map(value => <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}</button>)}</div>
    {groups.map(group => {
      const visible = group.rows.filter(row => (type === 'Everything' || type === checklistType(row)) && (filter === 'All' || (filter === 'Completed') === checked.includes(row.id)))
      return <section className="checklist-era" key={group.name}><h3>{group.name}<small>{group.note}</small></h3>{visible.length ? visible.map(row => <div className={`checklist-row ${checked.includes(row.id) ? 'is-defeated' : ''}`} key={row.id}>
        <input type="checkbox" checked={checked.includes(row.id)} onChange={() => toggle(row.id)} aria-label={`Mark ${row.name} completed`} />
        <details><summary><span className={`checklist-portrait${!checklistArt[row.id] && row.art.length > 1 ? ' has-multiple' : ''}`}>{checklistArt[row.id] ? <img src={`/items/${checklistArt[row.id]}`} alt="" /> : row.art.map(id => <img key={id} src={`/bosses/${id}.png`} alt="" />)}</span><span className="checklist-name">{row.name}{(row.optional || row.event || row.kind === 'Dungeon') && <small>{row.kind === 'Dungeon' ? 'Exploration' : row.event ? 'Event' : 'Optional'}</small>}</span><span className="checklist-loot-label">Details ⌄</span></summary><div className="checklist-details"><ChecklistSpawn encounterId={row.id} />{renderLoot(row)}{row.stageId && <button className="checklist-gear" onClick={() => onGear(row.stageId)}>View gearing stage →</button>}</div></details>
      </div>) : <p className="gear-hint">No encounters in this filter.</p>}</section>
    })}
    <p className="gear-hint">{saved ? 'Checklist saved on this device.' : 'Your browser could not save this checklist; checks will last for this session.'} Checking an encounter never changes your selected gearing stage.</p>
  </section>
}

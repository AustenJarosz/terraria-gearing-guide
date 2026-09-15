import { useState } from 'react'
import { earlyEncounters } from './data/prehardmodeOptional'
import { sideEncounters } from './data/roadmap'
import { bossArt } from './data/bossArt'

const boss = (id, name, source, art, stageId = id, enemy) => ({ id, name, source, art: bossArt[id] || art, stageId, enemy })
const groups = [
  { name: 'Pre-Hardmode', note: 'Early encounters → ready for Hardmode', rows: [
    { ...earlyEncounters[0], art: [7], stageId: 'pre-boss' },
    boss('pre-boss', 'Eye of Cthulhu', 'Eye_of_Cthulhu', [0]),
    boss('evil-boss', 'Eater of Worlds / Brain of Cthulhu', 'Bosses', [], 'pre-skeletron'),
    { ...earlyEncounters[1], art: [14], stageId: 'pre-skeletron' },
    { ...earlyEncounters[2], art: [39], stageId: 'pre-skeletron' },
    boss('pre-skeletron', 'Skeletron', 'Skeletron', [19]),
    boss('pre-wof', 'Wall of Flesh', 'Wall_of_Flesh', [22]),
  ] },
  { name: 'Hardmode', note: 'Mechanical bosses → Moon Lord', rows: [
    boss('queen-slime', 'Queen Slime', 'Queen_Slime', [], 'pre-mechanicals'),
    boss('destroyer', 'The Destroyer', 'The_Destroyer', [25], 'pre-mechanicals', 'The Destroyer'),
    boss('twins', 'The Twins', 'The_Twins', [15, 20], 'pre-mechanicals', 'The Twins'),
    boss('prime', 'Skeletron Prime', 'Skeletron_Prime', [18], 'pre-mechanicals', 'Skeletron Prime'),
    boss('pre-plantera', 'Plantera', 'Plantera', [11]),
    boss('pre-golem', 'Golem', 'Golem', [5]),
    ...sideEncounters.filter(row => row.era === 'hardmode' && row.kind === 'Optional boss').map(row => ({ ...row, stageId: 'optional-bosses', art: bossArt[row.id] })),
    boss('pre-lunatic', 'Lunatic Cultist', 'Lunatic_Cultist', [24]),
    boss('pre-moon-lord', 'Moon Lord', 'Moon_Lord', [8]),
  ] },
]

export function BossChecklist({ renderLoot, onGear }) {
  const [checked, setChecked] = useState(() => {
    try { const value = JSON.parse(localStorage.getItem('terraria-boss-checklist') || '[]'); return Array.isArray(value) ? value.filter(id => typeof id === 'string') : [] } catch { return [] }
  })
  const [filter, setFilter] = useState('All bosses')
  const [saved, setSaved] = useState(true)
  const count = groups.flatMap(group => group.rows).filter(row => checked.includes(row.id)).length
  function toggle(id) {
    const next = checked.includes(id) ? checked.filter(value => value !== id) : [...checked, id]
    setChecked(next)
    try { localStorage.setItem('terraria-boss-checklist', JSON.stringify(next)); setSaved(true) } catch { setSaved(false) }
  }
  return <section className="panel plaque checklist" aria-label="Boss checklist and loot">
    <div className="checklist-heading"><div><p className="kicker">Your world · Master Mode</p><h2>Boss checklist & loot</h2><p className="gear-hint">A loose order, not a required route. Open a boss for loot; check it off when defeated.</p></div><div className="checklist-count"><strong>{count}<small> / 17</small></strong><span>defeated</span></div></div>
    <progress className="checklist-progress" value={count} max={17} aria-label="Bosses defeated" />
    <div className="drop-filters">{['All bosses', 'Remaining', 'Defeated'].map(value => <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}</button>)}</div>
    {groups.map(group => {
      const visible = group.rows.filter(row => filter === 'All bosses' || (filter === 'Defeated') === checked.includes(row.id))
      return <section className="checklist-era" key={group.name}><h3>{group.name}<small>{group.note}</small></h3>{visible.length ? visible.map(row => <div className={`checklist-row ${checked.includes(row.id) ? 'is-defeated' : ''}`} key={row.id}>
        <input type="checkbox" checked={checked.includes(row.id)} onChange={() => toggle(row.id)} aria-label={`Mark ${row.name} defeated`} />
        <details><summary><span className="checklist-portrait">{row.art.map(id => <img key={id} src={`/bosses/${id}.png`} alt="" />)}</span><span className="checklist-name">{row.name}{row.optional && <small>Optional</small>}</span><span className="checklist-loot-label">Loot ⌄</span></summary><div className="checklist-details">{renderLoot(row)}<button className="checklist-gear" onClick={() => onGear(row.stageId)}>View gearing stage →</button></div></details>
      </div>) : <p className="gear-hint">No bosses in this filter.</p>}</section>
    })}
    <p className="gear-hint">{saved ? 'Checklist saved on this device.' : 'Your browser could not save this checklist; checks will last for this session.'} Checking a boss never changes your selected gearing stage.</p>
  </section>
}

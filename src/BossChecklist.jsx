import { useState } from 'react'
import { earlyEncounters } from './data/prehardmodeOptional'
import { sideEncounters } from './data/roadmap'
import { bossArt } from './data/bossArt'

import { checklistEvents as events } from './data/checklistEvents'
import { checklistArt } from './data/checklistArt'

const boss = (id, name, source, art, stageId = id, enemy) => ({ id, name, source, art: bossArt[id] || art, stageId, enemy })
const existingEvent = id => ({ ...sideEncounters.find(row => row.id === id), event: true, art: bossArt[id] || [], stageId: 'event-upgrades' })
const groups = [
  { name: 'Pre-Hardmode', note: 'Early encounters → ready for Hardmode', rows: [
    events.bloodEarly,
    { ...earlyEncounters[0], art: [7], stageId: 'pre-boss' },
    boss('pre-boss', 'Eye of Cthulhu', 'Eye_of_Cthulhu', [0]),
    boss('evil-boss', 'Eater of Worlds / Brain of Cthulhu', 'Bosses', [], 'pre-skeletron'),
    events.goblinEarly,
    events.armyOne,
    { ...earlyEncounters[1], art: [14], stageId: 'pre-skeletron' },
    { ...earlyEncounters[2], art: [39], stageId: 'pre-skeletron' },
    boss('pre-skeletron', 'Skeletron', 'Skeletron', [19]),
    boss('pre-wof', 'Wall of Flesh', 'Wall_of_Flesh', [22]),
  ] },
  { name: 'Hardmode', note: 'Mechanical bosses → Moon Lord', rows: [
    events.bloodHard,
    events.goblinHard,
    events.pirates,
    boss('queen-slime', 'Queen Slime', 'Queen_Slime', [], 'pre-mechanicals'),
    boss('destroyer', 'The Destroyer', 'The_Destroyer', [25], 'pre-mechanicals', 'The Destroyer'),
    boss('twins', 'The Twins', 'The_Twins', [15, 20], 'pre-mechanicals', 'The Twins'),
    boss('prime', 'Skeletron Prime', 'Skeletron_Prime', [18], 'pre-mechanicals', 'Skeletron Prime'),
    events.armyTwo,
    boss('pre-plantera', 'Plantera', 'Plantera', [11]),
    existingEvent('solar-eclipse'),
    existingEvent('pumpkin-moon'),
    existingEvent('frost-moon'),
    boss('pre-golem', 'Golem', 'Golem', [5]),
    existingEvent('martian-madness'),
    { ...existingEvent('old-ones-army'), name: 'Old One’s Army · Tier 3', enemy: 'Betsy' },
    ...sideEncounters.filter(row => row.era === 'hardmode' && row.kind === 'Optional boss').map(row => ({ ...row, stageId: 'optional-bosses', art: bossArt[row.id] })),
    boss('pre-lunatic', 'Lunatic Cultist', 'Lunatic_Cultist', [24]),
    { ...boss('celestial-pillars', 'Lunar Events', 'Lunar_Events', [27, 28, 29, 30]), event: true },
    boss('pre-moon-lord', 'Moon Lord', 'Moon_Lord', [8]),
  ] },
]

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
    <div className="checklist-heading"><div><p className="kicker">Your world · Master Mode</p><h2>Bosses, events & loot</h2><p className="gear-hint">A suggested order, not a required route. Check bosses after a victory and events once you’ve experienced or cleared them.</p></div><div className="checklist-count"><strong>{count}<small> / {total}</small></strong><span>completed</span></div></div>
    <progress className="checklist-progress" value={count} max={total} aria-label="Encounters completed" />
    <div className="drop-filters" role="group" aria-label="Encounter type">{['Everything', 'Bosses', 'Events'].map(value => <button key={value} aria-pressed={type === value} onClick={() => setType(value)}>{value}</button>)}</div>
    <div className="drop-filters" role="group" aria-label="Completion status">{['All', 'Remaining', 'Completed'].map(value => <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}</button>)}</div>
    {groups.map(group => {
      const visible = group.rows.filter(row => (type === 'Everything' || (type === 'Events') === Boolean(row.event)) && (filter === 'All' || (filter === 'Completed') === checked.includes(row.id)))
      return <section className="checklist-era" key={group.name}><h3>{group.name}<small>{group.note}</small></h3>{visible.length ? visible.map(row => <div className={`checklist-row ${checked.includes(row.id) ? 'is-defeated' : ''}`} key={row.id}>
        <input type="checkbox" checked={checked.includes(row.id)} onChange={() => toggle(row.id)} aria-label={`Mark ${row.name} completed`} />
        <details><summary><span className={`checklist-portrait${!checklistArt[row.id] && row.art.length > 1 ? ' has-multiple' : ''}`}>{checklistArt[row.id] ? <img src={`/items/${checklistArt[row.id]}`} alt="" /> : row.art.map(id => <img key={id} src={`/bosses/${id}.png`} alt="" />)}</span><span className="checklist-name">{row.name}{(row.optional || row.event) && <small>{row.event ? 'Event' : 'Optional'}</small>}</span><span className="checklist-loot-label">Loot ⌄</span></summary><div className="checklist-details">{renderLoot(row)}{row.stageId && <button className="checklist-gear" onClick={() => onGear(row.stageId)}>View gearing stage →</button>}</div></details>
      </div>) : <p className="gear-hint">No encounters in this filter.</p>}</section>
    })}
    <p className="gear-hint">{saved ? 'Checklist saved on this device.' : 'Your browser could not save this checklist; checks will last for this session.'} Checking an encounter never changes your selected gearing stage.</p>
  </section>
}

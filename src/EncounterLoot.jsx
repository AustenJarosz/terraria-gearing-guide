import { useState } from 'react'
import { bossDrops, dropNotes } from './data/bossDrops'
import { lootProgression } from './data/hardmodeDrops'

export function EncounterPlan({ encounter, inline = false }) {
  const allDrops = bossDrops[encounter.id] || encounter.drops || bossDrops[encounter.stageId] || []
  const drops = encounter.enemy ? allDrops.filter(drop => drop.enemy === encounter.enemy) : allDrops
  const enemies = [...new Set(drops.map(drop => drop.enemy).filter(Boolean))]
  const [selectedEnemy, setSelectedEnemy] = useState(null)
  const activeEnemy = enemies.includes(selectedEnemy) ? selectedEnemy : enemies[0]
  const visibleDrops = enemies.length > 1 ? drops.filter(drop => drop.enemy === activeEnemy) : drops
  const progression = lootProgression[encounter.id] || {}
  const gate = progression[activeEnemy]
  const note = dropNotes[encounter.id] || encounter.note
  const Container = inline ? 'div' : 'details'
  return (
    <Container className="boss-loot">
      {!inline && <summary>Notable drops <span>Master Mode</span></summary>}
      <p className="gear-hint">Master Mode loot · gear, materials & rare companions</p>
      {enemies.length > 1 && <div className="drop-filters" role="group" aria-label="Filter drops by boss or enemy">
        {enemies.map(enemy => <button type="button" key={enemy} aria-pressed={activeEnemy === enemy} onClick={() => setSelectedEnemy(enemy)}>{enemy}{progression[enemy] && <small className="drop-gate-label">{progression[enemy]}</small>}</button>)}
      </div>}
      {gate && <p className="drop-progression"><strong>{gate}</strong><span>{gate === 'Post-Plantera'
        ? `${activeEnemy} only appears after Plantera is defeated. All drops below require that milestone.`
        : gate === 'After all 3 mechanical bosses'
          ? 'Reaper only appears after defeating The Destroyer, The Twins, and Skeletron Prime. Death Sickle requires that milestone.'
          : 'These drops have no additional boss requirement once a Solar Eclipse is running.'}</span></p>}
      {drops.length > 0 ? <ul className="drop-list">{visibleDrops.map(drop => <li key={`${drop.enemy || ''}/${drop.name}`}>
        <span className={`drop-image${/^Soul of (Might|Sight|Fright)$/.test(drop.name) ? ' soul-frame' : ''}`}><img className="drop-icon" src={`/items/${drop.file}`} alt="" loading="lazy" /></span>
        <div><a href={`https://terraria.wiki.gg/wiki/${drop.source}`} target="_blank" rel="noreferrer">{drop.name}</a>{drop.quantity && <span className="drop-quantity"> × {drop.quantity}</span>}<p>{drop.kind}{drop.method && ` · ${drop.method}`}{drop.note && ` · ${drop.note}`}</p></div>
        <strong className="drop-rate">{drop.rate}</strong>
      </li>)}</ul> : <p className="gear-hint">Drop list coming soon.</p>}
      {note && <p className="gear-hint">{note}</p>}
      <a href={`https://terraria.wiki.gg/wiki/${encounter.source}`} target="_blank" rel="noreferrer">Full loot list on the Official Wiki ↗</a>
    </Container>
  )
}


import { useState } from 'react'
import { dungeonDrops } from './data/dungeonDrops'

export function DungeonLoot({ stage }) {
  const groups = dungeonDrops[stage.id]
  const enemies = groups.flatMap(group => group.enemies)
  const [selected, setSelected] = useState(null)
  const active = enemies.find(enemy => enemy.name === selected) || enemies[0]
  return <section className="dungeon-loot" aria-label="Dungeon enemy drops">
    <div className="panel-label"><h3>Enemy drops</h3><span>Master Mode</span></div>
    <p className="gear-hint">{stage.id === 'dungeon-post-plantera' ? 'New drops after Plantera, plus the original enemies that can still appear.' : 'Available after Skeletron, including Hardmode before Plantera.'} Gear, materials, keys & pets · base chances per kill.</p>
    {groups.map(group => <div key={group.name}>
      <h4 className="dungeon-loot-group">{group.name}</h4>
      <div className="drop-filters" role="group" aria-label={group.name}>
        {group.enemies.map(enemy => <button key={enemy.name} type="button" aria-pressed={active.name === enemy.name} onClick={() => setSelected(enemy.name)}>{enemy.name}</button>)}
      </div>
    </div>)}
    <div aria-live="polite" aria-atomic="true">
      <h4 className="dungeon-loot-enemy">{active.name}</h4>
      <ul className="drop-list">{active.drops.map(drop => <li key={drop.name}>
        <span className="drop-image"><img className="drop-icon" src={`/items/${drop.file}`} alt="" loading="lazy" /></span>
        <div><a href={`https://terraria.wiki.gg/wiki/${drop.source}`} target="_blank" rel="noreferrer">{drop.name}</a>{drop.quantity && <span className="drop-quantity"> × {drop.quantity}</span>}<p>{drop.kind}{drop.note && ` · ${drop.note}`}</p></div>
        <strong className="drop-rate">{drop.rate}</strong>
      </li>)}</ul>
      {active.note && <p className="gear-hint">{active.note}</p>}
      <a href={`https://terraria.wiki.gg/wiki/${active.source}`} target="_blank" rel="noreferrer">{active.name} loot on the Official Wiki ↗</a>
    </div>
    <p className="gear-hint">Variants share loot. Coins, food, banners and decorative drops are omitted. Spike Balls and Blazing Wheels have no loot.</p>
  </section>
}

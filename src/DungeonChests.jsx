import { useState } from 'react'
import { biomeChestLoot, dungeonChestGroups, goldChestLoot, woodenChestLoot } from './data/dungeonChests'

const labels = { gold: 'Locked Gold Chests', biome: 'Biome Chests', wooden: 'Wooden Chests' }
function WikiLink({ name, children }) {
  return <a href={`https://terraria.wiki.gg/wiki/${name.replaceAll(' ', '_')}`} target="_blank" rel="noreferrer">{children || name}</a>
}

function ChestItems({ items }) {
  return <ul className="drop-list">{items.map(item => <li key={item.name}>
    <span className="drop-image"><img className="drop-icon" src={`/items/${item.file}`} alt="" loading="lazy" /></span>
    <div><WikiLink name={item.name} /><p>{item.kind}{item.note && ` · ${item.note}`}</p>
      {item.chest && <p><WikiLink name={item.chest} /> · <WikiLink name={item.key} />{item.world && <span className="dungeon-world-tag">{item.world}</span>}</p>}
    </div>
    <strong className="drop-rate">{item.rate}</strong>
  </li>)}</ul>
}

export function DungeonChests({ stage }) {
  const groups = dungeonChestGroups[stage.id]
  const [selected, setSelected] = useState(null)
  const active = groups.includes(selected) ? selected : groups[0]
  return <section className="dungeon-chests" aria-label="Dungeon chest loot">
    <div className="panel-label"><h3>Chest loot</h3><span>{stage.id === 'dungeon-post-plantera' ? 'Post-Plantera' : 'After Skeletron'}</span></div>
    <div className="drop-filters" role="group" aria-label="Dungeon chest type">{groups.map(id => <button type="button" key={id} aria-pressed={active === id} onClick={() => setSelected(id)}>{labels[id]}</button>)}</div>
    <div aria-live="polite">
      {active === 'gold' && <>
        <p className="gear-hint">Consumes one <WikiLink name="Golden Key" /> per chest. These rewards remain available after Plantera.</p>
        <h4 className="dungeon-loot-group">Primary reward · one per chest</h4>
        <p className="gear-hint">Seven possible primary items, placed in a cycle when the world is generated. Opening a chest does not reroll its loot.</p>
        <ChestItems items={goldChestLoot.primary} />
        <h4 className="dungeon-loot-group">Additional treasures</h4>
        <ChestItems items={goldChestLoot.secondary} />
        <p className="gear-hint">* The first locked Gold Chest generated contains both a Shadow Key and Ram Rune. It may not be the first chest you find; the percentages apply to the others.</p>
        <WikiLink name="Gold_Chest#Dungeon">Dungeon Gold Chest loot on the Official Wiki ↗</WikiLink>
      </>}
      {active === 'biome' && <>
        <p className="gear-hint">Defeat Plantera in this world, then use the matching key. Each chest consumes its key and guarantees its weapon.</p>
        <ChestItems items={biomeChestLoot} />
        <p className="gear-hint">Ordinary worlds have five Biome Chests: the four shared types, plus either Corruption or Crimson. The Ice Chest here is the locked Dungeon chest.</p>
        <WikiLink name="Biome_Chests">Biome Chest loot on the Official Wiki ↗</WikiLink>
      </>}
      {active === 'wooden' && <>
        <p className="gear-hint">Unlocked wooden chests inside the Dungeon provide a key for a locked Gold Chest.</p>
        <ChestItems items={woodenChestLoot} />
        <WikiLink name="Golden Key">Golden Keys on the Official Wiki ↗</WikiLink>
      </>}
    </div>
    <p className="gear-hint">Unique gear, keys & crafting stations · ordinary-world loot. Common supplies and decorations are omitted.</p>
  </section>
}

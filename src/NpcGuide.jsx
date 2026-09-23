import { useState } from 'react'
import { npcs, npcStages, npcEras, findNpcs } from './data/npcs'
import { npcItemIcons } from './data/npcItemIcons'

const wiki = name => `https://terraria.wiki.gg/wiki/${encodeURIComponent(name.replaceAll(' ', '_'))}`
export function NpcGuide() {
  const [query, setQuery] = useState('')
  const [era, setEra] = useState('All NPCs')
  const search = query.trim().toLowerCase()
  const visible = findNpcs(query, era)
  return <section className="panel plaque npc-guide" aria-label="NPC guide">
    <p className="kicker">Your town · Desktop 1.4.5.7</p>
    <h2>NPCs & useful shops</h2>
    <p className="gear-hint">A suggested recruitment order, with gear, tools, crafting materials and useful supplies. Open a resident to see their shop unlocks. Earlier stock remains available unless its condition says otherwise.</p>
    <div className="npc-toolbar">
      <label htmlFor="npc-search">Find an NPC or item<input id="npc-search" type="search" placeholder="Try wings, Teleporter, Jungle…" value={query} onChange={event => setQuery(event.target.value)} /></label>
      <div className="npc-recruitment-filter">
        <span id="npc-recruitment-label">Recruitment</span>
        <div className="drop-filters" role="group" aria-labelledby="npc-recruitment-label">
          {['All NPCs', ...npcEras].map(value => <button type="button" key={value} aria-pressed={era === value} onClick={() => setEra(value)}>{value}</button>)}
        </div>
      </div>
    </div>
    <p className="npc-world-note">Normal worlds · Town NPCs need suitable housing to stay. In 1.4.5, one homeless NPC can arrive per day but leaves at night without a home. Special seeds can change recruitment and stock. <a href={wiki('NPCs')} target="_blank" rel="noreferrer">Housing & NPC rules ↗</a></p>
    <p className="npc-world-note">Biome pylons are shared shop stock: most resident vendors sell the local pylon when another NPC is nearby. Tavernkeep and travelers do not. <a href={wiki('Pylons')} target="_blank" rel="noreferrer">Pylon requirements ↗</a></p>
    <p className="npc-result-count" role="status">{visible.length} of {npcs.length} NPCs{search && ' · Matching shops open below'}</p>
    {npcEras.map(groupName => {
      const rows = visible.filter(npc => npc.era === groupName)
      return rows.length > 0 && <section className="npc-era" key={groupName}><h3>{groupName}<span>{groupName === 'Travelers' ? 'Available throughout progression' : 'Recruitment order can vary'}</span></h3>
        {rows.map(npc => <details className="npc-card" key={`${npc.id}-${search}`} open={search ? true : undefined}>
          <summary><span className="npc-portrait">{npc.head !== null ? <img src={`/npcs/${npc.head}.png`} alt="" loading="lazy" /> : <img src="/npcs/skeleton.png" alt="" loading="lazy" />}</span><span className="npc-title"><strong>{npc.name}</strong><span>{npc.role}</span></span><span className="npc-summary-condition">{npc.unlock}</span><span className="npc-expand" aria-hidden="true">⌄</span></summary>
          <div className="npc-body"><div className="npc-recruit"><span>Recruitment</span><p>{npc.unlock}</p></div>
            {npc.service && <p className="npc-service">{npc.service}</p>}
            {npc.shops.length > 0 && <><div className="npc-shop-heading"><h4>Gear & useful supplies</h4><span>Unlock stage + extra conditions</span></div>
              {npcStages.map((stage, index) => {
                const items = npc.shops.filter(group => group.stage === index).flatMap(group => group.items)
                return items.length > 0 && <section className="npc-stock-group" key={stage}><h5>{stage}</h5><ul>{items.map((item, i) => <li key={`${item.name}-${i}`} className={search && item.name.toLowerCase().includes(search) ? 'npc-item-match' : undefined}>
                  <span className="npc-item-art">{npcItemIcons[item.name] && <img src={`/items/${npcItemIcons[item.name]}`} alt="" loading="lazy" />}</span><div><a href={wiki(item.name)} target="_blank" rel="noreferrer">{item.name}</a>{item.condition && <p>{item.condition}</p>}</div>
                </li>)}</ul></section>
              })}</>}
            <a className="npc-source" href={`${wiki(npc.name)}#Items_sold`} target="_blank" rel="noreferrer">{npc.name} on the Official Wiki ↗</a>
          </div>
        </details>)}
      </section>
    })}
    {!visible.length && <p className="npc-empty">No NPCs or supplies match. Try another name or clear the recruitment filter.</p>}
  </section>
}

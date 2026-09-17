import { checklistSpawns } from './data/checklistSpawns'
import { SummonText } from './SummonText'

export function ChecklistSpawn({ encounterId }) {
  const spawn = checklistSpawns[encounterId]
  if (!spawn) return null
  return <section className="checklist-spawn" aria-label="How to start">
    <h4>How to start</h4>
    {(spawn.variants || [spawn]).map(info => <div className="checklist-spawn-method" key={info.source}>
      {info.name && <h5>{info.name}</h5>}
      <dl>
        <div><dt>Summon</dt><dd>{info.icon && <img src={`/items/${info.icon}`} alt="" loading="lazy" />}<SummonText text={info.summon} /></dd></div>
        <div><dt>Conditions</dt><dd><SummonText text={info.conditions} /></dd></div>
        {info.natural && <div><dt>Natural spawn</dt><dd><SummonText text={info.natural} /></dd></div>}
      </dl>
      <a className="checklist-spawn-source" href={`https://terraria.wiki.gg/wiki/${info.source}`} target="_blank" rel="noreferrer">Spawn details on the Wiki ↗</a>
    </div>)}
  </section>
}

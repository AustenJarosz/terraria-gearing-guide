import { ItemGrid } from './ItemChip'
import { getPreparation } from './data/preparation'

export function PreparationGuide({ stageId, classId }) {
  const prep = getPreparation(stageId, classId)
  return <details className="preparation loadout-swaps">
    <summary>Potions & buffs <span>Recovery, class buffs & arena stations</span></summary>
    <p className="preparation-help">A useful selection for this stage. Hover or tap an item for its recipe or source.</p>
    <div className="preparation-columns">
      <article className="preparation-column">
        <h4>Recovery & essentials</h4>
        <ItemGrid ids={prep.essentials} notes={prep.notes} showStats />
      </article>
      <article className="preparation-column">
        <h4>Class & damage</h4>
        <ItemGrid ids={prep.classPotions} notes={prep.notes} showStats />
        {prep.flasks.length > 0 && <div className="preparation-flasks">
          <h5>{prep.flasks.length > 1 ? 'Flasks · choose one' : 'Weapon flask'}</h5>
          <p>{prep.flaskNote}</p>
          <ItemGrid ids={prep.flasks} notes={prep.notes} showStats />
        </div>}
      </article>
      <article className="preparation-column">
        <h4>Stations & arena</h4>
        {prep.stations.length > 0 && <>
          <p className="preparation-help">Place and activate. These buffs last until death or leaving the world.</p>
          <ItemGrid ids={prep.stations} notes={prep.notes} showStats />
        </>}
        <h5>Stay nearby</h5>
        <ItemGrid ids={prep.nearby} notes={prep.notes} showStats />
      </article>
    </div>
    {prep.extras.length > 0 && <div className="preparation-extras">
      <h4>Useful for this encounter</h4>
      <ItemGrid ids={prep.extras} notes={prep.notes} showStats />
    </div>}
  </details>
}

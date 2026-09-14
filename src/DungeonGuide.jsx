import { dungeonStages } from './data/dungeon'

export function DungeonGuide({ stage, onSelect }) {
  return <section className="dungeon-guide" aria-label="Dungeon gear progression">
    <div className="dungeon-scene" aria-hidden="true" />
    <div className="dungeon-visits" role="group" aria-label="Dungeon progression">
      {dungeonStages.map(visit => <button key={visit.id} type="button" aria-pressed={stage.id === visit.id} onClick={() => onSelect(visit.id)}>
        {visit.id === 'dungeon-pre-plantera' ? 'Pre-Plantera' : 'Post-Plantera'}<small>{visit.id === 'dungeon-pre-plantera' ? 'First visit after Skeletron' : 'Return after Plantera'}</small>
      </button>)}
    </div>
  </section>
}

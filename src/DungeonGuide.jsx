import { DungeonLoot } from './DungeonLoot'

export function DungeonGuide({ stage }) {
  return <section className="dungeon-guide" aria-label="Dungeon gear progression">
    <DungeonLoot key={stage.id} stage={stage} />
  </section>
}

import { DungeonLoot } from './DungeonLoot'
import { DungeonChests } from './DungeonChests'

export function DungeonGuide({ stage }) {
  return <section className="dungeon-guide" aria-label={`${stage.name} loot`}>
    <DungeonChests key={`chests-${stage.id}`} stage={stage} />
    <DungeonLoot key={stage.id} stage={stage} />
  </section>
}

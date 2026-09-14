import { bossArt, enemyArt } from './data/bossArt'

export function BossArt({ stageId }) {
  const ids = bossArt[stageId]
  const enemies = enemyArt[stageId]
  if (enemies) return <div className="boss-art enemy-art" aria-hidden="true">
    {enemies.map(enemy => {
      const scale = Math.min(95 / enemy.width, 95 / enemy.frameHeight)
      return <span key={enemy.id} className="enemy-portrait" style={{
        width: enemy.width * scale,
        height: enemy.frameHeight * scale,
        backgroundImage: `url(/bosses/npc-${enemy.id}.png)`,
      }} />
    })}
  </div>
  if (!ids) return null
  return <div className={`boss-art ${ids.length > 1 ? 'boss-art-group' : ''}`} aria-hidden="true">
    {ids.map(id => <img key={id} src={`/bosses/${id}.png`} alt="" draggable="false" />)}
  </div>
}

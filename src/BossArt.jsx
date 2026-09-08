import { bossArt } from './data/bossArt'

export function BossArt({ stageId }) {
  const ids = bossArt[stageId]
  if (!ids) return null
  return <div className={`boss-art ${ids.length > 1 ? 'boss-art-group' : ''}`} aria-hidden="true">
    {ids.map(id => <img key={id} src={`/bosses/${id}.png`} alt="" draggable="false" />)}
  </div>
}

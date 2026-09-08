import { items, wikiSrc } from './data/items'
const classItems = { melee: 'daybreak', ranged: 'vortexBeater', mage: 'nebulaBlaze', summoner: 'stardustDragon' }
export function ClassIcon({ id }) {
  const item = items[classItems[id]]
  return item ? <img className="class-sprite" src={wikiSrc(item.file)} alt="" /> : null
}

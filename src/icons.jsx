import { items, wikiSrc } from './data/items'
const classItems = { melee: 'terraBlade', ranged: 'tsunami', mage: 'skyFracture', summoner: 'stardustDragon' }
export function ClassIcon({ id }) {
  const item = items[classItems[id]]
  return item ? <img className="class-sprite" src={wikiSrc(item.file)} alt="" /> : null
}

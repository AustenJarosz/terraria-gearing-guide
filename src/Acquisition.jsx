import { acquisitionIcons } from './data/acquisitionIcons'

const wiki = name => `https://terraria.wiki.gg/wiki/${encodeURIComponent(name.replaceAll('’', "'").replaceAll(' ', '_'))}`
function Material({ name }) {
  return <a className="acquisition-material" href={wiki(name)} target="_blank" rel="noreferrer">
    {acquisitionIcons[name] && <img src={`/items/${acquisitionIcons[name]}`} alt="" loading="lazy" />}<span>{name}</span>
  </a>
}
export function Acquisition({ data, name }) {
  if (!data) return null
  return <div className="acquisition">
    {data.recipes?.length > 0 && <><h4>{data.heading || `Recipe${data.recipes.length > 1 ? 's' : ''}`}</h4>
      <div className="acquisition-recipes">{data.recipes.map((recipe, index) => <div className="acquisition-recipe" key={index}>
        <div className="acquisition-result"><span className="acquisition-label">Result</span><Material name={recipe.result || name} />{recipe.quantity > 1 && <strong> × {recipe.quantity}</strong>}</div>
        <div><span className="acquisition-label">Ingredients</span><ul>{recipe.ingredients.map(([ingredient, quantity], i) => <li key={i}>
          <span>{(Array.isArray(ingredient) ? ingredient : [ingredient]).map((option, j) => <span key={option}>{j > 0 && <small className="acquisition-or">or</small>}<Material name={option} /></span>)}</span><strong>× {quantity}</strong>
        </li>)}</ul></div>
        <div className="acquisition-station"><span className="acquisition-label">Crafting station</span>{recipe.stations.map((station, i) => <div key={station}>{i > 0 && <small className="acquisition-or">or</small>}{station === 'By Hand' ? <span>By hand</span> : <Material name={station} />}</div>)}</div>
      </div>)}</div>
    </>}
    {data.drops?.length > 0 && <><h4>Drops · Master Mode</h4><table className="acquisition-drops"><thead><tr><th scope="col">Enemy / source</th><th scope="col">Chance</th></tr></thead><tbody>{data.drops.map((drop, i) => <tr key={i}><td>{drop.enemy.split(' & ').map((enemy, index) => <span key={enemy}>{index > 0 && ' & '}<a href={wiki(enemy.replace(/ · tier \d/i, ''))} target="_blank" rel="noreferrer">{enemy}</a></span>)}{drop.note && <small>{drop.note}</small>}</td><td>{drop.rate}</td></tr>)}</tbody></table></>}
    {data.vendor && <><h4>Buy from</h4><Material name={data.vendor} /></>}
    {data.note && <p className="acquisition-note">{data.note}</p>}
  </div>
}

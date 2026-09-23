import { usePersistentState } from './hooks/usePersistentState'
import { fishingMilestones, fishingRewards, fishingCombines, normalizeFishingCount, accessoryBaseChance } from './data/fishing'

const wiki = name => `https://terraria.wiki.gg/wiki/${encodeURIComponent(name.replaceAll(' ', '_'))}`
const storageKey = 'terraria-guide-fishing-quests'
const formatChance = value => `${(value * 100).toFixed(2)}%`
const accessoryCount = fishingRewards.filter(item => item.accessoryPool).length
function ItemLink({ name, id }) {
  return <a className="fishing-item" href={wiki(name)} target="_blank" rel="noreferrer">{id && <img src={`/items/fishing-${id}.png`} alt="" loading="lazy" />}<span>{name}</span></a>
}

export function FishingGuide() {
  const [count, setCount, saved] = usePersistentState(storageKey, 0, { parse: normalizeFishingCount })
  const next = fishingMilestones.find(item => item.count > count)
  function updateCount(value) {
    setCount(previous => normalizeFishingCount(typeof value === 'function' ? value(previous) : value))
  }
  return <section className="panel plaque fishing-guide" aria-label="Fishing guide">
    <div className="fishing-heading"><div><p className="kicker">The Angler · Quest rewards</p><h2>Make every catch count</h2><p className="gear-hint">The rewards worth working toward, starting with the six guaranteed milestones.</p></div><img src="/npcs/22.png" alt="Angler" width="48" height="48" /></div>
    <div className="fishing-start"><strong>Start at either Ocean</strong><p>Wake the Sleeping Angler, then bring back the fish he requests. Quests change at <strong>4:30 AM</strong>, with one turn-in per character each in-game day. Milestones count your character’s completed quests, not a particular fish species or consecutive days.</p><a href={wiki('Angler')} target="_blank" rel="noreferrer">Angler quest rules ↗</a></div>

    <section className="fishing-tracker" aria-label="Manual fishing quest tracker">
      <div><label htmlFor="fishing-quest-count">Your completed quests</label><p>Optional manual counter · saved on this device. Adjust it when switching characters.</p></div>
      <div className="fishing-counter"><button type="button" onClick={() => updateCount(previous => previous - 1)} disabled={count === 0} aria-label="Subtract one fishing quest">−</button><input id="fishing-quest-count" type="number" min="0" max="9999" step="1" inputMode="numeric" value={count} onChange={event => updateCount(event.target.value)} /><button className="fishing-add" type="button" disabled={count === 9999} onClick={() => updateCount(previous => previous + 1)}>+1 quest</button></div>
      <p className="fishing-next" role="status">{next ? <><strong>Next: {next.name}</strong><span>{next.count - count} more {next.count - count === 1 ? 'turn-in' : 'turn-ins'} · quest {next.count}</span></> : <><strong>All six guaranteed milestones reached</strong><span>Later quests still offer random gear, bait and supplies.</span></>}</p>
      {!saved && <p className="fishing-save-warning" role="alert">Your browser could not save this count. It will only last for this visit.</p>}
    </section>

    <div className="fishing-section-title"><h3>Guaranteed milestones</h3><span>All six are available in pre-Hardmode</span></div>
    <ol className="fishing-milestones">{fishingMilestones.map(item => <li key={item.count} className={count >= item.count ? 'is-reached' : ''}>
      <div className="fishing-milestone-top"><span>Quest <strong>{item.count}</strong></span><span>{count >= item.count ? '✓ Reached · 100%' : '100% guaranteed'}</span></div>
      <ItemLink {...item} /><p>{item.benefit}</p>
    </li>)}</ol>
    <p className="fishing-source">Guaranteed on those specific turn-ins. The bucket can also roll from quest 11 onward (1.43% base roll), and another Golden Fishing Rod can roll from quest 76 onward (0.40% base roll). <a href={`${wiki('Angler')}#Quest_rewards`} target="_blank" rel="noreferrer">Reward rules ↗</a></p>

    <div className="fishing-section-title"><h3>Other rewards worth chasing</h3><span>Random rewards · no guaranteed quest number</span></div>
    <p className="gear-hint" id="fishing-rates-note"><strong>Base roll chances, not fixed odds per quest.</strong> These assume the game reaches that reward’s roll: earlier rewards must fail first. Quest count and happiness improve the rolls. Accessory percentages assume all seven are still eligible. The counter above does not recalculate these baselines.</p>
    <div className="fishing-reward-groups">{['Fishing gear', 'Useful tools', 'Information accessories', 'Hardmode rewards'].map(group => <section className="fishing-reward-group" key={group}><h4>{group}</h4><ul>{fishingRewards.filter(item => item.group === group).map(item => <li key={item.name}><div className="fishing-reward-top"><ItemLink {...item} /><span className="fishing-rate" aria-describedby="fishing-rates-note"><strong>{formatChance(item.baseChance)}</strong><small>{item.accessoryPool ? `base · ${accessoryCount} eligible` : 'base roll'}</small></span></div><p>{item.benefit}</p><span className="fishing-unlock">{item.unlock}</span></li>)}</ul></section>)}</div>
    <details className="fishing-odds-help"><summary>How quest count & accessories change the odds</summary><div>
      <p><strong>More quests improve reward rolls.</strong> The quest-count boost reaches its limit at 150 completed quests. A happier Angler also helps; Luck does not affect quest rewards. The first quest’s actual odds already differ from these unmodified baselines.</p>
      <p><strong>Accessories share one roll.</strong> Its unmodified chance is about <strong>{formatChance(accessoryBaseChance)}</strong>, if earlier rewards failed. Success picks equally from the eligible accessories: seven left means about <strong>{formatChance(accessoryBaseChance / accessoryCount)} each</strong> at this baseline; three left means about <strong>{formatChance(accessoryBaseChance / 3)} each</strong>. Fewer missing items changes the split, not the chance of winning that shared roll.</p>
      <p><strong>Keep owned accessories with you.</strong> The game checks inventory, portable storage and all equipped loadouts, including social slots. Upgrades count for their ingredients. Ordinary world chests do not count, and this is not a permanent record of past rewards. Once all seven are owned, all seven can drop again.</p>
      <p><strong>Milestones take priority.</strong> A guaranteed reward uses the main reward slot on that turn-in. Coins, bait and decorations are separate rewards.</p>
      <a href={`${wiki('Angler')}#Accessory_rewards`} target="_blank" rel="noreferrer">Full reward calculations on the Official Wiki ↗</a>
    </div></details>

    <div className="fishing-section-title"><h3>Turn the small rewards into upgrades</h3><span>Craft at a <a href={wiki("Tinkerer's Workshop")} target="_blank" rel="noreferrer">Tinkerer's Workshop</a></span></div>
    <div className="fishing-combines">{fishingCombines.map(item => <section key={item.name}><ItemLink {...item} /><p>{item.benefit}</p><ul>{item.ingredients.map(name => <li key={name}><ItemLink name={name} id={fishingRewards.find(reward => reward.name === name)?.id} /><span>× 1</span></li>)}</ul></section>)}</div>
    <p className="fishing-source">Missing one fishing accessory? <a href={wiki('Shimmer')} target="_blank" rel="noreferrer">Shimmer</a> cycles High Test Fishing Line, Angler Earring and Tackle Box into one another.</p>

    <div className="fishing-section-title"><h3>A few useful shortcuts</h3></div>
    <div className="fishing-tips">
      <section><h4>Make a proper pond</h4><p>Aim for at least <strong>300 connected water tiles</strong> to avoid the small-pond fishing power penalty. Honey needs 200. Check the requested biome and depth before casting.</p><a href={wiki('Fishing')} target="_blank" rel="noreferrer">Fishing conditions ↗</a></section>
      <section><h4>Bring fishing potions</h4><p><ItemLink name="Fishing Potion" id={2354} /> improves fishing power. <ItemLink name="Sonar Potion" id={2355} /> reveals the catch before you reel it in. Use <ItemLink name="Crate Potion" id={2356} /> when farming crates.</p></section>
      <section><h4>Watch for Bumblebee Tuna</h4><p>This honey-fishing quest can give a <ItemLink name="Bottomless Honey Bucket" id={5302} /> or <ItemLink name="Honey Absorbant Sponge" id={5303} />. Before Hardmode, the honey reward has a 50% chance to be skipped. In Hardmode, one of the pair is awarded, except on the six guaranteed milestone turn-ins, which take priority. The individual honey item is still random.</p><a href={`${wiki('Angler')}#Quest_rewards`} target="_blank" rel="noreferrer">Honey reward rules ↗</a></section>
      <section><h4>Lava fishing has its own requirement</h4><p>The Golden Fishing Rod alone cannot fish in lava. Use lava bait, a <a href={wiki('Lavaproof Fishing Hook')} target="_blank" rel="noreferrer">Lavaproof Fishing Hook</a> or its upgrade, or the Hotline Fishing Hook. A Golden Bug Net can catch the Underworld critters used as lava bait.</p><a href={`${wiki('Fishing')}#Lava_fishing`} target="_blank" rel="noreferrer">Lava fishing ↗</a></section>
    </div>
  </section>
}

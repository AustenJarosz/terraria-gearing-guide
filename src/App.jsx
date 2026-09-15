import { useEffect, useMemo, useState } from 'react'
import { classes, eras, loadouts, stages as allStages } from './data/gear'
import { BossChecklist } from './BossChecklist'
const stages = allStages.filter(stage => stage.id !== 'pre-hardmode-optional')
import { ClassIcon } from './icons'
import './App.css'
import { ItemGrid } from './ItemChip'
import { ClassEffects } from './ClassEffects'
import { BossArt } from './BossArt'
import { bossArt } from './data/bossArt'
import { bossDrops, dropNotes } from './data/bossDrops'
import { lootProgression } from './data/hardmodeDrops'
import { DungeonGuide } from './DungeonGuide'

function ClassEmblem({ classId }) {
  return <div className={`class-emblem emblem-${classId}`} aria-hidden="true">
    <div className="energy-core" />
    <div className="energy-ring" />
    <div className="energy-particles">{Array.from({ length: 8 }, (_, index) => <i key={index} style={{ '--particle': index }} />)}</div>
    <svg className="emblem-geometry" viewBox="0 0 200 200" fill="none">
      {classId === 'melee' && <><path d="M40 22H160L178 42V126L100 182L22 126V42Z" /><path d="M53 38H147L160 51V118L100 161L40 118V51Z" /><path d="M12 68H42M158 68H188M12 106H42M158 106H188" /></>}
      {classId === 'ranged' && <><circle cx="100" cy="100" r="66" /><circle cx="100" cy="100" r="48" strokeDasharray="3 8" /><path d="M100 8V53M100 147V192M8 100H53M147 100H192M24 24H52M24 24V52M176 176H148M176 176V148" /></>}
      {classId === 'mage' && <><circle cx="100" cy="100" r="79" /><path d="M100 7L193 100L100 193L7 100Z" /><ellipse cx="100" cy="100" rx="92" ry="36" transform="rotate(-35 100 100)" /><path d="M100 30L160 135H40Z" /></>}
      {classId === 'summoner' && <><path d="M100 17C155 17 177 80 159 131C140 185 60 185 41 131C23 80 45 17 100 17Z" /><ellipse cx="100" cy="113" rx="86" ry="42" /><circle cx="100" cy="15" r="7" /><circle cx="23" cy="136" r="6" /><circle cx="177" cy="136" r="6" /></>}
    </svg>
    <ClassIcon id={classId} />
  </div>
}

function EncounterPlan({ encounter, inline = false }) {
  const drops = encounter.enemy ? (bossDrops[encounter.stageId] || []).filter(drop => drop.enemy === encounter.enemy) : bossDrops[encounter.id] || []
  const enemies = [...new Set(drops.map(drop => drop.enemy).filter(Boolean))]
  const [selectedEnemy, setSelectedEnemy] = useState(null)
  const activeEnemy = enemies.includes(selectedEnemy) ? selectedEnemy : enemies[0]
  const visibleDrops = enemies.length > 1 ? drops.filter(drop => drop.enemy === activeEnemy) : drops
  const progression = lootProgression[encounter.id] || {}
  const gate = progression[activeEnemy]
  const Container = inline ? 'div' : 'details'
  return (
    <Container className="boss-loot">
      {!inline && <summary>Notable drops <span>Master Mode</span></summary>}
      <p className="gear-hint">Master Mode loot · gear, materials & rare companions</p>
      {enemies.length > 1 && <div className="drop-filters" role="group" aria-label="Filter drops by boss or enemy">
        {enemies.map(enemy => <button type="button" key={enemy} aria-pressed={activeEnemy === enemy} onClick={() => setSelectedEnemy(enemy)}>{enemy}{progression[enemy] && <small className="drop-gate-label">{progression[enemy]}</small>}</button>)}
      </div>}
      {gate && <p className="drop-progression"><strong>{gate}</strong><span>{gate === 'Post-Plantera'
        ? `${activeEnemy} only appears after Plantera is defeated. All drops below require that milestone.`
        : gate === 'After all 3 mechanical bosses'
          ? 'Reaper only appears after defeating The Destroyer, The Twins, and Skeletron Prime. Death Sickle requires that milestone.'
          : 'These drops have no additional boss requirement once a Solar Eclipse is running.'}</span></p>}
      {drops.length > 0 ? <ul className="drop-list">{visibleDrops.map(drop => <li key={`${drop.enemy || ''}/${drop.name}`}>
        <span className={`drop-image${/^Soul of (Might|Sight|Fright)$/.test(drop.name) ? ' soul-frame' : ''}`}><img className="drop-icon" src={`/items/${drop.file}`} alt="" loading="lazy" /></span>
        <div><a href={`https://terraria.wiki.gg/wiki/${drop.source}`} target="_blank" rel="noreferrer">{drop.name}</a>{drop.quantity && <span className="drop-quantity"> × {drop.quantity}</span>}<p>{drop.kind}{drop.method && ` · ${drop.method}`}{drop.note && ` · ${drop.note}`}</p></div>
        <strong className="drop-rate">{drop.rate}</strong>
      </li>)}</ul> : <p className="gear-hint">Drop list coming soon.</p>}
      {dropNotes[encounter.id] && <p className="gear-hint">{dropNotes[encounter.id]}</p>}
      <a href={`https://terraria.wiki.gg/wiki/${encounter.source}`} target="_blank" rel="noreferrer">Full loot list on the Official Wiki ↗</a>
    </Container>
  )
}

export default function App() {
  const [classId, setClassId] = useState('melee')
  const [stageId, setStageId] = useState('pre-boss')
  const [view, setView] = useState('gear')
  const isDungeon = view === 'gear' && stages.find(stage => stage.id === stageId)?.theme === 'dungeon'

  useEffect(() => {
    document.documentElement.dataset.class = classId
    return () => { delete document.documentElement.dataset.class }
  }, [classId])

  useEffect(() => {
    if (isDungeon) document.documentElement.dataset.environment = 'dungeon'
    else delete document.documentElement.dataset.environment
    return () => { delete document.documentElement.dataset.environment }
  }, [isDungeon])

  const activeClass = classes.find((item) => item.id === classId)
  const activeStage = stages.find((item) => item.id === stageId)
  const stageIndex = stages.findIndex((item) => item.id === stageId)
  const loadout = useMemo(
    () => loadouts.find((item) => item.classId === classId && item.stageId === stageId),
    [classId, stageId],
  )

  return (
    <div className={`page class-${isDungeon ? 'dungeon' : classId}`} style={isDungeon ? { '--dungeon-art': `url("${activeStage.art}")` } : undefined}>
      <div className="world-backdrop" aria-hidden="true"><i /><i /><i /></div>

      <header className="hero plaque">
        {!isDungeon && <ClassEffects key={`effects-${classId}`} />}
        <div className="hero-copy">
        <p className="kicker">Terraria · Bigger & Boulder</p>
        <h1>Gearing Guide</h1><p className="version-note">Desktop 1.4.5.7 · Class loadouts & progression</p>
        <p className="lede">
          Choose a class, then a boss or event along the roadmap. See
          what to bring <em>before</em> the fight, which items work together, and which rewards to chase.
        </p>
        </div>
        {isDungeon ? <div className="dungeon-seal" aria-hidden="true">◇<span>THE DUNGEON</span></div> : <ClassEmblem key={`emblem-${classId}`} classId={classId} />}
      </header>

      <section className="panel plaque" aria-label="Class">
        <div className="panel-label">
          <span>01</span>
          <h2>Class</h2>
        </div>
        <div className="class-grid">
          {classes.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`class-card ${item.id} ${classId === item.id ? 'active' : ''}`}
              aria-pressed={classId === item.id}
              onClick={() => setClassId(item.id)}
            >
              <span className="class-status" aria-hidden="true">{classId === item.id ? '●' : '○'}</span>
              <span className="class-icon">
                <ClassIcon id={item.id} />
              </span>
              <span className="class-name">{item.name}<span aria-hidden="true">↗</span></span>
              <span className="class-blurb">{item.blurb}</span>
            </button>
          ))}
        </div>
      </section>


      <nav className="guide-views" aria-label="Guide view">
        <button aria-pressed={view === 'gear'} onClick={() => setView('gear')}><strong>Gearing roadmap</strong><span>What to equip next</span></button>
        <button aria-pressed={view === 'checklist'} onClick={() => setView('checklist')}><strong>Boss checklist & loot</strong><span>Track kills · browse rewards</span></button>
      </nav>
      {view === 'checklist' && <BossChecklist renderLoot={encounter => <EncounterPlan encounter={encounter} inline />} onGear={id => { setStageId(id); setView('gear') }} />}
      {view === 'gear' && <section className="panel plaque" aria-label="Progression">
        <div className="panel-label">
          <span>02</span>
          <h2>Boss & event roadmap</h2>
        </div>
        <p className="roadmap-hint">Follow the main route and pick the optional detours you want. The order is a suggestion, not a checklist of required kills. Selecting a stop does not mark earlier fights complete.</p>
        <div className="era-stack">
          {eras.map((era) => {
            const eraStages = stages.filter((stage) => stage.era === era.id)
            return (
              <div key={era.id} className={`era era-${era.id}`}>
                <h3>{era.name}</h3>
                <ol className="stage-path">
                  {eraStages.map((stage, index) => {
                    const globalIndex = stages.findIndex((item) => item.id === stage.id)
                    const active = stage.id === stageId
                    return (
                      <li key={stage.id} className="stage-node">
                        {index > 0 && <span className="path-line" aria-hidden="true" />}
                        <button
                          type="button"
                          className={`stage-chip ${active ? 'active' : ''} ${stage.theme === 'dungeon' ? 'stage-dungeon' : ''}`}
                          style={stage.theme === 'dungeon' ? { '--dungeon-art': `url("${stage.art}")` } : undefined}
                          aria-pressed={active}
                          onClick={() => setStageId(stage.id)}
                        >
                          <span className="stage-marker">
                            <span className={`stage-icons${bossArt[stage.id]?.length > 1 ? ' stage-icons-group' : ''}`} aria-hidden="true">
                              {stage.theme === 'dungeon' ? <img className="dungeon-thumbnail" src={stage.art} alt="" draggable="false" /> : bossArt[stage.id]?.map(id => <img key={id} src={`/bosses/${id}.png`} alt="" draggable="false" />)}
                            </span>
                            <span className="stage-index">{String(globalIndex + 1).padStart(2, '0')}</span>
                          </span>
                          <span className="stage-copy">
                            <span className="stage-name">{stage.name}</span>
                            <span className="stage-type">{stage.kind || 'Main route'}</span>
                            <span className="stage-next">{stage.id === 'optional-bosses'
                              ? <><span className="stage-boss-name">Duke Fishron &amp;</span><span className="stage-boss-name">Empress of Light</span></>
                              : stage.next}</span>
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ol>
              </div>
            )
          })}
        </div>
      </section>}

      {view === 'gear' && loadout && activeClass && activeStage && (
        <section className="loadout plaque" aria-live="polite">
          <div className="loadout-head">
            {!isDungeon && <BossArt key={stageId} stageId={stageId} />}
            <p className="loadout-kicker">
              {activeClass.name} · {eras.find((era) => era.id === activeStage.era)?.name}
            </p>
            <h2>{activeStage.name}</h2>
            <p className="loadout-when">{activeStage.when}</p>
            <p className="next-boss-banner">
              {isDungeon ? 'Gear · ' : 'Gear up for '}<strong>{activeStage.next}</strong>
            </p>
          </div>

          {isDungeon && <DungeonGuide stage={activeStage} onSelect={setStageId} />}
          {activeStage.unlock && !isDungeon && <EncounterPlan encounter={activeStage} />}
          {activeStage.encounters && (
            <section className="encounter-choices" aria-label="Optional encounters">
              <p className="roadmap-hint">{activeStage.prepare}</p>
              {activeStage.encounters.map(encounter => (
                <details key={encounter.id} className="encounter-choice">
                  <summary>{encounter.name}<span>{encounter.next}</span></summary>
                  <div className="encounter-portrait"><BossArt stageId={encounter.id} /></div>
                  <EncounterPlan encounter={encounter} />
                  {encounter.rewards?.[classId]?.length > 0 && (
                    <div className="encounter-rewards">
                      <h3 className="gear-section-title">Rewards to chase · {activeClass.name}</h3>
                      <p className="gear-hint">Earn or craft these after this encounter; they are not required for your first clear.</p>
                      <ItemGrid ids={encounter.rewards[classId]} />
                    </div>
                  )}
                </details>
              ))}
            </section>
          )}

          <h3 className="gear-section-title">{isDungeon ? 'Entry gear' : activeStage.encounters ? 'Starter gear for these encounters' : 'Bring to this fight'}</h3>
          <p className="gear-hint">Hover for a preview; tap to keep it open. This guide is for Master Mode. Accessories are a recommendation pool, not a requirement to equip every item; choose up to 7 after using the Demon Heart extra-slot upgrade.</p><div className="slots">
            <article className="slot">
              <h3>Armor</h3>
              <ItemGrid ids={loadout.armor} notes={loadout.itemNotes} />
            </article>
            <article className="slot">
              <h3>Weapons</h3>
              <ItemGrid ids={loadout.weapons} notes={loadout.itemNotes} />
            </article>
            <article className="slot">
              <h3>Accessories</h3>
              <ItemGrid ids={loadout.accessories} notes={loadout.itemNotes} />
            </article>
          </div>

          {!isDungeon && <aside className="notes">
            <h3>Notes</h3>
            <p>{loadout.notes}</p>
          </aside>}
          {activeStage.rewards?.[classId]?.length > 0 && (
            <section className="encounter-rewards">
              <h3 className="gear-section-title">Rewards to chase · {activeClass.name}</h3>
              <p className="gear-hint">{activeStage.rewardNote || 'Earn or craft these after this encounter. They are not part of the first-clear kit above.'}</p>
              <ItemGrid ids={activeStage.rewards[classId]} />
            </section>
          )}
          <nav className="roadmap-nav" aria-label="Move through roadmap">
            <button type="button" disabled={stageIndex === 0} onClick={() => setStageId(stages[stageIndex - 1].id)}>← Previous stop</button>
            {activeStage.optional && activeStage.era === 'hardmode' && <button type="button" onClick={() => setStageId('pre-lunatic')}>Skip to Lunatic Cultist</button>}
            <button type="button" disabled={stageIndex === stages.length - 1} onClick={() => setStageId(stages[stageIndex + 1].id)}>{stageIndex < stages.length - 1 ? `Next: ${stages[stageIndex + 1].name} →` : 'End of roadmap'}</button>
          </nav>
        </section>
      )}

      <footer className="foot">
        Practical loadouts for Desktop 1.4.5.7. Expert / Master items are optional. Terraria sprites © Re-Logic.<br /><a href="https://store.steampowered.com/news/posts/?appids=105600&amp;feed=steam_community_announcements" target="_blank" rel="noreferrer">1.4.5.7 release notes</a> · <a href="https://terraria.wiki.gg/wiki/Guide:Class_setups" target="_blank" rel="noreferrer">Official Wiki class guide</a>
      </footer>
    </div>
  )
}


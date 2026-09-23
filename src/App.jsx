import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { classes, eras, loadouts, roadmapStages as stages, retiredStageFallbacks } from './data/gear'
import { BossChecklist } from './BossChecklist'
import { ClassIcon } from './icons'
import './App.css'
import { ItemGrid } from './ItemChip'
import { EquipmentGuide } from './EquipmentGuide'
import { GearLayoutControl } from './GearLayoutControl'
import { ClassEffects } from './ClassEffects'
import { BossArt } from './BossArt'
import { bossArt } from './data/bossArt'
import { EncounterPlan } from './EncounterLoot'
import { usePersistentState } from './hooks/usePersistentState'
import { getEnvironment } from './data/environments'
import { DungeonGuide } from './DungeonGuide'

const NpcGuide = lazy(() => import('./NpcGuide').then(module => ({ default: module.NpcGuide })))
const FishingGuide = lazy(() => import('./FishingGuide').then(module => ({ default: module.FishingGuide })))

function useSavedSelection(key, fallback, allowed, replacements = {}) {
  return usePersistentState(key, fallback, { parse: stored => {
    const saved = replacements[stored] || stored
    return allowed.includes(saved) ? saved : fallback
  } })
}

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

export default function App() {
  const [artworkOnly, setArtworkOnly] = useState(false)
  const [artworkDim, setArtworkDim] = useSavedSelection('terraria-guide-artwork-dim', '0', Array.from({ length: 86 }, (_, index) => String(index)))
  const [classId, setClassId] = useSavedSelection('terraria-guide-class', 'melee', classes.map(item => item.id))
  const [stageId, setStageId] = useSavedSelection('terraria-guide-stage', 'pre-boss', stages.map(item => item.id), retiredStageFallbacks)
  const [view, setView] = useSavedSelection('terraria-guide-view', 'gear', ['gear', 'checklist', 'npcs', 'fishing'])
  const [gearLayout, setGearLayout] = useSavedSelection('terraria-guide-layout', 'modern', ['modern', 'classic', 'compact'])
  const environment = getEnvironment(view, stageId)
  const environmentId = environment?.[0]
  const hasArtwork = Boolean(environment)
  // A view change from another tab can remove the artwork and its return button.
  if (artworkOnly && !hasArtwork) setArtworkOnly(false)

  useEffect(() => {
    if (!artworkOnly) return
    window.dispatchEvent(new CustomEvent('guide-preview-open'))
    const mobileViewport = window.matchMedia('(max-width: 980px)')
    const restoreGuideOnMobile = () => {
      if (mobileViewport.matches) setArtworkOnly(false)
    }
    restoreGuideOnMobile()
    mobileViewport.addEventListener('change', restoreGuideOnMobile)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = event => { if (event.key === 'Escape') setArtworkOnly(false) }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
      mobileViewport.removeEventListener('change', restoreGuideOnMobile)
    }
  }, [artworkOnly])

  useEffect(() => {
    document.documentElement.dataset.class = classId
    return () => { delete document.documentElement.dataset.class }
  }, [classId])

  useEffect(() => {
    if (environmentId) document.documentElement.dataset.environment = environmentId
    else delete document.documentElement.dataset.environment
    return () => { delete document.documentElement.dataset.environment }
  }, [environmentId])

  const activeClass = classes.find((item) => item.id === classId)
  const activeStage = stages.find((item) => item.id === stageId)
  const stageIndex = stages.findIndex((item) => item.id === stageId)
  const loadout = useMemo(
    () => loadouts.find((item) => item.classId === classId && item.stageId === stageId),
    [classId, stageId],
  )

  return (
    <div className={`page class-${classId} ${environment?.[1] || ''}${view === 'gear' && !artworkOnly ? ' has-layout-control' : ''}`}>
      <div className="world-backdrop" aria-hidden="true"><i /><i /><i /><div className="artwork-dimmer" style={{ opacity: Number(artworkDim) / 100 }} /></div>

      {view === 'gear' && !artworkOnly && <GearLayoutControl value={gearLayout} onChange={setGearLayout} />}

      <div className="artwork-controls">
        {!artworkOnly && <label className="artwork-dim-control" htmlFor="artwork-dim">
          <span>Dim artwork <output htmlFor="artwork-dim">{artworkDim}%</output></span>
          <input id="artwork-dim" type="range" min="0" max="85" step="1" value={artworkDim} aria-valuetext={`${artworkDim}% darker`} onChange={event => setArtworkDim(event.target.value)} />
        </label>}
        {hasArtwork && <button className="artwork-toggle" type="button" aria-pressed={artworkOnly} onClick={() => setArtworkOnly(value => !value)} title={artworkOnly ? 'Return to guide (Escape)' : 'Hide the guide to view the artwork'}>{artworkOnly ? '← Back to guide' : '◈ View artwork'}</button>}
      </div>
      <div className={`guide-content${artworkOnly ? ' is-hidden' : ''}`} inert={artworkOnly} aria-hidden={artworkOnly || undefined}>
      <header className="hero plaque">
        {!hasArtwork && <ClassEffects key={`effects-${classId}`} />}
        <div className="hero-copy">
        <p className="kicker">Terraria · Bigger & Boulder</p>
        <h1>Gearing Guide</h1><p className="version-note">Desktop 1.4.5.7 · Class loadouts & progression</p>
        <p className="lede">
          Choose a class, then a boss or event along the roadmap. See
          what to bring <em>before</em> the fight, which items work together, and which rewards to chase.
        </p>
        </div>
        <ClassEmblem key={`emblem-${classId}`} classId={classId} />
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
        <button aria-pressed={view === 'checklist'} onClick={() => setView('checklist')}><strong>Boss & event checklist</strong><span>Track encounters · browse rewards</span></button>
        <button aria-pressed={view === 'npcs'} onClick={() => setView('npcs')}><strong>NPC guide</strong><span>Find residents · explore shop unlocks</span></button>
        <button aria-pressed={view === 'fishing'} onClick={() => setView('fishing')}><strong>Fishing guide</strong><span>Quest milestones · useful rewards</span></button>
      </nav>
      {view === 'checklist' && <BossChecklist renderLoot={encounter => encounter.kind === 'Dungeon' ? <DungeonGuide stage={encounter} /> : <EncounterPlan encounter={encounter} inline />} onGear={id => { setStageId(id); setView('gear') }} />}
      <Suspense fallback={<section className="panel plaque" role="status">Loading guide…</section>}>
        {view === 'npcs' && <NpcGuide />}
        {view === 'fishing' && <FishingGuide />}
      </Suspense>
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
                          className={`stage-chip ${active ? 'active' : ''}`}
                          aria-pressed={active}
                          onClick={() => setStageId(stage.id)}
                        >
                          <span className="stage-marker">
                            <span className={`stage-icons${bossArt[stage.id]?.length > 1 ? ' stage-icons-group' : ''}`} aria-hidden="true">
                              {bossArt[stage.id]?.map(id => <img key={id} src={`/bosses/${id}.png`} alt="" draggable="false" />)}
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
            <BossArt key={stageId} stageId={stageId} />
            <p className="loadout-kicker">
              {activeClass.name} · {eras.find((era) => era.id === activeStage.era)?.name}
            </p>
            <h2>{activeStage.name}</h2>
            <p className="loadout-when">{activeStage.when}</p>
            <p className="next-boss-banner">
              Gear up for <strong>{activeStage.next}</strong>
            </p>
          </div>

          {activeStage.unlock && <EncounterPlan encounter={activeStage} />}
          {activeStage.encounters && (
            <section className="encounter-choices" aria-label="Optional encounters">
              <p className="roadmap-hint">{activeStage.prepare}</p>
              {activeStage.encounters.map(encounter => (
                <details key={encounter.id} className="encounter-choice">
                  <summary>{encounter.name}<span>{encounter.next}</span></summary>
                  <div className="encounter-portrait"><BossArt stageId={encounter.id} /></div>
                  <EncounterPlan encounter={encounter} inline />
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

          <h3 className="gear-section-title">{activeStage.encounters ? 'Starter gear for these encounters' : 'Bring to this fight'}</h3>
          <EquipmentGuide key={`${stageId}/${classId}`} base={loadout} stage={activeStage} layout={gearLayout} />
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
        Master Mode loadouts for Desktop 1.4.5.7. Six accessory slots before the Demon Heart; seven afterward. Terraria sprites © Re-Logic.<br /><a href="https://store.steampowered.com/news/posts/?appids=105600&amp;feed=steam_community_announcements" target="_blank" rel="noreferrer">1.4.5.7 release notes</a> · <a href="https://terraria.wiki.gg/wiki/Guide:Class_setups" target="_blank" rel="noreferrer">Official Wiki class guide</a>
      </footer>
      </div>
    </div>
  )
}

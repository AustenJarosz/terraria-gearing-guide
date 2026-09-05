import { useMemo, useState } from 'react'
import { classes, eras, loadouts, stages } from './data/gear'
import { ClassIcon } from './icons'
import './App.css'
import { ItemGrid } from './ItemChip'

export default function App() {
  const [classId, setClassId] = useState('melee')
  const [stageId, setStageId] = useState('pre-boss')

  const activeClass = classes.find((item) => item.id === classId)
  const activeStage = stages.find((item) => item.id === stageId)
  const stageIndex = stages.findIndex((item) => item.id === stageId)
  const loadout = useMemo(
    () => loadouts.find((item) => item.classId === classId && item.stageId === stageId),
    [classId, stageId],
  )

  return (
    <div className={`page class-${classId}`}>
      <div className="frame-glow" aria-hidden="true" />

      <header className="hero plaque">
        <div className="hero-ornament" aria-hidden="true" />
        <p className="kicker">Terraria · Bigger & Boulder</p>
        <h1>Gearing Guide</h1><p className="version-note">Desktop 1.4.5.7 · Boss-by-boss loadouts</p>
        <p className="lede">
          Choose a class, then the next boss you still need to kill. Loadouts are
          what you should be wearing <em>before</em> that fight.
        </p>
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
              onClick={() => setClassId(item.id)}
            >
              <span className="class-icon">
                <ClassIcon id={item.id} />
              </span>
              <span className="class-name">{item.name}</span>
              <span className="class-blurb">{item.blurb}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="panel plaque" aria-label="Progression">
        <div className="panel-label">
          <span>02</span>
          <h2>Next boss</h2>
        </div>
        <div className="era-stack">
          {eras.map((era) => {
            const eraStages = stages.filter((stage) => stage.era === era.id)
            return (
              <div key={era.id} className={`era era-${era.id}`}>
                <h3>{era.name}</h3>
                <ol className="stage-path">
                  {eraStages.map((stage, index) => {
                    const globalIndex = stages.findIndex((item) => item.id === stage.id)
                    const done = globalIndex < stageIndex
                    const active = stage.id === stageId
                    return (
                      <li key={stage.id} className="stage-node">
                        {index > 0 && <span className="path-line" aria-hidden="true" />}
                        <button
                          type="button"
                          className={`stage-chip ${active ? 'active' : ''} ${done ? 'done' : ''}`}
                          onClick={() => setStageId(stage.id)}
                        >
                          <span className="stage-index">{String(globalIndex + 1).padStart(2, '0')}</span>
                          <span className="stage-copy">
                            <span className="stage-name">{stage.name}</span>
                            <span className="stage-next">Next: {stage.next}</span>
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
      </section>

      {loadout && activeClass && activeStage && (
        <section className="loadout plaque" aria-live="polite">
          <div className="loadout-head">
            <p className="loadout-kicker">
              {activeClass.name} · {eras.find((era) => era.id === activeStage.era)?.name}
            </p>
            <h2>{activeStage.name}</h2>
            <p className="loadout-when">{activeStage.when}</p>
            <p className="next-boss-banner">
              Gear up for <strong>{activeStage.next}</strong>
            </p>
          </div>

          <p className="gear-hint">Hover for a preview; tap to keep it open. Items are alternatives—choose what fits your slots. Helmet icons represent armor sets.</p><div className="slots">
            <article className="slot">
              <h3>Armor</h3>
              <ItemGrid ids={loadout.armor} />
            </article>
            <article className="slot">
              <h3>Weapons</h3>
              <ItemGrid ids={loadout.weapons} />
            </article>
            <article className="slot">
              <h3>Accessories</h3>
              <ItemGrid ids={loadout.accessories} />
            </article>
          </div>

          <aside className="notes">
            <h3>Notes</h3>
            <p>{loadout.notes}</p>
          </aside>
        </section>
      )}

      <footer className="foot">
        Practical loadouts for Desktop 1.4.5.7. Expert / Master items are optional. Terraria sprites © Re-Logic.<br /><a href="https://store.steampowered.com/news/posts/?appids=105600&amp;feed=steam_community_announcements" target="_blank" rel="noreferrer">1.4.5.7 release notes</a> · <a href="https://terraria.wiki.gg/wiki/Guide:Class_setups" target="_blank" rel="noreferrer">Official Wiki class guide</a>
      </footer>
    </div>
  )
}


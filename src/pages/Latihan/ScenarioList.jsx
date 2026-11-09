import { SCENARIOS } from '../../data/scenarios.js'
import { playerLevel } from '../../lib/practice.js'

export default function ScenarioList({ progress, onStart }) {
  const doneCount = Object.keys(progress).length
  return (
    <>
      <div className="split-header" style={{ margin: '20px 0 14px' }}>
        <div>
          <span className="eyebrow">Latih · Daftar skenario</span>
          <h2 style={{ margin: '4px 0 0' }}>Pilih skenario latihan</h2>
        </div>
        <span className="badge dark">
          Level {playerLevel(doneCount, SCENARIOS.length)} · {doneCount} dari {SCENARIOS.length} selesai
        </span>
      </div>
      <div className="grid-3">
        {SCENARIOS.map((s) => {
          const score = progress[s.id]
          return (
            <button
              key={s.id}
              className={'scenario-card' + (score != null ? ' done' : '')}
              onClick={() => onStart(s)}
            >
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <span className="status">{score != null ? `Selesai · ${score}%` : 'Mulai'}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}

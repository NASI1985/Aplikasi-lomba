import { SCENARIOS } from '../../data/scenarios.js'
import ProgressBar from '../../components/ProgressBar.jsx'
import { isRisky } from './practiceReducer.js'

// Kartu kiri: riwayat chat dengan penipu.
export default function ChatPanel({ run }) {
  const { scenario, stepIndex, selected, chat } = run
  const scenarioNumber = SCENARIOS.findIndex((s) => s.id === scenario.id) + 1
  const stepsDone = stepIndex + (selected !== null ? 1 : 0)

  return (
    <div className="card">
      <span className="eyebrow">
        Latihan · Skenario {scenarioNumber} dari {SCENARIOS.length} · {scenario.title}
      </span>
      <ProgressBar percent={(stepsDone / scenario.steps.length) * 100} onLight label="Progres skenario" />
      <div className="chat" aria-live="polite">
        {chat.map((message, i) => (
          <div key={i} className={'bubble' + (message.from === 'me' ? ' mine' : '')}>
            {i === 0 && <b>{scenario.sender}</b>}
            {message.text}
          </div>
        ))}
      </div>
      {isRisky(run) && (
        <div className="notice danger">Dalam simulasi ini, uangmu hilang dan akunmu bisa diambil alih.</div>
      )}
      <p className="fineprint push-down">Semua percakapan fiktif untuk latihan.</p>
    </div>
  )
}

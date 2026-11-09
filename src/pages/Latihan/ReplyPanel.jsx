import { Check } from 'lucide-react'
import { currentStep, isLastStep, isRisky } from './practiceReducer.js'

// Kartu kanan: pilihan balasan, lalu umpan balik (aman atau berisiko).
export default function ReplyPanel({ run, onPick, onNext, onRetry, onFinish }) {
  const step = currentStep(run)
  const answered = run.selected !== null

  if (isRisky(run)) {
    return (
      <div className="card danger-outline">
        <h2 className="title-danger">Pilihan berisiko</h2>
        <p>{step.explanation}</p>
        <div className="tint-box neutral">
          <b>Tanda bahaya yang terlewat</b>
          {step.missedFlags.map((flag) => (
            <div key={flag}>• {flag}</div>
          ))}
        </div>
        <div className="actions push-down">
          <button className="btn btn-outline" onClick={onRetry}>
            Ulangi skenario
          </button>
          <button className="btn btn-dark" onClick={onFinish}>
            Lanjut ke ringkasan
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Kamu mau balas apa?</h2>
      {step.options.map((option, i) => (
        <button
          key={option.text}
          className={'choice' + (answered && i === run.selected ? ' selected' : '')}
          disabled={answered}
          onClick={() => onPick(i)}
        >
          {option.text}
        </button>
      ))}
      {answered && (
        <>
          <div className="tint-box">
            <b className="title-ok">
              <Check size={16} className="icon" />
              Pilihan aman.
            </b>{' '}
            {step.explanation}
          </div>
          <button className="btn btn-dark push-down" onClick={isLastStep(run) ? onFinish : onNext}>
            {isLastStep(run) ? 'Lihat hasil akhir' : 'Lanjut ke pesan berikutnya'}
          </button>
        </>
      )}
    </div>
  )
}

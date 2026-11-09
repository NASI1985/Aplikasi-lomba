import { Shield, Share2 } from 'lucide-react'
import { useToast } from '../../components/Toast.jsx'
import ProgressBar from '../../components/ProgressBar.jsx'
import { SCENARIOS } from '../../data/scenarios.js'
import { copyText } from '../../lib/clipboard.js'
import { calcScore, levelFromScore, countBadges, BADGE_MIN_SCORE } from '../../lib/practice.js'

const KEY_TIP = 'Kalau diminta uang atau OTP, berhenti. Verifikasi lewat kanal resmi.'

export default function FinalResult({ run, progress, onExit }) {
  const showToast = useToast()
  const { scenario, safeCount, missedFlags } = run
  const total = scenario.steps.length
  const score = calcScore(safeCount, total)
  const badgesLeft = SCENARIOS.length - countBadges(progress)

  const shareTip = async () => {
    const text = KEY_TIP + ' Latihan di SiagaDigital.'
    if (navigator.share) {
      try {
        await navigator.share({ text })
      } catch {
        /* dibatalkan pengguna */
      }
    } else {
      copyText(text, showToast)
    }
  }

  return (
    <div className="grid-2">
      <div className="card panel-primary">
        <span className="eyebrow">Hasil akhir · {scenario.title}</span>
        <div className="big-number medium">Level: {levelFromScore(score)}</div>
        <p style={{ fontSize: 18 }}>
          {safeCount} dari {total} keputusan aman ({score}%)
        </p>
        <ProgressBar percent={score} label="Skor" />
        <div className="cluster">
          {score >= BADGE_MIN_SCORE && (
            <span className="badge light">
              <Shield size={14} className="icon" />
              Lencana {scenario.badge}
            </span>
          )}
          <span className="badge translucent">Guardian: {badgesLeft} lencana lagi</span>
        </div>
        <p className="fineprint push-down" style={{ color: '#fff' }}>
          Skor adalah latihan, bukan jaminan kebal tipuan.
        </p>
      </div>

      <div className="card">
        <h2>Yang terlewat</h2>
        {missedFlags.length > 0 ? (
          missedFlags.map((flag) => (
            <p key={flag} style={{ margin: 0 }}>
              <b className="title-danger">{flag}.</b>
            </p>
          ))
        ) : (
          <p>Tidak ada. Semua keputusanmu aman.</p>
        )}
        <h2 className="spaced-heading">Tips kunci</h2>
        <div className="tint-box">{KEY_TIP}</div>
        <div className="actions push-down">
          <button className="btn btn-outline" onClick={onExit}>
            Coba skenario lain
          </button>
          <button className="btn btn-dark" onClick={shareTip}>
            <Share2 size={16} className="icon" />
            Bagikan tips ke teman
          </button>
        </div>
      </div>
    </div>
  )
}

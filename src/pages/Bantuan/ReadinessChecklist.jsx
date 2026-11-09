import { useState } from 'react'
import ProgressBar from '../../components/ProgressBar.jsx'
import usePersistedState from '../../hooks/usePersistedState.js'
import { SECURITY_CHECKLIST } from '../../data/securityChecklist.js'

// Checklist keamanan akun. Centang tersimpan di browser: { idItem: true }
export default function ReadinessChecklist() {
  const [checked, setChecked] = usePersistedState('siagadigital:checklist', {})
  const [showHowTo, setShowHowTo] = useState(false)

  const doneCount = SECURITY_CHECKLIST.filter((item) => checked[item.id]).length
  const percent = Math.round((doneCount / SECURITY_CHECKLIST.length) * 100)
  const nextItem = SECURITY_CHECKLIST.find((item) => !checked[item.id])

  const toggle = (id) => {
    setChecked((c) => ({ ...c, [id]: !c[id] }))
    setShowHowTo(false)
  }

  return (
    <div className="grid-2">
      <div className="card">
        <span className="eyebrow danger">Bertindak · Checklist keamanan akun</span>
        <h2>Cek perlindunganmu</h2>
        {SECURITY_CHECKLIST.map((item) => (
          <label className="check-row" key={item.id}>
            <input type="checkbox" checked={!!checked[item.id]} onChange={() => toggle(item.id)} />
            {item.label}
          </label>
        ))}
      </div>

      <div className="card panel-primary">
        <span className="eyebrow">Kesiapan perlindungan</span>
        <div className="big-number">{percent}%</div>
        <ProgressBar percent={percent} label="Kesiapan perlindungan" />
        <p style={{ fontSize: 17 }}>
          {nextItem
            ? `Langkah berikutnya: ${nextItem.label.toLowerCase()}.`
            : 'Mantap! Semua perlindungan dasar sudah aktif.'}
        </p>
        {showHowTo && nextItem && <div className="tint-box on-primary">{nextItem.howTo}</div>}
        {nextItem && (
          <button className="btn btn-light push-down" onClick={() => setShowHowTo((v) => !v)}>
            {showHowTo ? 'Sembunyikan cara' : 'Lihat cara melakukannya'}
          </button>
        )}
      </div>
    </div>
  )
}

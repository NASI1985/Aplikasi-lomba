import { useState } from 'react'
import { REPORT_CHANNELS } from '../../data/emergency.js'

// Checklist langkah darurat berdasarkan waktu, plus kanal lapor.
export default function ActionPlan({ incident, platform }) {
  const [done, setDone] = useState({}) // { teksLangkah: true }
  const toggle = (step) => setDone((d) => ({ ...d, [step]: !d[step] }))

  const phases = [
    {
      title: 'Sekarang juga (0–1 jam)',
      color: 'var(--danger)',
      steps: [platform.firstStep, ...incident.urgentSteps],
    },
    { title: 'Hari ini', color: 'var(--orange)', steps: incident.todaySteps },
  ]

  return (
    <div className="card">
      <span className="eyebrow danger">Bantuan · Aku sudah kena tipu</span>
      <h2>Kejadian: {incident.title}</h2>

      {phases.map((phase) => (
        <div className="phase" key={phase.title} style={{ '--phase-color': phase.color }}>
          <h3>{phase.title}</h3>
          {phase.steps.map((step) => (
            <label className="check-row" key={step}>
              <input type="checkbox" checked={!!done[step]} onChange={() => toggle(step)} />
              {step}
            </label>
          ))}
        </div>
      ))}

      <div className="phase" style={{ '--phase-color': 'var(--primary)' }}>
        <h3>Lapor</h3>
        {REPORT_CHANNELS.map((channel, i) => (
          <span key={channel.label}>
            {i > 0 && ' · '}
            <a
              className="link"
              href={channel.href}
              {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {channel.label}
            </a>
          </span>
        ))}
      </div>
      <p className="fineprint push-down">Periksa ulang kanal resmi sebelum menghubungi.</p>
    </div>
  )
}

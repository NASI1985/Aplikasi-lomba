import { INCIDENTS, PLATFORMS } from '../../data/emergency.js'

export default function IncidentWizard({
  incidentId,
  onIncidentChange,
  platformIndex,
  onPlatformChange,
  onSubmit,
}) {
  return (
    <div className="grid-2">
      <div className="card">
        <span className="eyebrow danger">Bertindak · Pertanyaan 1 dari 2</span>
        <h2>Apa yang terjadi?</h2>
        {INCIDENTS.map((incident) => (
          <button
            key={incident.id}
            className={'choice' + (incidentId === incident.id ? ' selected' : '')}
            aria-pressed={incidentId === incident.id}
            onClick={() => onIncidentChange(incident.id)}
          >
            {incident.wizardLabel}
          </button>
        ))}
      </div>
      <div className="card">
        <span className="eyebrow danger">Pertanyaan 2 dari 2</span>
        <h2>Di platform apa?</h2>
        {PLATFORMS.map((platform, i) => (
          <button
            key={platform.label}
            className={'choice' + (platformIndex === i ? ' selected' : '')}
            aria-pressed={platformIndex === i}
            onClick={() => onPlatformChange(i)}
          >
            {platform.label}
          </button>
        ))}
        <button className="btn btn-danger push-down" onClick={onSubmit}>
          Tampilkan langkahku
        </button>
      </div>
    </div>
  )
}

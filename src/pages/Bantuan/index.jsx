import { useState, useEffect, useRef } from 'react'
import { useToast } from '../../components/Toast.jsx'
import { INCIDENTS, PLATFORMS } from '../../data/emergency.js'
import IncidentWizard from './IncidentWizard.jsx'
import ActionPlan from './ActionPlan.jsx'
import WarningMessage from './WarningMessage.jsx'
import ReadinessChecklist from './ReadinessChecklist.jsx'

// Halaman "Bantuan": wizard 2 pertanyaan -> rencana tindakan + pesan peringatan,
// dan di bagian bawah ada checklist kesiapan akun.
export default function Bantuan({ initialIncidentId, onPresetUsed }) {
  const showToast = useToast()
  const [incidentId, setIncidentId] = useState(initialIncidentId)
  const [platformIndex, setPlatformIndex] = useState(null)
  const [planVisible, setPlanVisible] = useState(false)
  const planRef = useRef(null)

  // Pilihan awal dari "Aku sudah transfer" hanya dipakai sekali.
  useEffect(() => {
    onPresetUsed?.()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (planVisible) planRef.current?.scrollIntoView?.({ behavior: 'smooth' })
  }, [planVisible])

  const incident = INCIDENTS.find((i) => i.id === incidentId)
  const platform = PLATFORMS[platformIndex]

  const showPlan = () => {
    if (!incident || !platform) {
      showToast('Jawab kedua pertanyaan dulu ya')
      return
    }
    setPlanVisible(true)
  }

  return (
    <>
      <IncidentWizard
        incidentId={incidentId}
        onIncidentChange={setIncidentId}
        platformIndex={platformIndex}
        onPlatformChange={setPlatformIndex}
        onSubmit={showPlan}
      />
      {planVisible && incident && platform && (
        <div className="grid-2" ref={planRef}>
          {/* key = reset centang saat jenis kejadian berganti */}
          <ActionPlan key={incident.id} incident={incident} platform={platform} />
          <WarningMessage topic={incident.warningTopic} />
        </div>
      )}
      <ReadinessChecklist />
    </>
  )
}

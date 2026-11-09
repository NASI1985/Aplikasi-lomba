import { useState } from 'react'
import { Copy, Share2 } from 'lucide-react'
import { useToast } from '../../components/Toast.jsx'
import { WARNING_TONES } from '../../data/emergency.js'
import { copyText } from '../../lib/clipboard.js'

// Pembuat pesan peringatan untuk teman dan keluarga.
export default function WarningMessage({ topic }) {
  const showToast = useToast()
  const [toneIndex, setToneIndex] = useState(0)
  const message = WARNING_TONES[toneIndex].template.replace('{topic}', topic)

  return (
    <div className="card">
      <h2>Peringatkan teman &amp; keluarga</h2>
      <div className="cluster">
        {WARNING_TONES.map((tone, i) => (
          <button
            key={tone.label}
            className={'pill' + (toneIndex === i ? ' active' : '')}
            onClick={() => setToneIndex(i)}
          >
            {tone.label}
          </button>
        ))}
      </div>
      <div className="text-box soft">{message}</div>
      <div className="actions push-down">
        <button className="btn btn-outline" onClick={() => copyText(message, showToast)}>
          <Copy size={16} className="icon" />
          Salin
        </button>
        <a
          className="btn"
          target="_blank"
          rel="noopener noreferrer"
          href={'https://wa.me/?text=' + encodeURIComponent(message)}
        >
          <Share2 size={16} className="icon" />
          Bagikan ke WhatsApp
        </a>
      </div>
    </div>
  )
}

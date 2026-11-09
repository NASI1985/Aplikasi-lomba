import { INPUT_CATEGORIES } from '../../data/checkInput.js'
import { LEVEL_LABELS } from '../../lib/analyzer.js'

const BADGE_BY_LEVEL = { tinggi: 'danger', sedang: 'warn', rendah: 'ok' }

export default function ResultStep({ categoryIndex, result, onEdit, onNeedHelp }) {
  const { segments, findings, combos, level } = result

  return (
    <div className="grid-2">
      {/* Kiri: teks dengan bagian mencurigakan disorot */}
      <div className="card">
        <span className="eyebrow">Cek dulu · {INPUT_CATEGORIES[categoryIndex].short}</span>
        <h2>Isi yang kamu tempel</h2>
        <div className="text-box">
          {segments.map((s, i) =>
            s.weight ? (
              <mark key={i} className={s.weight >= 3 ? 'danger' : ''}>
                {s.text}
              </mark>
            ) : (
              <span key={i}>{s.text}</span>
            ),
          )}
        </div>
        <p className="fineprint">Kuning: perlu dicurigai. Merah: tanda bahaya kuat.</p>
        <button className="btn push-down" onClick={onEdit}>
          Periksa ulang
        </button>
      </div>

      {/* Kanan: tingkat kewaspadaan dan alasannya */}
      <div className="card">
        <div className="split-header">
          <h2 style={{ margin: 0 }}>Kewaspadaan: {LEVEL_LABELS[level]}</h2>
          <span className={'badge ' + BADGE_BY_LEVEL[level]}>{findings.length} tanda bahaya</span>
        </div>

        {combos.map((combo) => (
          <div key={combo.id} className="notice danger">
            <b>Perhatian.</b> {combo.message}
          </div>
        ))}

        {findings.length > 0 ? (
          findings.map(({ rule, matches }) => (
            <div className="finding" key={rule.id}>
              <b>{rule.title}.</b> {rule.why}
              <div className="matched">Ditemukan: {matches.map((m) => `“${m}”`).join(', ')}</div>
            </div>
          ))
        ) : (
          <div className="finding">
            Tidak ada pola penipuan umum yang terdeteksi. Itu belum berarti aman: tetap cek lewat kanal resmi.
          </div>
        )}

        <div className="actions push-down">
          <a className="btn btn-outline" href="#latih">
            Latih skenario serupa
          </a>
          <a className="btn btn-danger" href="#bantuan" onClick={onNeedHelp}>
            Aku sudah transfer
          </a>
        </div>
        <p className="fineprint">Indikasi saja, bukan bukti. Verifikasi lewat kanal resmi.</p>
      </div>
    </div>
  )
}

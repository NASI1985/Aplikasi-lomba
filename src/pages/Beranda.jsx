import { TriangleAlert } from 'lucide-react'

// Tiga kartu fitur. tone menentukan warna kartu (lihat .feature-card di app.css).
const FEATURES = [
  {
    tone: 'kenali',
    eyebrow: '01 · Kenali',
    title: 'Cek pesan atau link mencurigakan',
    text: 'Tempel teks, lihat tanda bahaya yang disorot beserta alasannya.',
    cta: 'Periksa sekarang',
    href: '#cek',
    buttonClass: 'btn-light',
  },
  {
    tone: 'latih',
    eyebrow: '02 · Latih',
    title: 'Uji kewaspadaanku',
    text: 'Simulasi chat bercabang: loker palsu, giveaway, teman dibajak, pinjol ilegal.',
    cta: 'Mulai latihan',
    href: '#latih',
    buttonClass: 'btn-dark',
  },
  {
    tone: 'bertindak',
    eyebrow: '03 · Bertindak',
    title: 'Aku sudah kena tipu',
    text: 'Langkah darurat 0–1 jam, cara lapor, dan pesan peringatan untuk teman.',
    cta: 'Lihat langkahnya',
    href: '#bantuan',
    buttonClass: 'btn-danger',
  },
]

export default function Beranda() {
  return (
    <>
      <h1>Kenali tipuan sebelum kamu klik.</h1>
      <p className="lead">
        Cek pesan mencurigakan, latih instingmu lewat simulasi, dan tahu langkah pasti kalau sudah terlanjur
        kena. Tanpa login, tanpa data pribadi.
      </p>
      <div className="grid-3">
        {FEATURES.map((f) => (
          <div key={f.tone} className={'feature-card ' + f.tone}>
            <span className="eyebrow">{f.eyebrow}</span>
            <h2>{f.title}</h2>
            <p>{f.text}</p>
            <a className={'btn ' + f.buttonClass} href={f.href}>
              {f.cta}
            </a>
          </div>
        ))}
      </div>
      <div className="notice">
        <TriangleAlert size={16} className="icon" />
        Hasil pengecekan hanyalah indikasi dari pola umum. Hasil “rendah” bukan bukti aman. Selalu verifikasi
        lewat kanal resmi.
      </div>
    </>
  )
}

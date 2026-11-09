export default function Tentang() {
  return (
    <>
      <h1 style={{ fontSize: 'clamp(32px, 6vw, 52px)' }}>Tentang SiagaDigital</h1>
      <div className="grid-2">
        <div className="card">
          <h2>Untuk siapa</h2>
          <p>
            SiagaDigital membantu anak muda Indonesia mengenali penipuan digital, melatih respons, dan
            bertindak cepat setelah terlanjur kena.
          </p>
          <p>
            Tiga bagian: <b>Cek Dulu</b> untuk memeriksa pesan, <b>Latihan</b> untuk simulasi chat, dan{' '}
            <b>Bantuan</b> untuk langkah darurat.
          </p>
        </div>
        <div className="card">
          <h2>Privasi</h2>
          <p>
            Tanpa login. Semua pemrosesan berjalan di browsermu. Teks yang kamu tempel tidak dikirim ke
            server. Hanya progres latihan dan checklist disimpan di perangkatmu.
          </p>
          <div className="notice">
            Pengecekan hanya indikasi dari pola umum. Hasil “rendah” bukan bukti aman. Selalu verifikasi lewat
            kanal resmi seperti OJK 157 dan cekrekening.id.
          </div>
        </div>
      </div>
    </>
  )
}

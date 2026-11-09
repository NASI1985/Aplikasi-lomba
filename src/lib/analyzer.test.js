// Jalankan dengan: npm test
import test from 'node:test'
import assert from 'node:assert/strict'
import { analyze } from './analyzer.js'
import { SAMPLE_MESSAGE } from '../data/checkInput.js'

const ids = (r) => r.findings.map((f) => f.rule.id)

const USER_SCAM =
  'selamat anda mendapatkan peluang untuk mendapatkan pekerjaan terbaik di amerika dengan pembayaran seharga $2000 per jam, untuk mengikuti kami membutuhkan pembayaran untuk proses pendaftaran agar lancar dan sentosa. bisa tf langsung dari bsi a.n. andina dengan norek 04232346'

test('loker palsu luar negeri + minta bayar ke rekening terdeteksi Tinggi', () => {
  const r = analyze(USER_SCAM)
  assert.equal(r.level, 'tinggi')
  for (const id of [
    'uang-di-muka',
    'rekening-pribadi',
    'imbalan-tidak-wajar',
    'luar-negeri',
    'umpan-hadiah',
    'atas-nama',
  ]) {
    assert.ok(ids(r).includes(id), `aturan ${id} harus ditemukan`)
  }
  assert.ok(r.combos.some((c) => c.id === 'loker-palsu'))
  assert.ok(r.combos.some((c) => c.id === 'rekening-orang'))
})

test('contoh bawaan terdeteksi Tinggi dengan OTP dan biaya di muka', () => {
  const r = analyze(SAMPLE_MESSAGE)
  assert.equal(r.level, 'tinggi')
  for (const id of ['uang-di-muka', 'kode-rahasia', 'imbalan-tidak-wajar', 'tekanan-waktu'])
    assert.ok(ids(r).includes(id), id)
})

test('pesan biasa terdeteksi Rendah', () => {
  const r = analyze('Halo, besok kita makan siang jam 12 ya. Nanti aku kabari lagi.')
  assert.equal(r.level, 'rendah')
  assert.equal(r.findings.length, 0)
})

test('tidak peduli huruf besar-kecil dan singkatan', () => {
  assert.ok(ids(analyze('TF DULU ya ke BCA 123')).includes('uang-di-muka'))
  assert.ok(ids(analyze('Klik bit.ly/hadiah-id sekarang')).includes('tautan'))
  assert.ok(ids(analyze('Pasang resi-paket.apk')).includes('tautan'))
})

test('investasi bodong terdeteksi', () => {
  const r = analyze('Member kemarin untung 30% dalam sehari! Slot VIP tutup malam ini.')
  assert.ok(ids(r).includes('untung-pasti'))
  assert.ok(r.combos.some((c) => c.id === 'investasi-bodong'))
})

test('potongan teks yang disorot selalu menyusun kembali teks asli', () => {
  for (const t of [
    USER_SCAM,
    SAMPLE_MESSAGE,
    '',
    'biasa saja',
    'Transfer biaya admin Rp50.000 hari ini, kirim kode OTP',
  ]) {
    const r = analyze(t)
    assert.equal(r.segments.map((s) => s.text).join(''), t)
  }
})

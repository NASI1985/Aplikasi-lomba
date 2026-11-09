# SiagaDigital

Platform edukasi dan responden keamanan digital untuk anak muda Indonesia.
Dibuat dengan **React + Vite**. Tanpa login dan tanpa server: semua diproses di browser,
progres latihan dan checklist disimpan di localStorage.

## Menjalankan

1. Pasang Node.js 18 atau lebih baru (https://nodejs.org).
2. Di terminal, dari folder ini:

```bash
npm install
npm run dev      # buka alamat yang muncul, biasanya http://localhost:5173
```

| Perintah          | Fungsi                                           |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | jalankan mode pengembangan (otomatis refresh)    |
| `npm test`        | jalankan tes mesin pengecekan dan logika latihan |
| `npm run build`   | buat versi siap online di folder `dist`          |
| `npm run preview` | coba hasil build secara lokal                    |

## Peta folder (menu di aplikasi -> kode)

```
src/
  App.jsx                 header, menu, dan pemilih halaman
  pages/
    Beranda.jsx           halaman awal
    CekDulu/              menu "Cek Dulu"  (InputStep -> ResultStep)
    Latihan/              menu "Latihan"   (daftar -> chat -> hasil akhir)
    Bantuan/              menu "Bantuan"   (wizard, rencana, pesan, checklist)
    Tentang.jsx
  data/                   ISI/KONTEN. Paling sering diedit, tanpa perlu paham React
    detectionRules.js     aturan pendeteksi penipuan
    scenarios.js          skenario latihan
    emergency.js          langkah darurat, nada pesan, kanal lapor
    securityChecklist.js  checklist keamanan akun
    checkInput.js         pilihan kategori dan teks contoh
  lib/                    LOGIKA murni (tanpa tampilan), ada tesnya
    analyzer.js           mesin pengecekan teks
    practice.js           aturan skor dan level latihan
  components/             potongan tampilan yang dipakai ulang (Toast, ProgressBar)
  hooks/                  usePersistedState (simpan ke browser), useHashRoute (pindah halaman)
  styles/                 theme.css (warna) dan app.css (tampilan)
```

## Cara kerja Cek Dulu

Bukan AI. Tiap aturan di `data/detectionRules.js` berisi daftar kata dan pola.
Kalau ada yang cocok di teks, teksnya disorot dan **bobot** aturan itu dijumlahkan:
skor 0 = Rendah, 1 sampai 2 = Sedang, 3 ke atas = Tinggi. Hasil "Rendah" hanya
berarti pola yang dikenal tidak ditemukan, bukan bukti pesan itu aman.

### Menambah kata yang dikenali

Buka `src/data/detectionRules.js`, cari aturan yang sesuai, lalu tambahkan kata ke daftar `kata(...)`:

```js
kata('biaya pendaftaran', 'biaya admin', 'biaya baru yang kamu tambahkan'),
```

Huruf besar-kecil tidak berpengaruh. Setelah itu jalankan `npm test`.

### Menambah aturan baru

Salin satu blok `{ id, title, why, weight, patterns }` di `detectionRules.js`, ganti isinya.
Tambahkan juga satu tes di `src/lib/analyzer.test.js` berisi contoh pesan penipuan yang ingin dikenali.

## Menambah skenario latihan

Buka `src/data/scenarios.js`, salin satu skenario, ganti isinya, tempel di akhir daftar.
Jumlah langkah bebas, dan jumlah skenario di layar menyesuaikan otomatis.

## Menambah item checklist keamanan

Tambahkan satu baris `{ id, label, howTo }` di `src/data/securityChecklist.js`.
`id` harus unik.

## Mengubah warna

Semua warna ada di `src/styles/theme.css` (termasuk mode gelap otomatis).

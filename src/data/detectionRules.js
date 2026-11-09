// ATURAN DETEKSI PENIPUAN (halaman Cek Dulu)
//
// Cara kerjanya (bukan AI): tiap aturan punya daftar kata/pola. Kalau ada yang cocok
// di teks yang ditempel, aturan itu dianggap "ditemukan", teksnya disorot, dan
// bobotnya dijumlahkan menjadi skor.
//
//   bobot 3 = tanda bahaya kuat (disorot merah)
//   bobot 2 = mencurigakan       (disorot kuning)
//   bobot 1 = tanda lemah        (disorot kuning)
//
//   skor 0 = Rendah | skor 1-2 = Sedang | skor 3 ke atas = Tinggi
//
// Cara menambah kata: cukup tambahkan ke daftar kata('...') di aturan yang sesuai.
// Cara menambah aturan: salin satu blok { id, title, why, weight, patterns } di bawah.
// Pola bebas boleh ditulis sebagai regex, misalnya /\bgaji\s+\d+/gi.

import { kata } from '../lib/patterns.js'

export const RULES = [
  {
    id: 'uang-di-muka',
    title: 'Minta uang di muka',
    why: 'Perusahaan, pemberi hadiah, atau pemberi pinjaman resmi tidak meminta kamu membayar lebih dulu.',
    weight: 3,
    patterns: [
      kata(
        'biaya pendaftaran',
        'biaya registrasi',
        'biaya administrasi',
        'biaya admin',
        'biaya pelatihan',
        'biaya training',
        'biaya aktivasi',
        'biaya pengiriman',
        'biaya ongkir',
        'biaya proses',
        'uang muka',
        'uang pendaftaran',
        'uang jaminan',
        'uang tebusan',
        'uang pelicin',
        'deposit',
        'tebusan',
        'ongkir',
        'pajak pencairan',
        'pajak penarikan',
        'pajak hadiah',
      ),
      // "pembayaran untuk proses pendaftaran", "bayar seragam", "setor jaminan", dst.
      /\b(?:pembayaran|membayar|bayar|setor|menyetor|setoran|transfer|tf|trf)\b\s+(?:\S+\s+){0,3}?(?:pendaftaran|registrasi|administrasi|pelatihan|training|seragam|aktivasi|verifikasi|jaminan|pajak|ongkir|asuransi)\b/gi,
      // "transfer dulu", "bayar di awal"
      /\b(?:bayar|transfer|tf|trf|setor)\b[^.!?\n]{0,40}\b(?:dulu|di\s?awal|terlebih\s+dahulu|lebih\s+dulu)\b/gi,
    ],
  },
  {
    id: 'rekening-pribadi',
    title: 'Diminta transfer ke rekening atau e-wallet',
    why: 'Penipu mengarahkan uang ke rekening perorangan. Cek rekening tujuan di cekrekening.id sebelum transfer.',
    weight: 3,
    patterns: [
      // "tf langsung dari bsi", "transfer ke rekening", "kirim ke dana"
      /\b(?:tf|trf|tranfer|transfer|kirim|setor)\w*\b[^.!?\n]{0,30}?\b(?:bca|bri|bni|bsi|mandiri|cimb|btn|permata|danamon|ocbc|jago|seabank|dana|ovo|gopay|shopeepay|linkaja|rekening|rek|norek)\b/gi,
      // "norek 04232346", "no. rekening: 1234567890"
      /\b(?:no\.?\s?rek(?:ening)?|norek|nomor\s+rekening|rekening|rek)\b[\s:.\-]*\d[\d\s.\-]{5,}\d/gi,
    ],
  },
  {
    id: 'kode-rahasia',
    title: 'Minta kode OTP, PIN, atau kata sandi',
    why: 'OTP, PIN, dan kata sandi tidak boleh dibagikan ke siapa pun, termasuk yang mengaku “petugas”.',
    weight: 3,
    patterns: [
      kata(
        'otp',
        'kode otp',
        'kode verifikasi',
        'kode sms',
        'kode rahasia',
        'kode 6 digit',
        'cvv',
        'password',
        'kata sandi',
      ),
      /\b(?:kirim|berikan|beri|sebutkan|bagikan|masukkan|share)\w*\s+(?:\S+\s+){0,2}?(?:pin|passcode)\b/gi,
    ],
  },
  {
    id: 'data-sensitif',
    title: 'Minta data pribadi sensitif',
    why: 'KTP, data kartu, dan data diri jangan dikirim ke orang atau akun yang belum terverifikasi.',
    weight: 2,
    patterns: [
      kata(
        'ktp',
        'nik',
        'kartu keluarga',
        'foto ktp',
        'selfie ktp',
        'kartu kredit',
        'nomor kartu',
        'data diri',
        'tanggal lahir ibu kandung',
      ),
    ],
  },
  {
    id: 'imbalan-tidak-wajar',
    title: 'Imbalan tidak masuk akal',
    why: 'Gaji besar tanpa syarat atau seleksi adalah umpan yang sangat umum.',
    weight: 2,
    patterns: [
      // "$2000 per jam", "Rp500.000/hari"
      /(?:\$|us\$|usd\s?|rp\.?\s?)\d+(?:[.,]\d+)*\s?(?:juta|jt|ribu|rb)?\s*(?:\/|per\s+|tiap\s+|setiap\s+)(?:jam|hari|menit)\b/gi,
      // "gaji Rp8.000.000/bulan tanpa pengalaman"
      /\bgaji\s+(?:sebesar\s+|hingga\s+|sampai\s+|mulai\s+)?(?:\$|us\$|usd\s?|rp\.?\s?)\d+(?:[.,]\d+)*(?:\s?(?:juta|jt))?(?:[^.!?\n]{0,25}?tanpa\s+(?:pengalaman|skill|keahlian|ijazah))?/gi,
      kata(
        'tanpa pengalaman',
        'tanpa skill',
        'tanpa keahlian',
        'tanpa modal',
        'tanpa interview',
        'tanpa tes',
        'tanpa seleksi',
        'pasti diterima',
        'langsung diterima',
        'gaji fantastis',
        'komisi per tugas',
        'tugas harian',
        'like dan subscribe',
        'klik iklan',
        'kerja santai',
        'cukup modal hp',
      ),
    ],
  },
  {
    id: 'untung-pasti',
    title: 'Janji untung besar dan pasti',
    why: 'Investasi sungguhan selalu ada risiko. Janji untung pasti adalah ciri investasi bodong.',
    weight: 2,
    patterns: [
      // "untung 30%", "bunga 1% per hari"
      /\b(?:untung|keuntungan|profit|cuan|bunga|return|bagi\s+hasil)\s+(?:hingga\s+|sampai\s+|sebesar\s+|mencapai\s+)?\d+\s?%[^.!?\n]{0,20}/gi,
      kata(
        'pasti untung',
        'dijamin untung',
        'tanpa risiko',
        'bebas risiko',
        'profit harian',
        'passive income',
        'balik modal',
        'robot trading',
        'sinyal vip',
        'member vip',
        'grup vip',
      ),
    ],
  },
  {
    id: 'tautan',
    title: 'Tautan atau file mencurigakan',
    why: 'Jangan buka tautan pendek atau pasang file apk dari orang yang tidak dikenal.',
    weight: 2,
    patterns: [
      /(?:https?:\/\/|www\.)\S*[^\s.,;!?)]/gi,
      /\b(?:bit\.ly|tinyurl\.com|cutt\.ly|s\.id|t\.me|wa\.me|rb\.gy)\/\S*[^\s.,;!?)]/gi,
      /\S+\.apk\b/gi,
    ],
  },
  {
    id: 'menyamar',
    title: 'Mengaku dari bank atau instansi',
    why: 'Bank dan instansi resmi tidak meminta data atau uang lewat chat pribadi. Hubungi lewat kanal resmi.',
    weight: 2,
    patterns: [
      /\b(?:saya|kami|ini)\s+(?:dari|petugas|admin|pihak|tim)\s+(?:bank|bca|bri|bni|mandiri|bsi|ojk|polisi|kepolisian|kejaksaan|bpjs|kominfo|bea\s*cukai|pajak|kurir|jne|jnt|shopee|tokopedia|gojek|grab)\b/gi,
      kata('pihak bank', 'petugas bank', 'bea cukai'),
    ],
  },
  {
    id: 'rahasia',
    title: 'Disuruh merahasiakan',
    why: 'Penipu meminta korban diam supaya tidak ada yang sempat memperingatkan.',
    weight: 2,
    patterns: [
      kata(
        'rahasiakan',
        'jangan beri tahu',
        'jangan kasih tahu',
        'jangan bilang',
        'jangan cerita',
        'jangan diceritakan',
        'hanya antara kita',
      ),
    ],
  },
  {
    id: 'atas-nama',
    title: 'Penerima dana atas nama orang',
    why: 'Rekening perusahaan resmi atas nama badan usaha, bukan nama orang. Cek di cekrekening.id.',
    weight: 1,
    patterns: [/\ba\.\s?n\.?\s+[a-z]+|\batas\s+nama\s+[a-z]+/gi],
  },
  {
    id: 'umpan-hadiah',
    title: 'Umpan “selamat, kamu terpilih”',
    why: 'Kemenangan atau kelolosan yang tiba-tiba, padahal kamu tidak ikut apa pun, adalah pembuka penipuan.',
    weight: 1,
    patterns: [
      /\bselamat\b[,!]?\s+(?:anda|kamu|kakak|kak|bapak|ibu|sdr)?\s*(?:telah\s+)?(?:menang|terpilih|mendapat(?:kan)?|lolos|dipilih|beruntung)\b/gi,
      kata(
        'kamu menang',
        'anda menang',
        'anda terpilih',
        'kamu terpilih',
        'pemenang undian',
        'hadiah gratis',
        'undian berhadiah',
        'anda beruntung',
      ),
    ],
  },
  {
    id: 'luar-negeri',
    title: 'Tawaran kerja di luar negeri',
    why: 'Loker luar negeri dipakai karena korban sulit mengecek kebenarannya. Cek lewat BP2MI atau kedutaan.',
    weight: 1,
    patterns: [
      /\b(?:kerja|bekerja|pekerjaan|lowongan|loker|karir|karier)\b[^.!?\n]{0,30}?\b(?:di|ke)\s+(?:amerika|usa|eropa|jepang|korea|taiwan|dubai|arab|qatar|kanada|australia|inggris|singapura|malaysia|luar\s+negeri)\b/gi,
    ],
  },
  {
    id: 'tekanan-waktu',
    title: 'Tekanan waktu',
    why: 'Batas waktu dipakai agar kamu tidak sempat berpikir atau bertanya.',
    weight: 1,
    patterns: [
      kata(
        'segera',
        'secepatnya',
        'buruan',
        'cepetan',
        'sekarang juga',
        'malam ini',
        'hari ini saja',
        'hanya hari ini',
        'kesempatan terakhir',
        'slot terbatas',
        'kuota terbatas',
        'stok terbatas',
        'waktu terbatas',
        'hangus',
        'kedaluwarsa',
        'expired',
        'batas waktu',
      ),
      /\bslot\s+tinggal\s+\d+/gi,
      /\b\d+\s+(?:menit|jam)\s+(?:lagi|terakhir)\b/gi,
      /\b(?:bayar|transfer|tf|trf|kirim|daftar|klaim|ambil)\w*\s+(?:\S+\s+){0,2}?hari\s+ini\b/gi,
    ],
  },
]

// Kombinasi tanda bahaya yang tampil sebagai peringatan khusus.
// needs = id aturan yang harus ditemukan semuanya.
export const COMBOS = [
  {
    id: 'loker-palsu',
    needs: ['imbalan-tidak-wajar', 'uang-di-muka'],
    message:
      'Pola khas loker palsu: janji gaji besar, lalu diminta membayar di awal. Perusahaan resmi tidak memungut biaya dari pelamar.',
  },
  {
    id: 'rekening-orang',
    needs: ['uang-di-muka', 'rekening-pribadi'],
    message:
      'Kamu diminta membayar ke rekening perorangan. Jangan transfer sebelum mengecek rekening itu di cekrekening.id.',
  },
  {
    id: 'phishing',
    needs: ['umpan-hadiah', 'tautan'],
    message: 'Hadiah ditambah tautan adalah pola phishing. Jangan klik dan jangan isi data apa pun.',
  },
  {
    id: 'investasi-bodong',
    needs: ['untung-pasti', 'tekanan-waktu'],
    message: 'Untung besar yang dibarengi tekanan waktu adalah pola investasi bodong.',
  },
]

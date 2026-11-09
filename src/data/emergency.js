// DATA HALAMAN BANTUAN ("Aku sudah kena tipu")

// Pilihan di pertanyaan 1. warningTopic dipakai mengisi {topic} di pesan peringatan.
export const INCIDENTS = [
  {
    id: 'link',
    wizardLabel: 'Saya klik link mencurigakan',
    title: 'klik link mencurigakan',
    warningTopic: 'tautan palsu',
    urgentSteps: [
      'Jangan isi data apa pun di halaman itu',
      'Tutup halaman dan hapus file atau aplikasi yang terunduh',
      'Ganti kata sandi akun penting',
    ],
    todaySteps: [
      'Pindai perangkat dengan antivirus',
      'Simpan tangkapan layar tautan',
      'Beri tahu keluarga terdekat',
    ],
  },
  {
    id: 'otp',
    wizardLabel: 'Saya memberikan kode OTP',
    title: 'kode OTP terlanjur diberikan',
    warningTopic: 'pencurian kode OTP',
    urgentSteps: [
      'Ganti kata sandi akun terkait',
      'Keluar dari semua perangkat',
      'Telepon call center resmi bank',
    ],
    todaySteps: ['Simpan tangkapan layar dan nomor rekening pelaku', 'Beri tahu keluarga terdekat'],
  },
  {
    id: 'transfer',
    wizardLabel: 'Saya transfer uang',
    title: 'terlanjur transfer uang',
    warningTopic: 'transfer ke rekening palsu',
    urgentSteps: [
      'Telepon call center resmi bank atau e-wallet, minta transaksi ditinjau',
      'Simpan bukti transfer',
      'Ganti PIN dan kata sandi',
    ],
    todaySteps: ['Simpan tangkapan layar chat dan nomor rekening pelaku', 'Beri tahu keluarga terdekat'],
  },
  {
    id: 'data',
    wizardLabel: 'Data pribadi saya bocor',
    title: 'data pribadi bocor',
    warningTopic: 'kebocoran data pribadi',
    urgentSteps: [
      'Ganti kata sandi akun yang datanya bocor',
      'Aktifkan verifikasi 2 langkah',
      'Pantau mutasi rekening',
    ],
    todaySteps: [
      'Kabari bank bila data finansial ikut bocor',
      'Waspadai telepon dan pesan yang mengaku dari instansi',
    ],
  },
  {
    id: 'hijack',
    wizardLabel: 'Akun saya dibajak',
    title: 'akun dibajak',
    warningTopic: 'akun dibajak',
    urgentSteps: [
      'Ganti kata sandi lewat fitur pemulihan akun',
      'Keluar dari semua perangkat',
      'Beri tahu teman bahwa akunmu dibajak',
    ],
    todaySteps: ['Periksa email dan nomor pemulihan', 'Simpan bukti dan laporkan ke platform'],
  },
]

// Pilihan di pertanyaan 2. firstStep = langkah tambahan khusus platform itu.
export const PLATFORMS = [
  {
    label: 'WhatsApp',
    firstStep: 'Aktifkan verifikasi 2 langkah dan periksa perangkat tertaut di WhatsApp',
  },
  {
    label: 'Instagram atau TikTok',
    firstStep: 'Cabut sesi login lain dan ganti sandi di Pengaturan keamanan',
  },
  {
    label: 'Bank atau e-wallet',
    firstStep: 'Blokir kartu atau akun lewat aplikasi atau call center resmi',
  },
  {
    label: 'Lainnya',
    firstStep: 'Periksa email pemulihan dan akun lain yang memakai sandi sama',
  },
]

// Nada pesan peringatan. {topic} diganti otomatis dengan warningTopic di atas.
export const WARNING_TONES = [
  {
    label: 'Santai',
    template:
      'Hati-hati ya, lagi marak {topic}. Ciri-cirinya: minta uang atau kode OTP, memaksa cepat, dan iming-iming besar. Jangan kasih OTP ke siapa pun!',
  },
  {
    label: 'Untuk orang tua',
    template:
      'Ibu/Bapak, mohon hati-hati. Sedang banyak {topic}. Kalau ada yang minta uang, kode OTP, atau mengaku dari bank, jangan dilayani. Telepon saya dulu ya sebelum melakukan apa pun.',
  },
  {
    label: 'Grup kelas',
    template:
      '[Info penting] Teman-teman, waspada {topic}. Jangan klik tautan asing, jangan bagikan OTP, dan cek dulu lewat kanal resmi. Kalau kena, lapor ke cekrekening.id atau OJK 157.',
  },
]

// Kanal lapor resmi. external: true = buka di tab baru.
export const REPORT_CHANNELS = [
  { label: 'cekrekening.id', href: 'https://cekrekening.id', external: true },
  { label: 'OJK 157', href: 'tel:157', external: false },
  { label: 'aduannomor.id', href: 'https://aduannomor.id', external: true },
]

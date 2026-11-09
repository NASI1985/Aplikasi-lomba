// DAFTAR SKENARIO LATIHAN (halaman Latihan)
//
// Cara menambah skenario baru: salin satu blok skenario di bawah, ganti isinya, lalu
// tempel di akhir daftar. Tidak perlu mengubah kode lain.
//
// Arti tiap bagian:
//   id          nama unik (huruf kecil, tanpa spasi); dipakai untuk menyimpan skor
//   title       judul kartu
//   description satu kalimat di bawah judul
//   sender      nama akun penipu di chat
//   badge       nama lencana kalau skornya bagus
//   steps       urutan pesan. Boleh 2, 3, 4, ... langkah.
//     messages       pesan dari penipu di langkah itu
//     options        pilihan balasan pemain. safe: true = pilihan aman
//     explanation    penjelasan yang tampil setelah memilih
//     missedFlags    tanda bahaya yang terlewat kalau memilih yang berisiko
//     scammerReply   balasan penipu kalau pemain memilih yang berisiko
export const SCENARIOS = [
  {
    id: 'loker',
    title: 'Loker Palsu',
    description: 'Admin online gaji tinggi, minta biaya pelatihan.',
    sender: 'HRD_Karir',
    badge: 'Anti-Loker Palsu',
    steps: [
      {
        messages: [
          'Hai! CV kamu lolos seleksi admin online WFH, gaji Rp8 juta. Tinggal bayar biaya pelatihan Rp150 ribu.',
          'Slot tinggal 2 orang, bayar hari ini ya!',
        ],
        options: [
          {
            text: 'Transfer biar dapat slot',
            safe: false,
          },
          {
            text: 'Minta alamat kantor dan cek di situs resmi',
            safe: true,
          },
          {
            text: 'Blokir dan laporkan',
            safe: true,
          },
        ],
        explanation:
          'Verifikasi dulu lewat kanal resmi menghentikan tekanan waktu. Tanda bahaya: biaya di muka dan batas waktu.',
        missedFlags: ['Biaya di muka', 'Tekanan waktu', 'Gaji tak masuk akal'],
        scammerReply: 'Sudah masuk! Sekarang kirim kode OTP untuk aktivasi akun pelatihan.',
      },
      {
        messages: [
          'Kami kerja online penuh, tidak ada kantor. Kirim foto KTP dan nomor rekening untuk kontrak ya.',
        ],
        options: [
          {
            text: 'Kirim foto KTP dan rekening',
            safe: false,
          },
          {
            text: 'Minta kontrak resmi dan legalitas perusahaan',
            safe: true,
          },
          {
            text: 'Tolak dan cari lowongan di situs resmi',
            safe: true,
          },
        ],
        explanation: 'Data KTP dan rekening hanya dibagikan setelah perusahaan terverifikasi.',
        missedFlags: ['Tanpa kantor yang jelas', 'Minta data sensitif'],
        scammerReply: 'Terima kasih. Data kamu sudah kami pakai untuk pendaftaran. Kirim kode OTP ya.',
      },
      {
        messages: ['Terakhir, kirim kode OTP yang masuk ke HP kamu untuk verifikasi.'],
        options: [
          {
            text: 'Kirim kode OTP',
            safe: false,
          },
          {
            text: 'Berhenti: OTP itu rahasia',
            safe: true,
          },
        ],
        explanation: 'OTP adalah kunci akunmu. Tidak ada perekrut resmi yang memintanya.',
        missedFlags: ['Minta kode OTP'],
        scammerReply: 'Akun WhatsApp dan e-walletmu sudah kami kuasai.',
      },
    ],
  },
  {
    id: 'giveaway',
    title: 'Giveaway Palsu',
    description: 'Akun brand minta isi data dan klik tautan.',
    sender: 'official.promo_id',
    badge: 'Anti-Giveaway Palsu',
    steps: [
      {
        messages: ['Selamat! Kamu menang giveaway HP terbaru 🎉 Klik bit.ly/hadiah-id untuk klaim.'],
        options: [
          {
            text: 'Klik tautannya sekarang',
            safe: false,
          },
          {
            text: 'Cek akun resmi brand: centang biru dan pengumuman',
            safe: true,
          },
          {
            text: 'Abaikan dan laporkan akun',
            safe: true,
          },
        ],
        explanation: 'Pemenang asli diumumkan di akun resmi bercentang, bukan lewat DM berisi tautan.',
        missedFlags: ['Tautan pendek tak jelas', 'Menang tanpa ikut', 'Akun tidak terverifikasi'],
        scammerReply: 'Isi nama, nomor HP, dan PIN e-wallet untuk klaim hadiah ya.',
      },
      {
        messages: ['Untuk ongkir, transfer Rp25.000 dulu. Hadiah dikirim hari ini.'],
        options: [
          {
            text: 'Transfer ongkir',
            safe: false,
          },
          {
            text: 'Tolak: hadiah asli tidak minta biaya di muka',
            safe: true,
          },
        ],
        explanation: 'Biaya di muka untuk hadiah adalah pola utama giveaway palsu.',
        missedFlags: ['Biaya di muka', 'Tekanan waktu'],
        scammerReply: 'Transfer diterima. Kirim juga kode verifikasi yang masuk.',
      },
      {
        messages: ['Klaim dalam 10 menit atau hadiah hangus!'],
        options: [
          {
            text: 'Buru-buru isi data',
            safe: false,
          },
          {
            text: 'Berhenti: tekanan waktu adalah tanda penipuan',
            safe: true,
          },
        ],
        explanation: 'Penipu menekan waktu supaya korban tidak sempat memeriksa.',
        missedFlags: ['Tekanan waktu'],
        scammerReply: 'Bagus! Sekarang data dan akunmu kami proses.',
      },
    ],
  },
  {
    id: 'teman',
    title: 'Teman Dibajak',
    description: '“Teman” minta pulsa darurat lewat chat.',
    sender: 'Dina (nomor baru)',
    badge: 'Anti-Bajak Akun',
    steps: [
      {
        messages: ['Hai, ini aku Dina, nomor lama hilang. Lagi darurat, bisa tolong beliin pulsa?'],
        options: [
          {
            text: 'Langsung kirim pulsa',
            safe: false,
          },
          {
            text: 'Telepon Dina di nomor lamanya untuk memastikan',
            safe: true,
          },
          {
            text: 'Tanya hal yang hanya Dina tahu',
            safe: true,
          },
        ],
        explanation: 'Pastikan identitas lewat jalur lain sebelum mengirim apa pun.',
        missedFlags: ['Nomor baru tiba-tiba', 'Minta uang darurat'],
        scammerReply: 'Makasih banget! Sekarang transfer Rp500 ribu lagi ya.',
      },
      {
        messages: [
          'Aku nggak bisa ditelepon, HP rusak. Transfer ke e-wallet ini aja Rp500 ribu, nanti kuganti.',
        ],
        options: [
          {
            text: 'Transfer sekarang',
            safe: false,
          },
          {
            text: 'Tolak sampai ada konfirmasi lewat telepon atau orang lain',
            safe: true,
          },
        ],
        explanation: 'Alasan tidak bisa ditelepon adalah ciri akun yang dibajak.',
        missedFlags: ['Menolak dihubungi', 'Rekening tak dikenal'],
        scammerReply: 'Cepat dong, ini mendesak sekali!',
      },
      {
        messages: ['Kirim kode yang masuk ke HP kamu ya, buat bantu aku masuk akun.'],
        options: [
          {
            text: 'Kirim kodenya',
            safe: false,
          },
          {
            text: 'Jangan kirim, lalu peringatkan teman lain',
            safe: true,
          },
        ],
        explanation: 'Kode itu untuk membobol akunmu sendiri. Jangan dibagikan.',
        missedFlags: ['Minta kode OTP'],
        scammerReply: 'Terima kasih! Sekarang akunmu juga pindah ke kami.',
      },
    ],
  },
  {
    id: 'pinjol',
    title: 'Pinjol Ilegal',
    description: 'Dana cepat dengan akses kontak dan galeri.',
    sender: 'Dana_Cepat',
    badge: 'Anti-Pinjol Ilegal',
    steps: [
      {
        messages: ['Butuh dana cepat? Cair Rp5 juta tanpa jaminan! Pasang aplikasi kami sekarang.'],
        options: [
          {
            text: 'Pasang aplikasinya',
            safe: false,
          },
          {
            text: 'Cek izin di OJK (157 atau ojk.go.id)',
            safe: true,
          },
          {
            text: 'Abaikan',
            safe: true,
          },
        ],
        explanation: 'Hanya pinjol berizin OJK yang aman. Cek daftarnya dulu.',
        missedFlags: ['Tidak ada izin OJK', 'Tekanan waktu'],
        scammerReply: 'Aplikasi terpasang. Silakan lanjut isi data.',
      },
      {
        messages: ['Izinkan akses kontak, galeri, dan lokasi agar pengajuan disetujui.'],
        options: [
          {
            text: 'Izinkan semua',
            safe: false,
          },
          {
            text: 'Tolak: pinjol resmi tidak butuh kontak dan galeri',
            safe: true,
          },
        ],
        explanation: 'Akses kontak dan galeri dipakai untuk meneror dan memeras.',
        missedFlags: ['Akses kontak dan galeri'],
        scammerReply: 'Semua kontakmu sudah tersimpan di server kami.',
      },
      {
        messages: ['Bunga 1% per hari. Telat bayar, kami hubungi semua kontakmu.'],
        options: [
          {
            text: 'Tetap lanjut pinjam',
            safe: false,
          },
          {
            text: 'Batalkan dan lapor ke OJK 157',
            safe: true,
          },
        ],
        explanation: 'Ancaman ke kontak adalah penagihan ilegal. Laporkan.',
        missedFlags: ['Bunga tak wajar', 'Ancaman ke kontak'],
        scammerReply: 'Tagihan membengkak. Kontakmu mulai dihubungi.',
      },
    ],
  },
  {
    id: 'paket',
    title: 'Paket Kurir Palsu',
    description: 'Diminta pasang file apk untuk lacak paket.',
    sender: 'Kurir_Express',
    badge: 'Anti-Paket Palsu',
    steps: [
      {
        messages: ['Paketmu gagal dikirim. Unduh resi-paket.apk untuk lacak paket.'],
        options: [
          {
            text: 'Unduh dan pasang apk',
            safe: false,
          },
          {
            text: 'Cek resi lewat aplikasi atau situs resmi kurir',
            safe: true,
          },
        ],
        explanation: 'Kurir resmi tidak mengirim file apk lewat chat.',
        missedFlags: ['File apk dari orang asing'],
        scammerReply: 'Aplikasi terpasang. Pesan dan SMS-mu kini bisa dibaca penipu.',
      },
      {
        messages: ['Isi data kartu untuk biaya kirim ulang Rp5.000.'],
        options: [
          {
            text: 'Isi data kartu',
            safe: false,
          },
          {
            text: 'Tolak: biaya kirim tidak dibayar lewat chat',
            safe: true,
          },
        ],
        explanation: 'Nominal kecil dipakai agar korban lengah.',
        missedFlags: ['Minta data kartu', 'Biaya di muka'],
        scammerReply: 'Data kartumu sudah kami pakai belanja.',
      },
      {
        messages: ['Paket kembali dalam 1 jam. Kirim kode OTP untuk konfirmasi.'],
        options: [
          {
            text: 'Kirim OTP',
            safe: false,
          },
          {
            text: 'Berhenti dan hubungi kurir lewat kanal resmi',
            safe: true,
          },
        ],
        explanation: 'OTP tidak pernah dibutuhkan untuk melacak paket.',
        missedFlags: ['Minta kode OTP', 'Tekanan waktu'],
        scammerReply: 'Saldo e-walletmu sudah kami pindahkan.',
      },
    ],
  },
  {
    id: 'investasi',
    title: 'Investasi Instan',
    description: 'Grup Telegram penuh testimoni profit.',
    sender: 'Grup_Cuan_VIP',
    badge: 'Anti-Investasi Bodong',
    steps: [
      {
        messages: ['Join grup kami! Member kemarin untung 30% dalam sehari. Modal mulai Rp500 ribu.'],
        options: [
          {
            text: 'Join dan setor modal',
            safe: false,
          },
          {
            text: 'Cek izin di OJK dan Satgas Waspada Investasi',
            safe: true,
          },
        ],
        explanation: 'Untung besar dan cepat tanpa risiko tidak masuk akal.',
        missedFlags: ['Untung tak masuk akal', 'Tanpa izin jelas'],
        scammerReply: 'Modal masuk! Tambah setoran biar jadi VIP.',
      },
      {
        messages: ['Testimoni ini asli semua! Slot VIP tutup malam ini.'],
        options: [
          {
            text: 'Percaya testimoni dan ikut',
            safe: false,
          },
          {
            text: 'Testimoni bisa dibuat-buat; cek legalitas dulu',
            safe: true,
          },
        ],
        explanation: 'Testimoni dan batas waktu adalah umpan klasik.',
        missedFlags: ['Testimoni palsu', 'Tekanan waktu'],
        scammerReply: 'Setoran kedua diterima. Profitmu tampil di aplikasi kami.',
      },
      {
        messages: ['Mau tarik dana? Setor pajak 10% dulu.'],
        options: [
          {
            text: 'Setor pajak',
            safe: false,
          },
          {
            text: 'Berhenti setor, simpan bukti, laporkan',
            safe: true,
          },
        ],
        explanation: 'Biaya untuk menarik dana adalah tanda investasi bodong.',
        missedFlags: ['Biaya penarikan palsu'],
        scammerReply: 'Dana tidak bisa ditarik. Setor lagi untuk membuka kunci.',
      },
    ],
  },
]

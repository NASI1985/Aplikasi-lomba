// CHECKLIST KESIAPAN KEAMANAN AKUN (halaman Bantuan)
// id harus unik dan jangan diubah setelah dipakai, karena dipakai untuk menyimpan centang.
export const SECURITY_CHECKLIST = [
  {
    id: 'twoFactor',
    label: 'Verifikasi 2 langkah aktif',
    howTo: 'Buka Pengaturan akun, pilih Keamanan, lalu aktifkan verifikasi 2 langkah.',
  },
  {
    id: 'uniquePasswords',
    label: 'Kata sandi unik tiap akun',
    howTo: 'Pakai pengelola kata sandi dan buat sandi berbeda untuk setiap akun.',
  },
  {
    id: 'hidePhone',
    label: 'Nomor HP tidak tampil publik',
    howTo: 'Di pengaturan privasi, ubah siapa yang bisa melihat nomor HP menjadi “Hanya saya”.',
  },
  {
    id: 'lockProfile',
    label: 'Profil dikunci atau privat',
    howTo: 'Di pengaturan privasi, kunci profil atau ubah menjadi privat.',
  },
  {
    id: 'appPermissions',
    label: 'Izin aplikasi sudah ditinjau',
    howTo: 'Buka pengaturan aplikasi di HP, cabut izin kontak, galeri, dan lokasi yang tidak perlu.',
  },
  {
    id: 'removeDevices',
    label: 'Perangkat tak dikenal sudah dikeluarkan',
    howTo: 'Buka daftar perangkat login di akunmu, lalu keluarkan perangkat yang tidak dikenal.',
  },
]

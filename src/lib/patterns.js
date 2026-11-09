// Alat bantu untuk menulis aturan deteksi tanpa perlu paham regex.
//
// kata('tf', 'transfer', 'biaya admin')
//   -> mencocokkan salah satu kata/frasa itu, tidak peduli huruf besar-kecil,
//      dan hanya kalau berdiri sendiri (tidak di tengah kata lain).
//   -> spasi di frasa cocok dengan spasi berapa pun ("biaya   admin" tetap kena).

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export function kata(...phrases) {
  const body = [...phrases]
    .sort((a, b) => b.length - a.length) // frasa panjang dicoba dulu
    .map((p) => escapeRegex(p).replace(/ /g, '\\s+'))
    .join('|')
  return new RegExp(`\\b(?:${body})\\b`, 'gi')
}

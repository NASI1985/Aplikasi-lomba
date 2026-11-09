// Aturan skor dan level di halaman Latihan.
export const BADGE_MIN_SCORE = 67 // skor minimal (%) untuk mendapat lencana

export const calcScore = (safeCount, totalSteps) => Math.round((safeCount / totalSteps) * 100)

export function levelFromScore(score) {
  if (score >= 100) return 'Siaga'
  if (score >= BADGE_MIN_SCORE) return 'Waspada'
  return 'Rawan'
}

// Level pemain berdasarkan jumlah skenario yang sudah diselesaikan.
export function playerLevel(doneCount, totalScenarios) {
  if (doneCount >= totalScenarios) return 'Guardian'
  if (doneCount >= Math.ceil(totalScenarios / 2)) return 'Siaga'
  return 'Pemula'
}

export const countBadges = (progress) => Object.values(progress).filter((s) => s >= BADGE_MIN_SCORE).length

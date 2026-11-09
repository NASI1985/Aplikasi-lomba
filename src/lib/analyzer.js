// MESIN PENGECEKAN: menerima teks, mengembalikan hasil analisis.
// Fungsi di sini "murni" (tidak menyentuh tampilan), jadi mudah diuji lewat `npm test`.
import { RULES, COMBOS } from '../data/detectionRules.js'

export const LEVEL_LABELS = { rendah: 'Rendah', sedang: 'Sedang', tinggi: 'Tinggi' }

const levelFor = (score) => (score >= 3 ? 'tinggi' : score >= 1 ? 'sedang' : 'rendah')

/**
 * @returns {{
 *   segments: {text: string, weight: number}[],  // teks dipecah; weight > 0 = disorot
 *   findings: {rule: object, matches: string[]}[], // aturan yang ditemukan, terkuat dulu
 *   combos: {id: string, message: string}[],      // peringatan kombinasi
 *   score: number,
 *   level: 'rendah' | 'sedang' | 'tinggi',
 * }}
 */
export function analyze(text) {
  const hits = findHits(text)
  const findings = summarizeByRule(hits)
  const score = findings.reduce((sum, f) => sum + f.rule.weight, 0)
  return {
    segments: buildSegments(text, hits),
    findings,
    combos: findCombos(findings),
    score,
    level: levelFor(score),
  }
}

// Langkah 1: cari semua potongan teks yang cocok dengan pola aturan mana pun.
function findHits(text) {
  const hits = []
  for (const rule of RULES) {
    for (const pattern of rule.patterns) {
      // matchAll wajib memakai flag "g"; kita tambahkan otomatis kalau lupa ditulis.
      const regex = pattern.global ? pattern : new RegExp(pattern.source, pattern.flags + 'g')
      for (const m of text.matchAll(regex)) {
        if (m[0].trim() === '') continue
        hits.push({ rule, start: m.index, end: m.index + m[0].length, text: m[0] })
      }
    }
  }
  return hits
}

// Langkah 2: kelompokkan per aturan (satu aturan = satu temuan, maksimal 3 contoh kalimat).
function summarizeByRule(hits) {
  const byRule = new Map()
  for (const h of hits) {
    if (!byRule.has(h.rule.id)) byRule.set(h.rule.id, { rule: h.rule, matches: [] })
    const entry = byRule.get(h.rule.id)
    const phrase = h.text.trim()
    const seen = entry.matches.some((x) => x.toLowerCase() === phrase.toLowerCase())
    if (!seen && entry.matches.length < 3) entry.matches.push(phrase)
  }
  return [...byRule.values()].sort((a, b) => b.rule.weight - a.rule.weight)
}

// Langkah 3: pecah teks jadi potongan untuk disorot. Kalau dua temuan bertumpuk,
// yang bobotnya lebih besar (lalu yang lebih panjang) menang.
function buildSegments(text, hits) {
  const byPriority = [...hits].sort(
    (a, b) => b.rule.weight - a.rule.weight || b.end - b.start - (a.end - a.start) || a.start - b.start,
  )
  const chosen = []
  for (const h of byPriority) {
    if (!chosen.some((c) => h.start < c.end && h.end > c.start)) chosen.push(h)
  }
  chosen.sort((a, b) => a.start - b.start)

  const segments = []
  let cursor = 0
  for (const h of chosen) {
    if (h.start > cursor) segments.push({ text: text.slice(cursor, h.start), weight: 0 })
    segments.push({ text: text.slice(h.start, h.end), weight: h.rule.weight })
    cursor = h.end
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor), weight: 0 })
  return segments
}

function findCombos(findings) {
  const found = new Set(findings.map((f) => f.rule.id))
  return COMBOS.filter((c) => c.needs.every((id) => found.has(id)))
}

import { useState, useEffect } from 'react'

// Seperti useState, tetapi nilainya disimpan di localStorage browser.
// Aman dipakai walau localStorage diblokir atau isinya rusak.
export default function usePersistedState(key, initialValue) {
  const [value, setValue] = useState(() => readFromStorage(key, initialValue))
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage tidak tersedia: abaikan */
    }
  }, [key, value])
  return [value, setValue]
}

function readFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return fallback
    const parsed = JSON.parse(raw)
    // Pakai nilai tersimpan hanya kalau bentuknya sama (objek vs array vs angka, dst.)
    const sameShape =
      parsed !== null &&
      typeof parsed === typeof fallback &&
      Array.isArray(parsed) === Array.isArray(fallback)
    return sameShape ? parsed : fallback
  } catch {
    return fallback
  }
}

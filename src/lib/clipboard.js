// Menyalin teks ke clipboard dan memberi tahu pengguna lewat toast.
export async function copyText(text, showToast) {
  try {
    await navigator.clipboard.writeText(text)
    showToast('Tersalin')
  } catch {
    showToast('Gagal menyalin. Salin manual ya.')
  }
}

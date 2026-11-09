import { useState, useEffect } from 'react'

const readHash = () => (window.location.hash || '#beranda').slice(1)

// Router paling sederhana: halaman ditentukan oleh bagian setelah "#" di URL,
// misalnya  /#cek  atau  /#latih. Tidak perlu library tambahan.
export default function useHashRoute() {
  const [route, setRoute] = useState(readHash)
  useEffect(() => {
    const onChange = () => {
      setRoute(readHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

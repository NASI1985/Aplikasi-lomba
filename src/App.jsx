import { useState, useCallback } from 'react'
import useHashRoute from './hooks/useHashRoute.js'
import { ToastProvider } from './components/Toast.jsx'
import Beranda from './pages/Beranda.jsx'
import CekDulu from './pages/CekDulu/index.jsx'
import Latihan from './pages/Latihan/index.jsx'
import Bantuan from './pages/Bantuan/index.jsx'
import Tentang from './pages/Tentang.jsx'

// Menu di header. path = bagian setelah "#" di alamat halaman.
const NAV_ITEMS = [
  { path: 'cek', label: 'Cek Dulu' },
  { path: 'latih', label: 'Latihan' },
  { path: 'bantuan', label: 'Bantuan' },
  { path: 'tentang', label: 'Tentang' },
]

export default function App() {
  const hash = useHashRoute()
  const known = ['beranda', ...NAV_ITEMS.map((item) => item.path)]
  const route = known.includes(hash) ? hash : 'beranda'

  // "Aku sudah transfer" di Cek Dulu membuka Bantuan dengan pilihan awal yang sudah terisi.
  const [helpPreset, setHelpPreset] = useState(null)
  const clearHelpPreset = useCallback(() => setHelpPreset(null), [])

  return (
    <ToastProvider>
      <header>
        <a className="logo" href="#beranda">
          Siaga<b>Digital</b>
        </a>
        <nav>
          {NAV_ITEMS.map((item) => (
            <a key={item.path} href={'#' + item.path} className={route === item.path ? 'active' : ''}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <main>
        {route === 'beranda' && <Beranda />}
        {route === 'cek' && <CekDulu onNeedHelp={() => setHelpPreset('transfer')} />}
        {route === 'latih' && <Latihan />}
        {route === 'bantuan' && <Bantuan initialIncidentId={helpPreset} onPresetUsed={clearHelpPreset} />}
        {route === 'tentang' && <Tentang />}
      </main>
    </ToastProvider>
  )
}

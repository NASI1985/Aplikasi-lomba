import { createContext, useContext, useState, useRef, useCallback } from 'react'

// Pesan singkat di bawah layar. Pakai di halaman mana pun:
//   const showToast = useToast()
//   showToast('Tersalin')
const ToastContext = createContext(() => {})
export const useToast = () => useContext(ToastContext)

export function ToastProvider({ children }) {
  const [message, setMessage] = useState('')
  const timer = useRef(null)
  const showToast = useCallback((text) => {
    setMessage(text)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMessage(''), 2000)
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className={'toast' + (message ? ' show' : '')} role="status">
        {message}
      </div>
    </ToastContext.Provider>
  )
}

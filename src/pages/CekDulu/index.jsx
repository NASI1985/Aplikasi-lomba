import { useState } from 'react'
import { useToast } from '../../components/Toast.jsx'
import { analyze } from '../../lib/analyzer.js'
import InputStep from './InputStep.jsx'
import ResultStep from './ResultStep.jsx'

// Halaman "Cek Dulu": form input -> hasil analisis.
export default function CekDulu({ onNeedHelp }) {
  const showToast = useToast()
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [text, setText] = useState('')
  const [result, setResult] = useState(null) // null = masih di form input

  const handleCheck = () => {
    if (!text.trim()) {
      showToast('Tempel teksnya dulu ya')
      return
    }
    setResult(analyze(text))
  }

  if (result) {
    return (
      <ResultStep
        categoryIndex={categoryIndex}
        result={result}
        onEdit={() => setResult(null)}
        onNeedHelp={onNeedHelp}
      />
    )
  }
  return (
    <InputStep
      categoryIndex={categoryIndex}
      onCategoryChange={setCategoryIndex}
      text={text}
      onTextChange={setText}
      onCheck={handleCheck}
    />
  )
}

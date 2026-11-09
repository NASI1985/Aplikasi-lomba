import { useReducer } from 'react'
import usePersistedState from '../../hooks/usePersistedState.js'
import { calcScore } from '../../lib/practice.js'
import ScenarioList from './ScenarioList.jsx'
import ChatPanel from './ChatPanel.jsx'
import ReplyPanel from './ReplyPanel.jsx'
import FinalResult from './FinalResult.jsx'
import { practiceReducer } from './practiceReducer.js'

// Halaman "Latihan": daftar skenario -> chat simulasi -> hasil akhir.
export default function Latihan() {
  const [run, dispatch] = useReducer(practiceReducer, null)
  // progress: { idSkenario: skorPersen }, tersimpan di browser
  const [progress, setProgress] = usePersistedState('siagadigital:progress', {})

  const finishRun = () => {
    const score = calcScore(run.safeCount, run.scenario.steps.length)
    setProgress((p) => ({ ...p, [run.scenario.id]: score }))
    dispatch({ type: 'finish' })
  }

  if (!run)
    return <ScenarioList progress={progress} onStart={(scenario) => dispatch({ type: 'start', scenario })} />
  if (run.finished)
    return <FinalResult run={run} progress={progress} onExit={() => dispatch({ type: 'exit' })} />

  return (
    <div className="grid-2">
      <ChatPanel run={run} />
      <ReplyPanel
        run={run}
        onPick={(optionIndex) => dispatch({ type: 'pick', optionIndex })}
        onNext={() => dispatch({ type: 'next' })}
        onRetry={() => dispatch({ type: 'retry' })}
        onFinish={finishRun}
      />
    </div>
  )
}

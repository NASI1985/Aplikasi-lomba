// MESIN STATUS LATIHAN
// State bernilai null saat pemain masih di daftar skenario. Saat bermain, bentuknya:
//   { scenario, stepIndex, selected, safeCount, missedFlags, chat, finished }
//     selected = nomor pilihan yang diklik di langkah ini (null = belum memilih)
//     chat     = riwayat chat: [{ from: 'scammer' | 'me', text }]
//
// Aksi: start, pick, next, retry, finish, exit

const scammerMessages = (messages) => messages.map((text) => ({ from: 'scammer', text }))

function startRun(scenario) {
  return {
    scenario,
    stepIndex: 0,
    selected: null,
    safeCount: 0,
    missedFlags: [],
    chat: scammerMessages(scenario.steps[0].messages),
    finished: false,
  }
}

export function practiceReducer(state, action) {
  switch (action.type) {
    case 'start':
      return startRun(action.scenario)
    case 'retry':
      return startRun(state.scenario)
    case 'exit':
      return null
    case 'finish':
      return { ...state, finished: true }

    case 'pick': {
      if (state.selected !== null) return state // sudah memilih di langkah ini
      const step = currentStep(state)
      const option = step.options[action.optionIndex]
      return {
        ...state,
        selected: action.optionIndex,
        safeCount: state.safeCount + (option.safe ? 1 : 0),
        missedFlags: option.safe ? state.missedFlags : step.missedFlags,
        chat: [
          ...state.chat,
          { from: 'me', text: option.text },
          ...(option.safe ? [] : scammerMessages([step.scammerReply])),
        ],
      }
    }

    case 'next': {
      const nextIndex = state.stepIndex + 1
      return {
        ...state,
        stepIndex: nextIndex,
        selected: null,
        chat: [...state.chat, ...scammerMessages(state.scenario.steps[nextIndex].messages)],
      }
    }

    default:
      return state
  }
}

// Fungsi bantu agar komponen tidak perlu menghitung sendiri
export const currentStep = (run) => run.scenario.steps[run.stepIndex]
export const isLastStep = (run) => run.stepIndex === run.scenario.steps.length - 1
export const isRisky = (run) => run.selected !== null && !currentStep(run).options[run.selected].safe

import test from 'node:test'
import assert from 'node:assert/strict'
import { practiceReducer, isRisky, isLastStep } from './practiceReducer.js'
import { SCENARIOS } from '../../data/scenarios.js'

const run = (actions) => actions.reduce(practiceReducer, null)

test('semua skenario punya data lengkap', () => {
  for (const s of SCENARIOS) {
    assert.ok(s.id && s.title && s.sender && s.badge, s.id)
    for (const step of s.steps) {
      assert.ok(
        step.messages.length > 0 && step.options.some((o) => o.safe) && step.options.some((o) => !o.safe),
        s.id,
      )
      assert.ok(step.explanation && step.missedFlags.length && step.scammerReply, s.id)
    }
  }
})

test('jalur aman semua: skor penuh', () => {
  const s = SCENARIOS[0]
  let state = practiceReducer(null, { type: 'start', scenario: s })
  s.steps.forEach((step, i) => {
    state = practiceReducer(state, { type: 'pick', optionIndex: step.options.findIndex((o) => o.safe) })
    assert.equal(isRisky(state), false)
    if (i < s.steps.length - 1) state = practiceReducer(state, { type: 'next' })
  })
  assert.equal(state.safeCount, s.steps.length)
  assert.equal(isLastStep(state), true)
})

test('pilihan berisiko menyimpan tanda bahaya dan balasan penipu', () => {
  const s = SCENARIOS[0]
  const state = run([
    { type: 'start', scenario: s },
    { type: 'pick', optionIndex: 0 },
  ])
  assert.equal(isRisky(state), true)
  assert.deepEqual(state.missedFlags, s.steps[0].missedFlags)
  assert.equal(state.chat.at(-1).text, s.steps[0].scammerReply)
})

test('memilih dua kali di langkah yang sama tidak menambah skor', () => {
  const s = SCENARIOS[0]
  const safe = s.steps[0].options.findIndex((o) => o.safe)
  const state = run([
    { type: 'start', scenario: s },
    { type: 'pick', optionIndex: safe },
    { type: 'pick', optionIndex: safe },
  ])
  assert.equal(state.safeCount, 1)
})

// Synthesized sound effects using Web Audio API
let soundEnabled = true
let audioCtx = null

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioCtx
}

function playTone(frequency, duration, type = 'sine', volume = 0.3, startDelay = 0) {
  if (!soundEnabled) return
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = type
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + startDelay)
    gain.gain.setValueAtTime(volume, ctx.currentTime + startDelay)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startDelay + duration)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(ctx.currentTime + startDelay)
    osc.stop(ctx.currentTime + startDelay + duration)
  } catch {
    // Audio not available
  }
}

/** Bright ascending 2-note chime for correct answer */
export function playCorrect() {
  if (!soundEnabled) return
  playTone(523, 0.15, 'sine', 0.25, 0)     // C5
  playTone(784, 0.25, 'sine', 0.25, 0.1)    // G5
}

/** Low short buzz for wrong answer */
export function playWrong() {
  if (!soundEnabled) return
  playTone(180, 0.15, 'square', 0.15, 0)
  playTone(150, 0.2, 'square', 0.12, 0.1)
}

/** Medal sound: bronze=simple ding, silver=double ding, gold=triumphant 3-note fanfare */
export function playMedal(type) {
  if (!soundEnabled) return
  switch (type) {
    case 'bronze':
      playTone(659, 0.4, 'sine', 0.3, 0)      // E5
      break
    case 'silver':
      playTone(659, 0.25, 'sine', 0.3, 0)      // E5
      playTone(880, 0.35, 'sine', 0.3, 0.2)    // A5
      break
    case 'gold':
      playTone(523, 0.2, 'sine', 0.3, 0)       // C5
      playTone(659, 0.2, 'sine', 0.35, 0.2)    // E5
      playTone(1047, 0.6, 'sine', 0.4, 0.4)    // C6
      break
    default:
      break
  }
}

/** Victory fanfare for level completion */
export function playLevelComplete() {
  if (!soundEnabled) return
  playTone(392, 0.15, 'sine', 0.25, 0)       // G4
  playTone(523, 0.15, 'sine', 0.25, 0.15)    // C5
  playTone(659, 0.15, 'sine', 0.3, 0.3)      // E5
  playTone(784, 0.2, 'sine', 0.3, 0.45)      // G5
  playTone(1047, 0.5, 'triangle', 0.35, 0.6) // C6
}

/** Global mute toggle */
export function setSoundEnabled(enabled) {
  soundEnabled = enabled
}

export function isSoundEnabled() {
  return soundEnabled
}

import { useState, useCallback, useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import { speak } from '../../data/languageResources'

// OpenDyslexic font loader (shared pattern)
let dyslexicFontLoaded = false
function loadDyslexicFont() {
  if (dyslexicFontLoaded) return
  dyslexicFontLoaded = true
  const link = document.createElement('link')
  link.href = 'https://fonts.cdnfonts.com/css/opendyslexic'
  link.rel = 'stylesheet'
  document.head.appendChild(link)
}

function hasSpeechRecognition() {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition)
}

export default function SpeakingGame({ exercise, theme, onComplete, accessibility }) {
  const isMinecraft = theme === 'minecraft'
  const a11y = accessibility || {}
  const hasA11y = a11y.enabled && a11y.profiles?.length > 0

  const words = exercise.words || []
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recognizing, setRecognizing] = useState(false)
  const [recognizedText, setRecognizedText] = useState('')
  const [matchResult, setMatchResult] = useState(null) // 'match' | 'no-match' | null
  const [done, setDone] = useState(false)
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (hasA11y && a11y.adaptedFont) loadDyslexicFont()
  }, [hasA11y, a11y.adaptedFont])

  // Cleanup speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      window.speechSynthesis?.cancel()
    }
  }, [])

  const baseFont = (hasA11y && a11y.adaptedFont)
    ? "'OpenDyslexic', 'Quicksand', sans-serif"
    : "'Quicksand', sans-serif"
  const lineHeight = (hasA11y && a11y.lineSpacing) ? '2.2' : '1.6'
  const letterSpacing = (hasA11y && a11y.lineSpacing) ? '0.12em' : 'normal'

  const handleListen = useCallback(() => {
    setIsPlaying(true)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utter = new SpeechSynthesisUtterance(words[currentIdx])
      utter.lang = exercise.audioLang || 'en-US'
      utter.rate = 0.8
      utter.onend = () => setIsPlaying(false)
      utter.onerror = () => setIsPlaying(false)
      const voices = window.speechSynthesis.getVoices()
      const lang = (exercise.audioLang || 'en-US').split('-')[0]
      const native = voices.find(v => v.lang.startsWith(lang) && v.localService)
      if (native) utter.voice = native
      window.speechSynthesis.speak(utter)
    } else {
      setIsPlaying(false)
    }
  }, [currentIdx, words, exercise.audioLang])

  const tryRecognize = useCallback(() => {
    if (!hasSpeechRecognition()) return
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRec()
    recognitionRef.current = recognition
    recognition.lang = exercise.audioLang || 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 3

    setRecognizing(true)
    setRecognizedText('')
    setMatchResult(null)

    recognition.onresult = (event) => {
      const results = Array.from(event.results[0])
      const transcripts = results.map(r => r.transcript.toLowerCase().trim())
      const target = words[currentIdx].toLowerCase().trim()
      setRecognizedText(transcripts[0] || '')
      const matched = transcripts.some(t => t.includes(target) || target.includes(t))
      setMatchResult(matched ? 'match' : 'no-match')
    }

    recognition.onerror = () => {
      setRecognizing(false)
      setMatchResult(null)
    }

    recognition.onend = () => {
      setRecognizing(false)
    }

    recognition.start()
  }, [currentIdx, words, exercise.audioLang])

  const advance = useCallback(() => {
    setRecognizedText('')
    setMatchResult(null)
    if (currentIdx + 1 < words.length) {
      setCurrentIdx(currentIdx + 1)
    } else {
      setDone(true)
      if (!(hasA11y && a11y.noConfetti)) {
        confetti({
          particleCount: (hasA11y && a11y.reduceAnimations) ? 20 : (isMinecraft ? 50 : 100),
          spread: isMinecraft ? 45 : 70,
          origin: { y: 0.6 },
          colors: isMinecraft
            ? ['#4CAF50', '#FFD700', '#8B4513']
            : ['#FF69B4', '#9B59B6', '#5DADE2', '#FFD700'],
        })
      }
      setTimeout(() => onComplete(exercise.id, exercise.xp), 1200)
    }
  }, [currentIdx, words, exercise, onComplete, isMinecraft, hasA11y, a11y])

  const cardStyle = {
    padding: 'clamp(22px, 2.8vw, 45px)',
    borderRadius: '20px',
    background: isMinecraft ? 'rgba(20, 20, 30, 0.8)' : 'rgba(255,255,255,0.95)',
    border: isMinecraft
      ? ((hasA11y && a11y.highContrast) ? '2px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.08)')
      : ((hasA11y && a11y.highContrast) ? '3px solid #9B59B6' : '2px solid rgba(155,89,182,0.15)'),
    boxShadow: isMinecraft
      ? '0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)'
      : '0 4px 20px rgba(0,0,0,0.08)',
    backdropFilter: 'blur(8px)',
    maxWidth: '900px',
    width: '100%',
    fontFamily: baseFont,
    lineHeight,
    letterSpacing,
    textAlign: 'center',
  }

  const btnBase = {
    padding: '14px 28px',
    borderRadius: '15px',
    border: 'none',
    fontFamily: baseFont,
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: 'clamp(1rem, 1.3vw, 1.4rem)',
    transition: (hasA11y && a11y.reduceAnimations) ? 'none' : 'all 0.2s ease',
  }

  const progress = words.length > 0 ? (currentIdx / words.length) * 100 : 0

  return (
    <div style={cardStyle}>
      {/* Title */}
      <div style={{
        fontSize: 'clamp(1.1rem, 1.5vw, 1.9rem)',
        fontWeight: '700',
        color: isMinecraft ? '#FFD700' : '#333',
        marginBottom: '20px',
      }}>
        {isMinecraft ? '> ' : ''}{exercise.question}
      </div>

      {/* Progress bar */}
      <div style={{
        width: '100%',
        height: '8px',
        borderRadius: '4px',
        background: isMinecraft ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        marginBottom: '24px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: done ? '100%' : `${progress}%`,
          height: '100%',
          borderRadius: '4px',
          background: isMinecraft
            ? 'linear-gradient(90deg, #4CAF50, #FFD700)'
            : 'linear-gradient(90deg, #9B59B6, #5DADE2)',
          transition: 'width 0.4s ease',
        }} />
      </div>

      {!done && (
        <>
          {/* Current word */}
          <div style={{
            fontSize: 'clamp(1.8rem, 2.5vw, 3rem)',
            fontWeight: '800',
            color: isMinecraft ? '#fff' : '#9B59B6',
            margin: '20px 0',
            letterSpacing: '0.05em',
          }}>
            {words[currentIdx]}
          </div>

          {/* Word counter */}
          <div style={{
            fontSize: 'clamp(0.8rem, 1vw, 1rem)',
            color: isMinecraft ? 'rgba(255,255,255,0.5)' : '#999',
            marginBottom: '20px',
          }}>
            {currentIdx + 1} / {words.length}
          </div>

          {/* Buttons row */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Listen button */}
            <button
              style={{
                ...btnBase,
                background: isMinecraft
                  ? 'linear-gradient(135deg, #1565C0, #42A5F5)'
                  : 'linear-gradient(135deg, #5DADE2, #3498DB)',
                color: 'white',
                opacity: isPlaying ? 0.7 : 1,
              }}
              onClick={handleListen}
              disabled={isPlaying}
            >
              {isPlaying ? 'En cours...' : 'Ecouter'}
            </button>

            {/* Optional: speech recognition button */}
            {hasSpeechRecognition() && (
              <button
                style={{
                  ...btnBase,
                  background: recognizing
                    ? (isMinecraft ? '#B71C1C' : '#E74C3C')
                    : (isMinecraft
                      ? 'linear-gradient(135deg, #E65100, #FF9800)'
                      : 'linear-gradient(135deg, #E67E22, #F39C12)'),
                  color: 'white',
                }}
                onClick={tryRecognize}
                disabled={recognizing}
              >
                {recognizing ? 'Ecoute...' : 'Essayer de dire'}
              </button>
            )}

            {/* Honor system advance button */}
            <button
              style={{
                ...btnBase,
                background: isMinecraft
                  ? 'linear-gradient(135deg, #2E7D32, #4CAF50)'
                  : 'linear-gradient(135deg, #2ECC71, #27AE60)',
                color: 'white',
              }}
              onClick={advance}
            >
              {isMinecraft ? 'SUIVANT >' : 'Je l\'ai dit !'}
            </button>
          </div>

          {/* Speech recognition feedback */}
          {recognizedText && (
            <div style={{
              marginTop: '16px',
              padding: '10px 16px',
              borderRadius: '12px',
              background: matchResult === 'match'
                ? (isMinecraft ? 'rgba(46,125,50,0.3)' : 'rgba(46,204,113,0.15)')
                : (isMinecraft ? 'rgba(183,28,28,0.2)' : 'rgba(231,76,60,0.1)'),
              color: matchResult === 'match'
                ? (isMinecraft ? '#7CFC00' : '#27AE60')
                : (isMinecraft ? '#FF6B6B' : '#E74C3C'),
              fontWeight: '600',
              fontSize: 'clamp(0.9rem, 1.1vw, 1.2rem)',
            }}>
              {matchResult === 'match'
                ? (isMinecraft ? 'GG ! Bien prononce !' : 'Bien prononce !')
                : `Entendu : "${recognizedText}" - Reessaie !`
              }
            </div>
          )}
        </>
      )}

      {/* Success screen */}
      {done && (
        <div style={{
          marginTop: '20px',
          padding: '16px 24px',
          borderRadius: '15px',
          background: isMinecraft ? 'rgba(46,125,50,0.3)' : 'rgba(46,204,113,0.15)',
          fontWeight: '700',
          fontSize: 'clamp(1.1rem, 1.4vw, 1.6rem)',
          color: isMinecraft ? '#7CFC00' : '#27AE60',
        }}>
          {isMinecraft
            ? `+${exercise.xp} XP ! TOUS LES MOTS PRONONCES !`
            : `Bravo ! Tous les mots prononces ! +${exercise.xp} XP`
          }
        </div>
      )}

      {/* XP badge */}
      <div style={{
        marginTop: '12px',
        textAlign: 'right',
        fontSize: 'clamp(0.85rem, 1vw, 1.2rem)',
        color: isMinecraft ? '#FFD700' : '#E67E22',
        fontWeight: '600',
      }}>
        {isMinecraft ? `[${exercise.xp} XP]` : `${exercise.xp} XP`}
      </div>
    </div>
  )
}

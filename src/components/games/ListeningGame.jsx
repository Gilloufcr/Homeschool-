import { useState, useCallback, useEffect } from 'react'
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

export default function ListeningGame({ exercise, theme, onComplete, accessibility }) {
  const isMinecraft = theme === 'minecraft'
  const a11y = accessibility || {}
  const hasA11y = a11y.enabled && a11y.profiles?.length > 0

  const questions = exercise.questions || []
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [hasListened, setHasListened] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (hasA11y && a11y.adaptedFont) loadDyslexicFont()
  }, [hasA11y, a11y.adaptedFont])

  const baseFont = (hasA11y && a11y.adaptedFont)
    ? "'OpenDyslexic', 'Quicksand', sans-serif"
    : "'Quicksand', sans-serif"
  const lineHeight = (hasA11y && a11y.lineSpacing) ? '2.2' : '1.6'
  const letterSpacing = (hasA11y && a11y.lineSpacing) ? '0.12em' : 'normal'

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utter = new SpeechSynthesisUtterance(exercise.audioText)
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
    setHasListened(true)
  }, [exercise.audioText, exercise.audioLang])

  const handleAnswer = useCallback((option) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(option)
    const correct = option === questions[currentQ].answer
    const newAnswers = [...answers, { option, correct }]
    setAnswers(newAnswers)

    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1)
        setSelectedAnswer(null)
      } else {
        // All questions answered
        setDone(true)
        const allCorrect = newAnswers.every(a => a.correct)
        const correctCount = newAnswers.filter(a => a.correct).length
        if (allCorrect) {
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
        } else if (correctCount > 0) {
          const partial = Math.round(exercise.xp * correctCount / questions.length)
          setTimeout(() => onComplete(exercise.id, partial), 1200)
        }
      }
    }, 1000)
  }, [selectedAnswer, currentQ, questions, answers, exercise, onComplete, isMinecraft, hasA11y, a11y])

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

  const playBtnStyle = {
    ...btnBase,
    background: isMinecraft
      ? 'linear-gradient(135deg, #2E7D32, #4CAF50)'
      : 'linear-gradient(135deg, #5DADE2, #3498DB)',
    color: 'white',
    fontSize: 'clamp(1.2rem, 1.6vw, 1.8rem)',
    padding: '18px 40px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '20px auto',
    opacity: isPlaying ? 0.7 : 1,
  }

  const q = questions[currentQ]
  const showDyslexicText = hasA11y && a11y.adaptedFont

  return (
    <div style={cardStyle}>
      {/* Title */}
      <div style={{
        fontSize: 'clamp(1.1rem, 1.5vw, 1.9rem)',
        fontWeight: '700',
        color: isMinecraft ? '#FFD700' : '#333',
        marginBottom: '16px',
        textAlign: 'center',
      }}>
        {isMinecraft ? '> ' : ''}{exercise.question}
      </div>

      {/* Play / Replay button */}
      <div style={{ textAlign: 'center' }}>
        <button
          style={playBtnStyle}
          onClick={handlePlay}
          disabled={isPlaying}
        >
          {isPlaying ? 'En cours...' : (hasListened ? 'Reecouter' : 'Ecouter')}
        </button>
      </div>

      {/* Show transcript for dyslexic profiles */}
      {showDyslexicText && hasListened && (
        <div style={{
          marginTop: '12px',
          padding: '12px 16px',
          borderRadius: '12px',
          background: isMinecraft ? 'rgba(255,255,255,0.05)' : 'rgba(155,89,182,0.06)',
          color: isMinecraft ? 'rgba(255,255,255,0.8)' : '#555',
          fontSize: 'clamp(0.85rem, 1vw, 1.1rem)',
          fontStyle: 'italic',
          lineHeight: '2',
          letterSpacing: '0.1em',
        }}>
          {exercise.audioText}
        </div>
      )}

      {/* Questions (appear after listening) */}
      {hasListened && !done && q && (
        <div style={{ marginTop: '24px' }}>
          {/* Progress */}
          <div style={{
            display: 'flex', gap: '6px', marginBottom: '16px', justifyContent: 'center',
          }}>
            {questions.map((_, i) => (
              <div key={i} style={{
                width: '28px', height: '6px', borderRadius: '3px',
                background: i < currentQ
                  ? (isMinecraft ? '#4CAF50' : '#2ECC71')
                  : i === currentQ
                    ? (isMinecraft ? '#FFD700' : '#9B59B6')
                    : (isMinecraft ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'),
                transition: 'background 0.3s',
              }} />
            ))}
          </div>

          <div style={{
            fontSize: 'clamp(1rem, 1.3vw, 1.5rem)',
            fontWeight: '600',
            color: isMinecraft ? '#fff' : '#444',
            marginBottom: '14px',
          }}>
            {q.q}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {q.options.map((opt, idx) => {
              const isSelected = selectedAnswer === opt
              const isCorrectOpt = opt === q.answer
              const showFeedback = selectedAnswer !== null

              let bg, color, borderColor
              if (showFeedback && isCorrectOpt) {
                bg = isMinecraft ? '#2E7D32' : 'linear-gradient(135deg, #2ECC71, #27AE60)'
                color = 'white'
                borderColor = isMinecraft ? '#1B5E20' : '#27AE60'
              } else if (showFeedback && isSelected && !isCorrectOpt) {
                bg = isMinecraft ? '#B71C1C' : 'linear-gradient(135deg, #E74C3C, #C0392B)'
                color = 'white'
                borderColor = isMinecraft ? '#7F0000' : '#C0392B'
              } else {
                bg = isMinecraft ? 'rgba(40, 40, 55, 0.8)' : 'white'
                color = isMinecraft ? 'white' : '#333'
                borderColor = isMinecraft ? 'rgba(255,255,255,0.12)' : '#e0d4f5'
              }

              return (
                <button
                  key={idx}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '12px',
                    border: `2px solid ${borderColor}`,
                    background: bg,
                    color,
                    fontFamily: baseFont,
                    fontWeight: '600',
                    fontSize: 'clamp(0.95rem, 1.2vw, 1.4rem)',
                    cursor: selectedAnswer !== null ? 'default' : 'pointer',
                    textAlign: 'left',
                    lineHeight,
                    letterSpacing,
                  }}
                  onClick={() => handleAnswer(opt)}
                  disabled={selectedAnswer !== null}
                >
                  {isMinecraft ? `[${idx + 1}] ` : ''}{opt}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Final result */}
      {done && (
        <div style={{
          marginTop: '20px',
          padding: '16px 24px',
          borderRadius: '15px',
          textAlign: 'center',
          background: answers.every(a => a.correct)
            ? (isMinecraft ? 'rgba(46,125,50,0.3)' : 'rgba(46,204,113,0.15)')
            : (isMinecraft ? 'rgba(183,28,28,0.3)' : 'rgba(231,76,60,0.15)'),
          fontWeight: '700',
          fontSize: 'clamp(1.1rem, 1.4vw, 1.6rem)',
          color: answers.every(a => a.correct)
            ? (isMinecraft ? '#7CFC00' : '#27AE60')
            : (isMinecraft ? '#FF6B6B' : '#E74C3C'),
        }}>
          {answers.every(a => a.correct)
            ? (isMinecraft ? `+${exercise.xp} XP ! GG !` : `Bravo ! +${exercise.xp} XP`)
            : `${answers.filter(a => a.correct).length}/${questions.length} bonnes reponses`
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

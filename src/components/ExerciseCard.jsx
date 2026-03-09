import { useState, useCallback, useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import { recordExercise } from '../api'

// Highlight keywords in a question string
function highlightText(text, isMinecraft) {
  const keywords = /(\d+[\s]?\d*[.,]?\d*|["«»].+?["«»])/g
  const parts = text.split(keywords)
  return parts.map((part, i) =>
    keywords.test(part)
      ? <mark key={i} style={{
          background: isMinecraft ? 'rgba(255,215,0,0.3)' : 'rgba(155,89,182,0.2)',
          borderRadius: '3px', padding: '0 3px',
          color: isMinecraft ? '#FFD700' : '#9B59B6', fontWeight: '800',
        }}>{part}</mark>
      : part
  )
}

// OpenDyslexic font CSS (loaded once)
let dyslexicFontLoaded = false
function loadDyslexicFont() {
  if (dyslexicFontLoaded) return
  dyslexicFontLoaded = true
  const link = document.createElement('link')
  link.href = 'https://fonts.cdnfonts.com/css/opendyslexic'
  link.rel = 'stylesheet'
  document.head.appendChild(link)
}

export default function ExerciseCard({
  exercise, theme, onComplete, isCompleted,
  accessibility, childId, childGrade, subject, levelName
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const startTimeRef = useRef(Date.now())

  const isMinecraft = theme === 'minecraft'
  const a11y = accessibility || {}
  const hasA11y = a11y.enabled && a11y.profiles?.length > 0

  // Load dyslexic font if needed
  useEffect(() => {
    if (hasA11y && a11y.adaptedFont) loadDyslexicFont()
  }, [hasA11y, a11y.adaptedFont])

  // Read aloud
  useEffect(() => {
    if (hasA11y && a11y.readAloud && exercise?.question && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utter = new SpeechSynthesisUtterance(exercise.question)
      utter.lang = 'fr-FR'
      utter.rate = 0.85
      window.speechSynthesis.speak(utter)
    }
    startTimeRef.current = Date.now()
  }, [exercise?.id])

  const handleAnswer = useCallback((option) => {
    if (showResult) return
    setSelectedAnswer(option)
    const correct = String(option) === String(exercise.answer)
    setIsCorrect(correct)
    setShowResult(true)

    const duration = Math.round((Date.now() - startTimeRef.current) / 1000)

    // Record to server
    recordExercise({
      childId,
      exerciseId: exercise.id,
      subject: subject || 'unknown',
      grade: childGrade || '',
      question: exercise.question,
      givenAnswer: String(option),
      correctAnswer: String(exercise.answer),
      isCorrect: correct,
      duration,
      levelName: levelName || '',
    }).catch(() => {}) // fire and forget

    if (correct) {
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
      setTimeout(() => {
        onComplete(exercise.id, exercise.xp)
      }, 1200)
    }
  }, [showResult, exercise, onComplete, isMinecraft, childId, childGrade, subject, levelName, hasA11y, a11y])

  const handleRetry = () => {
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(false)
    startTimeRef.current = Date.now()
  }

  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utter = new SpeechSynthesisUtterance(exercise.question)
      utter.lang = 'fr-FR'
      utter.rate = 0.85
      window.speechSynthesis.speak(utter)
    }
  }

  // ─── Dynamic font & spacing based on a11y ───
  const baseFont = (hasA11y && a11y.adaptedFont) ? "'OpenDyslexic', 'Quicksand', sans-serif" : "'Quicksand', sans-serif"

  const fontScale = {
    small: 0.85, normal: 1, large: 1.2, xlarge: 1.4,
  }[a11y.fontSize] || 1

  const lineHeight = (hasA11y && a11y.lineSpacing) ? '2.0' : '1.6'
  const letterSpacing = (hasA11y && a11y.lineSpacing) ? '0.05em' : 'normal'

  // Tinted backgrounds
  const tintColors = {
    beige: 'rgba(245,235,200,0.08)',
    blue: 'rgba(173,216,230,0.06)',
    green: 'rgba(200,245,200,0.06)',
  }
  const tintBg = (hasA11y && a11y.tintedBackground) ? tintColors[a11y.tintedBackground] || '' : ''

  const getOptionStyle = (option) => {
    const base = {
      padding: 'clamp(12px, 1.4vw, 22px) clamp(18px, 2vw, 32px)',
      margin: 'clamp(6px, 0.8vw, 14px) 0',
      borderRadius: '15px',
      cursor: showResult ? 'default' : 'pointer',
      fontFamily: baseFont,
      fontSize: `calc(clamp(0.95rem, 1.2vw, 1.5rem) * ${fontScale})`,
      fontWeight: '600',
      transition: (hasA11y && a11y.reduceAnimations) ? 'none' : 'all 0.2s ease',
      border: '2px solid',
      textAlign: 'left',
      width: '100%',
      lineHeight,
      letterSpacing,
    }

    if (showResult && String(option) === String(exercise.answer)) {
      return {
        ...base,
        background: isMinecraft ? '#2E7D32' : 'linear-gradient(135deg, #2ECC71, #27AE60)',
        color: 'white',
        borderColor: isMinecraft ? '#1B5E20' : '#27AE60',
        transform: (hasA11y && a11y.reduceAnimations) ? 'none' : 'scale(1.02)',
      }
    }

    if (showResult && option === selectedAnswer && !isCorrect) {
      return {
        ...base,
        background: isMinecraft ? '#B71C1C' : 'linear-gradient(135deg, #E74C3C, #C0392B)',
        color: 'white',
        borderColor: isMinecraft ? '#7F0000' : '#C0392B',
        animation: (hasA11y && a11y.reduceAnimations) ? 'none' : 'shake 0.5s ease-in-out',
      }
    }

    if (isMinecraft) {
      return {
        ...base,
        background: (hasA11y && a11y.highContrast) ? 'rgba(20,20,30,0.95)' : 'rgba(40, 40, 55, 0.8)',
        color: 'white',
        borderColor: (hasA11y && a11y.highContrast) ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.12)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(4px)',
      }
    }

    return {
      ...base,
      background: (hasA11y && a11y.highContrast) ? '#fff' : 'white',
      color: '#333',
      borderColor: (hasA11y && a11y.highContrast) ? '#9B59B6' : '#e0d4f5',
      boxShadow: '0 2px 8px rgba(155,89,182,0.1)',
    }
  }

  const cardStyle = {
    padding: 'clamp(22px, 2.8vw, 45px)',
    borderRadius: '20px',
    background: tintBg
      ? (isMinecraft ? `linear-gradient(135deg, rgba(20,20,30,0.8), ${tintBg})` : `linear-gradient(135deg, rgba(255,255,255,0.95), ${tintBg})`)
      : (isMinecraft ? 'rgba(20, 20, 30, 0.8)' : 'rgba(255,255,255,0.95)'),
    border: isMinecraft
      ? ((hasA11y && a11y.highContrast) ? '2px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.08)')
      : ((hasA11y && a11y.highContrast) ? '3px solid #9B59B6' : '2px solid rgba(155,89,182,0.15)'),
    boxShadow: isMinecraft
      ? '0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)'
      : '0 4px 20px rgba(0,0,0,0.08)',
    backdropFilter: 'blur(8px)',
    animation: (hasA11y && a11y.reduceAnimations) ? 'none' : 'slideUp 0.4s ease-out',
    maxWidth: '900px',
    width: '100%',
    opacity: isCompleted && !showResult ? 0.6 : 1,
  }

  const questionStyle = {
    fontFamily: baseFont,
    fontSize: `calc(clamp(1.1rem, 1.5vw, 1.9rem) * ${fontScale})`,
    fontWeight: '700',
    color: isMinecraft ? '#FFD700' : '#333',
    marginBottom: 'clamp(16px, 2vw, 30px)',
    lineHeight,
    letterSpacing,
  }

  return (
    <div style={cardStyle}>
      {isCompleted && !showResult && (
        <div style={{
          textAlign: 'center',
          padding: '5px 15px',
          borderRadius: '10px',
          background: isMinecraft ? '#2E7D32' : '#2ECC71',
          color: 'white',
          fontFamily: baseFont,
          fontSize: `calc(clamp(0.85rem, 1vw, 1.2rem) * ${fontScale})`,
          marginBottom: '10px',
          fontWeight: '700',
        }}>
          {isMinecraft ? 'COMPLETE !' : 'Deja reussi !'}
        </div>
      )}

      <div style={questionStyle}>
        {isMinecraft ? '> ' : ''}
        {(hasA11y && a11y.highlightKeywords)
          ? highlightText(exercise.question, isMinecraft)
          : exercise.question
        }
      </div>

      {/* Read aloud button */}
      {hasA11y && a11y.readAloud && (
        <button onClick={handleReadAloud} style={{
          padding: '6px 14px', borderRadius: '10px', border: 'none',
          background: isMinecraft ? 'rgba(255,215,0,0.15)' : 'rgba(155,89,182,0.1)',
          color: isMinecraft ? '#FFD700' : '#9B59B6',
          fontFamily: baseFont, fontSize: '0.8rem', fontWeight: '600',
          cursor: 'pointer', marginBottom: '12px',
        }}>
          Lire la question
        </button>
      )}

      <div>
        {exercise.options.map((option, idx) => (
          <button
            key={idx}
            style={getOptionStyle(option)}
            onClick={() => handleAnswer(option)}
            onMouseOver={(e) => {
              if (!showResult && !(hasA11y && a11y.reduceAnimations)) {
                e.target.style.transform = 'scale(1.02)'
                if (!isMinecraft) {
                  e.target.style.borderColor = '#9B59B6'
                }
              }
            }}
            onMouseOut={(e) => {
              if (!showResult && !(hasA11y && a11y.reduceAnimations)) {
                e.target.style.transform = 'scale(1)'
                if (!isMinecraft) {
                  e.target.style.borderColor = (hasA11y && a11y.highContrast) ? '#9B59B6' : '#e0d4f5'
                }
              }
            }}
          >
            {isMinecraft ? `[${idx + 1}] ` : ''}{String(option)}
          </button>
        ))}
      </div>

      {showResult && (
        <div style={{
          marginTop: 'clamp(16px, 2vw, 28px)',
          padding: 'clamp(12px, 1.5vw, 24px)',
          borderRadius: '15px',
          textAlign: 'center',
          background: isCorrect
            ? (isMinecraft ? 'rgba(46,125,50,0.3)' : 'rgba(46,204,113,0.15)')
            : (isMinecraft ? 'rgba(183,28,28,0.3)' : 'rgba(231,76,60,0.15)'),
          fontFamily: baseFont,
          fontSize: `calc(clamp(1.1rem, 1.4vw, 1.6rem) * ${fontScale})`,
          color: isCorrect
            ? (isMinecraft ? '#7CFC00' : '#27AE60')
            : (isMinecraft ? '#FF6B6B' : '#E74C3C'),
          fontWeight: '700',
          animation: (hasA11y && a11y.reduceAnimations) ? 'none'
            : (isCorrect ? 'popIn 0.4s ease-out' : 'shake 0.5s ease-in-out'),
          lineHeight,
        }}>
          {isCorrect
            ? (isMinecraft ? '+' + exercise.xp + ' XP ! GG !' : 'Bravo ! +' + exercise.xp + ' XP')
            : (isMinecraft ? 'RATE... REESSAYE !' : 'Oups ! Essaie encore !')
          }
          {showResult && isCorrect && exercise.explanation && (
            <div style={{
              marginTop: '10px', fontSize: `calc(0.85rem * ${fontScale})`,
              color: isMinecraft ? 'rgba(255,255,255,0.7)' : '#555',
              fontWeight: '500',
            }}>
              {exercise.explanation}
            </div>
          )}
          {!isCorrect && (
            <button
              onClick={handleRetry}
              style={{
                display: 'block',
                margin: '12px auto 0',
                padding: isMinecraft ? '8px 16px' : '10px 25px',
                borderRadius: '12px',
                border: isMinecraft ? '2px solid rgba(255,255,255,0.15)' : 'none',
                background: isMinecraft ? '#5a5a5a' : 'linear-gradient(135deg, #E74C3C, #C0392B)',
                color: 'white',
                fontFamily: baseFont,
                fontSize: `calc(${isMinecraft ? 'clamp(0.6rem, 0.8vw, 1rem)' : 'clamp(0.9rem, 1.1vw, 1.3rem)'} * ${fontScale})`,
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              {isMinecraft ? 'REESSAYER' : 'Reessayer'}
            </button>
          )}
        </div>
      )}

      <div style={{
        marginTop: '12px',
        textAlign: 'right',
        fontFamily: baseFont,
        fontSize: `calc(clamp(0.85rem, 1vw, 1.2rem) * ${fontScale})`,
        color: isMinecraft ? '#FFD700' : '#E67E22',
        fontWeight: '600',
      }}>
        {isMinecraft ? `[${exercise.xp} XP]` : `${exercise.xp} XP`}
      </div>
    </div>
  )
}

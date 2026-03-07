import { useState, useCallback } from 'react'
import confetti from 'canvas-confetti'

export default function ExerciseCard({ exercise, theme, onComplete, isCompleted }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const isMinecraft = theme === 'minecraft'

  const handleAnswer = useCallback((option) => {
    if (showResult) return
    setSelectedAnswer(option)
    const correct = String(option) === String(exercise.answer)
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      confetti({
        particleCount: isMinecraft ? 50 : 100,
        spread: isMinecraft ? 45 : 70,
        origin: { y: 0.6 },
        colors: isMinecraft
          ? ['#4CAF50', '#FFD700', '#8B4513']
          : ['#FF69B4', '#9B59B6', '#5DADE2', '#FFD700'],
      })
      setTimeout(() => {
        onComplete(exercise.id, exercise.xp)
      }, 1200)
    }
  }, [showResult, exercise, onComplete, isMinecraft])

  const handleRetry = () => {
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(false)
  }

  const font = "'Quicksand', sans-serif"

  const getOptionStyle = (option) => {
    const base = {
      padding: 'clamp(12px, 1.4vw, 22px) clamp(18px, 2vw, 32px)',
      margin: 'clamp(6px, 0.8vw, 14px) 0',
      borderRadius: '15px',
      cursor: showResult ? 'default' : 'pointer',
      fontFamily: font,
      fontSize: 'clamp(0.95rem, 1.2vw, 1.5rem)',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      border: '2px solid',
      textAlign: 'left',
      width: '100%',
    }

    if (showResult && String(option) === String(exercise.answer)) {
      return {
        ...base,
        background: isMinecraft ? '#2E7D32' : 'linear-gradient(135deg, #2ECC71, #27AE60)',
        color: 'white',
        borderColor: isMinecraft ? '#1B5E20' : '#27AE60',
        transform: 'scale(1.02)',
      }
    }

    if (showResult && option === selectedAnswer && !isCorrect) {
      return {
        ...base,
        background: isMinecraft ? '#B71C1C' : 'linear-gradient(135deg, #E74C3C, #C0392B)',
        color: 'white',
        borderColor: isMinecraft ? '#7F0000' : '#C0392B',
        animation: 'shake 0.5s ease-in-out',
      }
    }

    if (isMinecraft) {
      return {
        ...base,
        background: 'rgba(40, 40, 55, 0.8)',
        color: 'white',
        borderColor: 'rgba(255,255,255,0.12)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(4px)',
      }
    }

    return {
      ...base,
      background: 'white',
      color: '#333',
      borderColor: '#e0d4f5',
      boxShadow: '0 2px 8px rgba(155,89,182,0.1)',
    }
  }

  const cardStyle = {
    padding: 'clamp(22px, 2.8vw, 45px)',
    borderRadius: '20px',
    background: isMinecraft ? 'rgba(20, 20, 30, 0.8)' : 'rgba(255,255,255,0.95)',
    border: isMinecraft ? '1px solid rgba(255,255,255,0.08)' : '2px solid rgba(155,89,182,0.15)',
    boxShadow: isMinecraft
      ? '0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)'
      : '0 4px 20px rgba(0,0,0,0.08)',
    backdropFilter: 'blur(8px)',
    animation: 'slideUp 0.4s ease-out',
    maxWidth: '900px',
    width: '100%',
    opacity: isCompleted && !showResult ? 0.6 : 1,
  }

  const questionStyle = {
    fontFamily: font,
    fontSize: 'clamp(1.1rem, 1.5vw, 1.9rem)',
    fontWeight: '700',
    color: isMinecraft ? '#FFD700' : '#333',
    marginBottom: 'clamp(16px, 2vw, 30px)',
    lineHeight: '1.6',
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
          fontFamily: "'Quicksand', sans-serif",
          fontSize: 'clamp(0.85rem, 1vw, 1.2rem)',
          marginBottom: '10px',
          fontWeight: '700',
        }}>
          {isMinecraft ? 'COMPLETE !' : 'Deja reussi !'}
        </div>
      )}

      <div style={questionStyle}>
        {isMinecraft ? '> ' : ''}{exercise.question}
      </div>

      <div>
        {exercise.options.map((option, idx) => (
          <button
            key={idx}
            style={getOptionStyle(option)}
            onClick={() => handleAnswer(option)}
            onMouseOver={(e) => {
              if (!showResult) {
                e.target.style.transform = 'scale(1.02)'
                if (!isMinecraft) {
                  e.target.style.borderColor = '#9B59B6'
                }
              }
            }}
            onMouseOut={(e) => {
              if (!showResult) {
                e.target.style.transform = 'scale(1)'
                if (!isMinecraft) {
                  e.target.style.borderColor = '#e0d4f5'
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
          fontFamily: "'Quicksand', sans-serif",
          fontSize: 'clamp(1.1rem, 1.4vw, 1.6rem)',
          color: isCorrect
            ? (isMinecraft ? '#7CFC00' : '#27AE60')
            : (isMinecraft ? '#FF6B6B' : '#E74C3C'),
          fontWeight: '700',
          animation: isCorrect ? 'popIn 0.4s ease-out' : 'shake 0.5s ease-in-out',
        }}>
          {isCorrect
            ? (isMinecraft ? '+' + exercise.xp + ' XP ! GG !' : 'Bravo ! +' + exercise.xp + ' XP')
            : (isMinecraft ? 'RATE... REESSAYE !' : 'Oups ! Essaie encore !')
          }
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
                fontFamily: "'Quicksand', sans-serif",
                fontSize: isMinecraft ? 'clamp(0.6rem, 0.8vw, 1rem)' : 'clamp(0.9rem, 1.1vw, 1.3rem)',
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
        fontFamily: "'Quicksand', sans-serif",
        fontSize: 'clamp(0.85rem, 1vw, 1.2rem)',
        color: isMinecraft ? '#FFD700' : '#E67E22',
        fontWeight: '600',
      }}>
        {isMinecraft ? `[${exercise.xp} XP]` : `${exercise.xp} XP`}
      </div>
    </div>
  )
}

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

  const getOptionStyle = (option) => {
    const base = {
      padding: isMinecraft
        ? 'clamp(10px, 1.2vw, 20px) clamp(14px, 1.5vw, 28px)'
        : 'clamp(14px, 1.5vw, 24px) clamp(20px, 2vw, 36px)',
      margin: 'clamp(6px, 0.8vw, 14px) 0',
      borderRadius: isMinecraft ? '0' : '15px',
      cursor: showResult ? 'default' : 'pointer',
      fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
      fontSize: isMinecraft ? 'clamp(0.65rem, 0.9vw, 1.1rem)' : 'clamp(1rem, 1.3vw, 1.5rem)',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      border: isMinecraft ? '3px outset' : '2px solid',
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
        background: '#5a5a5a',
        color: 'white',
        borderColor: '#777',
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
    padding: isMinecraft
      ? 'clamp(20px, 2.5vw, 40px)'
      : 'clamp(25px, 3vw, 50px)',
    borderRadius: isMinecraft ? '0' : '20px',
    background: isMinecraft
      ? 'rgba(0,0,0,0.75)'
      : 'rgba(255,255,255,0.95)',
    border: isMinecraft ? '3px solid #555' : '2px solid rgba(155,89,182,0.15)',
    boxShadow: isMinecraft ? 'none' : '0 4px 20px rgba(0,0,0,0.08)',
    animation: 'slideUp 0.4s ease-out',
    maxWidth: '900px',
    width: '100%',
    opacity: isCompleted && !showResult ? 0.6 : 1,
  }

  const questionStyle = {
    fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
    fontSize: isMinecraft ? 'clamp(0.75rem, 1.1vw, 1.3rem)' : 'clamp(1.2rem, 1.6vw, 2rem)',
    fontWeight: '700',
    color: isMinecraft ? '#FFD700' : '#333',
    marginBottom: 'clamp(16px, 2vw, 30px)',
    lineHeight: isMinecraft ? '1.8' : '1.5',
  }

  return (
    <div style={cardStyle}>
      {isCompleted && !showResult && (
        <div style={{
          textAlign: 'center',
          padding: '5px 15px',
          borderRadius: isMinecraft ? '0' : '10px',
          background: isMinecraft ? '#2E7D32' : '#2ECC71',
          color: 'white',
          fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
          fontSize: isMinecraft ? 'clamp(0.6rem, 0.8vw, 1rem)' : 'clamp(0.85rem, 1vw, 1.2rem)',
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
          borderRadius: isMinecraft ? '0' : '15px',
          textAlign: 'center',
          background: isCorrect
            ? (isMinecraft ? 'rgba(46,125,50,0.3)' : 'rgba(46,204,113,0.15)')
            : (isMinecraft ? 'rgba(183,28,28,0.3)' : 'rgba(231,76,60,0.15)'),
          fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
          fontSize: isMinecraft ? 'clamp(0.7rem, 1vw, 1.2rem)' : 'clamp(1.1rem, 1.4vw, 1.6rem)',
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
                borderRadius: isMinecraft ? '0' : '12px',
                border: isMinecraft ? '2px outset #777' : 'none',
                background: isMinecraft ? '#5a5a5a' : 'linear-gradient(135deg, #E74C3C, #C0392B)',
                color: 'white',
                fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
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
        fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
        fontSize: isMinecraft ? 'clamp(0.5rem, 0.7vw, 0.9rem)' : 'clamp(0.8rem, 1vw, 1.2rem)',
        color: isMinecraft ? '#FFD700' : '#E67E22',
        fontWeight: '600',
      }}>
        {isMinecraft ? `[${exercise.xp} XP]` : `${exercise.xp} XP`}
      </div>
    </div>
  )
}

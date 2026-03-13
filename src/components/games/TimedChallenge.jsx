import { useState, useEffect, useRef, useCallback } from 'react'

export default function TimedChallenge({ exercise, theme, onComplete, accessibility }) {
  const a11y = accessibility || {}
  const isMinecraft = theme === 'minecraft'
  const challenges = exercise.challenges || []
  const totalQ = challenges.length
  const timeLimit = a11y.noTimer ? Infinity : (exercise.timeLimit || 60)

  const [currentIdx, setCurrentIdx] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [feedback, setFeedback] = useState(null) // 'correct' | 'wrong' | null
  const [finished, setFinished] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const timerRef = useRef(null)
  const startTimeRef = useRef(Date.now())
  const synthRef = useRef(null)

  // TTS helper
  const speak = useCallback((text) => {
    if (!a11y.readAloud || typeof speechSynthesis === 'undefined') return
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'fr-FR'
    u.rate = 0.9
    speechSynthesis.speak(u)
    synthRef.current = u
  }, [a11y.readAloud])

  // Timer countdown
  useEffect(() => {
    if (finished || timeLimit === Infinity) return
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [finished, timeLimit])

  // Time's up
  useEffect(() => {
    if (timeLeft <= 0 && !finished) {
      setFinished(true)
    }
  }, [timeLeft, finished])

  // Speak current question
  useEffect(() => {
    if (!finished && challenges[currentIdx]) {
      speak(challenges[currentIdx].q)
    }
  }, [currentIdx, finished, speak, challenges])

  const handleAnswer = useCallback((option) => {
    if (feedback || finished) return
    const challenge = challenges[currentIdx]
    const isCorrect = String(option) === String(challenge.answer)

    setSelectedOption(option)
    setFeedback(isCorrect ? 'correct' : 'wrong')
    if (isCorrect) setCorrectCount(prev => prev + 1)

    setTimeout(() => {
      setFeedback(null)
      setSelectedOption(null)
      if (currentIdx + 1 >= totalQ) {
        setFinished(true)
        clearInterval(timerRef.current)
      } else {
        setCurrentIdx(prev => prev + 1)
      }
    }, 300)
  }, [feedback, finished, challenges, currentIdx, totalQ])

  // Results screen
  if (finished) {
    const pct = totalQ > 0 ? correctCount / totalQ : 0
    const timeBonus = timeLimit !== Infinity ? Math.round((timeLeft / timeLimit) * 10) : 0
    const earnedXp = Math.round((exercise.xp || 20) * pct) + timeBonus
    const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000)

    return (
      <div style={{
        textAlign: 'center', padding: '2rem',
        background: isMinecraft ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.95)',
        borderRadius: '16px', maxWidth: '500px', margin: '0 auto',
        color: isMinecraft ? '#fff' : '#333',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
          {pct >= 0.8 ? '🏆' : pct >= 0.5 ? '⭐' : '💪'}
        </div>
        <h2 style={{ margin: '0.5rem 0', color: isMinecraft ? '#FFD700' : '#9B59B6' }}>
          {pct >= 0.8 ? 'Excellent !' : pct >= 0.5 ? 'Bien joue !' : 'Continue comme ca !'}
        </h2>
        <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
          {correctCount} / {totalQ} bonnes reponses
        </p>
        {timeLimit !== Infinity && (
          <p style={{ fontSize: '0.95rem', opacity: 0.8 }}>
            Temps restant : {timeLeft}s {timeBonus > 0 && `(+${timeBonus} XP bonus)`}
          </p>
        )}
        <p style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>
          Temps total : {elapsed}s
        </p>
        <button
          onClick={() => onComplete(earnedXp)}
          style={{
            marginTop: '1.5rem', padding: '12px 32px',
            fontSize: '1.1rem', fontWeight: 'bold', border: 'none',
            borderRadius: '12px', cursor: 'pointer',
            background: isMinecraft ? '#4CAF50' : '#9B59B6',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}
        >
          Continuer (+{earnedXp} XP)
        </button>
      </div>
    )
  }

  // Active game
  const challenge = challenges[currentIdx]
  const progressPct = totalQ > 0 ? (correctCount / totalQ) * 100 : 0
  const timerPct = timeLimit !== Infinity ? (timeLeft / timeLimit) * 100 : 100
  const reduceAnim = a11y.reduceAnimations

  // Timer color gradient
  const timerColor = timerPct > 60 ? '#4CAF50' : timerPct > 30 ? '#FFC107' : '#F44336'

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {/* Timer bar */}
      {!a11y.noTimer && (
        <div style={{
          width: '100%', height: '12px', borderRadius: '6px',
          background: isMinecraft ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
          marginBottom: '8px', overflow: 'hidden',
        }}>
          <div style={{
            width: `${timerPct}%`, height: '100%',
            background: timerColor, borderRadius: '6px',
            transition: reduceAnim ? 'none' : 'width 1s linear, background 0.5s',
          }} />
        </div>
      )}

      {/* Score + time */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '12px', fontSize: '0.95rem', fontWeight: 'bold',
        color: isMinecraft ? '#FFD700' : '#9B59B6',
      }}>
        <span>{exercise.question}</span>
        <span>{correctCount}/{totalQ}</span>
      </div>

      {/* Race track */}
      <div style={{
        position: 'relative', width: '100%', height: '48px',
        background: isMinecraft ? 'rgba(0,0,0,0.4)' : 'rgba(200,180,255,0.25)',
        borderRadius: '24px', marginBottom: '20px', overflow: 'hidden',
        border: isMinecraft ? '2px solid #555' : '2px solid #D8BFE6',
      }}>
        {/* Dashed center line */}
        <div style={{
          position: 'absolute', top: '50%', left: '8px', right: '8px',
          borderTop: `2px dashed ${isMinecraft ? '#555' : '#C8A2D8'}`,
          transform: 'translateY(-50%)',
        }} />
        {/* Runner */}
        <div style={{
          position: 'absolute', top: '50%', transform: 'translateY(-50%)',
          left: `calc(${progressPct}% * 0.85 + 2%)`,
          fontSize: '1.6rem', lineHeight: 1,
          transition: reduceAnim ? 'none' : 'left 0.4s ease-out',
        }}>
          {isMinecraft ? '⛏️' : '🏃'}
        </div>
        {/* Finish line */}
        <div style={{
          position: 'absolute', right: '6px', top: '50%',
          transform: 'translateY(-50%)', fontSize: '1.4rem', lineHeight: 1,
        }}>
          🏁
        </div>
      </div>

      {/* Question */}
      <div style={{
        textAlign: 'center', padding: '1.2rem',
        background: isMinecraft ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)',
        borderRadius: '16px', marginBottom: '16px',
        fontSize: '1.3rem', fontWeight: 'bold',
        color: isMinecraft ? '#fff' : '#333',
        border: isMinecraft ? '2px solid #4CAF50' : '2px solid #D8BFE6',
      }}>
        {challenge.q}
      </div>

      {/* Options */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px',
      }}>
        {challenge.options.map((opt, i) => {
          let bg = isMinecraft ? 'rgba(76,175,80,0.2)' : 'rgba(155,89,182,0.1)'
          let border = isMinecraft ? '#4CAF50' : '#9B59B6'
          if (feedback && selectedOption === opt) {
            if (feedback === 'correct') {
              bg = 'rgba(76,175,80,0.5)'
              border = '#4CAF50'
            } else {
              bg = 'rgba(244,67,54,0.4)'
              border = '#F44336'
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              disabled={!!feedback}
              style={{
                padding: '14px 8px', fontSize: '1.1rem', fontWeight: 'bold',
                background: bg, border: `2px solid ${border}`,
                borderRadius: '12px', cursor: feedback ? 'default' : 'pointer',
                color: isMinecraft ? '#fff' : '#333',
                transition: 'transform 0.1s',
                transform: feedback === 'wrong' && selectedOption === opt && !reduceAnim
                  ? 'translateX(4px)' : 'none',
                opacity: feedback && selectedOption !== opt ? 0.5 : 1,
              }}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

import { useState, useCallback, useEffect } from 'react'
import confetti from 'canvas-confetti'

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

function speakFr(text) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'fr-FR'
  utter.rate = 0.85
  window.speechSynthesis.speak(utter)
}

export default function FillBlankGame({ exercise, theme, onComplete, accessibility }) {
  const isMinecraft = theme === 'minecraft'
  const a11y = accessibility || {}
  const hasA11y = a11y.enabled && a11y.profiles?.length > 0

  const baseFont = (hasA11y && a11y.adaptedFont)
    ? "'OpenDyslexic', 'Quicksand', sans-serif"
    : "'Quicksand', sans-serif"
  const fontScale = { small: 0.85, normal: 1, large: 1.2, xlarge: 1.4 }[a11y.fontSize] || 1
  const lineHeight = (hasA11y && a11y.lineSpacing) ? '2.2' : '1.6'
  const letterSpacing = (hasA11y && a11y.lineSpacing) ? '0.12em' : 'normal'
  const noAnim = hasA11y && a11y.reduceAnimations

  // Parse sentence into segments: text parts and blank indices
  const parseSentence = useCallback((sentence) => {
    const parts = sentence.split('___')
    const segments = []
    parts.forEach((part, i) => {
      if (part) segments.push({ type: 'text', value: part })
      if (i < parts.length - 1) segments.push({ type: 'blank', index: i })
    })
    return segments
  }, [])

  const [filledBlanks, setFilledBlanks] = useState([]) // word or null per blank
  const [availableWords, setAvailableWords] = useState([]) // words still in bank
  const [selectedBlank, setSelectedBlank] = useState(null) // targeted blank index
  const [showResult, setShowResult] = useState(false)
  const [blankStatus, setBlankStatus] = useState([]) // 'correct' | 'wrong' | null
  const [allCorrect, setAllCorrect] = useState(false)

  const blankCount = exercise.blanks.length
  const segments = parseSentence(exercise.sentence)

  // Load dyslexic font
  useEffect(() => {
    if (hasA11y && a11y.adaptedFont) loadDyslexicFont()
  }, [hasA11y, a11y.adaptedFont])

  // Initialize / reset
  useEffect(() => {
    setFilledBlanks(new Array(blankCount).fill(null))
    // Shuffle word bank
    const shuffled = [...exercise.wordBank].sort(() => Math.random() - 0.5)
    setAvailableWords(shuffled)
    setSelectedBlank(null)
    setShowResult(false)
    setBlankStatus([])
    setAllCorrect(false)
  }, [exercise, blankCount])

  // Read aloud on mount
  useEffect(() => {
    if (hasA11y && a11y.readAloud && exercise?.sentence) {
      const readable = exercise.sentence.replace(/___/g, 'blanc')
      speakFr(exercise.question + '. ' + readable)
    }
  }, [exercise?.sentence, exercise?.question, hasA11y, a11y.readAloud])

  // Click a word in the bank
  const handleWordClick = useCallback((word, wordIdx) => {
    if (showResult && allCorrect) return
    if (showResult) {
      setShowResult(false)
      setBlankStatus([])
    }

    if (hasA11y && a11y.readAloud) {
      speakFr(word)
    }

    // Determine target blank
    let targetBlank = selectedBlank
    if (targetBlank === null || filledBlanks[targetBlank] !== null) {
      // Find first empty blank
      targetBlank = filledBlanks.indexOf(null)
    }

    if (targetBlank === -1 || targetBlank === null) return // all full

    const newFilled = [...filledBlanks]
    const newAvailable = [...availableWords]
    newFilled[targetBlank] = word
    newAvailable.splice(wordIdx, 1)
    setFilledBlanks(newFilled)
    setAvailableWords(newAvailable)
    setSelectedBlank(null)
  }, [showResult, allCorrect, selectedBlank, filledBlanks, availableWords, hasA11y, a11y.readAloud])

  // Click a filled blank to return word to bank
  const handleBlankClick = useCallback((blankIdx) => {
    if (showResult && allCorrect) return
    if (showResult) {
      setShowResult(false)
      setBlankStatus([])
    }

    const word = filledBlanks[blankIdx]
    if (word !== null) {
      // Return word to bank
      const newFilled = [...filledBlanks]
      const newAvailable = [...availableWords]
      newFilled[blankIdx] = null
      newAvailable.push(word)
      setFilledBlanks(newFilled)
      setAvailableWords(newAvailable)
      setSelectedBlank(null)
    } else {
      // Select this blank as target
      setSelectedBlank(blankIdx)
    }
  }, [showResult, allCorrect, filledBlanks, availableWords])

  // Validate
  const handleValidate = useCallback(() => {
    if (filledBlanks.some(b => b === null)) return

    const statuses = filledBlanks.map((word, idx) =>
      word === exercise.blanks[idx] ? 'correct' : 'wrong'
    )
    setBlankStatus(statuses)
    setShowResult(true)

    const correct = statuses.every(s => s === 'correct')
    setAllCorrect(correct)

    if (hasA11y && a11y.readAloud) {
      setTimeout(() => {
        speakFr(correct
          ? 'Bravo ! Plus ' + exercise.xp + ' points !'
          : 'Certains mots ne sont pas corrects. Essaie encore !')
      }, 300)
    }

    if (correct) {
      if (!(hasA11y && a11y.noConfetti)) {
        confetti({
          particleCount: noAnim ? 20 : (isMinecraft ? 50 : 100),
          spread: isMinecraft ? 45 : 70,
          origin: { y: 0.6 },
          colors: isMinecraft
            ? ['#4CAF50', '#FFD700', '#8B4513']
            : ['#FF69B4', '#9B59B6', '#5DADE2', '#FFD700'],
        })
      }
      setTimeout(() => onComplete(exercise.id, exercise.xp), 1200)
    }
  }, [filledBlanks, exercise, onComplete, isMinecraft, noAnim, hasA11y, a11y])

  // Retry
  const handleRetry = useCallback(() => {
    setFilledBlanks(new Array(blankCount).fill(null))
    const shuffled = [...exercise.wordBank].sort(() => Math.random() - 0.5)
    setAvailableWords(shuffled)
    setSelectedBlank(null)
    setShowResult(false)
    setBlankStatus([])
    setAllCorrect(false)
  }, [exercise, blankCount])

  // ─── Styles ───

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
    animation: noAnim ? 'none' : 'slideUp 0.4s ease-out',
    maxWidth: '900px',
    width: '100%',
  }

  const questionStyle = {
    fontFamily: baseFont,
    fontSize: `calc(clamp(1.1rem, 1.5vw, 1.9rem) * ${fontScale})`,
    fontWeight: '700',
    color: isMinecraft ? '#FFD700' : '#333',
    marginBottom: 'clamp(10px, 1.2vw, 18px)',
    lineHeight,
    letterSpacing,
  }

  const sentenceStyle = {
    fontFamily: baseFont,
    fontSize: `calc(clamp(1rem, 1.3vw, 1.7rem) * ${fontScale})`,
    fontWeight: '600',
    color: isMinecraft ? 'white' : '#333',
    lineHeight: '2.6',
    letterSpacing,
    marginBottom: 'clamp(16px, 2vw, 28px)',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '4px',
  }

  const getBlankStyle = (blankIdx) => {
    const status = blankStatus[blankIdx]
    const isEmpty = filledBlanks[blankIdx] === null
    const isSelected = selectedBlank === blankIdx

    const base = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 'clamp(80px, 10vw, 140px)',
      padding: 'clamp(4px, 0.5vw, 8px) clamp(10px, 1.2vw, 18px)',
      margin: '0 clamp(2px, 0.3vw, 6px)',
      borderRadius: '10px',
      fontFamily: baseFont,
      fontSize: `calc(clamp(0.95rem, 1.2vw, 1.5rem) * ${fontScale})`,
      fontWeight: '700',
      lineHeight: '1.4',
      letterSpacing,
      cursor: 'pointer',
      transition: noAnim ? 'none' : 'all 0.2s ease',
      verticalAlign: 'middle',
    }

    if (status === 'correct') {
      return {
        ...base,
        background: isMinecraft ? '#2E7D32' : 'linear-gradient(135deg, #2ECC71, #27AE60)',
        color: 'white',
        border: `2px solid ${isMinecraft ? '#1B5E20' : '#27AE60'}`,
      }
    }

    if (status === 'wrong') {
      return {
        ...base,
        background: isMinecraft ? '#B71C1C' : 'linear-gradient(135deg, #E74C3C, #C0392B)',
        color: 'white',
        border: `2px solid ${isMinecraft ? '#7F0000' : '#C0392B'}`,
        animation: noAnim ? 'none' : 'shake 0.5s ease-in-out',
      }
    }

    if (isEmpty) {
      return {
        ...base,
        background: isMinecraft
          ? (isSelected ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.05)')
          : (isSelected ? 'rgba(155,89,182,0.1)' : 'rgba(155,89,182,0.03)'),
        borderBottom: `3px solid ${isMinecraft
          ? (isSelected ? '#FFD700' : 'rgba(255,255,255,0.2)')
          : (isSelected ? '#9B59B6' : '#e0d4f5')}`,
        border: `2px dashed ${isMinecraft
          ? (isSelected ? '#FFD700' : 'rgba(255,255,255,0.15)')
          : (isSelected ? '#9B59B6' : '#e0d4f5')}`,
        color: 'transparent',
      }
    }

    return {
      ...base,
      background: isMinecraft
        ? 'rgba(255,215,0,0.15)'
        : 'rgba(155,89,182,0.1)',
      color: isMinecraft ? '#FFD700' : '#9B59B6',
      border: `2px solid ${isMinecraft ? 'rgba(255,215,0,0.3)' : 'rgba(155,89,182,0.3)'}`,
    }
  }

  const getWordChipStyle = (isUsed) => ({
    display: 'inline-block',
    padding: 'clamp(8px, 1vw, 14px) clamp(14px, 1.6vw, 24px)',
    margin: 'clamp(4px, 0.4vw, 8px)',
    borderRadius: '12px',
    fontFamily: baseFont,
    fontSize: `calc(clamp(0.9rem, 1.1vw, 1.3rem) * ${fontScale})`,
    fontWeight: '600',
    lineHeight,
    letterSpacing,
    cursor: 'pointer',
    transition: noAnim ? 'none' : 'all 0.2s ease',
    background: isMinecraft
      ? ((hasA11y && a11y.highContrast) ? 'rgba(20,20,30,0.95)' : 'rgba(40, 40, 55, 0.8)')
      : ((hasA11y && a11y.highContrast) ? '#fff' : 'white'),
    color: isMinecraft ? 'white' : '#333',
    border: `2px solid ${isMinecraft
      ? ((hasA11y && a11y.highContrast) ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.12)')
      : ((hasA11y && a11y.highContrast) ? '#9B59B6' : '#e0d4f5')}`,
    boxShadow: isMinecraft ? '0 2px 8px rgba(0,0,0,0.2)' : '0 2px 8px rgba(155,89,182,0.1)',
  })

  const validateBtnStyle = {
    display: 'block',
    margin: 'clamp(16px, 2vw, 28px) auto 0',
    padding: isMinecraft ? '10px 24px' : '12px 32px',
    borderRadius: '14px',
    border: isMinecraft ? '2px solid rgba(255,215,0,0.3)' : 'none',
    background: isMinecraft
      ? 'linear-gradient(135deg, #2E7D32, #1B5E20)'
      : 'linear-gradient(135deg, #9B59B6, #8E44AD)',
    color: 'white',
    fontFamily: baseFont,
    fontSize: `calc(clamp(0.95rem, 1.1vw, 1.3rem) * ${fontScale})`,
    fontWeight: '700',
    cursor: filledBlanks.some(b => b === null) ? 'not-allowed' : 'pointer',
    opacity: filledBlanks.some(b => b === null) ? 0.5 : 1,
    transition: noAnim ? 'none' : 'all 0.2s ease',
  }

  const allFilled = filledBlanks.every(b => b !== null)

  return (
    <div style={cardStyle}>
      {/* Question */}
      <div style={questionStyle}>
        {isMinecraft ? '> ' : ''}{exercise.question}
      </div>

      {/* Read aloud button */}
      {hasA11y && a11y.readAloud && (
        <button onClick={() => {
          const readable = exercise.sentence.replace(/___/g, 'blanc')
          speakFr(exercise.question + '. ' + readable)
        }} style={{
          padding: '6px 14px', borderRadius: '10px', border: 'none',
          background: isMinecraft ? 'rgba(255,215,0,0.15)' : 'rgba(155,89,182,0.1)',
          color: isMinecraft ? '#FFD700' : '#9B59B6',
          fontFamily: baseFont, fontSize: '0.8rem', fontWeight: '600',
          cursor: 'pointer', marginBottom: '12px',
        }}>
          Lire la phrase
        </button>
      )}

      {/* Sentence with blanks */}
      <div style={sentenceStyle}>
        {segments.map((seg, i) => {
          if (seg.type === 'text') {
            return <span key={i}>{seg.value}</span>
          }
          const blankIdx = seg.index
          const word = filledBlanks[blankIdx]
          return (
            <span
              key={i}
              style={getBlankStyle(blankIdx)}
              onClick={() => handleBlankClick(blankIdx)}
              role="button"
              aria-label={`Blanc ${blankIdx + 1}${word ? ': ' + word : ': vide'}`}
            >
              {word || '\u00A0\u00A0\u00A0'}
            </span>
          )
        })}
      </div>

      {/* Word bank */}
      <div style={{
        padding: 'clamp(10px, 1.2vw, 18px)',
        borderRadius: '14px',
        background: isMinecraft ? 'rgba(255,255,255,0.03)' : 'rgba(155,89,182,0.03)',
        border: `1px solid ${isMinecraft ? 'rgba(255,255,255,0.06)' : 'rgba(155,89,182,0.08)'}`,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        minHeight: '50px',
      }}>
        {availableWords.length === 0 && (
          <span style={{
            fontFamily: baseFont,
            fontSize: `calc(0.85rem * ${fontScale})`,
            color: isMinecraft ? 'rgba(255,255,255,0.3)' : '#ccc',
            fontStyle: 'italic',
          }}>
            {isMinecraft ? 'BANQUE VIDE' : 'Tous les mots sont places'}
          </span>
        )}
        {availableWords.map((word, idx) => (
          <span
            key={idx}
            style={getWordChipStyle(false)}
            onClick={() => handleWordClick(word, idx)}
            onMouseOver={(e) => {
              if (!noAnim) {
                e.currentTarget.style.transform = 'scale(1.05)'
                if (!isMinecraft) e.currentTarget.style.borderColor = '#9B59B6'
              }
            }}
            onMouseOut={(e) => {
              if (!noAnim) {
                e.currentTarget.style.transform = 'scale(1)'
                if (!isMinecraft) e.currentTarget.style.borderColor = (hasA11y && a11y.highContrast) ? '#9B59B6' : '#e0d4f5'
              }
            }}
            role="button"
            aria-label={word}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Validate button */}
      {!allCorrect && (
        <button
          style={validateBtnStyle}
          onClick={allFilled ? handleValidate : undefined}
          disabled={!allFilled}
        >
          {isMinecraft ? 'VALIDER' : 'Valider'}
        </button>
      )}

      {/* Result feedback */}
      {showResult && (
        <div style={{
          marginTop: 'clamp(16px, 2vw, 28px)',
          padding: 'clamp(12px, 1.5vw, 24px)',
          borderRadius: '15px',
          textAlign: 'center',
          background: allCorrect
            ? (isMinecraft ? 'rgba(46,125,50,0.3)' : 'rgba(46,204,113,0.15)')
            : (isMinecraft ? 'rgba(183,28,28,0.3)' : 'rgba(231,76,60,0.15)'),
          fontFamily: baseFont,
          fontSize: `calc(clamp(1.1rem, 1.4vw, 1.6rem) * ${fontScale})`,
          color: allCorrect
            ? (isMinecraft ? '#7CFC00' : '#27AE60')
            : (isMinecraft ? '#FF6B6B' : '#E74C3C'),
          fontWeight: '700',
          animation: noAnim ? 'none'
            : (allCorrect ? 'popIn 0.4s ease-out' : 'shake 0.5s ease-in-out'),
          lineHeight,
        }}>
          {allCorrect
            ? (isMinecraft ? '+' + exercise.xp + ' XP ! GG !' : 'Bravo ! +' + exercise.xp + ' XP')
            : (isMinecraft ? 'MAUVAIS MOTS... REESSAYE !' : 'Pas tout a fait... Corrige les mots en rouge !')
          }
          {!allCorrect && (
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

      {/* XP indicator */}
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

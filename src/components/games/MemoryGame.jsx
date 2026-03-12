import { useState, useCallback, useEffect, useMemo } from 'react'
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

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function MemoryGame({ exercise, theme, onComplete, accessibility }) {
  const isMinecraft = theme === 'minecraft'
  const a11y = accessibility || {}
  const hasA11y = a11y.enabled && a11y.profiles?.length > 0

  const pairs = exercise.pairs || []

  // Build cards: each pair creates 2 cards (front & back), shuffled once
  const cards = useMemo(() => {
    const all = []
    pairs.forEach((p, pairIdx) => {
      all.push({ id: pairIdx * 2, pairIdx, text: p.front, side: 'front' })
      all.push({ id: pairIdx * 2 + 1, pairIdx, text: p.back, side: 'back' })
    })
    return shuffle(all)
  }, [exercise])

  const [flipped, setFlipped] = useState([])       // currently flipped card ids
  const [matched, setMatched] = useState([])        // matched pair indices
  const [lockBoard, setLockBoard] = useState(false)
  const [done, setDone] = useState(false)

  // Load dyslexic font if needed
  useEffect(() => {
    if (hasA11y && a11y.adaptedFont) loadDyslexicFont()
  }, [hasA11y, a11y.adaptedFont])

  // Read question aloud on mount
  useEffect(() => {
    if (hasA11y && a11y.readAloud && exercise?.question) {
      speakFr(exercise.question)
    }
  }, [exercise?.question])

  const baseFont = (hasA11y && a11y.adaptedFont)
    ? "'OpenDyslexic', 'Quicksand', sans-serif"
    : "'Quicksand', sans-serif"
  const lineHeight = (hasA11y && a11y.lineSpacing) ? '2.2' : '1.6'
  const letterSpacing = (hasA11y && a11y.lineSpacing) ? '0.12em' : 'normal'
  const noAnim = hasA11y && a11y.reduceAnimations
  const highContrast = hasA11y && a11y.highContrast

  const isCardFlipped = (cardId) => flipped.includes(cardId)
  const isCardMatched = (card) => matched.includes(card.pairIdx)

  const handleCardClick = useCallback((card) => {
    if (lockBoard || done) return
    if (isCardFlipped(card.id) || isCardMatched(card)) return

    if (hasA11y && a11y.readAloud) speakFr(card.text)

    const newFlipped = [...flipped, card.id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setLockBoard(true)
      const first = cards.find(c => c.id === newFlipped[0])
      const second = cards.find(c => c.id === newFlipped[1])

      if (first.pairIdx === second.pairIdx) {
        // Match found
        const newMatched = [...matched, first.pairIdx]
        setMatched(newMatched)
        setFlipped([])
        setLockBoard(false)

        if (hasA11y && a11y.readAloud) {
          setTimeout(() => speakFr('Bonne paire !'), 200)
        }

        // All matched?
        if (newMatched.length === pairs.length) {
          setDone(true)
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
          if (hasA11y && a11y.readAloud) {
            setTimeout(() => speakFr('Felicitations ! Tu as trouve toutes les paires !'), 400)
          }
          setTimeout(() => onComplete(exercise.id, exercise.xp), 1200)
        }
      } else {
        // No match - flip back after 1s
        setTimeout(() => {
          setFlipped([])
          setLockBoard(false)
        }, 1000)
      }
    }
  }, [flipped, matched, lockBoard, done, cards, pairs, isMinecraft, noAnim, hasA11y, a11y, exercise, onComplete])

  // Compute grid columns based on number of cards
  const totalCards = cards.length
  const cols = totalCards <= 8 ? 4 : totalCards <= 12 ? 4 : 6

  const cardStyle = {
    padding: 'clamp(22px, 2.8vw, 45px)',
    borderRadius: '20px',
    background: isMinecraft ? 'rgba(20,20,30,0.8)' : 'rgba(255,255,255,0.95)',
    border: isMinecraft
      ? (highContrast ? '2px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.08)')
      : (highContrast ? '3px solid #9B59B6' : '2px solid rgba(155,89,182,0.15)'),
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
    fontSize: 'clamp(1.1rem, 1.5vw, 1.9rem)',
    fontWeight: '700',
    color: isMinecraft ? '#FFD700' : '#333',
    marginBottom: 'clamp(16px, 2vw, 30px)',
    lineHeight,
    letterSpacing,
  }

  const getMemoryCardStyle = (card) => {
    const cardFlipped = isCardFlipped(card.id) || isCardMatched(card)

    return {
      container: {
        perspective: noAnim ? 'none' : '600px',
        cursor: lockBoard || done || cardFlipped ? 'default' : 'pointer',
        width: '100%',
        aspectRatio: '1',
        minHeight: 'clamp(60px, 8vw, 100px)',
      },
      inner: {
        position: 'relative',
        width: '100%',
        height: '100%',
        transition: noAnim ? 'none' : 'transform 0.5s ease',
        transformStyle: noAnim ? 'flat' : 'preserve-3d',
        transform: cardFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
      },
      face: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: noAnim ? 'visible' : 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '12px',
        fontFamily: baseFont,
        fontSize: 'clamp(0.8rem, 1.1vw, 1.3rem)',
        fontWeight: '700',
        lineHeight,
        letterSpacing,
        padding: 'clamp(6px, 0.8vw, 12px)',
        textAlign: 'center',
        wordBreak: 'break-word',
        userSelect: 'none',
        border: '2px solid',
      },
      back: {
        // Card back (face-down)
        background: isMinecraft
          ? 'linear-gradient(135deg, #3a3a4a, #2a2a3a)'
          : 'linear-gradient(135deg, #D6A2E8, #BE7BDB)',
        color: isMinecraft ? 'rgba(255,215,0,0.3)' : 'rgba(255,255,255,0.5)',
        borderColor: isMinecraft ? 'rgba(255,215,0,0.2)' : 'rgba(155,89,182,0.3)',
        boxShadow: isMinecraft
          ? '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
          : '0 2px 8px rgba(155,89,182,0.15)',
      },
      front: {
        // Card front (face-up)
        transform: 'rotateY(180deg)',
        background: isCardMatched(card)
          ? (isMinecraft ? '#2E7D32' : 'linear-gradient(135deg, #2ECC71, #27AE60)')
          : (isMinecraft ? 'rgba(40,40,55,0.9)' : 'white'),
        color: isCardMatched(card)
          ? 'white'
          : (isMinecraft ? '#FFD700' : '#333'),
        borderColor: isCardMatched(card)
          ? (isMinecraft ? '#1B5E20' : '#27AE60')
          : (isMinecraft ? 'rgba(255,215,0,0.3)' : '#e0d4f5'),
        boxShadow: isMinecraft
          ? '0 2px 8px rgba(0,0,0,0.2)'
          : '0 2px 8px rgba(155,89,182,0.1)',
      },
    }
  }

  // For noAnim mode: show content directly without 3D transforms
  const renderCard = (card) => {
    const cardFlipped = isCardFlipped(card.id) || isCardMatched(card)
    const styles = getMemoryCardStyle(card)

    if (noAnim) {
      // Simplified rendering without 3D transforms
      const faceStyle = cardFlipped ? {
        ...styles.face,
        ...styles.front,
        position: 'relative',
        transform: 'none',
        width: '100%',
        height: '100%',
      } : {
        ...styles.face,
        ...styles.back,
        position: 'relative',
        width: '100%',
        height: '100%',
      }

      return (
        <div
          style={styles.container}
          onClick={() => handleCardClick(card)}
        >
          <div style={faceStyle}>
            {cardFlipped ? card.text : '?'}
          </div>
        </div>
      )
    }

    return (
      <div
        style={styles.container}
        onClick={() => handleCardClick(card)}
      >
        <div style={styles.inner}>
          {/* Back face (face-down) */}
          <div style={{ ...styles.face, ...styles.back }}>
            {isMinecraft ? '[ ? ]' : '?'}
          </div>
          {/* Front face (face-up content) */}
          <div style={{ ...styles.face, ...styles.front }}>
            {card.text}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={cardStyle}>
      <div style={questionStyle}>
        {isMinecraft ? '> ' : ''}{exercise.question}
      </div>

      {/* Read aloud button */}
      {hasA11y && a11y.readAloud && (
        <button onClick={() => speakFr(exercise.question)} style={{
          padding: '6px 14px', borderRadius: '10px', border: 'none',
          background: isMinecraft ? 'rgba(255,215,0,0.15)' : 'rgba(155,89,182,0.1)',
          color: isMinecraft ? '#FFD700' : '#9B59B6',
          fontFamily: baseFont, fontSize: '0.8rem', fontWeight: '600',
          cursor: 'pointer', marginBottom: '12px',
        }}>
          Lire la question
        </button>
      )}

      {/* Progress */}
      <div style={{
        fontFamily: baseFont,
        fontSize: 'clamp(0.8rem, 0.9vw, 1rem)',
        color: isMinecraft ? 'rgba(255,255,255,0.5)' : '#999',
        marginBottom: 'clamp(10px, 1.2vw, 18px)',
        textAlign: 'center',
      }}>
        {matched.length} / {pairs.length} {isMinecraft ? 'PAIRES TROUVEES' : 'paires trouvees'}
      </div>

      {/* Card grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 'clamp(6px, 1vw, 14px)',
        maxWidth: '700px',
        margin: '0 auto',
      }}>
        {cards.map(card => (
          <div key={card.id}>
            {renderCard(card)}
          </div>
        ))}
      </div>

      {/* Success message */}
      {done && (
        <div style={{
          marginTop: 'clamp(16px, 2vw, 28px)',
          padding: 'clamp(12px, 1.5vw, 24px)',
          borderRadius: '15px',
          textAlign: 'center',
          background: isMinecraft ? 'rgba(46,125,50,0.3)' : 'rgba(46,204,113,0.15)',
          fontFamily: baseFont,
          fontSize: 'clamp(1.1rem, 1.4vw, 1.6rem)',
          color: isMinecraft ? '#7CFC00' : '#27AE60',
          fontWeight: '700',
          animation: noAnim ? 'none' : 'popIn 0.4s ease-out',
          lineHeight,
        }}>
          {isMinecraft
            ? '+' + exercise.xp + ' XP ! MEMOIRE DE CHAMPION !'
            : 'Bravo ! +' + exercise.xp + ' XP - Quelle memoire !'
          }
        </div>
      )}

      {/* XP display */}
      <div style={{
        marginTop: '12px',
        textAlign: 'right',
        fontFamily: baseFont,
        fontSize: 'clamp(0.85rem, 1vw, 1.2rem)',
        color: isMinecraft ? '#FFD700' : '#E67E22',
        fontWeight: '600',
      }}>
        {isMinecraft ? `[${exercise.xp} XP]` : `${exercise.xp} XP`}
      </div>
    </div>
  )
}

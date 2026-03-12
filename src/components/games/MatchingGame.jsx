import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
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

export default function MatchingGame({ exercise, theme, onComplete, accessibility }) {
  const isMinecraft = theme === 'minecraft'
  const a11y = accessibility || {}
  const hasA11y = a11y.enabled && a11y.profiles?.length > 0

  const pairs = exercise.pairs || []

  // Shuffle right column once
  const shuffledRight = useMemo(() => shuffle(pairs.map(p => p.right)), [exercise])

  const [selectedLeft, setSelectedLeft] = useState(null)
  const [selectedRight, setSelectedRight] = useState(null)
  const [matched, setMatched] = useState([]) // indices of matched pairs
  const [wrongPair, setWrongPair] = useState(null) // { left, right } for shake
  const [done, setDone] = useState(false)
  const svgRef = useRef(null)
  const leftRefs = useRef([])
  const rightRefs = useRef([])
  const containerRef = useRef(null)

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

  // Build a lookup: for each left index, find which shuffledRight index it matches
  const pairMap = useMemo(() => {
    const m = {}
    pairs.forEach((p, li) => {
      const ri = shuffledRight.indexOf(p.right)
      m[li] = ri
    })
    return m
  }, [pairs, shuffledRight])

  // Get line coordinates for matched pairs
  const [lines, setLines] = useState([])
  useEffect(() => {
    if (matched.length === 0 || !containerRef.current) { setLines([]); return }
    const cRect = containerRef.current.getBoundingClientRect()
    const newLines = matched.map(li => {
      const ri = pairMap[li]
      const lEl = leftRefs.current[li]
      const rEl = rightRefs.current[ri]
      if (!lEl || !rEl) return null
      const lRect = lEl.getBoundingClientRect()
      const rRect = rEl.getBoundingClientRect()
      return {
        x1: lRect.right - cRect.left,
        y1: lRect.top + lRect.height / 2 - cRect.top,
        x2: rRect.left - cRect.left,
        y2: rRect.top + rRect.height / 2 - cRect.top,
      }
    }).filter(Boolean)
    setLines(newLines)
  }, [matched, pairMap])

  const handleLeftClick = useCallback((idx) => {
    if (done || matched.includes(idx)) return
    if (hasA11y && a11y.readAloud) speakFr(pairs[idx].left)
    setSelectedLeft(idx)
    setSelectedRight(null)
    setWrongPair(null)
  }, [done, matched, pairs, hasA11y, a11y.readAloud])

  const handleRightClick = useCallback((ri) => {
    if (done || selectedLeft === null) return
    // Check if this right item is already matched
    const alreadyMatched = matched.some(li => pairMap[li] === ri)
    if (alreadyMatched) return

    if (hasA11y && a11y.readAloud) speakFr(shuffledRight[ri])

    const correctRi = pairMap[selectedLeft]
    if (ri === correctRi) {
      // Correct match
      const newMatched = [...matched, selectedLeft]
      setMatched(newMatched)
      setSelectedLeft(null)
      setSelectedRight(null)
      setWrongPair(null)

      if (hasA11y && a11y.readAloud) {
        setTimeout(() => speakFr('Bravo !'), 200)
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
          setTimeout(() => speakFr('Felicitations ! Toutes les paires sont trouvees !'), 400)
        }
        setTimeout(() => onComplete(exercise.id, exercise.xp), 1200)
      }
    } else {
      // Wrong match
      setWrongPair({ left: selectedLeft, right: ri })
      if (hasA11y && a11y.readAloud) {
        setTimeout(() => speakFr('Ce n\'est pas la bonne paire.'), 200)
      }
      setTimeout(() => {
        setWrongPair(null)
        setSelectedLeft(null)
      }, 700)
    }
  }, [done, selectedLeft, matched, pairMap, pairs, shuffledRight, isMinecraft, noAnim, hasA11y, a11y, exercise, onComplete])

  // Item styles
  const getLeftStyle = (idx) => {
    const isMatched = matched.includes(idx)
    const isSelected = selectedLeft === idx
    const isWrong = wrongPair?.left === idx

    const base = {
      padding: 'clamp(10px, 1.2vw, 18px) clamp(14px, 1.6vw, 24px)',
      margin: 'clamp(5px, 0.6vw, 10px) 0',
      borderRadius: '12px',
      cursor: isMatched || done ? 'default' : 'pointer',
      fontFamily: baseFont,
      fontSize: 'clamp(0.9rem, 1.1vw, 1.4rem)',
      fontWeight: '600',
      transition: noAnim ? 'none' : 'all 0.2s ease',
      border: '2px solid',
      textAlign: 'center',
      width: '100%',
      lineHeight,
      letterSpacing,
      userSelect: 'none',
    }

    if (isMatched) {
      return {
        ...base,
        background: isMinecraft ? '#2E7D32' : 'linear-gradient(135deg, #2ECC71, #27AE60)',
        color: 'white',
        borderColor: isMinecraft ? '#1B5E20' : '#27AE60',
        opacity: 0.85,
      }
    }
    if (isWrong) {
      return {
        ...base,
        background: isMinecraft ? '#B71C1C' : '#E74C3C',
        color: 'white',
        borderColor: isMinecraft ? '#7F0000' : '#C0392B',
        animation: noAnim ? 'none' : 'matchShake 0.5s ease-in-out',
      }
    }
    if (isSelected) {
      return {
        ...base,
        background: isMinecraft ? 'rgba(255,215,0,0.25)' : 'rgba(155,89,182,0.2)',
        color: isMinecraft ? '#FFD700' : '#9B59B6',
        borderColor: isMinecraft ? '#FFD700' : '#9B59B6',
        transform: noAnim ? 'none' : 'scale(1.03)',
      }
    }

    return {
      ...base,
      background: isMinecraft ? 'rgba(40,40,55,0.8)' : 'white',
      color: isMinecraft ? 'white' : '#333',
      borderColor: isMinecraft ? 'rgba(255,255,255,0.12)' : '#e0d4f5',
      boxShadow: isMinecraft ? '0 2px 8px rgba(0,0,0,0.2)' : '0 2px 8px rgba(155,89,182,0.1)',
    }
  }

  const getRightStyle = (ri) => {
    const isMatched = matched.some(li => pairMap[li] === ri)
    const isWrong = wrongPair?.right === ri

    const base = {
      padding: 'clamp(10px, 1.2vw, 18px) clamp(14px, 1.6vw, 24px)',
      margin: 'clamp(5px, 0.6vw, 10px) 0',
      borderRadius: '12px',
      cursor: isMatched || done || selectedLeft === null ? 'default' : 'pointer',
      fontFamily: baseFont,
      fontSize: 'clamp(0.9rem, 1.1vw, 1.4rem)',
      fontWeight: '600',
      transition: noAnim ? 'none' : 'all 0.2s ease',
      border: '2px solid',
      textAlign: 'center',
      width: '100%',
      lineHeight,
      letterSpacing,
      userSelect: 'none',
      opacity: selectedLeft === null && !isMatched ? 0.6 : 1,
    }

    if (isMatched) {
      return {
        ...base,
        background: isMinecraft ? '#2E7D32' : 'linear-gradient(135deg, #2ECC71, #27AE60)',
        color: 'white',
        borderColor: isMinecraft ? '#1B5E20' : '#27AE60',
        opacity: 0.85,
      }
    }
    if (isWrong) {
      return {
        ...base,
        background: isMinecraft ? '#B71C1C' : '#E74C3C',
        color: 'white',
        borderColor: isMinecraft ? '#7F0000' : '#C0392B',
        animation: noAnim ? 'none' : 'matchShake 0.5s ease-in-out',
        opacity: 1,
      }
    }

    return {
      ...base,
      background: isMinecraft ? 'rgba(40,40,55,0.8)' : 'white',
      color: isMinecraft ? 'white' : '#333',
      borderColor: isMinecraft ? 'rgba(255,255,255,0.12)' : '#e0d4f5',
      boxShadow: isMinecraft ? '0 2px 8px rgba(0,0,0,0.2)' : '0 2px 8px rgba(155,89,182,0.1)',
    }
  }

  const cardStyle = {
    padding: 'clamp(22px, 2.8vw, 45px)',
    borderRadius: '20px',
    background: isMinecraft ? 'rgba(20,20,30,0.8)' : 'rgba(255,255,255,0.95)',
    border: isMinecraft
      ? '1px solid rgba(255,255,255,0.08)'
      : '2px solid rgba(155,89,182,0.15)',
    boxShadow: isMinecraft
      ? '0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)'
      : '0 4px 20px rgba(0,0,0,0.08)',
    backdropFilter: 'blur(8px)',
    animation: noAnim ? 'none' : 'slideUp 0.4s ease-out',
    maxWidth: '900px',
    width: '100%',
    position: 'relative',
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

  return (
    <div style={cardStyle}>
      {/* Keyframes */}
      <style>{`
        @keyframes matchShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>

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

      {/* Instruction */}
      <div style={{
        fontFamily: baseFont,
        fontSize: 'clamp(0.8rem, 0.9vw, 1rem)',
        color: isMinecraft ? 'rgba(255,255,255,0.5)' : '#999',
        marginBottom: 'clamp(10px, 1.2vw, 18px)',
        textAlign: 'center',
      }}>
        {selectedLeft === null
          ? (isMinecraft ? 'SELECTIONNE UN ELEMENT A GAUCHE' : 'Clique sur un element a gauche')
          : (isMinecraft ? 'MAINTENANT CLIQUE A DROITE' : 'Maintenant clique sur son correspondant a droite')
        }
      </div>

      {/* Matching columns */}
      <div ref={containerRef} style={{
        display: 'grid',
        gridTemplateColumns: '1fr clamp(30px, 4vw, 60px) 1fr',
        gap: '0',
        alignItems: 'start',
        position: 'relative',
      }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {pairs.map((p, idx) => (
            <button
              key={'l' + idx}
              ref={el => leftRefs.current[idx] = el}
              style={getLeftStyle(idx)}
              onClick={() => handleLeftClick(idx)}
            >
              {p.left}
            </button>
          ))}
        </div>

        {/* SVG connection lines */}
        <div style={{ position: 'relative' }}>
          <svg
            ref={svgRef}
            style={{
              position: 'absolute',
              top: 0, left: '-50%',
              width: '200%', height: '100%',
              pointerEvents: 'none',
              overflow: 'visible',
            }}
          >
            {lines.map((line, i) => (
              <line
                key={i}
                x1={line.x1} y1={line.y1}
                x2={line.x2} y2={line.y2}
                stroke={isMinecraft ? '#4CAF50' : '#2ECC71'}
                strokeWidth="2"
                strokeDasharray={noAnim ? 'none' : '6 3'}
                opacity="0.7"
              />
            ))}
          </svg>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {shuffledRight.map((item, ri) => (
            <button
              key={'r' + ri}
              ref={el => rightRefs.current[ri] = el}
              style={getRightStyle(ri)}
              onClick={() => handleRightClick(ri)}
            >
              {item}
            </button>
          ))}
        </div>
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
            ? '+' + exercise.xp + ' XP ! TOUTES LES PAIRES TROUVEES !'
            : 'Bravo ! +' + exercise.xp + ' XP - Tout est relie !'
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

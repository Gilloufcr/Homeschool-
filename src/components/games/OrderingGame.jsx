import { useState, useCallback, useEffect, useRef } from 'react'
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

function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function OrderingGame({ exercise, theme, onComplete, accessibility }) {
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

  // Items in the source pool (unplaced) and items in the answer slots
  const [sourceItems, setSourceItems] = useState([])
  const [placedItems, setPlacedItems] = useState([]) // array of { index, label } or null per slot
  const [selectedSource, setSelectedSource] = useState(null) // index in sourceItems
  const [selectedSlot, setSelectedSlot] = useState(null) // slot index in placedItems
  const [showResult, setShowResult] = useState(false)
  const [slotStatus, setSlotStatus] = useState([]) // 'correct' | 'wrong' | null per slot
  const [allCorrect, setAllCorrect] = useState(false)
  const dragItemRef = useRef(null)

  // Load dyslexic font
  useEffect(() => {
    if (hasA11y && a11y.adaptedFont) loadDyslexicFont()
  }, [hasA11y, a11y.adaptedFont])

  // Initialize / reset
  useEffect(() => {
    const items = exercise.items.map((label, index) => ({ index, label }))
    setSourceItems(shuffleArray(items))
    setPlacedItems(new Array(exercise.items.length).fill(null))
    setSelectedSource(null)
    setSelectedSlot(null)
    setShowResult(false)
    setSlotStatus([])
    setAllCorrect(false)
  }, [exercise])

  // Read aloud on mount
  useEffect(() => {
    if (hasA11y && a11y.readAloud && exercise?.question) {
      speakFr(exercise.question)
    }
  }, [exercise?.question, hasA11y, a11y.readAloud])

  // Click on a source item
  const handleSourceClick = useCallback((srcIdx) => {
    if (showResult && allCorrect) return
    if (showResult) {
      // Reset for retry
      setShowResult(false)
      setSlotStatus([])
    }

    const item = sourceItems[srcIdx]

    if (hasA11y && a11y.readAloud) {
      speakFr(item.label)
    }

    // If a slot is selected, place directly into that slot
    if (selectedSlot !== null) {
      const newPlaced = [...placedItems]
      const newSource = [...sourceItems]
      // If slot already has an item, return it to source
      if (newPlaced[selectedSlot] !== null) {
        newSource.push(newPlaced[selectedSlot])
      }
      newPlaced[selectedSlot] = item
      newSource.splice(srcIdx, 1)
      setPlacedItems(newPlaced)
      setSourceItems(newSource)
      setSelectedSlot(null)
      setSelectedSource(null)
      return
    }

    // Otherwise find first empty slot
    const firstEmpty = placedItems.indexOf(null)
    if (firstEmpty !== -1) {
      const newPlaced = [...placedItems]
      const newSource = [...sourceItems]
      newPlaced[firstEmpty] = item
      newSource.splice(srcIdx, 1)
      setPlacedItems(newPlaced)
      setSourceItems(newSource)
      setSelectedSource(null)
    } else {
      // All slots full, just select it
      setSelectedSource(srcIdx)
    }
  }, [showResult, allCorrect, sourceItems, placedItems, selectedSlot, hasA11y, a11y.readAloud])

  // Click on a placed slot
  const handleSlotClick = useCallback((slotIdx) => {
    if (showResult && allCorrect) return
    if (showResult) {
      setShowResult(false)
      setSlotStatus([])
    }

    const item = placedItems[slotIdx]

    if (item !== null) {
      // Return item to source pool
      const newPlaced = [...placedItems]
      const newSource = [...sourceItems]
      newPlaced[slotIdx] = null
      newSource.push(item)
      setPlacedItems(newPlaced)
      setSourceItems(newSource)
      setSelectedSlot(null)
      setSelectedSource(null)
    } else {
      // Select this empty slot as target
      setSelectedSlot(slotIdx)
    }
  }, [showResult, allCorrect, placedItems, sourceItems])

  // Drag & drop handlers
  const handleDragStart = useCallback((e, item, fromSource, fromIdx) => {
    dragItemRef.current = { item, fromSource, fromIdx }
    e.dataTransfer.effectAllowed = 'move'
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const handleDropOnSlot = useCallback((e, slotIdx) => {
    e.preventDefault()
    if (!dragItemRef.current) return
    if (showResult && allCorrect) return
    if (showResult) {
      setShowResult(false)
      setSlotStatus([])
    }

    const { item, fromSource, fromIdx } = dragItemRef.current
    const newPlaced = [...placedItems]
    const newSource = [...sourceItems]

    // Remove from origin
    if (fromSource) {
      newSource.splice(fromIdx, 1)
    } else {
      newPlaced[fromIdx] = null
    }

    // If target slot has an item, return it
    if (newPlaced[slotIdx] !== null) {
      if (fromSource) {
        newSource.push(newPlaced[slotIdx])
      } else {
        // Swap: put displaced item where dragged item came from
        newPlaced[fromIdx] = newPlaced[slotIdx]
      }
    }

    newPlaced[slotIdx] = item
    setPlacedItems(newPlaced)
    setSourceItems(newSource)
    dragItemRef.current = null
  }, [showResult, allCorrect, placedItems, sourceItems])

  const handleDropOnSource = useCallback((e) => {
    e.preventDefault()
    if (!dragItemRef.current) return
    const { item, fromSource, fromIdx } = dragItemRef.current
    if (fromSource) { dragItemRef.current = null; return } // already in source

    const newPlaced = [...placedItems]
    const newSource = [...sourceItems]
    newPlaced[fromIdx] = null
    newSource.push(item)
    setPlacedItems(newPlaced)
    setSourceItems(newSource)
    dragItemRef.current = null
  }, [placedItems, sourceItems])

  // Validate
  const handleValidate = useCallback(() => {
    if (placedItems.some(p => p === null)) return // not all placed

    const statuses = placedItems.map((item, slotIdx) => {
      return item.index === exercise.correctOrder[slotIdx] ? 'correct' : 'wrong'
    })
    setSlotStatus(statuses)
    setShowResult(true)

    const correct = statuses.every(s => s === 'correct')
    setAllCorrect(correct)

    if (hasA11y && a11y.readAloud) {
      setTimeout(() => {
        speakFr(correct
          ? 'Bravo ! Plus ' + exercise.xp + ' points !'
          : 'Certains elements ne sont pas au bon endroit. Essaie encore !')
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
  }, [placedItems, exercise, onComplete, isMinecraft, noAnim, hasA11y, a11y])

  // Retry
  const handleRetry = useCallback(() => {
    const items = exercise.items.map((label, index) => ({ index, label }))
    setSourceItems(shuffleArray(items))
    setPlacedItems(new Array(exercise.items.length).fill(null))
    setSelectedSource(null)
    setSelectedSlot(null)
    setShowResult(false)
    setSlotStatus([])
    setAllCorrect(false)
  }, [exercise])

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
    marginBottom: 'clamp(16px, 2vw, 30px)',
    lineHeight,
    letterSpacing,
  }

  const getSlotStyle = (slotIdx) => {
    const status = slotStatus[slotIdx]
    const isEmpty = placedItems[slotIdx] === null
    const isSelected = selectedSlot === slotIdx

    const base = {
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(8px, 1vw, 16px)',
      padding: 'clamp(10px, 1.2vw, 18px) clamp(14px, 1.6vw, 24px)',
      margin: 'clamp(4px, 0.5vw, 8px) 0',
      borderRadius: '12px',
      fontFamily: baseFont,
      fontSize: `calc(clamp(0.95rem, 1.2vw, 1.5rem) * ${fontScale})`,
      fontWeight: '600',
      lineHeight,
      letterSpacing,
      cursor: 'pointer',
      transition: noAnim ? 'none' : 'all 0.2s ease',
      minHeight: 'clamp(44px, 5vw, 60px)',
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
        border: `2px dashed ${isMinecraft
          ? (isSelected ? '#FFD700' : 'rgba(255,255,255,0.15)')
          : (isSelected ? '#9B59B6' : '#e0d4f5')}`,
        color: isMinecraft ? 'rgba(255,255,255,0.3)' : '#ccc',
      }
    }

    return {
      ...base,
      background: isMinecraft
        ? ((hasA11y && a11y.highContrast) ? 'rgba(20,20,30,0.95)' : 'rgba(40, 40, 55, 0.8)')
        : ((hasA11y && a11y.highContrast) ? '#fff' : 'white'),
      color: isMinecraft ? 'white' : '#333',
      border: `2px solid ${isMinecraft
        ? ((hasA11y && a11y.highContrast) ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.12)')
        : ((hasA11y && a11y.highContrast) ? '#9B59B6' : '#e0d4f5')}`,
      boxShadow: isMinecraft ? '0 2px 8px rgba(0,0,0,0.2)' : '0 2px 8px rgba(155,89,182,0.1)',
    }
  }

  const getSourceItemStyle = (srcIdx) => {
    const isSelected = selectedSource === srcIdx

    return {
      display: 'inline-block',
      padding: 'clamp(8px, 1vw, 14px) clamp(14px, 1.6vw, 24px)',
      margin: 'clamp(4px, 0.4vw, 8px)',
      borderRadius: '12px',
      fontFamily: baseFont,
      fontSize: `calc(clamp(0.9rem, 1.1vw, 1.3rem) * ${fontScale})`,
      fontWeight: '600',
      lineHeight,
      letterSpacing,
      cursor: 'grab',
      transition: noAnim ? 'none' : 'all 0.2s ease',
      background: isMinecraft
        ? (isSelected ? 'rgba(255,215,0,0.25)' : 'rgba(40, 40, 55, 0.8)')
        : (isSelected ? 'rgba(155,89,182,0.15)' : 'white'),
      color: isMinecraft ? (isSelected ? '#FFD700' : 'white') : (isSelected ? '#9B59B6' : '#333'),
      border: `2px solid ${isMinecraft
        ? (isSelected ? '#FFD700' : 'rgba(255,255,255,0.12)')
        : (isSelected ? '#9B59B6' : '#e0d4f5')}`,
      boxShadow: isMinecraft ? '0 2px 8px rgba(0,0,0,0.2)' : '0 2px 8px rgba(155,89,182,0.1)',
      transform: isSelected && !noAnim ? 'scale(1.05)' : 'scale(1)',
    }
  }

  const numberStyle = {
    width: 'clamp(28px, 3vw, 40px)',
    height: 'clamp(28px, 3vw, 40px)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: baseFont,
    fontSize: `calc(clamp(0.85rem, 1vw, 1.2rem) * ${fontScale})`,
    fontWeight: '800',
    flexShrink: 0,
    background: isMinecraft ? 'rgba(255,215,0,0.2)' : 'rgba(155,89,182,0.1)',
    color: isMinecraft ? '#FFD700' : '#9B59B6',
    border: `2px solid ${isMinecraft ? 'rgba(255,215,0,0.3)' : 'rgba(155,89,182,0.2)'}`,
  }

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
    cursor: placedItems.some(p => p === null) ? 'not-allowed' : 'pointer',
    opacity: placedItems.some(p => p === null) ? 0.5 : 1,
    transition: noAnim ? 'none' : 'all 0.2s ease',
  }

  const allPlaced = placedItems.every(p => p !== null)

  return (
    <div style={cardStyle}>
      {/* Question */}
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

      {/* Answer slots */}
      <div style={{ marginBottom: 'clamp(12px, 1.5vw, 20px)' }}>
        {placedItems.map((item, slotIdx) => (
          <div
            key={slotIdx}
            style={getSlotStyle(slotIdx)}
            onClick={() => handleSlotClick(slotIdx)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDropOnSlot(e, slotIdx)}
            role="listitem"
            aria-label={`Position ${slotIdx + 1}${item ? ': ' + item.label : ': vide'}`}
          >
            <div style={numberStyle}>{slotIdx + 1}</div>
            <span>{item ? item.label : (isMinecraft ? '...' : 'Glisse ou clique un element ici')}</span>
          </div>
        ))}
      </div>

      {/* Source pool */}
      {sourceItems.length > 0 && (
        <div
          style={{
            padding: 'clamp(10px, 1.2vw, 18px)',
            borderRadius: '14px',
            background: isMinecraft ? 'rgba(255,255,255,0.03)' : 'rgba(155,89,182,0.03)',
            border: `1px solid ${isMinecraft ? 'rgba(255,255,255,0.06)' : 'rgba(155,89,182,0.08)'}`,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
          onDragOver={handleDragOver}
          onDrop={handleDropOnSource}
        >
          {sourceItems.map((item, srcIdx) => (
            <span
              key={item.index}
              draggable
              onDragStart={(e) => handleDragStart(e, item, true, srcIdx)}
              onClick={() => handleSourceClick(srcIdx)}
              style={getSourceItemStyle(srcIdx)}
              role="button"
              aria-label={item.label}
            >
              {item.label}
            </span>
          ))}
        </div>
      )}

      {/* Validate button */}
      {!allCorrect && (
        <button
          style={validateBtnStyle}
          onClick={allPlaced ? handleValidate : undefined}
          disabled={!allPlaced}
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
            : (isMinecraft ? 'PAS DANS LE BON ORDRE... REESSAYE !' : 'Pas tout a fait... Corrige les elements en rouge !')
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

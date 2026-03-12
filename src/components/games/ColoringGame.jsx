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

const COLOR_LABELS = {
  red: 'Rouge', blue: 'Bleu', green: 'Vert', yellow: 'Jaune',
  orange: 'Orange', purple: 'Violet', brown: 'Marron', pink: 'Rose',
  black: 'Noir', white: 'Blanc',
}

const THEME_COLORS = {
  minecraft: { red: '#ff3333', blue: '#5555ff', green: '#55ff55', yellow: '#ffff55', orange: '#ffaa00', purple: '#aa55ff', brown: '#8B4513', pink: '#ff69b4', black: '#333', white: '#fff' },
  lalilo: { red: '#e74c3c', blue: '#3498db', green: '#2ecc71', yellow: '#f1c40f', orange: '#e67e22', purple: '#9b59b6', brown: '#8B4513', pink: '#fd79a8', black: '#2d3436', white: '#fff' },
}

export default function ColoringGame({ exercise, theme, onComplete, accessibility }) {
  const [selectedColor, setSelectedColor] = useState(null)
  const [regionColors, setRegionColors] = useState({})
  const [wrongRegions, setWrongRegions] = useState(new Set())
  const [done, setDone] = useState(false)
  const svgRef = useRef(null)

  const isMinecraft = theme === 'minecraft'
  const hasA11y = accessibility && typeof accessibility === 'object'
  const a11y = hasA11y ? accessibility : {}
  const noAnim = a11y.reducedAnimations

  useEffect(() => {
    if (a11y.adaptedFont) loadDyslexicFont()
  }, [a11y.adaptedFont])

  useEffect(() => {
    if (a11y.readAloud && exercise.question) speakFr(exercise.question)
  }, [a11y.readAloud, exercise.question])

  const colors = THEME_COLORS[isMinecraft ? 'minecraft' : 'lalilo']
  const palette = exercise.palette || ['red', 'blue', 'green', 'yellow', 'orange', 'purple']
  const regions = exercise.regions || []

  const fontFamily = a11y.adaptedFont ? "'OpenDyslexic', sans-serif" : 'inherit'
  const spacing = a11y.adaptedSpacing ? '0.08em' : 'normal'

  const handleRegionClick = useCallback((regionId) => {
    if (done || !selectedColor) return
    setRegionColors(prev => ({ ...prev, [regionId]: selectedColor }))
    setWrongRegions(prev => {
      const next = new Set(prev)
      next.delete(regionId)
      return next
    })
    if (a11y.readAloud) {
      const region = regions.find(r => r.id === regionId)
      if (region) speakFr(`${region.name} colorie en ${COLOR_LABELS[selectedColor] || selectedColor}`)
    }
  }, [done, selectedColor, a11y.readAloud, regions])

  const handleValidate = useCallback(() => {
    const wrong = new Set()
    regions.forEach(r => {
      if (regionColors[r.id] !== r.correctColor) wrong.add(r.id)
    })

    if (wrong.size === 0) {
      setDone(true)
      if (!noAnim) {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 }, colors: ['#ff0', '#0f0', '#00f', '#f0f'] })
      }
      if (a11y.readAloud) speakFr('Bravo ! Tout est bien colorie !')
      setTimeout(() => onComplete(exercise.id, exercise.xp), 1200)
    } else {
      setWrongRegions(wrong)
      if (a11y.readAloud) speakFr(`${wrong.size} region${wrong.size > 1 ? 's' : ''} mal coloriee${wrong.size > 1 ? 's' : ''}, réessaie !`)
      setTimeout(() => setWrongRegions(new Set()), 1500)
    }
  }, [regions, regionColors, noAnim, a11y.readAloud, exercise, onComplete])

  const bgColor = isMinecraft ? '#1a1a2e' : '#fefefe'
  const borderColor = isMinecraft ? '#0ff' : '#555'
  const cardBg = isMinecraft ? '#16213e' : '#fff'
  const textColor = isMinecraft ? '#e0e0e0' : '#333'
  const accentColor = isMinecraft ? '#00ff88' : '#9b59b6'
  const highContrast = a11y.highContrast

  // Compute SVG viewBox from region paths
  const viewBox = '0 0 180 180'

  return (
    <div style={{
      background: cardBg, borderRadius: 16, padding: 20,
      border: `2px solid ${isMinecraft ? '#0ff4' : '#e0d4f5'}`,
      fontFamily, letterSpacing: spacing, color: textColor,
      maxWidth: 520, margin: '0 auto',
    }}>
      {/* Question */}
      <h3 style={{
        textAlign: 'center', fontSize: a11y.adaptedFont ? '1.3rem' : '1.15rem',
        marginBottom: 12, color: accentColor, fontWeight: 700,
      }}>
        {exercise.question}
        {a11y.readAloud && (
          <button
            onClick={() => speakFr(exercise.question)}
            style={{ marginLeft: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
            aria-label="Lire la question"
          >🔊</button>
        )}
      </h3>

      {/* Instructions list */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center',
        marginBottom: 14, fontSize: a11y.adaptedFont ? '1rem' : '0.9rem',
      }}>
        {regions.map(r => {
          const colored = regionColors[r.id] === r.correctColor
          return (
            <span key={r.id} style={{
              padding: '3px 10px', borderRadius: 8,
              background: colored ? (isMinecraft ? '#0f03' : '#2ecc7122') : (isMinecraft ? '#fff1' : '#f5f5f5'),
              textDecoration: colored ? 'line-through' : 'none',
              opacity: colored ? 0.6 : 1,
            }}>
              {r.label}
              {a11y.readAloud && (
                <button
                  onClick={() => speakFr(r.label)}
                  style={{ marginLeft: 4, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}
                  aria-label={`Lire: ${r.label}`}
                >🔊</button>
              )}
            </span>
          )
        })}
      </div>

      {/* SVG Canvas */}
      <div style={{
        background: bgColor, borderRadius: 12, padding: 10,
        border: highContrast ? '3px solid #000' : `1px solid ${isMinecraft ? '#0ff3' : '#ddd'}`,
        marginBottom: 14, display: 'flex', justifyContent: 'center',
      }}>
        <svg
          ref={svgRef}
          viewBox={viewBox}
          width="100%"
          style={{ maxWidth: 360, maxHeight: 300 }}
          role="img"
          aria-label={exercise.question}
        >
          {regions.map(r => {
            const fill = regionColors[r.id] ? colors[regionColors[r.id]] || regionColors[r.id] : (isMinecraft ? '#1a1a2e' : '#fff')
            const isWrong = wrongRegions.has(r.id)
            const strokeW = highContrast ? 3 : 2
            return (
              <g key={r.id}>
                <path
                  d={r.path}
                  fill={isWrong ? '#ff000055' : fill}
                  stroke={isWrong ? '#ff0000' : (highContrast ? '#000' : borderColor)}
                  strokeWidth={strokeW}
                  style={{
                    cursor: selectedColor && !done ? 'pointer' : 'default',
                    transition: 'fill 0.3s ease',
                  }}
                  onClick={() => handleRegionClick(r.id)}
                  role="button"
                  aria-label={`Region ${r.name}${regionColors[r.id] ? `, coloriee en ${COLOR_LABELS[regionColors[r.id]] || regionColors[r.id]}` : ', non coloriee'}`}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleRegionClick(r.id) }}
                />
                {/* Region label */}
                <text
                  x={getPathCenter(r.path).x}
                  y={getPathCenter(r.path).y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: a11y.adaptedFont ? 11 : 9,
                    fill: regionColors[r.id] ? '#fff' : textColor,
                    fontWeight: 600, pointerEvents: 'none',
                    fontFamily,
                    textShadow: regionColors[r.id] ? '0 1px 2px rgba(0,0,0,0.5)' : 'none',
                  }}
                >
                  {r.name}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Color Palette */}
      <div style={{
        display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap',
        marginBottom: 16, padding: '8px 0',
      }}>
        {palette.map(color => {
          const isSelected = selectedColor === color
          const colorHex = colors[color] || color
          return (
            <button
              key={color}
              onClick={() => {
                setSelectedColor(color)
                if (a11y.readAloud) speakFr(COLOR_LABELS[color] || color)
              }}
              disabled={done}
              aria-label={`Couleur ${COLOR_LABELS[color] || color}${isSelected ? ' (selectionnee)' : ''}`}
              style={{
                width: a11y.adaptedSpacing ? 48 : 40,
                height: a11y.adaptedSpacing ? 48 : 40,
                borderRadius: '50%',
                background: colorHex,
                border: isSelected
                  ? `4px solid ${isMinecraft ? '#0ff' : '#333'}`
                  : `2px solid ${isMinecraft ? '#555' : '#ccc'}`,
                cursor: done ? 'default' : 'pointer',
                transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                transition: 'transform 0.15s ease, border 0.15s ease',
                boxShadow: isSelected ? `0 0 10px ${colorHex}88` : 'none',
                outline: 'none',
              }}
            />
          )
        })}
      </div>

      {/* Selected color indicator */}
      {selectedColor && !done && (
        <p style={{ textAlign: 'center', fontSize: '0.85rem', marginBottom: 10, opacity: 0.7 }}>
          Couleur : <strong style={{ color: colors[selectedColor] || selectedColor }}>{COLOR_LABELS[selectedColor] || selectedColor}</strong> — clique sur une region !
        </p>
      )}

      {/* Validate button */}
      {!done && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleValidate}
            disabled={Object.keys(regionColors).length === 0}
            style={{
              padding: '10px 32px', borderRadius: 10, border: 'none',
              background: Object.keys(regionColors).length === 0
                ? '#aaa'
                : (isMinecraft ? 'linear-gradient(135deg, #00ff88, #00ccff)' : 'linear-gradient(135deg, #9b59b6, #e74c3c)'),
              color: '#fff', fontWeight: 700,
              fontSize: a11y.adaptedFont ? '1.1rem' : '1rem',
              cursor: Object.keys(regionColors).length === 0 ? 'default' : 'pointer',
              fontFamily,
            }}
          >
            Valider
          </button>
        </div>
      )}

      {/* Success message */}
      {done && (
        <p style={{
          textAlign: 'center', fontSize: '1.2rem', fontWeight: 700,
          color: isMinecraft ? '#00ff88' : '#27ae60', marginTop: 10,
        }}>
          Bravo ! Coloriage parfait !
        </p>
      )}
    </div>
  )
}

/** Compute approximate center of an SVG path for label placement */
function getPathCenter(pathData) {
  const coords = []
  const regex = /(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)/g
  let match
  while ((match = regex.exec(pathData)) !== null) {
    coords.push({ x: parseFloat(match[1]), y: parseFloat(match[2]) })
  }
  if (coords.length === 0) return { x: 80, y: 80 }
  const sumX = coords.reduce((s, c) => s + c.x, 0)
  const sumY = coords.reduce((s, c) => s + c.y, 0)
  return { x: sumX / coords.length, y: sumY / coords.length }
}

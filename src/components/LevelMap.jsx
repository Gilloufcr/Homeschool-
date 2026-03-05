import { useState, useEffect } from 'react'

const LevelMap = ({ levels, theme, playerLevel, completedExercises, onSelectLevel }) => {
  const isMinecraft = theme === 'minecraft'
  const [characterPos, setCharacterPos] = useState({ x: 0, y: 0 })
  const [bouncing, setBouncing] = useState(true)

  const getLevelStatus = (level) => {
    const exerciseIds = level.exercises.map(e => e.id)
    const completed = exerciseIds.filter(id => completedExercises.includes(id)).length
    const total = exerciseIds.length
    const unlocked = playerLevel >= level.minLevel
    return { completed, total, unlocked, allDone: completed === total }
  }

  // Find the current active level (first unlocked + not all done)
  const currentLevelIdx = (() => {
    for (let i = levels.length - 1; i >= 0; i--) {
      const s = getLevelStatus(levels[i])
      if (s.unlocked && s.allDone) return Math.min(i + 1, levels.length - 1)
    }
    return 0
  })()

  // Path positions - a winding path going up
  const getNodePosition = (idx, total) => {
    const ySpacing = 120
    const baseY = (total - 1 - idx) * ySpacing + 60
    // Zigzag pattern
    const xOffset = idx % 2 === 0 ? 30 : 70
    return { x: xOffset, y: baseY }
  }

  const totalHeight = levels.length * 120 + 60

  useEffect(() => {
    const pos = getNodePosition(currentLevelIdx, levels.length)
    setCharacterPos({ x: pos.x, y: pos.y })
  }, [currentLevelIdx, levels.length])

  // Bounce animation
  useEffect(() => {
    const interval = setInterval(() => setBouncing(b => !b), 600)
    return () => clearInterval(interval)
  }, [])

  // Theme colors
  const pathColor = isMinecraft ? '#8B7355' : '#E8D5F5'
  const pathBorder = isMinecraft ? '#5D4E37' : '#D4B8E8'
  const bgGradient = isMinecraft
    ? 'linear-gradient(180deg, #87CEEB 0%, #7CBA5C 30%, #5A8C3C 60%, #3D6B2E 100%)'
    : 'linear-gradient(180deg, #FFF5F9 0%, #F0E6FF 30%, #E6F3FF 60%, #F5E6FF 100%)'

  const nodeIcons = isMinecraft
    ? ['⛏️', '🔨', '🗡️', '🌀', '🏰']
    : ['🌸', '🌈', '🦋', '✨', '👑']

  // Character
  const character = isMinecraft ? '🧑' : '🦋'
  const characterSize = isMinecraft ? '2rem' : '2.2rem'

  // Decorative elements
  const decorations = isMinecraft
    ? [
        { emoji: '🌲', x: '5%', y: '15%', size: '1.5rem' },
        { emoji: '🌲', x: '90%', y: '25%', size: '1.8rem' },
        { emoji: '⛰️', x: '88%', y: '10%', size: '2rem' },
        { emoji: '🌲', x: '8%', y: '45%', size: '1.3rem' },
        { emoji: '🪨', x: '92%', y: '55%', size: '1.2rem' },
        { emoji: '🌲', x: '6%', y: '70%', size: '1.6rem' },
        { emoji: '🏠', x: '85%', y: '80%', size: '1.5rem' },
        { emoji: '💎', x: '10%', y: '90%', size: '1rem' },
        { emoji: '🌲', x: '92%', y: '92%', size: '1.4rem' },
      ]
    : [
        { emoji: '🌷', x: '8%', y: '15%', size: '1.3rem' },
        { emoji: '☁️', x: '85%', y: '8%', size: '2rem' },
        { emoji: '🌻', x: '90%', y: '25%', size: '1.2rem' },
        { emoji: '🍄', x: '5%', y: '42%', size: '1.3rem' },
        { emoji: '☁️', x: '15%', y: '35%', size: '1.5rem' },
        { emoji: '🌼', x: '92%', y: '55%', size: '1.1rem' },
        { emoji: '🌺', x: '7%', y: '68%', size: '1.2rem' },
        { emoji: '🏡', x: '88%', y: '82%', size: '1.5rem' },
        { emoji: '🌈', x: '50%', y: '5%', size: '2.5rem' },
      ]

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      height: `${totalHeight}px`,
      background: bgGradient,
      borderRadius: isMinecraft ? '0' : '24px',
      border: isMinecraft ? '4px solid #555' : '2px solid rgba(155,89,182,0.15)',
      overflow: 'hidden',
      boxShadow: isMinecraft ? 'inset 0 0 30px rgba(0,0,0,0.3)' : '0 5px 30px rgba(155,89,182,0.1)',
    }}>
      {/* Decorations */}
      {decorations.map((d, i) => (
        <div key={`deco-${i}`} style={{
          position: 'absolute',
          left: d.x,
          top: d.y,
          fontSize: d.size,
          opacity: 0.6,
          pointerEvents: 'none',
          zIndex: 1,
        }}>
          {d.emoji}
        </div>
      ))}

      {/* SVG Path connecting nodes */}
      <svg style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',
      }}>
        {levels.map((level, idx) => {
          if (idx === 0) return null
          const from = getNodePosition(idx - 1, levels.length)
          const to = getNodePosition(idx, levels.length)
          const fromX = from.x / 100 * 400
          const toX = to.x / 100 * 400
          const midY = (from.y + to.y) / 2

          const status = getLevelStatus(level)
          const prevStatus = getLevelStatus(levels[idx - 1])
          const isActive = prevStatus.allDone && status.unlocked

          return (
            <g key={`path-${idx}`}>
              {/* Path shadow */}
              <path
                d={`M ${fromX} ${from.y} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${to.y}`}
                fill="none"
                stroke={pathBorder}
                strokeWidth="18"
                strokeLinecap="round"
                opacity="0.5"
              />
              {/* Main path */}
              <path
                d={`M ${fromX} ${from.y} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${to.y}`}
                fill="none"
                stroke={isActive || prevStatus.allDone ? (isMinecraft ? '#A0522D' : '#C9A0DC') : pathColor}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={status.unlocked ? 'none' : '8 8'}
                opacity={status.unlocked ? 1 : 0.4}
              />
              {/* Dots along the path */}
              {[0.25, 0.5, 0.75].map((t) => {
                const cx = fromX + (toX - fromX) * t
                const cy = from.y + (to.y - from.y) * t
                return (
                  <circle
                    key={t}
                    cx={cx}
                    cy={cy}
                    r="3"
                    fill={status.unlocked ? (isMinecraft ? '#FFD700' : '#DDA0DD') : '#ccc'}
                    opacity={status.unlocked ? 0.7 : 0.3}
                  />
                )
              })}
            </g>
          )
        })}
      </svg>

      {/* Level nodes */}
      {levels.map((level, idx) => {
        const status = getLevelStatus(level)
        const pos = getNodePosition(idx, levels.length)
        const pct = status.total > 0 ? Math.round((status.completed / status.total) * 100) : 0
        const isCurrentLevel = idx === currentLevelIdx
        const name = isMinecraft ? level.nameMinecraft : level.nameLalilo

        return (
          <div
            key={level.id}
            style={{
              position: 'absolute',
              left: `${pos.x}%`,
              top: `${pos.y}px`,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              cursor: status.unlocked ? 'pointer' : 'default',
              textAlign: 'center',
            }}
            onClick={() => status.unlocked && onSelectLevel(level)}
          >
            {/* Node circle */}
            <div style={{
              width: isCurrentLevel ? '70px' : '60px',
              height: isCurrentLevel ? '70px' : '60px',
              borderRadius: isMinecraft ? '8px' : '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isCurrentLevel ? '1.8rem' : '1.5rem',
              background: !status.unlocked
                ? (isMinecraft ? 'rgba(60,60,60,0.9)' : 'rgba(200,200,200,0.8)')
                : status.allDone
                  ? (isMinecraft
                    ? 'linear-gradient(135deg, #4CAF50, #2E7D32)'
                    : 'linear-gradient(135deg, #2ECC71, #27AE60)')
                  : isCurrentLevel
                    ? (isMinecraft
                      ? 'linear-gradient(135deg, #FFD700, #FFA000)'
                      : 'linear-gradient(135deg, #FF69B4, #E91E93)')
                    : (isMinecraft
                      ? 'linear-gradient(135deg, #8B6914, #6B4F12)'
                      : 'linear-gradient(135deg, #DDA0DD, #BA55D3)'),
              border: isMinecraft
                ? `3px solid ${isCurrentLevel ? '#FFD700' : status.allDone ? '#4CAF50' : '#555'}`
                : `3px solid ${isCurrentLevel ? '#FF69B4' : status.allDone ? '#2ECC71' : 'rgba(155,89,182,0.3)'}`,
              boxShadow: isCurrentLevel
                ? (isMinecraft
                  ? '0 0 20px rgba(255,215,0,0.6), 0 4px 12px rgba(0,0,0,0.3)'
                  : '0 0 20px rgba(255,105,180,0.5), 0 4px 15px rgba(155,89,182,0.2)')
                : status.unlocked
                  ? '0 3px 10px rgba(0,0,0,0.2)'
                  : 'none',
              transition: 'all 0.3s ease',
              animation: isCurrentLevel ? 'nodePulse 2s ease-in-out infinite' : 'none',
              margin: '0 auto',
            }}>
              {!status.unlocked ? '🔒' : status.allDone ? '⭐' : nodeIcons[idx % nodeIcons.length]}
            </div>

            {/* Progress ring for unlocked levels */}
            {status.unlocked && !status.allDone && pct > 0 && (
              <svg style={{
                position: 'absolute',
                top: isCurrentLevel ? '-5px' : '0px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: isCurrentLevel ? '80px' : '68px',
                height: isCurrentLevel ? '80px' : '68px',
                pointerEvents: 'none',
              }}>
                <circle
                  cx={isCurrentLevel ? 40 : 34}
                  cy={isCurrentLevel ? 40 : 34}
                  r={isCurrentLevel ? 36 : 30}
                  fill="none"
                  stroke={isMinecraft ? '#FFD700' : '#FF69B4'}
                  strokeWidth="3"
                  strokeDasharray={`${pct * 2.26} ${226 - pct * 2.26}`}
                  strokeDashoffset="56.5"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </svg>
            )}

            {/* Level label */}
            <div style={{
              marginTop: '6px',
              fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
              fontSize: isMinecraft ? '0.45rem' : '0.7rem',
              fontWeight: '700',
              color: isMinecraft ? '#FFD700' : '#6B3FA0',
              textShadow: isMinecraft ? '1px 1px 0 #000' : '0 1px 3px rgba(255,255,255,0.8)',
              maxWidth: '130px',
              lineHeight: '1.3',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {name}
            </div>

            {/* Score badge */}
            {status.unlocked && (
              <div style={{
                marginTop: '2px',
                fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
                fontSize: isMinecraft ? '0.4rem' : '0.65rem',
                color: status.allDone
                  ? (isMinecraft ? '#7CFC00' : '#27AE60')
                  : (isMinecraft ? '#aaa' : '#9B59B6'),
                fontWeight: '600',
              }}>
                {status.allDone ? (isMinecraft ? 'COMPLETE!' : 'Termine !') : `${status.completed}/${status.total}`}
              </div>
            )}
            {!status.unlocked && (
              <div style={{
                marginTop: '2px',
                fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
                fontSize: isMinecraft ? '0.4rem' : '0.65rem',
                color: isMinecraft ? '#666' : '#aaa',
              }}>
                {isMinecraft ? `LV${level.minLevel}` : `Niv.${level.minLevel}`}
              </div>
            )}
          </div>
        )
      })}

      {/* Animated character */}
      <div style={{
        position: 'absolute',
        left: `${characterPos.x}%`,
        top: `${characterPos.y - 45}px`,
        transform: `translate(-50%, 0) translateY(${bouncing ? '-6px' : '0px'})`,
        transition: 'left 0.8s ease-in-out, top 0.8s ease-in-out, transform 0.3s ease',
        zIndex: 20,
        fontSize: characterSize,
        filter: isMinecraft ? 'none' : 'drop-shadow(0 3px 6px rgba(155,89,182,0.3))',
        pointerEvents: 'none',
      }}>
        {character}
        {/* Character sparkle effect */}
        <div style={{
          position: 'absolute',
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.7rem',
          opacity: bouncing ? 1 : 0.3,
          transition: 'opacity 0.3s',
        }}>
          {isMinecraft ? '⭐' : '✨'}
        </div>
      </div>

      {/* Start banner at bottom */}
      <div style={{
        position: 'absolute',
        bottom: '15px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
        fontSize: isMinecraft ? '0.5rem' : '0.75rem',
        color: isMinecraft ? '#7CFC00' : '#9B59B6',
        textShadow: isMinecraft ? '1px 1px 0 #000' : 'none',
        opacity: 0.7,
        zIndex: 5,
        whiteSpace: 'nowrap',
      }}>
        {isMinecraft ? '>>> DEPART >>>' : 'Depart de l\'aventure'}
      </div>

      {/* Finish flag at top */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '1.5rem',
        zIndex: 5,
        opacity: 0.8,
      }}>
        {isMinecraft ? '🏴' : '🏆'}
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes nodePulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.08); }
        }
      `}</style>
    </div>
  )
}

export default LevelMap

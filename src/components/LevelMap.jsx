import { useState, useEffect } from 'react'

// ═══════════════════════════════════════════════════════════════
// PIXEL STEVE - The one and only
// ═══════════════════════════════════════════════════════════════

const PixelSteve = ({ size = 4, bouncing }) => {
  const px = size
  const shadow = (x, y, color) => `${x * px}px ${y * px}px 0 0 ${color}`

  const hair = '#3B2200'
  const skin = '#C4935A'
  const eye = '#FFFFFF'
  const pupil = '#3B2200'
  const mouth = '#6B4226'
  const shirt = '#00AAAA'
  const pants = '#2B2B8B'
  const shoe = '#4A4A4A'

  const pixels = [
    shadow(1,0,hair), shadow(2,0,hair), shadow(3,0,hair), shadow(4,0,hair), shadow(5,0,hair), shadow(6,0,hair),
    shadow(0,1,hair), shadow(1,1,hair), shadow(2,1,hair), shadow(3,1,hair), shadow(4,1,hair), shadow(5,1,hair), shadow(6,1,hair), shadow(7,1,hair),
    shadow(0,2,hair), shadow(1,2,skin), shadow(2,2,eye), shadow(3,2,pupil), shadow(4,2,skin), shadow(5,2,pupil), shadow(6,2,eye), shadow(7,2,hair),
    shadow(0,3,skin), shadow(1,3,skin), shadow(2,3,skin), shadow(3,3,skin), shadow(4,3,skin), shadow(5,3,skin), shadow(6,3,skin), shadow(7,3,skin),
    shadow(0,4,skin), shadow(1,4,skin), shadow(2,4,skin), shadow(3,4,mouth), shadow(4,4,mouth), shadow(5,4,skin), shadow(6,4,skin), shadow(7,4,skin),
    shadow(1,5,shirt), shadow(2,5,shirt), shadow(3,5,shirt), shadow(4,5,shirt), shadow(5,5,shirt), shadow(6,5,shirt),
    shadow(0,6,shirt), shadow(1,6,shirt), shadow(2,6,shirt), shadow(3,6,shirt), shadow(4,6,shirt), shadow(5,6,shirt), shadow(6,6,shirt), shadow(7,6,shirt),
    shadow(0,7,skin), shadow(1,7,shirt), shadow(2,7,shirt), shadow(3,7,shirt), shadow(4,7,shirt), shadow(5,7,shirt), shadow(6,7,shirt), shadow(7,7,skin),
    shadow(1,8,pants), shadow(2,8,pants), shadow(3,8,pants), shadow(4,8,pants), shadow(5,8,pants), shadow(6,8,pants),
    shadow(1,9,pants), shadow(2,9,pants), shadow(3,9,pants), shadow(4,9,pants), shadow(5,9,pants), shadow(6,9,pants),
    shadow(0,10,shoe), shadow(1,10,shoe), shadow(2,10,shoe), shadow(5,10,shoe), shadow(6,10,shoe), shadow(7,10,shoe),
  ].join(',')

  return (
    <div style={{
      position: 'relative',
      width: `${8 * px}px`,
      height: `${11 * px}px`,
      transform: `translateY(${bouncing ? '-6px' : '2px'})`,
      transition: 'transform 0.35s ease-in-out',
      filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.4))',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: `${px}px`, height: `${px}px`,
        background: 'transparent',
        boxShadow: pixels,
        imageRendering: 'pixelated',
      }} />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// LEVEL MAP
// ═══════════════════════════════════════════════════════════════

const LevelMap = ({ levels, theme, playerLevel, completedExercises, onSelectLevel }) => {
  const isMinecraft = theme === 'minecraft'
  const [bouncing, setBouncing] = useState(true)
  const [wingFrame, setWingFrame] = useState(true)

  // Compute completion status for each level (without unlock info yet)
  const levelCompletions = levels.map(level => {
    const exerciseIds = level.exercises.map(e => e.id)
    const completed = exerciseIds.filter(id => completedExercises.includes(id)).length
    const total = exerciseIds.length
    return { completed, total, allDone: completed === total && total > 0 }
  })

  // Sequential unlock: level 0 always unlocked, others require previous level completed
  const getLevelStatus = (level, idx) => {
    const { completed, total, allDone } = levelCompletions[idx]
    const unlocked = idx === 0 || levelCompletions[idx - 1].allDone
    return { completed, total, unlocked, allDone }
  }

  const currentLevelIdx = (() => {
    for (let i = levels.length - 1; i >= 0; i--) {
      const s = getLevelStatus(levels[i], i)
      if (s.unlocked && s.allDone) return Math.min(i + 1, levels.length - 1)
    }
    return 0
  })()

  const ySpacing = 160
  const getNodePosition = (idx, total) => {
    const baseY = (total - 1 - idx) * ySpacing + 90
    const xOffset = idx % 2 === 0 ? 25 : 75
    return { x: xOffset, y: baseY }
  }

  const totalHeight = levels.length * ySpacing + 100

  useEffect(() => {
    const interval = setInterval(() => setBouncing(b => !b), 600)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isMinecraft) {
      const interval = setInterval(() => setWingFrame(f => !f), 350)
      return () => clearInterval(interval)
    }
  }, [isMinecraft])

  const mcIcons = ['⛏️', '🔨', '🗡️', '🌀', '🏰']
  const fairyIcons = ['🌸', '🌈', '🦋', '✨', '👑']

  // Decoration emojis
  const mcDecos = [
    { emoji: '🌲', x: '6%', y: '10%', size: 'clamp(1.4rem, 2vw, 2.5rem)' },
    { emoji: '💎', x: '90%', y: '20%', size: 'clamp(1.2rem, 1.8vw, 2.2rem)' },
    { emoji: '🌲', x: '92%', y: '45%', size: 'clamp(1.6rem, 2.2vw, 2.8rem)' },
    { emoji: '🪨', x: '4%', y: '55%', size: 'clamp(1.3rem, 1.8vw, 2.2rem)' },
    { emoji: '🍄', x: '8%', y: '75%', size: 'clamp(1.2rem, 1.6vw, 2rem)' },
    { emoji: '🌲', x: '88%', y: '70%', size: 'clamp(1.4rem, 2vw, 2.5rem)' },
    { emoji: '⭐', x: '93%', y: '88%', size: 'clamp(1.1rem, 1.5vw, 1.8rem)' },
    { emoji: '🌲', x: '5%', y: '38%', size: 'clamp(1.5rem, 2vw, 2.6rem)' },
  ]
  const fairyDecos = [
    { emoji: '🌷', x: '6%', y: '12%', size: 'clamp(1.3rem, 1.8vw, 2.2rem)' },
    { emoji: '☁️', x: '85%', y: '5%', size: 'clamp(1.8rem, 2.5vw, 3rem)' },
    { emoji: '🌻', x: '90%', y: '22%', size: 'clamp(1.2rem, 1.6vw, 2rem)' },
    { emoji: '🍄', x: '4%', y: '40%', size: 'clamp(1.3rem, 1.8vw, 2.2rem)' },
    { emoji: '☁️', x: '12%', y: '28%', size: 'clamp(1.5rem, 2vw, 2.5rem)' },
    { emoji: '🌼', x: '92%', y: '52%', size: 'clamp(1.1rem, 1.5vw, 1.8rem)' },
    { emoji: '🌺', x: '5%', y: '65%', size: 'clamp(1.2rem, 1.6vw, 2rem)' },
    { emoji: '🏡', x: '88%', y: '80%', size: 'clamp(1.5rem, 2vw, 2.5rem)' },
    { emoji: '🌈', x: '50%', y: '2%', size: 'clamp(2rem, 3vw, 3.5rem)' },
  ]

  const decos = isMinecraft ? mcDecos : fairyDecos

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: `${totalHeight}px`,
      background: isMinecraft
        ? 'linear-gradient(180deg, #6BB3E0 0%, #87CEEB 30%, #7EC97B 70%, #4A8C3F 100%)'
        : 'linear-gradient(180deg, #FFF5F9 0%, #F0E6FF 30%, #E6F3FF 60%, #F5E6FF 100%)',
      borderRadius: isMinecraft ? '8px' : '24px',
      border: isMinecraft ? '3px solid #5D4E37' : '2px solid rgba(155,89,182,0.15)',
      overflow: 'hidden',
      boxShadow: isMinecraft
        ? '0 4px 20px rgba(0,0,0,0.3), inset 0 0 60px rgba(0,0,0,0.1)'
        : '0 5px 30px rgba(155,89,182,0.1)',
    }}>

      {/* ─── Decorations ─────────────────────────────────── */}
      {decos.map((d, i) => (
        <div key={`deco-${i}`} style={{
          position: 'absolute', left: d.x, top: d.y,
          fontSize: d.size, opacity: 0.5, pointerEvents: 'none', zIndex: 1,
          filter: isMinecraft ? 'none' : 'none',
        }}>{d.emoji}</div>
      ))}

      {/* ─── SVG PATH ─────────────────────────────────────── */}
      <svg
        viewBox={`0 0 400 ${totalHeight}`}
        preserveAspectRatio="none"
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          zIndex: 2, pointerEvents: 'none',
        }}
      >
        {levels.map((level, idx) => {
          if (idx === 0) return null
          const from = getNodePosition(idx - 1, levels.length)
          const to = getNodePosition(idx, levels.length)
          const fromX = from.x / 100 * 400
          const toX = to.x / 100 * 400
          const midY = (from.y + to.y) / 2

          const status = getLevelStatus(level, idx)
          const prevStatus = getLevelStatus(levels[idx - 1], idx - 1)

          const pathD = `M ${fromX} ${from.y} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${to.y}`

          return (
            <g key={`path-${idx}`}>
              {/* Path shadow */}
              <path d={pathD} fill="none"
                stroke={isMinecraft ? '#3D2E1A' : '#D4B8E8'}
                strokeWidth="20"
                strokeLinecap="round"
                opacity="0.3"
              />
              {/* Main path */}
              <path d={pathD} fill="none"
                stroke={prevStatus.allDone
                  ? (isMinecraft ? '#C8A76C' : '#C9A0DC')
                  : (isMinecraft ? '#8B7355' : '#E8D5F5')}
                strokeWidth={isMinecraft ? '12' : '12'}
                strokeLinecap="round"
                strokeDasharray={status.unlocked ? 'none' : '10 10'}
                opacity={status.unlocked ? 1 : 0.4}
              />
              {/* Dots along path */}
              {[0.25, 0.5, 0.75].map((t) => {
                const cx = fromX + (toX - fromX) * t
                const cy = from.y + (to.y - from.y) * t
                return (
                  <circle key={t} cx={cx} cy={cy}
                    r={isMinecraft ? '4' : '3'}
                    fill={status.unlocked
                      ? (isMinecraft ? '#FFD700' : '#DDA0DD')
                      : (isMinecraft ? '#555' : '#ccc')}
                    opacity={status.unlocked ? 0.7 : 0.3}
                  />
                )
              })}
            </g>
          )
        })}
      </svg>

      {/* ─── LEVEL NODES ──────────────────────────────────── */}
      {levels.map((level, idx) => {
        const status = getLevelStatus(level, idx)
        const pos = getNodePosition(idx, levels.length)
        const pct = status.total > 0 ? Math.round((status.completed / status.total) * 100) : 0
        const isCurrentLevel = idx === currentLevelIdx
        const name = isMinecraft
          ? (level.nameMinecraft || level.name)
          : (level.nameLalilo || level.name)

        return (
          <div key={level.id} style={{
            position: 'absolute',
            left: `${pos.x}%`, top: `${pos.y}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            cursor: status.unlocked ? 'pointer' : 'default',
            textAlign: 'center',
            transition: 'transform 0.3s ease',
          }}
          onClick={() => status.unlocked && onSelectLevel(level)}
          onMouseOver={(e) => {
            if (status.unlocked) e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'
          }}>

            {/* Animated character on current level */}
            {isCurrentLevel && (
              <div style={{
                position: 'absolute',
                top: 'clamp(-65px, -7vw, -50px)',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 15,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                {/* Name tag */}
                <div style={{
                  fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
                  fontSize: isMinecraft ? 'clamp(0.3rem, 0.4vw, 0.5rem)' : 'clamp(0.55rem, 0.7vw, 0.8rem)',
                  color: isMinecraft ? '#fff' : '#9B59B6',
                  textShadow: isMinecraft ? '1px 1px 0 #000' : 'none',
                  marginBottom: '3px',
                  background: isMinecraft ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)',
                  padding: isMinecraft ? '2px 6px' : '2px 8px',
                  borderRadius: isMinecraft ? '2px' : '8px',
                  whiteSpace: 'nowrap',
                }}>
                  {isMinecraft ? 'STEVE' : 'Fifi'}
                </div>
                {isMinecraft
                  ? <PixelSteve size={4} bouncing={bouncing} />
                  : <div style={{
                      fontSize: 'clamp(1.5rem, 2.5vw, 2.8rem)',
                      transform: `translateY(${bouncing ? '-6px' : '3px'})`,
                      transition: 'transform 0.35s ease-in-out',
                      filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.3))',
                    }}>
                      {wingFrame ? '🧚' : '🧚‍♀️'}
                    </div>
                }
              </div>
            )}

            {/* Node circle/square */}
            <div style={{
              width: 'clamp(54px, 6vw, 80px)',
              height: 'clamp(54px, 6vw, 80px)',
              borderRadius: isMinecraft ? '8px' : '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 'clamp(1.3rem, 2vw, 2rem)',
              background: !status.unlocked
                ? (isMinecraft ? '#6B6B6B' : 'rgba(200,200,200,0.8)')
                : status.allDone
                  ? (isMinecraft
                    ? 'linear-gradient(135deg, #4CAF50, #388E3C)'
                    : 'linear-gradient(135deg, #2ECC71, #27AE60)')
                  : isCurrentLevel
                    ? (isMinecraft
                      ? 'linear-gradient(135deg, #FFD700, #FFA000)'
                      : 'linear-gradient(135deg, #FF69B4, #E91E93)')
                    : (isMinecraft
                      ? 'linear-gradient(135deg, #8B6914, #A0522D)'
                      : 'linear-gradient(135deg, #DDA0DD, #BA55D3)'),
              border: isCurrentLevel
                ? (isMinecraft ? '3px solid #FFD700' : '3px solid #FF69B4')
                : status.allDone
                  ? (isMinecraft ? '3px solid #4CAF50' : '3px solid #2ECC71')
                  : (isMinecraft ? '3px solid rgba(139,105,20,0.5)' : '3px solid rgba(155,89,182,0.3)'),
              boxShadow: isCurrentLevel
                ? (isMinecraft
                  ? '0 0 20px rgba(255,215,0,0.6), 0 4px 12px rgba(0,0,0,0.3)'
                  : '0 0 20px rgba(255,105,180,0.5), 0 4px 15px rgba(155,89,182,0.2)')
                : status.unlocked
                  ? (isMinecraft
                    ? '0 3px 10px rgba(0,0,0,0.3)'
                    : '0 3px 10px rgba(0,0,0,0.15)')
                  : '0 2px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              animation: isCurrentLevel ? 'nodePulse 2s ease-in-out infinite' : 'none',
              margin: '0 auto',
            }}>
              {!status.unlocked
                ? '🔒'
                : status.allDone
                  ? '⭐'
                  : (isMinecraft ? mcIcons : fairyIcons)[idx % 5]}
            </div>

            {/* Progress bar */}
            {status.unlocked && !status.allDone && pct > 0 && (
              <div style={{
                width: 'clamp(50px, 5.5vw, 76px)',
                height: 'clamp(5px, 0.5vw, 8px)',
                background: isMinecraft ? 'rgba(0,0,0,0.4)' : 'rgba(155,89,182,0.15)',
                borderRadius: isMinecraft ? '3px' : '4px',
                margin: '6px auto 0',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${pct}%`, height: '100%',
                  background: isMinecraft
                    ? 'linear-gradient(90deg, #7CFC00, #32CD32)'
                    : 'linear-gradient(90deg, #FF69B4, #9B59B6)',
                  borderRadius: isMinecraft ? '3px' : '4px',
                  transition: 'width 0.3s ease',
                }} />
              </div>
            )}

            {/* Label */}
            <div style={{
              marginTop: '6px',
              fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
              fontSize: isMinecraft ? 'clamp(0.4rem, 0.55vw, 0.7rem)' : 'clamp(0.7rem, 0.9vw, 1rem)',
              fontWeight: '700',
              color: isMinecraft ? '#FFD700' : '#6B3FA0',
              textShadow: isMinecraft
                ? '1px 1px 2px rgba(0,0,0,0.8)'
                : '0 1px 3px rgba(255,255,255,0.8)',
              maxWidth: 'clamp(90px, 10vw, 160px)',
              lineHeight: '1.3',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {name}
            </div>

            {/* Score */}
            <div style={{
              marginTop: '2px',
              fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
              fontSize: isMinecraft ? 'clamp(0.35rem, 0.5vw, 0.6rem)' : 'clamp(0.65rem, 0.8vw, 0.9rem)',
              color: !status.unlocked
                ? (isMinecraft ? '#888' : '#aaa')
                : status.allDone
                  ? (isMinecraft ? '#7CFC00' : '#27AE60')
                  : (isMinecraft ? '#ccc' : '#9B59B6'),
              fontWeight: '600',
            }}>
              {!status.unlocked
                ? (isMinecraft ? `VERROU.` : 'Verrouille')
                : status.allDone
                  ? (isMinecraft ? 'COMPLETE!' : 'Termine !')
                  : `${status.completed}/${status.total}`}
            </div>
          </div>
        )
      })}

      {/* ─── START / FINISH MARKERS ───────────────────────── */}
      <div style={{
        position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)',
        fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
        fontSize: isMinecraft ? 'clamp(0.45rem, 0.65vw, 0.8rem)' : 'clamp(0.75rem, 0.95vw, 1.1rem)',
        color: isMinecraft ? '#7CFC00' : '#9B59B6',
        textShadow: isMinecraft ? '1px 1px 2px rgba(0,0,0,0.6)' : 'none',
        opacity: 0.7, zIndex: 5, whiteSpace: 'nowrap',
        background: isMinecraft ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)',
        padding: isMinecraft ? '5px 14px' : '4px 14px',
        borderRadius: isMinecraft ? '4px' : '12px',
      }}>
        {isMinecraft ? 'DEPART' : 'Depart de l\'aventure'}
      </div>

      <div style={{
        position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 5, display: 'flex', alignItems: 'center', gap: '6px',
        fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
        fontSize: isMinecraft ? 'clamp(0.4rem, 0.6vw, 0.75rem)' : 'clamp(0.7rem, 0.9vw, 1rem)',
        color: isMinecraft ? '#FFD700' : '#9B59B6',
        textShadow: isMinecraft ? '1px 1px 2px rgba(0,0,0,0.6)' : 'none',
        background: isMinecraft ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)',
        padding: isMinecraft ? '5px 14px' : '4px 14px',
        borderRadius: isMinecraft ? '4px' : '12px',
      }}>
        {isMinecraft ? '🏴 BOSS FINAL' : '🏆 Arrivee'}
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

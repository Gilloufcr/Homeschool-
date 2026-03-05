import { useState, useEffect } from 'react'

// ═══════════════════════════════════════════════════════════════
// PIXEL ART CHARACTERS - Pure CSS pixel art using box-shadow
// ═══════════════════════════════════════════════════════════════

const PixelSteve = ({ size = 3, bouncing }) => {
  // 8x10 pixel grid for Steve's face+body
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
    // Hair row 1
    shadow(1,0,hair), shadow(2,0,hair), shadow(3,0,hair), shadow(4,0,hair), shadow(5,0,hair), shadow(6,0,hair),
    // Hair row 2
    shadow(0,1,hair), shadow(1,1,hair), shadow(2,1,hair), shadow(3,1,hair), shadow(4,1,hair), shadow(5,1,hair), shadow(6,1,hair), shadow(7,1,hair),
    // Face row 1 (eyes)
    shadow(0,2,hair), shadow(1,2,skin), shadow(2,2,eye), shadow(3,2,pupil), shadow(4,2,skin), shadow(5,2,pupil), shadow(6,2,eye), shadow(7,2,hair),
    // Face row 2 (nose)
    shadow(0,3,skin), shadow(1,3,skin), shadow(2,3,skin), shadow(3,3,skin), shadow(4,3,skin), shadow(5,3,skin), shadow(6,3,skin), shadow(7,3,skin),
    // Face row 3 (mouth)
    shadow(0,4,skin), shadow(1,4,skin), shadow(2,4,skin), shadow(3,4,mouth), shadow(4,4,mouth), shadow(5,4,skin), shadow(6,4,skin), shadow(7,4,skin),
    // Shirt row 1
    shadow(1,5,shirt), shadow(2,5,shirt), shadow(3,5,shirt), shadow(4,5,shirt), shadow(5,5,shirt), shadow(6,5,shirt),
    // Shirt row 2
    shadow(0,6,shirt), shadow(1,6,shirt), shadow(2,6,shirt), shadow(3,6,shirt), shadow(4,6,shirt), shadow(5,6,shirt), shadow(6,6,shirt), shadow(7,6,shirt),
    // Shirt row 3
    shadow(0,7,skin), shadow(1,7,shirt), shadow(2,7,shirt), shadow(3,7,shirt), shadow(4,7,shirt), shadow(5,7,shirt), shadow(6,7,shirt), shadow(7,7,skin),
    // Pants
    shadow(1,8,pants), shadow(2,8,pants), shadow(3,8,pants), shadow(4,8,pants), shadow(5,8,pants), shadow(6,8,pants),
    shadow(1,9,pants), shadow(2,9,pants), shadow(3,9,pants), shadow(4,9,pants), shadow(5,9,pants), shadow(6,9,pants),
    // Shoes
    shadow(0,10,shoe), shadow(1,10,shoe), shadow(2,10,shoe), shadow(5,10,shoe), shadow(6,10,shoe), shadow(7,10,shoe),
  ].join(',')

  return (
    <div style={{
      position: 'relative',
      width: `${8 * px}px`,
      height: `${11 * px}px`,
      transform: `translateY(${bouncing ? '-5px' : '0px'})`,
      transition: 'transform 0.3s ease',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${px}px`,
        height: `${px}px`,
        background: 'transparent',
        boxShadow: pixels,
        imageRendering: 'pixelated',
      }} />
    </div>
  )
}

const PixelButterfly = ({ size = 3, bouncing, frame }) => {
  const px = size
  const shadow = (x, y, color) => `${x * px}px ${y * px}px 0 0 ${color}`

  // Wings colors
  const w1 = '#FF69B4'
  const w2 = '#DA70D6'
  const w3 = '#FFB6C1'
  const body = '#4B0082'
  const eye = '#FFFFFF'
  const ant = '#8B008B'

  // Animated wing position (open/closed)
  const isOpen = frame

  const pixelsOpen = [
    // Antennae
    shadow(2,0,ant), shadow(5,0,ant),
    shadow(3,1,ant), shadow(4,1,ant),
    // Upper wings (open)
    shadow(0,2,w2), shadow(1,2,w1), shadow(2,2,w1), shadow(3,2,body), shadow(4,2,body), shadow(5,2,w1), shadow(6,2,w1), shadow(7,2,w2),
    shadow(0,3,w1), shadow(1,3,w3), shadow(2,3,w1), shadow(3,3,body), shadow(4,3,body), shadow(5,3,w1), shadow(6,3,w3), shadow(7,3,w1),
    shadow(0,4,w2), shadow(1,4,w1), shadow(2,4,w1), shadow(3,4,body), shadow(4,4,body), shadow(5,4,w1), shadow(6,4,w1), shadow(7,4,w2),
    // Body + eyes
    shadow(3,2,body), shadow(4,2,body),
    // Lower wings
    shadow(1,5,w2), shadow(2,5,w1), shadow(3,5,body), shadow(4,5,body), shadow(5,5,w1), shadow(6,5,w2),
    shadow(1,6,w1), shadow(2,6,w3), shadow(3,6,body), shadow(4,6,body), shadow(5,6,w3), shadow(6,6,w1),
    shadow(2,7,w2), shadow(3,7,body), shadow(4,7,body), shadow(5,7,w2),
  ].join(',')

  const pixelsClosed = [
    // Antennae
    shadow(3,0,ant), shadow(4,0,ant),
    shadow(3,1,ant), shadow(4,1,ant),
    // Wings folded up
    shadow(2,2,w2), shadow(3,2,body), shadow(4,2,body), shadow(5,2,w2),
    shadow(2,3,w1), shadow(3,3,body), shadow(4,3,body), shadow(5,3,w1),
    shadow(2,4,w1), shadow(3,4,body), shadow(4,4,body), shadow(5,4,w1),
    shadow(2,5,w2), shadow(3,5,body), shadow(4,5,body), shadow(5,5,w2),
    shadow(2,6,w3), shadow(3,6,body), shadow(4,6,body), shadow(5,6,w3),
    shadow(3,7,body), shadow(4,7,body),
  ].join(',')

  return (
    <div style={{
      position: 'relative',
      width: `${8 * px}px`,
      height: `${8 * px}px`,
      transform: `translateY(${bouncing ? '-8px' : '0px'})`,
      transition: 'transform 0.3s ease',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${px}px`,
        height: `${px}px`,
        background: 'transparent',
        boxShadow: isOpen ? pixelsOpen : pixelsClosed,
        transition: 'box-shadow 0.15s ease',
        imageRendering: 'pixelated',
      }} />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// PIXEL ART DECORATIONS for Minecraft theme
// ═══════════════════════════════════════════════════════════════

const PixelTree = ({ size = 2 }) => {
  const px = size
  const shadow = (x, y, color) => `${x * px}px ${y * px}px 0 0 ${color}`
  const leaves = '#2D8E2D'
  const leavesD = '#1E6B1E'
  const trunk = '#6B4226'

  const pixels = [
    shadow(1,0,leaves), shadow(2,0,leaves), shadow(3,0,leavesD),
    shadow(0,1,leaves), shadow(1,1,leaves), shadow(2,1,leavesD), shadow(3,1,leaves), shadow(4,1,leavesD),
    shadow(0,2,leavesD), shadow(1,2,leaves), shadow(2,2,leaves), shadow(3,2,leavesD), shadow(4,2,leaves),
    shadow(1,3,leavesD), shadow(2,3,leaves), shadow(3,3,leaves),
    shadow(2,4,trunk), shadow(2,5,trunk), shadow(2,6,trunk),
  ].join(',')

  return <div style={{
    width: `${px}px`, height: `${px}px`, background: 'transparent', boxShadow: pixels, imageRendering: 'pixelated',
  }} />
}

const PixelDiamond = ({ size = 2 }) => {
  const px = size
  const shadow = (x, y, color) => `${x * px}px ${y * px}px 0 0 ${color}`
  const d1 = '#4FFFFF'
  const d2 = '#00CED1'
  const d3 = '#008B8B'

  const pixels = [
    shadow(2,0,d1), shadow(3,0,d2),
    shadow(1,1,d1), shadow(2,1,d2), shadow(3,1,d1), shadow(4,1,d3),
    shadow(0,2,d2), shadow(1,2,d1), shadow(2,2,d3), shadow(3,2,d1), shadow(4,2,d2), shadow(5,2,d3),
    shadow(1,3,d3), shadow(2,3,d2), shadow(3,3,d3), shadow(4,3,d2),
    shadow(2,4,d3), shadow(3,4,d2),
  ].join(',')

  return <div style={{
    width: `${px}px`, height: `${px}px`, background: 'transparent', boxShadow: pixels, imageRendering: 'pixelated',
  }} />
}

const PixelRock = ({ size = 2 }) => {
  const px = size
  const shadow = (x, y, color) => `${x * px}px ${y * px}px 0 0 ${color}`
  const s1 = '#808080'
  const s2 = '#696969'
  const s3 = '#A9A9A9'

  const pixels = [
    shadow(1,0,s2), shadow(2,0,s1), shadow(3,0,s2),
    shadow(0,1,s1), shadow(1,1,s3), shadow(2,1,s1), shadow(3,1,s2), shadow(4,1,s1),
    shadow(0,2,s2), shadow(1,2,s1), shadow(2,2,s2), shadow(3,2,s3), shadow(4,2,s2),
    shadow(1,3,s2), shadow(2,3,s1), shadow(3,3,s2),
  ].join(',')

  return <div style={{
    width: `${px}px`, height: `${px}px`, background: 'transparent', boxShadow: pixels, imageRendering: 'pixelated',
  }} />
}

// ═══════════════════════════════════════════════════════════════
// MAIN LEVEL MAP COMPONENT
// ═══════════════════════════════════════════════════════════════

const LevelMap = ({ levels, theme, playerLevel, completedExercises, onSelectLevel }) => {
  const isMinecraft = theme === 'minecraft'
  const [characterPos, setCharacterPos] = useState({ x: 0, y: 0 })
  const [bouncing, setBouncing] = useState(true)
  const [wingFrame, setWingFrame] = useState(true)

  const getLevelStatus = (level) => {
    const exerciseIds = level.exercises.map(e => e.id)
    const completed = exerciseIds.filter(id => completedExercises.includes(id)).length
    const total = exerciseIds.length
    const unlocked = playerLevel >= level.minLevel
    return { completed, total, unlocked, allDone: completed === total }
  }

  const currentLevelIdx = (() => {
    for (let i = levels.length - 1; i >= 0; i--) {
      const s = getLevelStatus(levels[i])
      if (s.unlocked && s.allDone) return Math.min(i + 1, levels.length - 1)
    }
    return 0
  })()

  const getNodePosition = (idx, total) => {
    const ySpacing = 130
    const baseY = (total - 1 - idx) * ySpacing + 70
    const xOffset = idx % 2 === 0 ? 28 : 72
    return { x: xOffset, y: baseY }
  }

  const totalHeight = levels.length * 130 + 80

  useEffect(() => {
    const pos = getNodePosition(currentLevelIdx, levels.length)
    setCharacterPos({ x: pos.x, y: pos.y })
  }, [currentLevelIdx, levels.length])

  useEffect(() => {
    const interval = setInterval(() => setBouncing(b => !b), 500)
    return () => clearInterval(interval)
  }, [])

  // Wing flap animation for butterfly
  useEffect(() => {
    if (!isMinecraft) {
      const interval = setInterval(() => setWingFrame(f => !f), 300)
      return () => clearInterval(interval)
    }
  }, [isMinecraft])

  // Minecraft node icons as pixel blocks
  const mcNodeIcons = ['⛏️', '🔨', '🗡️', '🌀', '🏰']
  const fairyNodeIcons = ['🌸', '🌈', '🦋', '✨', '👑']

  // ─── MINECRAFT BACKGROUND BLOCKS ──────────────────────────
  const McBlock = ({ x, y, type }) => {
    const colors = {
      grass: { top: '#5DA83A', bottom: '#8B6914' },
      dirt: { top: '#8B6914', bottom: '#6B4F12' },
      stone: { top: '#808080', bottom: '#696969' },
      sand: { top: '#E8D5A3', bottom: '#C4B078' },
      water: { top: '#3D7ACA', bottom: '#2B5C9E' },
    }
    const c = colors[type] || colors.dirt
    return (
      <div style={{
        position: 'absolute', left: x, top: y,
        width: '16px', height: '16px',
        background: `linear-gradient(180deg, ${c.top} 0%, ${c.bottom} 100%)`,
        border: '1px solid rgba(0,0,0,0.2)',
        imageRendering: 'pixelated',
        opacity: 0.5,
        zIndex: 0,
      }} />
    )
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: `${totalHeight}px`,
      background: isMinecraft
        ? '#87CEEB'
        : 'linear-gradient(180deg, #FFF5F9 0%, #F0E6FF 30%, #E6F3FF 60%, #F5E6FF 100%)',
      borderRadius: isMinecraft ? '0' : '24px',
      border: isMinecraft ? '4px outset #555' : '2px solid rgba(155,89,182,0.15)',
      overflow: 'hidden',
      boxShadow: isMinecraft
        ? 'inset 0 0 0 2px #333'
        : '0 5px 30px rgba(155,89,182,0.1)',
      imageRendering: isMinecraft ? 'pixelated' : 'auto',
    }}>

      {/* ─── MINECRAFT: Pixel terrain background ────────── */}
      {isMinecraft && (
        <>
          {/* Grass ground layer at bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
            background: 'repeating-linear-gradient(0deg, #6B4F12 0px, #6B4F12 16px, #8B6914 16px, #8B6914 32px)',
            borderTop: '4px solid #5DA83A',
            imageRendering: 'pixelated',
            zIndex: 0, opacity: 0.4,
          }} />
          {/* Mid grass */}
          <div style={{
            position: 'absolute', bottom: '30%', left: 0, right: 0, height: '25%',
            background: 'repeating-linear-gradient(0deg, #5DA83A 0px, #5DA83A 16px, #4C8B31 16px, #4C8B31 32px)',
            imageRendering: 'pixelated',
            zIndex: 0, opacity: 0.3,
          }} />
          {/* Pixel grid overlay */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            zIndex: 1, pointerEvents: 'none',
          }} />
          {/* Pixel decorations */}
          <div style={{ position: 'absolute', left: '8%', top: '12%', zIndex: 1, opacity: 0.8 }}><PixelTree size={3} /></div>
          <div style={{ position: 'absolute', right: '10%', top: '22%', zIndex: 1, opacity: 0.8 }}><PixelTree size={2} /></div>
          <div style={{ position: 'absolute', left: '5%', top: '50%', zIndex: 1, opacity: 0.8 }}><PixelTree size={3} /></div>
          <div style={{ position: 'absolute', right: '8%', top: '60%', zIndex: 1, opacity: 0.7 }}><PixelRock size={3} /></div>
          <div style={{ position: 'absolute', left: '10%', top: '80%', zIndex: 1, opacity: 0.9 }}><PixelDiamond size={3} /></div>
          <div style={{ position: 'absolute', right: '5%', top: '85%', zIndex: 1, opacity: 0.8 }}><PixelTree size={2} /></div>
          <div style={{ position: 'absolute', left: '3%', top: '35%', zIndex: 1, opacity: 0.7 }}><PixelRock size={2} /></div>
          <div style={{ position: 'absolute', right: '12%', top: '45%', zIndex: 1, opacity: 0.9 }}><PixelDiamond size={2} /></div>
          {/* Clouds */}
          {[15, 40, 70].map((left, i) => (
            <div key={`cloud-${i}`} style={{
              position: 'absolute', left: `${left}%`, top: `${3 + i * 4}%`,
              width: '40px', height: '16px',
              background: '#fff', borderRadius: '0',
              boxShadow: '4px 0 0 #fff, -4px 0 0 #fff, 0 -4px 0 #fff, 4px -4px 0 #fff, -4px -4px 0 #fff',
              opacity: 0.6, zIndex: 1, imageRendering: 'pixelated',
            }} />
          ))}
        </>
      )}

      {/* ─── FAIRY: Soft decorations ─────────────────────── */}
      {!isMinecraft && (
        <>
          {[
            { emoji: '🌷', x: '8%', y: '15%', size: '1.3rem' },
            { emoji: '☁️', x: '82%', y: '6%', size: '2rem' },
            { emoji: '🌻', x: '88%', y: '24%', size: '1.2rem' },
            { emoji: '🍄', x: '5%', y: '42%', size: '1.3rem' },
            { emoji: '☁️', x: '15%', y: '32%', size: '1.5rem' },
            { emoji: '🌼', x: '90%', y: '55%', size: '1.1rem' },
            { emoji: '🌺', x: '7%', y: '68%', size: '1.2rem' },
            { emoji: '🏡', x: '86%', y: '82%', size: '1.5rem' },
            { emoji: '🌈', x: '50%', y: '3%', size: '2.5rem' },
          ].map((d, i) => (
            <div key={`deco-${i}`} style={{
              position: 'absolute', left: d.x, top: d.y,
              fontSize: d.size, opacity: 0.6, pointerEvents: 'none', zIndex: 1,
            }}>{d.emoji}</div>
          ))}
        </>
      )}

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

          const status = getLevelStatus(level)
          const prevStatus = getLevelStatus(levels[idx - 1])

          // Minecraft: blocky straight segments, Fairy: smooth curves
          const pathD = isMinecraft
            ? `M ${fromX} ${from.y} L ${(fromX + toX) / 2} ${midY} L ${toX} ${to.y}`
            : `M ${fromX} ${from.y} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${to.y}`

          return (
            <g key={`path-${idx}`}>
              {/* Path border/shadow */}
              <path d={pathD} fill="none"
                stroke={isMinecraft ? '#5D4E37' : '#D4B8E8'}
                strokeWidth={isMinecraft ? '16' : '18'}
                strokeLinecap={isMinecraft ? 'butt' : 'round'}
                opacity="0.5"
              />
              {/* Main path */}
              <path d={pathD} fill="none"
                stroke={prevStatus.allDone
                  ? (isMinecraft ? '#A0522D' : '#C9A0DC')
                  : (isMinecraft ? '#8B7355' : '#E8D5F5')}
                strokeWidth={isMinecraft ? '10' : '12'}
                strokeLinecap={isMinecraft ? 'butt' : 'round'}
                strokeDasharray={status.unlocked ? (isMinecraft ? '10 4' : 'none') : '8 8'}
                opacity={status.unlocked ? 1 : 0.4}
              />
              {/* Dots/blocks along path */}
              {[0.25, 0.5, 0.75].map((t) => {
                const cx = fromX + (toX - fromX) * t
                const cy = from.y + (to.y - from.y) * t
                return isMinecraft ? (
                  <rect key={t} x={cx - 3} y={cy - 3} width="6" height="6"
                    fill={status.unlocked ? '#FFD700' : '#555'}
                    opacity={status.unlocked ? 0.8 : 0.3}
                  />
                ) : (
                  <circle key={t} cx={cx} cy={cy} r="3"
                    fill={status.unlocked ? '#DDA0DD' : '#ccc'}
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
        const status = getLevelStatus(level)
        const pos = getNodePosition(idx, levels.length)
        const pct = status.total > 0 ? Math.round((status.completed / status.total) * 100) : 0
        const isCurrentLevel = idx === currentLevelIdx
        const name = isMinecraft ? level.nameMinecraft : level.nameLalilo
        const nodeSize = isCurrentLevel ? 64 : 54

        return (
          <div key={level.id} style={{
            position: 'absolute',
            left: `${pos.x}%`, top: `${pos.y}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            cursor: status.unlocked ? 'pointer' : 'default',
            textAlign: 'center',
          }}
          onClick={() => status.unlocked && onSelectLevel(level)}>

            {/* Node */}
            <div style={{
              width: `${nodeSize}px`, height: `${nodeSize}px`,
              borderRadius: isMinecraft ? '0' : '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: isCurrentLevel ? '1.6rem' : '1.3rem',
              background: !status.unlocked
                ? (isMinecraft ? '#4A4A4A' : 'rgba(200,200,200,0.8)')
                : status.allDone
                  ? (isMinecraft ? '#4CAF50' : 'linear-gradient(135deg, #2ECC71, #27AE60)')
                  : isCurrentLevel
                    ? (isMinecraft ? '#FFD700' : 'linear-gradient(135deg, #FF69B4, #E91E93)')
                    : (isMinecraft ? '#8B6914' : 'linear-gradient(135deg, #DDA0DD, #BA55D3)'),
              border: isMinecraft
                ? `3px outset ${isCurrentLevel ? '#FFD700' : status.allDone ? '#4CAF50' : '#666'}`
                : `3px solid ${isCurrentLevel ? '#FF69B4' : status.allDone ? '#2ECC71' : 'rgba(155,89,182,0.3)'}`,
              boxShadow: isCurrentLevel
                ? (isMinecraft
                  ? '0 0 15px rgba(255,215,0,0.7), inset 0 0 8px rgba(255,255,255,0.2)'
                  : '0 0 20px rgba(255,105,180,0.5), 0 4px 15px rgba(155,89,182,0.2)')
                : status.unlocked
                  ? (isMinecraft ? 'inset 0 -2px 4px rgba(0,0,0,0.3)' : '0 3px 10px rgba(0,0,0,0.15)')
                  : 'none',
              transition: 'all 0.3s ease',
              animation: isCurrentLevel ? 'nodePulse 2s ease-in-out infinite' : 'none',
              margin: '0 auto',
              imageRendering: isMinecraft ? 'pixelated' : 'auto',
            }}>
              {!status.unlocked
                ? (isMinecraft ? '🔒' : '🔒')
                : status.allDone
                  ? '⭐'
                  : (isMinecraft ? mcNodeIcons : fairyNodeIcons)[idx % 5]}
            </div>

            {/* Progress ring (fairy only) / progress bar (minecraft) */}
            {status.unlocked && !status.allDone && pct > 0 && (
              isMinecraft ? (
                <div style={{
                  width: `${nodeSize}px`, height: '6px',
                  background: '#333', margin: '4px auto 0',
                  border: '1px solid #555',
                }}>
                  <div style={{
                    width: `${pct}%`, height: '100%',
                    background: '#7CFC00',
                    imageRendering: 'pixelated',
                  }} />
                </div>
              ) : (
                <svg style={{
                  position: 'absolute',
                  top: isCurrentLevel ? '-5px' : '0px',
                  left: '50%', transform: 'translateX(-50%)',
                  width: `${nodeSize + 16}px`, height: `${nodeSize + 16}px`,
                  pointerEvents: 'none',
                }}>
                  <circle
                    cx={(nodeSize + 16) / 2} cy={(nodeSize + 16) / 2}
                    r={(nodeSize + 8) / 2}
                    fill="none" stroke="#FF69B4" strokeWidth="3"
                    strokeDasharray={`${pct * 2.2} ${220 - pct * 2.2}`}
                    strokeDashoffset="55" strokeLinecap="round" opacity="0.8"
                  />
                </svg>
              )
            )}

            {/* Label */}
            <div style={{
              marginTop: '5px',
              fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
              fontSize: isMinecraft ? '0.4rem' : '0.7rem',
              fontWeight: '700',
              color: isMinecraft ? '#FFD700' : '#6B3FA0',
              textShadow: isMinecraft ? '1px 1px 0 #000' : '0 1px 3px rgba(255,255,255,0.8)',
              maxWidth: '120px', lineHeight: '1.3',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {name}
            </div>

            {/* Score */}
            <div style={{
              marginTop: '2px',
              fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
              fontSize: isMinecraft ? '0.35rem' : '0.65rem',
              color: !status.unlocked
                ? (isMinecraft ? '#555' : '#aaa')
                : status.allDone
                  ? (isMinecraft ? '#7CFC00' : '#27AE60')
                  : (isMinecraft ? '#aaa' : '#9B59B6'),
              fontWeight: '600',
            }}>
              {!status.unlocked
                ? (isMinecraft ? `LV${level.minLevel}` : `Niv.${level.minLevel}`)
                : status.allDone
                  ? (isMinecraft ? 'COMPLETE!' : 'Termine !')
                  : `${status.completed}/${status.total}`}
            </div>
          </div>
        )
      })}

      {/* ─── ANIMATED CHARACTER ────────────────────────────── */}
      <div style={{
        position: 'absolute',
        left: `${characterPos.x}%`,
        top: `${characterPos.y - 52}px`,
        transform: 'translate(-50%, 0)',
        transition: 'left 0.8s ease-in-out, top 0.8s ease-in-out',
        zIndex: 20,
        pointerEvents: 'none',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* Name tag */}
        <div style={{
          fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
          fontSize: isMinecraft ? '0.3rem' : '0.55rem',
          color: isMinecraft ? '#fff' : '#9B59B6',
          textShadow: isMinecraft ? '1px 1px 0 #000' : 'none',
          marginBottom: '3px',
          background: isMinecraft ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)',
          padding: isMinecraft ? '2px 4px' : '1px 6px',
          borderRadius: isMinecraft ? '0' : '8px',
          whiteSpace: 'nowrap',
        }}>
          {isMinecraft ? 'STEVE' : 'Fifi'}
        </div>
        {isMinecraft
          ? <PixelSteve size={3} bouncing={bouncing} />
          : <PixelButterfly size={3} bouncing={bouncing} frame={wingFrame} />
        }
      </div>

      {/* ─── START / FINISH MARKERS ───────────────────────── */}
      <div style={{
        position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)',
        fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
        fontSize: isMinecraft ? '0.45rem' : '0.75rem',
        color: isMinecraft ? '#7CFC00' : '#9B59B6',
        textShadow: isMinecraft ? '1px 1px 0 #000' : 'none',
        opacity: 0.7, zIndex: 5, whiteSpace: 'nowrap',
        background: isMinecraft ? 'rgba(0,0,0,0.4)' : 'none',
        padding: isMinecraft ? '3px 8px' : '0',
      }}>
        {isMinecraft ? '[ DEPART ]' : 'Depart de l\'aventure'}
      </div>

      <div style={{
        position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 5, display: 'flex', alignItems: 'center', gap: '4px',
        fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
        fontSize: isMinecraft ? '0.4rem' : '0.7rem',
        color: isMinecraft ? '#FFD700' : '#9B59B6',
        textShadow: isMinecraft ? '1px 1px 0 #000' : 'none',
        background: isMinecraft ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)',
        padding: isMinecraft ? '3px 8px' : '2px 10px',
        borderRadius: isMinecraft ? '0' : '12px',
      }}>
        {isMinecraft ? '🏴 BOSS' : '🏆 Arrivee'}
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

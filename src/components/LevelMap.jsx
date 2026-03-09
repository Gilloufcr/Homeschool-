import { useState, useEffect } from 'react'

// ═══════════════════════════════════════════════════════════════
// PIXEL STEVE - The one and only (DO NOT TOUCH)
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
// LANDSCAPE BACKGROUNDS (SVG-based scenery)
// ═══════════════════════════════════════════════════════════════

const MinecraftLandscape = ({ height }) => (
  <svg
    viewBox={`0 0 800 ${height}`}
    preserveAspectRatio="xMidYMid slice"
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
  >
    <defs>
      {/* Sky gradient */}
      <linearGradient id="mcSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4A90D9" />
        <stop offset="35%" stopColor="#87CEEB" />
        <stop offset="60%" stopColor="#A8E4A0" />
        <stop offset="100%" stopColor="#5B8C3E" />
      </linearGradient>
      {/* Sun glow */}
      <radialGradient id="sunGlow" cx="85%" cy="8%" r="12%">
        <stop offset="0%" stopColor="#FFE066" stopOpacity="1" />
        <stop offset="50%" stopColor="#FFD700" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
      </radialGradient>
      {/* Grass texture pattern */}
      <linearGradient id="grassDark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6AAF50" />
        <stop offset="100%" stopColor="#4A8C3F" />
      </linearGradient>
      <linearGradient id="dirtLayer" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8B6914" />
        <stop offset="100%" stopColor="#6B4F1A" />
      </linearGradient>
      <linearGradient id="stoneLayer" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#808080" />
        <stop offset="100%" stopColor="#606060" />
      </linearGradient>
    </defs>

    {/* Sky background */}
    <rect width="800" height={height} fill="url(#mcSky)" />
    <rect width="800" height={height} fill="url(#sunGlow)" />

    {/* Sun */}
    <circle cx="680" cy={Math.min(60, height * 0.06)} r="30" fill="#FFE066" opacity="0.9" />
    <circle cx="680" cy={Math.min(60, height * 0.06)} r="40" fill="#FFD700" opacity="0.2" />

    {/* Clouds */}
    {[
      { x: 80, y: Math.min(40, height * 0.04), s: 1 },
      { x: 300, y: Math.min(70, height * 0.07), s: 0.8 },
      { x: 550, y: Math.min(30, height * 0.03), s: 1.2 },
      { x: 700, y: Math.min(90, height * 0.09), s: 0.7 },
      { x: 150, y: Math.min(height * 0.15, 150), s: 0.9 },
    ].map((c, i) => (
      <g key={`cloud-${i}`} opacity="0.85" transform={`translate(${c.x}, ${c.y}) scale(${c.s})`}>
        <ellipse cx="0" cy="0" rx="40" ry="16" fill="white" />
        <ellipse cx="-25" cy="4" rx="25" ry="12" fill="white" />
        <ellipse cx="25" cy="4" rx="28" ry="14" fill="white" />
        <ellipse cx="0" cy="8" rx="35" ry="10" fill="white" />
      </g>
    ))}

    {/* Far mountains/hills */}
    <path d={`M0,${height * 0.35} Q100,${height * 0.22} 200,${height * 0.3} T400,${height * 0.25} T600,${height * 0.32} T800,${height * 0.28} L800,${height * 0.45} L0,${height * 0.45} Z`}
      fill="#6B9E4F" opacity="0.5" />
    <path d={`M0,${height * 0.4} Q150,${height * 0.3} 250,${height * 0.38} T500,${height * 0.33} T750,${height * 0.36} L800,${height * 0.5} L0,${height * 0.5} Z`}
      fill="#5D8E42" opacity="0.6" />

    {/* Rolling green hills (main terrain) */}
    <path d={`M0,${height * 0.55} Q100,${height * 0.48} 200,${height * 0.52} Q350,${height * 0.44} 500,${height * 0.5} Q650,${height * 0.46} 800,${height * 0.53} L800,${height} L0,${height} Z`}
      fill="url(#grassDark)" />

    {/* Grass highlight strip */}
    <path d={`M0,${height * 0.55} Q100,${height * 0.48} 200,${height * 0.52} Q350,${height * 0.44} 500,${height * 0.5} Q650,${height * 0.46} 800,${height * 0.53} L800,${height * 0.58} Q650,${height * 0.51} 500,${height * 0.55} Q350,${height * 0.49} 200,${height * 0.57} Q100,${height * 0.53} 0,${height * 0.6} Z`}
      fill="#7CC462" opacity="0.6" />

    {/* Dirt layer */}
    <rect x="0" y={height * 0.75} width="800" height={height * 0.12} fill="url(#dirtLayer)" />

    {/* Stone layer */}
    <rect x="0" y={height * 0.87} width="800" height={height * 0.13} fill="url(#stoneLayer)" />

    {/* Stone texture lines */}
    {[0.88, 0.91, 0.94, 0.97].map((y, i) => (
      <line key={`stone-${i}`} x1={i * 100 + 50} y1={height * y} x2={i * 100 + 250} y2={height * y}
        stroke="#555" strokeWidth="1" opacity="0.3" />
    ))}

    {/* Diamond ore sparkles in stone */}
    {[
      { x: 120, y: height * 0.92 }, { x: 450, y: height * 0.95 },
      { x: 650, y: height * 0.9 }, { x: 300, y: height * 0.93 },
    ].map((d, i) => (
      <g key={`dia-${i}`}>
        <rect x={d.x} y={d.y} width="8" height="8" fill="#4FC3F7" opacity="0.7" rx="1" />
        <rect x={d.x + 2} y={d.y + 2} width="4" height="4" fill="#B3E5FC" opacity="0.9" rx="1" />
      </g>
    ))}

    {/* Trees on hills */}
    {[
      { x: 40, y: height * 0.5, s: 1.2 },
      { x: 120, y: height * 0.47, s: 1 },
      { x: 700, y: height * 0.48, s: 1.3 },
      { x: 760, y: height * 0.51, s: 0.9 },
      { x: 30, y: height * 0.65, s: 1.1 },
      { x: 770, y: height * 0.68, s: 1.0 },
      { x: 55, y: height * 0.78, s: 0.8 },
      { x: 745, y: height * 0.8, s: 0.9 },
    ].map((t, i) => (
      <g key={`tree-${i}`} transform={`translate(${t.x}, ${t.y}) scale(${t.s})`}>
        {/* Trunk */}
        <rect x="-4" y="-5" width="8" height="20" fill="#6B4226" rx="2" />
        {/* Leaves */}
        <ellipse cx="0" cy="-18" rx="18" ry="16" fill="#2E7D32" />
        <ellipse cx="-8" cy="-12" rx="12" ry="10" fill="#388E3C" />
        <ellipse cx="8" cy="-12" rx="12" ry="10" fill="#388E3C" />
        <ellipse cx="0" cy="-25" rx="10" ry="8" fill="#43A047" />
      </g>
    ))}

    {/* Flowers on grass */}
    {[
      { x: 90, y: height * 0.54, c: '#FF6B6B' },
      { x: 180, y: height * 0.56, c: '#FFD93D' },
      { x: 620, y: height * 0.52, c: '#FF6B6B' },
      { x: 720, y: height * 0.55, c: '#C084FC' },
      { x: 60, y: height * 0.62, c: '#FFD93D' },
      { x: 740, y: height * 0.63, c: '#FF6B6B' },
    ].map((f, i) => (
      <g key={`flower-${i}`}>
        <line x1={f.x} y1={f.y} x2={f.x} y2={f.y + 10} stroke="#4CAF50" strokeWidth="2" />
        <circle cx={f.x} cy={f.y} r="4" fill={f.c} />
        <circle cx={f.x} cy={f.y} r="2" fill="#FFE082" />
      </g>
    ))}

    {/* Lava pool glow at bottom */}
    <ellipse cx="400" cy={height - 8} rx="60" ry="8" fill="#FF6600" opacity="0.3" />
    <ellipse cx="400" cy={height - 8} rx="30" ry="5" fill="#FF9900" opacity="0.4" />
  </svg>
)

const FairyLandscape = ({ height }) => (
  <svg
    viewBox={`0 0 800 ${height}`}
    preserveAspectRatio="xMidYMid slice"
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
  >
    <defs>
      {/* Dreamy sky */}
      <linearGradient id="fairySky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E8D5F5" />
        <stop offset="25%" stopColor="#F0E6FF" />
        <stop offset="50%" stopColor="#E6F3FF" />
        <stop offset="75%" stopColor="#D4F5D4" />
        <stop offset="100%" stopColor="#C8F0C8" />
      </linearGradient>
      {/* Rainbow gradient */}
      <linearGradient id="rainbow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FF6B6B" />
        <stop offset="17%" stopColor="#FFA07A" />
        <stop offset="33%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#7CFC00" />
        <stop offset="67%" stopColor="#00CED1" />
        <stop offset="83%" stopColor="#9B59B6" />
        <stop offset="100%" stopColor="#FF69B4" />
      </linearGradient>
      <linearGradient id="rainbow2" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FF69B4" stopOpacity="0.6" />
        <stop offset="17%" stopColor="#FF6B6B" stopOpacity="0.6" />
        <stop offset="33%" stopColor="#FFD700" stopOpacity="0.6" />
        <stop offset="50%" stopColor="#7CFC00" stopOpacity="0.6" />
        <stop offset="67%" stopColor="#00CED1" stopOpacity="0.6" />
        <stop offset="83%" stopColor="#9B59B6" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#FF69B4" stopOpacity="0.6" />
      </linearGradient>
      {/* Sparkle */}
      <radialGradient id="sparkle">
        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Sky */}
    <rect width="800" height={height} fill="url(#fairySky)" />

    {/* Big rainbow arc */}
    <path d={`M 50,${height * 0.25} Q 400,${-height * 0.15} 750,${height * 0.25}`}
      fill="none" stroke="url(#rainbow)" strokeWidth="14" opacity="0.35" strokeLinecap="round" />
    <path d={`M 60,${height * 0.25} Q 400,${-height * 0.12} 740,${height * 0.25}`}
      fill="none" stroke="url(#rainbow2)" strokeWidth="8" opacity="0.25" strokeLinecap="round" />

    {/* Soft clouds */}
    {[
      { x: 100, y: height * 0.08, s: 1.3 },
      { x: 350, y: height * 0.05, s: 1 },
      { x: 600, y: height * 0.1, s: 1.5 },
      { x: 200, y: height * 0.18, s: 0.8 },
      { x: 700, y: height * 0.15, s: 1.1 },
    ].map((c, i) => (
      <g key={`fc-${i}`} opacity="0.6" transform={`translate(${c.x}, ${c.y}) scale(${c.s})`}>
        <ellipse cx="0" cy="0" rx="45" ry="18" fill="white" />
        <ellipse cx="-28" cy="5" rx="28" ry="14" fill="white" />
        <ellipse cx="28" cy="5" rx="30" ry="16" fill="white" />
        <ellipse cx="0" cy="10" rx="38" ry="12" fill="white" />
      </g>
    ))}

    {/* Rolling meadow hills */}
    <path d={`M0,${height * 0.5} Q100,${height * 0.42} 200,${height * 0.48} Q350,${height * 0.38} 500,${height * 0.45} Q650,${height * 0.4} 800,${height * 0.47} L800,${height} L0,${height} Z`}
      fill="#A8E6A0" />
    <path d={`M0,${height * 0.55} Q150,${height * 0.5} 300,${height * 0.54} Q450,${height * 0.47} 600,${height * 0.52} Q750,${height * 0.48} 800,${height * 0.55} L800,${height} L0,${height} Z`}
      fill="#90D890" opacity="0.7" />
    {/* Lighter grass highlight */}
    <path d={`M0,${height * 0.58} Q200,${height * 0.53} 400,${height * 0.57} Q600,${height * 0.52} 800,${height * 0.58} L800,${height * 0.65} Q600,${height * 0.6} 400,${height * 0.64} Q200,${height * 0.6} 0,${height * 0.65} Z`}
      fill="#B8F0B0" opacity="0.4" />

    {/* Flowers scattered on meadow */}
    {[
      { x: 60, y: height * 0.54, c: '#FF69B4', r: 5 },
      { x: 140, y: height * 0.52, c: '#FFD700', r: 4 },
      { x: 230, y: height * 0.56, c: '#DDA0DD', r: 5 },
      { x: 350, y: height * 0.5, c: '#FF69B4', r: 4 },
      { x: 470, y: height * 0.53, c: '#87CEEB', r: 5 },
      { x: 560, y: height * 0.49, c: '#FFD700', r: 4 },
      { x: 650, y: height * 0.55, c: '#FF69B4', r: 5 },
      { x: 730, y: height * 0.51, c: '#DDA0DD', r: 4 },
      { x: 80, y: height * 0.63, c: '#FFD700', r: 3 },
      { x: 720, y: height * 0.62, c: '#FF69B4', r: 4 },
      { x: 50, y: height * 0.72, c: '#DDA0DD', r: 3 },
      { x: 750, y: height * 0.73, c: '#87CEEB', r: 4 },
    ].map((f, i) => (
      <g key={`ff-${i}`}>
        <line x1={f.x} y1={f.y} x2={f.x} y2={f.y + 12} stroke="#6DB86D" strokeWidth="2" />
        {/* Petals */}
        {[0, 72, 144, 216, 288].map((a, j) => (
          <circle key={j}
            cx={f.x + Math.cos(a * Math.PI / 180) * f.r * 0.7}
            cy={f.y + Math.sin(a * Math.PI / 180) * f.r * 0.7}
            r={f.r * 0.55} fill={f.c} opacity="0.8" />
        ))}
        <circle cx={f.x} cy={f.y} r={f.r * 0.4} fill="#FFE082" />
      </g>
    ))}

    {/* Unicorns as emoji (foreignObject for proper emoji rendering) */}
    <foreignObject x="35" y={height * 0.36} width="80" height="80">
      <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontSize: '3rem', textAlign: 'center', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>🦄</div>
    </foreignObject>
    <foreignObject x="700" y={height * 0.38} width="80" height="80">
      <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontSize: '2.5rem', textAlign: 'center', transform: 'scaleX(-1)', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>🦄</div>
    </foreignObject>

    {/* Sparkles around unicorns */}
    {[
      { x: 45, y: height * 0.34 }, { x: 100, y: height * 0.33 },
      { x: 720, y: height * 0.35 }, { x: 770, y: height * 0.36 },
    ].map((s, i) => (
      <circle key={`usp-${i}`} cx={s.x} cy={s.y} r="3" fill="url(#sparkle)" />
    ))}

    {/* Butterflies */}
    {[
      { x: 180, y: height * 0.3, c: '#FF69B4' },
      { x: 620, y: height * 0.25, c: '#DDA0DD' },
      { x: 400, y: height * 0.35, c: '#87CEEB' },
    ].map((b, i) => (
      <g key={`bf-${i}`} transform={`translate(${b.x}, ${b.y})`} opacity="0.6">
        <ellipse cx="-6" cy="-3" rx="6" ry="4" fill={b.c} />
        <ellipse cx="6" cy="-3" rx="6" ry="4" fill={b.c} />
        <ellipse cx="-4" cy="2" rx="4" ry="3" fill={b.c} opacity="0.7" />
        <ellipse cx="4" cy="2" rx="4" ry="3" fill={b.c} opacity="0.7" />
        <rect x="-1" y="-4" width="2" height="10" fill="#333" rx="1" />
      </g>
    ))}

    {/* Sparkle stars scattered */}
    {[
      { x: 100, y: height * 0.12 }, { x: 300, y: height * 0.08 },
      { x: 500, y: height * 0.14 }, { x: 700, y: height * 0.06 },
      { x: 250, y: height * 0.22 }, { x: 550, y: height * 0.2 },
    ].map((s, i) => (
      <g key={`star-${i}`} opacity="0.4">
        <line x1={s.x - 5} y1={s.y} x2={s.x + 5} y2={s.y} stroke="#FFD700" strokeWidth="1.5" />
        <line x1={s.x} y1={s.y - 5} x2={s.x} y2={s.y + 5} stroke="#FFD700" strokeWidth="1.5" />
        <line x1={s.x - 3} y1={s.y - 3} x2={s.x + 3} y2={s.y + 3} stroke="#FFD700" strokeWidth="1" />
        <line x1={s.x + 3} y1={s.y - 3} x2={s.x - 3} y2={s.y + 3} stroke="#FFD700" strokeWidth="1" />
      </g>
    ))}

    {/* Little mushroom houses */}
    <g transform={`translate(740, ${height * 0.58})`}>
      <rect x="-5" y="0" width="10" height="12" fill="#F5F5DC" rx="2" />
      <ellipse cx="0" cy="-2" rx="14" ry="10" fill="#FF6B6B" />
      <circle cx="-5" cy="-5" r="3" fill="white" opacity="0.7" />
      <circle cx="5" cy="-2" r="2" fill="white" opacity="0.7" />
      <rect x="-2" y="5" width="4" height="6" fill="#8B6914" rx="1" />
    </g>
    <g transform={`translate(55, ${height * 0.6}) scale(0.7)`}>
      <rect x="-5" y="0" width="10" height="12" fill="#F5F5DC" rx="2" />
      <ellipse cx="0" cy="-2" rx="14" ry="10" fill="#DDA0DD" />
      <circle cx="-5" cy="-5" r="3" fill="white" opacity="0.7" />
      <circle cx="5" cy="-2" r="2" fill="white" opacity="0.7" />
      <rect x="-2" y="5" width="4" height="6" fill="#8B6914" rx="1" />
    </g>
  </svg>
)

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

  // Font family - modern for both themes now
  const fontMain = "'Quicksand', 'Nunito', sans-serif"

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: `${totalHeight}px`,
      borderRadius: isMinecraft ? '12px' : '24px',
      border: isMinecraft ? '3px solid #5D4E37' : '2px solid rgba(155,89,182,0.15)',
      overflow: 'hidden',
      boxShadow: isMinecraft
        ? '0 6px 30px rgba(0,0,0,0.4), inset 0 0 80px rgba(0,0,0,0.05)'
        : '0 5px 30px rgba(155,89,182,0.1)',
    }}>

      {/* ─── LANDSCAPE BACKGROUND ────────────────────────── */}
      {isMinecraft
        ? <MinecraftLandscape height={totalHeight} />
        : <FairyLandscape height={totalHeight} />
      }

      {/* ─── SVG PATH ─────────────────────────────────────── */}
      <svg
        viewBox={`0 0 400 ${totalHeight}`}
        preserveAspectRatio="none"
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          zIndex: 2, pointerEvents: 'none',
        }}
      >
        <defs>
          <linearGradient id="pathGoldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#C8A76C" />
          </linearGradient>
          <linearGradient id="pathFairyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DDA0DD" />
            <stop offset="100%" stopColor="#C9A0DC" />
          </linearGradient>
        </defs>
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
                strokeWidth="22"
                strokeLinecap="round"
                opacity="0.25"
              />
              {/* Main path */}
              <path d={pathD} fill="none"
                stroke={prevStatus.allDone
                  ? (isMinecraft ? 'url(#pathGoldGrad)' : 'url(#pathFairyGrad)')
                  : (isMinecraft ? '#8B7355' : '#E8D5F5')}
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={status.unlocked ? 'none' : '10 10'}
                opacity={status.unlocked ? 1 : 0.4}
              />
              {/* Dots along path */}
              {[0.2, 0.4, 0.6, 0.8].map((t) => {
                const cx = fromX + (toX - fromX) * t
                const cy = from.y + (to.y - from.y) * t
                return (
                  <circle key={t} cx={cx} cy={cy}
                    r={isMinecraft ? '5' : '4'}
                    fill={status.unlocked
                      ? (isMinecraft ? '#FFD700' : '#DDA0DD')
                      : (isMinecraft ? '#555' : '#ccc')}
                    opacity={status.unlocked ? 0.8 : 0.3}
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
                  fontFamily: fontMain,
                  fontSize: 'clamp(0.55rem, 0.7vw, 0.8rem)',
                  fontWeight: '800',
                  color: isMinecraft ? '#FFD700' : '#9B59B6',
                  textShadow: isMinecraft ? '0 1px 3px rgba(0,0,0,0.8)' : 'none',
                  marginBottom: '3px',
                  background: isMinecraft ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.8)',
                  padding: '2px 8px',
                  borderRadius: '8px',
                  whiteSpace: 'nowrap',
                  letterSpacing: isMinecraft ? '1px' : '0',
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

            {/* Node circle */}
            <div style={{
              width: 'clamp(56px, 6.5vw, 84px)',
              height: 'clamp(56px, 6.5vw, 84px)',
              borderRadius: isMinecraft ? '14px' : '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)',
              background: !status.unlocked
                ? (isMinecraft
                  ? 'linear-gradient(145deg, #7A7A7A, #555555)'
                  : 'linear-gradient(145deg, #D5D5D5, #BABABA)')
                : status.allDone
                  ? (isMinecraft
                    ? 'linear-gradient(145deg, #66BB6A, #388E3C)'
                    : 'linear-gradient(145deg, #2ECC71, #27AE60)')
                  : isCurrentLevel
                    ? (isMinecraft
                      ? 'linear-gradient(145deg, #FFEB3B, #FFA000)'
                      : 'linear-gradient(145deg, #FF69B4, #E91E93)')
                    : (isMinecraft
                      ? 'linear-gradient(145deg, #A0722D, #7A5520)'
                      : 'linear-gradient(145deg, #DDA0DD, #BA55D3)'),
              border: isCurrentLevel
                ? (isMinecraft ? '3px solid #FFD700' : '3px solid #FF69B4')
                : status.allDone
                  ? (isMinecraft ? '3px solid #66BB6A' : '3px solid #2ECC71')
                  : status.unlocked
                    ? (isMinecraft ? '3px solid rgba(160,114,45,0.7)' : '3px solid rgba(155,89,182,0.3)')
                    : (isMinecraft ? '3px solid #666' : '3px solid #ccc'),
              boxShadow: isCurrentLevel
                ? (isMinecraft
                  ? '0 0 25px rgba(255,215,0,0.7), 0 6px 16px rgba(0,0,0,0.35)'
                  : '0 0 20px rgba(255,105,180,0.5), 0 4px 15px rgba(155,89,182,0.2)')
                : status.unlocked
                  ? (isMinecraft
                    ? '0 4px 14px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'
                    : '0 3px 10px rgba(0,0,0,0.15)')
                  : '0 2px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              animation: isCurrentLevel ? 'nodePulse 2s ease-in-out infinite' : 'none',
              margin: '0 auto',
              backdropFilter: isMinecraft ? 'none' : 'blur(4px)',
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
                width: 'clamp(52px, 6vw, 80px)',
                height: 'clamp(6px, 0.6vw, 9px)',
                background: isMinecraft ? 'rgba(0,0,0,0.45)' : 'rgba(155,89,182,0.15)',
                borderRadius: '5px',
                margin: '7px auto 0',
                overflow: 'hidden',
                border: isMinecraft ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}>
                <div style={{
                  width: `${pct}%`, height: '100%',
                  background: isMinecraft
                    ? 'linear-gradient(90deg, #7CFC00, #32CD32)'
                    : 'linear-gradient(90deg, #FF69B4, #9B59B6)',
                  borderRadius: '5px',
                  transition: 'width 0.3s ease',
                }} />
              </div>
            )}

            {/* Label */}
            <div style={{
              marginTop: '7px',
              fontFamily: fontMain,
              fontSize: 'clamp(0.7rem, 0.9vw, 1.05rem)',
              fontWeight: '800',
              color: isMinecraft ? '#FFD700' : '#6B3FA0',
              textShadow: isMinecraft
                ? '0 1px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.4)'
                : '0 1px 3px rgba(255,255,255,0.8)',
              maxWidth: 'clamp(90px, 10vw, 160px)',
              lineHeight: '1.3',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              letterSpacing: isMinecraft ? '0.5px' : '0',
            }}>
              {name}
            </div>

            {/* Score */}
            <div style={{
              marginTop: '2px',
              fontFamily: fontMain,
              fontSize: 'clamp(0.6rem, 0.75vw, 0.9rem)',
              fontWeight: '700',
              color: !status.unlocked
                ? (isMinecraft ? '#999' : '#aaa')
                : status.allDone
                  ? (isMinecraft ? '#7CFC00' : '#27AE60')
                  : (isMinecraft ? 'rgba(255,255,255,0.85)' : '#9B59B6'),
              textShadow: isMinecraft ? '0 1px 3px rgba(0,0,0,0.7)' : 'none',
            }}>
              {!status.unlocked
                ? (isMinecraft ? 'Verrouille' : 'Verrouille')
                : status.allDone
                  ? (isMinecraft ? 'Termine !' : 'Termine !')
                  : `${status.completed}/${status.total}`}
            </div>
          </div>
        )
      })}

      {/* ─── START / FINISH MARKERS ───────────────────────── */}
      <div style={{
        position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)',
        fontFamily: fontMain,
        fontSize: 'clamp(0.75rem, 0.95vw, 1.1rem)',
        fontWeight: '800',
        color: isMinecraft ? '#7CFC00' : '#9B59B6',
        textShadow: isMinecraft ? '0 1px 4px rgba(0,0,0,0.7)' : 'none',
        opacity: 0.85, zIndex: 5, whiteSpace: 'nowrap',
        background: isMinecraft ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)',
        padding: '6px 18px',
        borderRadius: '12px',
        backdropFilter: 'blur(4px)',
        letterSpacing: isMinecraft ? '1px' : '0',
      }}>
        {isMinecraft ? 'DEPART' : 'Depart de l\'aventure'}
      </div>

      <div style={{
        position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 5, display: 'flex', alignItems: 'center', gap: '6px',
        fontFamily: fontMain,
        fontSize: 'clamp(0.75rem, 0.95vw, 1.1rem)',
        fontWeight: '800',
        color: isMinecraft ? '#FFD700' : '#9B59B6',
        textShadow: isMinecraft ? '0 1px 4px rgba(0,0,0,0.7)' : 'none',
        background: isMinecraft ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)',
        padding: '6px 18px',
        borderRadius: '12px',
        backdropFilter: 'blur(4px)',
        letterSpacing: isMinecraft ? '1px' : '0',
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

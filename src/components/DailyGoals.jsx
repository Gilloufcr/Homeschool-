const DailyGoals = ({ theme = 'minecraft', todayCount = 0 }) => {
  const isMinecraft = theme === 'minecraft'
  const font = "'Quicksand', sans-serif"
  const maxGoal = 10
  const pct = Math.min(todayCount / maxGoal, 1)

  const goals = [
    { target: 3, label: 'Faire 3 exercices' },
    { target: 5, label: 'Faire 5 exercices' },
    { target: 10, label: 'Faire 10 exercices' },
  ]

  // SVG ring params
  const size = 64
  const stroke = 6
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - pct)

  const cardStyle = {
    padding: 'clamp(12px, 1.5vw, 20px)',
    borderRadius: isMinecraft ? '4px' : '16px',
    background: isMinecraft ? 'rgba(20, 20, 30, 0.8)' : 'rgba(255,255,255,0.95)',
    border: isMinecraft
      ? '3px solid #FFD700'
      : '2px solid rgba(155,89,182,0.15)',
    boxShadow: isMinecraft
      ? '0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,215,0,0.1)'
      : '0 2px 12px rgba(155,89,182,0.1)',
    fontFamily: font,
    ...(isMinecraft ? { imageRendering: 'pixelated' } : {}),
  }

  const headerStyle = {
    fontSize: 'clamp(0.85rem, 1.1vw, 1.2rem)',
    fontWeight: '800',
    color: isMinecraft ? '#FFD700' : '#9B59B6',
    marginBottom: 'clamp(8px, 1vw, 14px)',
    textShadow: isMinecraft ? '0 1px 4px rgba(0,0,0,0.5)' : 'none',
  }

  const goalRow = (goal) => {
    const done = todayCount >= goal.target
    return (
      <div key={goal.target} style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: 'clamp(4px, 0.5vw, 6px) 0',
        opacity: done ? 1 : 0.6,
      }}>
        <span style={{
          width: '20px', height: '20px', borderRadius: isMinecraft ? '2px' : '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem',
          background: done
            ? (isMinecraft ? '#FFD700' : '#9B59B6')
            : (isMinecraft ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'),
          color: done ? (isMinecraft ? '#1a1a2e' : '#fff') : (isMinecraft ? 'rgba(255,255,255,0.3)' : '#ccc'),
          border: done ? 'none' : (isMinecraft ? '1px solid rgba(255,255,255,0.15)' : '1px solid #ddd'),
          flexShrink: 0,
          fontWeight: '800',
        }}>
          {done ? '✓' : ''}
        </span>
        <span style={{
          fontSize: 'clamp(0.75rem, 0.9vw, 1rem)',
          fontWeight: done ? '700' : '600',
          color: done
            ? (isMinecraft ? '#7CFC00' : '#27AE60')
            : (isMinecraft ? 'rgba(255,255,255,0.5)' : '#888'),
          textDecoration: done ? 'line-through' : 'none',
        }}>
          {goal.label}
        </span>
        {done && (
          <span style={{
            fontSize: 'clamp(0.6rem, 0.7vw, 0.8rem)',
            fontWeight: '700',
            color: isMinecraft ? '#FFD700' : '#F39C12',
            marginLeft: 'auto',
          }}>
            +5 XP bonus
          </span>
        )}
      </div>
    )
  }

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px, 1.2vw, 16px)' }}>
        {/* Progress ring */}
        <div style={{ flexShrink: 0, position: 'relative', width: size, height: size }}>
          <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx={size / 2} cy={size / 2} r={radius}
              fill="none"
              stroke={isMinecraft ? 'rgba(255,255,255,0.08)' : 'rgba(155,89,182,0.1)'}
              strokeWidth={stroke}
            />
            <circle
              cx={size / 2} cy={size / 2} r={radius}
              fill="none"
              stroke={isMinecraft ? '#FFD700' : '#9B59B6'}
              strokeWidth={stroke}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 'clamp(0.85rem, 1vw, 1.1rem)',
            fontWeight: '800', fontFamily: font,
            color: isMinecraft ? '#FFD700' : '#9B59B6',
          }}>
            {todayCount}/{maxGoal}
          </div>
        </div>

        {/* Goals list */}
        <div style={{ flex: 1 }}>
          <div style={headerStyle}>Objectif du jour</div>
          {goals.map(goalRow)}
        </div>
      </div>
    </div>
  )
}

export default DailyGoals

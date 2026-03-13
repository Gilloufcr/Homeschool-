export default function ProgressBar({ current, total, theme, streak = 0, reduceAnimations = false }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0
  const isMinecraft = theme === 'minecraft'
  const showStreak = streak >= 3

  const container = {
    display: 'flex',
    alignItems: 'center',
    gap: clamp(8, 12, 16),
    padding: clamp(6, 8, 12),
    borderRadius: isMinecraft ? 4 : 12,
    background: isMinecraft ? 'rgba(30, 20, 10, 0.85)' : 'rgba(255,255,255,0.9)',
    border: isMinecraft ? '3px solid #555' : '1px solid rgba(155,89,182,0.15)',
    boxShadow: isMinecraft
      ? 'inset 0 0 0 2px #333, inset 0 0 0 4px #777'
      : '0 2px 8px rgba(155,89,182,0.08)',
    marginBottom: clamp(8, 12, 16),
  }

  const barTrack = {
    flex: 1,
    height: clamp(12, 16, 20),
    borderRadius: isMinecraft ? 2 : 10,
    background: isMinecraft ? '#2a2a2a' : '#f0e6f6',
    overflow: 'hidden',
    position: 'relative',
    border: isMinecraft ? '2px solid #444' : 'none',
  }

  const barFill = {
    height: '100%',
    width: `${pct}%`,
    borderRadius: isMinecraft ? 1 : 10,
    background: isMinecraft
      ? 'linear-gradient(180deg, #ffd700 0%, #b8860b 100%)'
      : 'linear-gradient(90deg, #9b59b6, #e91e96, #ff69b4)',
    transition: reduceAnimations ? 'none' : 'width 0.5s ease',
    animation: reduceAnimations ? 'none' : 'progressFill 0.6s ease-out',
    imageRendering: isMinecraft ? 'pixelated' : undefined,
  }

  const label = {
    fontSize: clamp(11, 13, 15),
    fontWeight: 700,
    color: isMinecraft ? '#ffd700' : '#7c3aed',
    fontFamily: isMinecraft ? '"Press Start 2P", monospace' : 'inherit',
    whiteSpace: 'nowrap',
    letterSpacing: isMinecraft ? 0.5 : undefined,
    minWidth: 'max-content',
  }

  const streakBadge = {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: '3px 8px',
    borderRadius: isMinecraft ? 3 : 20,
    background: isMinecraft
      ? 'rgba(255,215,0,0.2)'
      : 'linear-gradient(135deg, #ffecd2, #fcb69f)',
    border: isMinecraft ? '2px solid #ffd700' : '1px solid rgba(255,165,0,0.3)',
    fontSize: clamp(11, 12, 14),
    fontWeight: 800,
    color: isMinecraft ? '#ffd700' : '#e67e22',
    animation: reduceAnimations ? 'none' : 'pulse 1.5s ease-in-out infinite',
    whiteSpace: 'nowrap',
  }

  return (
    <div style={container}>
      <span style={label}>Exercice {current} / {total}</span>
      <div style={barTrack}>
        <div style={barFill} />
      </div>
      {showStreak && (
        <div style={streakBadge}>
          {isMinecraft ? '\u2B50' : '\uD83D\uDD25'} {streak}
        </div>
      )}
    </div>
  )
}

function clamp(min, preferred, max) {
  return `clamp(${min}px, ${preferred}px, ${max}px)`
}

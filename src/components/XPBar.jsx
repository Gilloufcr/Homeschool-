const XPBar = ({ xp, level, theme }) => {
  const currentLevelXP = xp % 100
  const percentage = currentLevelXP

  const isMinecraft = theme === 'minecraft'

  const badgeSize = 'clamp(40px, 4vw, 60px)'

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(10px, 1.2vw, 18px)',
      padding: 'clamp(8px, 1.2vw, 16px) clamp(16px, 2vw, 28px)',
      borderRadius: isMinecraft ? '0' : '20px',
      background: isMinecraft
        ? 'rgba(0,0,0,0.7)'
        : 'rgba(255,255,255,0.9)',
      border: isMinecraft ? '3px solid #555' : '2px solid rgba(155,89,182,0.2)',
      boxShadow: isMinecraft ? 'none' : '0 2px 10px rgba(0,0,0,0.1)',
    },
    levelBadge: {
      minWidth: badgeSize,
      height: badgeSize,
      borderRadius: isMinecraft ? '0' : '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '700',
      fontSize: isMinecraft ? 'clamp(0.7rem, 0.9vw, 1.2rem)' : 'clamp(1.1rem, 1.4vw, 1.7rem)',
      fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
      background: isMinecraft
        ? 'linear-gradient(135deg, #FFD700, #FFA000)'
        : 'linear-gradient(135deg, #FF69B4, #9B59B6)',
      color: isMinecraft ? '#000' : '#fff',
      border: isMinecraft ? '2px solid #B8860B' : 'none',
    },
    barOuter: {
      flex: 1,
      height: isMinecraft ? 'clamp(14px, 1.5vw, 24px)' : 'clamp(18px, 2vw, 28px)',
      background: isMinecraft ? '#333' : '#f0e6ff',
      borderRadius: isMinecraft ? '0' : '10px',
      overflow: 'hidden',
      border: isMinecraft ? '2px solid #555' : 'none',
    },
    barInner: {
      height: '100%',
      width: `${percentage}%`,
      background: isMinecraft
        ? 'linear-gradient(90deg, #7CFC00, #32CD32)'
        : 'linear-gradient(90deg, #FF69B4, #9B59B6, #5DADE2)',
      borderRadius: isMinecraft ? '0' : '10px',
      transition: 'width 0.5s ease',
    },
    xpText: {
      fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
      fontSize: isMinecraft ? 'clamp(0.6rem, 0.8vw, 1rem)' : 'clamp(0.85rem, 1.1vw, 1.3rem)',
      fontWeight: '700',
      color: isMinecraft ? '#7CFC00' : '#9B59B6',
      minWidth: 'clamp(65px, 7vw, 100px)',
      textAlign: 'right',
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.levelBadge}>
        {isMinecraft ? `LV${level}` : `${level}`}
      </div>
      <div style={styles.barOuter}>
        <div style={styles.barInner} />
      </div>
      <div style={styles.xpText}>
        {currentLevelXP}/100 XP
      </div>
    </div>
  )
}

export default XPBar

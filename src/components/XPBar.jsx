const XPBar = ({ xp, level, theme }) => {
  const currentLevelXP = xp % 100
  const percentage = currentLevelXP

  const isMinecraft = theme === 'minecraft'

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 20px',
      borderRadius: isMinecraft ? '0' : '20px',
      background: isMinecraft
        ? 'rgba(0,0,0,0.7)'
        : 'rgba(255,255,255,0.9)',
      border: isMinecraft ? '3px solid #555' : '2px solid rgba(155,89,182,0.2)',
      boxShadow: isMinecraft ? 'none' : '0 2px 10px rgba(0,0,0,0.1)',
    },
    levelBadge: {
      minWidth: '45px',
      height: '45px',
      borderRadius: isMinecraft ? '0' : '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '700',
      fontSize: isMinecraft ? '0.7rem' : '1.1rem',
      fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
      background: isMinecraft
        ? 'linear-gradient(135deg, #FFD700, #FFA000)'
        : 'linear-gradient(135deg, #FF69B4, #9B59B6)',
      color: isMinecraft ? '#000' : '#fff',
      border: isMinecraft ? '2px solid #B8860B' : 'none',
    },
    barOuter: {
      flex: 1,
      height: isMinecraft ? '16px' : '20px',
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
      fontSize: isMinecraft ? '0.6rem' : '0.85rem',
      fontWeight: '700',
      color: isMinecraft ? '#7CFC00' : '#9B59B6',
      minWidth: '70px',
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

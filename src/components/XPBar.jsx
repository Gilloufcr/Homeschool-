const XPBar = ({ xp, level, theme }) => {
  const currentLevelXP = xp % 100
  const percentage = currentLevelXP
  const isMinecraft = theme === 'minecraft'
  const font = "'Quicksand', sans-serif"

  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      gap: 'clamp(10px, 1.2vw, 18px)',
      padding: 'clamp(8px, 1.2vw, 16px) clamp(16px, 2vw, 28px)',
      borderRadius: '20px',
      background: isMinecraft ? 'rgba(20, 20, 30, 0.75)' : 'rgba(255,255,255,0.9)',
      border: isMinecraft ? '1px solid rgba(255,255,255,0.08)' : '2px solid rgba(155,89,182,0.2)',
      boxShadow: isMinecraft
        ? '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
        : '0 2px 10px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{
        minWidth: 'clamp(40px, 4vw, 60px)',
        height: 'clamp(40px, 4vw, 60px)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: '800',
        fontSize: 'clamp(0.9rem, 1.2vw, 1.5rem)',
        fontFamily: font,
        background: isMinecraft
          ? 'linear-gradient(135deg, #FFD700, #FFA000)'
          : 'linear-gradient(135deg, #FF69B4, #9B59B6)',
        color: isMinecraft ? '#000' : '#fff',
        boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
      }}>
        {level}
      </div>
      <div style={{
        flex: 1,
        height: 'clamp(16px, 1.8vw, 26px)',
        background: isMinecraft ? 'rgba(255,255,255,0.08)' : '#f0e6ff',
        borderRadius: '10px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${percentage}%`,
          background: isMinecraft
            ? 'linear-gradient(90deg, #7CFC00, #32CD32)'
            : 'linear-gradient(90deg, #FF69B4, #9B59B6, #5DADE2)',
          borderRadius: '10px',
          transition: 'width 0.5s ease',
        }} />
      </div>
      <div style={{
        fontFamily: font,
        fontSize: 'clamp(0.85rem, 1.1vw, 1.3rem)',
        fontWeight: '700',
        color: isMinecraft ? '#7CFC00' : '#9B59B6',
        minWidth: 'clamp(65px, 7vw, 100px)',
        textAlign: 'right',
      }}>
        {currentLevelXP}/100 XP
      </div>
    </div>
  )
}

export default XPBar

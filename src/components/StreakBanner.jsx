import { useState, useEffect } from 'react'

const StreakBanner = ({ streak = 0, theme = 'minecraft', lastPlayed }) => {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const isMinecraft = theme === 'minecraft'
  const font = "'Quicksand', sans-serif"

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => setVisible(false), 400)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  const isYesterday = () => {
    if (!lastPlayed) return false
    const lp = new Date(lastPlayed)
    const now = new Date()
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    return lp.toDateString() === yesterday.toDateString()
  }

  const getMessage = () => {
    if (streak === 0 || isYesterday()) {
      return { text: 'Tu n\'as pas joue hier, recommence ta serie !', icon: '💪' }
    }
    if (streak === 1) {
      return { text: 'Premiere session aujourd\'hui ! Bonne chance !', icon: '⭐' }
    }
    if (streak >= 30) {
      return { text: `${streak} jours de suite ! Tu es une LEGENDE !`, icon: '🏆🔥' }
    }
    if (streak >= 14) {
      return { text: `${streak} jours de suite ! Inarretable !`, icon: '🌟🔥' }
    }
    if (streak >= 7) {
      return { text: `${streak} jours de suite ! Une semaine complete !`, icon: '🔥🔥' }
    }
    return { text: `${streak} jours de suite ! Continue !`, icon: '🔥' }
  }

  const { text, icon } = getMessage()
  const highStreak = streak >= 7

  const dismiss = (e) => {
    e.stopPropagation()
    setFadeOut(true)
    setTimeout(() => setVisible(false), 400)
  }

  const bannerStyle = {
    position: 'relative',
    padding: 'clamp(12px, 1.5vw, 20px) clamp(16px, 2vw, 28px)',
    borderRadius: isMinecraft ? '4px' : '16px',
    background: isMinecraft
      ? 'linear-gradient(135deg, rgba(20, 20, 30, 0.9), rgba(40, 30, 10, 0.9))'
      : 'linear-gradient(135deg, #c471ed, #f64f59, #c471ed)',
    border: isMinecraft
      ? '2px solid rgba(255, 215, 0, 0.4)'
      : '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: isMinecraft
      ? '0 4px 20px rgba(255, 215, 0, 0.15), inset 0 1px 0 rgba(255, 215, 0, 0.1)'
      : '0 4px 20px rgba(196, 113, 237, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(10px, 1.2vw, 18px)',
    marginBottom: 'clamp(12px, 1.5vw, 22px)',
    opacity: fadeOut ? 0 : 1,
    transform: fadeOut ? 'translateY(-10px)' : 'translateY(0)',
    transition: 'opacity 0.4s ease, transform 0.4s ease',
    animation: 'slideUp 0.4s ease-out',
    overflow: 'hidden',
  }

  const iconStyle = {
    fontSize: 'clamp(1.6rem, 2.5vw, 2.8rem)',
    flexShrink: 0,
    animation: highStreak ? 'pulse 1.5s ease-in-out infinite' : 'none',
  }

  const textStyle = {
    fontFamily: font,
    fontSize: 'clamp(0.9rem, 1.2vw, 1.4rem)',
    fontWeight: '700',
    color: isMinecraft ? '#FFD700' : '#fff',
    flex: 1,
    textShadow: isMinecraft
      ? '0 2px 6px rgba(0, 0, 0, 0.6)'
      : '0 1px 3px rgba(0, 0, 0, 0.2)',
    letterSpacing: isMinecraft ? '0.5px' : '0',
  }

  const closeStyle = {
    background: 'none',
    border: 'none',
    color: isMinecraft ? 'rgba(255, 215, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
    fontSize: 'clamp(1rem, 1.3vw, 1.5rem)',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '8px',
    lineHeight: 1,
    flexShrink: 0,
    transition: 'color 0.2s ease, background 0.2s ease',
  }

  return (
    <div style={bannerStyle}>
      {/* Minecraft pixel shimmer overlay */}
      {isMinecraft && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 4px,
            rgba(255, 215, 0, 0.03) 4px,
            rgba(255, 215, 0, 0.03) 8px
          )`,
          pointerEvents: 'none',
        }} />
      )}

      <div style={iconStyle}>{icon}</div>
      <div style={textStyle}>{text}</div>

      {highStreak && streak >= 7 && (
        <div style={{
          fontSize: 'clamp(0.7rem, 0.9vw, 1rem)',
          fontFamily: font,
          fontWeight: '800',
          color: isMinecraft ? '#7CFC00' : '#FFE066',
          background: isMinecraft ? 'rgba(124, 252, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)',
          padding: '4px 10px',
          borderRadius: isMinecraft ? '3px' : '20px',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}>
          x{streak}
        </div>
      )}

      <button
        style={closeStyle}
        onClick={dismiss}
        onMouseOver={(e) => {
          e.currentTarget.style.color = isMinecraft ? '#FFD700' : '#fff'
          e.currentTarget.style.background = isMinecraft
            ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.color = isMinecraft
            ? 'rgba(255, 215, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)'
          e.currentTarget.style.background = 'none'
        }}
        aria-label="Fermer"
      >
        ✕
      </button>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  )
}

export default StreakBanner

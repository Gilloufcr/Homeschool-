import { useEffect, useState } from 'react'

const getMilestoneText = (level) => {
  if (level >= 25) return 'Legendaire !'
  if (level >= 20) return 'Genie academique !'
  if (level >= 15) return 'Maitre(sse) du savoir !'
  if (level >= 10) return 'Expert(e) en herbe !'
  if (level >= 5) return 'Apprenti(e) !'
  return null
}

const LevelUpOverlay = ({ level, theme, onDismiss, reduceAnimations }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onDismiss()
    }, 4000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  const handleClick = () => {
    setVisible(false)
    onDismiss()
  }

  if (!visible) return null

  const isMinecraft = theme === 'minecraft'
  const milestone = level % 5 === 0 ? getMilestoneText(level) : null

  // Reduced animations: simple card
  if (reduceAnimations) {
    return (
      <div
        onClick={handleClick}
        style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.7)',
          cursor: 'pointer',
        }}
      >
        <div style={{
          background: isMinecraft ? '#1a3a1a' : 'linear-gradient(135deg, #9B59B6, #E91E90)',
          borderRadius: 16, padding: '32px 48px', textAlign: 'center',
          color: '#fff', fontFamily: isMinecraft ? "'Courier New', monospace" : "'Quicksand', sans-serif",
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}>
          <div style={{ fontSize: '3rem', fontWeight: 900, color: '#FFD700' }}>{level}</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: 8 }}>
            {isMinecraft ? 'LEVEL UP !' : 'Nouveau niveau !'}
          </div>
          <div style={{ fontSize: '1rem', marginTop: 12, opacity: 0.9 }}>
            Tu as debloque le niveau {level} !
          </div>
          {milestone && (
            <div style={{ fontSize: '1.1rem', marginTop: 8, fontWeight: 700, color: '#FFD700' }}>
              {milestone}
            </div>
          )}
        </div>
      </div>
    )
  }

  const bgGradient = isMinecraft
    ? 'radial-gradient(ellipse at center, rgba(34,60,20,0.94) 0%, rgba(10,10,10,0.97) 100%)'
    : 'radial-gradient(ellipse at center, rgba(120,40,160,0.92) 0%, rgba(40,10,80,0.97) 100%)'

  const titleText = isMinecraft ? 'LEVEL UP !' : 'Nouveau niveau !'
  const titleColor = isMinecraft ? '#FFD700' : '#fff'
  const fontFamily = isMinecraft ? "'Courier New', monospace" : "'Quicksand', sans-serif"

  // Particles
  const particles = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * 360
    const delay = (i * 0.1).toFixed(2)
    const dist = 80 + Math.random() * 60
    const size = 4 + Math.random() * 6
    const colors = isMinecraft
      ? ['#FFD700', '#4CAF50', '#7CFC00', '#FFA500']
      : ['#FF69B4', '#E040FB', '#FFD700', '#00E5FF', '#B388FF']
    const color = colors[i % colors.length]
    const shape = isMinecraft ? 'square' : 'star'
    return { angle, delay, dist, size, color, shape }
  })

  return (
    <>
      <style>{`
        @keyframes levelup-fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes levelup-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(255,215,0,0.6), 0 0 40px rgba(255,215,0,0.3); transform: scale(1); }
          50% { text-shadow: 0 0 40px rgba(255,215,0,0.9), 0 0 80px rgba(255,215,0,0.5); transform: scale(1.05); }
        }
        @keyframes levelup-bounce {
          0% { transform: scale(0.3) translateY(40px); opacity: 0; }
          50% { transform: scale(1.1) translateY(-10px); opacity: 1; }
          70% { transform: scale(0.95) translateY(2px); }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes levelup-particle {
          0% { transform: translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) scale(0.2); opacity: 0; }
        }
        @keyframes levelup-number {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <div
        onClick={handleClick}
        style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: bgGradient,
          cursor: 'pointer',
          animation: 'levelup-fadein 0.3s ease-out',
          fontFamily,
        }}
      >
        {/* Particles */}
        {particles.map((p, i) => {
          const rad = (p.angle * Math.PI) / 180
          const dx = Math.cos(rad) * p.dist
          const dy = Math.sin(rad) * p.dist
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                width: p.size, height: p.size,
                backgroundColor: p.color,
                borderRadius: p.shape === 'square' ? 2 : '50%',
                '--dx': `${dx}px`,
                '--dy': `${dy}px`,
                animation: `levelup-particle 1.5s ${p.delay}s ease-out forwards`,
                opacity: 0,
              }}
            />
          )
        })}

        {/* Level number with golden glow */}
        <div style={{
          fontSize: '5rem',
          fontWeight: 900,
          color: '#FFD700',
          animation: 'levelup-number 0.6s 0.2s ease-out both, levelup-glow 2s 0.8s ease-in-out infinite',
          lineHeight: 1,
        }}>
          {level}
        </div>

        {/* Title with bounceIn */}
        <div style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: titleColor,
          marginTop: 12,
          animation: 'levelup-bounce 0.7s 0.4s ease-out both',
          textShadow: isMinecraft
            ? '0 0 16px rgba(255,215,0,0.7), 0 4px 8px rgba(0,0,0,0.6)'
            : '0 0 16px rgba(200,100,255,0.6), 0 4px 8px rgba(0,0,0,0.4)',
        }}>
          {titleText}
        </div>

        {/* Unlock message */}
        <div style={{
          fontSize: '1.1rem',
          color: 'rgba(255,255,255,0.9)',
          marginTop: 16,
          animation: 'levelup-bounce 0.7s 0.7s ease-out both',
        }}>
          Tu as debloque le niveau {level} !
        </div>

        {/* Milestone fun fact */}
        {milestone && (
          <div style={{
            fontSize: '1.3rem',
            fontWeight: 700,
            color: '#FFD700',
            marginTop: 12,
            animation: 'levelup-bounce 0.7s 1.0s ease-out both',
            textShadow: '0 0 12px rgba(255,215,0,0.5)',
          }}>
            {milestone}
          </div>
        )}

        {/* Dismiss hint */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          color: 'rgba(255,255,255,0.5)',
          fontSize: '0.85rem',
          animation: 'levelup-fadein 0.5s 2s both',
        }}>
          Clique pour continuer
        </div>
      </div>
    </>
  )
}

export default LevelUpOverlay

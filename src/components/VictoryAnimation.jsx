import { useEffect, useState } from 'react'

const VictoryAnimation = ({ theme, onComplete, reduceAnimations }) => {
  const [phase, setPhase] = useState(0) // 0=burst, 1=text, 2=sparkles, 3=fadeout

  useEffect(() => {
    if (reduceAnimations) {
      onComplete()
      return
    }
    const t1 = setTimeout(() => setPhase(1), 500)
    const t2 = setTimeout(() => setPhase(2), 1200)
    const t3 = setTimeout(() => setPhase(3), 2000)
    const t4 = setTimeout(() => onComplete(), 2500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  if (reduceAnimations) return null

  const isMinecraft = theme === 'minecraft'

  const text = isMinecraft ? 'NIVEAU COMPLETE !' : 'Niveau termin\u00e9 !'
  const textColor = isMinecraft ? '#FFD700' : '#fff'
  const textShadow = isMinecraft
    ? '0 0 20px rgba(255,215,0,0.8), 0 4px 12px rgba(0,0,0,0.6)'
    : '0 0 20px rgba(200,100,255,0.6), 0 4px 12px rgba(0,0,0,0.4)'
  const fontFamily = isMinecraft
    ? "'Courier New', monospace"
    : "'Quicksand', sans-serif"
  const bgGradient = isMinecraft
    ? 'radial-gradient(ellipse at center, rgba(34,60,20,0.92) 0%, rgba(10,10,10,0.95) 100%)'
    : 'radial-gradient(ellipse at center, rgba(80,30,120,0.9) 0%, rgba(30,10,60,0.95) 100%)'

  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * 360
    const delay = (i * 0.08).toFixed(2)
    const dist = 30 + Math.random() * 40
    const size = 4 + Math.random() * 8
    const color = isMinecraft
      ? ['#FFD700', '#4CAF50', '#7CFC00', '#FFA500'][i % 4]
      : ['#E040FB', '#B388FF', '#FF80AB', '#82B1FF'][i % 4]
    return { angle, delay, dist, size, color, id: i }
  })

  return (
    <>
      <style>{`
        @keyframes victoryBurst {
          0% { transform: scale(0) rotate(-20deg); opacity: 0; }
          50% { transform: scale(1.3) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes victoryBounceIn {
          0% { transform: scale(0) translateY(40px); opacity: 0; }
          60% { transform: scale(1.15) translateY(-8px); opacity: 1; }
          80% { transform: scale(0.95) translateY(2px); }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes victoryFadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes victoryParticle {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--vp-x), var(--vp-y)) scale(0); opacity: 0; }
        }
        @keyframes victorySparkle {
          0%, 100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        }
      `}</style>
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: bgGradient,
        animation: phase >= 3 ? 'victoryFadeOut 0.5s ease-out forwards' : 'none',
        pointerEvents: 'none',
      }}>
        {/* Emoji burst */}
        <div style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          animation: 'victoryBurst 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          opacity: 0,
          marginBottom: 'clamp(12px, 2vw, 24px)',
          textShadow: '0 0 30px rgba(255,255,255,0.3)',
          letterSpacing: 'clamp(4px, 1vw, 12px)',
        }}>
          {isMinecraft ? '\u2B50\uD83C\uDF86\u2B50' : '\u2728\uD83C\uDF89\u2728'}
        </div>

        {/* Text */}
        {phase >= 1 && (
          <div style={{
            fontFamily,
            fontSize: 'clamp(1.6rem, 5vw, 3.5rem)',
            fontWeight: '900',
            color: textColor,
            textShadow,
            animation: 'victoryBounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            opacity: 0,
            textAlign: 'center',
            padding: '0 clamp(12px, 2vw, 24px)',
            letterSpacing: isMinecraft ? 'clamp(2px, 0.5vw, 6px)' : 'clamp(1px, 0.3vw, 3px)',
            ...(isMinecraft ? { imageRendering: 'pixelated', textTransform: 'uppercase' } : {}),
          }}>
            {text}
          </div>
        )}

        {/* Particles */}
        {phase >= 2 && particles.map(p => {
          const rad = (p.angle * Math.PI) / 180
          const x = Math.cos(rad) * p.dist
          const y = Math.sin(rad) * p.dist
          return (
            <div key={p.id} style={{
              position: 'absolute',
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: isMinecraft ? '2px' : '50%',
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              '--vp-x': `${x}vw`,
              '--vp-y': `${y}vh`,
              animation: `victoryParticle 0.8s ${p.delay}s ease-out forwards`,
              opacity: 0,
            }} />
          )
        })}

        {/* Sparkle dots */}
        {phase >= 2 && Array.from({ length: 8 }, (_, i) => {
          const top = 15 + Math.random() * 70
          const left = 10 + Math.random() * 80
          const delay = (i * 0.1).toFixed(2)
          const color = isMinecraft ? '#FFD700' : '#E040FB'
          return (
            <div key={`sp-${i}`} style={{
              position: 'absolute',
              top: `${top}%`,
              left: `${left}%`,
              width: 'clamp(6px, 1vw, 12px)',
              height: 'clamp(6px, 1vw, 12px)',
              borderRadius: isMinecraft ? '1px' : '50%',
              background: color,
              boxShadow: `0 0 12px ${color}`,
              animation: `victorySparkle 0.6s ${delay}s ease-in-out`,
              opacity: 0,
            }} />
          )
        })}
      </div>
    </>
  )
}

export default VictoryAnimation

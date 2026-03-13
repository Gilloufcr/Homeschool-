import { useEffect, useState } from 'react'
import { playMedal, playLevelComplete } from '../utils/sounds'

const MEDAL_TIERS = [
  { min: 90, key: 'gold', label: 'Or', color: '#FFD700', message: 'Parfait ! Tu es un champion !' },
  { min: 80, key: 'silver', label: 'Argent', color: '#C0C0C0', message: 'Tres bien ! Encore un effort pour l\'or !' },
  { min: 60, key: 'bronze', label: 'Bronze', color: '#CD7F32', message: 'Bien joue ! Tu progresses !' },
]

function getMedalTier(score, total) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0
  return MEDAL_TIERS.find(t => pct >= t.min) || null
}

function MedalSVG({ color, animate }) {
  return (
    <svg width="160" height="200" viewBox="0 0 160 200" style={{
      animation: animate ? 'medalScaleIn 0.6s ease-out forwards' : 'none',
      transformOrigin: 'center',
    }}>
      {/* Ribbon */}
      <polygon points="55,90 80,120 105,90 105,0 55,0" fill="#E74C3C" opacity="0.9" />
      <polygon points="55,90 80,120 80,0 55,0" fill="#C0392B" opacity="0.9" />

      {/* Medal circle - metallic gradient */}
      <defs>
        <radialGradient id={`medal-grad-${color}`} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="40%" stopColor={color} />
          <stop offset="100%" stopColor={darken(color)} />
        </radialGradient>
        <radialGradient id={`shine-${color}`} cx="30%" cy="25%" r="30%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Medal border */}
      <circle cx="80" cy="130" r="58" fill={darken(color)} />
      <circle cx="80" cy="130" r="54" fill={`url(#medal-grad-${color})`} />

      {/* Inner ring */}
      <circle cx="80" cy="130" r="44" fill="none" stroke={darken(color)} strokeWidth="2" opacity="0.4" />

      {/* Star in center */}
      <polygon
        points="80,100 87,118 107,118 91,128 97,146 80,136 63,146 69,128 53,118 73,118"
        fill={darken(color)}
        opacity="0.5"
      />
      <polygon
        points="80,102 86,117 105,117 90,127 95,144 80,135 65,144 70,127 55,117 74,117"
        fill="#fff"
        opacity="0.3"
      />

      {/* Shine effect */}
      <circle cx="80" cy="130" r="54" fill={`url(#shine-${color})`} style={{
        animation: animate ? 'medalShine 2s ease-in-out infinite' : 'none',
      }} />
    </svg>
  )
}

function darken(hex) {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - 40)
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 40)
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 40)
  return `rgb(${r},${g},${b})`
}

export default function MedalDisplay({ score, total, theme, onContinue }) {
  const [animate, setAnimate] = useState(false)
  const isMinecraft = theme === 'minecraft'
  const font = "'Quicksand', sans-serif"
  const pct = total > 0 ? Math.round((score / total) * 100) : 0
  const tier = getMedalTier(score, total)

  useEffect(() => {
    // Trigger animation after mount
    const t = setTimeout(() => setAnimate(true), 100)
    // Play sounds
    if (tier) {
      playMedal(tier.key)
    }
    playLevelComplete()
    return () => clearTimeout(t)
  }, [])

  const containerStyle = {
    textAlign: 'center',
    padding: 'clamp(24px, 3vw, 48px)',
    borderRadius: '24px',
    maxWidth: '500px',
    margin: '0 auto',
    background: isMinecraft
      ? 'rgba(20, 20, 30, 0.9)'
      : 'rgba(255, 255, 255, 0.97)',
    border: isMinecraft
      ? '2px solid rgba(255,215,0,0.3)'
      : '2px solid rgba(155,89,182,0.2)',
    boxShadow: isMinecraft
      ? '0 8px 32px rgba(0,0,0,0.5)'
      : '0 8px 32px rgba(155,89,182,0.15)',
    backdropFilter: 'blur(12px)',
    animation: 'slideUp 0.5s ease-out',
  }

  const titleStyle = {
    fontFamily: font,
    fontSize: 'clamp(1.5rem, 2vw, 2.5rem)',
    fontWeight: '800',
    color: isMinecraft ? '#FFD700' : '#333',
    marginBottom: '8px',
  }

  const scoreStyle = {
    fontFamily: font,
    fontSize: 'clamp(1.1rem, 1.4vw, 1.6rem)',
    fontWeight: '700',
    color: isMinecraft ? '#ddd' : '#555',
    marginBottom: '16px',
  }

  // Percentage bar
  const barBg = {
    width: '80%',
    height: '16px',
    borderRadius: '8px',
    background: isMinecraft ? 'rgba(255,255,255,0.1)' : '#eee',
    margin: '0 auto 20px',
    overflow: 'hidden',
  }

  const barFill = {
    height: '100%',
    borderRadius: '8px',
    width: animate ? `${pct}%` : '0%',
    background: tier
      ? `linear-gradient(90deg, ${tier.color}, ${tier.color}dd)`
      : (isMinecraft ? '#666' : '#ccc'),
    transition: 'width 1s ease-out 0.3s',
  }

  const messageStyle = {
    fontFamily: font,
    fontSize: 'clamp(1rem, 1.3vw, 1.4rem)',
    fontWeight: '600',
    color: isMinecraft
      ? (tier ? '#7CFC00' : '#FF6B6B')
      : (tier ? '#27AE60' : '#E67E22'),
    marginBottom: '24px',
    lineHeight: '1.6',
  }

  const btnStyle = {
    padding: 'clamp(12px, 1.4vw, 18px) clamp(32px, 4vw, 56px)',
    borderRadius: '16px',
    border: 'none',
    background: isMinecraft
      ? 'linear-gradient(135deg, #4CAF50, #2E7D32)'
      : 'linear-gradient(135deg, #9B59B6, #8E44AD)',
    color: '#fff',
    fontFamily: font,
    fontSize: 'clamp(1rem, 1.2vw, 1.4rem)',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s ease',
  }

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes medalScaleIn {
          0% { transform: scale(0) rotate(-20deg); opacity: 0; }
          60% { transform: scale(1.15) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes medalShine {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>

      <div style={titleStyle}>
        {isMinecraft ? 'NIVEAU TERMINE !' : 'Niveau termine !'}
      </div>

      {tier ? (
        <MedalSVG color={tier.color} animate={animate} />
      ) : (
        <div style={{ fontSize: '4rem', margin: '20px 0' }}>
          {isMinecraft ? '>' : ''} {'💪'}
        </div>
      )}

      <div style={scoreStyle}>
        {score}/{total} correct{score > 1 ? 's' : ''}
        {' '}({pct}%)
      </div>

      <div style={barBg}>
        <div style={barFill} />
      </div>

      {tier && (
        <div style={{
          fontFamily: font,
          fontSize: 'clamp(1.2rem, 1.5vw, 1.8rem)',
          fontWeight: '800',
          color: tier.color,
          marginBottom: '8px',
          textShadow: isMinecraft ? '0 2px 8px rgba(0,0,0,0.5)' : 'none',
        }}>
          Medaille {tier.label} {tier.key === 'gold' ? '\u{1F947}' : tier.key === 'silver' ? '\u{1F948}' : '\u{1F949}'}
        </div>
      )}

      <div style={messageStyle}>
        {tier
          ? tier.message
          : 'Continue a t\'entrainer, tu vas y arriver !'
        }
      </div>

      <button
        style={btnStyle}
        onClick={onContinue}
        onMouseOver={e => { e.target.style.transform = 'scale(1.05)' }}
        onMouseOut={e => { e.target.style.transform = 'scale(1)' }}
      >
        Continuer
      </button>
    </div>
  )
}

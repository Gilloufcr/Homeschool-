import { useState, useEffect } from 'react'
import { getChildren } from '../api'

export default function LoginScreen({ onSelectChild, onParentLogin }) {
  const [children, setChildren] = useState([])
  const [showParentPin, setShowParentPin] = useState(false)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadChildren()
  }, [])

  const loadChildren = async () => {
    try {
      const data = await getChildren()
      setChildren(data)
    } catch {
      // Server might not be running — fallback to localStorage
      const saved = localStorage.getItem('homeschool_children')
      if (saved) setChildren(JSON.parse(saved))
    }
    setLoading(false)
  }

  const handleParentLogin = async () => {
    setError('')
    try {
      await onParentLogin(pin)
    } catch (e) {
      setError(e.message || 'Code incorrect')
    }
  }

  const s = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    },
    stars: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(2px 2px at 20px 30px, #eee, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #ddd, transparent), radial-gradient(2px 2px at 160px 120px, #fff, transparent), radial-gradient(1px 1px at 200px 60px, #eee, transparent), radial-gradient(2px 2px at 300px 180px, #fff, transparent), radial-gradient(1px 1px at 400px 90px, #ddd, transparent), radial-gradient(2px 2px at 500px 150px, #fff, transparent)',
      backgroundSize: '550px 200px',
      animation: 'float 8s ease-in-out infinite',
      opacity: 0.5,
    },
    logo: {
      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
      marginBottom: '5px',
      animation: 'float 3s ease-in-out infinite',
      position: 'relative',
      zIndex: 1,
    },
    title: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
      fontWeight: '700',
      color: 'white',
      marginBottom: '5px',
      textShadow: '0 0 20px rgba(155, 89, 182, 0.5)',
      position: 'relative',
      zIndex: 1,
    },
    subtitle: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: 'clamp(0.8rem, 2vw, 1rem)',
      color: 'rgba(255,255,255,0.6)',
      marginBottom: '40px',
      position: 'relative',
      zIndex: 1,
    },
    childrenGrid: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: '40px',
      position: 'relative',
      zIndex: 1,
    },
    childCard: (theme) => ({
      width: '180px',
      padding: '25px 20px',
      borderRadius: theme === 'minecraft' ? '4px' : '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      background: theme === 'minecraft'
        ? 'linear-gradient(135deg, rgba(76,175,80,0.2), rgba(46,125,50,0.3))'
        : 'linear-gradient(135deg, rgba(255,105,180,0.2), rgba(155,89,182,0.3))',
      border: theme === 'minecraft'
        ? '3px solid rgba(76,175,80,0.4)'
        : '2px solid rgba(255,105,180,0.3)',
      backdropFilter: 'blur(10px)',
    }),
    childAvatar: {
      fontSize: '3rem',
      marginBottom: '10px',
      display: 'block',
    },
    childName: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1.1rem',
      fontWeight: '700',
      color: 'white',
    },
    childTheme: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.7rem',
      color: 'rgba(255,255,255,0.5)',
      marginTop: '4px',
    },
    noChildren: {
      fontFamily: "'Quicksand', sans-serif",
      color: 'rgba(255,255,255,0.5)',
      fontSize: '1rem',
      marginBottom: '30px',
      position: 'relative',
      zIndex: 1,
    },
    parentBtn: {
      padding: '12px 30px',
      borderRadius: '25px',
      border: '2px solid rgba(255,255,255,0.2)',
      background: 'rgba(255,255,255,0.05)',
      color: 'rgba(255,255,255,0.7)',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      zIndex: 1,
    },
    pinOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      backdropFilter: 'blur(5px)',
    },
    pinCard: {
      background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
      padding: '40px',
      borderRadius: '20px',
      border: '2px solid rgba(155,89,182,0.3)',
      textAlign: 'center',
      maxWidth: '350px',
      width: '90%',
    },
    pinTitle: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1.3rem',
      fontWeight: '700',
      color: 'white',
      marginBottom: '20px',
    },
    pinInput: {
      width: '100%',
      padding: '15px',
      borderRadius: '12px',
      border: '2px solid rgba(155,89,182,0.3)',
      background: 'rgba(255,255,255,0.05)',
      color: 'white',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1.5rem',
      textAlign: 'center',
      letterSpacing: '8px',
      outline: 'none',
    },
    pinSubmit: {
      marginTop: '20px',
      padding: '12px 40px',
      borderRadius: '15px',
      border: 'none',
      background: 'linear-gradient(135deg, #9B59B6, #8E44AD)',
      color: 'white',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    pinCancel: {
      marginTop: '10px',
      padding: '8px 20px',
      borderRadius: '10px',
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,0.5)',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.85rem',
      cursor: 'pointer',
    },
    error: {
      color: '#E74C3C',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.85rem',
      marginTop: '10px',
    },
  }

  return (
    <div style={s.page}>
      <div style={s.stars} />
      <div style={s.logo}>📚</div>
      <h1 style={s.title}>HomeSchool Adventures</h1>
      <p style={s.subtitle}>Apprendre en s'amusant !</p>

      {loading ? (
        <div style={s.noChildren}>Chargement...</div>
      ) : children.length === 0 ? (
        <div style={s.noChildren}>
          Aucun profil enfant. Un parent doit d'abord en creer un !
        </div>
      ) : (
        <div style={s.childrenGrid}>
          {children.map((child) => (
            <div
              key={child.id}
              style={s.childCard(child.theme)}
              onClick={() => onSelectChild(child)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)'
                e.currentTarget.style.boxShadow = child.theme === 'minecraft'
                  ? '0 10px 30px rgba(76,175,80,0.3)'
                  : '0 10px 30px rgba(255,105,180,0.3)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span style={s.childAvatar}>{child.avatar}</span>
              <div style={s.childName}>{child.name}</div>
              <div style={s.childTheme}>
                {child.theme === 'minecraft' ? 'Mode Minecraft' : 'Mode Feerie'}
                {child.grade && ` • ${child.grade}`}
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        style={s.parentBtn}
        onClick={() => setShowParentPin(true)}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(155,89,182,0.2)'
          e.target.style.borderColor = 'rgba(155,89,182,0.5)'
          e.target.style.color = 'white'
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'rgba(255,255,255,0.05)'
          e.target.style.borderColor = 'rgba(255,255,255,0.2)'
          e.target.style.color = 'rgba(255,255,255,0.7)'
        }}
      >
        🔐 Espace Parent
      </button>

      {showParentPin && (
        <div style={s.pinOverlay} onClick={() => setShowParentPin(false)}>
          <div style={s.pinCard} onClick={(e) => e.stopPropagation()}>
            <div style={s.pinTitle}>🔐 Code Parent</div>
            <input
              style={s.pinInput}
              type="password"
              maxLength={8}
              placeholder="••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleParentLogin()}
              autoFocus
            />
            {error && <div style={s.error}>{error}</div>}
            <button style={s.pinSubmit} onClick={handleParentLogin}>
              Entrer
            </button>
            <button style={s.pinCancel} onClick={() => setShowParentPin(false)}>
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

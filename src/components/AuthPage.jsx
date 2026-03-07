import { useState } from 'react'
import { authLogin, authRegister } from '../api'

export default function AuthPage({ onAuth }) {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [familyName, setFamilyName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Email et mot de passe requis')
      return
    }

    if (mode === 'register') {
      if (password !== confirmPassword) {
        setError('Les mots de passe ne correspondent pas')
        return
      }
      if (password.length < 4) {
        setError('Le mot de passe doit faire au moins 4 caracteres')
        return
      }
    }

    setLoading(true)
    try {
      if (mode === 'login') {
        const data = await authLogin(email, password)
        onAuth(data.family)
      } else {
        const data = await authRegister(email, password, familyName || undefined)
        onAuth(data.family)
      }
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
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
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'radial-gradient(2px 2px at 20px 30px, #eee, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #ddd, transparent), radial-gradient(2px 2px at 160px 120px, #fff, transparent), radial-gradient(1px 1px at 200px 60px, #eee, transparent), radial-gradient(2px 2px at 300px 180px, #fff, transparent)',
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
      marginBottom: '30px',
      position: 'relative',
      zIndex: 1,
    },
    card: {
      background: 'linear-gradient(135deg, rgba(26,26,46,0.95), rgba(22,33,62,0.95))',
      padding: 'clamp(25px, 5vw, 40px)',
      borderRadius: '24px',
      border: '2px solid rgba(155,89,182,0.3)',
      maxWidth: '420px',
      width: '90%',
      position: 'relative',
      zIndex: 1,
      backdropFilter: 'blur(20px)',
    },
    tabs: {
      display: 'flex',
      gap: '5px',
      marginBottom: '25px',
      background: 'rgba(255,255,255,0.05)',
      borderRadius: '14px',
      padding: '4px',
    },
    tab: (active) => ({
      flex: 1,
      padding: '10px',
      borderRadius: '11px',
      border: 'none',
      background: active ? 'linear-gradient(135deg, #9B59B6, #8E44AD)' : 'transparent',
      color: active ? 'white' : 'rgba(255,255,255,0.5)',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.9rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }),
    inputGroup: {
      marginBottom: '16px',
    },
    label: {
      display: 'block',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.8rem',
      fontWeight: '600',
      color: 'rgba(255,255,255,0.6)',
      marginBottom: '6px',
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      borderRadius: '12px',
      border: '2px solid rgba(155,89,182,0.2)',
      background: 'rgba(255,255,255,0.05)',
      color: 'white',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s',
      boxSizing: 'border-box',
    },
    submitBtn: {
      width: '100%',
      padding: '14px',
      borderRadius: '14px',
      border: 'none',
      background: 'linear-gradient(135deg, #9B59B6, #8E44AD)',
      color: 'white',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '8px',
      opacity: loading ? 0.7 : 1,
    },
    error: {
      padding: '10px 14px',
      borderRadius: '10px',
      background: 'rgba(231,76,60,0.15)',
      border: '1px solid rgba(231,76,60,0.3)',
      color: '#E74C3C',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.85rem',
      marginBottom: '16px',
    },
    features: {
      display: 'flex',
      gap: '12px',
      marginTop: '20px',
      flexWrap: 'wrap',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1,
    },
    feature: {
      padding: '8px 16px',
      borderRadius: '12px',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.75rem',
      color: 'rgba(255,255,255,0.6)',
    },
  }

  return (
    <div style={s.page}>
      <div style={s.stars} />
      <div style={s.logo}>📚</div>
      <h1 style={s.title}>HomeSchool Adventures</h1>
      <p style={s.subtitle}>L'ecole a la maison, en s'amusant !</p>

      <div style={s.card}>
        <div style={s.tabs}>
          <button style={s.tab(mode === 'login')} onClick={() => { setMode('login'); setError('') }}>
            Se connecter
          </button>
          <button style={s.tab(mode === 'register')} onClick={() => { setMode('register'); setError('') }}>
            Creer un compte
          </button>
        </div>

        {error && <div style={s.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div style={s.inputGroup}>
              <label style={s.label}>Nom de la famille (optionnel)</label>
              <input
                style={s.input}
                type="text"
                placeholder="Ex: Famille Dupont"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
              />
            </div>
          )}

          <div style={s.inputGroup}>
            <label style={s.label}>Email</label>
            <input
              style={s.input}
              type="email"
              placeholder="parent@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div style={s.inputGroup}>
            <label style={s.label}>Mot de passe</label>
            <input
              style={s.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              required
            />
          </div>

          {mode === 'register' && (
            <div style={s.inputGroup}>
              <label style={s.label}>Confirmer le mot de passe</label>
              <input
                style={s.input}
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
          )}

          <button style={s.submitBtn} type="submit" disabled={loading}>
            {loading
              ? 'Chargement...'
              : mode === 'login'
                ? 'Se connecter'
                : 'Creer mon compte'}
          </button>
        </form>
      </div>

      <div style={s.features}>
        <div style={s.feature}>Programme Education Nationale</div>
        <div style={s.feature}>Generation IA</div>
        <div style={s.feature}>Multi-enfants</div>
      </div>
    </div>
  )
}

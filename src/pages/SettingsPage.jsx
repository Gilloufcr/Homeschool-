import { useState } from 'react'
import { updateSettings } from '../api'

export default function SettingsPage({ family, onBack, onLogout, onFamilyUpdate }) {
  const [familyName, setFamilyName] = useState(family?.name || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSaveName = async () => {
    if (!familyName.trim()) return
    setLoading(true)
    setError('')
    setMessage('')
    try {
      await updateSettings({ name: familyName.trim() })
      onFamilyUpdate({ name: familyName.trim() })
      setMessage('Nom mis a jour !')
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    if (newPassword.length < 4) {
      setError('Le nouveau mot de passe doit faire au moins 4 caracteres')
      return
    }
    setLoading(true)
    setError('')
    setMessage('')
    try {
      await updateSettings({ currentPassword, newPassword })
      setMessage('Mot de passe modifie !')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  const s = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '20px',
    },
    container: { maxWidth: '600px', margin: '0 auto' },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      flexWrap: 'wrap',
      gap: '10px',
    },
    title: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
      fontWeight: '700',
      color: 'white',
    },
    backBtn: {
      padding: '8px 20px',
      borderRadius: '12px',
      border: '2px solid rgba(155,89,182,0.3)',
      background: 'rgba(155,89,182,0.1)',
      color: '#9B59B6',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.85rem',
      fontWeight: '600',
      cursor: 'pointer',
    },
    section: {
      padding: '25px',
      borderRadius: '20px',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      marginBottom: '20px',
    },
    sectionTitle: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1.1rem',
      fontWeight: '700',
      color: 'white',
      marginBottom: '20px',
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
      padding: '12px 16px',
      borderRadius: '12px',
      border: '2px solid rgba(155,89,182,0.2)',
      background: 'rgba(255,255,255,0.05)',
      color: 'white',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1rem',
      outline: 'none',
      marginBottom: '14px',
      boxSizing: 'border-box',
    },
    btn: {
      padding: '12px 28px',
      borderRadius: '12px',
      border: 'none',
      background: 'linear-gradient(135deg, #9B59B6, #8E44AD)',
      color: 'white',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.95rem',
      fontWeight: '700',
      cursor: 'pointer',
    },
    logoutBtn: {
      width: '100%',
      padding: '14px',
      borderRadius: '14px',
      border: '2px solid rgba(231,76,60,0.3)',
      background: 'rgba(231,76,60,0.1)',
      color: '#E74C3C',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
    },
    info: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.85rem',
      color: 'rgba(255,255,255,0.5)',
      marginBottom: '12px',
    },
    message: {
      padding: '10px 14px',
      borderRadius: '10px',
      background: 'rgba(46,204,113,0.15)',
      border: '1px solid rgba(46,204,113,0.3)',
      color: '#2ECC71',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.85rem',
      marginBottom: '16px',
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
  }

  return (
    <div style={s.page}>
      <div style={s.container}>
        <div style={s.header}>
          <div style={s.title}>Parametres</div>
          <button style={s.backBtn} onClick={onBack}>Retour</button>
        </div>

        {message && <div style={s.message}>{message}</div>}
        {error && <div style={s.error}>{error}</div>}

        {/* Account info */}
        <div style={s.section}>
          <div style={s.sectionTitle}>Compte</div>
          <div style={s.info}>Email : {family?.email}</div>
          <label style={s.label}>Nom de la famille</label>
          <input
            style={s.input}
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            placeholder="Nom de votre famille"
          />
          <button style={s.btn} onClick={handleSaveName} disabled={loading}>
            Enregistrer
          </button>
        </div>

        {/* Change password */}
        <div style={s.section}>
          <div style={s.sectionTitle}>Changer le mot de passe</div>
          <form onSubmit={handleChangePassword}>
            <label style={s.label}>Mot de passe actuel</label>
            <input
              style={s.input}
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <label style={s.label}>Nouveau mot de passe</label>
            <input
              style={s.input}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <label style={s.label}>Confirmer</label>
            <input
              style={s.input}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button style={s.btn} type="submit" disabled={loading}>
              Modifier le mot de passe
            </button>
          </form>
        </div>

        {/* Logout */}
        <div style={s.section}>
          <button style={s.logoutBtn} onClick={onLogout}>
            Se deconnecter
          </button>
        </div>
      </div>
    </div>
  )
}

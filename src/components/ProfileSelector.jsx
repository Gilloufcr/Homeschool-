import { useState } from 'react'

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  title: {
    fontFamily: "'Quicksand', sans-serif",
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    color: 'white',
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  subtitle: {
    fontFamily: "'Quicksand', sans-serif",
    fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
    color: 'rgba(255,255,255,0.85)',
    marginBottom: '40px',
  },
  cardsContainer: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: '280px',
    padding: '30px',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  cardMinecraft: {
    background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
    border: '4px solid #1B5E20',
    boxShadow: '0 8px 25px rgba(46, 125, 50, 0.4)',
    imageRendering: 'pixelated',
  },
  cardLalilo: {
    background: 'linear-gradient(135deg, #FF69B4, #9B59B6)',
    border: '4px solid #8E44AD',
    boxShadow: '0 8px 25px rgba(155, 89, 182, 0.4)',
  },
  emoji: {
    fontSize: '4rem',
    marginBottom: '15px',
    display: 'block',
  },
  cardTitle: {
    color: 'white',
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '8px',
  },
  cardDesc: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: '0.85rem',
  },
  nameInput: {
    marginTop: '15px',
    padding: '10px 15px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '1rem',
    width: '100%',
    textAlign: 'center',
    outline: 'none',
  },
  startBtn: {
    marginTop: '15px',
    padding: '10px 30px',
    border: 'none',
    borderRadius: '15px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    color: 'white',
  },
}

export default function ProfileSelector({ onSelectProfile }) {
  const [selected, setSelected] = useState(null)
  const [name, setName] = useState('')

  const handleStart = (theme) => {
    if (!name.trim()) return
    onSelectProfile({
      id: theme,
      name: name.trim(),
      theme,
    })
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>HomeSchool Adventures</h1>
      <p style={styles.subtitle}>Qui joue aujourd'hui ?</p>
      <div style={styles.cardsContainer}>
        {/* Minecraft card */}
        <div
          style={{
            ...styles.card,
            ...styles.cardMinecraft,
            transform: selected === 'minecraft' ? 'scale(1.05)' : 'scale(1)',
          }}
          onClick={() => setSelected('minecraft')}
        >
          <span style={styles.emoji}>⛏️</span>
          <div style={{ ...styles.cardTitle, fontSize: '1.3rem' }}>
            Mode Minecraft
          </div>
          <p style={styles.cardDesc}>
            Explore des mondes, mine des savoirs et craft ta reussite !
          </p>
          {selected === 'minecraft' && (
            <div style={{ animation: 'slideUp 0.3s ease-out' }}>
              <input
                style={styles.nameInput}
                placeholder="Ton prenom..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart('minecraft')}
                autoFocus
              />
              <button
                style={{ ...styles.startBtn, background: '#1B5E20', fontSize: '1rem' }}
                onClick={() => handleStart('minecraft')}
              >
                JOUER !
              </button>
            </div>
          )}
        </div>

        {/* Lalilo card */}
        <div
          style={{
            ...styles.card,
            ...styles.cardLalilo,
            transform: selected === 'lalilo' ? 'scale(1.05)' : 'scale(1)',
          }}
          onClick={() => setSelected('lalilo')}
        >
          <span style={styles.emoji}>🦋</span>
          <div style={styles.cardTitle}>Mode Feerie</div>
          <p style={styles.cardDesc}>
            Decouvre la magie des mots et des nombres dans un monde enchante !
          </p>
          {selected === 'lalilo' && (
            <div style={{ animation: 'slideUp 0.3s ease-out' }}>
              <input
                style={styles.nameInput}
                placeholder="Ton prenom..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart('lalilo')}
                autoFocus
              />
              <button
                style={{ ...styles.startBtn, background: '#8E44AD' }}
                onClick={() => handleStart('lalilo')}
              >
                C'est parti !
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

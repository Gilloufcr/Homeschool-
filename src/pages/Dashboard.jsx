import XPBar from '../components/XPBar'

const Dashboard = ({ profile, progress, onNavigate, onLogout }) => {
  const isMinecraft = profile.theme === 'minecraft'

  const subjects = [
    {
      id: 'math',
      name: isMinecraft ? 'Mathematiques' : 'Mathematiques',
      icon: isMinecraft ? '🔢' : '🔢',
      desc: isMinecraft ? 'Mine des nombres et craft des calculs' : 'Explore le monde magique des nombres',
      color: isMinecraft ? '#4CAF50' : 'linear-gradient(135deg, #FF69B4, #FF1493)',
      border: isMinecraft ? '#2E7D32' : '#FF69B4',
    },
    {
      id: 'french',
      name: isMinecraft ? 'Francais' : 'Francais',
      icon: isMinecraft ? '📜' : '📖',
      desc: isMinecraft ? 'Dechiffre les grimoires anciens' : 'Decouvre la magie des mots',
      color: isMinecraft ? '#1976D2' : 'linear-gradient(135deg, #9B59B6, #8E44AD)',
      border: isMinecraft ? '#0D47A1' : '#9B59B6',
    },
  ]

  const pageStyle = {
    minHeight: '100vh',
    padding: '20px',
    background: isMinecraft
      ? 'linear-gradient(180deg, #87CEEB 0%, #4CAF50 100%)'
      : 'linear-gradient(135deg, #fff5f9 0%, #f0e6ff 50%, #e6f3ff 100%)',
  }

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px',
  }

  const greetingStyle = {
    fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
    fontSize: isMinecraft ? '0.8rem' : '1.4rem',
    fontWeight: '700',
    color: isMinecraft ? '#FFD700' : '#333',
    textShadow: isMinecraft ? '2px 2px 0 #000' : 'none',
  }

  const statsGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '12px',
    marginBottom: '25px',
  }

  const statCardStyle = (bg) => ({
    padding: isMinecraft ? '12px' : '15px',
    borderRadius: isMinecraft ? '0' : '15px',
    background: isMinecraft ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)',
    border: isMinecraft ? '3px solid #555' : '2px solid rgba(155,89,182,0.1)',
    textAlign: 'center',
    boxShadow: isMinecraft ? 'none' : '0 2px 10px rgba(0,0,0,0.05)',
  })

  const statValueStyle = {
    fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
    fontSize: isMinecraft ? '1rem' : '1.5rem',
    fontWeight: '700',
    color: isMinecraft ? '#7CFC00' : '#9B59B6',
  }

  const statLabelStyle = {
    fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
    fontSize: isMinecraft ? '0.45rem' : '0.75rem',
    color: isMinecraft ? '#aaa' : '#888',
    marginTop: '4px',
  }

  const subjectCardStyle = (subject) => ({
    padding: isMinecraft ? '20px' : '25px',
    borderRadius: isMinecraft ? '0' : '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: isMinecraft ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.95)',
    border: isMinecraft ? `3px solid ${subject.border}` : `2px solid ${subject.border}33`,
    boxShadow: isMinecraft ? 'none' : '0 4px 15px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  })

  const logoutBtnStyle = {
    padding: isMinecraft ? '8px 12px' : '8px 16px',
    borderRadius: isMinecraft ? '0' : '12px',
    border: isMinecraft ? '2px outset #777' : 'none',
    background: isMinecraft ? '#555' : 'rgba(231,76,60,0.1)',
    color: isMinecraft ? '#fff' : '#E74C3C',
    fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
    fontSize: isMinecraft ? '0.5rem' : '0.85rem',
    fontWeight: '700',
    cursor: 'pointer',
  }

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={headerStyle}>
          <div style={greetingStyle}>
            {isMinecraft ? `> Salut ${profile.name} !` : `Bonjour ${profile.name} !`}
          </div>
          <button style={logoutBtnStyle} onClick={onLogout}>
            {isMinecraft ? 'DECONNEXION' : 'Changer de profil'}
          </button>
        </div>

        <XPBar xp={progress.xp} level={progress.level} theme={profile.theme} />

        <div style={statsGrid}>
          <div style={statCardStyle()}>
            <div style={statValueStyle}>{progress.level}</div>
            <div style={statLabelStyle}>{isMinecraft ? 'NIVEAU' : 'Niveau'}</div>
          </div>
          <div style={statCardStyle()}>
            <div style={statValueStyle}>{progress.xp}</div>
            <div style={statLabelStyle}>{isMinecraft ? 'XP TOTAL' : 'XP Total'}</div>
          </div>
          <div style={statCardStyle()}>
            <div style={statValueStyle}>{progress.streak}</div>
            <div style={statLabelStyle}>{isMinecraft ? 'SERIE' : 'Jours de suite'}</div>
          </div>
          <div style={statCardStyle()}>
            <div style={statValueStyle}>{progress.completedExercises.length}</div>
            <div style={statLabelStyle}>{isMinecraft ? 'EXERCICES' : 'Exercices faits'}</div>
          </div>
        </div>

        <div style={{
          fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
          fontSize: isMinecraft ? '0.7rem' : '1.2rem',
          fontWeight: '700',
          color: isMinecraft ? '#FFD700' : '#333',
          marginBottom: '15px',
          textShadow: isMinecraft ? '1px 1px 0 #000' : 'none',
        }}>
          {isMinecraft ? '> MATIERES' : 'Choisis ta matiere'}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {subjects.map((subject) => (
            <div
              key={subject.id}
              style={subjectCardStyle(subject)}
              onClick={() => onNavigate(subject.id)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateX(8px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateX(0)'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: isMinecraft ? '0' : '15px',
                background: subject.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                border: isMinecraft ? `2px solid ${subject.border}` : 'none',
                flexShrink: 0,
              }}>
                {subject.icon}
              </div>
              <div>
                <div style={{
                  fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
                  fontSize: isMinecraft ? '0.7rem' : '1.1rem',
                  fontWeight: '700',
                  color: isMinecraft ? '#fff' : '#333',
                  marginBottom: '4px',
                }}>
                  {subject.name}
                </div>
                <div style={{
                  fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
                  fontSize: isMinecraft ? '0.45rem' : '0.8rem',
                  color: isMinecraft ? '#aaa' : '#888',
                  lineHeight: isMinecraft ? '1.6' : '1.4',
                }}>
                  {subject.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

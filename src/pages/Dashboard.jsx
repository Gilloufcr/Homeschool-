import XPBar from '../components/XPBar'
import BadgeDisplay from '../components/BadgeDisplay'

const Dashboard = ({ profile, progress, showBadges, onToggleBadges, onNavigate, onLogout }) => {
  const isMinecraft = profile.theme === 'minecraft'

  const subjects = [
    {
      id: 'math',
      name: 'Mathematiques',
      icon: '🔢',
      desc: isMinecraft ? 'Mine des nombres et craft des calculs' : 'Explore le monde magique des nombres',
      color: isMinecraft ? '#4CAF50' : 'linear-gradient(135deg, #FF69B4, #FF1493)',
      border: isMinecraft ? '#2E7D32' : '#FF69B4',
    },
    {
      id: 'french',
      name: 'Francais',
      icon: isMinecraft ? '📜' : '📖',
      desc: isMinecraft ? 'Dechiffre les grimoires anciens' : 'Decouvre la magie des mots',
      color: isMinecraft ? '#1976D2' : 'linear-gradient(135deg, #9B59B6, #8E44AD)',
      border: isMinecraft ? '#0D47A1' : '#9B59B6',
    },
    {
      id: 'history',
      name: 'Histoire',
      icon: '🏛️',
      desc: isMinecraft ? 'Explore les donjons du passe' : 'Voyage a travers le temps',
      color: isMinecraft ? '#E65100' : 'linear-gradient(135deg, #E67E22, #D35400)',
      border: isMinecraft ? '#BF360C' : '#E67E22',
    },
    {
      id: 'geography',
      name: 'Geographie',
      icon: '🌍',
      desc: isMinecraft ? 'Cartographie les biomes du monde' : 'Decouvre les merveilles de la Terre',
      color: isMinecraft ? '#00796B' : 'linear-gradient(135deg, #2ECC71, #27AE60)',
      border: isMinecraft ? '#004D40' : '#2ECC71',
    },
    {
      id: 'science',
      name: 'Sciences',
      icon: '🔬',
      desc: isMinecraft ? 'Laboratoire de potions et decouvertes' : 'Perce les secrets de la nature',
      color: isMinecraft ? '#F9A825' : 'linear-gradient(135deg, #F1C40F, #F39C12)',
      border: isMinecraft ? '#F57F17' : '#F1C40F',
    },
    {
      id: 'english',
      name: 'Anglais',
      icon: '🇬🇧',
      desc: isMinecraft ? 'Apprends l\'enchantement anglais' : 'Parle la langue de Shakespeare',
      color: isMinecraft ? '#C62828' : 'linear-gradient(135deg, #E74C3C, #C0392B)',
      border: isMinecraft ? '#B71C1C' : '#E74C3C',
    },
  ]

  const pageStyle = {
    minHeight: '100vh',
    padding: 'clamp(16px, 2.5vw, 40px)',
    background: isMinecraft
      ? 'linear-gradient(180deg, #87CEEB 0%, #a8d8ea 40%, #4CAF50 60%, #2E7D32 100%)'
      : 'linear-gradient(135deg, #fff5f9 0%, #f0e6ff 50%, #e6f3ff 100%)',
  }

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'clamp(16px, 2vw, 28px)',
    flexWrap: 'wrap',
    gap: '10px',
  }

  const greetingStyle = {
    fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
    fontSize: isMinecraft ? 'clamp(0.8rem, 1.2vw, 1.4rem)' : 'clamp(1.4rem, 1.8vw, 2.2rem)',
    fontWeight: '700',
    color: isMinecraft ? '#FFD700' : '#333',
    textShadow: isMinecraft ? '2px 2px 0 #000' : 'none',
  }

  const statCardStyle = () => ({
    padding: isMinecraft ? 'clamp(10px, 1.2vw, 18px)' : 'clamp(12px, 1.5vw, 22px)',
    borderRadius: isMinecraft ? '0' : '15px',
    background: isMinecraft ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)',
    border: isMinecraft ? '3px solid #555' : '2px solid rgba(155,89,182,0.1)',
    textAlign: 'center',
    boxShadow: isMinecraft ? 'none' : '0 2px 10px rgba(0,0,0,0.05)',
  })

  const statValueStyle = {
    fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
    fontSize: isMinecraft ? 'clamp(1rem, 1.5vw, 1.8rem)' : 'clamp(1.5rem, 2vw, 2.5rem)',
    fontWeight: '700',
    color: isMinecraft ? '#7CFC00' : '#9B59B6',
  }

  const statLabelStyle = {
    fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
    fontSize: isMinecraft ? 'clamp(0.45rem, 0.6vw, 0.8rem)' : 'clamp(0.75rem, 0.9vw, 1.1rem)',
    color: isMinecraft ? '#aaa' : '#888',
    marginTop: '4px',
  }

  const subjectCardStyle = (subject) => ({
    padding: isMinecraft ? 'clamp(12px, 1.5vw, 22px)' : 'clamp(16px, 2vw, 28px)',
    borderRadius: isMinecraft ? '0' : '18px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: isMinecraft ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.95)',
    border: isMinecraft ? `3px solid ${subject.border}` : `2px solid ${subject.border}33`,
    boxShadow: isMinecraft ? 'none' : '0 4px 15px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(12px, 1.5vw, 22px)',
  })

  const logoutBtnStyle = {
    padding: isMinecraft ? 'clamp(8px, 1vw, 14px) clamp(12px, 1.5vw, 20px)' : 'clamp(8px, 1vw, 14px) clamp(16px, 2vw, 28px)',
    borderRadius: isMinecraft ? '0' : '12px',
    border: isMinecraft ? '2px outset #777' : 'none',
    background: isMinecraft ? '#555' : 'rgba(231,76,60,0.1)',
    color: isMinecraft ? '#fff' : '#E74C3C',
    fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
    fontSize: isMinecraft ? 'clamp(0.5rem, 0.7vw, 0.9rem)' : 'clamp(0.85rem, 1vw, 1.2rem)',
    fontWeight: '700',
    cursor: 'pointer',
  }

  const badgeToggleStyle = {
    padding: isMinecraft ? 'clamp(6px, 0.8vw, 12px) clamp(10px, 1.2vw, 18px)' : 'clamp(8px, 1vw, 14px) clamp(16px, 2vw, 28px)',
    borderRadius: isMinecraft ? '0' : '12px',
    border: isMinecraft ? '2px outset #777' : '2px solid rgba(155,89,182,0.2)',
    background: showBadges
      ? (isMinecraft ? 'rgba(255,215,0,0.2)' : 'rgba(155,89,182,0.1)')
      : 'transparent',
    color: isMinecraft ? '#FFD700' : '#9B59B6',
    fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
    fontSize: isMinecraft ? 'clamp(0.45rem, 0.65vw, 0.85rem)' : 'clamp(0.8rem, 1vw, 1.2rem)',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }

  const iconSize = 'clamp(40px, 4.5vw, 65px)'

  return (
    <div style={pageStyle}>
      <div className="app-container">
        <div style={headerStyle}>
          <div style={greetingStyle}>
            {isMinecraft ? `> Salut ${profile.name} !` : `Bonjour ${profile.name} !`}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button style={badgeToggleStyle} onClick={onToggleBadges}>
              {showBadges ? '🏆 Cacher badges' : '🏆 Badges'}
            </button>
            <button style={logoutBtnStyle} onClick={onLogout}>
              {isMinecraft ? 'QUITTER' : 'Changer de profil'}
            </button>
          </div>
        </div>

        <XPBar xp={progress.xp} level={progress.level} theme={profile.theme} />

        <div className="stats-grid" style={{ marginTop: 'clamp(12px, 1.5vw, 24px)', marginBottom: 'clamp(16px, 2vw, 28px)' }}>
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

        {/* Optional badges section */}
        {showBadges && (
          <div style={{
            marginBottom: 'clamp(20px, 2.5vw, 35px)',
            borderRadius: isMinecraft ? '0' : '20px',
            background: isMinecraft ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.9)',
            border: isMinecraft ? '3px solid #555' : '2px solid rgba(155,89,182,0.1)',
            boxShadow: isMinecraft ? 'none' : '0 2px 10px rgba(0,0,0,0.05)',
            animation: 'slideUp 0.3s ease-out',
          }}>
            <BadgeDisplay progress={progress} theme={profile.theme} />
          </div>
        )}

        {/* Interactive Map Banner */}
        <div
          onClick={() => onNavigate('map')}
          style={{
            padding: isMinecraft ? 'clamp(14px, 1.8vw, 26px)' : 'clamp(18px, 2.2vw, 32px)',
            borderRadius: isMinecraft ? '0' : '20px',
            background: isMinecraft
              ? 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(39,60,30,0.8))'
              : 'linear-gradient(135deg, rgba(93,173,226,0.15), rgba(46,204,113,0.15))',
            border: isMinecraft
              ? '3px solid #4CAF50'
              : '2px solid rgba(93,173,226,0.3)',
            cursor: 'pointer',
            marginBottom: 'clamp(20px, 2.5vw, 35px)',
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(12px, 1.5vw, 22px)',
            transition: 'all 0.3s ease',
            boxShadow: isMinecraft ? 'none' : '0 4px 15px rgba(93,173,226,0.15)',
            animation: 'slideUp 0.4s ease-out',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)'
            e.currentTarget.style.boxShadow = isMinecraft
              ? '0 4px 15px rgba(76,175,80,0.3)'
              : '0 8px 25px rgba(93,173,226,0.25)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.boxShadow = isMinecraft ? 'none' : '0 4px 15px rgba(93,173,226,0.15)'
          }}
        >
          <div style={{
            fontSize: 'clamp(2rem, 3vw, 3.5rem)',
            animation: 'float 3s ease-in-out infinite',
          }}>
            🗺️
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
              fontSize: isMinecraft ? 'clamp(0.6rem, 0.9vw, 1.1rem)' : 'clamp(1.1rem, 1.4vw, 1.7rem)',
              fontWeight: '700',
              color: isMinecraft ? '#7CFC00' : '#2C3E50',
              marginBottom: '4px',
            }}>
              {isMinecraft ? '> CARTE INTERACTIVE' : 'Carte Interactive'}
            </div>
            <div style={{
              fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
              fontSize: isMinecraft ? 'clamp(0.35rem, 0.55vw, 0.75rem)' : 'clamp(0.8rem, 1vw, 1.2rem)',
              color: isMinecraft ? '#aaa' : '#7F8C8D',
              lineHeight: isMinecraft ? '1.6' : '1.4',
            }}>
              {isMinecraft
                ? 'Explore la carte et decouvre l\'histoire et la geo !'
                : 'Explore le monde, decouvre des lieux historiques et reponds aux quiz !'}
            </div>
          </div>
          <div style={{
            fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
            fontSize: isMinecraft ? 'clamp(0.5rem, 0.7vw, 0.9rem)' : 'clamp(0.9rem, 1.1vw, 1.4rem)',
            color: isMinecraft ? '#FFD700' : '#5DADE2',
            fontWeight: '700',
          }}>
            {isMinecraft ? '>>>' : 'Explorer →'}
          </div>
        </div>

        <div style={{
          fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
          fontSize: isMinecraft ? 'clamp(0.7rem, 1vw, 1.3rem)' : 'clamp(1.2rem, 1.5vw, 1.8rem)',
          fontWeight: '700',
          color: isMinecraft ? '#FFD700' : '#333',
          marginBottom: 'clamp(12px, 1.5vw, 22px)',
          textShadow: isMinecraft ? '1px 1px 0 #000' : 'none',
        }}>
          {isMinecraft ? '> MATIERES' : 'Choisis ta matiere'}
        </div>

        <div className="subject-grid">
          {subjects.map((subject, idx) => (
            <div
              key={subject.id}
              style={{
                ...subjectCardStyle(subject),
                animation: `slideUp ${0.3 + idx * 0.05}s ease-out`,
              }}
              onClick={() => onNavigate(subject.id)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)'
                e.currentTarget.style.boxShadow = isMinecraft
                  ? `0 4px 15px ${subject.border}44`
                  : `0 8px 25px ${subject.border}33`
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = isMinecraft ? 'none' : '0 4px 15px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{
                width: iconSize,
                height: iconSize,
                borderRadius: isMinecraft ? '0' : '14px',
                background: subject.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(1.4rem, 2vw, 2.4rem)',
                border: isMinecraft ? `2px solid ${subject.border}` : 'none',
                flexShrink: 0,
              }}>
                {subject.icon}
              </div>
              <div>
                <div style={{
                  fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
                  fontSize: isMinecraft ? 'clamp(0.6rem, 0.85vw, 1.1rem)' : 'clamp(1rem, 1.3vw, 1.5rem)',
                  fontWeight: '700',
                  color: isMinecraft ? '#fff' : '#333',
                  marginBottom: '3px',
                }}>
                  {subject.name}
                </div>
                <div style={{
                  fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
                  fontSize: isMinecraft ? 'clamp(0.4rem, 0.6vw, 0.8rem)' : 'clamp(0.75rem, 0.95vw, 1.15rem)',
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

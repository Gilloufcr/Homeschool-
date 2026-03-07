import XPBar from '../components/XPBar'
import BadgeDisplay from '../components/BadgeDisplay'
import UKFlag from '../components/UKFlag'

const Dashboard = ({ profile, progress, showBadges, onToggleBadges, onNavigate, onLogout }) => {
  const isMinecraft = profile.theme === 'minecraft'
  const font = "'Quicksand', sans-serif"

  const subjects = [
    {
      id: 'math',
      name: 'Mathematiques',
      icon: '🔢',
      desc: isMinecraft ? 'Mine des nombres et craft des calculs' : 'Explore le monde magique des nombres',
      color: isMinecraft ? 'linear-gradient(135deg, #4CAF50, #388E3C)' : 'linear-gradient(135deg, #FF69B4, #FF1493)',
      border: isMinecraft ? '#4CAF50' : '#FF69B4',
    },
    {
      id: 'french',
      name: 'Francais',
      icon: isMinecraft ? '📜' : '📖',
      desc: isMinecraft ? 'Dechiffre les grimoires anciens' : 'Decouvre la magie des mots',
      color: isMinecraft ? 'linear-gradient(135deg, #1976D2, #1565C0)' : 'linear-gradient(135deg, #9B59B6, #8E44AD)',
      border: isMinecraft ? '#1976D2' : '#9B59B6',
    },
    {
      id: 'history',
      name: 'Histoire',
      icon: '🏛️',
      desc: isMinecraft ? 'Explore les donjons du passe' : 'Voyage a travers le temps',
      color: isMinecraft ? 'linear-gradient(135deg, #E65100, #BF360C)' : 'linear-gradient(135deg, #E67E22, #D35400)',
      border: isMinecraft ? '#E65100' : '#E67E22',
    },
    {
      id: 'geography',
      name: 'Geographie',
      icon: '🌍',
      desc: isMinecraft ? 'Cartographie les biomes du monde' : 'Decouvre les merveilles de la Terre',
      color: isMinecraft ? 'linear-gradient(135deg, #00796B, #00695C)' : 'linear-gradient(135deg, #2ECC71, #27AE60)',
      border: isMinecraft ? '#00796B' : '#2ECC71',
    },
    {
      id: 'science',
      name: 'Sciences',
      icon: '🔬',
      desc: isMinecraft ? 'Laboratoire de potions et decouvertes' : 'Perce les secrets de la nature',
      color: isMinecraft ? 'linear-gradient(135deg, #F9A825, #F57F17)' : 'linear-gradient(135deg, #F1C40F, #F39C12)',
      border: isMinecraft ? '#F9A825' : '#F1C40F',
    },
    {
      id: 'english',
      name: 'Anglais',
      icon: <UKFlag size="1.6em" />,
      desc: isMinecraft ? 'Apprends l\'enchantement anglais' : 'Parle la langue de Shakespeare',
      color: isMinecraft ? 'linear-gradient(135deg, #C62828, #B71C1C)' : 'linear-gradient(135deg, #E74C3C, #C0392B)',
      border: isMinecraft ? '#C62828' : '#E74C3C',
    },
  ]

  const pageStyle = {
    minHeight: '100vh',
    padding: 'clamp(16px, 2.5vw, 40px)',
    position: 'relative',
    overflow: 'hidden',
  }

  // CSS background for the page - will be set via a background div
  const bgStyle = isMinecraft ? {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0,
    background: `
      linear-gradient(180deg,
        #4A90D9 0%,
        #87CEEB 20%,
        #87CEEB 35%,
        #6AAF50 50%,
        #5B8C3E 60%,
        #8B6914 75%,
        #6B4F1A 85%,
        #606060 100%
      )`,
  } : {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0,
    background: `
      linear-gradient(180deg,
        #E8D5F5 0%,
        #F0E6FF 25%,
        #E6F3FF 50%,
        #D4F5D4 75%,
        #C8F0C8 100%
      )`,
  }

  const glassCard = (extra = {}) => ({
    padding: 'clamp(12px, 1.5vw, 22px)',
    borderRadius: '16px',
    background: isMinecraft
      ? 'rgba(20, 20, 30, 0.75)'
      : 'rgba(255,255,255,0.9)',
    border: isMinecraft
      ? '1px solid rgba(255,255,255,0.08)'
      : '2px solid rgba(155,89,182,0.1)',
    boxShadow: isMinecraft
      ? '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
      : '0 2px 10px rgba(0,0,0,0.05)',
    backdropFilter: 'blur(8px)',
    textAlign: 'center',
    ...extra,
  })

  const iconSize = 'clamp(40px, 4.5vw, 65px)'

  return (
    <div style={pageStyle}>
      {/* Background */}
      <div style={bgStyle} />

      {/* Decorative emojis for minecraft */}
      {isMinecraft && (
        <>
          <div style={{ position: 'fixed', top: '5%', left: '3%', fontSize: 'clamp(2rem, 3vw, 4rem)', opacity: 0.15, zIndex: 0, pointerEvents: 'none' }}>☁️</div>
          <div style={{ position: 'fixed', top: '3%', right: '15%', fontSize: 'clamp(1.5rem, 2vw, 3rem)', opacity: 0.15, zIndex: 0, pointerEvents: 'none' }}>☁️</div>
          <div style={{ position: 'fixed', top: '8%', right: '5%', fontSize: 'clamp(2rem, 2.5vw, 3.5rem)', opacity: 0.2, zIndex: 0, pointerEvents: 'none' }}>☀️</div>
          <div style={{ position: 'fixed', bottom: '20%', left: '2%', fontSize: 'clamp(1.5rem, 2vw, 3rem)', opacity: 0.12, zIndex: 0, pointerEvents: 'none' }}>🌲</div>
          <div style={{ position: 'fixed', bottom: '25%', right: '3%', fontSize: 'clamp(1.5rem, 2vw, 3rem)', opacity: 0.12, zIndex: 0, pointerEvents: 'none' }}>🌲</div>
          <div style={{ position: 'fixed', bottom: '8%', left: '8%', fontSize: 'clamp(1rem, 1.5vw, 2rem)', opacity: 0.1, zIndex: 0, pointerEvents: 'none' }}>💎</div>
          <div style={{ position: 'fixed', bottom: '5%', right: '10%', fontSize: 'clamp(1rem, 1.5vw, 2rem)', opacity: 0.1, zIndex: 0, pointerEvents: 'none' }}>⛏️</div>
        </>
      )}
      {!isMinecraft && (
        <>
          <div style={{ position: 'fixed', top: '5%', left: '5%', fontSize: 'clamp(2rem, 3vw, 4rem)', opacity: 0.12, zIndex: 0, pointerEvents: 'none' }}>🌈</div>
          <div style={{ position: 'fixed', top: '8%', right: '8%', fontSize: 'clamp(1.5rem, 2vw, 3rem)', opacity: 0.1, zIndex: 0, pointerEvents: 'none' }}>🦋</div>
          <div style={{ position: 'fixed', bottom: '15%', left: '3%', fontSize: 'clamp(1.5rem, 2vw, 2.5rem)', opacity: 0.1, zIndex: 0, pointerEvents: 'none' }}>🌸</div>
          <div style={{ position: 'fixed', bottom: '10%', right: '5%', fontSize: 'clamp(1.5rem, 2vw, 2.5rem)', opacity: 0.1, zIndex: 0, pointerEvents: 'none' }}>🦄</div>
        </>
      )}

      <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 'clamp(16px, 2vw, 28px)', flexWrap: 'wrap', gap: '10px',
        }}>
          <div style={{
            fontFamily: font,
            fontSize: 'clamp(1.3rem, 1.8vw, 2.2rem)',
            fontWeight: '800',
            color: isMinecraft ? '#FFD700' : '#333',
            textShadow: isMinecraft ? '0 2px 8px rgba(0,0,0,0.5)' : 'none',
          }}>
            {isMinecraft ? `Salut ${profile.name} !` : `Bonjour ${profile.name} !`}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button style={{
              padding: 'clamp(8px, 1vw, 14px) clamp(14px, 1.8vw, 24px)',
              borderRadius: '12px',
              border: isMinecraft ? '1px solid rgba(255,215,0,0.3)' : '2px solid rgba(155,89,182,0.2)',
              background: showBadges
                ? (isMinecraft ? 'rgba(255,215,0,0.15)' : 'rgba(155,89,182,0.1)')
                : (isMinecraft ? 'rgba(0,0,0,0.4)' : 'transparent'),
              color: isMinecraft ? '#FFD700' : '#9B59B6',
              fontFamily: font, fontSize: 'clamp(0.8rem, 1vw, 1.2rem)', fontWeight: '700',
              cursor: 'pointer', transition: 'all 0.3s ease',
              backdropFilter: 'blur(4px)',
            }} onClick={onToggleBadges}>
              {showBadges ? '🏆 Cacher badges' : '🏆 Badges'}
            </button>
            <button style={{
              padding: 'clamp(8px, 1vw, 14px) clamp(14px, 1.8vw, 24px)',
              borderRadius: '12px',
              border: isMinecraft ? '1px solid rgba(255,255,255,0.1)' : 'none',
              background: isMinecraft ? 'rgba(0,0,0,0.4)' : 'rgba(231,76,60,0.1)',
              color: isMinecraft ? 'rgba(255,255,255,0.8)' : '#E74C3C',
              fontFamily: font, fontSize: 'clamp(0.8rem, 1vw, 1.2rem)', fontWeight: '700',
              cursor: 'pointer', backdropFilter: 'blur(4px)',
            }} onClick={onLogout}>
              {isMinecraft ? 'Quitter' : 'Changer de profil'}
            </button>
          </div>
        </div>

        <XPBar xp={progress.xp} level={progress.level} theme={profile.theme} />

        {/* Stats grid */}
        <div className="stats-grid" style={{ marginTop: 'clamp(12px, 1.5vw, 24px)', marginBottom: 'clamp(16px, 2vw, 28px)' }}>
          {[
            { value: progress.level, label: 'Niveau' },
            { value: progress.xp, label: 'XP Total' },
            { value: progress.streak, label: isMinecraft ? 'Serie' : 'Jours de suite' },
            { value: progress.completedExercises.length, label: isMinecraft ? 'Exercices' : 'Exercices faits' },
          ].map((stat, i) => (
            <div key={i} style={glassCard()}>
              <div style={{
                fontFamily: font,
                fontSize: 'clamp(1.3rem, 1.8vw, 2.2rem)',
                fontWeight: '800',
                color: isMinecraft ? '#7CFC00' : '#9B59B6',
              }}>{stat.value}</div>
              <div style={{
                fontFamily: font,
                fontSize: 'clamp(0.7rem, 0.85vw, 1rem)',
                color: isMinecraft ? 'rgba(255,255,255,0.6)' : '#888',
                marginTop: '4px', fontWeight: '600',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Badges */}
        {showBadges && (
          <div style={{
            ...glassCard({ textAlign: 'left' }),
            marginBottom: 'clamp(20px, 2.5vw, 35px)',
            animation: 'slideUp 0.3s ease-out',
          }}>
            <BadgeDisplay progress={progress} theme={profile.theme} />
          </div>
        )}

        {/* Interactive Map Banner */}
        <div
          onClick={() => onNavigate('map')}
          style={{
            ...glassCard({ textAlign: 'left' }),
            display: 'flex', alignItems: 'center',
            gap: 'clamp(12px, 1.5vw, 22px)',
            cursor: 'pointer',
            marginBottom: 'clamp(20px, 2.5vw, 35px)',
            transition: 'all 0.3s ease',
            border: isMinecraft ? '1px solid rgba(76,175,80,0.3)' : '2px solid rgba(93,173,226,0.3)',
            animation: 'slideUp 0.4s ease-out',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)'
            e.currentTarget.style.boxShadow = isMinecraft
              ? '0 8px 25px rgba(76,175,80,0.3)' : '0 8px 25px rgba(93,173,226,0.25)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.boxShadow = isMinecraft
              ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.05)'
          }}
        >
          <div style={{ fontSize: 'clamp(2rem, 3vw, 3.5rem)', animation: 'float 3s ease-in-out infinite' }}>
            🗺️
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: font,
              fontSize: 'clamp(1rem, 1.3vw, 1.6rem)',
              fontWeight: '800',
              color: isMinecraft ? '#7CFC00' : '#2C3E50',
              marginBottom: '4px',
            }}>
              {isMinecraft ? 'Carte Interactive' : 'Carte Interactive'}
            </div>
            <div style={{
              fontFamily: font,
              fontSize: 'clamp(0.75rem, 0.95vw, 1.15rem)',
              color: isMinecraft ? 'rgba(255,255,255,0.6)' : '#7F8C8D',
              lineHeight: '1.4',
            }}>
              {isMinecraft
                ? 'Explore la carte et decouvre l\'histoire et la geo !'
                : 'Explore le monde, decouvre des lieux historiques et reponds aux quiz !'}
            </div>
          </div>
          <div style={{
            fontFamily: font,
            fontSize: 'clamp(0.9rem, 1.1vw, 1.4rem)',
            color: isMinecraft ? '#FFD700' : '#5DADE2',
            fontWeight: '700',
          }}>
            Explorer →
          </div>
        </div>

        {/* Section title */}
        <div style={{
          fontFamily: font,
          fontSize: 'clamp(1.1rem, 1.4vw, 1.8rem)',
          fontWeight: '800',
          color: isMinecraft ? '#FFD700' : '#333',
          marginBottom: 'clamp(12px, 1.5vw, 22px)',
          textShadow: isMinecraft ? '0 2px 6px rgba(0,0,0,0.4)' : 'none',
        }}>
          {isMinecraft ? 'Matieres' : 'Choisis ta matiere'}
        </div>

        {/* Subject cards */}
        <div className="subject-grid">
          {subjects.map((subject, idx) => (
            <div
              key={subject.id}
              style={{
                padding: 'clamp(14px, 1.8vw, 24px)',
                borderRadius: '18px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: isMinecraft ? 'rgba(20, 20, 30, 0.75)' : 'rgba(255,255,255,0.95)',
                border: isMinecraft
                  ? `2px solid ${subject.border}44`
                  : `2px solid ${subject.border}33`,
                boxShadow: isMinecraft
                  ? '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
                  : '0 4px 15px rgba(0,0,0,0.08)',
                display: 'flex', alignItems: 'center',
                gap: 'clamp(12px, 1.5vw, 22px)',
                backdropFilter: 'blur(8px)',
                animation: `slideUp ${0.3 + idx * 0.05}s ease-out`,
              }}
              onClick={() => onNavigate(subject.id)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)'
                e.currentTarget.style.boxShadow = isMinecraft
                  ? `0 8px 25px ${subject.border}33`
                  : `0 8px 25px ${subject.border}33`
                e.currentTarget.style.borderColor = `${subject.border}88`
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = isMinecraft
                  ? '0 4px 16px rgba(0,0,0,0.3)'
                  : '0 4px 15px rgba(0,0,0,0.08)'
                e.currentTarget.style.borderColor = isMinecraft
                  ? `${subject.border}44`
                  : `${subject.border}33`
              }}
            >
              <div style={{
                width: iconSize, height: iconSize,
                borderRadius: '14px',
                background: subject.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 'clamp(1.4rem, 2vw, 2.4rem)',
                flexShrink: 0,
                boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
              }}>
                {subject.icon}
              </div>
              <div>
                <div style={{
                  fontFamily: font,
                  fontSize: 'clamp(0.95rem, 1.2vw, 1.5rem)',
                  fontWeight: '800',
                  color: isMinecraft ? '#fff' : '#333',
                  marginBottom: '3px',
                }}>
                  {subject.name}
                </div>
                <div style={{
                  fontFamily: font,
                  fontSize: 'clamp(0.75rem, 0.9vw, 1.1rem)',
                  color: isMinecraft ? 'rgba(255,255,255,0.6)' : '#888',
                  lineHeight: '1.4',
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

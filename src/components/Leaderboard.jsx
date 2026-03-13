const Leaderboard = ({ children, progressMap, currentChildId, theme }) => {
  const isMinecraft = theme === 'minecraft'
  const font = "'Quicksand', sans-serif"

  // Sort children by XP descending
  const ranked = [...children]
    .map(child => ({
      ...child,
      ...(progressMap[child.id] || { xp: 0, level: 1, completedExercises: [], streak: 0, medals: {} }),
    }))
    .sort((a, b) => b.xp - a.xp)

  const totalExercises = ranked.reduce((sum, c) => {
    const ex = Array.isArray(c.completedExercises) ? c.completedExercises.length : 0
    return sum + ex
  }, 0)

  const countMedals = (medals) => {
    if (!medals || typeof medals !== 'object') return { gold: 0, silver: 0, bronze: 0 }
    const values = Object.values(medals)
    return {
      gold: values.filter(m => m === 'gold').length,
      silver: values.filter(m => m === 'silver').length,
      bronze: values.filter(m => m === 'bronze').length,
    }
  }

  const currentRank = ranked.findIndex(c => c.id === currentChildId)
  const currentChild = ranked[currentRank]

  // Fun message
  const getFunMessage = () => {
    if (ranked.length <= 1) return null
    if (currentRank === 0) {
      return isMinecraft ? 'Tu domines le serveur !' : 'Tu es en tete !'
    }
    const ahead = ranked[currentRank - 1]
    const gap = ahead.xp - currentChild.xp
    return `Plus que ${gap} XP pour depasser ${ahead.name} !`
  }

  const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32']
  const rankEmojis = ['\u{1F451}', '\u{1F948}', '\u{1F949}']

  const containerStyle = {
    padding: 'clamp(14px, 1.8vw, 24px)',
    borderRadius: '16px',
    background: isMinecraft
      ? 'rgba(20, 20, 30, 0.8)'
      : 'rgba(255, 255, 255, 0.92)',
    border: isMinecraft
      ? '2px solid rgba(255, 215, 0, 0.25)'
      : '2px solid rgba(155, 89, 182, 0.15)',
    boxShadow: isMinecraft
      ? '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,215,0,0.08)'
      : '0 2px 12px rgba(155, 89, 182, 0.1)',
    backdropFilter: 'blur(8px)',
    marginBottom: 'clamp(16px, 2vw, 28px)',
  }

  const titleStyle = {
    fontFamily: font,
    fontSize: 'clamp(1rem, 1.3vw, 1.6rem)',
    fontWeight: '800',
    color: isMinecraft ? '#FFD700' : '#9B59B6',
    marginBottom: 'clamp(10px, 1.2vw, 18px)',
    textAlign: 'center',
    textShadow: isMinecraft ? '0 2px 6px rgba(0,0,0,0.4)' : 'none',
  }

  // Single child
  if (children.length <= 1) {
    return (
      <div style={containerStyle}>
        <div style={titleStyle}>
          {isMinecraft ? '\u{2694}\uFE0F Classement du serveur' : '\u{1F3C6} Classement familial'}
        </div>
        <div style={{
          fontFamily: font,
          fontSize: 'clamp(0.85rem, 1vw, 1.2rem)',
          color: isMinecraft ? 'rgba(255,255,255,0.6)' : '#888',
          textAlign: 'center',
          padding: 'clamp(8px, 1vw, 16px)',
        }}>
          {isMinecraft
            ? 'Pas encore de rival sur le serveur ! Invite un joueur !'
            : 'Pas encore de rival ! Ajoute un frere ou une soeur pour comparer !'}
        </div>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>
        {isMinecraft ? '\u{2694}\uFE0F Classement du serveur' : '\u{1F3C6} Classement familial'}
      </div>

      {/* Podium */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 'clamp(8px, 1.2vw, 20px)',
        marginBottom: 'clamp(10px, 1.2vw, 18px)',
      }}>
        {ranked.map((child, idx) => {
          const isCurrent = child.id === currentChildId
          const medals = countMedals(child.medals)
          const exerciseCount = Array.isArray(child.completedExercises)
            ? child.completedExercises.length : 0
          const podiumHeight = idx === 0 ? 'clamp(90px, 12vw, 160px)'
            : idx === 1 ? 'clamp(70px, 10vw, 130px)'
            : 'clamp(55px, 8vw, 110px)'
          const avatarSize = idx === 0 ? 'clamp(2.2rem, 3vw, 3.5rem)' : 'clamp(1.6rem, 2.2vw, 2.8rem)'
          const rankColor = rankColors[Math.min(idx, 2)]

          return (
            <div key={child.id} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: 'clamp(80px, 12vw, 140px)',
              transition: 'all 0.3s ease',
            }}>
              {/* Crown/rank emoji */}
              <div style={{
                fontSize: idx === 0 ? 'clamp(1.4rem, 2vw, 2.2rem)' : 'clamp(1rem, 1.4vw, 1.6rem)',
                marginBottom: '4px',
              }}>
                {rankEmojis[Math.min(idx, 2)]}
              </div>

              {/* Avatar */}
              <div style={{
                fontSize: avatarSize,
                marginBottom: '4px',
                filter: isCurrent ? `drop-shadow(0 0 8px ${rankColor})` : 'none',
              }}>
                {child.avatar}
              </div>

              {/* Name */}
              <div style={{
                fontFamily: font,
                fontSize: 'clamp(0.8rem, 1vw, 1.15rem)',
                fontWeight: '800',
                color: isCurrent
                  ? (isMinecraft ? '#7CFC00' : '#9B59B6')
                  : (isMinecraft ? '#fff' : '#333'),
                marginBottom: '2px',
              }}>
                {child.name}
              </div>

              {/* Podium bar */}
              <div style={{
                width: '100%',
                height: podiumHeight,
                borderRadius: '10px 10px 0 0',
                background: isMinecraft
                  ? `linear-gradient(180deg, ${rankColor}33, ${rankColor}11)`
                  : `linear-gradient(180deg, ${rankColor}44, ${rankColor}15)`,
                border: isCurrent
                  ? `2px solid ${isMinecraft ? '#7CFC00' : '#9B59B6'}`
                  : `1px solid ${rankColor}44`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'clamp(6px, 0.8vw, 12px)',
                gap: '3px',
                boxShadow: isCurrent
                  ? `0 0 12px ${isMinecraft ? 'rgba(124,252,0,0.3)' : 'rgba(155,89,182,0.3)'}`
                  : 'none',
              }}>
                <div style={{
                  fontFamily: font,
                  fontSize: 'clamp(0.95rem, 1.2vw, 1.5rem)',
                  fontWeight: '800',
                  color: isMinecraft ? '#FFD700' : rankColor,
                }}>
                  {child.xp} XP
                </div>
                <div style={{
                  fontFamily: font,
                  fontSize: 'clamp(0.65rem, 0.8vw, 0.9rem)',
                  color: isMinecraft ? 'rgba(255,255,255,0.5)' : '#888',
                }}>
                  Niv. {child.level}
                </div>
                <div style={{
                  fontFamily: font,
                  fontSize: 'clamp(0.6rem, 0.75vw, 0.85rem)',
                  color: isMinecraft ? 'rgba(255,255,255,0.4)' : '#aaa',
                }}>
                  {medals.gold > 0 && `\u{1F947}${medals.gold} `}
                  {medals.silver > 0 && `\u{1F948}${medals.silver} `}
                  {medals.bronze > 0 && `\u{1F949}${medals.bronze}`}
                  {medals.gold === 0 && medals.silver === 0 && medals.bronze === 0 && 'Aucune medaille'}
                </div>
                <div style={{
                  fontFamily: font,
                  fontSize: 'clamp(0.6rem, 0.7vw, 0.8rem)',
                  color: isMinecraft ? 'rgba(255,255,255,0.4)' : '#aaa',
                }}>
                  {child.streak > 0 ? `\u{1F525} ${child.streak}j` : ''}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Comparison bar */}
      {totalExercises > 0 && (
        <div style={{ marginBottom: 'clamp(8px, 1vw, 14px)' }}>
          <div style={{
            fontFamily: font,
            fontSize: 'clamp(0.7rem, 0.85vw, 0.95rem)',
            color: isMinecraft ? 'rgba(255,255,255,0.5)' : '#888',
            marginBottom: '6px',
            textAlign: 'center',
            fontWeight: '600',
          }}>
            Exercices completes
          </div>
          <div style={{
            display: 'flex',
            height: 'clamp(18px, 2vw, 28px)',
            borderRadius: '10px',
            overflow: 'hidden',
            border: isMinecraft ? '1px solid rgba(255,255,255,0.1)' : '1px solid #eee',
          }}>
            {ranked.map((child, idx) => {
              const count = Array.isArray(child.completedExercises)
                ? child.completedExercises.length : 0
              const pct = totalExercises > 0 ? (count / totalExercises * 100) : 0
              if (pct === 0) return null
              const barColors = isMinecraft
                ? ['#4CAF50', '#1976D2', '#E65100']
                : ['#9B59B6', '#FF69B4', '#F1C40F']
              return (
                <div key={child.id} style={{
                  width: `${pct}%`,
                  background: barColors[idx % barColors.length],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: font,
                  fontSize: 'clamp(0.6rem, 0.75vw, 0.85rem)',
                  fontWeight: '700',
                  color: '#fff',
                  minWidth: pct > 5 ? 'auto' : '0',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  transition: 'width 0.5s ease',
                }}>
                  {pct >= 15 && `${child.name} ${Math.round(pct)}%`}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Fun message */}
      {getFunMessage() && (
        <div style={{
          textAlign: 'center',
          fontFamily: font,
          fontSize: 'clamp(0.8rem, 1vw, 1.15rem)',
          fontWeight: '700',
          color: isMinecraft ? '#7CFC00' : '#9B59B6',
          padding: 'clamp(4px, 0.5vw, 8px) 0',
        }}>
          {currentRank === 0 ? '\u{1F389} ' : '\u{1F4AA} '}{getFunMessage()}
        </div>
      )}
    </div>
  )
}

export default Leaderboard

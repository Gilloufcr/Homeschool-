const BADGES = [
  { id: 'first-step', name: 'Premier Pas', icon: '🌟', desc: 'Complete ton premier exercice', condition: (p) => p.completedExercises.length >= 1 },
  { id: 'scholar', name: 'Apprenti', icon: '📖', desc: 'Complete 10 exercices', condition: (p) => p.completedExercises.length >= 10 },
  { id: 'expert', name: 'Expert', icon: '🎓', desc: 'Complete 25 exercices', condition: (p) => p.completedExercises.length >= 25 },
  { id: 'master', name: 'Maitre', icon: '👑', desc: 'Complete 50 exercices', condition: (p) => p.completedExercises.length >= 50 },
  { id: 'streak3', name: 'Regulier', icon: '🔥', desc: '3 jours de suite', condition: (p) => p.streak >= 3 },
  { id: 'streak7', name: 'Perseverant', icon: '💪', desc: '7 jours de suite', condition: (p) => p.streak >= 7 },
  { id: 'streak30', name: 'Incroyable', icon: '⚡', desc: '30 jours de suite', condition: (p) => p.streak >= 30 },
  { id: 'level5', name: 'Aventurier', icon: '⚔️', desc: 'Atteins le niveau 5', condition: (p) => p.level >= 5 },
  { id: 'level10', name: 'Heros', icon: '🏆', desc: 'Atteins le niveau 10', condition: (p) => p.level >= 10 },
  { id: 'level20', name: 'Legende', icon: '💎', desc: 'Atteins le niveau 20', condition: (p) => p.level >= 20 },
  { id: 'xp500', name: 'Collectionneur', icon: '💰', desc: 'Gagne 500 XP', condition: (p) => p.xp >= 500 },
  { id: 'xp2000', name: 'Tresor', icon: '🏅', desc: 'Gagne 2000 XP', condition: (p) => p.xp >= 2000 },
]

export function getEarnedBadges(progress) {
  return BADGES.filter(b => b.condition(progress))
}

export function getNewBadges(progress, previousBadgeIds) {
  return getEarnedBadges(progress).filter(b => !previousBadgeIds.includes(b.id))
}

export default function BadgeDisplay({ progress, theme }) {
  const isMinecraft = theme === 'minecraft'
  const earned = getEarnedBadges(progress)
  const earnedIds = new Set(earned.map(b => b.id))

  const s = {
    container: {
      padding: '15px',
    },
    title: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: isMinecraft ? '0.7rem' : '1.2rem',
      fontWeight: '700',
      color: isMinecraft ? '#FFD700' : '#333',
      marginBottom: '15px',
      textShadow: isMinecraft ? '1px 1px 0 #000' : 'none',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
      gap: '10px',
    },
    badge: (unlocked) => ({
      padding: '15px 8px',
      borderRadius: '15px',
      background: unlocked
        ? (isMinecraft ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.95)')
        : (isMinecraft ? 'rgba(0,0,0,0.3)' : 'rgba(200,200,200,0.3)'),
      border: isMinecraft
        ? `2px solid ${unlocked ? '#FFD700' : '#333'}`
        : `2px solid ${unlocked ? 'rgba(155,89,182,0.3)' : 'rgba(200,200,200,0.2)'}`,
      textAlign: 'center',
      opacity: unlocked ? 1 : 0.4,
      transition: 'all 0.3s ease',
      boxShadow: unlocked && !isMinecraft ? '0 2px 10px rgba(0,0,0,0.08)' : 'none',
    }),
    badgeIcon: {
      fontSize: '2rem',
      display: 'block',
      marginBottom: '6px',
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
    },
    badgeName: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: isMinecraft ? '0.4rem' : '0.7rem',
      fontWeight: '700',
      color: isMinecraft ? '#FFD700' : '#333',
      marginBottom: '3px',
    },
    badgeDesc: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: isMinecraft ? '0.3rem' : '0.6rem',
      color: isMinecraft ? '#aaa' : '#888',
      lineHeight: '1.4',
    },
    counter: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: isMinecraft ? '0.5rem' : '0.8rem',
      color: isMinecraft ? '#7CFC00' : '#9B59B6',
      marginBottom: '10px',
    },
  }

  return (
    <div style={s.container}>
      <div style={s.title}>
        {isMinecraft ? '> BADGES' : 'Badges'}
      </div>
      <div style={s.counter}>
        {earned.length}/{BADGES.length} {isMinecraft ? 'DEBLOQUES' : 'debloques'}
      </div>
      <div style={s.grid}>
        {BADGES.map((badge) => {
          const unlocked = earnedIds.has(badge.id)
          return (
            <div
              key={badge.id}
              style={s.badge(unlocked)}
              title={badge.desc}
            >
              <span style={s.badgeIcon}>{unlocked ? badge.icon : '🔒'}</span>
              <div style={s.badgeName}>{badge.name}</div>
              <div style={s.badgeDesc}>{badge.desc}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

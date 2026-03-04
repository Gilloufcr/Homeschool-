const LevelMap = ({ levels, theme, playerLevel, completedExercises, onSelectLevel }) => {
  const isMinecraft = theme === 'minecraft'

  const getLevelStatus = (level) => {
    const exerciseIds = level.exercises.map(e => e.id)
    const completed = exerciseIds.filter(id => completedExercises.includes(id)).length
    const total = exerciseIds.length
    const unlocked = playerLevel >= level.minLevel

    return { completed, total, unlocked, allDone: completed === total }
  }

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
    },
    levelCard: (unlocked, allDone) => ({
      padding: isMinecraft ? '15px 20px' : '18px 24px',
      borderRadius: isMinecraft ? '0' : '18px',
      cursor: unlocked ? 'pointer' : 'default',
      transition: 'all 0.3s ease',
      background: !unlocked
        ? (isMinecraft ? 'rgba(0,0,0,0.5)' : 'rgba(200,200,200,0.4)')
        : allDone
          ? (isMinecraft ? 'rgba(46,125,50,0.6)' : 'rgba(46,204,113,0.2)')
          : (isMinecraft ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.95)'),
      border: isMinecraft
        ? `3px solid ${!unlocked ? '#333' : allDone ? '#4CAF50' : '#777'}`
        : `2px solid ${!unlocked ? '#ddd' : allDone ? '#2ECC71' : 'rgba(155,89,182,0.2)'}`,
      boxShadow: unlocked && !isMinecraft ? '0 3px 15px rgba(0,0,0,0.08)' : 'none',
      opacity: unlocked ? 1 : 0.5,
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    }),
    levelIcon: (unlocked, allDone) => ({
      width: '50px',
      height: '50px',
      borderRadius: isMinecraft ? '0' : '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      background: !unlocked
        ? '#999'
        : allDone
          ? (isMinecraft ? '#4CAF50' : 'linear-gradient(135deg, #2ECC71, #27AE60)')
          : (isMinecraft ? '#FFD700' : 'linear-gradient(135deg, #FF69B4, #9B59B6)'),
      border: isMinecraft ? '2px solid #555' : 'none',
      flexShrink: 0,
    }),
    levelInfo: {
      flex: 1,
    },
    levelName: {
      fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
      fontSize: isMinecraft ? '0.65rem' : '1.05rem',
      fontWeight: '700',
      color: isMinecraft ? '#FFD700' : '#333',
      marginBottom: '4px',
    },
    levelDesc: {
      fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
      fontSize: isMinecraft ? '0.45rem' : '0.8rem',
      color: isMinecraft ? '#aaa' : '#888',
    },
    progressBar: {
      height: isMinecraft ? '8px' : '6px',
      background: isMinecraft ? '#333' : '#f0e6ff',
      borderRadius: isMinecraft ? '0' : '3px',
      marginTop: '8px',
      overflow: 'hidden',
    },
    progressFill: (pct) => ({
      height: '100%',
      width: `${pct}%`,
      background: isMinecraft
        ? 'linear-gradient(90deg, #7CFC00, #32CD32)'
        : 'linear-gradient(90deg, #FF69B4, #9B59B6)',
      transition: 'width 0.5s ease',
    }),
    badge: (allDone) => ({
      fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
      fontSize: isMinecraft ? '0.5rem' : '0.75rem',
      fontWeight: '700',
      color: allDone
        ? (isMinecraft ? '#7CFC00' : '#27AE60')
        : (isMinecraft ? '#aaa' : '#9B59B6'),
      textAlign: 'right',
      minWidth: '60px',
    }),
  }

  const levelIcons = isMinecraft
    ? ['⛏️', '🔨', '🗡️', '🌀', '🏰']
    : ['🌸', '🌈', '🦋', '✨', '👑']

  return (
    <div style={styles.container}>
      {levels.map((level, idx) => {
        const status = getLevelStatus(level)
        const pct = status.total > 0 ? (status.completed / status.total) * 100 : 0
        const name = isMinecraft ? level.nameMinecraft : level.nameLalilo

        return (
          <div
            key={level.id}
            style={styles.levelCard(status.unlocked, status.allDone)}
            onClick={() => status.unlocked && onSelectLevel(level)}
            onMouseOver={(e) => {
              if (status.unlocked) {
                e.currentTarget.style.transform = 'translateX(5px)'
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateX(0)'
            }}
          >
            <div style={styles.levelIcon(status.unlocked, status.allDone)}>
              {status.unlocked ? (status.allDone ? '⭐' : levelIcons[idx]) : '🔒'}
            </div>
            <div style={styles.levelInfo}>
              <div style={styles.levelName}>{name}</div>
              <div style={styles.levelDesc}>{level.description}</div>
              {status.unlocked && (
                <div style={styles.progressBar}>
                  <div style={styles.progressFill(pct)} />
                </div>
              )}
            </div>
            <div style={styles.badge(status.allDone)}>
              {status.unlocked
                ? `${status.completed}/${status.total}`
                : (isMinecraft ? `LV${level.minLevel}` : `Niv.${level.minLevel}`)
              }
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default LevelMap

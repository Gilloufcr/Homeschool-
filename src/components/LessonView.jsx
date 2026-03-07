import { useState } from 'react'

export default function LessonView({ lesson, theme, onStartExercises }) {
  const [currentPage, setCurrentPage] = useState(0)
  const isMinecraft = theme === 'minecraft'

  const pages = lesson.pages || []
  const page = pages[currentPage]
  const isLastPage = currentPage === pages.length - 1

  const s = {
    card: {
      maxWidth: '900px',
      margin: '0 auto',
      borderRadius: isMinecraft ? '0' : '24px',
      background: isMinecraft
        ? 'rgba(0,0,0,0.7)'
        : 'rgba(255,255,255,0.95)',
      border: isMinecraft
        ? '3px solid #555'
        : '2px solid rgba(155,89,182,0.15)',
      boxShadow: isMinecraft ? 'none' : '0 4px 20px rgba(0,0,0,0.08)',
      overflow: 'hidden',
      animation: 'slideUp 0.3s ease-out',
    },
    header: {
      padding: '20px 24px 16px',
      background: isMinecraft
        ? 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(76,175,80,0.1))'
        : 'linear-gradient(135deg, rgba(155,89,182,0.08), rgba(93,173,226,0.08))',
      borderBottom: isMinecraft
        ? '2px solid #555'
        : '1px solid rgba(155,89,182,0.1)',
    },
    title: {
      fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
      fontSize: isMinecraft ? 'clamp(0.65rem, 0.9vw, 1.2rem)' : 'clamp(1.2rem, 1.5vw, 1.8rem)',
      fontWeight: '700',
      color: isMinecraft ? '#FFD700' : '#333',
      textShadow: isMinecraft ? '1px 1px 0 #000' : 'none',
      marginBottom: '4px',
    },
    subtitle: {
      fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
      fontSize: isMinecraft ? 'clamp(0.35rem, 0.6vw, 0.8rem)' : 'clamp(0.75rem, 1vw, 1.1rem)',
      color: isMinecraft ? '#aaa' : '#888',
    },
    body: {
      padding: '24px',
    },
    emoji: {
      fontSize: '3rem',
      textAlign: 'center',
      marginBottom: '16px',
      animation: 'float 3s ease-in-out infinite',
    },
    pageTitle: {
      fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
      fontSize: isMinecraft ? 'clamp(0.55rem, 0.8vw, 1.1rem)' : 'clamp(1.05rem, 1.3vw, 1.6rem)',
      fontWeight: '700',
      color: isMinecraft ? '#7CFC00' : '#9B59B6',
      textAlign: 'center',
      marginBottom: '16px',
      textShadow: isMinecraft ? '1px 1px 0 #000' : 'none',
    },
    content: {
      fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
      fontSize: isMinecraft ? 'clamp(0.4rem, 0.65vw, 0.9rem)' : 'clamp(0.9rem, 1.15vw, 1.35rem)',
      lineHeight: isMinecraft ? '2' : '1.7',
      color: isMinecraft ? '#ddd' : '#444',
      marginBottom: 'clamp(16px, 1.5vw, 24px)',
    },
    highlight: {
      display: 'inline-block',
      padding: isMinecraft ? '6px 10px' : '8px 14px',
      borderRadius: isMinecraft ? '0' : '12px',
      background: isMinecraft ? 'rgba(255,215,0,0.15)' : 'rgba(155,89,182,0.08)',
      border: isMinecraft ? '2px solid #FFD700' : '2px solid rgba(155,89,182,0.15)',
      fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
      fontSize: isMinecraft ? 'clamp(0.4rem, 0.65vw, 0.9rem)' : 'clamp(0.85rem, 1.1vw, 1.25rem)',
      fontWeight: '700',
      color: isMinecraft ? '#FFD700' : '#9B59B6',
      margin: '4px',
    },
    tip: {
      padding: '14px 18px',
      borderRadius: isMinecraft ? '0' : '14px',
      background: isMinecraft ? 'rgba(76,175,80,0.15)' : 'rgba(46,204,113,0.08)',
      border: isMinecraft ? '2px solid #4CAF50' : '2px solid rgba(46,204,113,0.15)',
      fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
      fontSize: isMinecraft ? 'clamp(0.38rem, 0.6vw, 0.85rem)' : 'clamp(0.82rem, 1.05vw, 1.2rem)',
      lineHeight: isMinecraft ? '2' : '1.6',
      color: isMinecraft ? '#7CFC00' : '#27AE60',
      marginBottom: '16px',
    },
    example: {
      padding: '14px 18px',
      borderRadius: isMinecraft ? '0' : '14px',
      background: isMinecraft ? 'rgba(93,173,226,0.1)' : 'rgba(93,173,226,0.06)',
      border: isMinecraft ? '2px solid #5DADE2' : '2px solid rgba(93,173,226,0.15)',
      fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
      fontSize: isMinecraft ? 'clamp(0.38rem, 0.6vw, 0.85rem)' : 'clamp(0.85rem, 1.05vw, 1.2rem)',
      lineHeight: isMinecraft ? '2' : '1.6',
      color: isMinecraft ? '#5DADE2' : '#2980B9',
      marginBottom: '16px',
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      borderTop: isMinecraft ? '2px solid #555' : '1px solid rgba(155,89,182,0.1)',
      background: isMinecraft
        ? 'rgba(0,0,0,0.3)'
        : 'rgba(155,89,182,0.03)',
    },
    navBtn: (primary) => ({
      padding: isMinecraft ? '10px 18px' : '10px 24px',
      borderRadius: isMinecraft ? '0' : '14px',
      border: primary
        ? 'none'
        : (isMinecraft ? '2px solid #555' : '2px solid rgba(155,89,182,0.2)'),
      background: primary
        ? (isMinecraft ? '#4CAF50' : 'linear-gradient(135deg, #9B59B6, #8E44AD)')
        : (isMinecraft ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)'),
      color: primary
        ? '#fff'
        : (isMinecraft ? '#aaa' : '#9B59B6'),
      fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
      fontSize: isMinecraft ? 'clamp(0.45rem, 0.7vw, 0.95rem)' : 'clamp(0.85rem, 1.1vw, 1.25rem)',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
    dots: {
      display: 'flex',
      gap: '6px',
    },
    dot: (active) => ({
      width: isMinecraft ? '8px' : '10px',
      height: isMinecraft ? '8px' : '10px',
      borderRadius: isMinecraft ? '0' : '50%',
      background: active
        ? (isMinecraft ? '#FFD700' : '#9B59B6')
        : (isMinecraft ? '#555' : '#ddd'),
      transition: 'all 0.2s ease',
    }),
  }

  if (!page) return null

  return (
    <div style={s.card}>
      <div style={s.header}>
        <div style={s.title}>
          {isMinecraft ? '> ' : ''}{lesson.title}
        </div>
        <div style={s.subtitle}>
          {isMinecraft
            ? `PAGE ${currentPage + 1}/${pages.length}`
            : `Page ${currentPage + 1} sur ${pages.length}`}
        </div>
      </div>

      <div style={s.body}>
        {page.emoji && <div style={s.emoji}>{page.emoji}</div>}
        {page.title && <div style={s.pageTitle}>{page.title}</div>}
        {page.content && <div style={s.content}>{page.content}</div>}

        {page.highlights && (
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            {page.highlights.map((h, i) => (
              <span key={i} style={s.highlight}>{h}</span>
            ))}
          </div>
        )}

        {page.tip && <div style={s.tip}>💡 {page.tip}</div>}
        {page.example && <div style={s.example}>📝 {page.example}</div>}
      </div>

      <div style={s.nav}>
        {currentPage > 0 ? (
          <button style={s.navBtn(false)} onClick={() => setCurrentPage(p => p - 1)}>
            {isMinecraft ? '< PREC.' : 'Precedent'}
          </button>
        ) : <div />}

        <div style={s.dots}>
          {pages.map((_, i) => (
            <div key={i} style={s.dot(i === currentPage)} />
          ))}
        </div>

        {isLastPage ? (
          <button style={s.navBtn(true)} onClick={onStartExercises}>
            {isMinecraft ? 'EXERCICES >' : 'Exercices !'}
          </button>
        ) : (
          <button style={s.navBtn(true)} onClick={() => setCurrentPage(p => p + 1)}>
            {isMinecraft ? 'SUITE >' : 'Suivant'}
          </button>
        )}
      </div>
    </div>
  )
}

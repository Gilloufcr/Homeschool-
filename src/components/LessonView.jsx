import { useState, useEffect, useRef } from 'react'

// OpenDyslexic font loader (shared with ExerciseCard)
let dyslexicFontLoaded = false
function loadDyslexicFont() {
  if (dyslexicFontLoaded) return
  dyslexicFontLoaded = true
  const link = document.createElement('link')
  link.href = 'https://fonts.cdnfonts.com/css/opendyslexic'
  link.rel = 'stylesheet'
  document.head.appendChild(link)
}

function speakText(text, lang = 'fr-FR', rate = 0.85) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = lang
  utter.rate = rate
  window.speechSynthesis.speak(utter)
}

export default function LessonView({ lesson, theme, accessibility, onStartExercises }) {
  const [currentPage, setCurrentPage] = useState(0)
  const isMinecraft = theme === 'minecraft'

  const a11y = accessibility || {}
  const hasA11y = a11y.enabled && a11y.profiles?.length > 0
  const isReadAloud = hasA11y && a11y.readAloud

  // Load dyslexic font if needed
  useEffect(() => {
    if (hasA11y && a11y.adaptedFont) loadDyslexicFont()
  }, [hasA11y, a11y.adaptedFont])

  const pages = lesson.pages || []
  const page = pages[currentPage]
  const isLastPage = currentPage === pages.length - 1

  // Auto-read page content when page changes
  useEffect(() => {
    if (isReadAloud && page) {
      const parts = [page.title, page.content, page.tip].filter(Boolean)
      speakText(parts.join('. '))
    }
    return () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel() }
  }, [currentPage, isReadAloud, page?.title])

  // A11y-aware base font and spacing
  const baseFont = (hasA11y && a11y.adaptedFont)
    ? "'OpenDyslexic', 'Quicksand', sans-serif"
    : "'Quicksand', sans-serif"
  const fontScale = { small: 0.85, normal: 1, large: 1.2, xlarge: 1.4 }[a11y.fontSize] || 1
  const lineH = (hasA11y && a11y.lineSpacing) ? '2.2' : '1.7'
  const letterSp = (hasA11y && a11y.lineSpacing) ? '0.12em' : 'normal'

  const s = {
    card: {
      maxWidth: '900px',
      margin: '0 auto',
      borderRadius: '24px',
      background: isMinecraft
        ? 'rgba(20,20,30,0.8)'
        : 'rgba(255,255,255,0.95)',
      border: isMinecraft
        ? '1px solid rgba(255,255,255,0.08)'
        : (hasA11y && a11y.highContrast) ? '3px solid #9B59B6' : '2px solid rgba(155,89,182,0.15)',
      boxShadow: isMinecraft ? '0 6px 24px rgba(0,0,0,0.35)' : '0 4px 20px rgba(0,0,0,0.08)',
      backdropFilter: 'blur(8px)',
      overflow: 'hidden',
      animation: (hasA11y && a11y.reduceAnimations) ? 'none' : 'slideUp 0.3s ease-out',
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
      fontFamily: baseFont,
      fontSize: `calc(clamp(1.2rem, 1.5vw, 1.8rem) * ${fontScale})`,
      fontWeight: '700',
      color: isMinecraft ? '#FFD700' : '#333',
      textShadow: isMinecraft ? '1px 1px 0 #000' : 'none',
      marginBottom: '4px',
      lineHeight: lineH,
      letterSpacing: letterSp,
    },
    subtitle: {
      fontFamily: baseFont,
      fontSize: `calc(clamp(0.75rem, 1vw, 1.1rem) * ${fontScale})`,
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
      fontFamily: baseFont,
      fontSize: `calc(clamp(1.05rem, 1.3vw, 1.6rem) * ${fontScale})`,
      fontWeight: '700',
      color: isMinecraft ? '#7CFC00' : '#9B59B6',
      textAlign: 'center',
      marginBottom: '16px',
      textShadow: isMinecraft ? '1px 1px 0 #000' : 'none',
      letterSpacing: letterSp,
    },
    content: {
      fontFamily: baseFont,
      fontSize: `calc(clamp(0.9rem, 1.15vw, 1.35rem) * ${fontScale})`,
      lineHeight: lineH,
      letterSpacing: letterSp,
      color: isMinecraft ? '#ddd' : '#444',
      marginBottom: 'clamp(16px, 1.5vw, 24px)',
    },
    highlight: {
      display: 'inline-block',
      padding: isMinecraft ? '6px 10px' : '8px 14px',
      borderRadius: '12px',
      background: isMinecraft ? 'rgba(255,215,0,0.15)' : 'rgba(155,89,182,0.08)',
      border: isMinecraft ? '2px solid #FFD700' : '2px solid rgba(155,89,182,0.15)',
      fontFamily: baseFont,
      fontSize: `calc(clamp(0.85rem, 1.1vw, 1.25rem) * ${fontScale})`,
      fontWeight: '700',
      color: isMinecraft ? '#FFD700' : '#9B59B6',
      margin: '4px',
      letterSpacing: letterSp,
    },
    tip: {
      padding: '14px 18px',
      borderRadius: '14px',
      background: isMinecraft ? 'rgba(76,175,80,0.15)' : 'rgba(46,204,113,0.08)',
      border: isMinecraft ? '2px solid #4CAF50' : '2px solid rgba(46,204,113,0.15)',
      fontFamily: baseFont,
      fontSize: `calc(clamp(0.82rem, 1.05vw, 1.2rem) * ${fontScale})`,
      lineHeight: lineH,
      letterSpacing: letterSp,
      color: isMinecraft ? '#7CFC00' : '#27AE60',
      marginBottom: '16px',
    },
    example: {
      padding: '14px 18px',
      borderRadius: '14px',
      background: isMinecraft ? 'rgba(93,173,226,0.1)' : 'rgba(93,173,226,0.06)',
      border: isMinecraft ? '2px solid #5DADE2' : '2px solid rgba(93,173,226,0.15)',
      fontFamily: baseFont,
      fontSize: `calc(clamp(0.85rem, 1.05vw, 1.2rem) * ${fontScale})`,
      lineHeight: lineH,
      letterSpacing: letterSp,
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
    readBtn: {
      padding: '8px 16px',
      borderRadius: '12px',
      border: 'none',
      background: isMinecraft ? 'rgba(93,173,226,0.2)' : 'rgba(93,173,226,0.1)',
      color: isMinecraft ? '#5DADE2' : '#2980B9',
      fontFamily: baseFont,
      fontSize: `calc(0.85rem * ${fontScale})`,
      fontWeight: '600',
      cursor: 'pointer',
      marginBottom: '12px',
    },
    navBtn: (primary) => ({
      padding: isMinecraft ? '10px 18px' : '10px 24px',
      borderRadius: '14px',
      border: primary
        ? 'none'
        : (isMinecraft ? '2px solid #555' : '2px solid rgba(155,89,182,0.2)'),
      background: primary
        ? (isMinecraft ? '#4CAF50' : 'linear-gradient(135deg, #9B59B6, #8E44AD)')
        : (isMinecraft ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)'),
      color: primary
        ? '#fff'
        : (isMinecraft ? '#aaa' : '#9B59B6'),
      fontFamily: baseFont,
      fontSize: `calc(clamp(0.85rem, 1.1vw, 1.25rem) * ${fontScale})`,
      fontWeight: '700',
      cursor: 'pointer',
      transition: (hasA11y && a11y.reduceAnimations) ? 'none' : 'all 0.2s ease',
    }),
    dots: {
      display: 'flex',
      gap: '6px',
    },
    dot: (active) => ({
      width: '10px',
      height: '10px',
      borderRadius: '50%',
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
          {lesson.title}
        </div>
        <div style={s.subtitle}>
          Page {currentPage + 1} sur {pages.length}
        </div>
      </div>

      <div style={s.body}>
        {page.emoji && <div style={s.emoji}>{page.emoji}</div>}
        {page.title && <div style={s.pageTitle}>{page.title}</div>}

        {/* Read aloud button */}
        {isReadAloud && (
          <div style={{ textAlign: 'center' }}>
            <button style={s.readBtn} onClick={() => {
              const parts = [page.title, page.content, page.tip].filter(Boolean)
              speakText(parts.join('. '))
            }}>
              Ecouter cette page
            </button>
          </div>
        )}

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
            ← Precedent
          </button>
        ) : <div />}

        <div style={s.dots}>
          {pages.map((_, i) => (
            <div key={i} style={s.dot(i === currentPage)} />
          ))}
        </div>

        {isLastPage ? (
          <button style={s.navBtn(true)} onClick={onStartExercises}>
            Exercices →
          </button>
        ) : (
          <button style={s.navBtn(true)} onClick={() => setCurrentPage(p => p + 1)}>
            Suivant →
          </button>
        )}
      </div>
    </div>
  )
}

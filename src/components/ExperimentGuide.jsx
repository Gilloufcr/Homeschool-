import { useState, useEffect } from 'react'

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

export default function ExperimentGuide({ experiment, theme, accessibility, onClose }) {
  const [currentStep, setCurrentStep] = useState(-1) // -1 = intro, 0..n = steps, n+1 = conclusion
  const [checkedMaterials, setCheckedMaterials] = useState({})
  const [completedSteps, setCompletedSteps] = useState({})

  const isMinecraft = theme === 'minecraft'
  const a11y = accessibility || {}
  const hasA11y = a11y.enabled && a11y.profiles?.length > 0
  const isReadAloud = hasA11y && a11y.readAloud

  useEffect(() => {
    if (hasA11y && a11y.adaptedFont) loadDyslexicFont()
  }, [hasA11y, a11y.adaptedFont])

  const baseFont = (hasA11y && a11y.adaptedFont)
    ? "'OpenDyslexic', 'Quicksand', sans-serif"
    : "'Quicksand', sans-serif"
  const fontScale = { small: 0.85, normal: 1, large: 1.2, xlarge: 1.4 }[a11y.fontSize] || 1
  const lineH = (hasA11y && a11y.lineSpacing) ? '2.2' : '1.7'
  const letterSp = (hasA11y && a11y.lineSpacing) ? '0.12em' : 'normal'

  const steps = experiment.steps || []
  const totalPhases = steps.length + 2 // intro + steps + conclusion
  const isIntro = currentStep === -1
  const isConclusion = currentStep === steps.length

  // TTS for current step
  useEffect(() => {
    if (!isReadAloud) return
    let text = ''
    if (isIntro) {
      text = `Experience : ${experiment.title}. Attention : ${experiment.safetyNote}. Materiel necessaire : ${experiment.materials.join(', ')}.`
    } else if (isConclusion) {
      text = `Observation : ${experiment.observation}. Explication scientifique : ${experiment.scienceExplanation}`
    } else {
      const step = steps[currentStep]
      text = `Etape ${currentStep + 1}. ${step.instruction}`
      if (step.tip) text += `. Astuce : ${step.tip}`
    }
    speakText(text)
    return () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel() }
  }, [currentStep, isReadAloud])

  const toggleMaterial = (idx) => {
    setCheckedMaterials(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  const goNext = () => {
    if (!isConclusion) {
      if (currentStep >= 0) setCompletedSteps(prev => ({ ...prev, [currentStep]: true }))
      setCurrentStep(prev => prev + 1)
    }
  }

  const goPrev = () => {
    if (currentStep > -1) setCurrentStep(prev => prev - 1)
  }

  const difficultyColors = {
    facile: { bg: '#2ECC71', text: '#fff' },
    moyen: { bg: '#F39C12', text: '#fff' },
    difficile: { bg: '#E74C3C', text: '#fff' },
  }
  const diffColor = difficultyColors[experiment.difficulty] || difficultyColors.facile

  const s = {
    overlay: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.6)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(12px, 2vw, 32px)',
      backdropFilter: 'blur(4px)',
    },
    card: {
      maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto',
      borderRadius: '24px',
      background: isMinecraft ? 'rgba(20,20,30,0.95)' : 'rgba(255,255,255,0.98)',
      border: isMinecraft ? '2px solid rgba(255,215,0,0.3)' : '2px solid rgba(155,89,182,0.2)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
    },
    header: {
      padding: '20px 24px 16px',
      background: isMinecraft
        ? 'linear-gradient(135deg, rgba(255,215,0,0.12), rgba(76,175,80,0.12))'
        : 'linear-gradient(135deg, rgba(155,89,182,0.1), rgba(93,173,226,0.1))',
      borderBottom: isMinecraft ? '2px solid #555' : '1px solid rgba(155,89,182,0.1)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    },
    title: {
      fontFamily: baseFont,
      fontSize: `calc(clamp(1.2rem, 1.5vw, 1.8rem) * ${fontScale})`,
      fontWeight: '700',
      color: isMinecraft ? '#FFD700' : '#333',
      textShadow: isMinecraft ? '1px 1px 0 #000' : 'none',
      lineHeight: lineH, letterSpacing: letterSp,
    },
    closeBtn: {
      padding: '8px 14px', borderRadius: '12px', border: 'none',
      background: isMinecraft ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      color: isMinecraft ? '#aaa' : '#888',
      fontFamily: baseFont, fontSize: `calc(1.2rem * ${fontScale})`,
      fontWeight: '700', cursor: 'pointer', flexShrink: 0,
    },
    badge: (bg, color) => ({
      display: 'inline-block', padding: '4px 12px', borderRadius: '20px',
      background: bg, color: color,
      fontFamily: baseFont, fontSize: `calc(0.75rem * ${fontScale})`,
      fontWeight: '700', marginRight: '8px', letterSpacing: letterSp,
    }),
    body: { padding: '24px' },
    safety: {
      padding: '14px 18px', borderRadius: '14px', marginBottom: '20px',
      background: isMinecraft ? 'rgba(231,76,60,0.15)' : 'rgba(231,76,60,0.08)',
      border: isMinecraft ? '2px solid #E74C3C' : '2px solid rgba(231,76,60,0.2)',
      fontFamily: baseFont, fontSize: `calc(clamp(0.85rem, 1vw, 1.1rem) * ${fontScale})`,
      lineHeight: lineH, letterSpacing: letterSp,
      color: isMinecraft ? '#FF6B6B' : '#C0392B',
    },
    materialItem: (checked) => ({
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '10px 14px', borderRadius: '12px', marginBottom: '8px', cursor: 'pointer',
      background: checked
        ? (isMinecraft ? 'rgba(76,175,80,0.15)' : 'rgba(46,204,113,0.1)')
        : (isMinecraft ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'),
      border: checked
        ? (isMinecraft ? '2px solid #4CAF50' : '2px solid rgba(46,204,113,0.3)')
        : (isMinecraft ? '2px solid rgba(255,255,255,0.08)' : '2px solid rgba(0,0,0,0.06)'),
      fontFamily: baseFont, fontSize: `calc(clamp(0.85rem, 1.05vw, 1.15rem) * ${fontScale})`,
      lineHeight: lineH, letterSpacing: letterSp,
      color: isMinecraft ? '#ddd' : '#444',
      textDecoration: checked ? 'line-through' : 'none',
      opacity: checked ? 0.7 : 1,
    }),
    checkbox: (checked) => ({
      width: '24px', height: '24px', borderRadius: '6px', flexShrink: 0,
      border: checked
        ? (isMinecraft ? '2px solid #4CAF50' : '2px solid #2ECC71')
        : (isMinecraft ? '2px solid #666' : '2px solid #ccc'),
      background: checked ? (isMinecraft ? '#4CAF50' : '#2ECC71') : 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: '14px', fontWeight: '700',
    }),
    stepItem: (active, done) => ({
      padding: '16px 18px', borderRadius: '14px', marginBottom: '12px',
      background: active
        ? (isMinecraft ? 'rgba(255,215,0,0.15)' : 'rgba(155,89,182,0.1)')
        : done
          ? (isMinecraft ? 'rgba(76,175,80,0.08)' : 'rgba(46,204,113,0.05)')
          : (isMinecraft ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'),
      border: active
        ? (isMinecraft ? '2px solid #FFD700' : '2px solid #9B59B6')
        : done
          ? (isMinecraft ? '2px solid rgba(76,175,80,0.2)' : '2px solid rgba(46,204,113,0.15)')
          : (isMinecraft ? '2px solid rgba(255,255,255,0.05)' : '2px solid rgba(0,0,0,0.04)'),
      opacity: done && !active ? 0.6 : 1,
    }),
    stepNumber: (active, done) => ({
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: '32px', height: '32px', borderRadius: '50%', marginRight: '12px', flexShrink: 0,
      background: active
        ? (isMinecraft ? '#FFD700' : '#9B59B6')
        : done
          ? (isMinecraft ? '#4CAF50' : '#2ECC71')
          : (isMinecraft ? '#555' : '#ddd'),
      color: (active || done) ? '#fff' : (isMinecraft ? '#aaa' : '#888'),
      fontFamily: baseFont, fontSize: `calc(0.85rem * ${fontScale})`, fontWeight: '700',
    }),
    stepText: {
      fontFamily: baseFont, fontSize: `calc(clamp(0.9rem, 1.1vw, 1.25rem) * ${fontScale})`,
      lineHeight: lineH, letterSpacing: letterSp,
      color: isMinecraft ? '#ddd' : '#444',
    },
    tipBox: {
      marginTop: '10px', padding: '10px 14px', borderRadius: '10px',
      background: isMinecraft ? 'rgba(93,173,226,0.1)' : 'rgba(93,173,226,0.06)',
      border: isMinecraft ? '1px solid rgba(93,173,226,0.2)' : '1px solid rgba(93,173,226,0.15)',
      fontFamily: baseFont, fontSize: `calc(clamp(0.8rem, 0.95vw, 1.05rem) * ${fontScale})`,
      lineHeight: lineH, letterSpacing: letterSp,
      color: isMinecraft ? '#5DADE2' : '#2980B9',
    },
    resultPanel: (type) => ({
      padding: '18px 20px', borderRadius: '16px', marginBottom: '16px',
      background: type === 'observation'
        ? (isMinecraft ? 'rgba(255,215,0,0.1)' : 'rgba(243,156,18,0.08)')
        : (isMinecraft ? 'rgba(155,89,182,0.1)' : 'rgba(155,89,182,0.06)'),
      border: type === 'observation'
        ? (isMinecraft ? '2px solid rgba(255,215,0,0.3)' : '2px solid rgba(243,156,18,0.2)')
        : (isMinecraft ? '2px solid rgba(155,89,182,0.3)' : '2px solid rgba(155,89,182,0.15)'),
    }),
    resultTitle: (type) => ({
      fontFamily: baseFont, fontSize: `calc(clamp(0.95rem, 1.15vw, 1.3rem) * ${fontScale})`,
      fontWeight: '700', marginBottom: '8px', lineHeight: lineH, letterSpacing: letterSp,
      color: type === 'observation'
        ? (isMinecraft ? '#FFD700' : '#E67E22')
        : (isMinecraft ? '#BB86FC' : '#8E44AD'),
    }),
    resultText: {
      fontFamily: baseFont, fontSize: `calc(clamp(0.85rem, 1.05vw, 1.2rem) * ${fontScale})`,
      lineHeight: lineH, letterSpacing: letterSp,
      color: isMinecraft ? '#ddd' : '#444',
    },
    sectionTitle: {
      fontFamily: baseFont, fontSize: `calc(clamp(1rem, 1.25vw, 1.5rem) * ${fontScale})`,
      fontWeight: '700', marginBottom: '16px', lineHeight: lineH, letterSpacing: letterSp,
      color: isMinecraft ? '#7CFC00' : '#9B59B6',
    },
    nav: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '16px 24px',
      borderTop: isMinecraft ? '2px solid #555' : '1px solid rgba(155,89,182,0.1)',
      background: isMinecraft ? 'rgba(0,0,0,0.3)' : 'rgba(155,89,182,0.03)',
    },
    navBtn: (primary) => ({
      padding: isMinecraft ? '10px 18px' : '10px 24px', borderRadius: '14px',
      border: primary ? 'none' : (isMinecraft ? '2px solid #555' : '2px solid rgba(155,89,182,0.2)'),
      background: primary
        ? (isMinecraft ? '#4CAF50' : 'linear-gradient(135deg, #9B59B6, #8E44AD)')
        : (isMinecraft ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)'),
      color: primary ? '#fff' : (isMinecraft ? '#aaa' : '#9B59B6'),
      fontFamily: baseFont, fontSize: `calc(clamp(0.85rem, 1.1vw, 1.25rem) * ${fontScale})`,
      fontWeight: '700', cursor: 'pointer',
    }),
    readBtn: {
      padding: '8px 16px', borderRadius: '12px', border: 'none',
      background: isMinecraft ? 'rgba(93,173,226,0.2)' : 'rgba(93,173,226,0.1)',
      color: isMinecraft ? '#5DADE2' : '#2980B9',
      fontFamily: baseFont, fontSize: `calc(0.85rem * ${fontScale})`,
      fontWeight: '600', cursor: 'pointer', marginBottom: '12px',
    },
    dots: { display: 'flex', gap: '6px', alignItems: 'center' },
    dot: (active) => ({
      width: '10px', height: '10px', borderRadius: '50%',
      background: active ? (isMinecraft ? '#FFD700' : '#9B59B6') : (isMinecraft ? '#555' : '#ddd'),
    }),
  }

  const renderReadBtn = (text) => {
    if (!isReadAloud) return null
    return (
      <div style={{ textAlign: 'center' }}>
        <button style={s.readBtn} onClick={() => speakText(text)}>
          Ecouter
        </button>
      </div>
    )
  }

  return (
    <div style={s.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div style={s.card}>
        {/* Header */}
        <div style={s.header}>
          <div>
            <div style={s.title}>{experiment.title}</div>
            <div style={{ marginTop: '8px' }}>
              <span style={s.badge(diffColor.bg, diffColor.text)}>
                {experiment.difficulty}
              </span>
              <span style={s.badge(
                isMinecraft ? 'rgba(93,173,226,0.3)' : 'rgba(93,173,226,0.15)',
                isMinecraft ? '#5DADE2' : '#2980B9'
              )}>
                {experiment.duration}
              </span>
            </div>
          </div>
          <button style={s.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={s.body}>
          {/* Safety note - always visible */}
          <div style={s.safety}>
            ⚠️ {experiment.safetyNote}
          </div>

          {/* INTRO PHASE */}
          {isIntro && (
            <>
              <div style={s.sectionTitle}>Materiel necessaire</div>
              {renderReadBtn(`Materiel necessaire : ${experiment.materials.join(', ')}`)}
              {experiment.materials.map((mat, idx) => (
                <div key={idx} style={s.materialItem(checkedMaterials[idx])}
                  onClick={() => toggleMaterial(idx)}>
                  <div style={s.checkbox(checkedMaterials[idx])}>
                    {checkedMaterials[idx] ? '✓' : ''}
                  </div>
                  <span>{mat}</span>
                </div>
              ))}
            </>
          )}

          {/* STEP PHASE */}
          {!isIntro && !isConclusion && (
            <>
              <div style={s.sectionTitle}>
                Etape {currentStep + 1} sur {steps.length}
              </div>
              {steps.map((step, idx) => {
                const active = idx === currentStep
                const done = completedSteps[idx]
                if (!active && !done) return null
                return (
                  <div key={idx} style={s.stepItem(active, done)}>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <div style={s.stepNumber(active, done)}>
                        {done && !active ? '✓' : idx + 1}
                      </div>
                      <div>
                        <div style={s.stepText}>{step.instruction}</div>
                        {active && step.tip && (
                          <div style={s.tipBox}>💡 {step.tip}</div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
              {isReadAloud && (
                <div style={{ textAlign: 'center', marginTop: '8px' }}>
                  <button style={s.readBtn} onClick={() => {
                    const step = steps[currentStep]
                    let text = `Etape ${currentStep + 1}. ${step.instruction}`
                    if (step.tip) text += `. Astuce : ${step.tip}`
                    speakText(text)
                  }}>
                    Ecouter cette etape
                  </button>
                </div>
              )}
            </>
          )}

          {/* CONCLUSION PHASE */}
          {isConclusion && (
            <>
              <div style={s.sectionTitle}>Resultats</div>
              {renderReadBtn(`Observation : ${experiment.observation}. Explication : ${experiment.scienceExplanation}`)}
              <div style={s.resultPanel('observation')}>
                <div style={s.resultTitle('observation')}>🔍 Observation</div>
                <div style={s.resultText}>{experiment.observation}</div>
              </div>
              <div style={s.resultPanel('science')}>
                <div style={s.resultTitle('science')}>🧪 Explication scientifique</div>
                <div style={s.resultText}>{experiment.scienceExplanation}</div>
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        <div style={s.nav}>
          {currentStep > -1 ? (
            <button style={s.navBtn(false)} onClick={goPrev}>
              ← Precedent
            </button>
          ) : <div />}

          <div style={s.dots}>
            {Array.from({ length: totalPhases }, (_, i) => (
              <div key={i} style={s.dot(i === currentStep + 1)} />
            ))}
          </div>

          {isConclusion ? (
            <button style={s.navBtn(true)} onClick={onClose}>
              Terminer ✓
            </button>
          ) : (
            <button style={s.navBtn(true)} onClick={goNext}>
              {isIntro ? 'Commencer →' : 'Etape suivante →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

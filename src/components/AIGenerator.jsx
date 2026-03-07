import { useState, useEffect } from 'react'
import { generateExercises, searchSharedExercises, browseSharedExercises, getSharedExercise, getSharedStats } from '../api'
import { getTopicSuggestions } from '../data/curriculum'

const SUBJECTS = [
  { id: 'math', label: 'Mathematiques', icon: '🔢' },
  { id: 'french', label: 'Francais', icon: '📖' },
  { id: 'history', label: 'Histoire', icon: '🏛️' },
  { id: 'geography', label: 'Geographie', icon: '🌍' },
  { id: 'science', label: 'Sciences', icon: '🔬' },
  { id: 'english', label: 'Anglais', icon: '🇬🇧' },
]

const LEVELS = [
  { id: 'CE2', label: 'CE2 (8-9 ans)', age: '8-9' },
  { id: 'CM1', label: 'CM1 (9-10 ans)', age: '9-10' },
  { id: 'CM2', label: 'CM2 (10-11 ans)', age: '10-11' },
  { id: '6eme', label: '6eme (11-12 ans)', age: '11-12' },
  { id: '5eme', label: '5eme (12-13 ans)', age: '12-13' },
]

export default function AIGenerator({ onGenerated, existingLessons = [] }) {
  const [subject, setSubject] = useState('math')
  const [topic, setTopic] = useState('')
  const [level, setLevel] = useState('CM2')
  const [count, setCount] = useState(5)
  const [generating, setGenerating] = useState(false)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState('')
  const [mode, setMode] = useState('generate') // 'generate' | 'community'
  const [sharedResults, setSharedResults] = useState([])
  const [sharedStats, setSharedStats] = useState(null)
  const [loadingShared, setLoadingShared] = useState(false)
  const [cacheHint, setCacheHint] = useState(null) // Show if topic exists in cache

  // Get curriculum-based suggestions for current level + subject
  const curriculumTopics = getTopicSuggestions(level, subject)
  const childAge = LEVELS.find(l => l.id === level)?.age || '10-11'

  // Collect existing questions to avoid redundancy
  const existingQuestions = existingLessons
    .filter(l => l.subject === subject)
    .flatMap(l => (l.exercises || []).map(e => e.question))

  // Load shared stats on mount
  useEffect(() => {
    getSharedStats().then(setSharedStats).catch(() => {})
  }, [])

  // Search shared cache when topic changes (debounced)
  useEffect(() => {
    if (!topic.trim() || topic.trim().length < 3) {
      setCacheHint(null)
      return
    }
    const timer = setTimeout(async () => {
      try {
        const result = await searchSharedExercises(subject, level, topic.trim())
        if (result.matches && result.matches.length > 0) {
          setCacheHint({
            count: result.matches.length,
            exactMatch: result.exactMatch,
            first: result.matches[0],
          })
        } else {
          setCacheHint(null)
        }
      } catch {
        setCacheHint(null)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [topic, subject, level])

  // Load community exercises when switching to community tab
  useEffect(() => {
    if (mode === 'community') {
      loadCommunity()
    }
  }, [mode, subject, level])

  const loadCommunity = async () => {
    setLoadingShared(true)
    try {
      const data = await browseSharedExercises(subject, level)
      setSharedResults(data.exercises || [])
    } catch {
      setSharedResults([])
    }
    setLoadingShared(false)
  }

  const handleImportShared = async (id) => {
    setLoadingShared(true)
    try {
      const exercise = await getSharedExercise(id)
      setPreview({
        ...exercise,
        fromCache: true,
        id: `gen-${subject}-${Date.now()}`,
      })
      setMode('generate')
    } catch (e) {
      setError(e.message)
    }
    setLoadingShared(false)
  }

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Choisissez ou tapez un sujet')
      return
    }
    setError('')
    setGenerating(true)
    setPreview(null)

    try {
      const lesson = await generateExercises({
        subject,
        topic: topic.trim(),
        level,
        count,
        childAge,
        existingQuestions: existingQuestions.slice(0, 50),
      })
      setPreview(lesson)
      // Refresh stats
      getSharedStats().then(setSharedStats).catch(() => {})
    } catch (e) {
      setError(e.message || 'Erreur lors de la generation')
    }
    setGenerating(false)
  }

  const handleSave = () => {
    if (preview) {
      onGenerated(preview)
      setPreview(null)
      setTopic('')
      setCacheHint(null)
    }
  }

  const s = {
    container: {
      maxWidth: '700px',
    },
    section: {
      marginBottom: '20px',
    },
    label: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.9rem',
      fontWeight: '700',
      color: 'rgba(255,255,255,0.8)',
      marginBottom: '10px',
      display: 'block',
    },
    sublabel: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.7rem',
      fontWeight: '400',
      color: 'rgba(255,255,255,0.4)',
      marginBottom: '8px',
      display: 'block',
    },
    subjectGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
      gap: '8px',
    },
    subjectBtn: (active) => ({
      padding: '12px',
      borderRadius: '12px',
      border: `2px solid ${active ? '#9B59B6' : 'rgba(255,255,255,0.1)'}`,
      background: active ? 'rgba(155,89,182,0.2)' : 'rgba(255,255,255,0.03)',
      color: active ? 'white' : 'rgba(255,255,255,0.6)',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.85rem',
      fontWeight: '600',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.2s ease',
    }),
    input: {
      width: '100%',
      padding: '14px 18px',
      borderRadius: '14px',
      border: '2px solid rgba(155,89,182,0.2)',
      background: 'rgba(255,255,255,0.05)',
      color: 'white',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1rem',
      outline: 'none',
    },
    suggestions: {
      display: 'flex',
      gap: '6px',
      flexWrap: 'wrap',
      marginTop: '10px',
    },
    suggestionBtn: (isCurriculum) => ({
      padding: '6px 14px',
      borderRadius: '20px',
      border: `1px solid ${isCurriculum ? 'rgba(46,204,113,0.3)' : 'rgba(155,89,182,0.2)'}`,
      background: isCurriculum ? 'rgba(46,204,113,0.08)' : 'rgba(155,89,182,0.08)',
      color: isCurriculum ? 'rgba(46,204,113,0.9)' : 'rgba(255,255,255,0.7)',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.75rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
    select: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '12px',
      border: '2px solid rgba(155,89,182,0.2)',
      background: '#1a1a2e',
      color: 'white',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.95rem',
      outline: 'none',
    },
    row: {
      display: 'flex',
      gap: '15px',
    },
    generateBtn: {
      width: '100%',
      padding: '16px',
      borderRadius: '15px',
      border: 'none',
      background: generating
        ? 'rgba(155,89,182,0.3)'
        : 'linear-gradient(135deg, #9B59B6, #E74C8B)',
      color: 'white',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: generating ? 'wait' : 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: generating ? 'none' : '0 4px 20px rgba(155,89,182,0.3)',
    },
    previewCard: {
      padding: '25px',
      borderRadius: '16px',
      background: 'rgba(255,255,255,0.05)',
      border: '2px solid rgba(46,204,113,0.3)',
      marginTop: '20px',
    },
    previewTitle: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1.2rem',
      fontWeight: '700',
      color: '#2ECC71',
      marginBottom: '15px',
    },
    exercisePreview: {
      padding: '15px',
      borderRadius: '12px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      marginBottom: '10px',
    },
    question: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.95rem',
      color: 'white',
      marginBottom: '8px',
      fontWeight: '600',
    },
    option: (isAnswer) => ({
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.8rem',
      color: isAnswer ? '#2ECC71' : 'rgba(255,255,255,0.5)',
      padding: '2px 0',
      fontWeight: isAnswer ? '700' : '400',
    }),
    saveBtn: {
      padding: '14px 30px',
      borderRadius: '12px',
      border: 'none',
      background: 'linear-gradient(135deg, #2ECC71, #27AE60)',
      color: 'white',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      marginTop: '15px',
      marginRight: '10px',
    },
    discardBtn: {
      padding: '14px 30px',
      borderRadius: '12px',
      border: '2px solid rgba(231,76,60,0.3)',
      background: 'transparent',
      color: '#E74C3C',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '15px',
    },
    error: {
      padding: '10px 16px',
      borderRadius: '10px',
      background: 'rgba(231,76,60,0.15)',
      color: '#E74C3C',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.85rem',
      marginBottom: '15px',
    },
    spinner: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '3px solid rgba(255,255,255,0.3)',
      borderTop: '3px solid white',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
      marginRight: '10px',
      verticalAlign: 'middle',
    },
    badge: {
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '8px',
      background: 'rgba(46,204,113,0.15)',
      color: '#2ECC71',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.65rem',
      fontWeight: '600',
      marginLeft: '6px',
      verticalAlign: 'middle',
    },
    modeTabs: {
      display: 'flex',
      gap: '5px',
      marginBottom: '20px',
      background: 'rgba(255,255,255,0.05)',
      borderRadius: '12px',
      padding: '4px',
    },
    modeTab: (active) => ({
      flex: 1,
      padding: '10px 16px',
      borderRadius: '10px',
      border: 'none',
      background: active ? 'linear-gradient(135deg, #9B59B6, #8E44AD)' : 'transparent',
      color: active ? 'white' : 'rgba(255,255,255,0.5)',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.85rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
    }),
    statsBar: {
      display: 'flex',
      gap: '15px',
      padding: '12px 18px',
      borderRadius: '12px',
      background: 'rgba(46,204,113,0.08)',
      border: '1px solid rgba(46,204,113,0.15)',
      marginBottom: '20px',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    statItem: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.8rem',
      color: 'rgba(255,255,255,0.6)',
      textAlign: 'center',
    },
    statValue: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1.2rem',
      fontWeight: '700',
      color: '#2ECC71',
      display: 'block',
    },
    cacheHint: {
      padding: '12px 16px',
      borderRadius: '12px',
      background: 'rgba(241,196,15,0.1)',
      border: '1px solid rgba(241,196,15,0.25)',
      marginBottom: '15px',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.85rem',
      color: 'rgba(241,196,15,0.9)',
    },
    communityCard: {
      padding: '16px',
      borderRadius: '14px',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      marginBottom: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap',
    },
    importBtn: {
      padding: '8px 20px',
      borderRadius: '10px',
      border: 'none',
      background: 'linear-gradient(135deg, #3498DB, #2980B9)',
      color: 'white',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.85rem',
      fontWeight: '600',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
    },
    fromCacheBadge: {
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: '8px',
      background: 'rgba(241,196,15,0.15)',
      color: '#F1C40F',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.7rem',
      fontWeight: '600',
      marginLeft: '8px',
    },
  }

  const subjectLabels = {
    math: 'Maths', french: 'Francais', history: 'Histoire',
    geography: 'Geo', science: 'Sciences', english: 'Anglais',
  }

  return (
    <div style={s.container}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Stats bar */}
      {sharedStats && sharedStats.totalExercises > 0 && (
        <div style={s.statsBar}>
          <div style={s.statItem}>
            <span style={s.statValue}>{sharedStats.totalExercises}</span>
            exercices partages
          </div>
          <div style={s.statItem}>
            <span style={s.statValue}>{sharedStats.tokensSaved}</span>
            tokens API economises
          </div>
          <div style={s.statItem}>
            <span style={s.statValue}>{sharedStats.totalGenerated}</span>
            generations totales
          </div>
        </div>
      )}

      {/* Mode tabs */}
      <div style={s.modeTabs}>
        <button style={s.modeTab(mode === 'generate')} onClick={() => setMode('generate')}>
          🤖 Generer (IA)
        </button>
        <button style={s.modeTab(mode === 'community')} onClick={() => setMode('community')}>
          🌍 Communaute
        </button>
      </div>

      {/* Subject selection */}
      <div style={s.section}>
        <label style={s.label}>Matiere</label>
        <div style={s.subjectGrid}>
          {SUBJECTS.map((sub) => (
            <button
              key={sub.id}
              style={s.subjectBtn(subject === sub.id)}
              onClick={() => { setSubject(sub.id); setTopic(''); setCacheHint(null) }}
            >
              {sub.icon} {sub.label}
            </button>
          ))}
        </div>
      </div>

      {/* Level & count */}
      <div style={{ ...s.section, ...s.row }}>
        <div style={{ flex: 1 }}>
          <label style={s.label}>Niveau scolaire</label>
          <select style={s.select} value={level} onChange={(e) => { setLevel(e.target.value); setTopic(''); setCacheHint(null) }}>
            {LEVELS.map((l) => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>
        </div>
        {mode === 'generate' && (
          <div style={{ flex: 1 }}>
            <label style={s.label}>Nb d'exercices</label>
            <select style={s.select} value={count} onChange={(e) => setCount(Number(e.target.value))}>
              {[3, 5, 8, 10].map((n) => (
                <option key={n} value={n}>{n} exercices</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* ─── Generate mode ──────────────────────────────────── */}
      {mode === 'generate' && (
        <>
          {/* Topic */}
          <div style={s.section}>
            <label style={s.label}>
              Sujet / Theme
              {curriculumTopics.length > 0 && (
                <span style={s.badge}>Programme officiel EN</span>
              )}
            </label>
            <span style={s.sublabel}>
              Les sujets verts suivent le programme officiel de l'Education nationale ({level}).
            </span>
            <input
              style={s.input}
              placeholder="Choisissez un sujet ci-dessous ou tapez le votre..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <div style={s.suggestions}>
              {curriculumTopics.map((sug) => (
                <button
                  key={sug}
                  style={s.suggestionBtn(true)}
                  onClick={() => setTopic(sug)}
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Cache hint — if this topic already exists in shared pool */}
          {cacheHint && (
            <div style={s.cacheHint}>
              💡 Ce sujet existe deja dans le cache communautaire ({cacheHint.count} resultat{cacheHint.count > 1 ? 's' : ''}).
              {cacheHint.exactMatch
                ? ' La generation sera instantanee et gratuite (0 token API) !'
                : ' Des exercices similaires sont disponibles.'}
            </div>
          )}

          {/* Existing exercises info */}
          {existingQuestions.length > 0 && (
            <div style={{
              padding: '10px 16px',
              borderRadius: '10px',
              background: 'rgba(93,173,226,0.1)',
              border: '1px solid rgba(93,173,226,0.2)',
              fontFamily: "'Quicksand', sans-serif",
              fontSize: '0.8rem',
              color: 'rgba(93,173,226,0.8)',
              marginBottom: '15px',
            }}>
              ℹ️ {existingQuestions.length} exercice(s) existant(s) en {SUBJECTS.find(s => s.id === subject)?.label} — les nouveaux seront differents.
            </div>
          )}

          {error && <div style={s.error}>{error}</div>}

          {/* Generate button */}
          <button style={s.generateBtn} onClick={handleGenerate} disabled={generating}>
            {generating ? (
              <>
                <span style={s.spinner} />
                Claude genere les exercices...
              </>
            ) : cacheHint?.exactMatch ? (
              '⚡ Recuperer depuis le cache (gratuit !)'
            ) : (
              '🤖 Generer avec Claude AI'
            )}
          </button>

          {/* Preview */}
          {preview && (
            <div style={s.previewCard}>
              <div style={s.previewTitle}>
                ✅ "{preview.name}" - {preview.exercises?.length} exercices
                {preview.fromCache && <span style={s.fromCacheBadge}>⚡ Depuis le cache</span>}
              </div>
              <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '15px' }}>
                {preview.description}
              </div>

              {preview.exercises?.map((ex, i) => (
                <div key={i} style={s.exercisePreview}>
                  <div style={s.question}>
                    {i + 1}. {ex.question} ({ex.xp} XP)
                  </div>
                  {ex.options?.map((opt, j) => (
                    <div key={j} style={s.option(opt === ex.answer)}>
                      {opt === ex.answer ? '✓ ' : '  '}{opt}
                    </div>
                  ))}
                  {ex.explanation && (
                    <div style={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: '0.75rem',
                      color: 'rgba(241,196,15,0.7)',
                      marginTop: '6px',
                      fontStyle: 'italic',
                    }}>
                      💡 {ex.explanation}
                    </div>
                  )}
                </div>
              ))}

              <div>
                <button style={s.saveBtn} onClick={handleSave}>
                  💾 Sauvegarder cette lecon
                </button>
                <button style={s.discardBtn} onClick={() => setPreview(null)}>
                  Supprimer
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ─── Community mode ─────────────────────────────────── */}
      {mode === 'community' && (
        <div>
          <div style={{ ...s.sublabel, marginBottom: '15px', fontSize: '0.8rem' }}>
            Exercices generes par la communaute pour {SUBJECTS.find(s => s.id === subject)?.label} ({level}).
            Importez-les gratuitement sans utiliser de tokens API !
          </div>

          {loadingShared ? (
            <div style={{ textAlign: 'center', padding: '30px', color: 'rgba(255,255,255,0.4)', fontFamily: "'Quicksand', sans-serif" }}>
              <span style={s.spinner} />
              Chargement...
            </div>
          ) : sharedResults.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: "'Quicksand', sans-serif",
            }}>
              Aucun exercice partage pour {subjectLabels[subject]} en {level}.
              <br />Generez-en un avec l'IA, il sera automatiquement partage !
            </div>
          ) : (
            sharedResults.map((ex) => (
              <div key={ex.id} style={s.communityCard}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '4px',
                  }}>
                    {ex.name}
                  </div>
                  <div style={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.5)',
                    marginBottom: '6px',
                  }}>
                    {ex.description}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: 'rgba(155,89,182,0.15)',
                      color: '#9B59B6',
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: '0.7rem',
                      fontWeight: '600',
                    }}>
                      {ex.exerciseCount} exercices
                    </span>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: 'rgba(93,173,226,0.15)',
                      color: '#5DADE2',
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: '0.7rem',
                      fontWeight: '600',
                    }}>
                      {ex.topic}
                    </span>
                    {ex.usedBy > 1 && (
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: 'rgba(46,204,113,0.15)',
                        color: '#2ECC71',
                        fontFamily: "'Quicksand', sans-serif",
                        fontSize: '0.7rem',
                        fontWeight: '600',
                      }}>
                        {ex.usedBy} familles
                      </span>
                    )}
                  </div>
                </div>
                <button style={s.importBtn} onClick={() => handleImportShared(ex.id)}>
                  📥 Importer
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

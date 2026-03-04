import { useState } from 'react'
import { generateExercises } from '../api'
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

  // Get curriculum-based suggestions for current level + subject
  const curriculumTopics = getTopicSuggestions(level, subject)
  const childAge = LEVELS.find(l => l.id === level)?.age || '10-11'

  // Collect existing questions to avoid redundancy
  const existingQuestions = existingLessons
    .filter(l => l.subject === subject)
    .flatMap(l => (l.exercises || []).map(e => e.question))

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
      background: 'rgba(255,255,255,0.05)',
      color: 'white',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.95rem',
      outline: 'none',
      appearance: 'none',
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
  }

  return (
    <div style={s.container}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Subject selection */}
      <div style={s.section}>
        <label style={s.label}>Matiere</label>
        <div style={s.subjectGrid}>
          {SUBJECTS.map((sub) => (
            <button
              key={sub.id}
              style={s.subjectBtn(subject === sub.id)}
              onClick={() => { setSubject(sub.id); setTopic('') }}
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
          <select style={s.select} value={level} onChange={(e) => { setLevel(e.target.value); setTopic('') }}>
            {LEVELS.map((l) => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={s.label}>Nb d'exercices</label>
          <select style={s.select} value={count} onChange={(e) => setCount(Number(e.target.value))}>
            {[3, 5, 8, 10].map((n) => (
              <option key={n} value={n}>{n} exercices</option>
            ))}
          </select>
        </div>
      </div>

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
        ) : (
          '🤖 Generer avec Claude AI'
        )}
      </button>

      {/* Preview */}
      {preview && (
        <div style={s.previewCard}>
          <div style={s.previewTitle}>
            ✅ "{preview.name}" - {preview.exercises?.length} exercices generes
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
    </div>
  )
}

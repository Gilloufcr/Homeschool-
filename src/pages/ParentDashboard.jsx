import { useState, useEffect } from 'react'
import {
  getChildren,
  addChild,
  deleteChild,
  getLessons,
  deleteLesson,
  generateExercises,
  addLesson,
  parentLogout,
} from '../api'
import AIGenerator from '../components/AIGenerator'

export default function ParentDashboard({ onLogout, childrenProgress }) {
  const [tab, setTab] = useState('children')
  const [children, setChildren] = useState([])
  const [lessons, setLessons] = useState([])
  const [showAddChild, setShowAddChild] = useState(false)
  const [newChild, setNewChild] = useState({ name: '', theme: 'minecraft', avatar: '⛏️' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [c, l] = await Promise.all([getChildren(), getLessons()])
      setChildren(c)
      setLessons(l)
    } catch (e) {
      setError('Impossible de charger les donnees. Le serveur est-il lance ?')
    }
  }

  const handleAddChild = async () => {
    if (!newChild.name.trim()) return
    setLoading(true)
    try {
      await addChild(newChild.name, newChild.theme, newChild.avatar)
      setShowAddChild(false)
      setNewChild({ name: '', theme: 'minecraft', avatar: '⛏️' })
      await loadData()
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  const handleDeleteChild = async (id, name) => {
    if (!confirm(`Supprimer le profil de ${name} ?`)) return
    try {
      await deleteChild(id)
      await loadData()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDeleteLesson = async (id) => {
    if (!confirm('Supprimer cette lecon ?')) return
    try {
      await deleteLesson(id)
      await loadData()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleLessonGenerated = async (lesson) => {
    try {
      await addLesson(lesson)
      await loadData()
      setTab('lessons')
    } catch (e) {
      setError(e.message)
    }
  }

  const handleLogout = () => {
    parentLogout()
    onLogout()
  }

  const s = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '20px',
    },
    container: {
      maxWidth: '900px',
      margin: '0 auto',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '25px',
      flexWrap: 'wrap',
      gap: '10px',
    },
    title: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
      fontWeight: '700',
      color: 'white',
    },
    logoutBtn: {
      padding: '8px 20px',
      borderRadius: '12px',
      border: '2px solid rgba(231,76,60,0.3)',
      background: 'rgba(231,76,60,0.1)',
      color: '#E74C3C',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.85rem',
      fontWeight: '600',
      cursor: 'pointer',
    },
    tabs: {
      display: 'flex',
      gap: '5px',
      marginBottom: '25px',
      background: 'rgba(255,255,255,0.05)',
      borderRadius: '15px',
      padding: '5px',
      flexWrap: 'wrap',
    },
    tab: (active) => ({
      padding: '12px 24px',
      borderRadius: '12px',
      border: 'none',
      background: active ? 'linear-gradient(135deg, #9B59B6, #8E44AD)' : 'transparent',
      color: active ? 'white' : 'rgba(255,255,255,0.5)',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.9rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      flex: '1',
      minWidth: '100px',
      textAlign: 'center',
    }),
    card: {
      padding: '20px',
      borderRadius: '16px',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      marginBottom: '15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '15px',
      flexWrap: 'wrap',
    },
    cardInfo: {
      flex: 1,
    },
    cardName: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1.1rem',
      fontWeight: '700',
      color: 'white',
      marginBottom: '4px',
    },
    cardMeta: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.8rem',
      color: 'rgba(255,255,255,0.5)',
    },
    deleteBtn: {
      padding: '8px 16px',
      borderRadius: '10px',
      border: 'none',
      background: 'rgba(231,76,60,0.15)',
      color: '#E74C3C',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.8rem',
      fontWeight: '600',
      cursor: 'pointer',
    },
    addBtn: {
      padding: '14px 28px',
      borderRadius: '15px',
      border: '2px dashed rgba(155,89,182,0.4)',
      background: 'rgba(155,89,182,0.1)',
      color: '#9B59B6',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      width: '100%',
      transition: 'all 0.3s ease',
    },
    modal: {
      padding: '25px',
      borderRadius: '20px',
      background: 'rgba(26,26,46,0.95)',
      border: '2px solid rgba(155,89,182,0.3)',
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '12px',
      border: '2px solid rgba(155,89,182,0.2)',
      background: 'rgba(255,255,255,0.05)',
      color: 'white',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1rem',
      outline: 'none',
      marginBottom: '12px',
    },
    themeSelector: {
      display: 'flex',
      gap: '10px',
      marginBottom: '15px',
    },
    themeOption: (selected) => ({
      flex: 1,
      padding: '12px',
      borderRadius: '12px',
      border: `2px solid ${selected ? '#9B59B6' : 'rgba(255,255,255,0.1)'}`,
      background: selected ? 'rgba(155,89,182,0.2)' : 'transparent',
      color: 'white',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.85rem',
      fontWeight: '600',
      cursor: 'pointer',
      textAlign: 'center',
    }),
    submitBtn: {
      padding: '12px 30px',
      borderRadius: '12px',
      border: 'none',
      background: 'linear-gradient(135deg, #9B59B6, #8E44AD)',
      color: 'white',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      width: '100%',
    },
    error: {
      padding: '12px 20px',
      borderRadius: '12px',
      background: 'rgba(231,76,60,0.15)',
      border: '1px solid rgba(231,76,60,0.3)',
      color: '#E74C3C',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.85rem',
      marginBottom: '15px',
    },
    progressCard: {
      padding: '15px',
      borderRadius: '12px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      marginTop: '8px',
    },
    progressItem: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.8rem',
      color: 'rgba(255,255,255,0.6)',
      padding: '4px 0',
    },
    progressValue: {
      color: '#9B59B6',
      fontWeight: '700',
    },
    lessonTag: {
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: '8px',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.7rem',
      fontWeight: '600',
      marginRight: '6px',
      marginTop: '4px',
    },
  }

  const subjectColors = {
    math: { bg: 'rgba(46,204,113,0.15)', color: '#2ECC71' },
    french: { bg: 'rgba(93,173,226,0.15)', color: '#5DADE2' },
    history: { bg: 'rgba(230,126,34,0.15)', color: '#E67E22' },
    geography: { bg: 'rgba(155,89,182,0.15)', color: '#9B59B6' },
    science: { bg: 'rgba(241,196,15,0.15)', color: '#F1C40F' },
    english: { bg: 'rgba(231,76,60,0.15)', color: '#E74C3C' },
  }

  const subjectLabels = {
    math: 'Maths',
    french: 'Francais',
    history: 'Histoire',
    geography: 'Geographie',
    science: 'Sciences',
    english: 'Anglais',
  }

  return (
    <div style={s.page}>
      <div style={s.container}>
        <div style={s.header}>
          <div style={s.title}>🎓 Espace Parent</div>
          <button style={s.logoutBtn} onClick={handleLogout}>
            Deconnexion
          </button>
        </div>

        {error && (
          <div style={s.error}>
            {error}
            <button
              onClick={() => setError('')}
              style={{ float: 'right', background: 'none', border: 'none', color: '#E74C3C', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
        )}

        <div style={s.tabs}>
          {[
            { id: 'children', label: '👧 Enfants' },
            { id: 'lessons', label: '📚 Lecons' },
            { id: 'generate', label: '🤖 Generer (IA)' },
          ].map((t) => (
            <button
              key={t.id}
              style={s.tab(tab === t.id)}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ─── Children tab ──────────────────────────────────── */}
        {tab === 'children' && (
          <div>
            {children.map((child) => {
              const progress = childrenProgress?.[child.id]
              return (
                <div key={child.id} style={s.card}>
                  <div style={{ fontSize: '2rem' }}>{child.avatar}</div>
                  <div style={s.cardInfo}>
                    <div style={s.cardName}>{child.name}</div>
                    <div style={s.cardMeta}>
                      {child.theme === 'minecraft' ? 'Mode Minecraft' : 'Mode Feerie'}
                    </div>
                    {progress && (
                      <div style={s.progressCard}>
                        <div style={s.progressItem}>
                          <span>Niveau</span>
                          <span style={s.progressValue}>{progress.level}</span>
                        </div>
                        <div style={s.progressItem}>
                          <span>XP Total</span>
                          <span style={s.progressValue}>{progress.xp}</span>
                        </div>
                        <div style={s.progressItem}>
                          <span>Exercices</span>
                          <span style={s.progressValue}>{progress.completedExercises?.length || 0}</span>
                        </div>
                        <div style={s.progressItem}>
                          <span>Serie</span>
                          <span style={s.progressValue}>{progress.streak} jour(s)</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <button style={s.deleteBtn} onClick={() => handleDeleteChild(child.id, child.name)}>
                    Supprimer
                  </button>
                </div>
              )
            })}

            {showAddChild ? (
              <div style={s.modal}>
                <input
                  style={s.input}
                  placeholder="Prenom de l'enfant..."
                  value={newChild.name}
                  onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddChild()}
                  autoFocus
                />
                <div style={s.themeSelector}>
                  <button
                    style={s.themeOption(newChild.theme === 'minecraft')}
                    onClick={() => setNewChild({ ...newChild, theme: 'minecraft', avatar: '⛏️' })}
                  >
                    ⛏️ Minecraft
                  </button>
                  <button
                    style={s.themeOption(newChild.theme === 'lalilo')}
                    onClick={() => setNewChild({ ...newChild, theme: 'lalilo', avatar: '🦋' })}
                  >
                    🦋 Feerie
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={s.submitBtn} onClick={handleAddChild} disabled={loading}>
                    {loading ? 'Creation...' : 'Creer le profil'}
                  </button>
                  <button
                    style={{ ...s.submitBtn, background: 'rgba(255,255,255,0.1)' }}
                    onClick={() => setShowAddChild(false)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <button style={s.addBtn} onClick={() => setShowAddChild(true)}>
                + Ajouter un enfant
              </button>
            )}
          </div>
        )}

        {/* ─── Lessons tab ──────────────────────────────────── */}
        {tab === 'lessons' && (
          <div>
            {lessons.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: 'rgba(255,255,255,0.4)',
                fontFamily: "'Quicksand', sans-serif",
              }}>
                Aucune lecon personnalisee. Utilisez l'onglet "Generer (IA)" pour en creer !
              </div>
            ) : (
              lessons.map((lesson) => (
                <div key={lesson.id} style={s.card}>
                  <div style={s.cardInfo}>
                    <div style={s.cardName}>{lesson.name}</div>
                    <div style={s.cardMeta}>{lesson.description}</div>
                    <div>
                      <span style={{
                        ...s.lessonTag,
                        background: (subjectColors[lesson.subject] || subjectColors.math).bg,
                        color: (subjectColors[lesson.subject] || subjectColors.math).color,
                      }}>
                        {subjectLabels[lesson.subject] || lesson.subject}
                      </span>
                      <span style={{
                        ...s.lessonTag,
                        background: 'rgba(155,89,182,0.15)',
                        color: '#9B59B6',
                      }}>
                        {lesson.exercises?.length || 0} exercices
                      </span>
                      {lesson.isAIGenerated && (
                        <span style={{
                          ...s.lessonTag,
                          background: 'rgba(241,196,15,0.15)',
                          color: '#F1C40F',
                        }}>
                          🤖 IA
                        </span>
                      )}
                    </div>
                  </div>
                  <button style={s.deleteBtn} onClick={() => handleDeleteLesson(lesson.id)}>
                    Supprimer
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* ─── AI Generator tab ──────────────────────────────── */}
        {tab === 'generate' && (
          <AIGenerator onGenerated={handleLessonGenerated} />
        )}
      </div>
    </div>
  )
}

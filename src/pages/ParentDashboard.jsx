import { useState, useEffect } from 'react'
import {
  getChildren,
  addChild,
  deleteChild,
  getLessons,
  deleteLesson,
  addLesson,
} from '../api'
import AIGenerator from '../components/AIGenerator'
import ReportsPage from '../components/ReportsPage'
import AccessibilitySettings from '../components/AccessibilitySettings'

export default function ParentDashboard({
  family,
  onSelectChild,
  onNavigate,
  onLogout,
  onLessonsUpdate,
  customLessons,
}) {
  const [tab, setTab] = useState('home')
  const [children, setChildren] = useState([])
  const [lessons, setLessons] = useState(customLessons || [])
  const [showAddChild, setShowAddChild] = useState(false)
  const [newChild, setNewChild] = useState({ name: '', theme: 'minecraft', avatar: '⛏️', grade: 'CM2' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingTND, setEditingTND] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    setLessons(customLessons || [])
  }, [customLessons])

  const loadData = async () => {
    try {
      const [c, l] = await Promise.all([getChildren(), getLessons()])
      setChildren(c)
      setLessons(l)
    } catch (e) {
      setError('Impossible de charger les donnees.')
    }
    setLoading(false)
  }

  const handleAddChild = async () => {
    if (!newChild.name.trim()) return
    setLoading(true)
    try {
      await addChild(newChild.name, newChild.theme, newChild.avatar, newChild.grade)
      setShowAddChild(false)
      setNewChild({ name: '', theme: 'minecraft', avatar: '⛏️', grade: 'CM2' })
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
      onLessonsUpdate()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleLessonGenerated = async (lesson) => {
    try {
      await addLesson(lesson)
      await loadData()
      onLessonsUpdate()
      setTab('lessons')
    } catch (e) {
      setError(e.message)
    }
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
    math: 'Maths', french: 'Francais', history: 'Histoire',
    geography: 'Geographie', science: 'Sciences', english: 'Anglais',
  }

  const s = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '20px',
    },
    container: { maxWidth: '900px', margin: '0 auto' },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
      flexWrap: 'wrap',
      gap: '10px',
    },
    familyName: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
      fontWeight: '700',
      color: 'white',
    },
    familyEmail: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.8rem',
      color: 'rgba(255,255,255,0.4)',
      marginBottom: '25px',
    },
    headerBtns: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
    },
    iconBtn: (color) => ({
      padding: '8px 16px',
      borderRadius: '12px',
      border: `2px solid ${color}33`,
      background: `${color}15`,
      color: color,
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.8rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }),
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
      padding: '12px 20px',
      borderRadius: '12px',
      border: 'none',
      background: active ? 'linear-gradient(135deg, #9B59B6, #8E44AD)' : 'transparent',
      color: active ? 'white' : 'rgba(255,255,255,0.5)',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.85rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      flex: '1',
      minWidth: '80px',
      textAlign: 'center',
    }),
    // Children cards grid
    childrenGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: '16px',
      marginBottom: '20px',
    },
    childCard: (theme) => ({
      padding: '25px 20px',
      borderRadius: theme === 'minecraft' ? '6px' : '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      background: theme === 'minecraft'
        ? 'linear-gradient(135deg, rgba(76,175,80,0.15), rgba(46,125,50,0.25))'
        : 'linear-gradient(135deg, rgba(255,105,180,0.1), rgba(155,89,182,0.2))',
      border: theme === 'minecraft'
        ? '3px solid rgba(76,175,80,0.3)'
        : '2px solid rgba(255,105,180,0.2)',
      backdropFilter: 'blur(10px)',
      position: 'relative',
    }),
    childAvatar: { fontSize: '3rem', marginBottom: '10px', display: 'block' },
    childName: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1.2rem',
      fontWeight: '700',
      color: 'white',
      marginBottom: '4px',
    },
    childMeta: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.75rem',
      color: 'rgba(255,255,255,0.5)',
    },
    childPlayBtn: {
      marginTop: '12px',
      padding: '8px 20px',
      borderRadius: '10px',
      border: 'none',
      background: 'linear-gradient(135deg, #9B59B6, #8E44AD)',
      color: 'white',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.85rem',
      fontWeight: '700',
      cursor: 'pointer',
    },
    deleteChildBtn: {
      position: 'absolute',
      top: '8px',
      right: '8px',
      width: '26px',
      height: '26px',
      borderRadius: '50%',
      border: 'none',
      background: 'rgba(231,76,60,0.2)',
      color: '#E74C3C',
      fontSize: '0.7rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyState: {
      textAlign: 'center',
      padding: '50px 20px',
      color: 'rgba(255,255,255,0.4)',
      fontFamily: "'Quicksand', sans-serif",
    },
    addBtn: {
      padding: '20px',
      borderRadius: '20px',
      border: '2px dashed rgba(155,89,182,0.4)',
      background: 'rgba(155,89,182,0.05)',
      color: '#9B59B6',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      width: '100%',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      minHeight: '120px',
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
      boxSizing: 'border-box',
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
    cardInfo: { flex: 1 },
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

  return (
    <div style={s.page}>
      <div style={s.container}>
        {/* Header */}
        <div style={s.header}>
          <div style={s.familyName}>{family?.name || 'Tableau de bord'}</div>
          <div style={s.headerBtns}>
            <button style={s.iconBtn('#9B59B6')} onClick={() => onNavigate('settings')}>
              Parametres
            </button>
            <button style={s.iconBtn('#E74C3C')} onClick={onLogout}>
              Deconnexion
            </button>
          </div>
        </div>
        <div style={s.familyEmail}>{family?.email}</div>

        {error && (
          <div style={s.error}>
            {error}
            <button
              onClick={() => setError('')}
              style={{ float: 'right', background: 'none', border: 'none', color: '#E74C3C', cursor: 'pointer' }}
            >
              X
            </button>
          </div>
        )}

        {/* Tabs */}
        <div style={s.tabs}>
          {[
            { id: 'home', label: 'Enfants' },
            { id: 'children', label: 'Gerer' },
            { id: 'reports', label: 'Rapports' },
            { id: 'accessibility', label: 'TND' },
            { id: 'lessons', label: 'Lecons' },
            { id: 'generate', label: 'Generer (IA)' },
          ].map((t) => (
            <button key={t.id} style={s.tab(tab === t.id)} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ─── Home tab: Children cards to launch exercises ─── */}
        {tab === 'home' && (
          <div>
            {children.length === 0 ? (
              <div style={s.emptyState}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>👧</div>
                <div style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'rgba(255,255,255,0.6)' }}>
                  Aucun enfant pour le moment
                </div>
                <div style={{ fontSize: '0.85rem' }}>
                  Allez dans l'onglet "Gerer" pour ajouter un profil enfant
                </div>
              </div>
            ) : (
              <div style={s.childrenGrid}>
                {children.map((child) => (
                  <div
                    key={child.id}
                    style={s.childCard(child.theme)}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'
                      e.currentTarget.style.boxShadow = child.theme === 'minecraft'
                        ? '0 10px 30px rgba(76,175,80,0.3)'
                        : '0 10px 30px rgba(255,105,180,0.2)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'none'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <span style={s.childAvatar}>{child.avatar}</span>
                    <div style={s.childName}>{child.name}</div>
                    <div style={s.childMeta}>
                      {child.theme === 'minecraft' ? 'Minecraft' : 'Feerie'}
                      {child.grade && ` • ${child.grade}`}
                    </div>
                    <button
                      style={s.childPlayBtn}
                      onClick={() => onSelectChild(child)}
                    >
                      Commencer
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── Manage children tab ─── */}
        {tab === 'children' && (
          <div>
            {children.map((child) => (
              <div key={child.id} style={s.card}>
                <div style={{ fontSize: '2rem' }}>{child.avatar}</div>
                <div style={s.cardInfo}>
                  <div style={s.cardName}>{child.name}</div>
                  <div style={s.cardMeta}>
                    {child.theme === 'minecraft' ? 'Mode Minecraft' : 'Mode Feerie'}
                    {child.grade && ` • ${child.grade}`}
                  </div>
                </div>
                <button style={s.deleteBtn} onClick={() => handleDeleteChild(child.id, child.name)}>
                  Supprimer
                </button>
              </div>
            ))}

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
                    Minecraft
                  </button>
                  <button
                    style={s.themeOption(newChild.theme === 'lalilo')}
                    onClick={() => setNewChild({ ...newChild, theme: 'lalilo', avatar: '🦋' })}
                  >
                    Feerie
                  </button>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: '8px',
                  }}>
                    Niveau scolaire
                  </div>
                  <div style={s.themeSelector}>
                    {['CE2', 'CM1', 'CM2', '6eme', '5eme'].map((g) => (
                      <button
                        key={g}
                        style={s.themeOption(newChild.grade === g)}
                        onClick={() => setNewChild({ ...newChild, grade: g })}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
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

        {/* ─── Lessons tab ─── */}
        {tab === 'lessons' && (
          <div>
            {lessons.length === 0 ? (
              <div style={s.emptyState}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📚</div>
                <div style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'rgba(255,255,255,0.6)' }}>
                  Aucune lecon personnalisee
                </div>
                <div style={{ fontSize: '0.85rem' }}>
                  Utilisez l'onglet "Generer (IA)" pour en creer !
                </div>
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
                          IA
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

        {/* ─── Reports tab ─── */}
        {tab === 'reports' && (
          <ReportsPage children={children} />
        )}

        {/* ─── Accessibility / TND tab ─── */}
        {tab === 'accessibility' && (
          <div>
            {children.length === 0 ? (
              <div style={s.emptyState}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>♿</div>
                <div style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'rgba(255,255,255,0.6)' }}>
                  Aucun enfant
                </div>
                <div style={{ fontSize: '0.85rem' }}>
                  Ajoutez un enfant d'abord dans l'onglet "Gerer"
                </div>
              </div>
            ) : !editingTND ? (
              <div>
                <div style={{
                  fontFamily: "'Quicksand', sans-serif", fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.6)', marginBottom: '20px', lineHeight: '1.6',
                }}>
                  Configurez les adaptations pour les Troubles Neurodeveloppementaux (TND) de chaque enfant.
                  Les exercices et l'interface s'adapteront automatiquement.
                </div>
                {children.map((child) => (
                  <div key={child.id} style={s.card}>
                    <div style={{ fontSize: '2rem' }}>{child.avatar}</div>
                    <div style={s.cardInfo}>
                      <div style={s.cardName}>{child.name}</div>
                      <div style={s.cardMeta}>
                        {child.accessibility?.profiles?.length > 0
                          ? child.accessibility.profiles.map(p => {
                              const labels = { dyslexia: 'Dyslexie', dyscalculia: 'Dyscalculie', adhd: 'TDAH', autism: 'TSA', dyspraxia: 'Dyspraxie' }
                              return labels[p] || p
                            }).join(', ')
                          : 'Aucune adaptation configuree'
                        }
                      </div>
                    </div>
                    <button
                      style={{
                        padding: '8px 16px', borderRadius: '10px', border: 'none',
                        background: 'rgba(155,89,182,0.15)', color: '#9B59B6',
                        fontFamily: "'Quicksand', sans-serif", fontSize: '0.8rem',
                        fontWeight: '600', cursor: 'pointer',
                      }}
                      onClick={() => setEditingTND(child)}
                    >
                      Configurer
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <button
                  style={{
                    padding: '8px 16px', borderRadius: '10px',
                    border: '1px solid rgba(155,89,182,0.3)',
                    background: 'rgba(155,89,182,0.1)', color: '#9B59B6',
                    fontFamily: "'Quicksand', sans-serif", fontSize: '0.85rem',
                    fontWeight: '600', cursor: 'pointer', marginBottom: '20px',
                  }}
                  onClick={() => { setEditingTND(null); loadData(); }}
                >
                  Retour a la liste
                </button>
                <AccessibilitySettings
                  child={editingTND}
                  onUpdate={(updatedChild) => {
                    setChildren(prev => prev.map(c => c.id === updatedChild.id ? updatedChild : c))
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* ─── AI Generator tab ─── */}
        {tab === 'generate' && (
          <AIGenerator onGenerated={handleLessonGenerated} existingLessons={lessons} children={children} />
        )}
      </div>
    </div>
  )
}

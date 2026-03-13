import { useState, useEffect } from 'react'
import {
  getChildren,
  addChild,
  deleteChild,
  getLessons,
  deleteLesson,
  addLesson,
  getProgressSummary,
  getProgress,
  getProgressState,
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
  const [childStats, setChildStats] = useState({})
  const [childRecent, setChildRecent] = useState({})
  const [selectedStatsChild, setSelectedStatsChild] = useState(null)
  const [statsLoading, setStatsLoading] = useState(false)

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
      if (c.length > 0) loadAllChildStats(c)
    } catch (e) {
      setError('Impossible de charger les donnees.')
    }
    setLoading(false)
  }

  const loadAllChildStats = async (childrenList) => {
    setStatsLoading(true)
    try {
      const statsMap = {}
      const recentMap = {}
      await Promise.all(childrenList.map(async (child) => {
        const [summary, progressData, state] = await Promise.all([
          getProgressSummary(child.id).catch(() => ({ total: 0, correct: 0, subjects: {}, byDate: {} })),
          getProgress(child.id).catch(() => ({ exercises: [] })),
          getProgressState(child.id).catch(() => ({ streak: 0, xp: 0, level: 1 })),
        ])
        statsMap[child.id] = { ...summary, streak: state.streak || 0, xp: state.xp || 0, level: state.level || 1 }
        recentMap[child.id] = (progressData.exercises || [])
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 10)
      }))
      setChildStats(statsMap)
      setChildRecent(recentMap)
      if (!selectedStatsChild && childrenList.length > 0) {
        setSelectedStatsChild(childrenList[0].id)
      }
    } catch (e) {
      // Stats loading is non-critical
    }
    setStatsLoading(false)
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
    art: { bg: 'rgba(255,152,0,0.15)', color: '#FF9800' },
  }

  const subjectLabels = {
    math: 'Maths', french: 'Francais', history: 'Histoire',
    geography: 'Geographie', science: 'Sciences', english: 'Anglais',
    art: 'Arts',
  }

  const subjectIcons = {
    math: '\u{1F4D0}', french: '\u{1F4D6}', history: '\u{1F3DB}',
    geography: '\u{1F30D}', science: '\u{1F52C}', english: '\u{1F1EC}\u{1F1E7}',
    art: '\u{1F3A8}',
  }

  const formatDuration = (seconds) => {
    if (!seconds || seconds < 60) return '< 1 min'
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    if (h > 0) return `${h}h ${m}min`
    return `${m} min`
  }

  const formatRelativeDate = (iso) => {
    if (!iso) return ''
    const d = new Date(iso)
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }) +
      ' ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
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

        {/* ─── Home tab: Children cards + stats dashboard ─── */}
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
              <>
                {/* ── Per-child stats cards ── */}
                <div style={s.childrenGrid}>
                  {children.map((child) => {
                    const stats = childStats[child.id] || {}
                    const successRate = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
                    const totalDuration = Object.values(stats.subjects || {}).reduce((acc, sub) => acc + (sub.totalDuration || 0), 0)
                    const isSelected = selectedStatsChild === child.id
                    const themeColor = child.theme === 'minecraft' ? '#4CAF50' : '#FF69B4'

                    return (
                      <div
                        key={child.id}
                        style={{
                          ...s.childCard(child.theme),
                          outline: isSelected ? `2px solid ${themeColor}` : 'none',
                          outlineOffset: '2px',
                        }}
                        onClick={() => setSelectedStatsChild(child.id)}
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
                          {child.grade && ` \u2022 ${child.grade}`}
                        </div>

                        {/* Stats summary row */}
                        <div style={{
                          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',
                          marginTop: '14px', textAlign: 'center',
                        }}>
                          <div style={{
                            padding: '8px 4px', borderRadius: '10px',
                            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                          }}>
                            <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontWeight: '700', color: themeColor }}>
                              {stats.total || 0}
                            </div>
                            <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>
                              Exercices
                            </div>
                          </div>
                          <div style={{
                            padding: '8px 4px', borderRadius: '10px',
                            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                          }}>
                            <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontWeight: '700', color: successRate >= 70 ? '#2ECC71' : successRate >= 40 ? '#F1C40F' : '#E74C3C' }}>
                              {successRate}%
                            </div>
                            <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>
                              Reussite
                            </div>
                          </div>
                          <div style={{
                            padding: '8px 4px', borderRadius: '10px',
                            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                          }}>
                            <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontWeight: '700', color: themeColor }}>
                              {stats.streak || 0}
                            </div>
                            <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>
                              Serie
                            </div>
                          </div>
                          <div style={{
                            padding: '8px 4px', borderRadius: '10px',
                            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                          }}>
                            <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(0.75rem, 2vw, 1rem)', fontWeight: '700', color: themeColor }}>
                              {formatDuration(totalDuration)}
                            </div>
                            <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>
                              Temps
                            </div>
                          </div>
                        </div>

                        {/* Mini subject bar chart */}
                        {stats.subjects && Object.keys(stats.subjects).length > 0 && (
                          <div style={{ marginTop: '12px' }}>
                            {Object.entries(stats.subjects).map(([subj, data]) => {
                              const maxTotal = Math.max(...Object.values(stats.subjects).map(sub => sub.total))
                              const pct = maxTotal > 0 ? (data.total / maxTotal) * 100 : 0
                              const sc = subjectColors[subj] || subjectColors.math
                              return (
                                <div key={subj} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                                  <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', width: '18px', textAlign: 'center' }}>
                                    {subjectIcons[subj] || '\u{1F4DA}'}
                                  </div>
                                  <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                                    <div style={{ width: `${pct}%`, height: '100%', borderRadius: '3px', background: sc.color, transition: 'width 0.5s ease' }} />
                                  </div>
                                  <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', width: '20px', textAlign: 'right' }}>
                                    {data.total}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}

                        <button
                          style={{ ...s.childPlayBtn, marginTop: '14px' }}
                          onClick={(e) => { e.stopPropagation(); onSelectChild(child); }}
                        >
                          Commencer
                        </button>
                      </div>
                    )
                  })}
                </div>

                {/* ── Subject breakdown for selected child ── */}
                {selectedStatsChild && childStats[selectedStatsChild] && (
                  <div style={{
                    padding: '24px', borderRadius: '20px',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)', marginBottom: '20px',
                  }}>
                    <div style={{
                      fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                      fontWeight: '700', color: 'white', marginBottom: '18px',
                    }}>
                      Progression par matiere — {children.find(c => c.id === selectedStatsChild)?.name || ''}
                    </div>

                    {(() => {
                      const stats = childStats[selectedStatsChild]
                      const allSubjects = ['math', 'french', 'history', 'geography', 'science', 'english', 'art']
                      const maxExercises = Math.max(1, ...allSubjects.map(subj => (stats.subjects?.[subj]?.total || 0)))

                      return allSubjects.map((subj) => {
                        const data = stats.subjects?.[subj] || { total: 0, correct: 0, totalDuration: 0 }
                        const sc = subjectColors[subj] || subjectColors.math
                        const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
                        const barWidth = maxExercises > 0 ? (data.total / maxExercises) * 100 : 0

                        return (
                          <div key={subj} style={{ marginBottom: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '1rem' }}>{subjectIcons[subj] || '\u{1F4DA}'}</span>
                                <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: '0.85rem', fontWeight: '600', color: sc.color }}>
                                  {subjectLabels[subj] || subj}
                                </span>
                              </div>
                              <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                                {data.correct}/{data.total} — {pct}%
                              </div>
                            </div>
                            <div style={{
                              height: '10px', borderRadius: '5px',
                              background: 'rgba(255,255,255,0.08)', overflow: 'hidden',
                            }}>
                              <div style={{
                                height: '100%', borderRadius: '5px',
                                background: `linear-gradient(90deg, ${sc.color}, ${sc.color}aa)`,
                                width: `${barWidth}%`,
                                transition: 'width 0.6s ease',
                              }} />
                            </div>
                          </div>
                        )
                      })
                    })()}
                  </div>
                )}

                {/* ── Recent activity for selected child ── */}
                {selectedStatsChild && childRecent[selectedStatsChild]?.length > 0 && (
                  <div style={{
                    padding: '24px', borderRadius: '20px',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)', marginBottom: '20px',
                  }}>
                    <div style={{
                      fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                      fontWeight: '700', color: 'white', marginBottom: '16px',
                    }}>
                      Activite recente
                    </div>

                    {childRecent[selectedStatsChild].map((ex, i) => {
                      const sc = subjectColors[ex.subject] || subjectColors.math
                      return (
                        <div key={i} style={{
                          display: 'flex', alignItems: 'center', gap: '12px',
                          padding: '10px 14px', borderRadius: '12px',
                          background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent',
                          marginBottom: '2px',
                        }}>
                          <div style={{
                            width: '28px', height: '28px', borderRadius: '8px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: ex.isCorrect ? 'rgba(46,204,113,0.15)' : 'rgba(231,76,60,0.15)',
                            fontSize: '0.85rem', flexShrink: 0,
                          }}>
                            {ex.isCorrect ? '\u2713' : '\u2717'}
                          </div>
                          <div style={{
                            width: '22px', textAlign: 'center', fontSize: '0.85rem', flexShrink: 0,
                          }}>
                            {subjectIcons[ex.subject] || '\u{1F4DA}'}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              fontFamily: "'Quicksand', sans-serif", fontSize: '0.8rem', fontWeight: '600',
                              color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                            }}>
                              {ex.question || ex.levelName || subjectLabels[ex.subject] || ex.subject}
                            </div>
                            <div style={{
                              fontFamily: "'Quicksand', sans-serif", fontSize: '0.65rem',
                              color: 'rgba(255,255,255,0.4)',
                            }}>
                              {subjectLabels[ex.subject] || ex.subject}{ex.grade ? ` \u2022 ${ex.grade}` : ''}
                            </div>
                          </div>
                          <div style={{
                            fontFamily: "'Quicksand', sans-serif", fontSize: '0.65rem',
                            color: 'rgba(255,255,255,0.35)', textAlign: 'right', flexShrink: 0,
                          }}>
                            {formatRelativeDate(ex.timestamp)}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Loading indicator for stats */}
                {statsLoading && (
                  <div style={{
                    textAlign: 'center', padding: '20px',
                    fontFamily: "'Quicksand', sans-serif", fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.4)',
                  }}>
                    Chargement des statistiques...
                  </div>
                )}
              </>
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

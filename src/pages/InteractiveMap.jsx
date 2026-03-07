import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import confetti from 'canvas-confetti'
import {
  historyMapPoints,
  geographyMapPoints,
  historicalPeriods,
  geographyCategories,
} from '../data/mapData'

// Custom emoji marker
function createEmojiIcon(emoji, color, size = 36) {
  return L.divIcon({
    html: `<div style="
      font-size: ${size}px;
      text-align: center;
      line-height: 1;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
      cursor: pointer;
      transition: transform 0.2s;
    ">${emoji}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
    className: 'emoji-marker',
  })
}

// Auto-center map on filtered points
function MapBounds({ points }) {
  const map = useMap()
  useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(points.map(p => [p.lat, p.lng]))
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 6 })
    }
  }, [points, map])
  return null
}

export default function InteractiveMap({ profile, progress, onComplete, onBack }) {
  const [mode, setMode] = useState('history') // 'history' or 'geography'
  const [filter, setFilter] = useState('all')
  const [selectedPoint, setSelectedPoint] = useState(null)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizResult, setQuizResult] = useState(null)
  const [discoveredPoints, setDiscoveredPoints] = useState(() => {
    const saved = localStorage.getItem(`homeschool_map_${profile?.id || 'default'}`)
    return saved ? JSON.parse(saved) : []
  })

  const isMinecraft = profile?.theme === 'minecraft'

  useEffect(() => {
    localStorage.setItem(`homeschool_map_${profile?.id || 'default'}`, JSON.stringify(discoveredPoints))
  }, [discoveredPoints, profile])

  const points = mode === 'history' ? historyMapPoints : geographyMapPoints
  const categories = mode === 'history' ? historicalPeriods : geographyCategories

  const filteredPoints = filter === 'all'
    ? points
    : points.filter(p => (mode === 'history' ? p.period : p.category) === filter)

  const handleQuizAnswer = (point, answer) => {
    setQuizAnswer(answer)
    const correct = answer === point.quiz.answer
    setQuizResult(correct)

    if (correct) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 },
        colors: isMinecraft
          ? ['#4CAF50', '#FFD700', '#8B4513']
          : ['#FF69B4', '#9B59B6', '#5DADE2', '#FFD700'],
      })

      if (!discoveredPoints.includes(point.id)) {
        setDiscoveredPoints(prev => [...prev, point.id])
        if (onComplete) {
          onComplete(`map-${point.id}`, 20, mode === 'history' ? 'history' : 'geography')
        }
      }
    }
  }

  const resetQuiz = () => {
    setQuizAnswer(null)
    setQuizResult(null)
  }

  const font = "'Quicksand', sans-serif"

  // Styles
  const s = {
    page: {
      minHeight: '100vh',
      background: isMinecraft
        ? 'linear-gradient(180deg, #87CEEB 0%, #a8d8a8 40%, #4CAF50 70%, #3E8E41 100%)'
        : 'linear-gradient(135deg, #fff5f9 0%, #f0e6ff 50%, #e6f3ff 100%)',
      padding: 'clamp(15px, 2vw, 30px)',
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 'clamp(12px, 1.5vw, 20px)',
      flexWrap: 'wrap',
      gap: '8px',
    },
    title: {
      fontFamily: font,
      fontSize: 'clamp(1.3rem, 2vw, 2rem)',
      fontWeight: '700',
      color: isMinecraft ? '#FFD700' : '#333',
      textShadow: isMinecraft ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none',
    },
    backBtn: {
      padding: '10px 22px',
      borderRadius: '14px',
      border: 'none',
      background: isMinecraft ? 'rgba(20,20,30,0.7)' : 'rgba(155,89,182,0.1)',
      backdropFilter: 'blur(8px)',
      color: isMinecraft ? '#fff' : '#9B59B6',
      fontFamily: font,
      fontSize: 'clamp(0.85rem, 1vw, 1rem)',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    modeToggle: {
      display: 'flex',
      gap: '8px',
      marginBottom: 'clamp(12px, 1.5vw, 20px)',
    },
    modeBtn: (active) => ({
      flex: 1,
      padding: 'clamp(10px, 1.2vw, 16px)',
      borderRadius: '16px',
      border: isMinecraft
        ? `2px solid ${active ? '#FFD700' : 'rgba(255,255,255,0.1)'}`
        : `2px solid ${active ? '#9B59B6' : 'rgba(155,89,182,0.15)'}`,
      background: active
        ? (isMinecraft ? 'rgba(255,215,0,0.15)' : 'rgba(155,89,182,0.1)')
        : (isMinecraft ? 'rgba(20,20,30,0.6)' : 'rgba(255,255,255,0.8)'),
      backdropFilter: 'blur(8px)',
      color: active
        ? (isMinecraft ? '#FFD700' : '#9B59B6')
        : (isMinecraft ? '#aaa' : '#888'),
      fontFamily: font,
      fontSize: 'clamp(0.9rem, 1.1vw, 1.15rem)',
      fontWeight: '700',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.2s ease',
    }),
    filters: {
      display: 'flex',
      gap: '8px',
      marginBottom: 'clamp(12px, 1.5vw, 20px)',
      flexWrap: 'wrap',
    },
    filterBtn: (active, color) => ({
      padding: '8px 16px',
      borderRadius: '20px',
      border: `2px solid ${active ? color : 'transparent'}`,
      background: active ? `${color}22` : (isMinecraft ? 'rgba(20,20,30,0.5)' : 'rgba(255,255,255,0.7)'),
      backdropFilter: 'blur(4px)',
      color: active ? color : (isMinecraft ? '#ccc' : '#888'),
      fontFamily: font,
      fontSize: 'clamp(0.75rem, 0.9vw, 0.95rem)',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
    mapWrapper: {
      borderRadius: '20px',
      overflow: 'hidden',
      border: isMinecraft ? '2px solid rgba(255,255,255,0.1)' : '2px solid rgba(155,89,182,0.15)',
      boxShadow: isMinecraft ? '0 8px 32px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.1)',
      height: 'clamp(400px, 65vh, 700px)',
    },
    stats: {
      display: 'flex',
      justifyContent: 'center',
      gap: 'clamp(20px, 4vw, 50px)',
      marginTop: 'clamp(12px, 1.5vw, 20px)',
      padding: 'clamp(12px, 1.5vw, 20px)',
      borderRadius: '18px',
      background: isMinecraft ? 'rgba(20,20,30,0.75)' : 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(8px)',
      border: isMinecraft ? '1px solid rgba(255,255,255,0.08)' : '2px solid rgba(155,89,182,0.1)',
      boxShadow: isMinecraft ? '0 4px 16px rgba(0,0,0,0.2)' : 'none',
    },
    statItem: {
      textAlign: 'center',
    },
    statValue: {
      fontFamily: font,
      fontSize: 'clamp(1.3rem, 1.8vw, 2rem)',
      fontWeight: '700',
      color: isMinecraft ? '#7CFC00' : '#9B59B6',
    },
    statLabel: {
      fontFamily: font,
      fontSize: 'clamp(0.7rem, 0.9vw, 0.9rem)',
      color: isMinecraft ? '#aaa' : '#888',
      marginTop: '2px',
    },
  }

  // Popup styles
  const popupStyle = {
    card: {
      fontFamily: "'Quicksand', sans-serif",
      maxWidth: '280px',
      padding: '5px',
    },
    title: {
      fontSize: '1rem',
      fontWeight: '700',
      marginBottom: '4px',
      color: '#333',
    },
    period: {
      fontSize: '0.7rem',
      fontWeight: '600',
      padding: '2px 8px',
      borderRadius: '10px',
      display: 'inline-block',
      marginBottom: '6px',
    },
    desc: {
      fontSize: '0.8rem',
      color: '#555',
      lineHeight: '1.4',
      marginBottom: '6px',
    },
    funFact: {
      fontSize: '0.75rem',
      color: '#E67E22',
      fontStyle: 'italic',
      padding: '6px 8px',
      background: 'rgba(230,126,34,0.08)',
      borderRadius: '8px',
      marginBottom: '8px',
    },
    quizSection: {
      borderTop: '1px solid #eee',
      paddingTop: '8px',
    },
    quizQ: {
      fontSize: '0.8rem',
      fontWeight: '700',
      color: '#333',
      marginBottom: '6px',
    },
    quizOption: (selected, correct) => ({
      display: 'block',
      width: '100%',
      padding: '6px 10px',
      margin: '3px 0',
      borderRadius: '8px',
      border: '1px solid #ddd',
      background: selected
        ? (correct ? '#d4edda' : '#f8d7da')
        : '#fff',
      color: selected
        ? (correct ? '#155724' : '#721c24')
        : '#333',
      fontSize: '0.75rem',
      fontWeight: '600',
      cursor: quizAnswer ? 'default' : 'pointer',
      textAlign: 'left',
      fontFamily: "'Quicksand', sans-serif",
    }),
    result: (correct) => ({
      textAlign: 'center',
      padding: '6px',
      borderRadius: '8px',
      marginTop: '6px',
      fontSize: '0.8rem',
      fontWeight: '700',
      color: correct ? '#27AE60' : '#E74C3C',
      background: correct ? 'rgba(46,204,113,0.1)' : 'rgba(231,76,60,0.1)',
    }),
  }

  const discoveredInMode = filteredPoints.filter(p => discoveredPoints.includes(p.id)).length
  const totalInMode = filteredPoints.length

  return (
    <div style={s.page}>
      <div style={s.container}>
        <div style={s.header}>
          <div style={s.title}>
            {isMinecraft ? '🗺️ Carte Interactive' : '🗺️ Carte Interactive'}
          </div>
          <button style={s.backBtn} onClick={onBack}>
            ← Retour
          </button>
        </div>

        {/* Mode toggle */}
        <div style={s.modeToggle}>
          <button
            style={s.modeBtn(mode === 'history')}
            onClick={() => { setMode('history'); setFilter('all'); resetQuiz() }}
          >
            🏛️ Histoire
          </button>
          <button
            style={s.modeBtn(mode === 'geography')}
            onClick={() => { setMode('geography'); setFilter('all'); resetQuiz() }}
          >
            🌍 Geographie
          </button>
        </div>

        {/* Category filters */}
        <div style={s.filters}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              style={s.filterBtn(filter === cat.id, cat.color)}
              onClick={() => { setFilter(cat.id); resetQuiz() }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Map */}
        <div style={s.mapWrapper}>
          <MapContainer
            center={[46.5, 2.5]}
            zoom={5}
            style={{ height: '100%', width: '100%' }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapBounds points={filteredPoints} />

            {filteredPoints.map((point) => {
              const isDiscovered = discoveredPoints.includes(point.id)
              return (
                <Marker
                  key={point.id}
                  position={[point.lat, point.lng]}
                  icon={createEmojiIcon(
                    isDiscovered ? '⭐' : point.icon,
                    point.color,
                    isDiscovered ? 32 : 36
                  )}
                  eventHandlers={{
                    click: () => {
                      setSelectedPoint(point)
                      resetQuiz()
                    },
                  }}
                >
                  <Popup maxWidth={300} onClose={() => { setSelectedPoint(null); resetQuiz() }}>
                    <div style={popupStyle.card}>
                      <div style={popupStyle.title}>{point.icon} {point.name}</div>
                      <span style={{
                        ...popupStyle.period,
                        background: `${point.color}22`,
                        color: point.color,
                      }}>
                        {mode === 'history' ? point.period : point.category}
                        {point.date ? ` • ${point.date}` : ''}
                      </span>
                      <div style={popupStyle.desc}>{point.description}</div>
                      <div style={popupStyle.funFact}>💡 {point.funFact}</div>

                      {/* Quiz */}
                      <div style={popupStyle.quizSection}>
                        <div style={popupStyle.quizQ}>🧠 {point.quiz.question}</div>
                        {point.quiz.options.map((opt) => (
                          <button
                            key={opt}
                            style={popupStyle.quizOption(
                              quizAnswer === opt || (quizResult !== null && opt === point.quiz.answer),
                              opt === point.quiz.answer
                            )}
                            onClick={() => !quizAnswer && handleQuizAnswer(point, opt)}
                          >
                            {quizAnswer && opt === point.quiz.answer ? '✓ ' : ''}{opt}
                          </button>
                        ))}
                        {quizResult !== null && (
                          <div style={popupStyle.result(quizResult)}>
                            {quizResult
                              ? (isDiscovered ? 'Deja decouvert ! Bravo !' : '+20 XP ! Lieu decouvert !')
                              : 'Pas tout a fait... Relis les infos et reessaie !'
                            }
                          </div>
                        )}
                        {quizResult === false && (
                          <button
                            onClick={resetQuiz}
                            style={{
                              display: 'block',
                              margin: '6px auto 0',
                              padding: '4px 12px',
                              borderRadius: '8px',
                              border: 'none',
                              background: '#9B59B6',
                              color: 'white',
                              fontSize: '0.7rem',
                              fontWeight: '700',
                              cursor: 'pointer',
                              fontFamily: "'Quicksand', sans-serif",
                            }}
                          >
                            Reessayer
                          </button>
                        )}
                      </div>

                      {isDiscovered && (
                        <div style={{
                          textAlign: 'center',
                          marginTop: '6px',
                          fontSize: '0.7rem',
                          color: '#27AE60',
                          fontWeight: '700',
                        }}>
                          ⭐ Lieu decouvert !
                        </div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              )
            })}
          </MapContainer>
        </div>

        {/* Stats */}
        <div style={s.stats}>
          <div style={s.statItem}>
            <div style={s.statValue}>{discoveredInMode}</div>
            <div style={s.statLabel}>Decouverts</div>
          </div>
          <div style={s.statItem}>
            <div style={s.statValue}>{totalInMode}</div>
            <div style={s.statLabel}>A explorer</div>
          </div>
          <div style={s.statItem}>
            <div style={s.statValue}>
              {totalInMode > 0 ? Math.round((discoveredInMode / totalInMode) * 100) : 0}%
            </div>
            <div style={s.statLabel}>Progression</div>
          </div>
        </div>
      </div>
    </div>
  )
}

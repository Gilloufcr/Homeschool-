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

  // Styles
  const s = {
    page: {
      minHeight: '100vh',
      background: isMinecraft
        ? 'linear-gradient(180deg, #87CEEB 0%, #4CAF50 100%)'
        : 'linear-gradient(135deg, #fff5f9 0%, #f0e6ff 50%, #e6f3ff 100%)',
      padding: '15px',
    },
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
      flexWrap: 'wrap',
      gap: '8px',
    },
    title: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: isMinecraft ? '0.7rem' : '1.3rem',
      fontWeight: '700',
      color: isMinecraft ? '#FFD700' : '#333',
      textShadow: isMinecraft ? '2px 2px 0 #000' : 'none',
    },
    backBtn: {
      padding: isMinecraft ? '8px 12px' : '8px 18px',
      borderRadius: '12px',
      border: isMinecraft ? '2px outset #777' : 'none',
      background: isMinecraft ? '#555' : 'rgba(155,89,182,0.1)',
      color: isMinecraft ? '#fff' : '#9B59B6',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: isMinecraft ? '0.5rem' : '0.85rem',
      fontWeight: '700',
      cursor: 'pointer',
    },
    modeToggle: {
      display: 'flex',
      gap: '5px',
      marginBottom: '12px',
    },
    modeBtn: (active) => ({
      flex: 1,
      padding: isMinecraft ? '10px' : '12px',
      borderRadius: '14px',
      border: isMinecraft
        ? `3px solid ${active ? '#FFD700' : '#555'}`
        : `2px solid ${active ? '#9B59B6' : 'rgba(155,89,182,0.15)'}`,
      background: active
        ? (isMinecraft ? 'rgba(255,215,0,0.15)' : 'rgba(155,89,182,0.1)')
        : (isMinecraft ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)'),
      color: active
        ? (isMinecraft ? '#FFD700' : '#9B59B6')
        : (isMinecraft ? '#aaa' : '#888'),
      fontFamily: "'Quicksand', sans-serif",
      fontSize: isMinecraft ? '0.5rem' : '0.9rem',
      fontWeight: '700',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.2s ease',
    }),
    filters: {
      display: 'flex',
      gap: '6px',
      marginBottom: '12px',
      flexWrap: 'wrap',
    },
    filterBtn: (active, color) => ({
      padding: isMinecraft ? '5px 8px' : '6px 14px',
      borderRadius: '20px',
      border: `2px solid ${active ? color : 'transparent'}`,
      background: active ? `${color}22` : (isMinecraft ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)'),
      color: active ? color : (isMinecraft ? '#aaa' : '#888'),
      fontFamily: "'Quicksand', sans-serif",
      fontSize: isMinecraft ? '0.35rem' : '0.75rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
    mapWrapper: {
      borderRadius: '20px',
      overflow: 'hidden',
      border: isMinecraft ? '4px solid #555' : '2px solid rgba(155,89,182,0.15)',
      boxShadow: isMinecraft ? 'none' : '0 4px 20px rgba(0,0,0,0.1)',
      height: '55vh',
      minHeight: '350px',
    },
    stats: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '12px',
      padding: '12px',
      borderRadius: '15px',
      background: isMinecraft ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.9)',
      border: isMinecraft ? '3px solid #555' : '2px solid rgba(155,89,182,0.1)',
    },
    statItem: {
      textAlign: 'center',
    },
    statValue: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: isMinecraft ? '0.8rem' : '1.3rem',
      fontWeight: '700',
      color: isMinecraft ? '#7CFC00' : '#9B59B6',
    },
    statLabel: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: isMinecraft ? '0.35rem' : '0.7rem',
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
            {isMinecraft ? '> CARTE INTERACTIVE' : 'Carte Interactive'}
          </div>
          <button style={s.backBtn} onClick={onBack}>
            {isMinecraft ? '< RETOUR' : 'Retour'}
          </button>
        </div>

        {/* Mode toggle */}
        <div style={s.modeToggle}>
          <button
            style={s.modeBtn(mode === 'history')}
            onClick={() => { setMode('history'); setFilter('all'); resetQuiz() }}
          >
            🏛️ {isMinecraft ? 'HISTOIRE' : 'Histoire'}
          </button>
          <button
            style={s.modeBtn(mode === 'geography')}
            onClick={() => { setMode('geography'); setFilter('all'); resetQuiz() }}
          >
            🌍 {isMinecraft ? 'GEOGRAPHIE' : 'Geographie'}
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
            <div style={s.statLabel}>{isMinecraft ? 'DECOUVERTS' : 'Decouverts'}</div>
          </div>
          <div style={s.statItem}>
            <div style={s.statValue}>{totalInMode}</div>
            <div style={s.statLabel}>{isMinecraft ? 'A EXPLORER' : 'A explorer'}</div>
          </div>
          <div style={s.statItem}>
            <div style={s.statValue}>
              {totalInMode > 0 ? Math.round((discoveredInMode / totalInMode) * 100) : 0}%
            </div>
            <div style={s.statLabel}>{isMinecraft ? 'PROGRES' : 'Progression'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

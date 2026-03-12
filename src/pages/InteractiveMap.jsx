import { useState, useEffect, useCallback, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import confetti from 'canvas-confetti'
import { recordExercise } from '../api'
import {
  historyMapPoints,
  geographyMapPoints,
  historicalPeriods,
  geographyCategories,
  franceRegions,
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

// Haversine distance in km
function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// Shuffle array (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Click handler for game mode
function GameClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng)
    },
  })
  return null
}

// Encouragement messages for wrong answers
const encouragements = [
  'Pas tout a fait, mais tu progresses !',
  'Presque ! Regarde bien la carte.',
  'Continue, tu vas y arriver !',
  'Bel essai ! La bonne position est ici.',
  'C\'est pas grave, on apprend en jouant !',
]

export default function InteractiveMap({ profile, progress, onComplete, onBack }) {
  const [mode, setMode] = useState('history') // 'history' or 'geography'
  const [gameMode, setGameMode] = useState('explorer') // 'explorer' or 'jouer'
  const [filter, setFilter] = useState('all')
  const [selectedPoint, setSelectedPoint] = useState(null)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizResult, setQuizResult] = useState(null)
  const [discoveredPoints, setDiscoveredPoints] = useState(() => {
    const saved = localStorage.getItem(`homeschool_map_${profile?.id || 'default'}`)
    return saved ? JSON.parse(saved) : []
  })

  // Game state
  const [gameRound, setGameRound] = useState([])
  const [gameIndex, setGameIndex] = useState(0)
  const [gameScore, setGameScore] = useState(0)
  const [gameTotal, setGameTotal] = useState(0)
  const [gameClickPos, setGameClickPos] = useState(null)
  const [gameAnswered, setGameAnswered] = useState(false)
  const [gameCorrect, setGameCorrect] = useState(null)
  const [gameFinished, setGameFinished] = useState(false)

  const isMinecraft = profile?.theme === 'minecraft'

  useEffect(() => {
    localStorage.setItem(`homeschool_map_${profile?.id || 'default'}`, JSON.stringify(discoveredPoints))
  }, [discoveredPoints, profile])

  const points = mode === 'history' ? historyMapPoints : geographyMapPoints
  const categories = mode === 'history' ? historicalPeriods : geographyCategories

  const filteredPoints = filter === 'all'
    ? points
    : points.filter(p => (mode === 'history' ? p.period : p.category) === filter)

  // Start a new game round
  const startGame = useCallback(() => {
    const pool = mode === 'geography' ? geographyMapPoints : historyMapPoints
    const count = Math.min(pool.length, Math.max(5, Math.min(10, pool.length)))
    const round = shuffle(pool).slice(0, count)
    setGameRound(round)
    setGameIndex(0)
    setGameScore(0)
    setGameTotal(0)
    setGameClickPos(null)
    setGameAnswered(false)
    setGameCorrect(null)
    setGameFinished(false)
  }, [mode])

  // When switching to game mode, start a round
  useEffect(() => {
    if (gameMode === 'jouer') {
      startGame()
    }
  }, [gameMode, startGame])

  const currentTarget = gameRound[gameIndex] || null
  const RADIUS_KM = 100

  const handleGameClick = (latlng) => {
    if (gameAnswered || gameFinished || !currentTarget) return

    const dist = distanceKm(latlng.lat, latlng.lng, currentTarget.lat, currentTarget.lng)
    const correct = dist <= RADIUS_KM
    setGameClickPos(latlng)
    setGameAnswered(true)
    setGameCorrect(correct)
    setGameTotal(prev => prev + 1)

    if (correct) {
      setGameScore(prev => prev + 1)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 },
        colors: isMinecraft
          ? ['#4CAF50', '#FFD700', '#8B4513']
          : ['#FF69B4', '#9B59B6', '#5DADE2', '#FFD700'],
      })

      // Record correct answer
      recordExercise({
        childId: profile?.id,
        exerciseId: `map-game-${currentTarget.id}`,
        subject: mode === 'history' ? 'history' : 'geography',
        grade: profile?.grade || '',
        question: `Trouve : ${currentTarget.name}`,
        givenAnswer: 'correct',
        correctAnswer: currentTarget.name,
        isCorrect: true,
        duration: 0,
        levelName: 'Carte interactive - Jeu',
      }).catch(() => {})
    }
  }

  const handleNextQuestion = () => {
    if (gameIndex + 1 >= gameRound.length) {
      setGameFinished(true)
      if (gameScore + (gameCorrect ? 0 : 0) >= gameRound.length * 0.7) {
        confetti({ particleCount: 200, spread: 120, origin: { y: 0.4 } })
      }
    } else {
      setGameIndex(prev => prev + 1)
      setGameClickPos(null)
      setGameAnswered(false)
      setGameCorrect(null)
    }
  }

  const handleQuizAnswer = (point, answer) => {
    setQuizAnswer(answer)
    const correct = answer === point.quiz.answer
    setQuizResult(correct)

    // Record to server
    recordExercise({
      childId: profile?.id,
      exerciseId: `map-${point.id}`,
      subject: mode === 'history' ? 'history' : 'geography',
      grade: profile?.grade || '',
      question: point.quiz.question,
      givenAnswer: String(answer),
      correctAnswer: String(point.quiz.answer),
      isCorrect: correct,
      duration: 0,
      levelName: 'Carte interactive',
    }).catch(() => {})

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
    gameModeToggle: {
      display: 'flex',
      gap: '8px',
      marginBottom: 'clamp(12px, 1.5vw, 20px)',
    },
    gameModeBtn: (active, color) => ({
      flex: 1,
      padding: 'clamp(8px, 1vw, 14px)',
      borderRadius: '14px',
      border: `2px solid ${active ? color : 'transparent'}`,
      background: active
        ? `${color}18`
        : (isMinecraft ? 'rgba(20,20,30,0.5)' : 'rgba(255,255,255,0.7)'),
      backdropFilter: 'blur(4px)',
      color: active ? color : (isMinecraft ? '#aaa' : '#888'),
      fontFamily: font,
      fontSize: 'clamp(0.85rem, 1vw, 1.05rem)',
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
    gamePrompt: {
      textAlign: 'center',
      padding: 'clamp(12px, 1.5vw, 20px)',
      marginBottom: 'clamp(8px, 1vw, 14px)',
      borderRadius: '16px',
      background: isMinecraft ? 'rgba(20,20,30,0.8)' : 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(8px)',
      border: isMinecraft ? '2px solid #FFD700' : '2px solid #9B59B6',
      boxShadow: isMinecraft ? '0 4px 16px rgba(255,215,0,0.2)' : '0 4px 16px rgba(155,89,182,0.15)',
    },
    gamePromptText: {
      fontFamily: font,
      fontSize: 'clamp(1.1rem, 1.5vw, 1.6rem)',
      fontWeight: '700',
      color: isMinecraft ? '#FFD700' : '#9B59B6',
    },
    gamePromptTarget: {
      fontFamily: font,
      fontSize: 'clamp(1.4rem, 2vw, 2.2rem)',
      fontWeight: '800',
      color: isMinecraft ? '#7CFC00' : '#E91E63',
      margin: '6px 0',
    },
    gameScoreBar: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      fontFamily: font,
      fontSize: 'clamp(0.85rem, 1vw, 1.1rem)',
      color: isMinecraft ? '#ddd' : '#666',
      fontWeight: '600',
    },
    gameResultOverlay: {
      textAlign: 'center',
      padding: 'clamp(16px, 2vw, 28px)',
      marginBottom: '10px',
      borderRadius: '16px',
      backdropFilter: 'blur(8px)',
    },
    newGameBtn: {
      padding: '12px 28px',
      borderRadius: '14px',
      border: 'none',
      background: isMinecraft
        ? 'linear-gradient(135deg, #4CAF50, #388E3C)'
        : 'linear-gradient(135deg, #9B59B6, #8E44AD)',
      color: '#fff',
      fontFamily: font,
      fontSize: 'clamp(0.95rem, 1.1vw, 1.2rem)',
      fontWeight: '700',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'all 0.2s ease',
    },
    nextBtn: {
      padding: '10px 24px',
      borderRadius: '12px',
      border: 'none',
      background: isMinecraft
        ? 'linear-gradient(135deg, #FFD700, #FFA000)'
        : 'linear-gradient(135deg, #5DADE2, #2E86C1)',
      color: '#fff',
      fontFamily: font,
      fontSize: 'clamp(0.9rem, 1vw, 1.1rem)',
      fontWeight: '700',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'all 0.2s ease',
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

  // Game finished screen
  const renderGameFinished = () => (
    <div style={{
      ...s.gameResultOverlay,
      background: isMinecraft ? 'rgba(20,20,30,0.85)' : 'rgba(255,255,255,0.95)',
      border: isMinecraft ? '2px solid #FFD700' : '2px solid #9B59B6',
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '8px' }}>
        {gameScore >= gameRound.length * 0.7 ? '🏆' : gameScore >= gameRound.length * 0.4 ? '👏' : '💪'}
      </div>
      <div style={{
        fontFamily: font,
        fontSize: 'clamp(1.3rem, 1.8vw, 2rem)',
        fontWeight: '800',
        color: isMinecraft ? '#FFD700' : '#9B59B6',
        marginBottom: '6px',
      }}>
        Partie terminee !
      </div>
      <div style={{
        fontFamily: font,
        fontSize: 'clamp(1rem, 1.3vw, 1.5rem)',
        fontWeight: '700',
        color: isMinecraft ? '#7CFC00' : '#27AE60',
        marginBottom: '4px',
      }}>
        Score : {gameScore} / {gameRound.length}
      </div>
      <div style={{
        fontFamily: font,
        fontSize: 'clamp(0.85rem, 1vw, 1.1rem)',
        color: isMinecraft ? '#ddd' : '#666',
        marginBottom: '12px',
      }}>
        {gameScore === gameRound.length
          ? 'Parfait ! Tu es un vrai geographe !'
          : gameScore >= gameRound.length * 0.7
            ? 'Tres bien ! Tu connais bien ta geographie !'
            : gameScore >= gameRound.length * 0.4
              ? 'Pas mal ! Continue a explorer la carte !'
              : 'Continue a apprendre, tu vas progresser !'}
      </div>
      <button style={s.newGameBtn} onClick={startGame}>
        Nouvelle partie
      </button>
    </div>
  )

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

        {/* Mode toggle: History / Geography */}
        <div style={s.modeToggle}>
          <button
            style={s.modeBtn(mode === 'history')}
            onClick={() => { setMode('history'); setFilter('all'); resetQuiz(); setGameMode('explorer') }}
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

        {/* Game mode toggle - only for geography */}
        {mode === 'geography' && (
          <div style={s.gameModeToggle}>
            <button
              style={s.gameModeBtn(gameMode === 'explorer', isMinecraft ? '#5DADE2' : '#3498DB')}
              onClick={() => setGameMode('explorer')}
            >
              🔍 Explorer
            </button>
            <button
              style={s.gameModeBtn(gameMode === 'jouer', isMinecraft ? '#E91E63' : '#E91E63')}
              onClick={() => setGameMode('jouer')}
            >
              🎮 Jouer
            </button>
          </div>
        )}

        {/* Game mode UI */}
        {gameMode === 'jouer' && mode === 'geography' && !gameFinished && currentTarget && (
          <div style={s.gamePrompt}>
            <div style={s.gameScoreBar}>
              <span>Question {gameIndex + 1} / {gameRound.length}</span>
              <span>|</span>
              <span style={{ color: isMinecraft ? '#7CFC00' : '#27AE60' }}>
                ✓ {gameScore}
              </span>
              <span style={{ color: isMinecraft ? '#FF6B6B' : '#E74C3C' }}>
                ✗ {gameTotal - gameScore}
              </span>
            </div>
            <div style={s.gamePromptText}>Trouve sur la carte :</div>
            <div style={s.gamePromptTarget}>{currentTarget.icon} {currentTarget.name}</div>
            {!gameAnswered && (
              <div style={{
                fontFamily: font,
                fontSize: 'clamp(0.75rem, 0.9vw, 0.95rem)',
                color: isMinecraft ? '#aaa' : '#999',
                fontStyle: 'italic',
              }}>
                Clique sur la carte pour repondre
              </div>
            )}
            {gameAnswered && (
              <div style={{
                marginTop: '10px',
                padding: '10px',
                borderRadius: '12px',
                background: gameCorrect
                  ? (isMinecraft ? 'rgba(76,175,80,0.2)' : 'rgba(46,204,113,0.12)')
                  : (isMinecraft ? 'rgba(231,76,60,0.15)' : 'rgba(231,76,60,0.08)'),
                border: gameCorrect
                  ? '1px solid rgba(46,204,113,0.3)'
                  : '1px solid rgba(231,76,60,0.2)',
              }}>
                <div style={{
                  fontFamily: font,
                  fontSize: 'clamp(1rem, 1.2vw, 1.3rem)',
                  fontWeight: '700',
                  color: gameCorrect
                    ? (isMinecraft ? '#7CFC00' : '#27AE60')
                    : (isMinecraft ? '#FF6B6B' : '#E74C3C'),
                  marginBottom: '4px',
                }}>
                  {gameCorrect ? '🎉 Bravo !' : '📍 ' + encouragements[Math.floor(Math.random() * encouragements.length)]}
                </div>
                {!gameCorrect && (
                  <div style={{
                    fontFamily: font,
                    fontSize: 'clamp(0.8rem, 0.95vw, 1rem)',
                    color: isMinecraft ? '#ddd' : '#555',
                  }}>
                    {currentTarget.name} se trouve a {Math.round(distanceKm(
                      gameClickPos.lat, gameClickPos.lng, currentTarget.lat, currentTarget.lng
                    ))} km de ton clic.
                  </div>
                )}
                <button style={s.nextBtn} onClick={handleNextQuestion}>
                  {gameIndex + 1 >= gameRound.length ? 'Voir le resultat' : 'Question suivante →'}
                </button>
              </div>
            )}
          </div>
        )}

        {gameMode === 'jouer' && mode === 'geography' && gameFinished && renderGameFinished()}

        {/* Category filters (explorer mode only) */}
        {gameMode === 'explorer' && (
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
        )}

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

            {/* Explorer mode */}
            {gameMode === 'explorer' && (
              <>
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
                                  ? (discoveredPoints.includes(point.id) ? 'Deja decouvert ! Bravo !' : '+20 XP ! Lieu decouvert !')
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

                          {discoveredPoints.includes(point.id) && (
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
              </>
            )}

            {/* Game mode */}
            {gameMode === 'jouer' && mode === 'geography' && !gameFinished && (
              <>
                <GameClickHandler onMapClick={handleGameClick} />

                {/* Show click position */}
                {gameClickPos && (
                  <Marker
                    position={[gameClickPos.lat, gameClickPos.lng]}
                    icon={createEmojiIcon('📍', '#E74C3C', 30)}
                  />
                )}

                {/* Show correct answer feedback */}
                {gameAnswered && gameCorrect && currentTarget && (
                  <Circle
                    center={[currentTarget.lat, currentTarget.lng]}
                    radius={RADIUS_KM * 1000}
                    pathOptions={{
                      color: '#27AE60',
                      fillColor: '#27AE60',
                      fillOpacity: 0.15,
                      weight: 2,
                    }}
                  />
                )}

                {/* Show correct location + line on wrong answer */}
                {gameAnswered && !gameCorrect && currentTarget && gameClickPos && (
                  <>
                    <Marker
                      position={[currentTarget.lat, currentTarget.lng]}
                      icon={createEmojiIcon(currentTarget.icon, currentTarget.color, 36)}
                    />
                    <Circle
                      center={[currentTarget.lat, currentTarget.lng]}
                      radius={RADIUS_KM * 1000}
                      pathOptions={{
                        color: '#E74C3C',
                        fillColor: '#E74C3C',
                        fillOpacity: 0.08,
                        weight: 1,
                        dashArray: '6 4',
                      }}
                    />
                    <Polyline
                      positions={[
                        [gameClickPos.lat, gameClickPos.lng],
                        [currentTarget.lat, currentTarget.lng],
                      ]}
                      pathOptions={{
                        color: '#E74C3C',
                        weight: 2,
                        dashArray: '8 6',
                        opacity: 0.7,
                      }}
                    />
                  </>
                )}
              </>
            )}
          </MapContainer>
        </div>

        {/* Stats - Explorer mode */}
        {gameMode === 'explorer' && (
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
        )}

        {/* Stats - Game mode */}
        {gameMode === 'jouer' && mode === 'geography' && !gameFinished && (
          <div style={s.stats}>
            <div style={s.statItem}>
              <div style={s.statValue}>{gameScore}</div>
              <div style={s.statLabel}>Correct</div>
            </div>
            <div style={s.statItem}>
              <div style={s.statValue}>{gameTotal}</div>
              <div style={s.statLabel}>Tentatives</div>
            </div>
            <div style={s.statItem}>
              <div style={s.statValue}>
                {gameTotal > 0 ? Math.round((gameScore / gameTotal) * 100) : 0}%
              </div>
              <div style={s.statLabel}>Precision</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

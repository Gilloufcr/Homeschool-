import { useState, useEffect } from 'react'
import LoginScreen from './components/LoginScreen'
import Dashboard from './pages/Dashboard'
import SubjectPage from './pages/SubjectPage'
import InteractiveMap from './pages/InteractiveMap'
import ParentDashboard from './pages/ParentDashboard'
import { mathLevels } from './data/mathExercises'
import { frenchLevels } from './data/frenchExercises'
import { historyLevels } from './data/historyExercises'
import { geographyLevels } from './data/geographyExercises'
import { scienceLevels } from './data/scienceExercises'
import { englishLevels } from './data/englishExercises'
import { useProgress } from './hooks/useProgress'
import { parentLogin, getLessons } from './api'
import './App.css'

const BUILTIN_LEVELS = {
  math: mathLevels,
  french: frenchLevels,
  history: historyLevels,
  geography: geographyLevels,
  science: scienceLevels,
  english: englishLevels,
}

function App() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('homeschool_profile')
    return saved ? JSON.parse(saved) : null
  })
  const [isParent, setIsParent] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [customLessons, setCustomLessons] = useState([])
  const [showBadges, setShowBadges] = useState(() => {
    return localStorage.getItem('homeschool_show_badges') === 'true'
  })

  const { progress, addXP, completeExercise, updateStreak, isCompleted } = useProgress(
    profile?.id || 'default'
  )

  // Load custom AI-generated lessons from server
  useEffect(() => {
    loadCustomLessons()
  }, [])

  const loadCustomLessons = async () => {
    try {
      const lessons = await getLessons()
      setCustomLessons(lessons)
    } catch {
      // Server not running — only built-in lessons available
    }
  }

  useEffect(() => {
    if (profile) {
      localStorage.setItem('homeschool_profile', JSON.stringify(profile))
      updateStreak()
    }
  }, [profile])

  useEffect(() => {
    localStorage.setItem('homeschool_show_badges', showBadges)
  }, [showBadges])

  const handleSelectChild = (child) => {
    setProfile(child)
    setCurrentPage('dashboard')
  }

  const handleParentLogin = async (pin) => {
    await parentLogin(pin)
    setIsParent(true)
  }

  const handleLogout = () => {
    setProfile(null)
    setIsParent(false)
    localStorage.removeItem('homeschool_profile')
    setCurrentPage('dashboard')
  }

  const handleExerciseComplete = (exerciseId, xp, subject) => {
    if (!isCompleted(exerciseId)) {
      addXP(xp)
      completeExercise(exerciseId, subject)
    }
  }

  // Merge built-in levels + custom AI-generated lessons for a subject
  const getLevelsForSubject = (subject) => {
    const builtin = BUILTIN_LEVELS[subject] || []
    const custom = customLessons.filter(l => l.subject === subject)
    return [...builtin, ...custom]
  }

  // Not logged in — show login / child selection screen
  if (!profile && !isParent) {
    return (
      <LoginScreen
        onSelectChild={handleSelectChild}
        onParentLogin={handleParentLogin}
      />
    )
  }

  // Parent dashboard
  if (isParent) {
    return (
      <ParentDashboard
        onLogout={() => { setIsParent(false) }}
      />
    )
  }

  // Interactive map
  if (currentPage === 'map') {
    return (
      <InteractiveMap
        profile={profile}
        progress={progress}
        onComplete={handleExerciseComplete}
        onBack={() => setCurrentPage('dashboard')}
      />
    )
  }

  // Subject pages
  const subjects = ['math', 'french', 'history', 'geography', 'science', 'english']
  if (subjects.includes(currentPage)) {
    return (
      <SubjectPage
        profile={profile}
        subject={currentPage}
        levels={getLevelsForSubject(currentPage)}
        progress={progress}
        onComplete={handleExerciseComplete}
        onBack={() => setCurrentPage('dashboard')}
      />
    )
  }

  // Main dashboard
  return (
    <Dashboard
      profile={profile}
      progress={progress}
      showBadges={showBadges}
      onToggleBadges={() => setShowBadges(!showBadges)}
      onNavigate={setCurrentPage}
      onLogout={handleLogout}
    />
  )
}

export default App

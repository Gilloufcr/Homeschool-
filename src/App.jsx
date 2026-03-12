import { useState, useEffect } from 'react'
import AuthPage from './components/AuthPage'
import ParentDashboard from './pages/ParentDashboard'
import Dashboard from './pages/Dashboard'
import SubjectPage from './pages/SubjectPage'
import InteractiveMap from './pages/InteractiveMap'
import SettingsPage from './pages/SettingsPage'
import { mathLevels } from './data/mathExercises'
import { frenchLevels } from './data/frenchExercises'
import { historyLevels } from './data/historyExercises'
import { geographyLevels } from './data/geographyExercises'
import { scienceLevels } from './data/scienceExercises'
import { englishLevels } from './data/englishExercises'
import { emcLevels } from './data/emcExercises'
import { useProgress } from './hooks/useProgress'
import { isLoggedIn, getSavedFamily, authLogout, getLessons } from './api'
import { lessons as lessonContent } from './data/lessons'
import './App.css'

function attachLessons(levels) {
  return levels.map(level => ({
    ...level,
    lesson: lessonContent[level.id] || null,
  }))
}

const BUILTIN_LEVELS = {
  math: attachLessons(mathLevels),
  french: attachLessons(frenchLevels),
  history: attachLessons(historyLevels),
  geography: attachLessons(geographyLevels),
  science: attachLessons(scienceLevels),
  english: attachLessons(englishLevels),
  emc: attachLessons(emcLevels),
}

function App() {
  const [authenticated, setAuthenticated] = useState(isLoggedIn())
  const [family, setFamily] = useState(getSavedFamily())
  const [selectedChild, setSelectedChild] = useState(null)
  const [currentPage, setCurrentPage] = useState('parent-dashboard')
  const [customLessons, setCustomLessons] = useState([])
  const [showBadges, setShowBadges] = useState(() => {
    return localStorage.getItem('homeschool_show_badges') === 'true'
  })

  const { progress, addXP, completeExercise, updateStreak, isCompleted } = useProgress(
    selectedChild?.id || 'default'
  )

  // Load custom lessons when authenticated
  useEffect(() => {
    if (authenticated) {
      loadCustomLessons()
    }
  }, [authenticated])

  const loadCustomLessons = async () => {
    try {
      const lessons = await getLessons()
      setCustomLessons(lessons)
    } catch {
      // Token might be expired
    }
  }

  useEffect(() => {
    if (selectedChild) {
      updateStreak()
    }
  }, [selectedChild])

  useEffect(() => {
    localStorage.setItem('homeschool_show_badges', showBadges)
  }, [showBadges])

  const handleAuth = (familyData) => {
    setAuthenticated(true)
    setFamily(familyData)
    setCurrentPage('parent-dashboard')
  }

  const handleLogout = () => {
    authLogout()
    setAuthenticated(false)
    setFamily(null)
    setSelectedChild(null)
    setCurrentPage('parent-dashboard')
  }

  const handleSelectChild = (child) => {
    setSelectedChild(child)
    setCurrentPage('child-dashboard')
  }

  const handleBackToParent = () => {
    setSelectedChild(null)
    setCurrentPage('parent-dashboard')
  }

  const handleExerciseComplete = (exerciseId, xp, subject) => {
    if (!isCompleted(exerciseId)) {
      addXP(xp)
      completeExercise(exerciseId, subject)
    }
  }

  const getLevelsForSubject = (subject) => {
    const grade = selectedChild?.grade || 'CM2'
    const builtin = (BUILTIN_LEVELS[subject] || []).filter(l => l.grade === grade)
    const custom = customLessons.filter(l => l.subject === subject)
    return [...builtin, ...custom]
  }

  // Not authenticated -> show auth page
  if (!authenticated) {
    return <AuthPage onAuth={handleAuth} />
  }

  // Settings page
  if (currentPage === 'settings') {
    return (
      <SettingsPage
        family={family}
        onBack={() => setCurrentPage('parent-dashboard')}
        onLogout={handleLogout}
        onFamilyUpdate={(updated) => setFamily(prev => ({ ...prev, ...updated }))}
      />
    )
  }

  // Parent dashboard (children cards + navigation)
  if (!selectedChild || currentPage === 'parent-dashboard') {
    return (
      <ParentDashboard
        family={family}
        onSelectChild={handleSelectChild}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
        onLessonsUpdate={loadCustomLessons}
        customLessons={customLessons}
      />
    )
  }

  // Interactive map for child
  if (currentPage === 'map') {
    return (
      <InteractiveMap
        profile={selectedChild}
        progress={progress}
        onComplete={handleExerciseComplete}
        onBack={() => setCurrentPage('child-dashboard')}
      />
    )
  }

  // Subject pages for child
  const subjects = ['math', 'french', 'history', 'geography', 'science', 'english', 'emc']
  if (subjects.includes(currentPage)) {
    return (
      <SubjectPage
        profile={selectedChild}
        subject={currentPage}
        levels={getLevelsForSubject(currentPage)}
        progress={progress}
        onComplete={handleExerciseComplete}
        onBack={() => setCurrentPage('child-dashboard')}
        onOpenMap={currentPage === 'geography' ? () => setCurrentPage('map') : undefined}
      />
    )
  }

  // Child dashboard
  return (
    <Dashboard
      profile={selectedChild}
      progress={progress}
      showBadges={showBadges}
      onToggleBadges={() => setShowBadges(!showBadges)}
      onNavigate={setCurrentPage}
      onLogout={handleBackToParent}
    />
  )
}

export default App

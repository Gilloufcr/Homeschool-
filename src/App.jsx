import { useState, useEffect, lazy, Suspense } from 'react'
import AuthPage from './components/AuthPage'
import Dashboard from './pages/Dashboard'
import LevelUpOverlay from './components/LevelUpOverlay'

const ParentDashboard = lazy(() => import('./pages/ParentDashboard'))
const SubjectPage = lazy(() => import('./pages/SubjectPage'))
const InteractiveMap = lazy(() => import('./pages/InteractiveMap'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))
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

  const [showLevelUp, setShowLevelUp] = useState(false)
  const [newLevel, setNewLevel] = useState(1)

  const { progress, addXP, completeExercise, updateStreak, addMedal, isCompleted } = useProgress(
    selectedChild?.id || 'default'
  )

  // Detect level-up from progress hook
  useEffect(() => {
    if (progress._leveledUp) {
      setNewLevel(progress.level)
      setShowLevelUp(true)
    }
  }, [progress.level])

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
      // Increment daily goal counter
      const childId = selectedChild?.id || 'default'
      const todayKey = `homeschool_today_${childId}_${new Date().toDateString()}`
      const current = parseInt(localStorage.getItem(todayKey) || '0')
      localStorage.setItem(todayKey, String(current + 1))
    }
  }

  const getLevelsForSubject = (subject) => {
    const grade = selectedChild?.grade || 'CM2'
    const builtin = (BUILTIN_LEVELS[subject] || []).filter(l => l.grade === grade)
    const custom = customLessons.filter(l => l.subject === subject)
    return [...builtin, ...custom]
  }

  // Not authenticated -> show auth page (no lazy needed)
  if (!authenticated) {
    return <AuthPage onAuth={handleAuth} />
  }

  const suspenseFallback = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: "'Quicksand', sans-serif", fontSize: '1.2rem', color: '#9B59B6' }}>
      Chargement...
    </div>
  )

  const levelUpOverlay = showLevelUp && selectedChild ? (
    <LevelUpOverlay
      level={newLevel}
      theme={selectedChild.theme || 'default'}
      reduceAnimations={selectedChild.accessibility?.reduceAnimations || false}
      onDismiss={() => setShowLevelUp(false)}
    />
  ) : null

  // Settings page
  if (currentPage === 'settings') {
    return (
      <Suspense fallback={suspenseFallback}>
        <SettingsPage
          family={family}
          onBack={() => setCurrentPage('parent-dashboard')}
          onLogout={handleLogout}
          onFamilyUpdate={(updated) => setFamily(prev => ({ ...prev, ...updated }))}
        />
      </Suspense>
    )
  }

  // Parent dashboard (children cards + navigation)
  if (!selectedChild || currentPage === 'parent-dashboard') {
    return (
      <Suspense fallback={suspenseFallback}>
        <ParentDashboard
          family={family}
          onSelectChild={handleSelectChild}
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
          onLessonsUpdate={loadCustomLessons}
          customLessons={customLessons}
        />
      </Suspense>
    )
  }

  // Interactive map for child
  if (currentPage === 'map') {
    return (
      <>
        {levelUpOverlay}
        <Suspense fallback={suspenseFallback}>
          <InteractiveMap
            profile={selectedChild}
            progress={progress}
            onComplete={handleExerciseComplete}
            onBack={() => setCurrentPage('child-dashboard')}
          />
        </Suspense>
      </>
    )
  }

  // Subject pages for child
  const subjects = ['math', 'french', 'history', 'geography', 'science', 'english', 'emc']
  if (subjects.includes(currentPage)) {
    return (
      <>
        {levelUpOverlay}
        <Suspense fallback={suspenseFallback}>
          <SubjectPage
            profile={selectedChild}
            subject={currentPage}
            levels={getLevelsForSubject(currentPage)}
            progress={progress}
            onComplete={handleExerciseComplete}
            onAddMedal={addMedal}
            onBack={() => setCurrentPage('child-dashboard')}
            onOpenMap={currentPage === 'geography' ? () => setCurrentPage('map') : undefined}
          />
        </Suspense>
      </>
    )
  }

  // Child dashboard (not lazy, loads fast)
  return (
    <>
      {levelUpOverlay}
      <Dashboard
        profile={selectedChild}
        progress={progress}
        showBadges={showBadges}
        onToggleBadges={() => setShowBadges(!showBadges)}
        onNavigate={setCurrentPage}
        onLogout={handleBackToParent}
        family={family}
      />
    </>
  )
}

export default App

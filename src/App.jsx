import { useState, useEffect } from 'react'
import ProfileSelector from './components/ProfileSelector'
import Dashboard from './pages/Dashboard'
import SubjectPage from './pages/SubjectPage'
import { mathLevels } from './data/mathExercises'
import { frenchLevels } from './data/frenchExercises'
import { useProgress } from './hooks/useProgress'
import './App.css'

function App() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('homeschool_profile')
    return saved ? JSON.parse(saved) : null
  })
  const [currentPage, setCurrentPage] = useState('dashboard')

  const { progress, addXP, completeExercise, updateStreak, isCompleted } = useProgress(
    profile?.id || 'default'
  )

  useEffect(() => {
    if (profile) {
      localStorage.setItem('homeschool_profile', JSON.stringify(profile))
      updateStreak()
    }
  }, [profile])

  const handleSelectProfile = (p) => {
    setProfile(p)
    setCurrentPage('dashboard')
  }

  const handleLogout = () => {
    setProfile(null)
    localStorage.removeItem('homeschool_profile')
    setCurrentPage('dashboard')
  }

  const handleExerciseComplete = (exerciseId, xp, subject) => {
    if (!isCompleted(exerciseId)) {
      addXP(xp)
      completeExercise(exerciseId, subject)
    }
  }

  if (!profile) {
    return <ProfileSelector onSelectProfile={handleSelectProfile} />
  }

  if (currentPage === 'math') {
    return (
      <SubjectPage
        profile={profile}
        subject="math"
        levels={mathLevels}
        progress={progress}
        onComplete={handleExerciseComplete}
        onBack={() => setCurrentPage('dashboard')}
      />
    )
  }

  if (currentPage === 'french') {
    return (
      <SubjectPage
        profile={profile}
        subject="french"
        levels={frenchLevels}
        progress={progress}
        onComplete={handleExerciseComplete}
        onBack={() => setCurrentPage('dashboard')}
      />
    )
  }

  return (
    <Dashboard
      profile={profile}
      progress={progress}
      onNavigate={setCurrentPage}
      onLogout={handleLogout}
    />
  )
}

export default App

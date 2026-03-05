import { useState } from 'react'
import LevelMap from '../components/LevelMap'
import LessonView from '../components/LessonView'
import ExerciseCard from '../components/ExerciseCard'
import XPBar from '../components/XPBar'
import LanguageResources from '../components/LanguageResources'

const SubjectPage = ({ profile, subject, levels, progress, onComplete, onBack }) => {
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [showLesson, setShowLesson] = useState(false)
  const [currentExIdx, setCurrentExIdx] = useState(0)

  const isMinecraft = profile.theme === 'minecraft'

  const handleSelectLevel = (level) => {
    setSelectedLevel(level)
    setCurrentExIdx(0)
    setShowLesson(!!level.lesson)
  }

  const handleExerciseComplete = (exerciseId, xp) => {
    onComplete(exerciseId, xp, subject)
    setTimeout(() => {
      if (selectedLevel && currentExIdx < selectedLevel.exercises.length - 1) {
        setCurrentExIdx(prev => prev + 1)
      }
    }, 1500)
  }

  const pageStyle = {
    minHeight: '100vh',
    padding: '20px',
    background: isMinecraft
      ? 'linear-gradient(180deg, #87CEEB 0%, #4CAF50 100%)'
      : 'linear-gradient(135deg, #fff5f9 0%, #f0e6ff 50%, #e6f3ff 100%)',
  }

  const backBtnStyle = {
    padding: isMinecraft ? '8px 14px' : '10px 20px',
    borderRadius: isMinecraft ? '0' : '12px',
    border: isMinecraft ? '2px outset #777' : 'none',
    background: isMinecraft ? '#555' : 'rgba(155,89,182,0.1)',
    color: isMinecraft ? '#fff' : '#9B59B6',
    fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
    fontSize: isMinecraft ? '0.55rem' : '0.9rem',
    fontWeight: '700',
    cursor: 'pointer',
    marginBottom: '15px',
  }

  const titleStyle = {
    fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
    fontSize: isMinecraft ? '0.85rem' : '1.5rem',
    fontWeight: '700',
    color: isMinecraft ? '#FFD700' : '#333',
    textAlign: 'center',
    marginBottom: '20px',
    textShadow: isMinecraft ? '2px 2px 0 #000' : 'none',
  }

  const subjectNames = {
    math: isMinecraft ? 'MATHEMATIQUES' : 'Mathematiques',
    french: isMinecraft ? 'FRANCAIS' : 'Francais',
    history: isMinecraft ? 'HISTOIRE' : 'Histoire',
    geography: isMinecraft ? 'GEOGRAPHIE' : 'Geographie',
    science: isMinecraft ? 'SCIENCES' : 'Sciences',
    english: isMinecraft ? 'ANGLAIS' : 'Anglais',
  }

  // Lesson view (before exercises)
  if (selectedLevel && showLesson && selectedLevel.lesson) {
    const levelName = isMinecraft ? selectedLevel.nameMinecraft : selectedLevel.nameLalilo

    return (
      <div style={pageStyle}>
        <div className="exercise-area">
          <button
            style={backBtnStyle}
            onClick={() => { setSelectedLevel(null); setShowLesson(false); setCurrentExIdx(0) }}
          >
            {isMinecraft ? '< RETOUR' : 'Retour aux niveaux'}
          </button>

          <div style={{ ...titleStyle, marginTop: '15px' }}>
            {isMinecraft ? `> ${levelName}` : levelName}
          </div>

          <LessonView
            lesson={selectedLevel.lesson}
            theme={profile.theme}
            onStartExercises={() => setShowLesson(false)}
          />
        </div>
      </div>
    )
  }

  // Exercise view
  if (selectedLevel) {
    const exercise = selectedLevel.exercises[currentExIdx]
    const levelName = isMinecraft ? selectedLevel.nameMinecraft : selectedLevel.nameLalilo

    return (
      <div style={pageStyle}>
        <div className="exercise-area">
          <div style={{ display: 'flex', gap: '8px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <button
              style={backBtnStyle}
              onClick={() => { setSelectedLevel(null); setShowLesson(false); setCurrentExIdx(0) }}
            >
              {isMinecraft ? '< NIVEAUX' : 'Retour aux niveaux'}
            </button>
            {selectedLevel.lesson && (
              <button
                style={{
                  ...backBtnStyle,
                  background: isMinecraft ? '#4CAF50' : 'rgba(46,204,113,0.1)',
                  color: isMinecraft ? '#fff' : '#27AE60',
                  border: isMinecraft ? '2px outset #4CAF50' : 'none',
                }}
                onClick={() => setShowLesson(true)}
              >
                {isMinecraft ? '< LECON' : 'Revoir la lecon'}
              </button>
            )}
          </div>

          <XPBar xp={progress.xp} level={progress.level} theme={profile.theme} />

          <div style={{ ...titleStyle, marginTop: '15px' }}>
            {isMinecraft ? `> ${levelName}` : levelName}
          </div>

          {/* Exercise navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}>
            {selectedLevel.exercises.map((ex, idx) => {
              const done = progress.completedExercises.includes(ex.id)
              return (
                <button
                  key={ex.id}
                  onClick={() => setCurrentExIdx(idx)}
                  style={{
                    width: isMinecraft ? '32px' : '36px',
                    height: isMinecraft ? '32px' : '36px',
                    borderRadius: isMinecraft ? '0' : '50%',
                    border: idx === currentExIdx
                      ? (isMinecraft ? '2px solid #FFD700' : '2px solid #9B59B6')
                      : (isMinecraft ? '2px solid #555' : '2px solid #ddd'),
                    background: done
                      ? (isMinecraft ? '#4CAF50' : '#2ECC71')
                      : idx === currentExIdx
                        ? (isMinecraft ? '#FFD700' : '#9B59B6')
                        : (isMinecraft ? '#333' : '#fff'),
                    color: (done || idx === currentExIdx) ? '#fff' : (isMinecraft ? '#aaa' : '#666'),
                    fontFamily: isMinecraft ? "'Press Start 2P', monospace" : "'Quicksand', sans-serif",
                    fontSize: isMinecraft ? '0.5rem' : '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {done ? '✓' : idx + 1}
                </button>
              )
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              theme={profile.theme}
              onComplete={handleExerciseComplete}
              isCompleted={progress.completedExercises.includes(exercise.id)}
            />
          </div>

          {(subject === 'english' || subject === 'french') && (
            <LanguageResources
              subject={subject}
              levelId={selectedLevel.id}
              theme={profile.theme}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={pageStyle}>
      <div className="app-container">
        <button style={backBtnStyle} onClick={onBack}>
          {isMinecraft ? '< RETOUR' : 'Retour au menu'}
        </button>

        <XPBar xp={progress.xp} level={progress.level} theme={profile.theme} />

        <div style={{ ...titleStyle, marginTop: '15px' }}>
          {isMinecraft ? `> ${subjectNames[subject]}` : subjectNames[subject]}
        </div>

        <div className="level-map-wrapper">
          <LevelMap
            levels={levels}
            theme={profile.theme}
            playerLevel={progress.level}
            completedExercises={progress.completedExercises}
            onSelectLevel={handleSelectLevel}
          />
        </div>
      </div>
    </div>
  )
}

export default SubjectPage

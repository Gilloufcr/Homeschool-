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
  const font = "'Quicksand', sans-serif"

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
    padding: 'clamp(16px, 2.5vw, 40px)',
    position: 'relative',
    overflow: 'hidden',
  }

  const bgStyle = isMinecraft ? {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0,
    background: `linear-gradient(180deg,
      #4A90D9 0%, #87CEEB 20%, #87CEEB 35%,
      #6AAF50 50%, #5B8C3E 60%,
      #8B6914 75%, #6B4F1A 85%, #606060 100%)`,
  } : {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0,
    background: `linear-gradient(180deg,
      #E8D5F5 0%, #F0E6FF 25%, #E6F3FF 50%,
      #D4F5D4 75%, #C8F0C8 100%)`,
  }

  const backBtnStyle = {
    padding: 'clamp(10px, 1.2vw, 16px) clamp(18px, 2vw, 32px)',
    borderRadius: '12px',
    border: isMinecraft ? '1px solid rgba(255,255,255,0.1)' : 'none',
    background: isMinecraft ? 'rgba(0,0,0,0.4)' : 'rgba(155,89,182,0.1)',
    color: isMinecraft ? 'rgba(255,255,255,0.85)' : '#9B59B6',
    fontFamily: font,
    fontSize: 'clamp(0.9rem, 1.1vw, 1.3rem)',
    fontWeight: '700',
    cursor: 'pointer',
    marginBottom: 'clamp(12px, 1.5vw, 24px)',
    backdropFilter: 'blur(4px)',
  }

  const titleStyle = {
    fontFamily: font,
    fontSize: 'clamp(1.3rem, 1.8vw, 2.3rem)',
    fontWeight: '800',
    color: isMinecraft ? '#FFD700' : '#333',
    textAlign: 'center',
    marginBottom: 'clamp(16px, 2vw, 30px)',
    textShadow: isMinecraft ? '0 2px 8px rgba(0,0,0,0.5)' : 'none',
  }

  const subjectNames = {
    math: 'Mathematiques',
    french: 'Francais',
    history: 'Histoire',
    geography: 'Geographie',
    science: 'Sciences',
    english: 'Anglais',
  }

  // Lesson view
  if (selectedLevel && showLesson && selectedLevel.lesson) {
    const levelName = isMinecraft ? selectedLevel.nameMinecraft : selectedLevel.nameLalilo
    return (
      <div style={pageStyle}>
        <div style={bgStyle} />
        <div className="exercise-area" style={{ position: 'relative', zIndex: 1 }}>
          <button style={backBtnStyle}
            onClick={() => { setSelectedLevel(null); setShowLesson(false); setCurrentExIdx(0) }}>
            Retour aux niveaux
          </button>
          <div style={{ ...titleStyle, marginTop: '15px' }}>{levelName}</div>
          <LessonView lesson={selectedLevel.lesson} theme={profile.theme}
            onStartExercises={() => setShowLesson(false)} />
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
        <div style={bgStyle} />
        <div className="exercise-area" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: 'clamp(12px, 1.5vw, 24px)', flexWrap: 'wrap' }}>
            <button style={backBtnStyle}
              onClick={() => { setSelectedLevel(null); setShowLesson(false); setCurrentExIdx(0) }}>
              Retour aux niveaux
            </button>
            {selectedLevel.lesson && (
              <button style={{
                ...backBtnStyle,
                background: isMinecraft ? 'rgba(76,175,80,0.3)' : 'rgba(46,204,113,0.1)',
                color: isMinecraft ? '#7CFC00' : '#27AE60',
                border: isMinecraft ? '1px solid rgba(76,175,80,0.3)' : 'none',
              }} onClick={() => setShowLesson(true)}>
                Revoir la lecon
              </button>
            )}
          </div>

          <XPBar xp={progress.xp} level={progress.level} theme={profile.theme} />
          <div style={{ ...titleStyle, marginTop: '15px' }}>{levelName}</div>

          {/* Exercise nav dots */}
          <div style={{
            display: 'flex', justifyContent: 'center',
            gap: 'clamp(6px, 0.8vw, 12px)',
            marginBottom: 'clamp(16px, 2vw, 30px)', flexWrap: 'wrap',
          }}>
            {selectedLevel.exercises.map((ex, idx) => {
              const done = progress.completedExercises.includes(ex.id)
              return (
                <button key={ex.id} onClick={() => setCurrentExIdx(idx)}
                  style={{
                    width: 'clamp(36px, 4vw, 52px)', height: 'clamp(36px, 4vw, 52px)',
                    borderRadius: '50%',
                    border: idx === currentExIdx
                      ? (isMinecraft ? '2px solid #FFD700' : '2px solid #9B59B6')
                      : (isMinecraft ? '2px solid rgba(255,255,255,0.15)' : '2px solid #ddd'),
                    background: done
                      ? (isMinecraft ? '#4CAF50' : '#2ECC71')
                      : idx === currentExIdx
                        ? (isMinecraft ? '#FFD700' : '#9B59B6')
                        : (isMinecraft ? 'rgba(0,0,0,0.5)' : '#fff'),
                    color: (done || idx === currentExIdx) ? '#fff' : (isMinecraft ? 'rgba(255,255,255,0.7)' : '#666'),
                    fontFamily: font, fontSize: 'clamp(0.8rem, 1vw, 1.2rem)',
                    fontWeight: '700', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isMinecraft ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
                    backdropFilter: 'blur(4px)',
                  }}>
                  {done ? '✓' : idx + 1}
                </button>
              )
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ExerciseCard key={exercise.id} exercise={exercise} theme={profile.theme}
              onComplete={handleExerciseComplete}
              isCompleted={progress.completedExercises.includes(exercise.id)} />
          </div>

          {(subject === 'english' || subject === 'french') && (
            <LanguageResources subject={subject} levelId={selectedLevel.id} theme={profile.theme} />
          )}
        </div>
      </div>
    )
  }

  // Map view
  return (
    <div style={pageStyle}>
      <div style={bgStyle} />
      <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
        <button style={backBtnStyle} onClick={onBack}>
          Retour au menu
        </button>

        <XPBar xp={progress.xp} level={progress.level} theme={profile.theme} />

        <div style={{ ...titleStyle, marginTop: '15px' }}>
          {subjectNames[subject]}
        </div>

        <div className="level-map-wrapper">
          <LevelMap levels={levels} theme={profile.theme} playerLevel={progress.level}
            completedExercises={progress.completedExercises} onSelectLevel={handleSelectLevel} />
        </div>
      </div>
    </div>
  )
}

export default SubjectPage

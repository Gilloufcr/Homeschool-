import { useState, useMemo } from 'react'
import LevelMap from '../components/LevelMap'
import LessonView from '../components/LessonView'
import ExerciseCard from '../components/ExerciseCard'
import XPBar from '../components/XPBar'
import LanguageResources from '../components/LanguageResources'
import VideoResources from '../components/VideoResources'
import Timeline from '../components/Timeline'
import { timelineData } from '../data/timelineData'

const SubjectPage = ({ profile, subject, levels, progress, onComplete, onBack, onOpenMap }) => {
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [showLesson, setShowLesson] = useState(false)
  const [currentExIdx, setCurrentExIdx] = useState(0)
  const [showEncouragement, setShowEncouragement] = useState(false)
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0)

  const isMinecraft = profile.theme === 'minecraft'
  const font = "'Quicksand', sans-serif"

  // Timeline data for history subject
  const gradeKeyMap = { CE2: 'CE2', CM1: 'CM1', CM2: 'CM2', '6eme': '6eme', '5eme': '5eme' }
  const timelineGrade = useMemo(() => {
    if (subject !== 'history') return []
    return timelineData[gradeKeyMap[profile.grade]] || []
  }, [subject, profile.grade])

  const completedLevelIds = useMemo(() => {
    if (subject !== 'history') return []
    return levels
      .filter(lvl => lvl.exercises.every(ex => progress.completedExercises.includes(ex.id)))
      .map(lvl => lvl.id)
  }, [subject, levels, progress.completedExercises])

  const handleTimelinePeriodSelect = (period, index) => {
    const matchingLevel = levels.find(lvl => lvl.id === period.id)
    if (matchingLevel) handleSelectLevel(matchingLevel)
  }
  const a11y = profile.accessibility || {}
  const hasA11y = a11y.enabled && a11y.profiles?.length > 0
  const needsEncouragement = hasA11y && (a11y.profiles?.includes('dyslexia') || a11y.profiles?.includes('adhd'))

  const handleSelectLevel = (level) => {
    setSelectedLevel(level)
    setCurrentExIdx(0)
    setShowLesson(!!level.lesson)
    setConsecutiveCorrect(0)
  }

  const handleExerciseComplete = (exerciseId, xp) => {
    onComplete(exerciseId, xp, subject)
    const newCount = consecutiveCorrect + 1
    setConsecutiveCorrect(newCount)

    setTimeout(() => {
      if (selectedLevel && currentExIdx < selectedLevel.exercises.length - 1) {
        // Show encouragement break every 3 exercises for TND profiles
        if (needsEncouragement && newCount > 0 && newCount % 3 === 0) {
          setShowEncouragement(true)
        } else {
          setCurrentExIdx(prev => prev + 1)
        }
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
    emc: 'EMC',
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
            accessibility={profile.accessibility}
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
            {onOpenMap && (
              <button style={{
                ...backBtnStyle,
                background: isMinecraft ? 'rgba(33,150,243,0.3)' : 'rgba(52,152,219,0.1)',
                color: isMinecraft ? '#5DADE2' : '#2E86C1',
                border: isMinecraft ? '1px solid rgba(33,150,243,0.3)' : 'none',
              }} onClick={onOpenMap}>
                🗺️ Carte interactive
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

          {/* Encouragement break for TND profiles */}
          {showEncouragement && (
            <div style={{
              textAlign: 'center', padding: 'clamp(24px, 3vw, 48px)',
              borderRadius: '20px', marginBottom: '20px',
              background: isMinecraft ? 'rgba(76,175,80,0.2)' : 'rgba(46,204,113,0.12)',
              border: isMinecraft ? '2px solid #4CAF50' : '2px solid rgba(46,204,113,0.3)',
              animation: 'slideUp 0.4s ease-out',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>
                {['🌟', '🎉', '💪', '🏆', '⭐'][Math.floor(Math.random() * 5)]}
              </div>
              <div style={{
                fontFamily: font, fontSize: 'clamp(1.2rem, 1.6vw, 2rem)',
                fontWeight: '700', marginBottom: '8px',
                color: isMinecraft ? '#7CFC00' : '#27AE60',
              }}>
                {['Super travail !', 'Tu es genial(e) !', 'Continue comme ca !', 'Bravo, champion(ne) !'][Math.floor(Math.random() * 4)]}
              </div>
              <div style={{
                fontFamily: font, fontSize: 'clamp(0.9rem, 1.1vw, 1.3rem)',
                color: isMinecraft ? '#ddd' : '#666', marginBottom: '20px',
              }}>
                Tu as deja fait {consecutiveCorrect} exercices. Prends une petite pause si tu veux !
              </div>
              <button onClick={() => { setShowEncouragement(false); setCurrentExIdx(prev => prev + 1) }}
                style={{
                  padding: '12px 32px', borderRadius: '14px', border: 'none',
                  background: isMinecraft ? '#4CAF50' : 'linear-gradient(135deg, #2ECC71, #27AE60)',
                  color: '#fff', fontFamily: font, fontSize: 'clamp(1rem, 1.2vw, 1.4rem)',
                  fontWeight: '700', cursor: 'pointer',
                }}>
                Je continue !
              </button>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ExerciseCard key={exercise.id} exercise={exercise} theme={profile.theme}
              onComplete={handleExerciseComplete}
              isCompleted={progress.completedExercises.includes(exercise.id)}
              accessibility={profile.accessibility}
              childId={profile.id}
              childGrade={profile.grade}
              subject={subject}
              levelName={selectedLevel.name || selectedLevel.nameMinecraft || ''} />
          </div>

          {(subject === 'english' || subject === 'french') && (
            <LanguageResources subject={subject} levelId={selectedLevel.id} theme={profile.theme} />
          )}

          <VideoResources subject={subject} grade={selectedLevel.grade || profile.grade} theme={profile.theme} />
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

        {onOpenMap && (
          <div style={{ textAlign: 'center', marginBottom: 'clamp(12px, 1.5vw, 20px)' }}>
            <button style={{
              padding: 'clamp(12px, 1.4vw, 18px) clamp(24px, 3vw, 40px)',
              borderRadius: '16px',
              border: isMinecraft ? '2px solid rgba(33,150,243,0.4)' : '2px solid rgba(52,152,219,0.25)',
              background: isMinecraft ? 'rgba(33,150,243,0.15)' : 'rgba(52,152,219,0.08)',
              backdropFilter: 'blur(8px)',
              color: isMinecraft ? '#5DADE2' : '#2E86C1',
              fontFamily: font,
              fontSize: 'clamp(0.95rem, 1.15vw, 1.25rem)',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isMinecraft ? '0 4px 16px rgba(33,150,243,0.15)' : '0 2px 12px rgba(52,152,219,0.1)',
            }} onClick={onOpenMap}>
              🗺️ Carte interactive
            </button>
          </div>
        )}

        {subject === 'history' && timelineGrade.length > 0 && (
          <Timeline
            grade={timelineGrade}
            completedLevels={completedLevelIds}
            theme={profile.theme}
            onSelectPeriod={handleTimelinePeriodSelect}
          />
        )}

        <div className="level-map-wrapper">
          <LevelMap levels={levels} theme={profile.theme} playerLevel={progress.level}
            completedExercises={progress.completedExercises} onSelectLevel={handleSelectLevel} />
        </div>
      </div>
    </div>
  )
}

export default SubjectPage

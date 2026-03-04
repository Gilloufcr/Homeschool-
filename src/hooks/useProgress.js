import { useState, useEffect } from 'react'

const DEFAULT_PROGRESS = {
  xp: 0,
  level: 1,
  completedExercises: [],
  subjectProgress: {
    math: { current: 0, total: 0 },
    french: { current: 0, total: 0 },
  },
  streak: 0,
  lastPlayed: null,
  badges: [],
}

export function useProgress(profileId) {
  const storageKey = `homeschool_progress_${profileId}`

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem(storageKey)
    return saved ? JSON.parse(saved) : { ...DEFAULT_PROGRESS }
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress))
  }, [progress, storageKey])

  const addXP = (amount) => {
    setProgress(prev => {
      const newXP = prev.xp + amount
      const newLevel = Math.floor(newXP / 100) + 1
      const leveledUp = newLevel > prev.level
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        _leveledUp: leveledUp,
      }
    })
  }

  const completeExercise = (exerciseId, subject) => {
    setProgress(prev => {
      if (prev.completedExercises.includes(exerciseId)) return prev
      const newCompleted = [...prev.completedExercises, exerciseId]
      const subjectProgress = { ...prev.subjectProgress }
      if (subjectProgress[subject]) {
        subjectProgress[subject] = {
          ...subjectProgress[subject],
          current: subjectProgress[subject].current + 1,
        }
      }
      return {
        ...prev,
        completedExercises: newCompleted,
        subjectProgress,
        lastPlayed: new Date().toISOString(),
      }
    })
  }

  const updateStreak = () => {
    setProgress(prev => {
      const today = new Date().toDateString()
      const last = prev.lastPlayed ? new Date(prev.lastPlayed).toDateString() : null
      if (last === today) return prev
      const yesterday = new Date(Date.now() - 86400000).toDateString()
      const newStreak = last === yesterday ? prev.streak + 1 : 1
      return { ...prev, streak: newStreak, lastPlayed: new Date().toISOString() }
    })
  }

  const addBadge = (badge) => {
    setProgress(prev => {
      if (prev.badges.find(b => b.id === badge.id)) return prev
      return { ...prev, badges: [...prev.badges, badge] }
    })
  }

  const isCompleted = (exerciseId) => progress.completedExercises.includes(exerciseId)

  const resetProgress = () => {
    setProgress({ ...DEFAULT_PROGRESS })
  }

  return {
    progress,
    addXP,
    completeExercise,
    updateStreak,
    addBadge,
    isCompleted,
    resetProgress,
  }
}

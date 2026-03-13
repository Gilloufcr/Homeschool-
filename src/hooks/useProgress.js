import { useState, useEffect, useRef, useCallback } from 'react'
import { getProgressState, saveProgressState, isLoggedIn } from '../api'

const DEFAULT_PROGRESS = {
  xp: 0,
  level: 1,
  completedExercises: [],
  subjectProgress: {
    math: { current: 0, total: 0 },
    french: { current: 0, total: 0 },
    history: { current: 0, total: 0 },
    geography: { current: 0, total: 0 },
    science: { current: 0, total: 0 },
    english: { current: 0, total: 0 },
  },
  streak: 0,
  lastPlayed: null,
  badges: [],
  medals: {},
}

// Debounce server saves to avoid spamming on rapid changes
let saveTimeout = null
function debouncedSave(childId, state) {
  if (!isLoggedIn()) return
  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    saveProgressState(childId, {
      xp: state.xp,
      level: state.level,
      completedExercises: state.completedExercises,
      medals: state.medals || {},
      streak: state.streak,
      lastPlayed: state.lastPlayed,
      badges: state.badges,
    }).catch(() => {}) // silent fail — localStorage is the fallback
  }, 2000)
}

export function useProgress(profileId) {
  const storageKey = `homeschool_progress_${profileId}`
  const hasSyncedRef = useRef(false)

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem(storageKey)
    return saved ? JSON.parse(saved) : { ...DEFAULT_PROGRESS }
  })

  // Reload progress when switching child profiles
  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    setProgress(saved ? JSON.parse(saved) : { ...DEFAULT_PROGRESS })
    hasSyncedRef.current = false
  }, [storageKey])

  // Sync from server on first load (merge server state with local)
  useEffect(() => {
    if (hasSyncedRef.current || !isLoggedIn() || profileId === 'default') return
    hasSyncedRef.current = true

    getProgressState(profileId).then(serverState => {
      if (!serverState) return
      setProgress(local => {
        // Merge: take whichever has more progress
        const serverExercises = serverState.completedExercises || []
        const localExercises = local.completedExercises || []

        // Union of completed exercises
        const mergedExercises = [...new Set([...localExercises, ...serverExercises])]

        // Take higher XP/level
        const mergedXP = Math.max(local.xp || 0, serverState.xp || 0)
        const mergedLevel = Math.max(local.level || 1, serverState.level || 1)

        // Merge medals (keep best per level)
        const mergedMedals = { ...(serverState.medals || {}), ...(local.medals || {}) }

        // Merge badges (union)
        const localBadges = local.badges || []
        const serverBadges = serverState.badges || []
        const badgeIds = new Set()
        const mergedBadges = []
        for (const b of [...localBadges, ...serverBadges]) {
          if (!badgeIds.has(b.id)) {
            badgeIds.add(b.id)
            mergedBadges.push(b)
          }
        }

        // Recalculate subjectProgress from merged exercises
        const subjectProgress = { ...local.subjectProgress }

        const merged = {
          ...local,
          xp: mergedXP,
          level: mergedLevel,
          completedExercises: mergedExercises,
          medals: mergedMedals,
          badges: mergedBadges,
          streak: Math.max(local.streak || 0, serverState.streak || 0),
          lastPlayed: [local.lastPlayed, serverState.lastPlayed]
            .filter(Boolean)
            .sort()
            .pop() || null,
          subjectProgress,
        }

        return merged
      })
    }).catch(() => {}) // server unreachable — use local only
  }, [profileId])

  // Save progress to localStorage + server on every change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress))
    if (profileId !== 'default') {
      debouncedSave(profileId, progress)
    }
  }, [progress, storageKey, profileId])

  const addXP = useCallback((amount) => {
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
  }, [])

  const completeExercise = useCallback((exerciseId, subject) => {
    setProgress(prev => {
      if (prev.completedExercises.includes(exerciseId)) return prev
      const newCompleted = [...prev.completedExercises, exerciseId]
      const subjectProgress = { ...prev.subjectProgress }
      if (!subjectProgress[subject]) {
        subjectProgress[subject] = { current: 0, total: 0 }
      }
      subjectProgress[subject] = {
        ...subjectProgress[subject],
        current: subjectProgress[subject].current + 1,
      }
      return {
        ...prev,
        completedExercises: newCompleted,
        subjectProgress,
        lastPlayed: new Date().toISOString(),
      }
    })
  }, [])

  const updateStreak = useCallback(() => {
    setProgress(prev => {
      const today = new Date().toDateString()
      const last = prev.lastPlayed ? new Date(prev.lastPlayed).toDateString() : null
      if (last === today) return prev
      const yesterday = new Date(Date.now() - 86400000).toDateString()
      const newStreak = last === yesterday ? prev.streak + 1 : 1
      return { ...prev, streak: newStreak, lastPlayed: new Date().toISOString() }
    })
  }, [])

  const addBadge = useCallback((badge) => {
    setProgress(prev => {
      if (prev.badges.find(b => b.id === badge.id)) return prev
      return { ...prev, badges: [...prev.badges, badge] }
    })
  }, [])

  const addMedal = useCallback((levelId, medalType) => {
    setProgress(prev => {
      const current = prev.medals?.[levelId]
      const rank = { gold: 3, silver: 2, bronze: 1 }
      if (current && rank[current] >= rank[medalType]) return prev // don't downgrade
      return { ...prev, medals: { ...prev.medals, [levelId]: medalType } }
    })
  }, [])

  const isCompleted = (exerciseId) => progress.completedExercises.includes(exerciseId)

  const resetProgress = useCallback(() => {
    setProgress({ ...DEFAULT_PROGRESS })
  }, [])

  return {
    progress,
    addXP,
    completeExercise,
    updateStreak,
    addBadge,
    addMedal,
    isCompleted,
    resetProgress,
  }
}

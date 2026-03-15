import { useState, useEffect } from 'react'

function getWeekNumber(d) {
  const date = new Date(d)
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7))
  const week1 = new Date(date.getFullYear(), 0, 4)
  return Math.round(((date - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7) + 1
}

function getDayOfWeek() {
  // 0=Mon ... 6=Sun
  return (new Date().getDay() + 6) % 7
}

function getWeekKey(childId) {
  const now = new Date()
  return `homeschool_week_${childId}_${now.getFullYear()}_${getWeekNumber(now)}`
}

function getDismissKey(childId) {
  return `homeschool_weekrecap_dismiss_${childId}_${new Date().toDateString()}`
}

/** Track a completed exercise for the week. Call this from outside. */
export function trackWeeklyExercise(childId) {
  const key = getWeekKey(childId)
  const data = JSON.parse(localStorage.getItem(key) || '{}')
  const dayIdx = getDayOfWeek()

  if (!data.days) data.days = [0, 0, 0, 0, 0, 0, 0]
  if (!data.xp) data.xp = 0
  if (!data.exercises) data.exercises = 0
  if (!data.bestStreak) data.bestStreak = 0

  data.days[dayIdx] = (data.days[dayIdx] || 0) + 1
  data.exercises = (data.exercises || 0) + 1
  localStorage.setItem(key, JSON.stringify(data))
}

export function trackWeeklyXP(childId, amount) {
  const key = getWeekKey(childId)
  const data = JSON.parse(localStorage.getItem(key) || '{}')
  data.xp = (data.xp || 0) + amount
  localStorage.setItem(key, JSON.stringify(data))
}

export function trackWeeklyStreak(childId, streak) {
  const key = getWeekKey(childId)
  const data = JSON.parse(localStorage.getItem(key) || '{}')
  if (streak > (data.bestStreak || 0)) {
    data.bestStreak = streak
    localStorage.setItem(key, JSON.stringify(data))
  }
}

function getGrade(exercises) {
  if (exercises >= 30) return { label: 'Exceptionnel !', emoji: '🌟', mcLabel: 'LEGENDAIRE !' }
  if (exercises >= 16) return { label: 'Excellent', emoji: '🏆', mcLabel: 'DIAMANT' }
  if (exercises >= 6) return { label: 'Bon travail', emoji: '👍', mcLabel: 'OR' }
  return { label: 'Debut prometteur', emoji: '🌱', mcLabel: 'FER' }
}

const DAY_LABELS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

export default function WeeklyRecap({ progress, theme, childName, onDismiss }) {
  const isMinecraft = theme === 'minecraft'
  const font = "'Quicksand', sans-serif"

  const childId = childName?.toLowerCase() || 'default'
  const key = getWeekKey(childId)
  const data = JSON.parse(localStorage.getItem(key) || '{}')

  const weekExercises = data.exercises || 0
  const weekXP = data.xp || 0
  const bestStreak = data.bestStreak || progress?.streak || 0
  const days = data.days || [0, 0, 0, 0, 0, 0, 0]
  const daysPlayed = days.filter(d => d > 0).length
  const medalsObj = progress?.medals || {}
  const medals = typeof medalsObj === 'object' ? Object.keys(medalsObj).length : 0
  const grade = getGrade(weekExercises)

  const cardStyle = {
    padding: 'clamp(16px, 2vw, 24px)',
    borderRadius: isMinecraft ? '4px' : '20px',
    background: isMinecraft ? 'rgba(20, 20, 30, 0.85)' : 'rgba(255,255,255,0.97)',
    border: isMinecraft
      ? '3px solid #FFD700'
      : '3px solid transparent',
    borderImage: isMinecraft ? 'none' : 'linear-gradient(135deg, #9B59B6, #FF69B4) 1',
    boxShadow: isMinecraft
      ? '0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,215,0,0.1)'
      : '0 4px 20px rgba(155,89,182,0.15)',
    fontFamily: font,
    position: 'relative',
    marginBottom: 'clamp(16px, 2vw, 28px)',
    animation: 'slideUp 0.4s ease-out',
    ...(isMinecraft ? { imageRendering: 'pixelated' } : {}),
  }

  const closeBtn = {
    position: 'absolute',
    top: 'clamp(8px, 1vw, 14px)',
    right: 'clamp(8px, 1vw, 14px)',
    width: '28px',
    height: '28px',
    borderRadius: isMinecraft ? '2px' : '50%',
    border: isMinecraft ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.1)',
    background: isMinecraft ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
    color: isMinecraft ? 'rgba(255,255,255,0.5)' : '#aaa',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
    padding: 0,
    transition: 'all 0.2s',
  }

  const titleStyle = {
    fontSize: 'clamp(1rem, 1.3vw, 1.5rem)',
    fontWeight: '800',
    color: isMinecraft ? '#FFD700' : '#9B59B6',
    marginBottom: 'clamp(10px, 1.2vw, 16px)',
    textShadow: isMinecraft ? '0 2px 6px rgba(0,0,0,0.5)' : 'none',
  }

  const statGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: 'clamp(8px, 1vw, 14px)',
    marginBottom: 'clamp(12px, 1.5vw, 18px)',
  }

  const statBoxStyle = {
    padding: 'clamp(8px, 1vw, 14px)',
    borderRadius: isMinecraft ? '2px' : '12px',
    background: isMinecraft ? 'rgba(255,255,255,0.04)' : 'rgba(155,89,182,0.04)',
    border: isMinecraft
      ? '1px solid rgba(255,215,0,0.15)'
      : '1px solid rgba(155,89,182,0.08)',
    textAlign: 'center',
  }

  const statValueStyle = {
    fontSize: 'clamp(1.1rem, 1.5vw, 1.8rem)',
    fontWeight: '800',
    color: isMinecraft ? '#7CFC00' : '#9B59B6',
  }

  const statLabelStyle = {
    fontSize: 'clamp(0.65rem, 0.8vw, 0.9rem)',
    fontWeight: '600',
    color: isMinecraft ? 'rgba(255,255,255,0.5)' : '#999',
    marginTop: '2px',
  }

  // Day dots bar
  const dayBarStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(6px, 0.8vw, 12px)',
    marginBottom: 'clamp(12px, 1.5vw, 18px)',
  }

  const todayIdx = getDayOfWeek()

  const gradeStyle = {
    fontSize: 'clamp(0.9rem, 1.1vw, 1.3rem)',
    fontWeight: '800',
    color: isMinecraft ? '#FFD700' : '#E67E22',
    textAlign: 'center',
    padding: 'clamp(8px, 1vw, 12px)',
    borderRadius: isMinecraft ? '2px' : '12px',
    background: isMinecraft
      ? 'rgba(255,215,0,0.08)'
      : 'linear-gradient(135deg, rgba(255,105,180,0.06), rgba(155,89,182,0.06))',
    border: isMinecraft
      ? '1px solid rgba(255,215,0,0.2)'
      : '1px solid rgba(155,89,182,0.1)',
  }

  return (
    <div style={cardStyle}>
      <button
        style={closeBtn}
        onClick={(e) => {
          e.stopPropagation()
          localStorage.setItem(getDismissKey(childId), '1')
          if (onDismiss) onDismiss()
        }}
        onMouseOver={e => {
          e.currentTarget.style.background = isMinecraft ? 'rgba(255,0,0,0.2)' : 'rgba(0,0,0,0.08)'
          e.currentTarget.style.color = isMinecraft ? '#FF6B6B' : '#666'
        }}
        onMouseOut={e => {
          e.currentTarget.style.background = isMinecraft ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
          e.currentTarget.style.color = isMinecraft ? 'rgba(255,255,255,0.5)' : '#aaa'
        }}
        aria-label="Fermer"
      >
        ✕
      </button>

      <div style={titleStyle}>
        {isMinecraft ? '📊 Rapport hebdo' : '📊 Recap de la semaine'}
      </div>

      {/* Stats grid */}
      <div style={statGridStyle}>
        <div style={statBoxStyle}>
          <div style={statValueStyle}>{weekXP}</div>
          <div style={statLabelStyle}>XP gagne</div>
        </div>
        <div style={statBoxStyle}>
          <div style={statValueStyle}>{weekExercises}</div>
          <div style={statLabelStyle}>Exercices</div>
        </div>
        <div style={statBoxStyle}>
          <div style={statValueStyle}>{bestStreak}🔥</div>
          <div style={statLabelStyle}>Meilleure serie</div>
        </div>
        <div style={statBoxStyle}>
          <div style={statValueStyle}>{medals}</div>
          <div style={statLabelStyle}>Medailles</div>
        </div>
      </div>

      {/* Day dots */}
      <div style={dayBarStyle}>
        {DAY_LABELS.map((label, i) => {
          const played = days[i] > 0
          const isToday = i === todayIdx
          return (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: 'clamp(28px, 3vw, 38px)',
                height: 'clamp(28px, 3vw, 38px)',
                borderRadius: isMinecraft ? '3px' : '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(0.65rem, 0.8vw, 0.9rem)',
                fontWeight: '700',
                fontFamily: font,
                background: played
                  ? (isMinecraft ? 'linear-gradient(135deg, #4CAF50, #2E7D32)' : 'linear-gradient(135deg, #9B59B6, #8E44AD)')
                  : (isMinecraft ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
                color: played
                  ? '#fff'
                  : (isMinecraft ? 'rgba(255,255,255,0.25)' : '#ccc'),
                border: isToday
                  ? (isMinecraft ? '2px solid #FFD700' : '2px solid #FF69B4')
                  : (played ? 'none' : (isMinecraft ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)')),
                transition: 'all 0.3s ease',
                boxShadow: played
                  ? (isMinecraft ? '0 2px 8px rgba(76,175,80,0.4)' : '0 2px 8px rgba(155,89,182,0.3)')
                  : 'none',
              }}>
                {played ? '✓' : label}
              </div>
              <div style={{
                fontSize: 'clamp(0.55rem, 0.65vw, 0.75rem)',
                color: isMinecraft ? 'rgba(255,255,255,0.35)' : '#bbb',
                marginTop: '3px',
                fontWeight: '600',
              }}>
                {label}
              </div>
            </div>
          )
        })}
      </div>

      {/* Grade */}
      <div style={gradeStyle}>
        {grade.emoji}{' '}
        {isMinecraft ? grade.mcLabel : grade.label}
        {' '}{grade.emoji}
        <div style={{
          fontSize: 'clamp(0.7rem, 0.85vw, 0.95rem)',
          fontWeight: '600',
          color: isMinecraft ? 'rgba(255,255,255,0.5)' : '#aaa',
          marginTop: '4px',
        }}>
          {daysPlayed}/7 jours actifs cette semaine
        </div>
      </div>
    </div>
  )
}

/** Check if the recap was dismissed today */
export function isWeeklyRecapDismissed(childId) {
  return localStorage.getItem(getDismissKey(childId)) === '1'
}

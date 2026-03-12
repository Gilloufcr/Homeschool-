import { useState, useRef, useEffect } from 'react'

const Timeline = ({ grade, completedLevels, theme, onSelectPeriod }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(null)
  const scrollRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const isMinecraft = theme === 'minecraft'
  const font = "'Quicksand', sans-serif"

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
      return () => el.removeEventListener('scroll', handleScroll)
    }
  }, [grade])

  const completedCount = completedLevels.length

  const handlePeriodClick = (period, index) => {
    const isUnlocked = index === 0 || completedLevels.includes(grade[index - 1]?.id)
    if (!isUnlocked && index > completedCount) return
    setSelectedPeriod(selectedPeriod?.id === period.id ? null : period)
    if (onSelectPeriod) onSelectPeriod(period, index)
  }

  // Theme styles
  const containerStyle = {
    marginBottom: 'clamp(16px, 2vw, 30px)',
    borderRadius: '16px',
    padding: 'clamp(12px, 1.5vw, 20px)',
    background: isMinecraft
      ? 'rgba(0,0,0,0.45)'
      : 'rgba(255,255,255,0.7)',
    border: isMinecraft
      ? '2px solid rgba(255,215,0,0.3)'
      : '2px solid rgba(155,89,182,0.15)',
    backdropFilter: 'blur(8px)',
  }

  const titleBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'clamp(8px, 1vw, 14px)',
  }

  const titleTextStyle = {
    fontFamily: font,
    fontSize: 'clamp(0.85rem, 1.1vw, 1.2rem)',
    fontWeight: '700',
    color: isMinecraft ? '#FFD700' : '#9B59B6',
  }

  const progressBarBg = {
    flex: 1,
    maxWidth: '200px',
    height: '6px',
    borderRadius: '3px',
    marginLeft: '12px',
    background: isMinecraft ? 'rgba(255,255,255,0.1)' : 'rgba(155,89,182,0.1)',
    overflow: 'hidden',
  }

  const progressBarFill = {
    height: '100%',
    borderRadius: '3px',
    width: `${grade.length > 0 ? (completedCount / grade.length) * 100 : 0}%`,
    background: isMinecraft
      ? 'linear-gradient(90deg, #FFD700, #FFA500)'
      : 'linear-gradient(90deg, #9B59B6, #E74C8B)',
    transition: 'width 0.5s ease',
  }

  const scrollTrackStyle = {
    overflowX: 'auto',
    overflowY: 'hidden',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'thin',
    scrollbarColor: isMinecraft
      ? 'rgba(255,215,0,0.4) transparent'
      : 'rgba(155,89,182,0.3) transparent',
    paddingBottom: '8px',
  }

  const lineStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative',
    minWidth: 'max-content',
    padding: '10px 0',
  }

  // Scroll indicator
  const scrollIndicatorStyle = {
    height: '3px',
    borderRadius: '2px',
    marginTop: '4px',
    background: isMinecraft ? 'rgba(255,255,255,0.08)' : 'rgba(155,89,182,0.08)',
    overflow: 'hidden',
  }

  const scrollThumbStyle = {
    height: '100%',
    width: '30%',
    borderRadius: '2px',
    background: isMinecraft ? 'rgba(255,215,0,0.5)' : 'rgba(155,89,182,0.4)',
    transform: `translateX(${scrollProgress * 233}%)`,
    transition: 'transform 0.1s ease-out',
  }

  return (
    <div style={containerStyle}>
      {/* Title bar with progress */}
      <div style={titleBarStyle}>
        <span style={titleTextStyle}>Frise chronologique</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontFamily: font, fontSize: 'clamp(0.7rem, 0.9vw, 0.9rem)',
            color: isMinecraft ? 'rgba(255,255,255,0.6)' : '#999',
          }}>
            {completedCount}/{grade.length}
          </span>
          <div style={progressBarBg}>
            <div style={progressBarFill} />
          </div>
        </div>
      </div>

      {/* Scrollable timeline */}
      <div ref={scrollRef} style={scrollTrackStyle}>
        <div style={lineStyle}>
          {grade.map((period, idx) => {
            const isCompleted = completedLevels.includes(period.id)
            const isUnlocked = idx === 0 || completedLevels.includes(grade[idx - 1]?.id) || idx <= completedCount
            const isSelected = selectedPeriod?.id === period.id
            const isLast = idx === grade.length - 1

            return (
              <div key={period.id} style={{ display: 'flex', alignItems: 'flex-start' }}>
                <TimelineNode
                  period={period}
                  index={idx}
                  isCompleted={isCompleted}
                  isUnlocked={isUnlocked}
                  isSelected={isSelected}
                  isMinecraft={isMinecraft}
                  font={font}
                  onClick={() => handlePeriodClick(period, idx)}
                />
                {!isLast && (
                  <div style={{
                    width: 'clamp(40px, 5vw, 80px)',
                    height: '3px',
                    alignSelf: 'center',
                    marginTop: '18px',
                    background: isCompleted
                      ? (isMinecraft ? 'linear-gradient(90deg, #FFD700, #FFA500)' : 'linear-gradient(90deg, #9B59B6, #E74C8B)')
                      : (isMinecraft ? 'rgba(255,255,255,0.12)' : 'rgba(155,89,182,0.12)'),
                    borderRadius: '2px',
                    transition: 'background 0.3s ease',
                  }} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={scrollIndicatorStyle}>
        <div style={scrollThumbStyle} />
      </div>

      {/* Detail popup */}
      {selectedPeriod && (
        <PeriodDetail period={selectedPeriod} isMinecraft={isMinecraft} font={font} />
      )}
    </div>
  )
}

const TimelineNode = ({ period, index, isCompleted, isUnlocked, isSelected, isMinecraft, font, onClick }) => {
  const nodeSize = 'clamp(42px, 5vw, 58px)'

  const nodeStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: isUnlocked ? 'pointer' : 'not-allowed',
    opacity: isUnlocked ? 1 : 0.4,
    transition: 'all 0.3s ease',
    minWidth: 'clamp(80px, 10vw, 120px)',
    filter: !isUnlocked ? 'grayscale(0.8)' : 'none',
  }

  const circleStyle = {
    width: nodeSize,
    height: nodeSize,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'clamp(1.2rem, 1.6vw, 1.8rem)',
    border: isSelected
      ? (isMinecraft ? '3px solid #FFD700' : '3px solid #9B59B6')
      : isCompleted
        ? (isMinecraft ? '3px solid #4CAF50' : '3px solid #2ECC71')
        : (isMinecraft ? '2px solid rgba(255,255,255,0.2)' : '2px solid rgba(155,89,182,0.2)'),
    background: isCompleted
      ? (isMinecraft ? 'rgba(76,175,80,0.25)' : 'rgba(46,204,113,0.15)')
      : isSelected
        ? (isMinecraft ? 'rgba(255,215,0,0.2)' : 'rgba(155,89,182,0.12)')
        : (isMinecraft ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)'),
    boxShadow: isCompleted
      ? (isMinecraft ? '0 0 12px rgba(255,215,0,0.4)' : '0 0 10px rgba(46,204,113,0.3)')
      : isSelected
        ? (isMinecraft ? '0 0 16px rgba(255,215,0,0.5)' : '0 0 12px rgba(155,89,182,0.3)')
        : 'none',
    transition: 'all 0.3s ease',
  }

  const dateStyle = {
    fontFamily: font,
    fontSize: 'clamp(0.6rem, 0.75vw, 0.8rem)',
    fontWeight: '600',
    color: isMinecraft ? 'rgba(255,215,0,0.7)' : '#9B59B6',
    marginTop: '4px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  }

  const labelStyle = {
    fontFamily: font,
    fontSize: 'clamp(0.6rem, 0.75vw, 0.8rem)',
    fontWeight: '600',
    color: isMinecraft ? 'rgba(255,255,255,0.75)' : '#555',
    marginTop: '2px',
    textAlign: 'center',
    maxWidth: 'clamp(70px, 9vw, 110px)',
    lineHeight: '1.2',
  }

  return (
    <div style={nodeStyle} onClick={onClick} role="button" tabIndex={isUnlocked ? 0 : -1}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
      aria-label={`${period.title} - ${period.date}`}
    >
      <div style={circleStyle}>
        {isCompleted ? '\u2713' : period.emoji}
      </div>
      <div style={dateStyle}>{period.date}</div>
      <div style={labelStyle}>{period.period}</div>
    </div>
  )
}

const PeriodDetail = ({ period, isMinecraft, font }) => {
  const detailStyle = {
    marginTop: 'clamp(10px, 1.2vw, 16px)',
    padding: 'clamp(12px, 1.5vw, 20px)',
    borderRadius: '12px',
    background: isMinecraft
      ? 'rgba(255,215,0,0.08)'
      : 'rgba(155,89,182,0.06)',
    border: isMinecraft
      ? '1px solid rgba(255,215,0,0.2)'
      : '1px solid rgba(155,89,182,0.15)',
    animation: 'slideUp 0.3s ease-out',
  }

  const labelColor = isMinecraft ? 'rgba(255,255,255,0.5)' : '#999'
  const valueColor = isMinecraft ? 'rgba(255,255,255,0.9)' : '#333'

  const rowStyle = {
    display: 'flex',
    gap: 'clamp(8px, 1.5vw, 20px)',
    flexWrap: 'wrap',
  }

  const cellStyle = {
    flex: '1 1 auto',
    minWidth: '120px',
  }

  const labelStyle = {
    fontFamily: font,
    fontSize: 'clamp(0.65rem, 0.8vw, 0.8rem)',
    color: labelColor,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '2px',
  }

  const valueStyle = {
    fontFamily: font,
    fontSize: 'clamp(0.85rem, 1vw, 1.1rem)',
    color: valueColor,
    fontWeight: '700',
  }

  return (
    <div style={detailStyle}>
      <div style={{
        fontFamily: font,
        fontSize: 'clamp(1rem, 1.3vw, 1.4rem)',
        fontWeight: '800',
        color: isMinecraft ? '#FFD700' : '#9B59B6',
        marginBottom: 'clamp(8px, 1vw, 12px)',
      }}>
        {period.emoji} {period.title}
      </div>
      <div style={rowStyle}>
        <div style={cellStyle}>
          <div style={labelStyle}>Date</div>
          <div style={valueStyle}>{period.date}</div>
        </div>
        <div style={cellStyle}>
          <div style={labelStyle}>Personnage cle</div>
          <div style={valueStyle}>{period.person}</div>
        </div>
        <div style={cellStyle}>
          <div style={labelStyle}>Evenement</div>
          <div style={valueStyle}>{period.event}</div>
        </div>
        <div style={cellStyle}>
          <div style={labelStyle}>Lieu</div>
          <div style={valueStyle}>{period.place}</div>
        </div>
      </div>
    </div>
  )
}

export default Timeline

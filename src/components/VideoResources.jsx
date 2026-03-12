import { educationalVideos, gradeToKey, subjectVideoIcons } from '../data/educationalVideos'

export default function VideoResources({ subject, grade, theme }) {
  const isMinecraft = theme === 'minecraft'
  const gradeKey = gradeToKey(grade)
  const videos = educationalVideos[subject]?.[gradeKey] || []

  if (videos.length === 0) return null

  const icon = subjectVideoIcons[subject] || '🎬'

  const s = {
    container: {
      marginTop: '15px',
      padding: '18px',
      borderRadius: '18px',
      background: isMinecraft
        ? 'rgba(20,20,30,0.7)'
        : 'rgba(255,255,255,0.95)',
      border: isMinecraft
        ? '1px solid rgba(93,173,226,0.2)'
        : '2px solid rgba(93,173,226,0.2)',
      boxShadow: isMinecraft ? '0 4px 16px rgba(0,0,0,0.2)' : '0 2px 12px rgba(0,0,0,0.06)',
      backdropFilter: 'blur(8px)',
    },
    title: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
      fontWeight: '700',
      color: isMinecraft ? '#5DADE2' : '#2980B9',
      marginBottom: '12px',
      textShadow: isMinecraft ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none',
    },
    videoCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px 14px',
      borderRadius: '12px',
      background: isMinecraft ? 'rgba(93,173,226,0.1)' : 'rgba(93,173,226,0.06)',
      border: isMinecraft ? '2px solid #5DADE2' : '1px solid rgba(93,173,226,0.15)',
      marginBottom: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
    },
    videoIcon: {
      fontSize: '1.4rem',
      flexShrink: 0,
    },
    videoInfo: {
      flex: 1,
    },
    videoTitle: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: 'clamp(0.75rem, 0.9vw, 0.85rem)',
      fontWeight: '700',
      color: isMinecraft ? '#fff' : '#333',
      marginBottom: '2px',
    },
    videoMeta: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)',
      color: isMinecraft ? '#aaa' : '#888',
    },
    channelBadge: {
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '6px',
      background: isMinecraft ? 'rgba(255,215,0,0.15)' : 'rgba(155,89,182,0.1)',
      color: isMinecraft ? '#FFD700' : '#9B59B6',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: 'clamp(0.55rem, 0.65vw, 0.65rem)',
      fontWeight: '600',
      marginRight: '6px',
    },
    topicBadge: {
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '6px',
      background: isMinecraft ? 'rgba(76,175,80,0.15)' : 'rgba(46,204,113,0.1)',
      color: isMinecraft ? '#7CFC00' : '#27AE60',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: 'clamp(0.55rem, 0.65vw, 0.65rem)',
      fontWeight: '600',
    },
    playBtn: {
      padding: '6px 12px',
      borderRadius: '8px',
      border: 'none',
      background: '#E74C3C',
      color: 'white',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)',
      fontWeight: '700',
      cursor: 'pointer',
      flexShrink: 0,
    },
  }

  return (
    <div style={s.container}>
      <div style={s.title}>
        {icon} Videos educatives
      </div>
      {videos.map((v, i) => (
        <a
          key={i}
          href={v.url}
          target="_blank"
          rel="noopener noreferrer"
          style={s.videoCard}
        >
          <div style={s.videoIcon}>🎬</div>
          <div style={s.videoInfo}>
            <div style={s.videoTitle}>{v.title}</div>
            <div style={s.videoMeta}>
              <span style={s.channelBadge}>{v.channel}</span>
              <span style={s.topicBadge}>{v.topic}</span>
            </div>
          </div>
          <div style={s.playBtn}>▶ Voir</div>
        </a>
      ))}
    </div>
  )
}

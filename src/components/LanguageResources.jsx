import { useState, useEffect } from 'react'
import {
  englishVideos,
  frenchVideos,
  pronunciationWords,
  speak,
  hasSpeechSupport,
} from '../data/languageResources'

export default function LanguageResources({ subject, levelId, theme }) {
  const isMinecraft = theme === 'minecraft'
  const [speechOk, setSpeechOk] = useState(false)
  const [playingWord, setPlayingWord] = useState(null)

  useEffect(() => {
    setSpeechOk(hasSpeechSupport())
    // Force voices to load
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices()
    }
  }, [])

  const videos = subject === 'english'
    ? (englishVideos[levelId] || [])
    : subject === 'french'
      ? (frenchVideos[levelId] || [])
      : []

  const words = subject === 'english' ? (pronunciationWords[levelId] || []) : []

  if (videos.length === 0 && words.length === 0) return null

  const handleSpeak = (word) => {
    setPlayingWord(word)
    speak(word, subject === 'english' ? 'en-US' : 'fr-FR')
    setTimeout(() => setPlayingWord(null), 2000)
  }

  const s = {
    container: {
      marginTop: '15px',
      padding: '18px',
      borderRadius: '18px',
      background: isMinecraft
        ? 'rgba(0,0,0,0.6)'
        : 'rgba(255,255,255,0.95)',
      border: isMinecraft
        ? '3px solid #5DADE2'
        : '2px solid rgba(93,173,226,0.2)',
      boxShadow: isMinecraft ? 'none' : '0 2px 12px rgba(0,0,0,0.06)',
    },
    title: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: isMinecraft ? '0.5rem' : '1rem',
      fontWeight: '700',
      color: isMinecraft ? '#5DADE2' : '#2980B9',
      marginBottom: '12px',
      textShadow: isMinecraft ? '1px 1px 0 #000' : 'none',
    },
    sectionTitle: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: isMinecraft ? '0.4rem' : '0.8rem',
      fontWeight: '700',
      color: isMinecraft ? '#FFD700' : '#666',
      marginBottom: '8px',
      marginTop: '12px',
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
      fontSize: isMinecraft ? '0.35rem' : '0.8rem',
      fontWeight: '700',
      color: isMinecraft ? '#fff' : '#333',
      marginBottom: '2px',
    },
    videoMeta: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: isMinecraft ? '0.3rem' : '0.65rem',
      color: isMinecraft ? '#aaa' : '#888',
    },
    playBtn: {
      padding: isMinecraft ? '4px 8px' : '6px 12px',
      borderRadius: '8px',
      border: 'none',
      background: isMinecraft ? '#E74C3C' : '#E74C3C',
      color: 'white',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: isMinecraft ? '0.3rem' : '0.65rem',
      fontWeight: '700',
      cursor: 'pointer',
      flexShrink: 0,
    },
    wordCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px 12px',
      borderRadius: '10px',
      background: isMinecraft ? 'rgba(46,204,113,0.1)' : 'rgba(46,204,113,0.06)',
      border: isMinecraft ? '1px solid #4CAF50' : '1px solid rgba(46,204,113,0.15)',
      marginBottom: '6px',
    },
    wordText: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: isMinecraft ? '0.35rem' : '0.85rem',
      fontWeight: '700',
      color: isMinecraft ? '#7CFC00' : '#27AE60',
      flex: 1,
    },
    wordTranslation: {
      fontFamily: "'Quicksand', sans-serif",
      fontSize: isMinecraft ? '0.3rem' : '0.7rem',
      color: isMinecraft ? '#aaa' : '#888',
      flex: 1,
    },
    speakBtn: (playing) => ({
      width: isMinecraft ? '28px' : '34px',
      height: isMinecraft ? '28px' : '34px',
      borderRadius: '50%',
      border: 'none',
      background: playing
        ? (isMinecraft ? '#E67E22' : 'linear-gradient(135deg, #E67E22, #F39C12)')
        : (isMinecraft ? '#2980B9' : 'linear-gradient(135deg, #5DADE2, #2980B9)'),
      color: 'white',
      fontSize: '1rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'all 0.2s ease',
      animation: playing ? 'pulse 0.5s ease-in-out infinite' : 'none',
    }),
  }

  return (
    <div style={s.container}>
      <div style={s.title}>
        {isMinecraft ? '> RESSOURCES' : '🎓 Ressources'}
      </div>

      {/* Pronunciation section */}
      {words.length > 0 && speechOk && (
        <>
          <div style={s.sectionTitle}>
            🔊 {isMinecraft ? 'PRONONCIATION' : 'Ecouter et repeter'}
          </div>
          {words.map((w, i) => (
            <div key={i} style={s.wordCard}>
              <button
                style={s.speakBtn(playingWord === w.word)}
                onClick={() => handleSpeak(w.word)}
                title="Ecouter"
              >
                {playingWord === w.word ? '🔊' : '▶'}
              </button>
              <div style={s.wordText}>{w.word}</div>
              <div style={s.wordTranslation}>{w.translation}</div>
            </div>
          ))}
        </>
      )}

      {/* Video section */}
      {videos.length > 0 && (
        <>
          <div style={s.sectionTitle}>
            🎬 {isMinecraft ? 'VIDEOS' : 'Videos educatives'}
          </div>
          {videos.map((v, i) => (
            <a
              key={i}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              style={s.videoCard}
            >
              <div style={s.videoIcon}>{v.icon}</div>
              <div style={s.videoInfo}>
                <div style={s.videoTitle}>{v.title}</div>
                <div style={s.videoMeta}>{v.channel} • {v.duration}</div>
              </div>
              <div style={s.playBtn}>▶ Voir</div>
            </a>
          ))}
        </>
      )}
    </div>
  )
}

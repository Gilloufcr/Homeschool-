import { useState } from 'react'
import { updateChild } from '../api'

const TND_OPTIONS = [
  { key: 'dyslexia', label: 'Dyslexie / Dysorthographie', icon: 'Aa',
    desc: 'Police adaptee, espacement augmente, lecture audio' },
  { key: 'dyscalculia', label: 'Dyscalculie', icon: '123',
    desc: 'Indices visuels, temps supplementaire, aide au calcul' },
  { key: 'adhd', label: 'TDAH', icon: '◎',
    desc: 'Reduction des distractions, exercices fractionnes, pas de timer' },
  { key: 'autism', label: 'TSA (Autisme)', icon: '∞',
    desc: 'Interface epuree, instructions claires, routine previsible' },
  { key: 'dyspraxia', label: 'Dyspraxie', icon: '✋',
    desc: 'Boutons plus grands, lecture audio, navigation simplifiee' },
]

const DEFAULT_ACCESSIBILITY = {
  enabled: false,
  profiles: [],
  adaptedFont: false,
  fontSize: 'normal', // small, normal, large, xlarge
  lineSpacing: false,
  highContrast: false,
  reduceAnimations: false,
  noConfetti: false,
  readAloud: false,
  highlightKeywords: false,
  oneAtATime: true,
  noTimer: true,
  tintedBackground: '', // '', 'beige', 'blue', 'green'
}

export default function AccessibilitySettings({ child, onUpdate }) {
  const [accessibility, setAccessibility] = useState(
    child.accessibility || { ...DEFAULT_ACCESSIBILITY }
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const font = "'Quicksand', sans-serif"

  const update = (key, value) => {
    setAccessibility(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const toggleProfile = (profileKey) => {
    setAccessibility(prev => {
      const profiles = prev.profiles.includes(profileKey)
        ? prev.profiles.filter(p => p !== profileKey)
        : [...prev.profiles, profileKey]

      // Auto-enable relevant options based on profiles
      const auto = { ...prev, profiles, enabled: profiles.length > 0 }

      if (profiles.includes('dyslexia')) {
        auto.adaptedFont = true
        auto.lineSpacing = true
        auto.readAloud = true
      }
      if (profiles.includes('adhd')) {
        auto.reduceAnimations = true
        auto.noConfetti = true
        auto.oneAtATime = true
        auto.noTimer = true
      }
      if (profiles.includes('autism')) {
        auto.reduceAnimations = true
        auto.noConfetti = true
        auto.highlightKeywords = true
      }
      if (profiles.includes('dyspraxia')) {
        auto.readAloud = true
        auto.fontSize = 'large'
      }
      if (profiles.includes('dyscalculia')) {
        auto.highlightKeywords = true
        auto.noTimer = true
      }

      return auto
    })
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateChild(child.id, { accessibility })
      onUpdate({ ...child, accessibility })
      setSaved(true)
    } catch (e) {
      console.error('Error saving accessibility:', e)
    }
    setSaving(false)
  }

  const s = {
    section: {
      marginBottom: '20px',
    },
    sectionTitle: {
      fontFamily: font, fontSize: '1rem', fontWeight: '700',
      color: 'white', marginBottom: '12px',
    },
    profileGrid: {
      display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '10px', marginBottom: '20px',
    },
    profileCard: (selected) => ({
      padding: '14px', borderRadius: '14px', cursor: 'pointer',
      background: selected ? 'rgba(155,89,182,0.2)' : 'rgba(255,255,255,0.03)',
      border: `2px solid ${selected ? '#9B59B6' : 'rgba(255,255,255,0.08)'}`,
      transition: 'all 0.2s ease',
    }),
    profileIcon: {
      fontFamily: 'monospace', fontSize: '1.4rem', fontWeight: '700',
      color: '#9B59B6', marginBottom: '6px',
    },
    profileLabel: {
      fontFamily: font, fontSize: '0.85rem', fontWeight: '700', color: 'white',
      marginBottom: '4px',
    },
    profileDesc: {
      fontFamily: font, fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)',
    },
    toggle: (active) => ({
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 16px', borderRadius: '12px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      marginBottom: '8px', cursor: 'pointer',
    }),
    toggleDot: (active) => ({
      width: '44px', height: '24px', borderRadius: '12px',
      background: active ? '#9B59B6' : 'rgba(255,255,255,0.15)',
      position: 'relative', transition: 'background 0.2s', flexShrink: 0,
    }),
    toggleCircle: (active) => ({
      width: '18px', height: '18px', borderRadius: '50%',
      background: 'white', position: 'absolute', top: '3px',
      left: active ? '22px' : '4px', transition: 'left 0.2s',
    }),
    toggleLabel: {
      fontFamily: font, fontSize: '0.85rem', fontWeight: '600', color: 'white',
    },
    toggleDesc: {
      fontFamily: font, fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)',
    },
    select: {
      padding: '8px 14px', borderRadius: '10px',
      border: '2px solid rgba(155,89,182,0.2)',
      background: 'rgba(255,255,255,0.05)',
      color: 'white', fontFamily: font, fontSize: '0.82rem',
      outline: 'none', cursor: 'pointer',
    },
    option: { background: '#1a1a2e', color: 'white' },
    saveBtn: {
      padding: '12px 30px', borderRadius: '12px', border: 'none',
      background: saved ? 'linear-gradient(135deg, #2ECC71, #27AE60)' : 'linear-gradient(135deg, #9B59B6, #8E44AD)',
      color: 'white', fontFamily: font, fontSize: '0.9rem', fontWeight: '700',
      cursor: 'pointer', width: '100%', marginTop: '15px',
      transition: 'background 0.3s',
    },
  }

  const Toggle = ({ active, label, desc, onChange }) => (
    <div style={s.toggle(active)} onClick={onChange}>
      <div>
        <div style={s.toggleLabel}>{label}</div>
        {desc && <div style={s.toggleDesc}>{desc}</div>}
      </div>
      <div style={s.toggleDot(active)}>
        <div style={s.toggleCircle(active)} />
      </div>
    </div>
  )

  return (
    <div>
      <div style={s.section}>
        <div style={s.sectionTitle}>Profil TND de {child.name}</div>
        <div style={s.profileGrid}>
          {TND_OPTIONS.map(opt => (
            <div key={opt.key} style={s.profileCard(accessibility.profiles.includes(opt.key))}
              onClick={() => toggleProfile(opt.key)}>
              <div style={s.profileIcon}>{opt.icon}</div>
              <div style={s.profileLabel}>{opt.label}</div>
              <div style={s.profileDesc}>{opt.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {accessibility.profiles.length > 0 && (
        <>
          <div style={s.section}>
            <div style={s.sectionTitle}>Affichage</div>
            <Toggle active={accessibility.adaptedFont} label="Police adaptee (OpenDyslexic)"
              desc="Police plus lisible pour la dyslexie"
              onChange={() => update('adaptedFont', !accessibility.adaptedFont)} />
            <Toggle active={accessibility.lineSpacing} label="Espacement augmente"
              desc="Plus d'espace entre les lignes et les lettres"
              onChange={() => update('lineSpacing', !accessibility.lineSpacing)} />
            <Toggle active={accessibility.highContrast} label="Contraste eleve"
              desc="Couleurs plus marquees pour une meilleure lisibilite"
              onChange={() => update('highContrast', !accessibility.highContrast)} />

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
              <span style={{ fontFamily: font, fontSize: '0.85rem', color: 'white', fontWeight: '600' }}>Taille du texte</span>
              <select style={s.select} value={accessibility.fontSize}
                onChange={(e) => update('fontSize', e.target.value)}>
                <option value="small" style={s.option}>Petit</option>
                <option value="normal" style={s.option}>Normal</option>
                <option value="large" style={s.option}>Grand</option>
                <option value="xlarge" style={s.option}>Tres grand</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontFamily: font, fontSize: '0.85rem', color: 'white', fontWeight: '600' }}>Fond teinte</span>
              <select style={s.select} value={accessibility.tintedBackground}
                onChange={(e) => update('tintedBackground', e.target.value)}>
                <option value="" style={s.option}>Aucun</option>
                <option value="beige" style={s.option}>Beige (dyslexie)</option>
                <option value="blue" style={s.option}>Bleu clair</option>
                <option value="green" style={s.option}>Vert clair</option>
              </select>
            </div>
          </div>

          <div style={s.section}>
            <div style={s.sectionTitle}>Comportement</div>
            <Toggle active={accessibility.reduceAnimations} label="Reduire les animations"
              desc="Desactive les transitions et effets"
              onChange={() => update('reduceAnimations', !accessibility.reduceAnimations)} />
            <Toggle active={accessibility.noConfetti} label="Pas de confettis"
              desc="Desactive l'animation de confettis sur bonne reponse"
              onChange={() => update('noConfetti', !accessibility.noConfetti)} />
            <Toggle active={accessibility.readAloud} label="Lecture audio des questions"
              desc="Les questions sont lues a voix haute automatiquement"
              onChange={() => update('readAloud', !accessibility.readAloud)} />
            <Toggle active={accessibility.highlightKeywords} label="Surligner les mots-cles"
              desc="Met en evidence les informations importantes"
              onChange={() => update('highlightKeywords', !accessibility.highlightKeywords)} />
            <Toggle active={accessibility.oneAtATime} label="Un exercice a la fois"
              desc="Affiche un seul exercice sans voir les suivants"
              onChange={() => update('oneAtATime', !accessibility.oneAtATime)} />
            <Toggle active={accessibility.noTimer} label="Pas de pression temporelle"
              desc="Aucun timer ni chronometre visible"
              onChange={() => update('noTimer', !accessibility.noTimer)} />
          </div>
        </>
      )}

      <button style={s.saveBtn} onClick={handleSave} disabled={saving}>
        {saving ? 'Enregistrement...' : saved ? 'Enregistre !' : 'Enregistrer les adaptations'}
      </button>
    </div>
  )
}

export { DEFAULT_ACCESSIBILITY }

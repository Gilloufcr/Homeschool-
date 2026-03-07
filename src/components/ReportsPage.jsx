import { useState, useEffect } from 'react'
import { getProgress, getProgressSummary, getChildren } from '../api'

const subjectLabels = {
  math: 'Mathematiques', french: 'Francais', history: 'Histoire',
  geography: 'Geographie', science: 'Sciences', english: 'Anglais',
}

const subjectColors = {
  math: '#2ECC71', french: '#5DADE2', history: '#E67E22',
  geography: '#9B59B6', science: '#F1C40F', english: '#E74C3C',
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatDateTime(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

function getDateRange(period) {
  const now = new Date()
  const to = now.toISOString()
  let from
  switch (period) {
    case 'week': from = new Date(now - 7 * 86400000).toISOString(); break
    case 'month': from = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).toISOString(); break
    case 'trimester': from = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()).toISOString(); break
    case 'year': from = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString(); break
    default: from = null
  }
  return { from, to }
}

export default function ReportsPage({ children: childrenProp }) {
  const [children, setChildren] = useState(childrenProp || [])
  const [selectedChild, setSelectedChild] = useState(null)
  const [period, setPeriod] = useState('month')
  const [subjectFilter, setSubjectFilter] = useState('')
  const [view, setView] = useState('summary') // summary | detail
  const [summary, setSummary] = useState(null)
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (childrenProp) setChildren(childrenProp)
  }, [childrenProp])

  useEffect(() => {
    if (children.length > 0 && !selectedChild) {
      setSelectedChild(children[0])
    }
  }, [children])

  useEffect(() => {
    if (selectedChild) loadReport()
  }, [selectedChild, period, subjectFilter])

  const loadReport = async () => {
    if (!selectedChild) return
    setLoading(true)
    try {
      const { from, to } = getDateRange(period)
      const filters = { from, to }
      if (subjectFilter) filters.subject = subjectFilter

      const [sumData, exData] = await Promise.all([
        getProgressSummary(selectedChild.id, { from, to }),
        getProgress(selectedChild.id, filters),
      ])
      setSummary(sumData)
      setExercises(exData.exercises || [])
    } catch (e) {
      console.error('Error loading report:', e)
    }
    setLoading(false)
  }

  const generatePDFReport = () => {
    const { from } = getDateRange(period)
    const periodLabel = { week: 'Semaine', month: 'Mois', trimester: 'Trimestre', year: 'Annee', all: 'Tout' }[period]
    const childName = selectedChild?.name || 'Enfant'
    const childGrade = selectedChild?.grade || ''

    const filteredExercises = subjectFilter
      ? exercises.filter(e => e.subject === subjectFilter)
      : exercises

    // Build HTML for printing
    let subjectSummaryHTML = ''
    if (summary?.subjects) {
      subjectSummaryHTML = Object.entries(summary.subjects).map(([subj, data]) => {
        const pct = data.total > 0 ? Math.round(data.correct / data.total * 100) : 0
        const avgTime = data.total > 0 ? Math.round(data.totalDuration / data.total) : 0
        return `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;">${subjectLabels[subj] || subj}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${data.total}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${data.correct}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;font-weight:700;color:${pct >= 70 ? '#27AE60' : pct >= 50 ? '#E67E22' : '#E74C3C'}">${pct}%</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${avgTime}s</td>
        </tr>`
      }).join('')
    }

    const exercisesHTML = filteredExercises.map(ex => `<tr>
      <td style="padding:6px 10px;border-bottom:1px solid #f0f0f0;font-size:0.85em;">${formatDateTime(ex.timestamp)}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #f0f0f0;font-size:0.85em;">${subjectLabels[ex.subject] || ex.subject}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #f0f0f0;font-size:0.85em;">${ex.question}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #f0f0f0;font-size:0.85em;font-weight:600;color:${ex.isCorrect ? '#27AE60' : '#E74C3C'}">${ex.givenAnswer}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #f0f0f0;font-size:0.85em;">${ex.correctAnswer}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #f0f0f0;text-align:center;">${ex.isCorrect ? '&#10003;' : '&#10007;'}</td>
    </tr>`).join('')

    const totalPct = summary?.total > 0 ? Math.round(summary.correct / summary.total * 100) : 0

    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<title>Rapport pedagogique - ${childName}</title>
<style>
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 40px; color: #333; }
  h1 { color: #2C3E50; border-bottom: 3px solid #9B59B6; padding-bottom: 10px; }
  h2 { color: #9B59B6; margin-top: 30px; }
  .header-info { display: flex; justify-content: space-between; margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; }
  .header-info div { }
  .header-info strong { color: #2C3E50; }
  .stat-box { display: inline-block; padding: 15px 25px; margin: 8px; background: white; border-radius: 12px; border: 2px solid #eee; text-align: center; }
  .stat-value { font-size: 1.8rem; font-weight: 800; color: #9B59B6; }
  .stat-label { font-size: 0.85rem; color: #888; margin-top: 4px; }
  table { width: 100%; border-collapse: collapse; margin-top: 10px; }
  th { background: #9B59B6; color: white; padding: 10px 12px; text-align: left; font-size: 0.85em; }
  .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #eee; font-size: 0.85em; color: #888; text-align: center; }
  @media print { body { margin: 20px; } .no-print { display: none; } }
</style>
</head><body>
<h1>Rapport Pedagogique - Instruction en Famille</h1>
<div class="header-info">
  <div><strong>Eleve :</strong> ${childName}</div>
  <div><strong>Niveau :</strong> ${childGrade}</div>
  <div><strong>Periode :</strong> ${periodLabel}${from ? ' (depuis le ' + formatDate(from) + ')' : ''}</div>
  <div><strong>Date du rapport :</strong> ${formatDate(new Date().toISOString())}</div>
</div>

<h2>Resume global</h2>
<div style="text-align:center;margin:20px 0;">
  <div class="stat-box"><div class="stat-value">${summary?.total || 0}</div><div class="stat-label">Exercices realises</div></div>
  <div class="stat-box"><div class="stat-value">${summary?.correct || 0}</div><div class="stat-label">Reponses correctes</div></div>
  <div class="stat-box"><div class="stat-value" style="color:${totalPct >= 70 ? '#27AE60' : totalPct >= 50 ? '#E67E22' : '#E74C3C'}">${totalPct}%</div><div class="stat-label">Taux de reussite</div></div>
</div>

<h2>Resultats par matiere</h2>
<table>
  <thead><tr>
    <th>Matiere</th><th style="text-align:center">Exercices</th><th style="text-align:center">Corrects</th><th style="text-align:center">Taux</th><th style="text-align:center">Temps moyen</th>
  </tr></thead>
  <tbody>${subjectSummaryHTML || '<tr><td colspan="5" style="padding:20px;text-align:center;color:#888;">Aucune donnee</td></tr>'}</tbody>
</table>

<h2>Detail des exercices (${filteredExercises.length})</h2>
<table>
  <thead><tr>
    <th>Date</th><th>Matiere</th><th>Question</th><th>Reponse donnee</th><th>Bonne reponse</th><th style="text-align:center">Resultat</th>
  </tr></thead>
  <tbody>${exercisesHTML || '<tr><td colspan="6" style="padding:20px;text-align:center;color:#888;">Aucun exercice</td></tr>'}</tbody>
</table>

<div class="footer">
  <p>Ce rapport a ete genere automatiquement par l'application HomeSchool - Instruction en Famille</p>
  <p>Conforme aux programmes officiels de l'Education Nationale francaise</p>
</div>
</body></html>`

    const printWindow = window.open('', '_blank')
    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => printWindow.print(), 500)
  }

  const font = "'Quicksand', sans-serif"

  const s = {
    container: { maxWidth: '900px', margin: '0 auto' },
    title: {
      fontFamily: font, fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
      fontWeight: '800', color: 'white', marginBottom: '20px',
    },
    filterRow: {
      display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center',
    },
    select: {
      padding: '10px 16px', borderRadius: '12px',
      border: '2px solid rgba(155,89,182,0.2)',
      background: 'rgba(255,255,255,0.05)',
      color: 'white', fontFamily: font, fontSize: '0.85rem', fontWeight: '600',
      outline: 'none', cursor: 'pointer',
    },
    option: { background: '#1a1a2e', color: 'white' },
    viewBtn: (active) => ({
      padding: '10px 20px', borderRadius: '12px', border: 'none',
      background: active ? 'linear-gradient(135deg, #9B59B6, #8E44AD)' : 'rgba(255,255,255,0.08)',
      color: active ? 'white' : 'rgba(255,255,255,0.5)',
      fontFamily: font, fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer',
    }),
    exportBtn: {
      padding: '10px 20px', borderRadius: '12px', border: 'none',
      background: 'linear-gradient(135deg, #E67E22, #D35400)',
      color: 'white', fontFamily: font, fontSize: '0.85rem', fontWeight: '700',
      cursor: 'pointer', marginLeft: 'auto',
    },
    card: {
      padding: '20px', borderRadius: '16px',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)', marginBottom: '15px',
    },
    statGrid: {
      display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: '12px', marginBottom: '20px',
    },
    statCard: {
      padding: '20px', borderRadius: '16px',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      textAlign: 'center',
    },
    statValue: (color) => ({
      fontFamily: font, fontSize: '1.8rem', fontWeight: '800', color: color || '#9B59B6',
    }),
    statLabel: {
      fontFamily: font, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)',
      marginTop: '4px', fontWeight: '600',
    },
    subjectRow: {
      display: 'flex', alignItems: 'center', padding: '14px 16px',
      borderRadius: '12px', background: 'rgba(255,255,255,0.03)',
      marginBottom: '8px', gap: '15px', flexWrap: 'wrap',
    },
    progressBar: (pct, color) => ({
      height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)',
      flex: 1, minWidth: '100px', position: 'relative', overflow: 'hidden',
    }),
    progressFill: (pct, color) => ({
      position: 'absolute', top: 0, left: 0, height: '100%',
      width: `${pct}%`, borderRadius: '4px',
      background: `linear-gradient(90deg, ${color}, ${color}aa)`,
      transition: 'width 0.5s ease',
    }),
    table: {
      width: '100%', borderCollapse: 'collapse',
    },
    th: {
      padding: '12px 14px', textAlign: 'left', fontFamily: font,
      fontSize: '0.8rem', fontWeight: '700', color: 'rgba(255,255,255,0.5)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
    },
    td: {
      padding: '10px 14px', fontFamily: font, fontSize: '0.85rem',
      color: 'rgba(255,255,255,0.8)', borderBottom: '1px solid rgba(255,255,255,0.05)',
    },
    empty: {
      textAlign: 'center', padding: '50px 20px',
      color: 'rgba(255,255,255,0.4)', fontFamily: font,
    },
  }

  const totalPct = summary?.total > 0 ? Math.round(summary.correct / summary.total * 100) : 0

  return (
    <div style={s.container}>
      <div style={s.title}>Rapports et suivi pedagogique</div>

      {/* Filters */}
      <div style={s.filterRow}>
        <select style={s.select} value={selectedChild?.id || ''}
          onChange={(e) => setSelectedChild(children.find(c => c.id === e.target.value))}>
          {children.map(c => (
            <option key={c.id} value={c.id} style={s.option}>{c.name} ({c.grade})</option>
          ))}
        </select>

        <select style={s.select} value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="week" style={s.option}>Cette semaine</option>
          <option value="month" style={s.option}>Ce mois</option>
          <option value="trimester" style={s.option}>Ce trimestre</option>
          <option value="year" style={s.option}>Cette annee</option>
          <option value="all" style={s.option}>Tout</option>
        </select>

        <select style={s.select} value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
          <option value="" style={s.option}>Toutes matieres</option>
          {Object.entries(subjectLabels).map(([k, v]) => (
            <option key={k} value={k} style={s.option}>{v}</option>
          ))}
        </select>

        <button style={s.viewBtn(view === 'summary')} onClick={() => setView('summary')}>Resume</button>
        <button style={s.viewBtn(view === 'detail')} onClick={() => setView('detail')}>Detail</button>

        <button style={s.exportBtn} onClick={generatePDFReport}>
          Exporter / Imprimer
        </button>
      </div>

      {loading && (
        <div style={s.empty}>Chargement...</div>
      )}

      {!loading && view === 'summary' && (
        <div>
          {/* Global stats */}
          <div style={s.statGrid}>
            <div style={s.statCard}>
              <div style={s.statValue('#9B59B6')}>{summary?.total || 0}</div>
              <div style={s.statLabel}>Exercices realises</div>
            </div>
            <div style={s.statCard}>
              <div style={s.statValue('#2ECC71')}>{summary?.correct || 0}</div>
              <div style={s.statLabel}>Reponses correctes</div>
            </div>
            <div style={s.statCard}>
              <div style={s.statValue(totalPct >= 70 ? '#2ECC71' : totalPct >= 50 ? '#E67E22' : '#E74C3C')}>
                {totalPct}%
              </div>
              <div style={s.statLabel}>Taux de reussite</div>
            </div>
            <div style={s.statCard}>
              <div style={s.statValue('#5DADE2')}>
                {summary?.byDate ? Object.keys(summary.byDate).length : 0}
              </div>
              <div style={s.statLabel}>Jours d'activite</div>
            </div>
          </div>

          {/* Per subject */}
          <div style={{ ...s.card, padding: '16px' }}>
            <div style={{ fontFamily: font, fontSize: '1rem', fontWeight: '700', color: 'white', marginBottom: '16px' }}>
              Resultats par matiere
            </div>
            {summary?.subjects && Object.keys(summary.subjects).length > 0 ? (
              Object.entries(summary.subjects).map(([subj, data]) => {
                const pct = data.total > 0 ? Math.round(data.correct / data.total * 100) : 0
                const color = subjectColors[subj] || '#9B59B6'
                const avgTime = data.total > 0 ? Math.round(data.totalDuration / data.total) : 0
                return (
                  <div key={subj} style={s.subjectRow}>
                    <div style={{ fontFamily: font, fontSize: '0.9rem', fontWeight: '700', color, minWidth: '110px' }}>
                      {subjectLabels[subj] || subj}
                    </div>
                    <div style={{ fontFamily: font, fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', minWidth: '80px' }}>
                      {data.correct}/{data.total}
                    </div>
                    <div style={s.progressBar(pct, color)}>
                      <div style={s.progressFill(pct, color)} />
                    </div>
                    <div style={{ fontFamily: font, fontSize: '0.9rem', fontWeight: '700', color, minWidth: '45px', textAlign: 'right' }}>
                      {pct}%
                    </div>
                    <div style={{ fontFamily: font, fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', minWidth: '50px' }}>
                      ~{avgTime}s/ex
                    </div>
                  </div>
                )
              })
            ) : (
              <div style={s.empty}>Aucune donnee pour cette periode</div>
            )}
          </div>

          {/* Activity by date */}
          {summary?.byDate && Object.keys(summary.byDate).length > 0 && (
            <div style={{ ...s.card, padding: '16px' }}>
              <div style={{ fontFamily: font, fontSize: '1rem', fontWeight: '700', color: 'white', marginBottom: '16px' }}>
                Activite par jour
              </div>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'flex-end', minHeight: '80px' }}>
                {Object.entries(summary.byDate).sort(([a], [b]) => a.localeCompare(b)).slice(-30).map(([date, data]) => {
                  const pct = data.total > 0 ? Math.round(data.correct / data.total * 100) : 0
                  const height = Math.max(8, data.total * 6)
                  return (
                    <div key={date} title={`${formatDate(date + 'T00:00:00')}: ${data.total} ex, ${pct}% correct`}
                      style={{
                        width: '14px', height: `${height}px`, borderRadius: '4px 4px 0 0',
                        background: `linear-gradient(180deg, ${pct >= 70 ? '#2ECC71' : pct >= 50 ? '#E67E22' : '#E74C3C'}, rgba(155,89,182,0.3))`,
                        cursor: 'pointer',
                      }}
                    />
                  )
                })}
              </div>
              <div style={{ fontFamily: font, fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '8px' }}>
                30 derniers jours d'activite (survoler pour details)
              </div>
            </div>
          )}
        </div>
      )}

      {!loading && view === 'detail' && (
        <div style={{ ...s.card, padding: '0', overflow: 'auto' }}>
          {exercises.length === 0 ? (
            <div style={s.empty}>Aucun exercice pour cette periode</div>
          ) : (
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Date</th>
                  <th style={s.th}>Matiere</th>
                  <th style={s.th}>Question</th>
                  <th style={s.th}>Reponse</th>
                  <th style={s.th}>Correcte</th>
                  <th style={{ ...s.th, textAlign: 'center' }}>Resultat</th>
                </tr>
              </thead>
              <tbody>
                {[...exercises].reverse().map((ex, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                    <td style={{ ...s.td, fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{formatDateTime(ex.timestamp)}</td>
                    <td style={{ ...s.td, color: subjectColors[ex.subject] || '#9B59B6', fontWeight: '600' }}>
                      {subjectLabels[ex.subject] || ex.subject}
                    </td>
                    <td style={{ ...s.td, maxWidth: '250px' }}>{ex.question}</td>
                    <td style={{ ...s.td, fontWeight: '600', color: ex.isCorrect ? '#2ECC71' : '#E74C3C' }}>
                      {ex.givenAnswer}
                    </td>
                    <td style={s.td}>{ex.correctAnswer}</td>
                    <td style={{ ...s.td, textAlign: 'center', fontSize: '1.1rem' }}>
                      {ex.isCorrect ? '✓' : '✗'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}

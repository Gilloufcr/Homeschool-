import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// ─── Data persistence (JSON files) ──────────────────────────────────
const DATA_DIR = join(__dirname, 'data')
const DATA_FILE = join(DATA_DIR, 'app-data.json')
const SHARED_FILE = join(DATA_DIR, 'shared-exercises.json')

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
}

function loadJSON(file, fallback) {
  if (!existsSync(file)) {
    ensureDir(dirname(file))
    writeFileSync(file, JSON.stringify(fallback, null, 2))
    return fallback
  }
  return JSON.parse(readFileSync(file, 'utf-8'))
}

function saveJSON(file, data) {
  ensureDir(dirname(file))
  writeFileSync(file, JSON.stringify(data, null, 2))
}

function loadData() {
  return loadJSON(DATA_FILE, { parentPin: '1234', children: [], customLessons: [] })
}

function saveData(data) {
  saveJSON(DATA_FILE, data)
}

// ─── Shared exercise cache ──────────────────────────────────────────
// Exercises are indexed by a normalized key: subject|grade|normalizedTopic
// This allows families to share exercises without sharing personal data

function loadSharedCache() {
  return loadJSON(SHARED_FILE, { exercises: [], stats: { totalGenerated: 0, tokensSaved: 0 } })
}

function saveSharedCache(cache) {
  saveJSON(SHARED_FILE, cache)
}

function normalizeKey(subject, grade, topic) {
  // Normalize: lowercase, trim, remove accents, collapse spaces
  const norm = topic.toLowerCase().trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
  return `${subject}|${grade}|${norm}`
}

function fuzzyMatch(query, text) {
  // Simple fuzzy: check if all query words appear in text
  const qWords = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/\s+/)
  const tNorm = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return qWords.every(w => tNorm.includes(w))
}

// ─── Auth middleware ─────────────────────────────────────────────────
function requireParent(req, res, next) {
  const pin = req.headers['x-parent-pin']
  const data = loadData()
  if (pin !== data.parentPin) {
    return res.status(401).json({ error: 'Code parent incorrect' })
  }
  next()
}

// ─── Family UUID ────────────────────────────────────────────────────
// Each family gets an anonymous UUID — no PII is stored in the shared DB
app.post('/api/family/register', (req, res) => {
  const familyId = crypto.randomUUID()
  res.json({ familyId })
})

// ─── Children management ────────────────────────────────────────────
app.get('/api/children', (req, res) => {
  const data = loadData()
  res.json(data.children.map(c => ({
    id: c.id,
    name: c.name,
    theme: c.theme,
    avatar: c.avatar,
    grade: c.grade || 'CM2',
  })))
})

app.post('/api/children', requireParent, (req, res) => {
  const { name, theme, avatar, grade } = req.body
  if (!name || !theme) {
    return res.status(400).json({ error: 'Nom et theme requis' })
  }
  const data = loadData()
  const child = {
    id: `child-${Date.now()}`,
    name,
    theme,
    avatar: avatar || (theme === 'minecraft' ? '⛏️' : '🦋'),
    grade: grade || 'CM2',
    createdAt: new Date().toISOString(),
  }
  data.children.push(child)
  saveData(data)
  res.json(child)
})

app.delete('/api/children/:id', requireParent, (req, res) => {
  const data = loadData()
  data.children = data.children.filter(c => c.id !== req.params.id)
  saveData(data)
  res.json({ ok: true })
})

// ─── Parent auth ────────────────────────────────────────────────────
app.post('/api/parent/login', (req, res) => {
  const { pin } = req.body
  const data = loadData()
  if (pin === data.parentPin) {
    res.json({ ok: true })
  } else {
    res.status(401).json({ error: 'Code incorrect' })
  }
})

app.post('/api/parent/change-pin', requireParent, (req, res) => {
  const { newPin } = req.body
  if (!newPin || newPin.length < 4) {
    return res.status(400).json({ error: 'Le code doit faire au moins 4 caracteres' })
  }
  const data = loadData()
  data.parentPin = newPin
  saveData(data)
  res.json({ ok: true })
})

// ─── Custom lessons management ──────────────────────────────────────
app.get('/api/lessons', (req, res) => {
  const data = loadData()
  res.json(data.customLessons || [])
})

app.post('/api/lessons', requireParent, (req, res) => {
  const { lesson } = req.body
  if (!lesson) {
    return res.status(400).json({ error: 'Lesson data required' })
  }
  const data = loadData()
  const newLesson = {
    ...lesson,
    id: `custom-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
  if (!data.customLessons) data.customLessons = []
  data.customLessons.push(newLesson)
  saveData(data)
  res.json(newLesson)
})

app.delete('/api/lessons/:id', requireParent, (req, res) => {
  const data = loadData()
  data.customLessons = (data.customLessons || []).filter(l => l.id !== req.params.id)
  saveData(data)
  res.json({ ok: true })
})

// ─── Shared exercise pool: Browse & Search ──────────────────────────
// Browse all shared exercises (no auth needed — it's community data)
app.get('/api/shared/browse', (req, res) => {
  const { subject, grade } = req.query
  const cache = loadSharedCache()
  let results = cache.exercises

  if (subject) {
    results = results.filter(e => e.subject === subject)
  }
  if (grade) {
    results = results.filter(e => e.grade === grade)
  }

  // Return summary info (no full exercise data to keep response light)
  res.json({
    exercises: results.map(e => ({
      id: e.id,
      subject: e.subject,
      grade: e.grade,
      topic: e.topic,
      name: e.name,
      description: e.description,
      exerciseCount: e.exercises?.length || 0,
      createdAt: e.createdAt,
      usedBy: e.usedBy || 0,
    })),
    stats: cache.stats,
  })
})

// Search shared exercises by topic (fuzzy match)
app.get('/api/shared/search', (req, res) => {
  const { subject, grade, topic } = req.query
  if (!subject || !grade || !topic) {
    return res.status(400).json({ error: 'subject, grade et topic requis' })
  }

  const cache = loadSharedCache()
  const key = normalizeKey(subject, grade, topic)

  // 1. Try exact key match
  let matches = cache.exercises.filter(e => normalizeKey(e.subject, e.grade, e.topic) === key)

  // 2. If no exact match, try fuzzy match on same subject+grade
  if (matches.length === 0) {
    matches = cache.exercises.filter(e =>
      e.subject === subject && e.grade === grade && fuzzyMatch(topic, e.topic)
    )
  }

  res.json({
    matches: matches.map(e => ({
      id: e.id,
      subject: e.subject,
      grade: e.grade,
      topic: e.topic,
      name: e.name,
      description: e.description,
      exerciseCount: e.exercises?.length || 0,
      createdAt: e.createdAt,
    })),
    exactMatch: matches.length > 0 && normalizeKey(matches[0].subject, matches[0].grade, matches[0].topic) === key,
  })
})

// Get full exercise data for a shared exercise (for importing)
app.get('/api/shared/:id', (req, res) => {
  const cache = loadSharedCache()
  const exercise = cache.exercises.find(e => e.id === req.params.id)
  if (!exercise) {
    return res.status(404).json({ error: 'Exercice non trouve' })
  }

  // Increment usage counter
  exercise.usedBy = (exercise.usedBy || 0) + 1
  saveSharedCache(cache)

  // Return full data (without family info)
  res.json({
    ...exercise,
    // Strip any accidental PII
    familyId: undefined,
  })
})

// ─── AI Content Generation with Shared Cache ────────────────────────
app.post('/api/generate', requireParent, async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({
      error: 'Cle API Anthropic non configuree. Ajoutez ANTHROPIC_API_KEY dans votre .env',
    })
  }

  const { subject, topic, level, count, childAge, existingQuestions, familyId } = req.body

  if (!subject || !topic) {
    return res.status(400).json({ error: 'Matiere et sujet requis' })
  }

  // ── Check shared cache first ──────────────────────────────────────
  const cache = loadSharedCache()
  const key = normalizeKey(subject, level || 'CM2', topic)
  const cached = cache.exercises.find(e => normalizeKey(e.subject, e.grade, e.topic) === key)

  if (cached) {
    // Cache hit! Return existing exercises — saves API tokens
    cached.usedBy = (cached.usedBy || 0) + 1
    cache.stats.tokensSaved = (cache.stats.tokensSaved || 0) + 1
    saveSharedCache(cache)

    console.log(`  Cache HIT for "${topic}" (${subject}/${level}) — token saved!`)

    return res.json({
      ...cached,
      fromCache: true,
      id: `gen-${subject}-${Date.now()}`, // New ID for this family's copy
    })
  }

  console.log(`  Cache MISS for "${topic}" (${subject}/${level}) — calling Claude API...`)

  // ── No cache hit → generate with AI ───────────────────────────────
  const anthropic = new Anthropic({ apiKey })

  // Build anti-redundancy section
  let antiRedundancy = ''
  if (existingQuestions && existingQuestions.length > 0) {
    antiRedundancy = `\n\nATTENTION ANTI-REDONDANCE : Voici les questions qui existent DEJA. Tu dois generer des questions DIFFERENTES, ni identiques ni des variations mineures :\n${existingQuestions.map(q => `- "${q}"`).join('\n')}\n`
  }

  const prompt = `Tu es un professeur francais expert en pedagogie, specialise dans l'instruction en famille (IEF) pour enfants de ${childAge || '10-12'} ans.

Tu generes des exercices pour une application d'apprentissage qui suit les PROGRAMMES OFFICIELS DE L'EDUCATION NATIONALE francaise.

MATIERE : ${subject}
THEME : "${topic}"
NIVEAU : ${level || 'CM2'}

CONSIGNES PEDAGOGIQUES :
- Exercices conformes au programme officiel du ${level || 'CM2'} de l'Education nationale
- Difficulte adaptee au niveau scolaire
- Progression : commence facile et augmente graduellement
- Explications claires et pedagogiques
- Vocabulaire adapte a l'age (${childAge || '10-12'} ans)
- Pour les maths : nombres et operations du programme ${level || 'CM2'}
- Pour le francais : regles et textes au programme ${level || 'CM2'}
- Pour histoire/geo/sciences : periodes et themes au programme ${level || 'CM2'}
${antiRedundancy}

Genere exactement ${count || 5} exercices.

IMPORTANT: Reponds UNIQUEMENT avec un JSON valide, sans texte avant ou apres :

{
  "levelName": "Nom du niveau",
  "levelNameMinecraft": "Nom style Minecraft aventure",
  "levelNameLalilo": "Nom style feerique/magique",
  "description": "Description courte du niveau",
  "exercises": [
    {
      "type": "choice",
      "question": "La question claire et precise",
      "answer": "La bonne reponse (texte exact d'une des options)",
      "options": ["option1", "option2", "option3", "option4"],
      "xp": 15,
      "explanation": "Explication pedagogique courte expliquant POURQUOI c'est la bonne reponse"
    }
  ]
}

Regles:
- 4 options plausibles par exercice (pas de reponses absurdes)
- "answer" = exactement l'une des options
- XP : 10 (facile) a 25 (difficile), varie la difficulte
- Questions en francais, pas d'accents dans le JSON
- Explications pedagogiques et encourageantes`

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].text
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return res.status(500).json({ error: 'Reponse IA invalide' })
    }

    const generated = JSON.parse(jsonMatch[0])
    const now = Date.now()

    // Build lesson object
    const lesson = {
      id: `gen-${subject}-${now}`,
      name: generated.levelName,
      nameMinecraft: generated.levelNameMinecraft,
      nameLalilo: generated.levelNameLalilo,
      description: generated.description,
      subject,
      grade: level || 'CM2',
      topic,
      minLevel: 1,
      isCustom: true,
      isAIGenerated: true,
      exercises: generated.exercises.map((ex, i) => ({
        ...ex,
        id: `gen-${subject}-${now}-${i}`,
        type: ex.type || 'choice',
      })),
    }

    // ── Save to shared cache (no PII — only exercise content) ───────
    const sharedEntry = {
      id: `shared-${subject}-${now}`,
      name: lesson.name,
      nameMinecraft: lesson.nameMinecraft,
      nameLalilo: lesson.nameLalilo,
      description: lesson.description,
      subject,
      grade: level || 'CM2',
      topic,
      exercises: lesson.exercises,
      createdAt: new Date().toISOString(),
      usedBy: 1,
    }

    cache.exercises.push(sharedEntry)
    cache.stats.totalGenerated = (cache.stats.totalGenerated || 0) + 1
    saveSharedCache(cache)

    console.log(`  Saved to shared cache: "${topic}" (${subject}/${level}) — ${lesson.exercises.length} exercises`)

    res.json({ ...lesson, fromCache: false })
  } catch (err) {
    console.error('AI generation error:', err)
    res.status(500).json({ error: `Erreur de generation: ${err.message}` })
  }
})

// ─── Shared pool stats ──────────────────────────────────────────────
app.get('/api/shared/stats', (req, res) => {
  const cache = loadSharedCache()
  const subjects = {}
  for (const ex of cache.exercises) {
    const key = ex.subject
    if (!subjects[key]) subjects[key] = { count: 0, grades: new Set() }
    subjects[key].count++
    subjects[key].grades.add(ex.grade)
  }

  res.json({
    totalExercises: cache.exercises.length,
    totalGenerated: cache.stats.totalGenerated || 0,
    tokensSaved: cache.stats.tokensSaved || 0,
    subjects: Object.fromEntries(
      Object.entries(subjects).map(([k, v]) => [k, { count: v.count, grades: [...v.grades] }])
    ),
  })
})

// ─── Serve frontend in production ───────────────────────────────────
const DIST_DIR = join(__dirname, 'dist')
if (existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR))
  // SPA fallback: serve index.html for any non-API route
  // Express 5 uses path-to-regexp v8 which requires named params
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api/')) {
      res.sendFile(join(DIST_DIR, 'index.html'))
    } else {
      next()
    }
  })
  console.log('   Serving frontend from dist/')
}

// ─── Start server ───────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🏫 HomeSchool API running on http://localhost:${PORT}`)
  console.log(`   Parent PIN par defaut: 1234`)
  const cache = loadSharedCache()
  console.log(`   📚 ${cache.exercises.length} exercice(s) dans le cache partage`)
  console.log(`   💰 ${cache.stats.tokensSaved || 0} token(s) API economise(s)`)
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log(`   ⚠️  ANTHROPIC_API_KEY non definie - la generation IA ne marchera pas`)
    console.log(`   Lancez: ANTHROPIC_API_KEY=sk-... node server.js`)
  }
})

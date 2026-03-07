import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex')

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
  return loadJSON(DATA_FILE, { families: [] })
}

function saveData(data) {
  saveJSON(DATA_FILE, data)
}

// ─── Migration: convert old PIN-based data to families format ────────
function migrateIfNeeded() {
  const data = loadData()
  if (data.parentPin && !data.families) {
    console.log('   Migrating old PIN-based data to families format...')
    const family = {
      id: crypto.randomUUID(),
      email: 'admin@homeschool.local',
      password: bcrypt.hashSync(data.parentPin, 10),
      name: 'Famille principale',
      children: data.children || [],
      customLessons: data.customLessons || [],
      createdAt: new Date().toISOString(),
    }
    const newData = { families: [family] }
    saveData(newData)
    console.log(`   Migration OK — email: ${family.email}, mot de passe: ancien PIN (${data.parentPin})`)
    return newData
  }
  if (!data.families) {
    data.families = []
    saveData(data)
  }
  return data
}

// ─── Privacy helpers ────────────────────────────────────────────────
// Hash family IDs for file names so progress files can't be linked to families
function hashFamilyId(familyId) {
  return crypto.createHash('sha256').update(familyId + (process.env.JWT_SECRET || 'salt')).digest('hex').slice(0, 16)
}

// Encrypt sensitive data (TND profiles) with family-scoped key
function encryptTND(data, familyId) {
  if (!data) return null
  const key = crypto.createHash('sha256').update(familyId + JWT_SECRET).digest()
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return iv.toString('hex') + ':' + encrypted
}

function decryptTND(encrypted, familyId) {
  if (!encrypted || typeof encrypted !== 'string' || !encrypted.includes(':')) return null
  try {
    const key = crypto.createHash('sha256').update(familyId + JWT_SECRET).digest()
    const [ivHex, data] = encrypted.split(':')
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(ivHex, 'hex'))
    let decrypted = decipher.update(data, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return JSON.parse(decrypted)
  } catch {
    return null
  }
}

// ─── Progress persistence (exercise results per family) ─────────────
function progressFile(familyId) {
  return join(DATA_DIR, `progress-${hashFamilyId(familyId)}.json`)
}

function loadProgress(familyId) {
  return loadJSON(progressFile(familyId), { children: {} })
}

function saveProgress(familyId, data) {
  saveJSON(progressFile(familyId), data)
}

// ─── Shared exercise cache ──────────────────────────────────────────
function loadSharedCache() {
  return loadJSON(SHARED_FILE, { exercises: [], stats: { totalGenerated: 0, tokensSaved: 0 } })
}

function saveSharedCache(cache) {
  saveJSON(SHARED_FILE, cache)
}

function normalizeKey(subject, grade, topic) {
  const norm = topic.toLowerCase().trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
  return `${subject}|${grade}|${norm}`
}

function fuzzyMatch(query, text) {
  const qWords = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/\s+/)
  const tNorm = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return qWords.every(w => tNorm.includes(w))
}

// ─── JWT Auth middleware ─────────────────────────────────────────────
function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization']
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token requis' })
  }
  try {
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET)
    req.familyId = decoded.familyId
    req.familyEmail = decoded.email
    next()
  } catch {
    return res.status(401).json({ error: 'Token invalide ou expire' })
  }
}

// Helper to get family from request
function getFamily(req) {
  const data = loadData()
  return data.families.find(f => f.id === req.familyId)
}

function saveFamilyUpdate(family) {
  const data = loadData()
  const idx = data.families.findIndex(f => f.id === family.id)
  if (idx >= 0) {
    data.families[idx] = family
    saveData(data)
  }
}

// ─── Auth endpoints ─────────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' })
  }
  if (password.length < 4) {
    return res.status(400).json({ error: 'Le mot de passe doit faire au moins 4 caracteres' })
  }

  const data = loadData()
  const existing = data.families.find(f => f.email.toLowerCase() === email.toLowerCase())
  if (existing) {
    return res.status(409).json({ error: 'Un compte existe deja avec cet email' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const family = {
    id: crypto.randomUUID(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    name: name || `Famille ${email.split('@')[0]}`,
    children: [],
    customLessons: [],
    createdAt: new Date().toISOString(),
  }

  data.families.push(family)
  saveData(data)

  const token = jwt.sign(
    { familyId: family.id, email: family.email },
    JWT_SECRET,
    { expiresIn: '30d' }
  )

  console.log(`   Nouveau compte: ${family.email}`)
  res.json({
    token,
    family: { id: family.id, email: family.email, name: family.name },
  })
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' })
  }

  const data = loadData()
  const family = data.families.find(f => f.email.toLowerCase() === email.toLowerCase())
  if (!family) {
    return res.status(401).json({ error: 'Email ou mot de passe incorrect' })
  }

  const valid = await bcrypt.compare(password, family.password)
  if (!valid) {
    return res.status(401).json({ error: 'Email ou mot de passe incorrect' })
  }

  const token = jwt.sign(
    { familyId: family.id, email: family.email },
    JWT_SECRET,
    { expiresIn: '30d' }
  )

  res.json({
    token,
    family: { id: family.id, email: family.email, name: family.name },
  })
})

// Get current family info
app.get('/api/auth/me', requireAuth, (req, res) => {
  const family = getFamily(req)
  if (!family) return res.status(404).json({ error: 'Famille non trouvee' })
  res.json({
    id: family.id,
    email: family.email,
    name: family.name,
    childrenCount: family.children.length,
    lessonsCount: (family.customLessons || []).length,
  })
})

// Update family settings
app.put('/api/auth/settings', requireAuth, async (req, res) => {
  const { name, currentPassword, newPassword } = req.body
  const family = getFamily(req)
  if (!family) return res.status(404).json({ error: 'Famille non trouvee' })

  if (name) {
    family.name = name
  }

  if (newPassword) {
    if (!currentPassword) {
      return res.status(400).json({ error: 'Mot de passe actuel requis' })
    }
    const valid = await bcrypt.compare(currentPassword, family.password)
    if (!valid) {
      return res.status(401).json({ error: 'Mot de passe actuel incorrect' })
    }
    if (newPassword.length < 4) {
      return res.status(400).json({ error: 'Le nouveau mot de passe doit faire au moins 4 caracteres' })
    }
    family.password = await bcrypt.hash(newPassword, 10)
  }

  saveFamilyUpdate(family)
  res.json({ ok: true, name: family.name })
})

// ─── Children management (family-scoped) ────────────────────────────
app.get('/api/children', requireAuth, (req, res) => {
  const family = getFamily(req)
  if (!family) return res.status(404).json({ error: 'Famille non trouvee' })
  res.json(family.children.map(c => ({
    id: c.id,
    name: c.name,
    theme: c.theme,
    avatar: c.avatar,
    grade: c.grade || 'CM2',
    accessibility: decryptTND(c._encryptedAccessibility, req.familyId) || null,
  })))
})

app.post('/api/children', requireAuth, (req, res) => {
  const { name, theme, avatar, grade } = req.body
  if (!name || !theme) {
    return res.status(400).json({ error: 'Nom et theme requis' })
  }
  const family = getFamily(req)
  if (!family) return res.status(404).json({ error: 'Famille non trouvee' })

  const child = {
    id: `child-${Date.now()}`,
    name,
    theme,
    avatar: avatar || (theme === 'minecraft' ? '⛏️' : '🦋'),
    grade: grade || 'CM2',
    createdAt: new Date().toISOString(),
  }
  family.children.push(child)
  saveFamilyUpdate(family)
  res.json(child)
})

app.delete('/api/children/:id', requireAuth, (req, res) => {
  const family = getFamily(req)
  if (!family) return res.status(404).json({ error: 'Famille non trouvee' })
  family.children = family.children.filter(c => c.id !== req.params.id)
  saveFamilyUpdate(family)
  res.json({ ok: true })
})

// ─── Update child profile (TND / accessibility) ─────────────────────
app.put('/api/children/:id', requireAuth, (req, res) => {
  const family = getFamily(req)
  if (!family) return res.status(404).json({ error: 'Famille non trouvee' })
  const child = family.children.find(c => c.id === req.params.id)
  if (!child) return res.status(404).json({ error: 'Enfant non trouve' })

  const { name, theme, avatar, grade, accessibility } = req.body
  if (name !== undefined) child.name = name
  if (theme !== undefined) child.theme = theme
  if (avatar !== undefined) child.avatar = avatar
  if (grade !== undefined) child.grade = grade
  if (accessibility !== undefined) {
    // Store encrypted - never in plain text in the database
    child._encryptedAccessibility = encryptTND(accessibility, req.familyId)
    // Remove any legacy plain-text field
    delete child.accessibility
  }

  saveFamilyUpdate(family)
  // Return decrypted data only to the authenticated family
  res.json({
    id: child.id, name: child.name, theme: child.theme,
    avatar: child.avatar, grade: child.grade,
    accessibility: decryptTND(child._encryptedAccessibility, req.familyId),
  })
})

// ─── Progress tracking (exercise results) ────────────────────────────
app.post('/api/progress/exercise', requireAuth, (req, res) => {
  const { childId, exerciseId, subject, grade, question, givenAnswer, correctAnswer, isCorrect, duration, levelName } = req.body
  if (!childId || !exerciseId) {
    return res.status(400).json({ error: 'childId et exerciseId requis' })
  }

  const progress = loadProgress(req.familyId)
  if (!progress.children[childId]) {
    progress.children[childId] = { exercises: [] }
  }

  progress.children[childId].exercises.push({
    exerciseId,
    subject: subject || 'unknown',
    grade: grade || '',
    question: question || '',
    givenAnswer: String(givenAnswer ?? ''),
    correctAnswer: String(correctAnswer ?? ''),
    isCorrect: !!isCorrect,
    duration: duration || 0,
    levelName: levelName || '',
    timestamp: new Date().toISOString(),
  })

  saveProgress(req.familyId, progress)
  res.json({ ok: true })
})

app.get('/api/progress/:childId', requireAuth, (req, res) => {
  const progress = loadProgress(req.familyId)
  const childData = progress.children[req.params.childId]
  if (!childData) return res.json({ exercises: [] })

  const { subject, from, to } = req.query
  let exercises = childData.exercises

  if (subject) exercises = exercises.filter(e => e.subject === subject)
  if (from) exercises = exercises.filter(e => e.timestamp >= from)
  if (to) exercises = exercises.filter(e => e.timestamp <= to)

  res.json({ exercises })
})

app.get('/api/progress/:childId/summary', requireAuth, (req, res) => {
  const progress = loadProgress(req.familyId)
  const childData = progress.children[req.params.childId]
  if (!childData) {
    return res.json({ total: 0, correct: 0, subjects: {}, byDate: {} })
  }

  const { from, to } = req.query
  let exercises = childData.exercises
  if (from) exercises = exercises.filter(e => e.timestamp >= from)
  if (to) exercises = exercises.filter(e => e.timestamp <= to)

  const subjects = {}
  const byDate = {}

  for (const ex of exercises) {
    // Per subject
    if (!subjects[ex.subject]) {
      subjects[ex.subject] = { total: 0, correct: 0, totalDuration: 0 }
    }
    subjects[ex.subject].total++
    if (ex.isCorrect) subjects[ex.subject].correct++
    subjects[ex.subject].totalDuration += ex.duration || 0

    // Per date
    const date = ex.timestamp.split('T')[0]
    if (!byDate[date]) byDate[date] = { total: 0, correct: 0 }
    byDate[date].total++
    if (ex.isCorrect) byDate[date].correct++
  }

  res.json({
    total: exercises.length,
    correct: exercises.filter(e => e.isCorrect).length,
    subjects,
    byDate,
  })
})

// ─── Custom lessons management (family-scoped) ──────────────────────
app.get('/api/lessons', requireAuth, (req, res) => {
  const family = getFamily(req)
  if (!family) return res.status(404).json({ error: 'Famille non trouvee' })
  res.json(family.customLessons || [])
})

app.post('/api/lessons', requireAuth, (req, res) => {
  const { lesson } = req.body
  if (!lesson) {
    return res.status(400).json({ error: 'Lesson data required' })
  }
  const family = getFamily(req)
  if (!family) return res.status(404).json({ error: 'Famille non trouvee' })

  const newLesson = {
    ...lesson,
    id: `custom-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
  if (!family.customLessons) family.customLessons = []
  family.customLessons.push(newLesson)
  saveFamilyUpdate(family)
  res.json(newLesson)
})

app.delete('/api/lessons/:id', requireAuth, (req, res) => {
  const family = getFamily(req)
  if (!family) return res.status(404).json({ error: 'Famille non trouvee' })
  family.customLessons = (family.customLessons || []).filter(l => l.id !== req.params.id)
  saveFamilyUpdate(family)
  res.json({ ok: true })
})

// ─── Shared exercise pool: Browse & Search ──────────────────────────
app.get('/api/shared/browse', (req, res) => {
  const { subject, grade, adaptation } = req.query
  const cache = loadSharedCache()
  let results = cache.exercises

  if (subject) results = results.filter(e => e.subject === subject)
  if (grade) results = results.filter(e => e.grade === grade)
  // Filter by anonymous adaptation tag (e.g. ?adaptation=dyslexia)
  if (adaptation) results = results.filter(e => e.adaptations && e.adaptations.includes(adaptation))

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
      // Expose anonymous adaptation tags (no personal data)
      adaptations: e.adaptations || [],
    })),
    stats: cache.stats,
  })
})

app.get('/api/shared/search', (req, res) => {
  const { subject, grade, topic } = req.query
  if (!subject || !grade || !topic) {
    return res.status(400).json({ error: 'subject, grade et topic requis' })
  }

  const cache = loadSharedCache()
  const key = normalizeKey(subject, grade, topic)

  let matches = cache.exercises.filter(e => normalizeKey(e.subject, e.grade, e.topic) === key)
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

app.get('/api/shared/:id', (req, res) => {
  const cache = loadSharedCache()
  const exercise = cache.exercises.find(e => e.id === req.params.id)
  if (!exercise) {
    return res.status(404).json({ error: 'Exercice non trouve' })
  }
  exercise.usedBy = (exercise.usedBy || 0) + 1
  saveSharedCache(cache)
  res.json({ ...exercise, familyId: undefined })
})

// ─── AI Content Generation with Shared Cache ────────────────────────
app.post('/api/generate', requireAuth, async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({
      error: 'Cle API Anthropic non configuree. Ajoutez ANTHROPIC_API_KEY dans votre .env',
    })
  }

  const { subject, topic, level, count, childAge, existingQuestions, accessibilityProfiles } = req.body

  if (!subject || !topic) {
    return res.status(400).json({ error: 'Matiere et sujet requis' })
  }

  const cache = loadSharedCache()
  const key = normalizeKey(subject, level || 'CM2', topic)
  const cached = cache.exercises.find(e => normalizeKey(e.subject, e.grade, e.topic) === key)

  if (cached) {
    cached.usedBy = (cached.usedBy || 0) + 1
    cache.stats.tokensSaved = (cache.stats.tokensSaved || 0) + 1
    saveSharedCache(cache)
    console.log(`  Cache HIT for "${topic}" (${subject}/${level})`)
    return res.json({
      ...cached,
      fromCache: true,
      id: `gen-${subject}-${Date.now()}`,
    })
  }

  console.log(`  Cache MISS for "${topic}" (${subject}/${level}) — calling Claude API...`)

  const anthropic = new Anthropic({ apiKey })

  let antiRedundancy = ''
  if (existingQuestions && existingQuestions.length > 0) {
    antiRedundancy = `\n\nATTENTION ANTI-REDONDANCE : Voici les questions qui existent DEJA. Tu dois generer des questions DIFFERENTES :\n${existingQuestions.map(q => `- "${q}"`).join('\n')}\n`
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
      "explanation": "Explication pedagogique courte"
    }
  ]
}

Regles:
- 4 options plausibles par exercice
- "answer" = exactement l'une des options
- XP : 10 (facile) a 25 (difficile)
- Questions en francais
- Explications pedagogiques et encourageantes${accessibilityProfiles && accessibilityProfiles.length > 0 ? `

ADAPTATIONS TND REQUISES (${accessibilityProfiles.join(', ')}) :
${accessibilityProfiles.includes('dyslexia') ? '- Questions courtes avec vocabulaire simple, eviter les mots complexes\n- Phrases simples (sujet-verbe-complement)\n' : ''}${accessibilityProfiles.includes('dyscalculia') ? '- Utiliser des nombres simples et des contextes concrets\n- Proposer des etapes intermediaires dans les calculs\n' : ''}${accessibilityProfiles.includes('adhd') ? '- Questions tres courtes et directes\n- Un seul concept par question\n- Encouragements dans les explications\n' : ''}${accessibilityProfiles.includes('autism') ? '- Instructions tres explicites et sans ambiguite\n- Eviter les expressions figurees ou le second degre\n- Structure previsible pour chaque question\n' : ''}${accessibilityProfiles.includes('dyspraxia') ? '- Options de reponse courtes (1-3 mots max)\n- Texte des questions court et clair\n' : ''}` : ''}`

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

    // Shared cache entry: NEVER store personal data, family IDs, or identifiable TND profiles
    // Only store anonymous adaptation tags so other families can find adapted exercises
    const adaptationTags = (accessibilityProfiles && accessibilityProfiles.length > 0)
      ? [...accessibilityProfiles].sort() // anonymous: just which adaptations, no who
      : []

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
      // Anonymous adaptation metadata (no personal data, no family link)
      ...(adaptationTags.length > 0 ? { adaptations: adaptationTags } : {}),
    }

    cache.exercises.push(sharedEntry)
    cache.stats.totalGenerated = (cache.stats.totalGenerated || 0) + 1
    saveSharedCache(cache)

    // Log without any personal or TND data
    console.log(`  Saved to shared cache: "${topic}" (${subject}/${level})`)
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
  migrateIfNeeded()
  console.log(`🏫 HomeSchool API running on http://localhost:${PORT}`)
  const data = loadData()
  console.log(`   ${data.families.length} famille(s) enregistree(s)`)
  const cache = loadSharedCache()
  console.log(`   ${cache.exercises.length} exercice(s) dans le cache partage`)
  console.log(`   ${cache.stats.tokensSaved || 0} token(s) API economise(s)`)
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log(`   ANTHROPIC_API_KEY non definie - la generation IA ne marchera pas`)
  }
})

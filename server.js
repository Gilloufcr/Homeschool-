import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db, stmts, migrateFromJSON } from './database.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex')

app.use(cors())
app.use(express.json())

// ─── Anti-bot protection ────────────────────────────────────────────
// Rate limiter: max attempts per IP within a time window
function createRateLimiter(maxAttempts, windowMs) {
  const attempts = new Map()
  // Cleanup expired entries every 5 minutes
  setInterval(() => {
    const now = Date.now()
    for (const [ip, data] of attempts) {
      if (now - data.firstAttempt > windowMs) attempts.delete(ip)
    }
  }, 5 * 60 * 1000).unref()

  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip
    const now = Date.now()
    const data = attempts.get(ip)

    if (!data || now - data.firstAttempt > windowMs) {
      attempts.set(ip, { count: 1, firstAttempt: now })
      return next()
    }

    if (data.count >= maxAttempts) {
      const retryAfter = Math.ceil((windowMs - (now - data.firstAttempt)) / 1000)
      return res.status(429).json({
        error: `Trop de tentatives. Reessayez dans ${Math.ceil(retryAfter / 60)} minute(s).`,
      })
    }

    data.count++
    next()
  }
}

// 3 registrations per IP per 15 minutes
const registerLimiter = createRateLimiter(3, 15 * 60 * 1000)
// 10 login attempts per IP per 15 minutes
const loginLimiter = createRateLimiter(10, 15 * 60 * 1000)

// ─── Privacy helpers ────────────────────────────────────────────────
function hashFamilyId(familyId) {
  return crypto.createHash('sha256').update(familyId + (process.env.JWT_SECRET || 'salt')).digest('hex').slice(0, 16)
}

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

// ─── Shared cache helpers ───────────────────────────────────────────
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

// ─── Auth endpoints ─────────────────────────────────────────────────
app.post('/api/auth/register', registerLimiter, async (req, res) => {
  const { email, password, name, website, _formTs } = req.body

  // Honeypot: invisible "website" field — bots fill it, humans don't
  if (website) {
    // Silently reject (don't reveal it's a bot trap)
    return res.status(400).json({ error: 'Email et mot de passe requis' })
  }

  // Timing check: form must take at least 2 seconds to fill
  if (_formTs && (Date.now() - _formTs) < 2000) {
    return res.status(400).json({ error: 'Veuillez patienter avant de soumettre' })
  }

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' })
  }

  // Basic email format validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Format email invalide' })
  }

  if (password.length < 4) {
    return res.status(400).json({ error: 'Le mot de passe doit faire au moins 4 caracteres' })
  }

  const existing = stmts.findFamilyByEmail.get(email.toLowerCase())
  if (existing) {
    return res.status(409).json({ error: 'Un compte existe deja avec cet email' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  const familyName = name || `Famille ${email.split('@')[0]}`

  stmts.insertFamily.run(id, email.toLowerCase().trim(), hashedPassword, familyName, now)

  const token = jwt.sign({ familyId: id, email: email.toLowerCase() }, JWT_SECRET, { expiresIn: '30d' })
  console.log(`   Nouveau compte: ${email}`)
  res.json({ token, family: { id, email: email.toLowerCase(), name: familyName } })
})

app.post('/api/auth/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' })
  }

  const family = stmts.findFamilyByEmail.get(email.toLowerCase())
  if (!family) {
    return res.status(401).json({ error: 'Email ou mot de passe incorrect' })
  }

  const valid = await bcrypt.compare(password, family.password)
  if (!valid) {
    return res.status(401).json({ error: 'Email ou mot de passe incorrect' })
  }

  const token = jwt.sign({ familyId: family.id, email: family.email }, JWT_SECRET, { expiresIn: '30d' })
  res.json({ token, family: { id: family.id, email: family.email, name: family.name } })
})

app.get('/api/auth/me', requireAuth, (req, res) => {
  const family = stmts.findFamilyById.get(req.familyId)
  if (!family) return res.status(404).json({ error: 'Famille non trouvee' })

  const childrenCount = stmts.getChildren.all(req.familyId).length
  const lessonsCount = stmts.getLessons.all(req.familyId).length

  res.json({
    id: family.id,
    email: family.email,
    name: family.name,
    childrenCount,
    lessonsCount,
  })
})

app.put('/api/auth/settings', requireAuth, async (req, res) => {
  const { name, currentPassword, newPassword } = req.body
  const family = stmts.findFamilyById.get(req.familyId)
  if (!family) return res.status(404).json({ error: 'Famille non trouvee' })

  if (name) {
    stmts.updateFamilyName.run(name, req.familyId)
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
    const hashed = await bcrypt.hash(newPassword, 10)
    stmts.updateFamilyPassword.run(hashed, req.familyId)
  }

  res.json({ ok: true, name: name || family.name })
})

// ─── Children management (family-scoped) ────────────────────────────
app.get('/api/children', requireAuth, (req, res) => {
  const children = stmts.getChildren.all(req.familyId)
  res.json(children.map(c => ({
    id: c.id,
    name: c.name,
    theme: c.theme,
    avatar: c.avatar,
    grade: c.grade || 'CM2',
    accessibility: decryptTND(c.encrypted_accessibility, req.familyId) || null,
  })))
})

app.post('/api/children', requireAuth, (req, res) => {
  const { name, theme, avatar, grade } = req.body
  if (!name || !theme) {
    return res.status(400).json({ error: 'Nom et theme requis' })
  }

  const id = `child-${Date.now()}`
  const now = new Date().toISOString()
  const childAvatar = avatar || (theme === 'minecraft' ? '⛏️' : '🦋')
  const childGrade = grade || 'CM2'

  stmts.insertChild.run(id, req.familyId, name, theme, childAvatar, childGrade, now)
  res.json({ id, name, theme, avatar: childAvatar, grade: childGrade, createdAt: now })
})

app.delete('/api/children/:id', requireAuth, (req, res) => {
  stmts.deleteChild.run(req.params.id, req.familyId)
  res.json({ ok: true })
})

app.put('/api/children/:id', requireAuth, (req, res) => {
  const child = stmts.findChild.get(req.params.id, req.familyId)
  if (!child) return res.status(404).json({ error: 'Enfant non trouve' })

  const { name, theme, avatar, grade, accessibility } = req.body
  const newName = name !== undefined ? name : child.name
  const newTheme = theme !== undefined ? theme : child.theme
  const newAvatar = avatar !== undefined ? avatar : child.avatar
  const newGrade = grade !== undefined ? grade : child.grade
  const newEncrypted = accessibility !== undefined
    ? encryptTND(accessibility, req.familyId)
    : child.encrypted_accessibility

  stmts.updateChild.run(newName, newTheme, newAvatar, newGrade, newEncrypted, req.params.id, req.familyId)

  res.json({
    id: child.id, name: newName, theme: newTheme,
    avatar: newAvatar, grade: newGrade,
    accessibility: decryptTND(newEncrypted, req.familyId),
  })
})

// ─── Progress tracking (exercise results) ────────────────────────────
app.post('/api/progress/exercise', requireAuth, (req, res) => {
  const { childId, exerciseId, subject, grade, question, givenAnswer, correctAnswer, isCorrect, duration, levelName } = req.body
  if (!childId || !exerciseId) {
    return res.status(400).json({ error: 'childId et exerciseId requis' })
  }

  const familyHash = hashFamilyId(req.familyId)
  stmts.insertProgress.run(
    familyHash, childId, exerciseId,
    subject || 'unknown', grade || '', question || '',
    String(givenAnswer ?? ''), String(correctAnswer ?? ''),
    isCorrect ? 1 : 0, duration || 0,
    levelName || '', new Date().toISOString()
  )

  res.json({ ok: true })
})

app.get('/api/progress/:childId', requireAuth, (req, res) => {
  const familyHash = hashFamilyId(req.familyId)
  const { subject, from, to } = req.query

  const rows = stmts.getProgressFiltered.all(
    familyHash, req.params.childId,
    subject || null, subject || null,
    from || null, from || null,
    to || null, to || null
  )

  res.json({
    exercises: rows.map(r => ({
      exerciseId: r.exercise_id,
      subject: r.subject,
      grade: r.grade,
      question: r.question,
      givenAnswer: r.given_answer,
      correctAnswer: r.correct_answer,
      isCorrect: !!r.is_correct,
      duration: r.duration,
      levelName: r.level_name,
      timestamp: r.timestamp,
    }))
  })
})

app.get('/api/progress/:childId/summary', requireAuth, (req, res) => {
  const familyHash = hashFamilyId(req.familyId)
  const { from, to } = req.query

  const rows = stmts.getProgressFiltered.all(
    familyHash, req.params.childId,
    null, null,
    from || null, from || null,
    to || null, to || null
  )

  const subjects = {}
  const byDate = {}

  for (const ex of rows) {
    if (!subjects[ex.subject]) {
      subjects[ex.subject] = { total: 0, correct: 0, totalDuration: 0 }
    }
    subjects[ex.subject].total++
    if (ex.is_correct) subjects[ex.subject].correct++
    subjects[ex.subject].totalDuration += ex.duration || 0

    const date = ex.timestamp.split('T')[0]
    if (!byDate[date]) byDate[date] = { total: 0, correct: 0 }
    byDate[date].total++
    if (ex.is_correct) byDate[date].correct++
  }

  res.json({
    total: rows.length,
    correct: rows.filter(e => e.is_correct).length,
    subjects,
    byDate,
  })
})

// ─── Custom lessons management (family-scoped) ──────────────────────
app.get('/api/lessons', requireAuth, (req, res) => {
  const lessons = stmts.getLessons.all(req.familyId)
  res.json(lessons.map(l => JSON.parse(l.data_json)))
})

app.post('/api/lessons', requireAuth, (req, res) => {
  const { lesson } = req.body
  if (!lesson) {
    return res.status(400).json({ error: 'Lesson data required' })
  }

  const newLesson = {
    ...lesson,
    id: `custom-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }

  stmts.insertLesson.run(newLesson.id, req.familyId, JSON.stringify(newLesson), newLesson.createdAt)
  res.json(newLesson)
})

app.delete('/api/lessons/:id', requireAuth, (req, res) => {
  stmts.deleteLesson.run(req.params.id, req.familyId)
  res.json({ ok: true })
})

// ─── Shared exercise pool: Browse & Search ──────────────────────────
app.get('/api/shared/browse', (req, res) => {
  const { subject, grade, adaptation } = req.query
  let all = stmts.getAllShared.all()

  if (subject) all = all.filter(e => e.subject === subject)
  if (grade) all = all.filter(e => e.grade === grade)
  if (adaptation) {
    all = all.filter(e => {
      const adaptations = JSON.parse(e.adaptations_json || '[]')
      return adaptations.includes(adaptation)
    })
  }

  const totalGenerated = stmts.getStat.get('totalGenerated')?.value || 0
  const tokensSaved = stmts.getStat.get('tokensSaved')?.value || 0

  res.json({
    exercises: all.map(e => ({
      id: e.id,
      subject: e.subject,
      grade: e.grade,
      topic: e.topic,
      name: e.name,
      description: e.description,
      exerciseCount: JSON.parse(e.exercises_json || '[]').length,
      createdAt: e.created_at,
      usedBy: e.used_by || 0,
      adaptations: JSON.parse(e.adaptations_json || '[]'),
    })),
    stats: { totalGenerated, tokensSaved },
  })
})

app.get('/api/shared/search', (req, res) => {
  const { subject, grade, topic } = req.query
  if (!subject || !grade || !topic) {
    return res.status(400).json({ error: 'subject, grade et topic requis' })
  }

  const all = stmts.getAllShared.all()
  const key = normalizeKey(subject, grade, topic)

  let matches = all.filter(e => normalizeKey(e.subject, e.grade, e.topic) === key)
  if (matches.length === 0) {
    matches = all.filter(e =>
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
      exerciseCount: JSON.parse(e.exercises_json || '[]').length,
      createdAt: e.created_at,
    })),
    exactMatch: matches.length > 0 && normalizeKey(matches[0].subject, matches[0].grade, matches[0].topic) === key,
  })
})

app.get('/api/shared/:id', (req, res) => {
  const exercise = stmts.getSharedById.get(req.params.id)
  if (!exercise) {
    return res.status(404).json({ error: 'Exercice non trouve' })
  }
  stmts.incrementSharedUsage.run(req.params.id)

  res.json({
    id: exercise.id,
    subject: exercise.subject,
    grade: exercise.grade,
    topic: exercise.topic,
    name: exercise.name,
    nameMinecraft: exercise.name_minecraft,
    nameLalilo: exercise.name_lalilo,
    description: exercise.description,
    exercises: JSON.parse(exercise.exercises_json || '[]'),
    usedBy: (exercise.used_by || 0) + 1,
    createdAt: exercise.created_at,
    adaptations: JSON.parse(exercise.adaptations_json || '[]'),
  })
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

  // Check shared cache
  const all = stmts.getAllShared.all()
  const key = normalizeKey(subject, level || 'CM2', topic)
  const cached = all.find(e => normalizeKey(e.subject, e.grade, e.topic) === key)

  if (cached) {
    stmts.incrementSharedUsage.run(cached.id)
    stmts.incrementStat.run('tokensSaved')
    console.log(`  Cache HIT for "${topic}" (${subject}/${level})`)

    const exercises = JSON.parse(cached.exercises_json || '[]')
    return res.json({
      id: `gen-${subject}-${Date.now()}`,
      name: cached.name,
      nameMinecraft: cached.name_minecraft,
      nameLalilo: cached.name_lalilo,
      description: cached.description,
      subject: cached.subject,
      grade: cached.grade,
      topic: cached.topic,
      exercises,
      fromCache: true,
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

    // Anonymous adaptation tags for shared cache (no personal data)
    const adaptationTags = (accessibilityProfiles && accessibilityProfiles.length > 0)
      ? [...accessibilityProfiles].sort()
      : []

    const sharedId = `shared-${subject}-${now}`
    stmts.insertShared.run(
      sharedId, subject, level || 'CM2', topic,
      lesson.name || '', lesson.nameMinecraft || '', lesson.nameLalilo || '',
      lesson.description || '', JSON.stringify(lesson.exercises),
      JSON.stringify(adaptationTags), 1, new Date().toISOString()
    )
    stmts.incrementStat.run('totalGenerated')

    console.log(`  Saved to shared cache: "${topic}" (${subject}/${level})`)
    res.json({ ...lesson, fromCache: false })
  } catch (err) {
    console.error('AI generation error:', err)
    res.status(500).json({ error: `Erreur de generation: ${err.message}` })
  }
})

// ─── Shared pool stats ──────────────────────────────────────────────
app.get('/api/shared/stats', (req, res) => {
  const all = stmts.getAllShared.all()
  const subjects = {}
  for (const ex of all) {
    const key = ex.subject
    if (!subjects[key]) subjects[key] = { count: 0, grades: new Set() }
    subjects[key].count++
    subjects[key].grades.add(ex.grade)
  }

  res.json({
    totalExercises: all.length,
    totalGenerated: stmts.getStat.get('totalGenerated')?.value || 0,
    tokensSaved: stmts.getStat.get('tokensSaved')?.value || 0,
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
  // Auto-migrate from JSON files if DB is empty
  migrateFromJSON(hashFamilyId)

  const familyCount = db.prepare('SELECT COUNT(*) as c FROM families').get().c
  const sharedCount = db.prepare('SELECT COUNT(*) as c FROM shared_exercises').get().c
  const tokensSaved = stmts.getStat.get('tokensSaved')?.value || 0

  console.log(`🏫 HomeSchool API running on http://localhost:${PORT}`)
  console.log(`   Base de donnees: SQLite (WAL mode)`)
  console.log(`   ${familyCount} famille(s) enregistree(s)`)
  console.log(`   ${sharedCount} exercice(s) dans le cache partage`)
  console.log(`   ${tokensSaved} token(s) API economise(s)`)
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log(`   ANTHROPIC_API_KEY non definie - la generation IA ne marchera pas`)
  }
})

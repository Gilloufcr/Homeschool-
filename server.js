import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// ─── Data persistence (JSON file) ───────────────────────────────────
const DATA_FILE = join(__dirname, 'data', 'app-data.json')

function loadData() {
  if (!existsSync(DATA_FILE)) {
    const initial = {
      parentPin: '1234',
      children: [],
      customLessons: [],
    }
    saveData(initial)
    return initial
  }
  return JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
}

function saveData(data) {
  const dir = dirname(DATA_FILE)
  if (!existsSync(dir)) {
    import('fs').then(fs => fs.mkdirSync(dir, { recursive: true }))
  }
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
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

// ─── Children management ────────────────────────────────────────────
app.get('/api/children', (req, res) => {
  const data = loadData()
  // Return children without sensitive data
  res.json(data.children.map(c => ({
    id: c.id,
    name: c.name,
    theme: c.theme,
    avatar: c.avatar,
  })))
})

app.post('/api/children', requireParent, (req, res) => {
  const { name, theme, avatar } = req.body
  if (!name || !theme) {
    return res.status(400).json({ error: 'Nom et theme requis' })
  }
  const data = loadData()
  const child = {
    id: `child-${Date.now()}`,
    name,
    theme,
    avatar: avatar || (theme === 'minecraft' ? '⛏️' : '🦋'),
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

// ─── AI Content Generation (Anthropic Claude) ──────────────────────
app.post('/api/generate', requireParent, async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({
      error: 'Cle API Anthropic non configuree. Ajoutez ANTHROPIC_API_KEY dans votre .env',
    })
  }

  const { subject, topic, level, count, childAge, existingQuestions } = req.body

  if (!subject || !topic) {
    return res.status(400).json({ error: 'Matiere et sujet requis' })
  }

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
    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return res.status(500).json({ error: 'Reponse IA invalide' })
    }

    const generated = JSON.parse(jsonMatch[0])

    // Build lesson object
    const lesson = {
      id: `gen-${subject}-${Date.now()}`,
      name: generated.levelName,
      nameMinecraft: generated.levelNameMinecraft,
      nameLalilo: generated.levelNameLalilo,
      description: generated.description,
      subject,
      topic,
      minLevel: 1,
      isCustom: true,
      isAIGenerated: true,
      exercises: generated.exercises.map((ex, i) => ({
        ...ex,
        id: `gen-${subject}-${Date.now()}-${i}`,
        type: ex.type || 'choice',
      })),
    }

    res.json(lesson)
  } catch (err) {
    console.error('AI generation error:', err)
    res.status(500).json({ error: `Erreur de generation: ${err.message}` })
  }
})

// ─── Start server ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🏫 HomeSchool API running on http://localhost:${PORT}`)
  console.log(`   Parent PIN par defaut: 1234`)
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log(`   ⚠️  ANTHROPIC_API_KEY non definie - la generation IA ne marchera pas`)
    console.log(`   Lancez: ANTHROPIC_API_KEY=sk-... node server.js`)
  }
})

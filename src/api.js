const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:3001')

// ─── Detect if server is available ─────────────────────────────────
// In production build with same-origin API (API_URL=''), server is always available
// On GitHub Pages (no backend), skip server
const isGHPages = typeof window !== 'undefined' &&
  window.location.hostname.includes('github.io')

let serverAvailable = isGHPages ? false : (API_URL === '' ? true : null)

async function checkServer() {
  if (serverAvailable !== null) return serverAvailable
  try {
    const res = await fetch(`${API_URL}/api/children`, { signal: AbortSignal.timeout(1500) })
    serverAvailable = res.ok
  } catch {
    serverAvailable = false
  }
  return serverAvailable
}

// ─── localStorage helpers ──────────────────────────────────────────
const STORAGE_KEYS = {
  children: 'homeschool_children',
  lessons: 'homeschool_lessons',
  parentPin: 'homeschool_parent_pin',
  parentPinSet: 'homeschool_parent_pin_set',
  familyId: 'homeschool_family_id',
}

function getLocal(key, fallback = []) {
  try {
    const val = localStorage.getItem(key)
    return val ? JSON.parse(val) : fallback
  } catch {
    return fallback
  }
}

function setLocal(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

// ─── Server request (used when server is up) ──────────────────────
async function request(path, options = {}) {
  const parentPin = localStorage.getItem(STORAGE_KEYS.parentPin)
  const headers = {
    'Content-Type': 'application/json',
    ...(parentPin ? { 'x-parent-pin': parentPin } : {}),
    ...options.headers,
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Erreur serveur')
  }
  return data
}

// ─── Family UUID (anonymous, no PII) ─────────────────────────────
export const getFamilyId = () => {
  let id = localStorage.getItem(STORAGE_KEYS.familyId)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(STORAGE_KEYS.familyId, id)
  }
  return id
}

// ─── Children ──────────────────────────────────────────────────────
export const getChildren = async () => {
  if (await checkServer()) return request('/api/children')
  return getLocal(STORAGE_KEYS.children, [])
}

export const addChild = async (name, theme, avatar, grade) => {
  if (await checkServer()) {
    return request('/api/children', {
      method: 'POST',
      body: JSON.stringify({ name, theme, avatar, grade }),
    })
  }
  const children = getLocal(STORAGE_KEYS.children, [])
  const child = { id: `child-${Date.now()}`, name, theme, avatar, grade: grade || 'CM2' }
  children.push(child)
  setLocal(STORAGE_KEYS.children, children)
  return child
}

export const deleteChild = async (id) => {
  if (await checkServer()) {
    return request(`/api/children/${id}`, { method: 'DELETE' })
  }
  const children = getLocal(STORAGE_KEYS.children, []).filter(c => c.id !== id)
  setLocal(STORAGE_KEYS.children, children)
  return { ok: true }
}

// ─── Parent auth ──────────────────────────────────────────────────
const DEFAULT_PIN = '1234'

export const parentLogin = async (pin) => {
  if (await checkServer()) {
    const data = await request('/api/parent/login', {
      method: 'POST',
      body: JSON.stringify({ pin }),
      headers: { 'x-parent-pin': pin },
    })
    localStorage.setItem(STORAGE_KEYS.parentPin, pin)
    return data
  }
  // Offline: check against locally stored pin (default 1234)
  const storedPin = localStorage.getItem(STORAGE_KEYS.parentPinSet) || DEFAULT_PIN
  if (pin !== storedPin) {
    throw new Error('Code incorrect')
  }
  localStorage.setItem(STORAGE_KEYS.parentPin, pin)
  return { ok: true }
}

export const changePin = async (newPin) => {
  if (await checkServer()) {
    return request('/api/parent/change-pin', {
      method: 'POST',
      body: JSON.stringify({ newPin }),
    })
  }
  localStorage.setItem(STORAGE_KEYS.parentPinSet, newPin)
  localStorage.setItem(STORAGE_KEYS.parentPin, newPin)
  return { ok: true }
}

export const parentLogout = () => {
  localStorage.removeItem(STORAGE_KEYS.parentPin)
}

// ─── Lessons ──────────────────────────────────────────────────────
export const getLessons = async () => {
  if (await checkServer()) return request('/api/lessons')
  return getLocal(STORAGE_KEYS.lessons, [])
}

export const addLesson = async (lesson) => {
  if (await checkServer()) {
    return request('/api/lessons', {
      method: 'POST',
      body: JSON.stringify({ lesson }),
    })
  }
  const lessons = getLocal(STORAGE_KEYS.lessons, [])
  const stored = { ...lesson, id: `lesson-${Date.now()}` }
  lessons.push(stored)
  setLocal(STORAGE_KEYS.lessons, lessons)
  return stored
}

export const deleteLesson = async (id) => {
  if (await checkServer()) {
    return request(`/api/lessons/${id}`, { method: 'DELETE' })
  }
  const lessons = getLocal(STORAGE_KEYS.lessons, []).filter(l => l.id !== id)
  setLocal(STORAGE_KEYS.lessons, lessons)
  return { ok: true }
}

// ─── AI Generation (server only) ──────────────────────────────────
export const generateExercises = async (params) => {
  if (await checkServer()) {
    return request('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ ...params, familyId: getFamilyId() }),
    })
  }
  throw new Error('La generation IA necessite le serveur backend. Lancez "npm run dev:full" en local.')
}

// ─── Shared exercise pool ─────────────────────────────────────────
export const searchSharedExercises = async (subject, grade, topic) => {
  if (await checkServer()) {
    const params = new URLSearchParams({ subject, grade, topic })
    return request(`/api/shared/search?${params}`)
  }
  return { matches: [], exactMatch: false }
}

export const browseSharedExercises = async (subject, grade) => {
  if (await checkServer()) {
    const params = new URLSearchParams()
    if (subject) params.set('subject', subject)
    if (grade) params.set('grade', grade)
    return request(`/api/shared/browse?${params}`)
  }
  return { exercises: [], stats: { totalGenerated: 0, tokensSaved: 0 } }
}

export const getSharedExercise = async (id) => {
  if (await checkServer()) {
    return request(`/api/shared/${id}`)
  }
  throw new Error('Le cache partage necessite le serveur backend.')
}

export const getSharedStats = async () => {
  if (await checkServer()) {
    return request('/api/shared/stats')
  }
  return { totalExercises: 0, totalGenerated: 0, tokensSaved: 0, subjects: {} }
}

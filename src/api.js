const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:3001')

// ─── Token management ─────────────────────────────────────────────
const TOKEN_KEY = 'homeschool_token'
const FAMILY_KEY = 'homeschool_family'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(FAMILY_KEY)
}

export function getSavedFamily() {
  try {
    const val = localStorage.getItem(FAMILY_KEY)
    return val ? JSON.parse(val) : null
  } catch {
    return null
  }
}

export function setSavedFamily(family) {
  localStorage.setItem(FAMILY_KEY, JSON.stringify(family))
}

export function isLoggedIn() {
  return !!getToken()
}

// ─── Server request with JWT ────────────────────────────────────────
async function request(path, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })
  const data = await res.json()

  if (!res.ok) {
    if (res.status === 401) {
      clearToken()
    }
    throw new Error(data.error || 'Erreur serveur')
  }
  return data
}

// ─── Auth ───────────────────────────────────────────────────────────
export const authRegister = async (email, password, name) => {
  const data = await request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  })
  setToken(data.token)
  setSavedFamily(data.family)
  return data
}

export const authLogin = async (email, password) => {
  const data = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  setToken(data.token)
  setSavedFamily(data.family)
  return data
}

export const authLogout = () => {
  clearToken()
}

export const getMe = async () => {
  return request('/api/auth/me')
}

export const updateSettings = async (settings) => {
  return request('/api/auth/settings', {
    method: 'PUT',
    body: JSON.stringify(settings),
  })
}

// ─── Children ──────────────────────────────────────────────────────
export const getChildren = async () => {
  return request('/api/children')
}

export const addChild = async (name, theme, avatar, grade) => {
  return request('/api/children', {
    method: 'POST',
    body: JSON.stringify({ name, theme, avatar, grade }),
  })
}

export const deleteChild = async (id) => {
  return request(`/api/children/${id}`, { method: 'DELETE' })
}

// ─── Lessons ──────────────────────────────────────────────────────
export const getLessons = async () => {
  return request('/api/lessons')
}

export const addLesson = async (lesson) => {
  return request('/api/lessons', {
    method: 'POST',
    body: JSON.stringify({ lesson }),
  })
}

export const deleteLesson = async (id) => {
  return request(`/api/lessons/${id}`, { method: 'DELETE' })
}

// ─── Update child (TND profile) ──────────────────────────────────
export const updateChild = async (id, data) => {
  return request(`/api/children/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

// ─── Progress tracking ──────────────────────────────────────────────
export const recordExercise = async (data) => {
  return request('/api/progress/exercise', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const getProgress = async (childId, filters = {}) => {
  const params = new URLSearchParams()
  if (filters.subject) params.set('subject', filters.subject)
  if (filters.from) params.set('from', filters.from)
  if (filters.to) params.set('to', filters.to)
  const qs = params.toString()
  return request(`/api/progress/${childId}${qs ? '?' + qs : ''}`)
}

export const getProgressSummary = async (childId, filters = {}) => {
  const params = new URLSearchParams()
  if (filters.from) params.set('from', filters.from)
  if (filters.to) params.set('to', filters.to)
  const qs = params.toString()
  return request(`/api/progress/${childId}/summary${qs ? '?' + qs : ''}`)
}

// ─── AI Generation (server only) ──────────────────────────────────
export const generateExercises = async (params) => {
  return request('/api/generate', {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

// ─── Shared exercise pool ─────────────────────────────────────────
export const searchSharedExercises = async (subject, grade, topic) => {
  const params = new URLSearchParams({ subject, grade, topic })
  return request(`/api/shared/search?${params}`)
}

export const browseSharedExercises = async (subject, grade) => {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (grade) params.set('grade', grade)
  return request(`/api/shared/browse?${params}`)
}

export const getSharedExercise = async (id) => {
  return request(`/api/shared/${id}`)
}

export const getSharedStats = async () => {
  return request('/api/shared/stats')
}

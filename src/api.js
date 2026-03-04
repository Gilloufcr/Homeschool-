const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

async function request(path, options = {}) {
  const parentPin = localStorage.getItem('homeschool_parent_pin')
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

// ─── Children ───────────────────────────────────────────────────────
export const getChildren = () => request('/api/children')

export const addChild = (name, theme, avatar) =>
  request('/api/children', {
    method: 'POST',
    body: JSON.stringify({ name, theme, avatar }),
  })

export const deleteChild = (id) =>
  request(`/api/children/${id}`, { method: 'DELETE' })

// ─── Parent auth ────────────────────────────────────────────────────
export const parentLogin = async (pin) => {
  const data = await request('/api/parent/login', {
    method: 'POST',
    body: JSON.stringify({ pin }),
    headers: { 'x-parent-pin': pin },
  })
  localStorage.setItem('homeschool_parent_pin', pin)
  return data
}

export const changePin = (newPin) =>
  request('/api/parent/change-pin', {
    method: 'POST',
    body: JSON.stringify({ newPin }),
  })

export const parentLogout = () => {
  localStorage.removeItem('homeschool_parent_pin')
}

// ─── Lessons ────────────────────────────────────────────────────────
export const getLessons = () => request('/api/lessons')

export const addLesson = (lesson) =>
  request('/api/lessons', {
    method: 'POST',
    body: JSON.stringify({ lesson }),
  })

export const deleteLesson = (id) =>
  request(`/api/lessons/${id}`, { method: 'DELETE' })

// ─── AI Generation ──────────────────────────────────────────────────
export const generateExercises = (params) =>
  request('/api/generate', {
    method: 'POST',
    body: JSON.stringify(params),
  })

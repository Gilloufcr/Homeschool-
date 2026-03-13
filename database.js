import Database from 'better-sqlite3'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { existsSync, mkdirSync, readFileSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, 'data')

if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })

const DB_PATH = join(DATA_DIR, 'homeschool.db')
const db = new Database(DB_PATH)

// ─── Performance & safety ───────────────────────────────────────────
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

// ─── Schema ─────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS families (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS children (
    id TEXT PRIMARY KEY,
    family_id TEXT NOT NULL,
    name TEXT NOT NULL,
    theme TEXT NOT NULL,
    avatar TEXT DEFAULT '',
    grade TEXT DEFAULT 'CM2',
    encrypted_accessibility TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (family_id) REFERENCES families(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS custom_lessons (
    id TEXT PRIMARY KEY,
    family_id TEXT NOT NULL,
    data_json TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (family_id) REFERENCES families(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    family_id_hash TEXT NOT NULL,
    child_id TEXT NOT NULL,
    exercise_id TEXT NOT NULL,
    subject TEXT DEFAULT 'unknown',
    grade TEXT DEFAULT '',
    question TEXT DEFAULT '',
    given_answer TEXT DEFAULT '',
    correct_answer TEXT DEFAULT '',
    is_correct INTEGER DEFAULT 0,
    duration INTEGER DEFAULT 0,
    level_name TEXT DEFAULT '',
    timestamp TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS shared_exercises (
    id TEXT PRIMARY KEY,
    subject TEXT NOT NULL,
    grade TEXT DEFAULT 'CM2',
    topic TEXT NOT NULL,
    name TEXT DEFAULT '',
    name_minecraft TEXT DEFAULT '',
    name_lalilo TEXT DEFAULT '',
    description TEXT DEFAULT '',
    exercises_json TEXT NOT NULL,
    adaptations_json TEXT DEFAULT '[]',
    used_by INTEGER DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS shared_stats (
    key TEXT PRIMARY KEY,
    value INTEGER DEFAULT 0
  );

  CREATE INDEX IF NOT EXISTS idx_children_family ON children(family_id);
  CREATE INDEX IF NOT EXISTS idx_lessons_family ON custom_lessons(family_id);
  CREATE INDEX IF NOT EXISTS idx_progress_family ON progress(family_id_hash);
  CREATE INDEX IF NOT EXISTS idx_progress_child ON progress(child_id);
  CREATE INDEX IF NOT EXISTS idx_shared_subject ON shared_exercises(subject);
  CREATE INDEX IF NOT EXISTS idx_shared_grade ON shared_exercises(grade);
  CREATE INDEX IF NOT EXISTS idx_shared_topic ON shared_exercises(topic);

  CREATE TABLE IF NOT EXISTS progress_state (
    child_id TEXT NOT NULL,
    family_id TEXT NOT NULL,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    completed_exercises TEXT DEFAULT '[]',
    medals TEXT DEFAULT '{}',
    streak INTEGER DEFAULT 0,
    last_played TEXT,
    badges TEXT DEFAULT '[]',
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (child_id, family_id),
    FOREIGN KEY (family_id) REFERENCES families(id) ON DELETE CASCADE
  );
`)

// Init shared stats if missing
const initStat = db.prepare('INSERT OR IGNORE INTO shared_stats (key, value) VALUES (?, 0)')
initStat.run('totalGenerated')
initStat.run('tokensSaved')

// ─── Prepared statements ────────────────────────────────────────────

// Families
const stmts = {
  // Families
  findFamilyByEmail: db.prepare('SELECT * FROM families WHERE LOWER(email) = LOWER(?)'),
  findFamilyById: db.prepare('SELECT * FROM families WHERE id = ?'),
  insertFamily: db.prepare('INSERT INTO families (id, email, password, name, created_at) VALUES (?, ?, ?, ?, ?)'),
  updateFamilyName: db.prepare('UPDATE families SET name = ? WHERE id = ?'),
  updateFamilyPassword: db.prepare('UPDATE families SET password = ? WHERE id = ?'),

  // Children
  getChildren: db.prepare('SELECT * FROM children WHERE family_id = ?'),
  findChild: db.prepare('SELECT * FROM children WHERE id = ? AND family_id = ?'),
  insertChild: db.prepare('INSERT INTO children (id, family_id, name, theme, avatar, grade, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'),
  updateChild: db.prepare('UPDATE children SET name = ?, theme = ?, avatar = ?, grade = ?, encrypted_accessibility = ? WHERE id = ? AND family_id = ?'),
  deleteChild: db.prepare('DELETE FROM children WHERE id = ? AND family_id = ?'),

  // Custom lessons
  getLessons: db.prepare('SELECT * FROM custom_lessons WHERE family_id = ?'),
  insertLesson: db.prepare('INSERT INTO custom_lessons (id, family_id, data_json, created_at) VALUES (?, ?, ?, ?)'),
  deleteLesson: db.prepare('DELETE FROM custom_lessons WHERE id = ? AND family_id = ?'),

  // Progress
  insertProgress: db.prepare(`INSERT INTO progress
    (family_id_hash, child_id, exercise_id, subject, grade, question, given_answer, correct_answer, is_correct, duration, level_name, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`),
  getProgress: db.prepare('SELECT * FROM progress WHERE family_id_hash = ? AND child_id = ? ORDER BY timestamp ASC'),
  getProgressFiltered: db.prepare('SELECT * FROM progress WHERE family_id_hash = ? AND child_id = ? AND (? IS NULL OR subject = ?) AND (? IS NULL OR timestamp >= ?) AND (? IS NULL OR timestamp <= ?) ORDER BY timestamp ASC'),

  // Progress state (persistent)
  getProgressState: db.prepare('SELECT * FROM progress_state WHERE child_id = ? AND family_id = ?'),
  upsertProgressState: db.prepare(`INSERT INTO progress_state (child_id, family_id, xp, level, completed_exercises, medals, streak, last_played, badges, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(child_id, family_id) DO UPDATE SET
      xp = excluded.xp, level = excluded.level, completed_exercises = excluded.completed_exercises,
      medals = excluded.medals, streak = excluded.streak, last_played = excluded.last_played,
      badges = excluded.badges, updated_at = excluded.updated_at`),

  // Shared exercises
  getAllShared: db.prepare('SELECT * FROM shared_exercises ORDER BY created_at DESC'),
  getSharedById: db.prepare('SELECT * FROM shared_exercises WHERE id = ?'),
  insertShared: db.prepare(`INSERT INTO shared_exercises
    (id, subject, grade, topic, name, name_minecraft, name_lalilo, description, exercises_json, adaptations_json, used_by, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`),
  incrementSharedUsage: db.prepare('UPDATE shared_exercises SET used_by = used_by + 1 WHERE id = ?'),

  // Stats
  getStat: db.prepare('SELECT value FROM shared_stats WHERE key = ?'),
  incrementStat: db.prepare('UPDATE shared_stats SET value = value + 1 WHERE key = ?'),
}

// ─── Migration from JSON files ──────────────────────────────────────
function migrateFromJSON(hashFamilyId) {
  const appDataFile = join(DATA_DIR, 'app-data.json')
  const sharedFile = join(DATA_DIR, 'shared-exercises.json')

  const familyCount = db.prepare('SELECT COUNT(*) as c FROM families').get().c
  if (familyCount > 0) return false // already migrated

  let migrated = false

  // Migrate app-data.json
  if (existsSync(appDataFile)) {
    try {
      const data = JSON.parse(readFileSync(appDataFile, 'utf-8'))
      if (data.families && data.families.length > 0) {
        const insertAll = db.transaction((families) => {
          for (const f of families) {
            stmts.insertFamily.run(f.id, f.email, f.password, f.name, f.createdAt || new Date().toISOString())

            if (f.children) {
              for (const c of f.children) {
                stmts.insertChild.run(
                  c.id, f.id, c.name, c.theme,
                  c.avatar || '', c.grade || 'CM2',
                  c.createdAt || new Date().toISOString()
                )
                // Migrate encrypted TND data if present
                if (c._encryptedAccessibility) {
                  stmts.updateChild.run(c.name, c.theme, c.avatar || '', c.grade || 'CM2', c._encryptedAccessibility, c.id, f.id)
                }
              }
            }

            if (f.customLessons) {
              for (const l of f.customLessons) {
                stmts.insertLesson.run(l.id, f.id, JSON.stringify(l), l.createdAt || new Date().toISOString())
              }
            }
          }
        })
        insertAll(data.families)
        console.log(`   Migre ${data.families.length} famille(s) depuis app-data.json`)
        migrated = true
      }
    } catch (err) {
      console.error('   Erreur migration app-data.json:', err.message)
    }
  }

  // Migrate progress files
  if (hashFamilyId) {
    const families = db.prepare('SELECT id FROM families').all()
    for (const f of families) {
      const hash = hashFamilyId(f.id)
      const progressFile = join(DATA_DIR, `progress-${hash}.json`)
      if (existsSync(progressFile)) {
        try {
          const progress = JSON.parse(readFileSync(progressFile, 'utf-8'))
          if (progress.children) {
            const insertProgress = db.transaction((children, familyHash) => {
              for (const [childId, childData] of Object.entries(children)) {
                if (childData.exercises) {
                  for (const ex of childData.exercises) {
                    stmts.insertProgress.run(
                      familyHash, childId, ex.exerciseId || '',
                      ex.subject || 'unknown', ex.grade || '', ex.question || '',
                      String(ex.givenAnswer ?? ''), String(ex.correctAnswer ?? ''),
                      ex.isCorrect ? 1 : 0, ex.duration || 0,
                      ex.levelName || '', ex.timestamp || new Date().toISOString()
                    )
                  }
                }
              }
            })
            insertProgress(progress.children, hash)
            console.log(`   Migre progress pour famille ${hash.slice(0, 8)}...`)
          }
        } catch (err) {
          console.error(`   Erreur migration progress-${hash}:`, err.message)
        }
      }
    }
  }

  // Migrate shared-exercises.json
  if (existsSync(sharedFile)) {
    try {
      const shared = JSON.parse(readFileSync(sharedFile, 'utf-8'))
      if (shared.exercises && shared.exercises.length > 0) {
        const insertShared = db.transaction((exercises) => {
          for (const e of exercises) {
            stmts.insertShared.run(
              e.id, e.subject, e.grade || 'CM2', e.topic || '',
              e.name || '', e.nameMinecraft || '', e.nameLalilo || '',
              e.description || '', JSON.stringify(e.exercises || []),
              JSON.stringify(e.adaptations || []),
              e.usedBy || 1, e.createdAt || new Date().toISOString()
            )
          }
        })
        insertShared(shared.exercises)

        // Migrate stats
        if (shared.stats) {
          if (shared.stats.totalGenerated) {
            db.prepare('UPDATE shared_stats SET value = ? WHERE key = ?').run(shared.stats.totalGenerated, 'totalGenerated')
          }
          if (shared.stats.tokensSaved) {
            db.prepare('UPDATE shared_stats SET value = ? WHERE key = ?').run(shared.stats.tokensSaved, 'tokensSaved')
          }
        }
        console.log(`   Migre ${shared.exercises.length} exercice(s) partage(s)`)
        migrated = true
      }
    } catch (err) {
      console.error('   Erreur migration shared-exercises.json:', err.message)
    }
  }

  return migrated
}

export { db, stmts, migrateFromJSON, DATA_DIR }

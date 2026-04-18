import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

const dbPath = process.env.NUXT_FEEDBACK_DB_PATH || join(process.cwd(), '.data', 'feedback.sqlite')

mkdirSync(dirname(dbPath), { recursive: true })

const sqlite = new Database(dbPath)

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rating TEXT NOT NULL,
    feedback TEXT,
    path TEXT NOT NULL,
    title TEXT NOT NULL,
    stem TEXT NOT NULL,
    country TEXT NOT NULL,
    fingerprint TEXT NOT NULL,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL
  );
`)

sqlite.exec(`
  CREATE UNIQUE INDEX IF NOT EXISTS path_fingerprint_idx
  ON feedback (path, fingerprint);
`)

export const db = drizzle(sqlite, { schema })

-- users / profiles
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,            -- uuid string from the app (mock for now)
  display_name TEXT NOT NULL,
  bio TEXT,
  city TEXT,
  lat REAL,
  lng REAL,
  photo TEXT,                     -- R2 public URL later
  intents TEXT,                   -- JSON string: ["gym","hiking"]
  interests TEXT,                 -- JSON string
  created_at INTEGER DEFAULT (strftime('%s','now'))
);

-- swipe decisions
CREATE TABLE IF NOT EXISTS swipes (
  swiper TEXT NOT NULL,
  target TEXT NOT NULL,
  decision INTEGER NOT NULL,      -- 1=like, 0=pass
  created_at INTEGER DEFAULT (strftime('%s','now')),
  PRIMARY KEY (swiper, target)
);

-- matches (created on mutual like)
CREATE TABLE IF NOT EXISTS matches (
  id TEXT PRIMARY KEY,
  a TEXT NOT NULL,
  b TEXT NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s','now')),
  UNIQUE (a,b)
);

-- messages
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  match_id TEXT NOT NULL,
  sender TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s','now'))
);

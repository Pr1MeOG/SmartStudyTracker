-- Users table (simple MVP)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  class TEXT,
  board TEXT,
  subjects JSONB DEFAULT '[]',
  is_admin BOOLEAN DEFAULT false,
  target_percentage INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Subjects and chapters (basic)
CREATE TABLE IF NOT EXISTS subjects (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  total_hours INTEGER DEFAULT 0,
  chapters JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Study sessions
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  subject TEXT,
  chapter TEXT,
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  notes JSONB DEFAULT '{}',
  deep_work_score INTEGER,
  breaks_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Chapters table for tracking progress and confidence
CREATE TABLE IF NOT EXISTS chapters (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'Not Started', -- Not Started, In Progress, Completed, Revised
  progress INTEGER DEFAULT 0,
  confidence INTEGER DEFAULT 0,
  revision_count INTEGER DEFAULT 0,
  last_revision TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Homework
CREATE TABLE IF NOT EXISTS homework (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  subject TEXT,
  chapter TEXT,
  due_date DATE,
  priority INTEGER DEFAULT 2,
  status TEXT DEFAULT 'Pending', -- Pending, Completed, Overdue
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Attendance
CREATE TABLE IF NOT EXISTS attendance (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  subject TEXT,
  total_classes INTEGER DEFAULT 0,
  attended INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tests
CREATE TABLE IF NOT EXISTS tests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  subject TEXT,
  chapter TEXT,
  test_name TEXT,
  date DATE,
  score_numeric INTEGER,
  max_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Revisions
CREATE TABLE IF NOT EXISTS revisions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  chapter_id INTEGER REFERENCES chapters(id) ON DELETE CASCADE,
  revision_number INTEGER,
  revision_date DATE,
  next_revision_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Goals
CREATE TABLE IF NOT EXISTS goals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title TEXT,
  type TEXT,
  target_value INTEGER,
  current_value INTEGER DEFAULT 0,
  due_date DATE,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Announcements
CREATE TABLE IF NOT EXISTS announcements (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

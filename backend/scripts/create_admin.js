#!/usr/bin/env node
// Usage: node scripts/create_admin.js <email> <password>
// Requires DATABASE_URL env var

const { Pool } = require('pg')
const bcrypt = require('bcrypt')

async function main() {
  const email = process.argv[2]
  const password = process.argv[3]
  if (!email || !password) {
    console.error('Usage: node scripts/create_admin.js <email> <password>')
    process.exit(1)
  }
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const client = await pool.connect()
  try {
    const hash = await bcrypt.hash(password, 10)
    // Upsert admin user
    const res = await client.query(
      `INSERT INTO users (name, email, password_hash, is_admin) VALUES ($1,$2,$3,true)
       ON CONFLICT (email) DO UPDATE SET password_hash=EXCLUDED.password_hash, is_admin=true
       RETURNING id`,
      [email.split('@')[0], email, hash]
    )
    console.log('Admin user id:', res.rows[0].id)
  } catch (err) {
    console.error(err)
  } finally {
    client.release()
    await pool.end()
  }
}

main()

// app/api/posts/route.js
import pool from '@/lib/db'

export async function GET() {
  try {
    const [rows] = await pool.execute(`
      SELECT p.id, p.content, p.created_at,
             u.name, u.username, u.avatar
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
      LIMIT 50
    `)
    // ^^^ this where initial code was from video and will also serve as post logic now

    return Response.json(rows)
  } catch (err) {
    return Response.json({ error: "Failed to load posts" }, { status: 500 })
  }
}
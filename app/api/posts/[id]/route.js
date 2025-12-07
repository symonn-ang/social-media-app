import pool from "@/lib/db"

export async function GET(req, context) {
  // Await params because App Router now uses a Promise
  const params = await context.params
  const id = params?.id

  if (!id) {
    return Response.json({ error: "Missing post ID" }, { status: 400 })
  }

  try {
    const [rows] = await pool.execute(`
      SELECT 
        p.id,
        p.content,
        p.created_at,
        u.name,
        u.username,
        u.avatar
      FROM posts p
      JOIN users u ON u.id = p.user_id
      WHERE p.id = ?
      LIMIT 1
    `, [id])

    if (rows.length === 0) {
      return Response.json({ error: "Post not found" }, { status: 404 })
    }

    return Response.json(rows[0])
  } catch (err) {
    console.error("POST SQL ERROR:", err)
    return Response.json({ error: "Server error" }, { status: 500 })
  }
}

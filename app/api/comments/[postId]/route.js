import pool from "@/lib/db"

export async function GET(req, context) {
  const params = await context.params
  const postId = params?.postId

  if (!postId) return Response.json([])

  try {
    const [rows] = await pool.execute(`
      SELECT c.id, c.content AS text, c.created_at,
             u.name, u.username, u.avatar
      FROM comments c
      JOIN users u ON u.id = c.user_id
      WHERE c.post_id = ?
      ORDER BY c.created_at ASC
    `, [postId])

    return Response.json(rows)
  } catch (err) {
    console.error("COMMENTS SQL ERROR:", err)
    return Response.json([])
  }
}

export async function POST(req, context) {
  const params = await context.params
  const postId = params?.postId
  const body = await req.json()
  const user = JSON.parse(req.headers.get("x-user") || "{}")

  if (!postId || !user.id || !body.text) {
    return Response.json({ error: "Missing data" }, { status: 400 })
  }

  try {
    await pool.execute(`
      INSERT INTO comments (post_id, user_id, content)
      VALUES (?, ?, ?)
    `, [postId, user.id, body.text])

    return Response.json({ success: true })
  } catch (err) {
    console.error("INSERT COMMENT SQL ERROR:", err)
    return Response.json({ error: "Failed to post comment" }, { status: 500 })
  }
}

import pool from '@/lib/db'

export async function POST(request) {
  try {
    const { text } = await request.json()

    const userHeader = request.headers.get('x-user')
    if (!userHeader) {
      return Response.json({ error: "Not logged in" }, { status: 401 })
    }

    const user = JSON.parse(userHeader)

    if (!text?.trim()) {
      return Response.json({ error: "Empty post" }, { status: 400 })
    }

    await pool.execute(
      `INSERT INTO posts (user_id, content) VALUES (?, ?)`,
      [user.uid, text.trim()]
    )

    return Response.json({ success: true })
  } catch (err) {
    console.error("Post creation error:", err)
    return Response.json({ error: "Failed to post" }, { status: 500 })
  }
}
import pool from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return Response.json({ error: "Email and password required" }, { status: 400 })
    }

    const [rows] = await pool.execute(
      "SELECT id, name, username, email, password, avatar FROM users WHERE email = ?",
      [email.toLowerCase().trim()]
    )

    if (rows.length === 0) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const user = rows[0]
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // SUCCESS
    return Response.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar || "/assets/prof_pic.png"
      }
    })

  } catch (error) {
    console.error("Login error:", error)
    return Response.json({ error: "Server error" }, { status: 500 })
  }
}
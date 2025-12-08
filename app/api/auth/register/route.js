import pool from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request) {
    try {
        const { name, email, password } = await request.json()

        
        if (!name || !email || !password) {
            return Response.json(
                { error: "Name, email and password are required" },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return Response.json(
                { error: "Password must be at least 6 characters" },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        const baseUsername = email.split("@")[0].toLowerCase().replace(/[^a-z0-9_]/g, "")
        const randomNum = Math.floor(Math.random() * 9999)
        const username = `${baseUsername}${randomNum}`

        // Insert user
        const [result] = await pool.execute(
            `INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)`,
            [name.trim(), username.trim(), email.toLowerCase().trim(), hashedPassword]
        )

        
        return Response.json(
            {
                success: true,
                user: {
                    id: result.insertId,
                    name: name.trim(),
                    username: username,
                    email: email.toLowerCase().trim()
                }
            },
            { status: 201 }
        )
    } catch (error) {
        console.error("Register error:", error)

        // Duplicate email?
        if (error.code === 'ER_DUP_ENTRY') {
            return Response.json(
                { error: "Email already exists" },
                { status: 409 }
            )
        }

        return Response.json(
            { error: "Something went wrong. Try again!" },
            { status: 500 }
        )
    }
}
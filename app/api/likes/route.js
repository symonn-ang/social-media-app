import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { post_id, user_id } = await req.json();

    if (!post_id || !user_id) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Check if already liked
    const [existing] = await pool.execute(
      "SELECT 1 FROM likes WHERE post_id = ? AND user_id = ?",
      [post_id, user_id]
    );

    if (existing.length > 0) {
      // UNLIKE
      await pool.execute(
        "DELETE FROM likes WHERE post_id = ? AND user_id = ?",
        [post_id, user_id]
      );
      return NextResponse.json({ success: true, action: "unliked" });
    } else {
      // LIKE
      await pool.execute(
        "INSERT INTO likes (post_id, user_id, created_at) VALUES (?, ?, NOW())",
        [post_id, user_id]
      );
      return NextResponse.json({ success: true, action: "liked" });
    }
  } catch (err) {
    console.error("Like error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
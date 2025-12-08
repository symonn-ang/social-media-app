import pool from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const post_id = searchParams.get("post_id");
  const user_id = searchParams.get("user_id");

  if (!post_id || !user_id) {
    return Response.json({ liked: false });
  }

  try {
    const [rows] = await pool.execute(
      "SELECT 1 FROM likes WHERE post_id = ? AND user_id = ?",
      [post_id, user_id]
    );
    return Response.json({ liked: rows.length > 0 });
  } catch (err) {
    return Response.json({ liked: false });
  }
}
import pool from "@/lib/db"

export async function GET(req, context) {
  // when in trouble just await params
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

    const post = rows[0];

    // likes count
    const [likesRows] = await pool.execute(
      "SELECT COUNT(*) as likes FROM likes WHERE post_id = ?",
      [id]
    );
    post.likes = likesRows[0]?.likes || 0;

    // comments counts , incase
    const [commentsRows] = await pool.execute(
      "SELECT COUNT(*) as comments FROM comments WHERE post_id = ?",
      [id]
    );
    post.comments = commentsRows[0]?.comments || 0;

    return Response.json(post);

  } catch (err) {
    console.error("POST SQL ERROR:", err)
    return Response.json({ error: "Server error" }, { status: 500 })
  }
}

// delete starts here
export async function DELETE(req, context) {
  const params = await context.params;
  const postId = params?.id;

  if (!postId) {
    return Response.json({ error: "Missing post ID" }, { status: 400 });
  }

  // Get current user from header
  const userHeader = req.headers.get("x-user");
  const currentUser = userHeader ? JSON.parse(userHeader) : null;

  if (!currentUser?.uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  try {
    // Get the post to check owner
    const [rows] = await pool.execute(
      "SELECT user_id FROM posts WHERE id = ? LIMIT 1",
      [postId]
    );

    if (rows.length === 0) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    const postOwner = rows[0].user_id;

    if (postOwner !== currentUser.uid) {
      return Response.json({ error: "You cannot delete someone else's post" }, { status: 403 });
    }

    // Delete likes + comments first (foreign keys)
    await pool.execute("DELETE FROM likes WHERE post_id = ?", [postId]);
    await pool.execute("DELETE FROM comments WHERE post_id = ?", [postId]);

    await pool.execute("DELETE FROM posts WHERE id = ?", [postId]);

    return Response.json({ success: true });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    return Response.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

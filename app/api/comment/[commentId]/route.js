import pool from "@/lib/db";

export async function DELETE(req, context) {
  // await works
  const params = await context.params;
  const commentId = params?.commentId;

  const userHeader = req.headers.get("x-user");
  const user = userHeader ? JSON.parse(userHeader) : null;

  console.log("x-user header received:", user);
  console.log("commentId:", commentId);

  if (!user?.uid) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  if (!commentId) {
    return new Response(JSON.stringify({ error: "Missing comment ID" }), { status: 400 });
  }

  try {
    const [result] = await pool.execute(
      "DELETE FROM comments WHERE id = ? AND user_id = ?",
      [commentId, user.uid]
    );

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ error: "Not allowed" }), { status: 403 });
    }

    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    console.error("DELETE COMMENT SQL ERROR:", err);
    return new Response(JSON.stringify({ error: "Failed to delete comment" }), { status: 500 });
  }
}

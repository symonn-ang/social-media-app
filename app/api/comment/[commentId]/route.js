import pool from "@/lib/db";

export async function DELETE(req, { params }) {
  const { commentId } = params;
  const user = JSON.parse(req.headers.get("x-user") || "{}");

  if (!user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [result] = await pool.execute(
      "DELETE FROM comments WHERE id = ? AND user_id = ?",
      [commentId, user.id]
    );

    if (result.affectedRows === 0) {
      return Response.json({ error: "Not allowed" }, { status: 403 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("DELETE COMMENT SQL ERROR:", err);
    return Response.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}

import pool from "@/lib/db";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const userHeader = req.headers.get("x-user");
  const currentUser = userHeader ? JSON.parse(userHeader) : null;

  if (!currentUser?.uid) {
    return new Response(JSON.stringify({ error: "Not logged in" }), { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("avatar");

    if (!file || !(file instanceof Blob)) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create a unique filename
    const timestamp = Date.now();
    const filename = `${currentUser.uid}-${timestamp}.png`; // force png or preserve file.type is an opt apparently 
    const filePath = path.join(process.cwd(), "public", "assets", filename);

    fs.writeFileSync(filePath, buffer);

    // Update DB
    const dbPath = `/assets/${filename}`;
    await pool.execute("UPDATE users SET avatar = ? WHERE id = ?", [dbPath, currentUser.uid]);

    return new Response(JSON.stringify({ success: true, avatar: dbPath }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Upload failed" }), { status: 500 });
  }
}

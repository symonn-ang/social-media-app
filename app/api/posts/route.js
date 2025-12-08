import pool from '@/lib/db';

export async function GET(request) {

  const userHeader = request.headers.get('x-user');
  const currentUserId = userHeader ? JSON.parse(userHeader)?.uid : null;

  try {
    const [posts] = await pool.execute(`
      SELECT p.id, p.content AS text, p.created_at,
             u.name, u.username, u.avatar
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
      LIMIT 50
    `);

    if (posts.length === 0) return Response.json([]);

    const postIds = posts.map(p => p.id);

    // Likes count
    const [likesData] = await pool.execute(
      `SELECT post_id, COUNT(*) as likes_count FROM likes WHERE post_id IN (${postIds.map(() => '?').join(',')}) GROUP BY post_id`,
      postIds
    );

    // Comments count
    const [commentsData] = await pool.execute(
      `SELECT post_id, COUNT(*) as comments_count FROM comments WHERE post_id IN (${postIds.map(() => '?').join(',')}) GROUP BY post_id`,
      postIds
    );

    // check who liked
    let userLikedMap = {};
    if (currentUserId) {
      const [userLikes] = await pool.execute(
        `SELECT post_id FROM likes WHERE post_id IN (${postIds.map(() => '?').join(',')}) AND user_id = ?`,
        [...postIds, currentUserId]
      );
      userLikedMap = Object.fromEntries(userLikes.map(row => [row.post_id, true]));
    }

    const likesMap = Object.fromEntries(likesData.map(r => [r.post_id, r.likes_count]));
    const commentsMap = Object.fromEntries(commentsData.map(r => [r.post_id, r.comments_count]));

    const formattedPosts = posts.map(post => ({
      ...post,
      likes: likesMap[post.id] || 0,
      comments: commentsMap[post.id] || 0,
      userLiked: !!userLikedMap[post.id]  // THIS TELLS Post.js if heart should be red
    }));

    console.log("USER HEADER:", userHeader);
console.log("CURRENT USER ID:", currentUserId);

    return Response.json(formattedPosts);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to load posts" }, { status: 500 });
  }
}
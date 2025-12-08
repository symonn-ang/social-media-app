"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // ADD THIS
import PostInput from "./PostInput";
import Post from "./Post";

export default function PostFeed() {
  const user = useSelector((state) => state.user); // ADD THIS
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadPosts() {
    try {
      const userHeader = user?.uid ? JSON.stringify(user) : "";

      const res = await fetch("/api/posts", {
        headers: {
          "x-user": userHeader, // THIS IS THE FINAL FIX
        },
      });
      console.log("SENDING x-user HEADER:", userHeader);

      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setPosts(data);
      setError("");
    } catch (err) {
      setError("Failed to load posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
    const interval = setInterval(loadPosts, 10000);
    return () => clearInterval(interval);
  }, [user]); // Add user dependency so it refreshes on login

  useEffect(() => {
    window.refreshPosts = loadPosts;
  }, []);

  return (
    <div className="grow border-x border-gray-400 max-w-2xl">

      <div className="py-4 px-3 text-lg sm:text-xl sticky top-0 z-50 bg-white/80 backdrop-blur-sm font-bold border-b border-gray-200">
        Home
      </div>


      <PostInput onPostSuccess={loadPosts} />


      <div>
        {loading && <p className="p-10 text-center text-gray-500">Loading posts...</p>}
        {error && <p className="p-10 text-center text-red-500">{error}</p>}
        {!loading && posts.length === 0 && (
          <p className="p-10 text-center text-gray-500">No posts yet. Be the first!</p>
        )}
        {posts.map((post) => (
          <Post key={post.id} data={post} id={post.id} />
        ))}
      </div>
    </div>
  );
}
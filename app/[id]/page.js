"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { setCommentDetails } from "@/redux/slices/modalSlice"
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

import { PostHeader } from "@/components/Post"
import Sidebar from "@/components/Sidebar"
import Widgets from "@/components/Widgets"
import SignUpPrompt from "@/components/SignUpPrompt"

import {
  ArrowLeftIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon
} from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import PostInput from "@/components/PostInput"

export default function PostPage(data) {
  const pathname = usePathname()
  const id = pathname?.split("/").pop()
  const dispatch = useDispatch()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  const user = useSelector((state) => state.user);
  const { likesid, likes = 0 } = data;
  const isGuest = user.email === "guest@example.com"
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!post || !user?.uid) return;

    setLikesCount(post.likes || 0);

    async function check() {
      const res = await fetch(`/api/likes/check?post_id=${post.id}&user_id=${user.uid}`);
      const { liked } = await res.json();
      setIsLiked(liked);
    }
    check();
  }, [post, user?.uid]);

  async function toggleLike() {
    if (!user?.uid || isGuest) {
      alert("Please log in to like posts!");
      return;
    }

    const wasLiked = isLiked;
    setIsLiked(!wasLiked);
    setLikesCount(prev => wasLiked ? prev - 1 : prev + 1);

    try {
      await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: post.id, user_id: user.uid }),
      });
    } catch (err) {
      setIsLiked(wasLiked);
      setLikesCount(prev => wasLiked ? prev + 1 : prev - 1);
    }
  }

  // fetch comments
  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments/${id}`)
      const data = await res.json()
      setComments(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!id) return

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`)
        const data = await res.json()
        setPost(data)

        dispatch(setCommentDetails({
          name: data.name,
          username: data.username,
          id: data.id,
          text: data.content,
        }))

      } catch (err) {
        console.error(err)
      }
    }

    Promise.all([fetchPost(), fetchComments()]).finally(() => setLoading(false))
  }, [id, dispatch])

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (!post) return <p className="text-center mt-10 text-red-500">Post not found.</p>

  return (
    <>
      <div className="text-black min-h-screen max-w-[1400px] mx-auto flex justify-center">
        <Sidebar />

        <div className="grow border-x border-gray-400 max-w-2xl">

          <div className="py-4 px-3 text-lg sm:text-xl sticky top-0 z-50 bg-white/80 backdrop-blur-sm font-bold border-b border-gray-200 flex items-center">
            <Link href="/">
              <ArrowLeftIcon className="w-5 h-5 mr-10" />
            </Link>
            Post
          </div>

          {/* Post Body */}
          <div className="flex flex-col p-3 space-y-5 border-b border-gray-100">
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex space-x-3">
                <Image
                  src={post.avatar ?? "/assets/prof_pic.png"}
                  width={44}
                  height={44}
                  alt="Profile Picture"
                  className="w-11 h-11 rounded-full"
                />
                <div className="flex flex-col text-[15px]">
                  <span className="font-bold truncate max-w-[140px] sm:max-w-40">{post.name}</span>
                  <span className="text-[#707E89] truncate max-w-[140px] sm:max-w-40">@{post.username}</span>
                </div>
              </div>
              {/* <EllipsisHorizontalIcon className="w-5 h-5" /> */}
            </div>

            <span className="text-[15px] mt-4 wrap-break-word whitespace-normal">{post.content}</span>
          </div>

          {/* Likes */}
          <div className="border-b border-gray-100 p-3 text-[15px]">
            <span className="font-bold">{likesCount || 0}</span> {likesCount === 1 ? 'Like' : 'Likes'}
          </div>

          <div className="border-b border-gray-100 p-3 px-10 text-[15px] flex justify-between">
            <ChatBubbleOvalLeftEllipsisIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
            {/* start of likes btn */}
            <div className="relative">
              {isLiked ? (
                <HeartSolidIcon
                  className="w-[22px] h-[22px] cursor-pointer text-pink-500 hover:text-red-600 transition"
                  onClick={toggleLike}
                />
              ) : (
                <HeartIcon
                  className="w-[22px] h-[22px] cursor-pointer hover:text-pink-500 transition"
                  onClick={toggleLike}
                />
              )}
            </div>
            <ChartBarIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
            <ArrowUpTrayIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed pr-2" />
          </div>

          {/* input stuff */}
          <PostInput insideModal={true} onCommentSuccess={fetchComments} />

          {comments.length === 0 && (
            <p className="text-center py-5 text-gray-400">No comments yet</p>
          )}

          {comments.map((comment) => (
            <Comment
              key={comment.id}
              name={comment.name}
              username={comment.username}
              text={comment.text}
              avatar={comment.avatar}
              timestamp={comment.created_at}
            />
          ))}
        </div>

        <Widgets />
      </div>

      <SignUpPrompt />
    </>
  )
}

// comment func
function Comment({ name, username, text, avatar, timestamp }) {
  return (
    <div className="border-b border-gray-100 wrap-break-word whitespace-normal">
      <PostHeader
        name={name}
        username={username}
        text={text}
        avatar={avatar}
        timestamp={timestamp}
      />
      <div className="flex space-x-12 p-3 justify-evenly">
        <ChatBubbleOvalLeftEllipsisIcon className="w-[22px] h-[22px] cursor-not-allowed" />
        <HeartIcon className="w-[22px] h-[22px] cursor-not-allowed" />
        <ChartBarIcon className="w-[22px] h-[22px] cursor-not-allowed" />
        <ArrowUpTrayIcon className="w-[22px] h-[22px] cursor-not-allowed" />
      </div>
    </div>
  )
}

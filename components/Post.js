"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { HeartIcon, ChatBubbleOvalLeftEllipsisIcon, ChartBarIcon, ArrowUpTrayIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { timeAgo } from "@/utils/timeAgo";
import { useDispatch, useSelector } from "react-redux";
import { openCommentModal, openLogInModal, setCommentDetails } from "@/redux/slices/modalSlice";
import Link from "next/link";

export default function Post({ data }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { id, name, username, text, created_at, avatar, likes = 0, comments = 0 } = data;
  const isGuest = user.email === "guest@example.com"
  const [likesCount, setLikesCount] = useState(likes);
  const [commentsCount, setCommentsCount] = useState(comments);
  const [isLiked, setIsLiked] = useState(false);

  // Check if liked
  useEffect(() => {
    if (!user?.uid) return;

    async function check() {
      const res = await fetch(`/api/likes/check?post_id=${id}&user_id=${user.uid}`);
      const { liked } = await res.json();
      setIsLiked(liked);
    }
    check();
  }, [id, user?.uid]);

  async function toggleLike() {
    if (!user?.uid || isGuest) {
      dispatch(openLogInModal());
      return;
    }

    const wasLiked = isLiked;
    setIsLiked(!wasLiked);
    setLikesCount(prev => wasLiked ? prev - 1 : prev + 1);

    try {
      await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: id, user_id: user.uid }),
      });
    } catch (err) {
      setIsLiked(wasLiked);
      setLikesCount(prev => wasLiked ? prev + 1 : prev - 1);
    }
  }

  useEffect(() => {  // for commentCount
    const handleComment = (e) => {
      if (e.detail === id) {
        setCommentsCount(prev => prev + 1);
      }
    };
    window.addEventListener("commentAdded", handleComment);
    return () => window.removeEventListener("commentAdded", handleComment);
  }, [id]);

  return (
    <div className="border-b border-gray-200 hover:bg-gray-50 transition">
      <Link href={`/${id}`} onClick={() => dispatch(setCommentDetails({ name, username, id, text: text }))}>
        <PostHeader name={name} username={username} timestamp={created_at} avatar={avatar} text={text} />
      </Link>

      <div className="ml-16 p-3 flex space-x-14">
        {/* comments */}
        <div className="relative">
          <ChatBubbleOvalLeftEllipsisIcon
            className="w-[22px] h-[22px] cursor-pointer hover:text-[#33beff] transition"
            onClick={() => {
              if (!user?.uid) {
                dispatch(openLogInModal());
              } else if (isGuest) {
                alert("Please log in to comment!");
              }
              else {
                dispatch(setCommentDetails({ name, username, id, text: text }));
                dispatch(openCommentModal());
              }
            }}
          />
          {commentsCount > 0 && (
            <span className="absolute text-xs top-1 -right-3">{commentsCount}</span>
          )}
        </div>

        {/* likes */}
        <div className="relative">
          {isLiked ? (
            <HeartSolidIcon
              className="w-[22px] h-[22px] cursor-pointer text-pink-500 hover:text-red-600 transition"
              onClick={toggleLike}
            />
          ) : (
            <HeartIcon
              className="w-[22px] h-[22px] cursor-pointer hover:text-pink-500 transition"
              onClick={() => {
                if (!user?.uid || isGuest) {
                  alert("Please log in to like posts!");
                  dispatch(openLogInModal());
                } else {
                  toggleLike();
                }
              }}
            />
          )}
          {likesCount > 0 && (
            <span className="absolute text-xs top-1 -right-3">{likesCount}</span>
          )}
        </div>

        <div className="relative">
          <ChartBarIcon className="w-[22px] h-[22px] cursor-not-allowed opacity-50" />
        </div>
        <div className="relative">
          <ArrowUpTrayIcon className="w-[22px] h-[22px] cursor-not-allowed opacity-50" />
        </div>
      </div>
    </div>
  );
}

// use alot
export function PostHeader({ name, username, timestamp, avatar, text, replyTo }) {
  return (
    <div className="flex p-3 space-x-5">
      <Image
        src={avatar || "/assets/prof_pic.png"}
        width={44}
        height={44}
        alt="user-pic"
        className="w-11 h-11 rounded-full object-cover z-10 bg-white"
      />

      <div className="text-[15px] flex flex-col space-y-1.5 min-w-0">
        <div className="flex space-x-1.5 text-[#707E89]">
          <span className="font-bold text-black inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-40">
            {name}
          </span>
          <span className="inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-40">
            @{username}
          </span>

          {timestamp && (
            <>
              <span>⋅</span>
              <span className="pr-90">{timeAgo(timestamp)}</span>
            </>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation(); // found this instead of z indexing
              e.preventDefault();
              alert("Options coming soon!");
            }}
            className="ml-2"
          >
            <EllipsisHorizontalIcon className="w-5 cursor-pointer z-50" />
          </button>

        </div>

        <p className="mt-1 text-[15px] leading-6 wrap-break-word text-gray-900">{text}</p>

        {replyTo && (
          <span className="text-[15px] text-[#707E89]">
            Replying to <span className="text-[#33beff]">@{replyTo}</span>
          </span>
        )}
      </div>
    </div>
  );
}

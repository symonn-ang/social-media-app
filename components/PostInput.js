"use client"

import React, { useState } from 'react';
import { PhotoIcon, ChartBarIcon, FaceSmileIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import { useSelector } from 'react-redux';

export default function PostInput({ onPostSuccess }) {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  const user = useSelector((state) => state.user)  
  const isGuest = !user?.uid || user.email === "guest@example.com"

  async function sendPost() {
    if (!text.trim() || loading || isGuest) return

    setLoading(true)

    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user": JSON.stringify(user)  // ← send user info to backend
        },
        body: JSON.stringify({ text: text.trim() })
      })

      if (res.ok) {
        setText("")
        
        if (onPostSuccess) onPostSuccess()
        else if (typeof window.refreshPosts === "function") {
          window.refreshPosts()
        }
      } else {
        alert("Failed to post")
      }
    } catch (err) {
      console.error(err)
      alert("Network error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex space-x-5 p-3 border-b border-gray-200">
      <Image
        src={user?.avatar || "/assets/prof_pic.png"}
        width={44}
        height={44}
        alt="profile"
        className="w-11 h-11 rounded-full object-cover"
      />

      <div className="w-full">
        <textarea
          className="resize-none outline-none w-full min-h-[50px] text-lg placeholder-gray-500"
          placeholder="How's your day?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { // as it says
              e.preventDefault()
              sendPost()
            }
          }}
        />

        <div className="flex justify-between pt-5 border-t border-gray-100">
          <div className="flex space-x-1.5">
            <PhotoIcon className="w-[22px] h-[22px] text-[#ff3377] cursor-pointer opacity-50" />
            <ChartBarIcon className="w-[22px] h-[22px] text-[#ff3377] cursor-pointer opacity-50" />
            <FaceSmileIcon className="w-[22px] h-[22px] text-[#ff3377] cursor-pointer opacity-50" />
            <CalendarIcon className="w-[22px] h-[22px] text-[#ff3377] cursor-pointer opacity-50" />
            <MapPinIcon className="w-[22px] h-[22px] text-[#ff3377] cursor-pointer opacity-50" />
          </div>

          <button
            className="bg-[#ff3377] text-white w-20 h-9 rounded-full text-sm font-medium cursor-pointer disabled:opacity-50 transition hover:bg-[#e02a6a]"
            disabled={!text.trim() || loading}
            onClick={sendPost}
          >
            {loading ? "..." : "Post"}
          </button>
        </div>
        {isGuest && (
          <p className="text-sm text-gray-500 mt-2 text-center mr-14">
            Sign up to post and join the conversation
          </p>
        )}


      </div>
    </div>
  )
}
"use client"

import React, { useState } from 'react';
import { PhotoIcon, ChartBarIcon, FaceSmileIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import { closeCommentModal, openLogInModal } from '@/redux/slices/modalSlice';

export default function PostInput({ onPostSuccess, insideModal, onCommentSuccess }) {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  const user = useSelector((state) => state.user)
  const isGuest = !user?.uid || user.email === "guest@example.com"
  const commentDetails = useSelector((state) => state.modals.commentPostDetails)
  const dispatch = useDispatch()

  async function sendPost() {
    if (!text.trim()) return;
    if (loading) return;
    if (isGuest) {
      alert("Please log in to post!");
      dispatch(openLogInModal());
      return;
    }

    setLoading(true)

    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user": JSON.stringify(user)  // send user info to backend
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

  async function sendComment() {
    if (!text.trim()) return;
    if (loading) return;
    if (isGuest) {
      alert("Please log in to comment!");
      dispatch(openLogInModal());
      return;
    }

    setLoading(true)

    try {
      const res = await fetch(`/api/comments/${commentDetails.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user": JSON.stringify({         // so apparently the problem was here, fixed now for comments logic
            id: user.uid,
            name: user.name,
            username: user.username
          })
        },
        body: JSON.stringify({ text: text.trim() })
      })

      if (res.ok) {
        setText('')
        dispatch(closeCommentModal())
        if (typeof onCommentSuccess === "function") onCommentSuccess() // refresh comments
      } else {
        alert("Failed to comment")
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
        src={user?.avatar || insideModal ? "/assets/prof_pic.png" : "/assets/prof_pic.png"}
        width={44}
        height={44}
        alt={insideModal ? "Profile Picture" : "Other"} // Check later
        className="w-11 h-11 rounded-full object-cover z-10 bg-white"
      />

      <div className="w-full">
        <textarea
          className="resize-none outline-none w-full min-h-[50px] text-lg placeholder-gray-500"
          placeholder={insideModal ? "Send your reply" : "How's your day?"}
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
            onClick={() => insideModal ? sendComment() : sendPost()}
          >
            {insideModal ? "Send" : "Post"}
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
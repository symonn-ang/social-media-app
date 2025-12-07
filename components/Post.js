// components/Post.js  (or wherever you have it)
import React from "react";
import Image from "next/image";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  ChartBarIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline'
import { timeAgo } from '@/utils/timeAgo'   // ← this is the file you just made
import { useSelector } from "react-redux";

export default function Post({ data }) {
  const { name, username, content, created_at, avatar } = data
  const user = useSelector((state) => state.user)  

  return (
    <div className="border-b border-gray-200 hover:bg-gray-50 transition">
      <div className="flex p-3 space-x-3">
        <Image 
          src={user?.avatar || "/assets/prof_pic.png"} 
          width={44} 
          height={44} 
          alt="user" 
          className="w-11 h-11 rounded-full object-cover"
        />

        <div className="flex-1">
          <div className="flex items-center space-x-1 text-sm">
            <span className="font-bold text-black truncate max-w-[120px] sm:max-w-none">
              {name}
            </span>
            <span className="text-gray-500 truncate">@{username}</span>
            <span className="text-gray-500"> · {timeAgo(created_at)}</span>
          </div>

          <p className="mt-2 text-[15px] leading-6">{content}</p>

          <div className="flex justify-between mt-4 max-w-[424px]">
            <button className="flex items-center space-x-2 text-gray-400 hover:text-[#33beff] transition group cursor-pointer">
              <div className="p-2 rounded-full">
                <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
              </div>
              <span className="text-sm">0</span>
            </button>

            <button className="flex items-center space-x-2 text-gray-400 hover:text-red-600 transition group cursor-pointer">
              <div className="p-2 rounded-full">
                <HeartIcon className="w-5 h-5" />
              </div>
              <span className="text-sm">0</span>
            </button>

            <button className="flex items-center space-x-2 text-gray-400 cursor-not-allowed">
              <div className="p-2 rounded-full">
                <ChartBarIcon className="w-5 h-5" />
              </div>
            </button>

            <button className="flex items-center space-x-2 text-gray-400 cursor-not-allowed">
              <div className="p-2 rounded-full">
                <ArrowUpTrayIcon className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
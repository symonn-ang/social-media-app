"use client" // for moment check later if not needed

import React from "react";
import Image from "next/image";
import {
    ChatBubbleOvalLeftEllipsisIcon,
    HeartIcon,
    ChartBarIcon,
    ArrowUpTrayIcon
} from '@heroicons/react/24/outline'
import { timeAgo } from '@/utils/timeAgo'
import { useDispatch, useSelector } from "react-redux";
import { openCommentModal, setCommentDetails } from "@/redux/slices/modalSlice";
import Link from "next/link";

export default function Post({ data }) {
    const dispatch = useDispatch()

    const { id, name, username, content, created_at, avatar } = data // access db, iz const so careful

    return (
        <div className="border-b border-gray-200 hover:bg-gray-50 transition">

            <Link href={'/' + id}
                onClick={() => {
                    dispatch(setCommentDetails({
                        name: name,
                        username: username,
                        id: id,
                        text: content,
                    }))

                }}>
                <PostHeader
                    name={name}
                    username={username}
                    timestamp={created_at}
                    avatar={avatar}
                    text={content}

                />
            </Link>

            <div className="ml-16 p-3 flex space-x-14">
                <div className="relative">
                    <ChatBubbleOvalLeftEllipsisIcon
                        className="w-[22px] h-[22px] cursor-pointer hover:text-[#33beff] transition"
                        onClick={() => {
                            dispatch(setCommentDetails({
                                name: name,
                                username: username,
                                id: id,
                                text: content,
                            }))
                            dispatch(openCommentModal())

                        }}
                    />
                    <span className="absolute text-xs top-1 -right-3">0</span>
                </div>

                <div className="relative">
                    <HeartIcon
                        className="w-[22px] h-[22px] cursor-pointer hover:text-red-600 transition"
                    />
                    <span className="absolute text-xs top-1 -right-3">0</span>
                </div>

                <div className="relative">
                    <ChartBarIcon className="w-[22px] h-[22px] cursor-not-allowed opacity-50" />
                </div>

                <div className="relative">
                    <ArrowUpTrayIcon className="w-[22px] h-[22px] cursor-not-allowed opacity-50" />
                </div>
            </div>
        </div>
    )
}

// using it rn as world func
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

            <div className="text-[15px] flex flex-col space-y-1.5 min-w-0"> {/* min-w-0 fix overflow */}
                <div className="flex space-x-1.5 text-[#707E89]">
                    <span className="font-bold text-black inline-block whitespace-nowrap overflow-hidden text-ellipsis 
          max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-40">
                        {name}
                    </span>
                    <span className="inline-block whitespace-nowrap overflow-hidden text-ellipsis 
          max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-40">
                        @{username}
                    </span>

                    {timestamp && (
                        <>
                            <span>⋅</span>
                            <span>{timeAgo(timestamp)}</span> {/* this is my timestamp.toDate() equivalent in the video */}
                        </>
                    )}
                </div>

                <p className="mt-1 text-[15px] leading-6 wrap-break-word text-gray-900">
                    {text}
                </p>

                {replyTo && (
                    <span className="text-[15px] text-[#707E89]">
                        Replying to <span className="text-[#33beff]">@{replyTo}</span>
                    </span>
                )}
            </div>
        </div>
    )
}
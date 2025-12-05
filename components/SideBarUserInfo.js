"use client"

import Image from "next/image"
import React, { useState } from "react"
import { useSelector } from "react-redux"

export default function SideBarUserInfo() {
    const [showMenu, setShowMenu] = useState(false)

    const user = useSelector((state) => state.user)
    const name = user.name || "Guest User"
    const username = user.username || "guest"
    const avatar = user.avatar || "/assets/ic_profile.png"

    function handleLogout() {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <div className="relative mt-auto w-full">
            {/* Your original clickable row — untouched */}
            <div
                className='absolute bottom-2 flex items-center xl:w-50
                        space-x-2 xl:p-3 xl:pe-6 cursor-pointer hover:bg-gray-500/10
                        rounded-full transition'

                onClick={() => setShowMenu(!showMenu)}
            >
                <Image
                    src={avatar}
                    width={36}
                    height={36}
                    alt='userPic'
                    className='w-9 h-9 rounded-full object-cover'
                />
                <div className='hidden xl:flex flex-col text-sm'>
                    <span className='font-bold'>{name}</span>
                    <span className='text-gray-500'>@{username}</span>
                </div>
            </div>

            {/* Clean pop-out menu — now perfectly aligned */}
            {showMenu && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowMenu(false)}
                    />

                    {/* Menu — matches sidebar width */}
                    <div className="absolute bottom-16 left-4 right-4 xl:left-[-10] xl:right-4 xl:w-50 bg-white border border-gray-800 
          rounded-xl shadow-2xl z-50 overflow-hidden
          
          ">
                       
                        {/* Logout button */}
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-6 py-4 text-black hover:bg-gray-500/10 transition font-medium text-sm
                            cursor-pointer
                            "
                        >
                            Log out @{username}
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
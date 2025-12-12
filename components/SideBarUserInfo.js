"use client"

import Image from "next/image"
import React, { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "@/redux/slices/userSlice";

export default function SideBarUserInfo() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const fileInputRef = useRef(null);

    const [showMenu, setShowMenu] = useState(false)
    const handleFileSelect = () => {
        fileInputRef.current.click(); // trigger file explorer
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("avatar", file);

        const res = await fetch("/api/users/avatar", {
            method: "POST",
            headers: {
                "x-user": JSON.stringify(user),
            },
            body: formData,
        });

        const data = await res.json();
        if (data.success) {
            dispatch(updateAvatar(data.avatar));
            alert("Avatar updated!");
        } else {
            alert(data.error || "Failed to upload");
        }
    };

    const name = user.name || "Guest User"
    const username = user.username || "guest"
    const avatar = user.avatar || "/assets/prof_pic.png"

    function handleLogout() {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <div className="relative mt-auto w-full">
            {/* initial style */}
            <div
                className='absolute bottom-2 flex items-center justify-start w-fit xl:w-60
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
                <div className='hidden xl:flex flex-col text-sm max-w-40'>
                    <span className='whitespace-nowrap text-ellipsis overflow-hidden font-bold'>{name}</span> {/*  overflows, can probly use truncate  */}
                    <span className='whitespace-nowrap text-ellipsis overflow-hidden text-gray-500'>@{username}</span>
                </div>
            </div>

            {/* Clean pop-out menu aligned sidebar divs */}
            {showMenu && (
                <>

                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowMenu(false)}
                    />

                    {/* Menu */}
                    <div className="absolute bottom-18 left-4 right-4 xl:left-[-10] xl:right-4 xl:w-50 bg-white border border-gray-800 
          rounded-xl shadow-2xl z-50 overflow-hidden
          
          ">

                        <button
                            onClick={handleFileSelect}
                            className="w-full text-left px-6 py-4 text-black hover:bg-gray-500/10 transition font-medium text-sm
                            cursor-pointer truncate
                            "
                        >
                            Change Profile Picture
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            name="avatar"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                            {/* logout btn starts hre */}
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-6 py-4 text-black hover:bg-gray-500/10 transition font-medium text-sm
                                cursor-pointer truncate
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
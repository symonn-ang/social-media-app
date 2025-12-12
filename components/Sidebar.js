"use client"

import React from 'react'
import {
    HomeIcon,
    HashtagIcon,
    BellIcon,
    InboxIcon,
    BookmarkIcon,
    UserIcon,
    EllipsisHorizontalCircleIcon
} from '@heroicons/react/24/outline'

import Image from "next/image";
import SideBarUserInfo from './SideBarUserInfo';




export default function Sidebar() {



    return (
        <nav className='h-screen hidden sm:flex flex-col sticky top-0 p-3 pl-0 xl:ml-20 xl:mr-10'>
            <div className='relative h-full flex flex-col items-center'> {/* to seperate side icon and user info */}
                <div className='pl-[5.8] mr-auto'>
                    <Image src={'/assets/logo.png'} width={48} height={48} alt='logo-pic' />
                </div>
                <ul>
                    <SidebarLink Icon={HomeIcon} text="Home" />
                    <SidebarLink Icon={HashtagIcon} text="Explore" />
                    <SidebarLink Icon={BellIcon} text="Notifications" />
                    <SidebarLink Icon={InboxIcon} text="Messages" />
                    <SidebarLink Icon={BookmarkIcon} text="Bookmarks" />
                    <SidebarLink Icon={UserIcon} text="Profile" />
                    <SidebarLink Icon={EllipsisHorizontalCircleIcon} text="More" />
                    <button className='hidden xl:block bg-[#ff3377] w-[200px] h-[52px]
                    rounded-full text-white font-medium cursor-pointer shadow-2xl mt-2'
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        Post
                    </button>
                </ul>

                <SideBarUserInfo />
                
            </div>
        </nav>
    )
}

function SidebarLink({ text, Icon }) {
    return (
        <li className='flex items-center text-xl mb-2 space-x-3 p-2.5'>
            <Icon className="h-7" />
            <span className='hidden xl:block'>{text}</span>
        </li>


    )
}
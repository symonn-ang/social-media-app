import { EllipsisHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import Image from "next/image";

export default function Widgets() {
    return (
        <div className="p-3 
        hidden lg:flex flex-col space-y-4 w-[400px]">

            <div className="bg-[#EFF3F4] text-[#89959D] h-11 
            flex items-center space-x-3 rounded-full pl-5
            ">
                <MagnifyingGlassIcon className="w-5 h-5" />
                <input type="text"
                    placeholder="Search"
                    className="bg-transparent outline-none"
                />
            </div>

            <div className="bg-[#EFF3F4] rounded-xl p-3">
                <h1 className="text-xl font-bold mb-2">
                    What's Happening?
                </h1>

                <div className="flex flex-col py-3 space-y-0.5">
                    <div className="flex justify-between text-[#536471] text-[13px]">
                        <span>Trending in Philippines</span>
                        <EllipsisHorizontalIcon className="w-5" />
                    </div>
                    <span className="font-bold text-sm">#NextJS</span>
                    <span className="text-[#536471] text-xs">24K Posts</span>
                </div><div className="flex flex-col py-3 space-y-0.5">
                    <div className="flex justify-between text-[#536471] text-[13px]">
                        <span>Trending in Philippines</span>
                        <EllipsisHorizontalIcon className="w-5" />
                    </div>
                    <span className="font-bold text-sm">#Sha-huld</span>
                    <span className="text-[#536471] text-xs">15K Posts</span>
                </div><div className="flex flex-col py-3 space-y-0.5">
                    <div className="flex justify-between text-[#536471] text-[13px]">
                        <span>Trending in Philippines</span>
                        <EllipsisHorizontalIcon className="w-5" />
                    </div>
                    <span className="font-bold text-sm">#Christmas</span>
                    <span className="text-[#536471] text-xs">180K Posts</span>
                </div><div className="flex flex-col py-3 space-y-0.5">
                    <div className="flex justify-between text-[#536471] text-[13px]">
                        <span>Trending in Philippines</span>
                        <EllipsisHorizontalIcon className="w-5" />
                    </div>
                    <span className="font-bold text-sm">#Worlds2025</span>
                    <span className="text-[#536471] text-xs">100K Posts</span>
                </div>
            </div>

            <div className="bg-[#EFF3F4] rounded-xl p-3">
                <h1 className="text-xl font-bold mb-2">
                    Who to Follow?
                </h1>

                <div className="flex justify-between items-center py-3">
                    <div className="flex items-center space-x-3">

                        <Image src="/assets/elon.jpg" width={56} height={56} alt="profpic of Elon Musk"
                            className="w-14 h-14 rounded-full" />

                        <div className="flex flex-col text-sm">
                            <span className="font-bold">Elon Musk</span>
                            <span>@elonmusk</span>
                        </div>

                    </div>

                    <button className="bg-[#0F1419] text-white w-[72px] h-10 rounded-full text-sm">
                        Follow
                    </button>
                </div>
                <div className="flex justify-between items-center py-3">
                    <div className="flex items-center space-x-3">

                        <Image src="/assets/john.webp" width={56} height={56} alt="profpic of John Cena"
                            className="w-14 h-14 rounded-full" />

                        <div className="flex flex-col text-sm">
                            <span className="font-bold">John Cena</span>
                            <span>@johncena</span>
                        </div>

                    </div>

                    <button className="bg-[#0F1419] text-white w-[72px] h-10 rounded-full text-sm">
                        Follow
                    </button>
                </div>
                <div className="flex justify-between items-center py-3">
                    <div className="flex items-center space-x-3">

                        <Image src="/assets/michael.jpg" width={56} height={56} alt="profpic of Michael Jackson"
                            className="w-14 h-14 rounded-full" />

                        <div className="flex flex-col text-sm">
                            <span className="font-bold">Michael Jackson</span>
                            <span>@michaeljackson</span>
                        </div>

                    </div>

                    <button className="bg-[#0F1419] text-white w-[72px] h-10 rounded-full text-sm">
                        Follow
                    </button>
                </div>
            </div>


        </div>
    )
}
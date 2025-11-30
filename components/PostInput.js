import React from 'react';
import {
    PhotoIcon,
    ChartBarIcon,
    FaceSmileIcon,
    CalendarIcon,
    MapPinIcon

} from '@heroicons/react/24/outline'

import Image from "next/image";

export default function PostInput() {

    return (
        <div className="flex space-x-5 p-3">
            <Image src="/assets/ic_profile.png" width={44} height={44} alt="prof-pic" className="w-11 h-11" />

            <div className="w-full">
                <textarea className="resize-none outline-none w-full min-h-[50px] text-lg"
                    placeholder="How's your day?"
                />

                <div className="flex justify-between">
                    <div className="flex space-x-1.5">
                        <PhotoIcon className="w-[22px] h-[22px] text-[#ff3377]"/>
                        <ChartBarIcon className="w-[22px] h-[22px] text-[#ff3377]"/>
                        <FaceSmileIcon className="w-[22px] h-[22px] text-[#ff3377]"/>
                        <CalendarIcon className="w-[22px] h-[22px] text-[#ff3377]"/>
                        <MapPinIcon className="w-[22px] h-[22px] text-[#ff3377]"/>
                    </div>
                    <button className=" bg-[#ff3377] text-white w-20 h-9 rounded-full
                    text-sm cursor-pointer
                    ">
                        button
                    </button>
                </div>
            </div>
        </div>
    )

}
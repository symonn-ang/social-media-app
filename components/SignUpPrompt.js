import React from "react";
import SignUpModal from "./modals/SignUpModal";

export default function SignUpPrompt() {
    return (
        <div className="fixed w-full h-20 bg-[#ff3377]
        bottom-0 flex justify-center items-center md:space-x-5
        lg:justify-between lg:px-20 xl:px-40 2xl:px-115
        ">

            <div className="hidden md:flex flex-col text-white">
                <span className="text-xl font-bold">
                    Don't miss out on the fun
                </span>
                <span>
                    People on ChillNet are always up to date.
                </span>
            </div>
            <div className="flex space-x-2 w-full md:w-fit p-3">
                <button className="w-full h-12 md:w-[88px] md:h-10 text-md md:text-sm border-2 border-gray-100
                rounded-full text-white font-bold hover:bg-white/25 transition cursor-pointer
                ">
                    Log In
                </button>
                <SignUpModal />
            </div>

        </div>
    )
}
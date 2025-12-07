"use client"

import React from "react";
import SignUpModal from "./modals/SignUpModal";
import LogInModal from "./modals/LogInModal";
import { useSelector } from "react-redux";

export default function SignUpPrompt() {
    const name = useSelector((state) => state.user.name)
    

    return (
        !name &&
        <div className="fixed w-full h-20 bg-[#ff3377]
        bottom-0 flex justify-center items-center md:space-x-5
        lg:justify-between lg:px-20 xl:px-40 2xl:px-115 z-50
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
                <LogInModal />
                <SignUpModal />
            </div>

        </div>
    )
}
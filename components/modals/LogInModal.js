"use client"

import React, { useState } from "react";
import { Modal } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { closeLogInModal, openLogInModal } from "@/redux/slices/modalSlice";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function LogInModal() {

    const [showPassword, setShowPassword] = useState(false)

    const isOpen = useSelector(
        (state) => state.modals.logInModalOpen
    );
    const dispatch = useDispatch()

    console.log(isOpen)

    return (
        <>
            <button className="w-full h-12 md:w-[88px] md:h-10 text-md md:text-sm border-2 border-gray-100
                rounded-full text-white font-bold hover:bg-white/25 transition cursor-pointer"
                onClick={
                    () => dispatch(openLogInModal())
                }
            >
                Log In
            </button>

            <Modal open={isOpen}
                onClose={
                    () => dispatch(closeLogInModal())
                }
                className="flex justify-center items-center"
            >
                <div className="w-full h-full sm:w-[600px] sm:h-fit bg-white
                sm:rounded-xl
                ">
                    <XMarkIcon className="w-7 mt-5 ms-5 cursor-pointer stroke-2"
                        onClick={() => dispatch(closeLogInModal())}
                    />
                    <form className="pt-10 pb-20 px-4 sm:px-20">
                        <h1 className="text-3xl font-bold mb-10">Log in to ChillNet</h1>
                        <div className="w-full space-y-5 mb-10">

                            <input className="w-full h-[54px] border-2 border-gray-400
                            outline-none pl-3 rounded-sm focus:border-[#ff3377]
                            transition
                            "
                                placeholder="Email" type="email"
                            />
                            <div className="w-full h-[54px] border-2 border-gray-400
                                outline-none rounded-sm focus-within:border-[#ff3377]
                                transition flex items-center overflow-hidden pr-3
                                ">

                                <input placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    className="w-full h-full
                                ps-3 outline-none
                                " />
                                <div
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="w-7 h-7 text-gray-400 cursor-pointer">
                                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                </div>

                            </div>

                        </div>

                        <button className="bg-[#ff3377] text-white h-12 
                        rounded-full shadow-md mb-5 w-full cursor-pointer
                        ">
                            Log In
                        </button>
                        <span className="mb-5 text-sm text-center block">Or</span>
                        <button className="bg-[#ff3377] text-white h-12 
                        rounded-full shadow-md w-full cursor-pointer
                        ">
                            Log In as Guest
                        </button>
                    </form>

                </div>
            </Modal>
        </>
    )

}
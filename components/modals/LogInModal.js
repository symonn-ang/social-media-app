"use client"

import React, { useState } from "react";
import { Modal } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { closeLogInModal } from "@/redux/slices/modalSlice";
import { signInUser } from "@/redux/slices/userSlice";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function LogInModal() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const isOpen = useSelector((state) => state.modals.logInModalOpen)
    const dispatch = useDispatch()

    async function handleLogIn(providedEmail = email, providedPassword = password) {
        if (!providedEmail || !providedPassword) {
            setError("Please fill in both fields")
            return
        }

        setLoading(true)
        setError('')

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: providedEmail, password: providedPassword })
            })

            const data = await res.json()

            if (data.success) {
                dispatch(signInUser({
                    name: data.user.name,
                    username: data.user.username,
                    email: data.user.email,
                    uid: data.user.id
                }))
                dispatch(closeLogInModal())
            } else {
                setError(data.error || "Login failed")
            }
        } catch (err) {
            setError("Network error")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <button
                className="w-full h-12 md:w-[88px] md:h-10 text-md md:text-sm border-2 border-gray-100 rounded-full text-white font-bold hover:bg-white/25 transition cursor-pointer"
                onClick={() => dispatch({ type: "modal/openLogInModal" })} // forgot 
            >
                Log In
            </button>

            <Modal open={isOpen} onClose={() => dispatch(closeLogInModal())} className="flex justify-center items-center">
                <div className="w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl relative">
                    <XMarkIcon 
                    className="absolute top-5 left-5 w-8 cursor-pointer stroke-2" 
                    onClick={() => dispatch(closeLogInModal())} 
                    />

                    <div className="pt-20 pb-20 px-8 sm:px-20">
                        <h1 className="text-3xl font-bold mb-10">Log in to ChillNet</h1>

                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                        <div className="space-y-5 mb-10">
                            <input
                                className="w-full h-[54px] border-2 border-gray-400 rounded-sm pl-4 outline-none focus:border-[#ff3377] transition"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="relative">
                                <input
                                    className="w-full h-[54px] border-2 border-gray-400 rounded-sm pl-4 pr-12 outline-none focus:border-[#ff3377] transition"
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="absolute right-3 top-4 cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeSlashIcon className="w-6" /> : <EyeIcon className="w-6" />}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">

                            <button
                                onClick={() => handleLogIn()}
                                disabled={loading}
                                className="w-full h-12 bg-[#ff3377] text-white rounded-full font-bold hover:bg-[#e02a6a] 
                                transition disabled:opacity-50 cursor-pointer"
                            >
                                {loading ? "Logging in..." : "Log In"}
                            </button>
                            <span className="mt-4 font-medium">Or</span>

                            <button
                                className="w-full h-12 mt-4 border-2 border-gray-400 rounded-full hover:bg-gray-50 cursor-pointer transition"
                                onClick={() => {handleLogIn("guest@example.com", "123456")}} // params
                            >
                                Continue as Guest
                            </button>

                        </div>

                    </div>
                </div>
            </Modal>
        </>
    )
}
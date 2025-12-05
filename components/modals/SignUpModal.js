"use client"

import React, { useEffect, useState } from "react";
import { Modal } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { closeSignUpModal, openSignUpModal } from "@/redux/slices/modalSlice";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function SignUpModal() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const isOpen = useSelector((state) => state.modals.signUpModalOpen) // ← make sure your store uses "modal" not "modals"
  const dispatch = useDispatch()

  async function handleSignUp() {
    if (!name || !email || !password) {
      setError("Please fill in all fields")
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      })

      const data = await res.json()

      if (data.success) {
        alert(`Welcome ${name}! Account created`)
        dispatch(closeSignUpModal())
        // Later: save user to Redux + localStorage
      } else {
        setError(data.error || "Something went wrong")
      }
    } catch (err) {
      setError("Network error — check console")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (!currentUser) return
        
    })

    return unsubscribe

  }, []) // [] means useeffect will only run once when this component first renders - Iman

  return (
    <>
      <button
        className="w-full h-12 md:w-[88px] md:h-10 text-md md:text-sm font-bold bg-white rounded-full cursor-pointer hover:bg-gray-100 transition"
        onClick={() => dispatch(openSignUpModal())}
      >
        Sign up
      </button>

      <Modal open={isOpen} onClose={() => dispatch(closeSignUpModal())} className="flex justify-center items-center">
        <div className="w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl relative overflow-y-auto">
          <XMarkIcon
            className="absolute top-5 left-5 w-8 cursor-pointer stroke-2 hover:opacity-70"
            onClick={() => dispatch(closeSignUpModal())}
          />

          <div className="pt-20 pb-20 px-8 sm:px-20">
            <h1 className="text-3xl font-bold mb-10">Create your account</h1>

            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            <div className="space-y-5 mb-10">
              <input
                className="w-full h-[54px] border-2 border-gray-400 rounded-sm pl-4 outline-none focus:border-[#ff3377] transition"
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
                <div
                  className="absolute right-3 top-4 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlashIcon className="w-6" /> : <EyeIcon className="w-6" />}
                </div>
              </div>
            </div>

            <button
              onClick={handleSignUp}
              disabled={loading}
              className="w-full h-12 bg-[#ff3377] text-white rounded-full font-bold hover:bg-[#e02a6a] transition 
              cursor-pointer disabled:opacity-50"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>

            <button
              className="w-full h-12 mt-4 border-2 border-gray-400 rounded-full hover:bg-gray-50 cursor-pointer transition"
              onClick={() => {
                setName("Guest User")
                setEmail("guest@example.com")
                setPassword("123456")
              }}
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
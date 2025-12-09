"use client"

import { LinearProgress } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import { loadingScreenOpen } from "@/redux/slices/loadingSlice";

export default function LoadingScreen() {
  const loadingScreenOpen = useSelector((state) => 
    state.loading.loadingScreenOpen
)
  
    return (
    <div className={`fixed top-0 left-0 bottom-0 right-0
    bg-white flex items-center justify-center transition ${loadingScreenOpen ? "opacity-100 z-50" : "opacity-0 -z-50"}
    `}>
        <div className='flex flex-col items-center'>
            <Image 
            src={'/assets/logo.png'}
            width={120}
            height={120}
            alt='ChillNet Logo'
            className='mb-5'
            />

            <h1 className='text-6xl font-bold mb-10 mr-5'>
                Chill <span className='text-[#ff3377]'>Net</span>
            </h1>

            <LinearProgress sx={{
                width: 265,
                height: 10,
                backgroundColor: "#ff3377",
                "& .MuiLinearProgress-bar": {
                    backgroundColor: "#000000"
                }
            }} />
        </div>

    </div>
  )
}

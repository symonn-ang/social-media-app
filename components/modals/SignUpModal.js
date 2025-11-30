"use client"

import React, { useState } from "react";
import { Modal } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { closeSignUpModal, openSignUpModal } from "@/redux/slices/modalSlice";

export default function SignUpModal() {

    // const [isOpen, setIsOpen] = useState(false)

    // const handleClose = () => {
    //     setIsOpen(false);
    // }

    // const handleOpen = () => {
    //     setIsOpen(true);
    // }

    const isOpen = useSelector(
        (state) => state.modals.signUpModalOpen
    );
    const dispatch = useDispatch()

    console.log(isOpen)

    return (
        <>
            <button className="w-full h-12 md:w-[88px] md:h-10 text-md md:text-sm font-bold bg-white
                rounded-full cursor-pointer"
                onClick={
                    () => dispatch(openSignUpModal())
                }
                >
                Sign up
            </button>

            <Modal open={isOpen} 
            onClose={
                () => dispatch(closeSignUpModal())
            }
            className="flex justify-center items-center"
            >
                <div className="w-[200px] h-[400px] bg-white">

                </div>
            </Modal>
        </>
    )

}
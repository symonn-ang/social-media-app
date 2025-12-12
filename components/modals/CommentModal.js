"use client"

import React from 'react'
import { Modal } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { closeCommentModal } from '@/redux/slices/modalSlice'
import Image from 'next/image'
import PostInput from '../PostInput'
import { PostHeader } from '../Post'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function CommentModal() {

    const open = useSelector((state) => state.modals.commentModalOpen)
    const commentDetails = useSelector((state) => state.modals.commentPostDetails)
    const dispatch = useDispatch()

    return (
        <>

            <Modal
                open={open}
                onClose={() => dispatch(closeCommentModal())}
                className='flex justify-center items-center'
            >

                <div className='w-full h-full sm:w-[600px] sm:h-fit bg-white
                sm:rounded-xl outline-none relative
                '>
                    <XMarkIcon 
                    className="w-6 mt-5 ms-5 cursor-pointer stroke-2" 
                    onClick={() => dispatch(closeCommentModal())} 
                    />

                    <div className='pt-5 pb-10 px-0 sm:px-5 flex flex-col'>
                        <PostHeader
                            name={commentDetails.name}
                            username={commentDetails.username}
                            text={commentDetails.text}
                            replyTo={commentDetails.username}
                            avatar={commentDetails.avatar}
                        />
                        <div className='mt-4'>

                            <PostInput 
                            insideModal={true}
                            />
                        </div>

                        <div className='absolute w-0.5 h-32 bg-gray-300
                        left-8 sm:left-[53px] top-20 z-0
                        '></div>

                    </div>
                </div>
            </Modal>

        </>
    )
}




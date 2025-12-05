import React from "react";
import PostInput from "./PostInput";
import Post from "./Post";

export default function PostFeed() {

    return(
        <div className="grow border-x border-gray-400 max-w-2xl">

            <div className="py-4 px-3 text-lg sm:text-xl sticky top-0
            z-50 bg-white/80 backdrop-blur-sm font-bold border-b border-gray-200 
            ">
                Home
            </div>
            <PostInput />
            <Post />
        </div>
    )

}
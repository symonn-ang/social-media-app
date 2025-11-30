import Head from 'next/head'
import Sidebar from "@/components/Sidebar";
import PostFeed from "@/components/PostFeed";
import Widgets from '@/components/Widgets';

import Image from "next/image";

export default function Home() {
  return (
    <>
        
      <div className="text-[#000000] min-h-screen 
      border-2 border-black max-w-[1400px] mx-auto
      flex  
      ">
        <Sidebar />
        <PostFeed />
        <Widgets />
      </div>



    </>

  );
}

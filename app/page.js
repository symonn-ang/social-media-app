import Head from 'next/head'
import Sidebar from "@/components/Sidebar";
import PostFeed from "@/components/PostFeed";
import Widgets from '@/components/Widgets';
import SignUpPrompt from '@/components/SignUpPrompt';

import Image from "next/image";
import CommentModal from '@/components/modals/CommentModal';
import LoadingScreen from '@/components/modals/LoadingScreen';

// color scheme #ff3377

export default function Home() {
  return (
    <>

      <div className="text-[#000000] min-h-screen 
      max-w-[1400px] mx-auto
      flex justify-center
      ">
        <Sidebar />
        <PostFeed />
        <Widgets />
      </div>

      <CommentModal />
      <SignUpPrompt />
      <LoadingScreen />


    </>

  );
}

'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { FaCirclePlus } from "react-icons/fa6";

interface noteType {
  _id: string;
  note: string;
}

export default function Home() {
  const router = useRouter();
  const [note, setNote] = useState<noteType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNote = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/getNote/');
        if(Array.isArray(data)){
          setNote(data)
        }else{
          setNote([])
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };
    getNote();
  }, []); // 👈 সিনট্যাক্স ফিক্স করা হয়েছে

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        <p className="ml-3 text-zinc-600 dark:text-zinc-400 font-medium">Loading notes...</p>
      </div>
    );
  }

  return (
    // h-96 পরিবর্তন করে min-h-screen করা হয়েছে এবং প্যাডিং নিচে দেওয়া হয়েছে
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans dark:bg-black text-zinc-900 dark:text-white">
      
      {/* 🧭 নেভবার এখন পুরো স্ক্রিন জুড়ে টপে থাকবে */}
      <nav className="w-full h-16 flex items-center justify-between px-6 border-b border-amber-600/30 sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-xl text-amber-600 tracking-wide">MyNotes</h1>
        </div>

        {/* Right Side: Profile Image Box */}
        <div 
          onClick={() => router.push("/myProfile")}
          className="w-10 h-10 rounded-full bg-amber-100 dark:bg-zinc-800 flex items-center justify-center cursor-pointer border-2 border-amber-500 overflow-hidden hover:scale-105 transition-transform"
        >
          {/* এখানে তোমার ইমেজ বা ইউজারের নামের ১ম অক্ষর দিতে পারো */}
          <span className="text-amber-600 font-bold text-sm">U</span>
        </div>
      </nav> 

      {/* 📝 নোটস এরিয়া (প্যাডিং সহ) */}
      <main className="flex-1 p-6 flex flex-col items-center gap-4 w-full max-w-4xl mx-auto">
        {note.length === 0 ? (
          <div className="text-center mt-20 text-zinc-400">
            <p className="text-lg">No notes found!</p>
            <p className="text-sm">Click the plus button to add one.</p>
          </div>
        ) : (
          note.map((item) => (
            <div 
              key={item._id}
              className="w-full h-24 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex items-center overflow-hidden" 
              onClick={() => router.push(`/edit/${item._id}`)}
            >
              <p className="line-clamp-2 text-base font-medium">{item.note}</p>
            </div>
          ))
        )}
      </main>
      <Link href='/notes' className="fixed bottom-10 right-10 text-amber-500 hover:text-amber-600 hover:scale-110 transition-transform active:scale-95 drop-shadow-lg z-50">
        <FaCirclePlus className="size-14" />
      </Link>

    </div>
  );
}
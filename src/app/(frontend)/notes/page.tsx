'use client';

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation"; // 👈 রিডাইরেক্ট করার জন্য ইম্পোর্ট

export default function Page() {
  const router = useRouter(); // 👈 রাউটার ইনিশিয়েট করা হলো
  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false); // 👈 লোডিং স্টেট

  const handleSave = async () => {
    if (!note.trim()) {
      alert("Note cannot be empty!"); // খালি নোট সেভ করা ব্লক করা হলো
      return;
    }

    try {
      setIsSaving(true);
      
      // ব্যাকএন্ডে ডাটা পাঠানো হচ্ছে
      await axios.post('/api/save', { note });
      
      // ১. সফলভাবে সেভ হলে ইনপুট ফিল্ড খালি করো
      setNote(''); 
      
      // ২. হোমপেজে রিডাইরেক্ট করো যেখানে সব নোট দেখায়
      router.push('/'); 
      
      // ৩. হোমপেজের ডাটা রিফ্রেশ করো যেন নতুন নোটটি সাথে সাথে লিস্টে চলে আসে
      router.refresh(); 
      
    } catch (error) {
      console.error("Failed to save note:", error);
      alert("Something went wrong while saving the note.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-zinc-50 dark:bg-black font-sans">
      <textarea
        name="header"
        placeholder="Start typing your note..."
        className="w-full h-full p-10 text-2xl bg-transparent border-none outline-none 
                   text-zinc-800 dark:text-zinc-100 
                   placeholder:text-zinc-300 dark:placeholder:text-zinc-700
                   resize-none overflow-y-auto"
        autoFocus
        onChange={(e) => setNote(e.target.value)}
        value={note}
        disabled={isSaving} // সেভ হওয়ার সময় টাইপিং ব্লক থাকবে
      ></textarea>

      <div className="fixed bottom-10 right-10">
        <button 
          className={`px-6 py-3 rounded-full font-bold shadow-lg transition-all text-black
            ${isSaving 
              ? 'bg-amber-300 cursor-not-allowed opacity-70' 
              : 'bg-amber-400 hover:bg-amber-500 cursor-pointer active:scale-95'
            }`} 
          onClick={handleSave} 
          disabled={isSaving} // ডাবল ক্লিক প্রিভেন্ট করার জন্য
        >
          {isSaving ? 'Saving...' : 'Save Note'}
        </button>
      </div>
    </div>
  );
}
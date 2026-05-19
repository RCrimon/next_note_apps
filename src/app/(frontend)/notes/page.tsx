'use client'

import axios from "axios";
import { useState } from "react";


export default  function page() {
  const [note , setNote]= useState('')
  const handleSave = async ()=>{
  return await axios.post('/api/save',{note})
  }
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
    onChange={(e)=>setNote(e.target.value)}
    value={note}
  ></textarea>
  <div className="fixed bottom-10 right-10" >
    <button className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-3 rounded-full font-bold shadow-lg transition-all cursor-pointer" onClick={handleSave} >
      Save Note
    </button>
  </div>
  </div>
  )
}

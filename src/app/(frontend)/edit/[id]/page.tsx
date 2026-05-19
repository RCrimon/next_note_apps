'use client'

import axios from "axios";
import { useEffect, useState } from "react";

interface noteType {
  id:string,
  note:string
}
export default  function page({params}: {params : Promise<{id:string}>}) {
  const [noteData,setNoteData]= useState<noteType | null>(null)
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    const getNote = async ()=>{
      try {
        setLoading(true)
        const {id} = await params
        const {data} = await axios.get(`/api/editNote/${id}`)
        setNoteData(data)
      } catch (error) {
        console.log(error)
      } finally{
        setLoading(false)
      }
    }
    getNote()
  },[params])

  const handleSave = async ()=>{
    try {
      const {id} = await params
      const update = await axios.put(`/api/update/${id}`,noteData)
      alert('save')
      return update.data
    } catch (error) {
      console.log(error)
    }
  }
  
  if(loading){
     return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3">Loading notes...</p>
      </div>
    );
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
    value={noteData?.note || ''}
    onChange={(e)=> setNoteData(prev => prev ? {...prev, note:e.target.value} : null)}
  ></textarea>
  <div className="fixed bottom-10 right-10">
    <button className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-3 rounded-full font-bold shadow-lg transition-all cursor-pointer" onClick={handleSave}>
      Save Note
    </button>
  </div>
</div>
  )
}

'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface noteType {
  _id:string,
  note:string,
}

export default function Home() {
  const router = useRouter()
  const [note,setNote] = useState<noteType []>([])
  const [loading,setLoading] = useState(true)

 useEffect(()=>{
  const getNote = async ()=>{
    try {
      setLoading(true)
      const {data} = await axios.get('/api/getNote/')
      setNote(data)
    } catch (error) {
      console.log(error)
    } 
    finally{
      setLoading(false)
    }
  }
  getNote()
 }
 ,[])

 if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3">Loading notes...</p>
      </div>
    );
  }
  return (
  <div className=" h-96 flex flex-col flex-1 items-center p-5 gap-5 bg-zinc-50 font-sans dark:bg-black">

    <nav className="w-full h-16 flex items-center justify-between px-6 border-b border-yellow-600 sticky bg-black top-0 z-50">
        {/* Left Side: Hamburger Menu */}
        <div className="flex items-center gap-4">
          <button 
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
          </button>
          <h1 className="font-bold text-xl text-amber-600">MyNotes</h1>
        </div>

        {/* Right Side: Profile Image Box */}
        <div 
          onClick={() => router.push("/myProfile")}
          className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center cursor-pointer border-2 border-amber-500 overflow-hidden hover:scale-105 transition-transform"
        >
        </div>
      </nav> 

    {note.map((item)=>{
     return <div key={item._id}className="w-full max-w-6xl h-28 bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-xl p-5 shadow-xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 transform hover:-translate-y-1" onClick={()=>router.push(`/edit/${item._id}`)}>
      {item.note}
    </div>
    })}
  </div>
  );
}

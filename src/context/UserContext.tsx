'use client'

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type userContextType = {
  user : userType | null | undefined,
  setUser : (user: userType | null)=> void
}

type userType = {
  name: string,
  email: string,
  id: string,
  image: string
}

export const userDataContext = React.createContext<userContextType | undefined>(undefined)

export default function UserContext({children}:{children:React.ReactNode}){
  const [user,setUser] = useState <userType | null>(null)
  const data = {
    user,
    setUser
  }
  const session = useSession()
  useEffect(()=>{
    async function getUser(){
      try {
        const result = await axios.get('/api/auth/user')
        setUser(result.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  },[session])
  return (
    <userDataContext.Provider value={data}>
      {children}
    </userDataContext.Provider>
  )
}
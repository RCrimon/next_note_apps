'use client'

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type userType = {
  name: string;
  email: string;
  id: string;
  image: string;
}

type userContextType = {
  user: userType | null | undefined;
  setUser: (user: userType | null) => void;
}

export const userDataContext = React.createContext<userContextType | undefined>(undefined);

export default function UserContext({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<userType | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      
      if (!user || user.id !== session.user.id) {
        setUser({
          id: session.user.id,
          name: session.user.name || '',
          email: session.user.email || "",
          image: session.user.image || ""
        });
      }
    } else if (status === 'unauthenticated' && user !== null) {
      setUser(null);
    }
  }, [session?.user, status, user]);

  const data = {
    user,
    setUser
  };

  return (
    <userDataContext.Provider value={data}>
      {children}
    </userDataContext.Provider>
  );
}
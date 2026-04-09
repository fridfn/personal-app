import { db } from "@/firebase"
import { useAuth } from "@/hooks/useAuth"
import { ref, onValue } from "firebase/database"
import React, { useState, useEffect } from "react"

export const useRealDatabase = (path = "broadcast") => {
  const { user } = useAuth()
  const [ database, setDatabase ] = useState([])
  const [ isLoading, setLoading ] =useState(true)
  const [ formattedDatabase, setFormattedDatabase ] = useState([])
  
  useEffect(() => {
   if (!user) return;
   const databaseRef = ref(db, path);
   const databaseRefUser = ref(db, `users/${user.uid}`);
   
   const databaseUser = onValue(databaseRefUser, (snapshot) => {
     const authUser = snapshot.val()
     const localUser = localStorage.getItem("user-data")
     // check apakah email sama dengan yang di login kan
     let authEmail = authUser.account.email
     let localEmail = JSON.parse(localUser)?.account?.email;
     
     setDatabase(authUser)
     if (localEmail === authEmail || !localEmail) {
       localStorage.setItem("user-data", JSON.stringify(snapshot.val()))
       // clearing cache user mood sebelumnya
        localStorage.removeItem("mood")
     }
   })
   
   const refrenceDatabase = onValue(databaseRef, (snapshot) => {
    const data = snapshot.val()
    
    //console.log(data, path)
    if (data) {
      const formatted = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        })
      )
     setLoading(false)
     setFormattedDatabase(formatted)
    } else {
     setDatabase([])
    }
   })
   
   return () => refrenceDatabase();
  }, [path, user])

  return {
   database,
   isLoading,
   formattedDatabase,
  }
}
import { db } from "@/firebase"
import { ref, set, update } from "firebase/database"
import { generateKey } from "@/utils/generateKey"
import { useAuth } from "@/hooks/useAuth"
import React, { useState, useEffect } from "react"
import { useNotificationContext } from "@/context/notificationContext"
import {  useRealDatabase } from "@/hooks/useRealDatabase"

export const useSpotify = (songs) => {
  const { user } = useAuth();
  const [ isLoading, setLoading ] = useState(true)
  const [ dataMusic, setDataMusic ] = useState(undefined)
  const { showNotification } = useNotificationContext();
  const { keyDate, keyYear, monthNameNow } = generateKey();
  
  const { formattedDatabase } = useRealDatabase(`users/${user?.uid}/activity/${keyYear}/${monthNameNow}`)
  
  useEffect(() => {
    if (formattedDatabase && formattedDatabase.length > 0) {
       setDataMusic(formattedDatabase)
       setLoading(false)
    }
  }, [formattedDatabase])
  
  const saveSpotifyMusic = async (selectedMusic) => {
    const { keyDate, keyYear, keyDateTime, monthNameNow } = generateKey(false)
    const userUid = user.uid;
    
    try {
      await update(ref(db, `users/${userUid}/activity/${keyYear}/${monthNameNow}/${keyDate}/music/`), {
        music: selectedMusic,
        updatedAt: new Date().toISOString()
      })
      
      // console.log("music saved:", {selectedMusic})
   } catch (err) {
      console.log("Error saved mood:", err)
   }
  }
  
  return {
   dataMusic,
   isLoading,
   saveSpotifyMusic,
  }
}
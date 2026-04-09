import { db } from "@/firebase"
import { generateKey } from "@/utils/generateKey"
import React, { useState, useEffect } from "react"
import { ref, set, update } from "firebase/database"
import { useAuth } from "@/hooks/useAuth"
import { useNotificationContext } from "@/context/notificationContext"
import {  useRealDatabase } from "@/hooks/useRealDatabase"
import { formatKeyToDate } from "@/utils/formatKeyToDate"

export const useMood = (fullDateMonth = []) => {
  const { user } = useAuth();
  const [ timer, setTimer ] = useState("")
  const [ isMood, setMood ] = useState(null)
  const [ dataMood, setDataMood ] = useState([])
  const [ moodCount, setMoodCount ] = useState({})
  const { keyDate, keyYear, monthNameNow } = generateKey()
  const [ isLoading, setLoading ] = useState(true)
  const { formattedDatabase } = useRealDatabase(`users/${user?.uid}/activity/${keyYear}/${monthNameNow}`)
 
  const { showNotification } = useNotificationContext();
  
  const handleMoodSelect = (moodSelected) => {
   setMood(moodSelected)
   if (isMood === moodSelected) return;
   
   showNotification({
     timer: true,
     typeNotification: "success",
     message: `Success set mood : ${moodSelected}!`
   })
   
   if (timer) clearTimeout(timer)
     const newTimer = setTimeout(() => {
       saveMood(moodSelected)
     }, 2000)
     
     setTimer(newTimer)
   }
  
  useEffect(() => {
    if (formattedDatabase.length > 0 || fullDateMonth.length > 0) {
      const yearMonth = keyDate.slice(0, 6)
      const result = fullDateMonth.map((data) => {
        const date = yearMonth + data.date;
        const dateNow = date === keyDate;
        const found = formattedDatabase.find(
          (item) => {
          return item.id === date ||
           item.id === date &&
           date === keyDate
        })
        
        return {
          dateNumber: data?.date,
          dayName: data?.dayName,
          yesterday: data?.yesterday,
          moods: found?.moods?.moods || "default",
          exist: !dateNow ? !!found : true,
        }
      })
      
      if (result.length > 0) {
        setDataMood(result);
      }
      setLoading(false)
    }
  }, [formattedDatabase])
  
  useEffect(() => {
    if (dataMood) {
      const resultMood = formattedDatabase.map((moods) => { return moods })
      let todayMood = resultMood.pop() || resultMood
      
      const localeMood = JSON.parse(localStorage.getItem("mood"));
      
      const dateNow = formatKeyToDate({
        key: new Date().toISOString()
      }).formattedDate
      const datePast = formatKeyToDate({
        key: localeMood?.moods?.updatedAt
      }).formattedDate
      
      if (localeMood !== null && localeMood !== "[]" && dateNow !== datePast) {
        if (
         todayMood?.moods?.moods !== undefined &&
         localeMood?.moods?.moods !== undefined
        ) {
         todayMood.moods.moods = "default"
       }
      }
      
      localStorage.setItem("mood", JSON.stringify(todayMood));
      
      setMood(todayMood?.moods?.moods)
      setLoading(false)
    }
  }, [formattedDatabase])
  
  const saveMood = async (selectedMood) => {
    const { keyDate, keyYear, keyDateTime, monthNameNow } = generateKey(false)
    const userUid = user.uid;
    
    try {
      await update(ref(db, `users/${userUid}/activity/${keyYear}/${monthNameNow}/${keyDate}/moods/`), {
        moods: selectedMood,
        description: "-",
        updatedAt: new Date().toISOString()
      })
     //console.log("Mood saved:", selectedMood)
   } catch (err) {
    console.log("Error saved mood:", err)
   }
  }
  
  return {
    isMood,
    dataMood,
    isLoading,
    moodCount,
    handleMoodSelect
  }
}
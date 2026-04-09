import { db } from "@/firebase"
import { ref, onValue } from "firebase/database"
import { useEffect, useState } from "react"

export const usePublicDatabase = (path) => {
  const [ databasePublic, setData ] = useState([])
  const [ loading, setLoading ] = useState(true)
  
  useEffect(() => {
    const databaseRef = ref(db, path)
    
    const unsub = onValue(databaseRef, (snapshot) => {
      const res = snapshot.val()
      if (res) {
       const formarted = Object.entries(res).map(([id, value]) => ({
         id,
         ...value
       }))
       
       setData(formarted)
      }
      
      setLoading(false)
    })
    
    return () => unsub()
  }, [path])
  
  return { databasePublic, loading }
}
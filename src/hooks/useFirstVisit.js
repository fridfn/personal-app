import { useState, useEffect } from "react"

const useFirstVisit = ( key = "defaultKey", duration = 3000 ) => {
  const [showLoading, setShowLoading] = useState(() => {
   const hasVisited = sessionStorage.getItem(`visited:${key}`);
   return !hasVisited;
  });
  
  useEffect(() => {
   const hasVisited = sessionStorage.getItem(`visited:${key}`)
   
   if (!hasVisited) {
    setShowLoading(true)
    
    const timeout = setTimeout(() => {
     sessionStorage.setItem(`visited:${key}`, "true")
     setShowLoading(false)
    }, 13000)
    
     return () => clearTimeout(timeout);
   } else {
    const timeout = setTimeout(() => {
     setShowLoading(false)
    }, duration)
   }
  }, [key, duration])
  
  return showLoading
}

export default useFirstVisit;
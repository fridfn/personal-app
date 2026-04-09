import React, { useState, useEffect, useRef } from "react"

export const useSticky = (ref, debounce = 150) => {
  const [ isStuck, setStuck ] = useState(false)
  const timeoutRef = useRef(null)
  
  useEffect(() => {
    if (!ref.current) return "ref not defined"
    
    const observer = new IntersectionObserver(([entry]) => {
       if (timeoutRef.current) {
         clearTimeout(timeoutRef.current)
       }
       
       timeoutRef.current = 
       setTimeout(() => {
         setStuck(entry.intersectionRatio < 1)
       }, debounce)
     },
     { threshold: [1] }
    )
    
    observer.observe(ref.current)
    
    return () => {
      observer.disconnect()
      if (timeoutRef.current) {
       clearTimeout(timeoutRef.current)
      }
    }
  }, [ref, debounce])
  return isStuck
}
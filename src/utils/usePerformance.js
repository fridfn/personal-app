import react, { useEffect, useState } from "react"

export const usePerformance = (resource = "accounts:") => {
  const [ dataPerformance, setPerformance ] = useState({})
  
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (entry.name.includes(resource)) {
          setPerformance({
            url: entry.name,
            duration: Math.round(entry.duration),
            waiting: Math.round(entry.responseEnd - entry.responseStart)
          })
        }
      })
    })
    
    observer.observe({ 
      entryTypes: ["resource"], 
      buffered: true
    })
    
    return () => observer.disconnect()
  }, [])
  
  return {
   dataPerformance
  }
}
import { createContext, useContext, useEffect, useState } from "react"

const PerformanceContext = createContext()

export const PerformanceProvider = ({ children }) => {
  const [ dataPerformance, setPerformance ] = useState(null)
  
  const testPerformance = (resource = "accounts:") => {
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
  }
  
  return (
   <PerformanceContext.Provider value={{
      testPerformance,
      dataPerformance
    }}>
     {children}
   </PerformanceContext.Provider>
  )
}

export const usePerformance = () => useContext(PerformanceContext)
import React, { useState, useEffect } from "react"

export const useFetchingData = ({ url }) => {
  const [ error, setError ] = useState(false)
  const [ result, setResult ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  
  useEffect(() => {
   if (!url) return;
   
   async function fetchData() {
    setLoading(true)
    
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error status: ${res.status}`)
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(true)
      console.log(err.message, "failed fetch in function useFetchingData")
    } finally {
      setLoading(false)
    }
   } 
   
   fetchData()
  }, [url])
  
  return {
   loading,
   result,
   error
  }
}
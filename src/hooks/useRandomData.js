import React, { useState, useEffect } from "react"
import { useFetchingData } from "@/hooks/useFetchingData"

export const useRandomData = ({ url, arr }) => {
   const { result, loading, error } = useFetchingData({ url, arr })
   const [ randomData, setRandomData ] = useState(null)
   
   useEffect(() => {
     if (result && Array.isArray(result[arr]) && result[arr].length > 0) {
       const randomIndex = Math.floor(Math.random() * result[arr].length)
       setRandomData(result[arr][randomIndex])
     }
   }, [result, arr])
   
   return {
     randomData, 
     loading,
     error
   }
}
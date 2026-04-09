 import React, { useState, useEffect } from "react"
 import { useThemeHelper } from "@/context/themeContext"
 
 export const useGetShadowColor = (data) => {
  const { theme } = useThemeHelper();
  const [ colorShadow, setColorShadow ] = useState(null)
  
  useEffect(() => {
   const updateColor = () => {
     const root = document.documentElement
     const getColor = getComputedStyle(root).getPropertyValue("--primary-background").trim()
     
     setColorShadow(getColor);
   }
   
   const timeout = setTimeout(updateColor, 0)
   
   return () => clearTimeout(timeout)
  }, [theme, data]);
  
  return {
   colorShadow
  }
}
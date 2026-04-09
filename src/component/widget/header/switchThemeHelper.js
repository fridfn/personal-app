import { useThemeHelper } from "@/context/themeContext"
import React, { useState, useEffect } from "react"

export const switchThemeHelper = () => {
  const { theme, themeToggle } = useThemeHelper();
  
  const root = document?.documentElement
  const secondaryColor = getComputedStyle(root).getPropertyValue("--primary-color-text").trim()
  const primaryColor = getComputedStyle(root).getPropertyValue("--description-text").trim()
  
  const [ isColorBell, setColorBell ] = useState({
   secondaryColor: secondaryColor,
   primaryColor: primaryColor
  })
  
  useEffect(() => {
   setColorBell({
     secondaryColor: secondaryColor,
     primaryColor: primaryColor
   })
  }, [theme])
  
  return {
    theme,
    themeToggle,
    primaryColor,
    secondaryColor
  }
}
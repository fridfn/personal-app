import React, { useState, useEffect, useContext, createContext } from "react"

const ThemeContext= createContext();

export const ThemeProvider = ({ children }) => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const savedTheme = localStorage.getItem("theme") ?? (prefersDark ? "dark" : "light");
  const [ colors, setColors ] = useState("")
  const [ theme, setTheme ] = useState(savedTheme)
  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    const bg = getComputedStyle(document.documentElement).getPropertyValue("--primary-background").trim();
    
    requestAnimationFrame(() => {
      if (meta) {
       meta.setAttribute("content", bg);
      }
    })
    
    localStorage.setItem("theme", theme);
  }, [theme])
  
  useEffect(() => {
   const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
   
   const handleChange = (e) => setTheme(e.matches ? "dark" : "light")
   
   mediaQuery.addEventListener("change", handleChange)
   
   return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])
  
  const themeToggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }
  
  return (
   <ThemeContext.Provider value={{ 
     theme,
     themeToggle
   }}>
      {children}
   </ThemeContext.Provider>
  )
}

export const useThemeHelper = () => useContext(ThemeContext)
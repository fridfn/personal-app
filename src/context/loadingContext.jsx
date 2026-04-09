import { useNavigate } from "react-router-dom"
import React, { useState, useEffect, useContext, createContext } from "react"

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const navigate = useNavigate()
  const [ open, handleOpened ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  
  const showLoading = ({ path, timer }) => {
    const numberTimer = typeof(timer) === "number" ? timer : 1800;
    document.documentElement.classList.add("hidden")
    
    setLoading(true)
    
    setTimeout(() => {
      setLoading(false)
      document.documentElement.classList.remove("hidden")
      if (path) hideLoading({ path });
    }, numberTimer);
   }
  
  const hideLoading = ({ path }) => {
    if (path) navigate(path)
    setTimeout(() => setLoading(false), 300)
  }
  
  const withLoading = async (callback, timer = 1800) => {
   showLoading({ timer })
   return await callback()
  }
  
  return (
    <LoadingContext.Provider
      value={{
       open,
       loading,
       showLoading,
       withLoading,
       handleOpened
      }}
    >
     {children}
    </LoadingContext.Provider>
  )
}

export const useLoadingContext = () => useContext(LoadingContext)
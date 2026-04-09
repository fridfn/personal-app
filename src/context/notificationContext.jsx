import { useContext, createContext, useState, useEffect } from "react"

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [ type, setType ] = useState("")
  const [ timer, setTimer ] = useState(false)
  const [ notification, setNotification ] = useState([])
  
  const showNotification = ({ message, timer = {}, index, typeNotification }) => {
   setNotification((prevNotification) => {
     const id = Date.now();
     const numberTimer = typeof(timer) === "number" ? timer : 1800;
     if (!Array.isArray(prevNotification)) {
      return [{ id, message }]
     }
     
     if (timer) {
       const delayPerIndex = prevNotification.length + 1;
       setTimeout(() => {
        hideNotification(id)
       }, delayPerIndex * numberTimer)
     }
     
     return [...prevNotification, {
       id, message
     }]
   })
   
   setTimer(timer)
   setType(typeNotification)
  }
  
  const hideNotification = (id) => {
   setNotification((prevNotification) => 
    prevNotification.filter((notification) => notification.id !== id)
   )
  }
  
  return (
   <NotificationContext.Provider
     value={{
       type,
       notification,
       showNotification,
       hideNotification,
     }}>
     {children}
   </NotificationContext.Provider>
  )
}

export const useNotificationContext = () => useContext(NotificationContext)
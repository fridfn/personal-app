import React, { useEffect, useState } from "react"

export const usePopup = () => {
  const [ timer, setTimer ]= useState(4000)
  const [ popup, setPopup ] = useState(false)
  const [ message, setMessage ]= useState("")
  const [ popupData, setPopupData ]= useState([])
  
  const openPopup = ({ data, index, time }) => {
   const selectedLink = Array.isArray(data) ? data[index] : data;
   setPopupData({
     ...data,
     selectedLink,
   })
   
   setPopup(true)
   setMessage(data)
   if (!time) setTimer(false)
   if (time) setTimer(time ?? 4000)
  }
  
  const closePopup = () => {
    setPopupData(null)
    setPopup(false)
  }
  
  useEffect(() => {
    let timerPopup;
    
    if (timer && popup) {
      timerPopup = setTimeout(() => {
        setPopup(false)
      }, 4000)
    }
    
    if (timer) {
     return () => clearTimeout(timerPopup)
    }
  }, [popup])
  
  return {
   popup,
   message,
   openPopup,
   popupData,
   closePopup,
   setMessage,
  }
}
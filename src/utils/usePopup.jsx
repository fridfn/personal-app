import React, { useState } from "react"

const UsePopup = () => {
  const [ isOpen, setIsOpen ] = useState(false)
  const [ popupData, setPopupData ]= useState([])
  
  const openPopup = ({ props }) => {
   const { data, index } = props;
   const selectedLink = data[index] || data
   
   setPopupData({
    ...data,
    selectedLink,
   })
   setIsOpen(true)
  }
  
  const closePopup = () => {
    setPopupData(null)
    setIsOpen(false)
  }
  
  return {
    isOpen,
    popupData,
    openPopup,
    closePopup,
  }
}

export default UsePopup;
import metadata from "@/metadata"
import React, { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/context/languageContext"
import LanguageOption from "@/component/widget/header/languageOption"
import IonIcon from "@/component/ui/common/ionicon"

const getImage = (name) => { return metadata.images[name] }

const SelectLanguageOption = () => {
  const optionRef = useRef(null)
  const [ isOpen, setIsOpen ] = useState(false)
  const { language, changeLanguage } = useLanguage()
  
  useEffect(() => {
   const handleClickOutside = (event) => {
    if (optionRef.current && !optionRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }
   
   document.addEventListener("touchstart", handleClickOutside)
   
   return () => {
    document.removeEventListener("touchstart",
    handleClickOutside)
   }
  }, [optionRef])
  
  return (
   <div className="wrapper-action">
      <div 
        id='lang'
        className='box'
        ref={optionRef}
        onClick={() => setIsOpen((prevState) => !prevState)}>
       <img className='image' src={getImage(language)} />
       <IonIcon 
          className='icon'
          name='caret-down'
          style={{ fontSize: "15px" }}
       />
       { isOpen && 
       <LanguageOption 
         currentLanguage={language}
         onChangeLanguage={(newLang) => {
           changeLanguage(newLang)
           setIsOpen(false)
         }}
       />}
      </div>
   </div>
  )
}

export default SelectLanguageOption;
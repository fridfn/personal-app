import { createContext, useState, useContext } from "react"
import { getInitialLanguage } from "@/hooks/languageHelper"

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
   const [ language, setLanguage ] = useState(getInitialLanguage())
   
   const changeLanguage = (lang) => {
     localStorage.setItem("language", lang)
     setLanguage(lang)
   }
   
   return (
     <LanguageContext.Provider value={{
       language,
       changeLanguage
     }}>
     {children}
     </LanguageContext.Provider>
   )
}

export const useLanguage = () => useContext(LanguageContext)
const LANGUAGE_KEY = "language"

export const getInitialLanguage = () => {
     const savedLanguage = localStorage.getItem(LANGUAGE_KEY)
     
     if (savedLanguage) return savedLanguage;
     
     const browserLanguage = navigator.language.startsWith("id") ? "english" : "english";
     localStorage.setItem(LANGUAGE_KEY, browserLanguage)
      
   return browserLanguage;
}

export const setLanguage = (currentLanguage) => {
    const newLanguage = localStorage.setItem(LANGUAGE_KEY, currentLanguage);
   
   return newLanguage;
}
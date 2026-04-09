import React, { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useFirstVisit from "@/hooks/useFirstVisit"
import { Loader as Bear } from "@/component/animate/bear"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { SectionTitle } from "@/component/ui/sectionTitle"
import Notification from "@/component/ui/notification"
import { useNotificationContext } from "@/context/notificationContext"

const LoadingPages = ({ data }) => {
  const navigate = useNavigate()
  const { showNotification } = useNotificationContext()
  const [ messages, setMessages ] = useState("")
  const isLanguage = localStorage.getItem("language")
  const setMessage = 
    isLanguage === "indonesian" 
     ? "Tunggu sebentar yaa... aku tidur dulu..." 
     : "Wait a minute... I'll sleep first until I'm ready.";
  
  const refMotion = useRef(null)
  const notificationRef = useRef(null)
  const isInView = useInView(refMotion, { once: true })
  const showLoading = useFirstVisit("visited", 5000)
  
  useEffect(() => {
    const currentVersion = "v2"
    const savedVersion = localStorage.getItem("version")
    if (savedVersion && savedVersion !== currentVersion) {
     if ("caches" in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name))
      })
     }
     
     localStorage.clear();
     sessionStorage.clear();
     localStorage.setItem("version", currentVersion)
    }
    
    setTimeout(() => {
      navigate("/user/login")
    }, 13000)
  }, [showLoading])
  
  useEffect(() => {
   if (messages) {
    setTimeout(() => {
      showNotification({
        timer: 5000,
        message: messages,
        typeNotification: "info",
      })
    }, 2000)
    
    return () => {
     if (notificationRef.current) {
      clearTimeout(notificationRef.current)
     }
    }
   }
  }, [messages])
  
  const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");
    
    cookies.forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  };
  
  return (
    <div className='loading-pages container'>
     <Notification />
     <AnimatePresence mode="wait">
      <motion.section
        key={data || "loading"}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0.3, x: -105 + "%" }}
        transition={{ duration: 0.6 }}
      >
        <div ref={refMotion} className="loading-content">
          <Bear message={setMessage} />
          <div className="wrapper">
            <SectionTitle 
             data={{ 
                title: {
                 highlight: "My Portofolio",
                 normal: "Welcome To"
               } 
             }} />
            <p className="description">By Farid Fathoni N</p>
          </div>
        </div>
      </motion.section>
     </AnimatePresence>
   </div>
  )
}

export default LoadingPages;
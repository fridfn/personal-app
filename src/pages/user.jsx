import React, { useEffect } from "react"
import Navbar from "@/component/widget/navbar"
import { motion, AnimatePresence } from "framer-motion"
import Pagination from "@/component/ui/pagination"
import LoadingPages from "@/pages/loading"
import useFirstVisit from "@/hooks/useFirstVisit"
import { useSection } from "@/hooks/useSection"
import { useLanguage } from "@/context/languageContext";
import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router-dom"
import { usePopup } from "@/hooks/usePopup"
import Notification from "@/component/ui/notification"
import { useNotificationContext } from "@/context/notificationContext"

const User = ({ data }) => {
  const { user } = useAuth()
  const { language } = useLanguage();
  const { notification, type } = useNotificationContext()
  
  const { setLanguage, pagination, SectionPages } = useSection({
     language,
     section: "user",
     pagesActive: data,
  })
  
  const authentication = JSON.parse(localStorage.getItem("user-data"));
  if (authentication && user) return <Navigate to="/dashboard/statistics" />;
  
  if (authentication) return <LoadingPages />;
  return (
   <div className="user-pages container">
     <Pagination data={pagination} />
       { notification && 
        <Notification 
          type={type}
        />
       }
     <AnimatePresence mode="wait">
       <motion.section
         key={data}
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0.3, x: "-105%" }}
         transition={{ duration: 0.6 }}
       >
         <SectionPages data={data} />
       </motion.section>
     </AnimatePresence>
   </div>
  )
}

export default User;
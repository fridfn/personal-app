import React, { useEffect } from "react"
import Pagination from "@/component/ui/pagination"
import { useSection } from "@/hooks/useSection"
import HeaderDashboard from "@/component/widget/header/headerDashboard"
import { useLanguage } from "@/context/languageContext"
import { motion, AnimatePresence } from "framer-motion"
import { useRandomData } from "@/hooks/useRandomData"
import { useFetchingData } from "@/hooks/useFetchingData"
import { useMood } from "@/hooks/useMood"
import { useRealDatabase } from "@/hooks/useRealDatabase"
import Notification from "@/component/ui/notification"
import { useNotificationContext } from "@/context/notificationContext"
import { filteredObjectFromArray } from "@/utils/filteredObjectFromArray"
import ModalComponent from "@/component/ui/modalComponent"

const Dasboard = ({ data }) => {
   const { database } = useRealDatabase()
   const { dataMood, isMood } = useMood()
   const { language } = useLanguage()
   const { notification, type } = useNotificationContext()
   const { setLanguage, pagination, SectionPages } = useSection({
     language,
     section: "dashboard",
     pagesActive: data,
   })
   
   const localLanguage = localStorage.getItem("language") === "indonesian";
   const isSuperuser = ["owner", "administrator", "admin"].some((value) =>
     value.includes(database?.account?.role)) ?
       ["owner", "admin"] : ["user", "user"];
       
   const filterPagination = filteredObjectFromArray({
     array: pagination,
     key: "requiredRole",
     targets: isSuperuser,
     filter: true
   })
   
   const { randomData, loading, error } = useRandomData({
     arr: localLanguage ? "indonesian" : "english",
     url: "https://raw.githubusercontent.com/fridfn/api/refs/heads/main/quote/quote.json"
   })
   
  return (
   <div className="dashboard-pages">
     <HeaderDashboard 
       user={database}
       data={randomData}
       loading={loading}
     />
     <ModalComponent />
     <Pagination data={filterPagination} />
     <Notification type={type} />
     <AnimatePresence mode="wait">
      <motion.section
        key={data}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        initial={{ opacity: 0, y: 50 }}
        exit={{ opacity: 0.3, x: -105 + "%" }}
      >
        <SectionPages
          data={data}
          user={database}
        />
      </motion.section>
     </AnimatePresence>
   </div>
  )
}

export default Dasboard;
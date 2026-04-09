import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion";
import EachUtils from "@/utils/EachUtils"
import { useMood } from "@/hooks/useMood"
import { useAuth } from "@/hooks/useAuth"
import Loader from "@/component/ui/loader"
import { generateKey } from "@/utils/generateKey"

const expressionsMap = {
  happy: "sentiment_satisfied",
  sadness: "sentiment_dissatisfied",
  netral: "sentiment_neutral",
  calm: "sentiment_calm",
  sick: "sick",
  stressed: "sentiment_stressed",
  default: "mode_standby"
}

const BubbleCalendar = ({ date, today, icons }) => {
  const moodRef = useRef()
  const { dataMood, isLoading } = useMood(date)
  
  useEffect(() => {
    if (moodRef.current) {
      const todayMood = moodRef.current.querySelector(".today");
      
      if (todayMood) {
       //  todayMood.scrollIntoView({
//           behavior: "smooth",
//           inline: "center",
//           block: "center"
//         })
      }
    }
  }, [dataMood])
  
  if (isLoading) return <Loader />
  return (
   <div className="wrapper" ref={moodRef}>
     <EachUtils
       of={dataMood}
       render={(value, index) => {
       const { dateNumber, exist, moods, dayName, yesterday } = value;
       const moodIcons = expressionsMap[moods];
       const isTomorrow = exist ? "tomorrow" : ""
       const isToday = exist ? "today" : "";
       const isYesterday = yesterday ? "yesterday" : "";
       
       return (
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{
           duration: 0.4,
           delay: 1 + index * 0.08,
           ease: "easeOut"
         }}
         className={`bubble-calendar ${isYesterday || isToday || isTomorrow}`} key={index}>
         <div className="items">
           <div className="mood">
             <span className="material-symbols-outlined material-icons-light">
               {icons || moodIcons}
             </span>
           </div>
           <p className="date">{dateNumber}</p>
           <p className="day">{dayName}</p>
         </div>
       </motion.div>
      )}}/>
   </div>
  )
}

export default BubbleCalendar;
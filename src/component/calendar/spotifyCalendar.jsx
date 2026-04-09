import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import EachUtils from "@/utils/EachUtils"
import { useMood } from "@/hooks/useMood"
import { useAuth } from "@/hooks/useAuth"
import Loader from "@/component/ui/loader"
import { generateKey } from "@/utils/generateKey"
import { useSpotify } from "@/hooks/useSpotify"
import { formatKeyToDate } from "@/utils/formatKeyToDate"
import { useNotificationContext } from "@/context/notificationContext"
import MusicBubble from "@/component/ui/bubble/musicBubble"

const expressionsMap = {
  happy: "sentiment_satisfied",
  sadness: "sentiment_dissatisfied",
  netral: "sentiment_neutral",
  calm: "sentiment_calm",
  sick: "sick",
  stressed: "sentiment_stressed",
  default: "mode_standby"
}

const SpotifyCalendar = ({ date, today, icons, handler }) => {
  const moodRef = useRef()
  const { dataMood } = useMood(date)
  const { dataMusic, isLoading } = useSpotify()
  const { keyYear, monthNameNow } = generateKey()
  const [ selectedIndex, setSelectedIndex ] = useState(null)
  const { showNotification } = useNotificationContext();
  
  const handlerSelect = (selectedMusic, index) => {
    handler(selectedMusic)
    setSelectedIndex(index)
    
    if (!selectedMusic) {
     showNotification({
       message: "You've not save music in this date.",
       timer: 3000,
       index: index,
       typeNotification: "alert"
     })
     return;
    }
  }
  
  if (isLoading) return <Loader />
  return (
   <div className="wrapper" ref={moodRef}>
     <EachUtils
       of={dataMood}
       render={(value, index) => {
       const { dateNumber, exist, moods, dayName, yesterday } = value;
       const defaultIcons = expressionsMap[moods];
       const isTomorrow = exist ? "tomorrow" : ""
       const isToday = exist ? "today" : "";
       const isYesterday = yesterday ? "yesterday" : "";
       const isSelected = selectedIndex === index ? "selected" : "";
       
       const musicDates = dataMusic
       .filter(item => item?.music)
       .map(item => item?.id?.slice(6, 8))
       const hasMusic = musicDates.includes(String(value.dateNumber).padStart(2, "0"))
       
       const dateKey = String(dateNumber).padStart(2, "0")
       const selectedMusic = dataMusic.find((item) => item?.id?.slice(6, 8) === dateKey)
       
       const displayIcon = hasMusic ? icons : "mode_standby"
       return (
         <MusicBubble
            key={index}
            index={index}
            music={dataMusic}
            icons={displayIcon}
            selectedMusic={selectedMusic}
            date={{dateNumber, dayName}}
            className={`bubble-calendar ${isSelected || isYesterday || isToday || isTomorrow}`}
            defaultIcon={defaultIcons}
            onClick={() => handlerSelect(selectedMusic?.music?.music, index)}
         />
      )}}/>
   </div>
  )
}

export default SpotifyCalendar;
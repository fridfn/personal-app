import React, { useState, useEffect } from "react"
import { motion } from "framer-motion";
import { useMood } from "@/hooks/useMood"
import EachUtils from "@/utils/EachUtils"
import { filteredObjectFromArray } from "@/utils/filteredObjectFromArray"

const MoodSelection = ({ data }) => {
  const { isMood, handleMoodSelect, isLoading } = useMood()
  const [ isDescription, setDescription ] = useState(() => {
     if (Array.isArray(data) && data.length > 0) {
      return data[data.length - 1].description
     }
   return ""
  })
  const filteredExpression = filteredObjectFromArray({
    array: data,
    key: "label",
    targets: "default",
    filter: false
  })
  
  const localeMood = JSON.parse(localStorage.getItem("mood"))
  
  useEffect(() => {
    if (localeMood) {
      const moodUserNow = localeMood?.moods?.moods;
      const resultDescription = data?.find((value) => value.label.includes(moodUserNow))
      setDescription(resultDescription?.description)
    }
  }, [])
  
  if (isLoading) return <h1>Loading</h1>
  return (
   <div
    className="wrapper"
    id="wrapper-mood-picker">
    <p className="info" id="title-info">RATE TODAY</p>
    <div className="set-mood">
     <EachUtils
      of={filteredExpression}
      render={(value, index) => {
       const { icons, label, description } = value;
       
       return (
        <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{
           duration: 0.4,
           delay: 1.5 + index * 0.08,
           ease: "easeOut"
         }}
          key={index}
          onClick={() => {
            handleMoodSelect(label)
            setDescription(description)
          }}
          className={`mood ${isMood === label ? "selected" : ""}`}>
          <div className="arrow"></div>
          <span className="material-symbols-outlined material-icons-light" id="mood-icons" aria-hidden="true" data-mood={label}>
             {icons}
           </span>
        </motion.div>
      )}}
     />
     </div>
     {isDescription && (
       <div 
         data-aos="fade-in"
         data-aos-duration="400"
         className="box-description">
         <p className="description">{isDescription}</p>
       </div>
     )}
   </div>
  )
}

export default MoodSelection
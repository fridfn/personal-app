import React, { useRef } from "react"
import EachUtils from "@/utils/EachUtils"
import Avatar from "@/component/ui/common/avatar"
import { SectionTitle } from "@/component/ui/sectionTitle"
import Checkbox from "@/component/ui/checkbox"

const CardsGoals = ({ data, isActive, onClick }) => {
  const { title, description, icons } = data;
  const refGoals = useRef(null)
  
  return (
   <>
   <div
     ref={refGoals}
     onClick={onClick}
     className={`cards-awards cards-goals ${isActive && 'active'}`}>
     <span className="wrapper">
      <div className="experience-header-title heading-title">
        <SectionTitle data={{ title: title }} />
       <p className="description">{ description }</p>
      </div>
      <Checkbox />
     </span>
     <div className="wrapper" id="wrapper-action">
      <span>
        <ion-icon className="icons" name="time"></ion-icon>
        <p className="description time">12.00 WIB</p>
      </span>
      <div className="wrapper">
        <ion-icon className="icons" name="heart"></ion-icon>
        <ion-icon className="icons" name="heart"></ion-icon>
      </div>
     </div>
   </div>
   </>
  )
}

export default CardsGoals;
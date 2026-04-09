import React from "react"
import { SectionTitle } from "@/component/ui/sectionTitle"
import IonIcon from "@/component/ui/common/ionicon"

const BannerDescription = ({ data, isAnimate }) => {
  const { title, description, icons } = data;
  
  return (
   <div className="banner"
   data-aos={isAnimate && isAnimate}
   data-aos-duration={isAnimate && "700"}>
    <div className="box-icon">
     <IonIcon className="icon" name={icons} />
    </div>
    <SectionTitle data={{ title: title }} />
    <p className="description">{description}</p>
   </div>
  )
}

export default BannerDescription;
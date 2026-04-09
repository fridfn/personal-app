import React from "react"
import { SectionTitle } from "@/component/ui/sectionTitle"
import IonIcon from "@/component/ui/common/ionicon"
import { useModalContext } from "@/context/modalContext"

const BannerAwards = ({ data, index }) => {
  const { 
    link,
    title, 
    description,
    icons: { 
      main, 
      secon
    }
  } = data;
  const { openModal } = useModalContext();
  
  return (
   <div className="banner">
    <div className="box-icon">
     <IonIcon className="icon" name={secon} />
    </div>
    <SectionTitle data={{ title: title }} />
    <p className="description">{ description }</p>
    <div className="information">
     <div className="items">
      <IonIcon name="layers" />
      <p className="description">ChatGPT</p>
     </div>
     <div
       onClick={() => openModal({
          data: data.link,
          index: index,
          time: false,
          type: "modal"
        })
       }>
      <IonIcon className="forwards" name={main} />
     </div>
    </div>
   </div>
  )
}

export default BannerAwards;
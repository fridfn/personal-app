import React from "react"
import IonIcon from "@/component/ui/common/ionicon"

const BubbleSelected = ({ data }) => {
  return (
   <>
     <div className="bubble-items">
       <IonIcon name="logo-ionic" />
       <p className="description">{data}</p>
     </div>
   </>
  )
}

export default BubbleSelected;
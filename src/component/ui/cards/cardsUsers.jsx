import React, { useEffect, useState, useRef } from "react"
import Loader from "@/component/ui/loader"
import { usePopup } from "@/hooks/usePopup"
import Options from "@/component/ui/common/options"
import TransitionComponent from "@/component/ui/common/transition"
import IonIcon from "@/component/ui/common/ionicon"

const CardsUsers = ({ data, index }) => {
  const optionRef = useRef()
  const [ datas, setDatas ] = useState([])
  const { openPopup, closePopup, popup } = usePopup()
  
  useEffect(() => {
    setDatas(data)
  }, [data])

  useEffect(() => {
   const handleClickOutside = (event) => {
    if (optionRef.current && !optionRef.current.contains(event.target)) {
      closePopup()
    }
  }
   
   document.addEventListener("touchstart", handleClickOutside)
   
   return () => {
    document.removeEventListener("touchstart",
    handleClickOutside)
   }
  }, [optionRef])
  
  const userid = datas.id
  const user_role = datas?.account?.role
  const username = datas?.account?.email?.split("@")[0]
  
  if (!data) return <Loader />
  return (
   <div 
     key={data}
     ref={optionRef}
     className="container-cards-users"
     >
    <div className="wrapper">
      <div className="box-avatar">
        <IonIcon name="person" className="icons" />
      </div>
      <div className="wrapper-cards-users">
        <p className="title">{username}</p>
        <p className="info">Role : {user_role}</p>
      </div>
    </div>
     <div className="wrapper" id="wrapper-options-menu">
       <IonIcon
         onClick={() => openPopup({
           data: userid,
           time: false
         })}
         name="ellipsis-vertical"
         className="settings-user"
       />
       <TransitionComponent data={popup}>
         <Options
           modal={popup}
           data={{ userid, ...data }}
           handler={closePopup}
         />
       </TransitionComponent>
     </div>
   </div>
  )
}

export default CardsUsers;
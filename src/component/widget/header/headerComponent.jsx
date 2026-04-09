import metadata from "@/metadata"
import Fire from "@/component/animate/fire"
import React, { useState, useEffect } from "react"
import DecryptedText from "@/component/reactbit/decryptedText"
import SelectLanguageOption from "@/component/widget/header/selectLanguageOption"
import ToggleTheme from "@/component/widget/header/toggleTheme"
import Notification from "@/component/ui/notification"
import BackgroundLoader from "@/component/widget/backgroundLoader"
import { useLoadingContext } from "@/context/loadingContext"
import ChangeTheme from "@/component/ui/changeTheme"
import ModalComponent from "@/component/ui/modalComponent"

const getImage = (name) => { return metadata.images[name] }

const HeaderComponent = ({ title }) => {
  const { loading, open } = useLoadingContext()
  
  return (
   <div className='header'>
   <div className='wrapper-action'>
      <SelectLanguageOption />
      <ToggleTheme />
    </div>
    <div className='box' id="status">
     <div className='box' id="avatar">
      <img 
       className='image' 
       src={getImage("avatar")} 
       onContextMenu={(e) => e.preventDefault()} />
     </div>
      <Fire />
    </div>
    <div className="wrapper-info" id="title-developer">
     <DecryptedText
       text="Farid Fathoni N"
       animateOn="view"
       speed={150}
       sequential={true}
       className="title"
       parentClassName="badge"
       encryptedClassName="title"
       revealDirection="start"
       characters="÷×\"
       highlightText={"Fathoni N"}
     />
     <DecryptedText
       text="Frontend Developer"
       animateOn="view"
       speed={100}
       sequential={true}
       className="description"
       encryptedClassName="description"
       revealDirection="start"
       characters="÷×\"
     />
    </div>
    <Notification />
    <ChangeTheme />
    <ModalComponent />
    <BackgroundLoader loading={loading} />
   </div>
  )
}

export default HeaderComponent;
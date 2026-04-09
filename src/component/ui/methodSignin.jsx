import React, { useState } from "react"
import EachUtils from "@/utils/EachUtils"
import { usePopup } from "@/hooks/usePopup"
import { useNotificationContext } from "@/context/notificationContext"
import IonIcon from "@/component/ui/common/ionicon"

const MethodSignin = ({ }) => {
  const { showNotification } = useNotificationContext()
  
  const localLanguage = localStorage.getItem("language") === "indonesian";
  const descriptionSign = localLanguage 
    ? "Atau login dengan"
    : "Sign in with Method"
   const methodIcons = [
     {
       logo: "logo-github",
       info: localLanguage
         ? "Login dengan akun GitHub belum tersedia saat ini."
         : "Login using your GitHub account is not available right now.",
     },
     {
       logo: "logo-google",
       info: localLanguage
         ? "Login dengan akun Google belum bisa digunakan saat ini."
         : "Login using your Google account is currently unavailable.",
     },
     {
       logo: "logo-facebook",
       info: localLanguage
         ? "Login melalui Facebook belum diaktifkan, coba metode lain ya."
         : "Facebook login hasn’t been activated yet, please try another method.",
     },
     {
       logo: "call",
       info: localLanguage
         ? "Login menggunakan nomor telepon belum didukung saat ini."
         : "Login using a phone number is not supported at the moment.",
     },
   ];
  
  return (
   <div className="box-description" id="signup-method">
     <span className="wrapper" data-info={descriptionSign}>
      <EachUtils
        of={methodIcons}
        render={(value, index) => (
          <IonIcon
            key={index}
            name={value.logo}
            onClick={() => showNotification({
              typeNotification: "error",
              timer: true,
              message: value.info
            })}
            className="icon"
          />
       )}/>
     </span>
   </div>
  )
}

export default MethodSignin;
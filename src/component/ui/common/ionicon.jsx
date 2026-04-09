import { useEffect, useRef } from "react"

const IonIcon = ({ name, className, style, onClick }) => {
   return (
    <ion-icon name={name} style={style} class={className} onClick={onClick}></ion-icon>
  )
}

export default IonIcon;
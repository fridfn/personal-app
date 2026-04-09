import React, { useRef } from "react"

const ClickableAnimateIcon = ({ children, className, animationClass, onClick }) => {
  const refIcons = useRef(null)
  
  const handleClick = (e) => {
   const clickedChild = e.target;
   const parentChildren = refIcons.current;
   const children = Array.from(parentChildren.children)
   
   clickedChild.classList.toggle(animationClass)
   
   if (onClick) onClick(e)
  }
  
  return (
   <span
    ref={refIcons}
    onClick={handleClick}
    className={`${className}`}
   >
   {children}
   </span>
  )
}

export default ClickableAnimateIcon;
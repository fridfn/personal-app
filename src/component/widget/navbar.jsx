import React, { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import IonIcon from "@/component/ui/common/ionicon"
import EachUtils from "@/utils/EachUtils"

const Navbar = ({ pages }) => {
  const navigate = useNavigate()
  const ListNavbar = [
   {title: "home", icons: "home", path: "/home/introduction"},
   {title: "history", icons: "time", path: "/history/education"},
   {title: "showcase", icons: "image", path: "/showcase/skills"},
   {title: "other", icons: "medical", path: "/other/updates"}
  ]
  
  return (
   <div className="navbar">
    <EachUtils
      of={ListNavbar}
      render={(value, index) => (
       <div
         key={index}
         onClick={() => {
          if (pages === value.title) return null;
           navigate(value.path)
           scrollTo({ top: 0 })
         }}
         className={`items ${pages === value.title ? "active" : ""}`}>
         <p className="title">{value.title}</p>
         <IonIcon name={value.icons} className="icon" />
       </div>
    )}/>
   </div>
  )
}

export default Navbar;
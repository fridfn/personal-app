import React, { useState, useEffect, useRef } from "react"
import { Link ,useNavigate, useLocation } from "react-router-dom"
import EachUtils from "@/utils/EachUtils"
import { useSticky } from "@/hooks/useSticky"
import IonIcon from "@/component/ui/common/ionicon"

const Pagination = ({ data }) => {
  const paginationRef = useRef()
  const navigate = useNavigate()
  const location = useLocation()
  const isStuck = useSticky(paginationRef)
  const activePages = location.state?.pages;
  const [ isActive, setIsActive ] = useState(location.pathname)
  
  const switchPages = ( datas ) => {
   navigate(datas.routes)
   setIsActive(datas.value)
   scrollTo({ behavior: 'auto', top: 0 })
  }
  
  if (!data) return null
  return (
   <div 
    ref={paginationRef}
    className={`pagination ${isStuck && 'isTop'}`}>
    <EachUtils
     of={data}
     render={(value, index) => (
      <div
       key={index}
       onClick={() => {
        switchPages({
          value: value.routes,
          routes: value.routes
        })
       }}
       className={`items ${isActive === value.routes && ("active")}`}>
       <IonIcon className="icon" name={value.icon} />
      </div>
     )}/>
   </div>
  )
}

export default Pagination;
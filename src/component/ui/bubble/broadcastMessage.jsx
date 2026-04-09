import React from "react"
import { formatKeyToDate } from "@/utils/formatKeyToDate"

const BroadcastMessage = ({ data }) => {
  const { id, title, body, createAt } = data;
  const { formattedDate, formattedTime } = formatKeyToDate({ key: createAt })
  
  const useMarqueeUp = body.length > 160;
  
  return (
   <div 
    data-aos="fade-in"
    data-aos-duration="1000" className="wrapper" id="broadcast-message">
    <div className="box-title">
      <p className="title">{title}</p>
    </div>
     <div className="box-description">
       <p 
         className="description"
         style={ useMarqueeUp ? { animation: `scrollUp 15s linear infinite` } : {}}>
         {body}
       </p>
     </div>
     <span className="info">
       <p className="time">{formattedTime}</p>
       <p className="time date">{formattedDate}</p>
     </span>
   </div>
  )
}

export default BroadcastMessage;
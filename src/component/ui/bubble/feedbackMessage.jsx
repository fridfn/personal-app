import React from "react"
import EachUtils from "@/utils/EachUtils"
import { formatKeyToDate } from "@/utils/formatKeyToDate"

const FeedbackMessage = ({ data }) => {
  const { createAt, name, email, id, title, message } = data;
  
  const { formattedDate, formattedTime } = formatKeyToDate({
    key: createAt,
    locale: "en-US",
  });
  
  const useMarqueeUp = message.length > 70;
  const animate = Math.floor(Math.random() * (15 - 9 + 1) + 9)
  
  return (
   <div
     key={id}
     data-aos="fade-in"
     className="wrapper"
     id="broadcast-message"
     data-aos-duration="1000"
   >
     <div className="box-title">
       <p className="title" id="from">from : {name}</p>
       <p className="title">{title}</p>
     </div>
     <div className="box-description">
       <p
         className="description"
         style={
           useMarqueeUp
             ? {
              animation: `scrollUp ${animate}s linear infinite`
              }
             : {}
         }
       >
         {message}
       </p>
     </div>
     <span className="info">
       <p className="time">{formattedTime}</p>
       <p className="time date">{formattedDate}</p>
     </span>
   </div>
  );
};

export default FeedbackMessage;
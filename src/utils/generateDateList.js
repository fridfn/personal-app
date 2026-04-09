import React from "react"

export const generateDateList = () => {
  const dates = new Date()
  const today = dates.getDate()
  const month = dates.getMonth()
  const year = dates.getFullYear()
  
  const timezone = localStorage.getItem("language") === "indonesian" ? "id-ID" : "en-US"
  const dayInMonth = new Date(year, month + 1, 0).getDate()
  const monthName = new Date().toLocaleDateString(timezone, { month: "long" })
  
  const dateList = []
  
  for( let day = 1; day <= dayInMonth; day++) {
   const date = new Date(year, month, day)
   const dayName = date.toLocaleDateString(timezone, { weekday: "short" })
   
   const formatedDay = day < 10 ? "0" + day : day.toString();
   const isYesterday = day < today ? true : false;
   
   dateList.push({
     date: formatedDay,
     yesterday: isYesterday,
     dayName
   })
  }
  
  return {
   year,
   today,
   dateList,
   monthName
  }
}

export const getMonthNames = (locale = "en-US")  => {
  const fullMonth = []
  for (let month = 0; month < 12; month++) {
   const date = new Date(2000, month, 1)
   const monthName = date.toLocaleDateString(locale, { month: "long" })
   
   fullMonth.push(monthName)
  }
  
  return { fullMonth };
}
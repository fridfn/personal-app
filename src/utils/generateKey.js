import { getMonthNames } from "@/utils/generateDateList"

export const generateKey = (withTime = false) => {
  const date = new Date();
  const year = date.getFullYear();
  const { fullMonth } = getMonthNames("en-US")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  
  const hh = String(date.getHours()).padStart(2, "0")
  const mm = String(date.getMinutes()).padStart(2, "0")
  const ss = String(date.getSeconds()).padStart(2, "0")
  
  const keyYear = year
  const keyDate = `${year}${month}${day}`
  const keyDateTime = `${year}${month}${day}-${hh}${mm}${ss}`
  const monthNameNow = fullMonth[date.getMonth()].toLowerCase()
  
  return {
   keyYear,
   keyDate,
   keyDateTime,
   monthNameNow
  }
}
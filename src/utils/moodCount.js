import { generateKey } from "@/utils/generateKey"

export const moodCount = () => {
  const { keyYear } = generateKey()
  const localeMoodActivity = JSON.parse(localStorage.getItem("user-data"))
  const activityInYear = localeMoodActivity?.activity?.[keyYear] || {}
  
  const moodCountPerYear = {}
  
  for (const [month, days] of Object.entries(activityInYear)) {
    if (!days || typeof days !== "object") continue
    
    for (const [date, info] of Object.entries(days)) {
      const mood = info?.moods?.moods
      if (!mood) continue
      
      moodCountPerYear[mood] = (moodCountPerYear[mood] || 0) + 1
    }
  }
  const resultArray = Object.entries(moodCountPerYear).map(([mood, count]) => ({
    mood, count
  }))
  
  return {
    moodCountPerYear,
    resultArray,
  }
}

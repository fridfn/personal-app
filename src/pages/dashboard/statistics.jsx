import React, { useState, useEffect, useRef } from "react"
import EachUtils from "@/utils/EachUtils"
import { useSection } from "@/hooks/useSection"
import { SectionTitle } from "@/component/ui/sectionTitle"
import { generateDateList } from "@/utils/generateDateList"
import BubbleCalendar from "@/component/calendar/bubbleCalendar"
import CardsGoals from "@/component/ui/cards/cardsGoals"
import MoodSelection from "@/component/ui/moodSelection"
import RadarChart from "@/component/ui/radarChart"
import { moodCount } from "@/utils/moodCount"
import { filteredObjectFromArray } from "@/utils/filteredObjectFromArray"
import IonIcon from "@/component/ui/common/ionicon"
import SpotifySearchInput from "@/component/ui/spotifySearchInput"

const Statistics = ({ data, user }) => {
  const dayList = useRef()
  const refMoodChart = useRef()
  const { resultArray, moodCountPerYear } = moodCount()
  const [ activeIndex, setActiveIndex ] = useState(false)
  const { dateList, today, monthName, year } = generateDateList()
  const { pagination, SectionPages, setLanguage } = useSection({
    pagesActive: data,
    section: "dashboard"
  })
  
  const PAGES_TITLE = setLanguage.personal
  const FIRST_SECTION = setLanguage.personal.mood
  const SECOND_SECTION = setLanguage.personal.statistics
  const THIRD_SECTION = setLanguage.personal.playlist
  const CHART_DESCRIPTION = setLanguage.personal.statistics.description
  const DATA_MOOD = setLanguage?.personal?.mood.datas
  
  const defaultMoods = ["happy", "sadness", "netral", "calm", "sick", "stressed"]
  const normalizedMoods = defaultMoods.map(mood => {
    const found = resultArray.find(items => items.mood === mood)
    return {
     mood,
     count: found ? found.count : 0
   }
  })
  
  useEffect(() => {
   const day = dayList.current;
   const scrollToToday = day.querySelector(".today")
   
   if (scrollToToday) {
     setTimeout(() => {
       scrollToToday.scrollIntoView({
         behavior: "smooth",
         inline: "center",
         block: "nearest"
       })
     }, 700)
   }
  }, [])
  
  return (
   <div
     className="wrapper-section"
     data-aos="zoom-in-down"
     data-aos-duration="400">
     <span className="greeting">
       <SectionTitle data={PAGES_TITLE}/>
     </span>
     <div className="wrapper-content">
       <SectionTitle 
         data={FIRST_SECTION}
         reverse="true"
       />
      <div className="wrapper-content" id="wrapper-weeks">
       <div className="wrapper">
         <IonIcon name="calendar" className="icon"/>
         <span>
           <p className="description dates" data-dates={`01 ${monthName} ${year} — ${dateList.length} ${monthName} ${year}`}></p>
         </span>
       </div>
       <div className="wrapper" id="wrapper-calendar" ref={dayList}>
         <BubbleCalendar
           date={dateList}
           today={today} 
         />
       </div>
         <MoodSelection data={DATA_MOOD} />
       </div>
      </div>
     <div className="wrapper-content">
       <SectionTitle 
         data={THIRD_SECTION}
         reverse="true"
       />
      <div className="wrapper-content" id="wrapper-weeks">
         <SpotifySearchInput 
           dateList={dateList} 
           today={today}
         />
      </div>
     </div>
     <div className="wrapper-content" id="wrapper-todo">
       <SectionTitle data={SECOND_SECTION} reverse="true" />
       <div className="wrapper-content" id="wrapper-weeks">
        <RadarChart
          title="Skill Overview"
          labels={
         filteredObjectFromArray({
            array: normalizedMoods,
            key: "mood",
            targets: "default",
            filter: false
          }).map(value => value.mood)}
          description={CHART_DESCRIPTION}
          datasets={[
            {
              data: filteredObjectFromArray({
                array: normalizedMoods,
                key: "mood",
                targets: "default",
                filter: false
              }).map(value => value.count),
              fill: true,
              backgroundColor: 'rgba(255,182,99,0.2)',
              borderColor: "rgba(255,127,2,0.95)",
              pointBackgroundColor: 'rgb(255,172,99)',
              pointBorderColor: 'rgb(255,191,99)',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255,169,99,0)'
            },
          ]}
        />
      </div>
     </div>
   </div>
  )
}

export default Statistics;
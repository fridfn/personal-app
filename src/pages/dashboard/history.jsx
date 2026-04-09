import React, { useState, useEffect } from "react"
import EachUtils from "@/utils/EachUtils"
import UseListing from "@/utils/useListing"
import { useSection } from "@/hooks/useSection"
import { SectionTitle } from "@/component/ui/sectionTitle"
import { useLanguage } from "@/context/languageContext"
import CardsUsers from "@/component/ui/cards/cardsUsers"
import { useRealDatabase } from "@/hooks/useRealDatabase"
import { filteredObjectFromArray } from "@/utils/filteredObjectFromArray"
import { getPriorityData } from "@/helper/getPriorityData"

const History = ({ data, handler, user }) => {
  const { formattedDatabase } = useRealDatabase("users")
  const { pagination, SectionPages, setLanguage } = useSection({
    section: "dashboard",
    pagesActive: data,
  })
  
  const userUid = user?.account?.uid
  const filteredUser = filteredObjectFromArray({
    key: "id",
    filter: false,
    targets: userUid,
    array: formattedDatabase,
  })
  
  const sortedData = getPriorityData(filteredUser)
  const PAGES_TITLE = setLanguage.history
  const FIRST_SECTION = setLanguage.history.user
  
  return (
   <div
     className="wrapper-section"
     data-aos="zoom-in-down"
     data-aos-duration="400">
     <span className="greeting">
      <SectionTitle data={PAGES_TITLE}/>
     </span>
     <div className="wrapper-content">
       <SectionTitle data={FIRST_SECTION} reverse="true"/>
      <div className="wrapper-content" id="wrapper-user-list">
        <UseListing 
          data={sortedData} 
          type="users" 
          effect={false}
        />
      </div>
     </div>
   </div>
  )
}

export default History;
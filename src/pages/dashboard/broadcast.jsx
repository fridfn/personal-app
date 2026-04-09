import React, { useState } from "react"
import metadata from "@/metadata"
import useForm from "@/hooks/useForm"
import FormComponent from "@/component/ui/form/formComponent"
import UseListing from "@/utils/useListing"
import { useSendNotification } from "/api/sendNotification"
import { useSection } from "@/hooks/useSection"
import { SectionTitle } from "@/component/ui/sectionTitle"
import { useLanguage } from "@/context/languageContext"
import ChangeTheme from "@/component/ui/changeTheme"
import MessageCards from "@/component/widget/messageCards"
import { useRealDatabase } from "@/hooks/useRealDatabase"
import { shuffleHelper } from "@/utils/shuffleHelper"
import Loader from "@/component/ui/loader"

const Broadcast = ({ data }) => {
  const { formattedDatabase, isLoading } = useRealDatabase("broadcast")
  const { pagination, SectionPages, setLanguage } = useSection({
    section: "dashboard",
    pagesActive: data,
  })
  
  const PAGES_TITLE = setLanguage.broadcast
  const PAGES_FOOTER = setLanguage.broadcast.footer
  const FIRST_SECTION = setLanguage.broadcast.broadcast
  const SECOND_SECTION = setLanguage.broadcast.history
  const DATA_FIRST_SECTION = setLanguage.broadcast.history.datas
  
  return (
   <>
    <div
      id="content-broadcast"
      className="wrapper-section"
      data-aos="zoom-in-down"
      data-aos-duration="400">
      <span className="greeting">
        <SectionTitle data={PAGES_TITLE}/>
      </span>
      <div className="wrapper-content">
        <SectionTitle data={FIRST_SECTION} reverse="true"/>
        <FormBroadcast setLanguage={setLanguage} />
      </div>
      <div className="wrapper-content">
        <SectionTitle data={SECOND_SECTION} reverse="true"/>
        <div className="wrapper-content" id="wrapper-weeks">
         <div
          id="wrapper-history-broadcast"
          className="wrapper-content">
          { !isLoading ? (
           <>
            <MessageCards 
              index=".8"
              type="broadcast"
              data={shuffleHelper([...formattedDatabase])}
            />
            <MessageCards 
              index=".8"
              direction="left"
              type="broadcast"
              data={shuffleHelper([...formattedDatabase])}
            />
            <MessageCards
              index=".8"
              type="broadcast"
              data={shuffleHelper([...formattedDatabase])}
            />
           </>
          ) : ( <Loader /> )}
          </div>
         </div>
       </div>
       <div className="box-description">
         <p className="description" style={{ textAlign: "center" }}>{PAGES_FOOTER}</p>
       </div>
     </div>
   </>
  )
}

const FormBroadcast = ({ setLanguage }) => {
  const FORMAT_FORM = setLanguage.broadcast.forms.datas
  const INITIAL_VALUES_FORM = setLanguage.broadcast.forms.initial_values
  const { sendNotification } = useSendNotification()
  
  const {
    formData,
    isSubmited,
    handleChange,
    handleSubmit
  } = useForm(INITIAL_VALUES_FORM, sendNotification, "broadcast");
  
  return (
   <FormComponent 
     formData={formData}
     metadata={FORMAT_FORM}
     handleSubmit={handleSubmit}
     handleChange={handleChange} 
   />
  )
}

export default Broadcast;
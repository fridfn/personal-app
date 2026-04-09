import React, { useEffect } from "react"
import { useSection } from "@/hooks/useSection"
import { useLanguage } from "@/context/languageContext";
import { SectionTitle } from "@/component/ui/sectionTitle"
import FormAuth from "@/component/ui/form/formAuth"
import { Loader as Bear } from "@/component/animate/bear"
import BackgroundLoader from "@/component/widget/backgroundLoader"
import { useLoadingContext } from "@/context/loadingContext"

const Register = ({ data }) => {
  const { language } = useLanguage();
  const { loading, open } = useLoadingContext()
  const { setLanguage, pagination, SectionPages } = useSection({
     language,
     section: "user",
     pagesActive: data,
   })
   
  const PAGES_TITLE = setLanguage?.register
  const FIRST_SECTION = setLanguage.login.message
  const INITIAL_VALUES_FORM = setLanguage.register.forms.initial_values
  const FORMAT_FORM = setLanguage.register.forms.datas
  
  const localLanguage = localStorage.getItem("language") === "indonesian";
  const buttonName = localLanguage
    ? "Daftar sekarang"
    : "Create Account"
  
  return (
   <div
     className="wrapper-section"
     data-aos="zoom-in-down"
     data-aos-duration="400">
     <div className="wrapper-content">
       <SectionTitle data={FIRST_SECTION} reverse="true"/>
       <div className="wrapper-content" id="wrapper-weeks">
        <Bear message="Hi, Aku adalah penjaga website ini >\\<"/>
         <FormAuth
           method={data}
           buttonName={buttonName}
           data={{
             FORMAT_FORM,
             PAGES_TITLE,
             FIRST_SECTION,
             INITIAL_VALUES_FORM
           }}
         />
       </div>
      <BackgroundLoader loading={loading} />
     </div>
   </div>
  )
}

export default Register;
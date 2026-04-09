import React, { useState, useEffect } from "react"
import useForm from "@/hooks/useForm"
import FormComponent from "@/component/ui/form/formComponent"
import { useAuth } from "@/hooks/useAuth"
import { useSection } from "@/hooks/useSection"

const FormAuth = ({ method = "Register", data, buttonName }) => {
  const { user, loading, Register, validateLogin, Logout } = useAuth()
  const { setLanguage, pagination, SectionPages } = useSection({ 
    section: "user",
    pagesActive: data,
  })
  
  const { FORMAT_FORM, INITIAL_VALUES_FORM, PAGES_TITLE, FIRST_SECTION } = data;
  const [ email, setEmail ] = useState(null)
  const [ password, setPassword ] = useState(null)
  
  const initMethod = method.charAt(0).toLocaleUpperCase()
  const restMethod = method.slice(1)
  const capitalMethod = initMethod + restMethod;
  const TITLE_FORMS = setLanguage[method].title.highlight;
  
  const methodAction = {
   Register: async () => {
     try {
      await Register(formData.email, formData.password)
     } catch (err) {
      console.log("failed execute register", err.message)
     }
   },
   Login: async () => {
     try {
      await validateLogin(formData.email, formData.password)
     } catch (err) {
      console.log("failed execute login", err.message)
     }
   },
   Logout: async () => {
     try {
      await Logout()
      console.log("succes logout")
     } catch (err) {
      console.log("failed logout")
     }
   }
  }
  
  const selectMethod = () => {
   const action = methodAction[capitalMethod]
   if (action) return action()
   else console.log("no match method :", capitalMethod)
  }
  
  const {
    formData,
    isSubmited,
    handleChange,
    handleSubmit
  } = useForm(INITIAL_VALUES_FORM, selectMethod)
  
  return (
   <div className="auth-form">
    <p className="title">{TITLE_FORMS}</p>
     <FormComponent
       formData={formData}
       metadata={FORMAT_FORM}
       buttonName={buttonName}
       handleSubmit={handleSubmit}
       handleChange={handleChange}
     />
   </div>
  )
}

export default FormAuth;
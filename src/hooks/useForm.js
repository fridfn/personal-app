import { usePopup } from "@/hooks/usePopup"
import React, { useState, useEffect } from "react"
import { useLoadingContext } from "@/context/loadingContext"
import { useScrollLock } from "@/hooks/useScrollLock"
import { usePerformance } from "@/context/performanceContext"

const useForm = (initialValues, onSubmitCallback, endpointPerformance) => {
  const { openPopup } = usePopup();
  const { withLoading, loading } = useLoadingContext()
  const [ formData, setFormData] = useState(initialValues)
  const[ isSubmited, setSubmited ] = useState(false)
  const { dataPerformance, testPerformance } = usePerformance()
  
  useScrollLock(loading)
  testPerformance(endpointPerformance)
  
  const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData({
    ...formData,
    [name]: value
   })
  }
  
  const handleSubmit = (e) => {
   e.preventDefault()
  
   return withLoading(() => {
     setFormData(initialValues)
     setSubmited((prev) => !prev)
     
     if (onSubmitCallback) onSubmitCallback(formData)
     
     openPopup({
       data: "message",
       time: dataPerformance?.duration
     })
   }, dataPerformance?.duration)
  }
  
  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    isSubmited,
    setSubmited
  }
}

export default useForm;
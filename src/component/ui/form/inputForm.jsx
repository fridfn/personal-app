import React, { useState } from "react"
import EachUtils from "@/utils/EachUtils"
import { useValidation } from "@/hooks/useValidation"
import MethodSignin from "@/component/ui/methodSignin"
import IonIcon from "@/component/ui/common/ionicon"

const InputForms = ({ data, formData, handleChange }) => {
  const [ isPassword, showPassword ] = useState(false)
  
  return (
   <EachUtils
     of={data}
     render={(value, index) => {
     const { icons, rows, name, type, maxLength, minLength, placeholder, customInput, description, info, gap } = value;
    
     const { message } = useValidation({ value: formData[name], type })
     const Tag = customInput === "textarea" ? "textarea" : "input";
     
     return (
      <div className="wrapper-content" key={index} style={{ marginBottom: gap ? "25px" : "" }}>
        <div className="box-input">
         <div className="items-input">
           { icons && (
            <div className="box-icon">
              <IonIcon className="icon" name={icons} />
            </div>
           )}
           <Tag
             name={name}
             className="input"
             minLength={minLength}
             value={formData[name]}
             onChange={handleChange}
             maxLength={maxLength} rows={rows}
             required placeholder={placeholder}
             type={isPassword && isPassword ? "text" : type}>
           </Tag>
           { name === "password" && (
            <div 
              onClick={() => showPassword((prev) => !prev)}
              className="box-icon password">
               <IonIcon className="icon" name={ isPassword ? "eye" : "eye-off" }/>
            </div>
           )}
         </div>
         { info && (
          <div style={{ height: "40px" }} className="box-description">
            <p className="description">
              { message || info }
            </p>
          </div>
         )}
        </div>
        {description && (
         <MethodSignin />
        )}
     </div>)
   }}/>
  )
}

export default InputForms;
import { useNavigate } from "react-router-dom"
import EachUtils from "@/utils/EachUtils"
import { useValidation } from "@/hooks/useValidation"
import InputForms from "@/component/ui/form/inputForm"
import IonIcon from "@/component/ui/common/ionicon"

const FormComponent = ({ metadata, formData, handleSubmit, handleChange, buttonName = "Send Message" }) => {
  const navigate = useNavigate()
 
  return (
   <div className="forms">
    <form
      id="form-email"
      className="form-input"
      onSubmit={(e) => handleSubmit(e)}>
      <InputForms
        data={metadata}
        formData={formData} 
        handleChange={handleChange}
      />
    </form>
    <EachUtils
     of={metadata}
     render={(values, index) => {
     const { description, name, type, icons, externalButton } = values;
     const { valid } = useValidation({ value: formData[name], type });
     
      return (
       <div key={index}>
        {index === 1 && (
         <>
         <button type="submit" disable={valid.toString()} className="submit-button" form="form-email">
            <IonIcon className="icon" name={icons || "mail"} />
            {buttonName}
         </button>
         { externalButton && 
         <button
            onClick={() => navigate("/home/introduction")}
            className="submit-button secondary" 
          >
            <IonIcon className="icon" name="footsteps" />
            {externalButton}
         </button> }
         </>
        )}
        <p style={{ textAlign: "center" }} className="description">
          { description }
        </p>
       </div>
      )}
     }/>
   </div>
  )
}

export default FormComponent;
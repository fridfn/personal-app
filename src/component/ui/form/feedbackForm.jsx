import useForm from "@/hooks/useForm"
import sendEmail from "@/utils/sendEmail"
import BannerDescription from "@/component/ui/banner/bannerDescription"
import FormComponent from "@/component/ui/form/formComponent"
import { SectionTitle } from "@/component/ui/sectionTitle"

const FeedbackForm = ({ setLanguage, section }) => {
  const INITIAL_VALUES_FORM = setLanguage[section].forms.initial_values;
  const FORMAT_FORM = setLanguage[section].forms?.datas
  const BANNER_IS_SUBMIT = setLanguage[section].banner
  const FORM_TITLE = setLanguage[section].form
  
  const {
   formData,
   isSubmited,
   handleChange,
   handleSubmit
  } = useForm(INITIAL_VALUES_FORM, sendEmail, "send");
  
  
 return (
  <div className="wrapper-content">
    <SectionTitle data={FORM_TITLE} />
    {!isSubmited ?
    (<FormComponent
      formData={formData}
      metadata={FORMAT_FORM}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />) : (
     <BannerDescription data={BANNER_IS_SUBMIT} isAnimate="flip-up" />
    )}
  </div>
  )
}

export default FeedbackForm;
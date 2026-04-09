import { useNavigate } from "react-router-dom"
import DecryptedText from "@/component/reactbit/decryptedText"
import ToggleTheme from "@/component/widget/header/toggleTheme"
import { useLoadingContext } from "@/context/loadingContext"
import IonIcon from "@/component/ui/common/ionicon"

const HeadingTitle = ({ role }) => {
  const navigate = useNavigate()
  const { showLoading } = useLoadingContext()
  const localLanguage = localStorage.getItem("language") === "indonesian";
  const titleDashboard = localLanguage ? "Personal Preview" : "Personal Previews";
  
  return (
   <div className="wrapper" id="header">
   <div className="wrapper inner">
    <div
      onClick={() => {
       showLoading({
         time: 100,
         path: "/home/introduction"
       })
      }}
      className="wrapper-action back-btn">
       <IonIcon
         className='icon'
         name='arrow-back'
      />
    </div>
    <div className="wrapper-info" id="custom-heading">
       <DecryptedText
         text={titleDashboard}
         animateOn="view"
         speed={150}
         sequential={true}
         className="title"
         parentClassName="badge"
         encryptedClassName="title"
         revealDirection="start"
         characters="÷×"
         highlightText={"Personal"}
       />
       <DecryptedText
         key={role}
         text={role}
         animateOn="view"
         speed={100}
         sequential={true}
         className="description"
         parentClassName="role description"
         encryptedClassName="description"
         revealDirection="start"
         characters="÷×\"
       />
     </div>
     </div>
    <ToggleTheme />
   </div>
  )
}

export default HeadingTitle;
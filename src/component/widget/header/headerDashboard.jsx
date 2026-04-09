import Avatar from "@/component/ui/common/avatar"
import ClickableAnimateIcons from "@/utils/clickableAnimateIcon"
import DecryptedText from "@/component/reactbit/decryptedText"
import HeadingTitle from "@/component/widget/header/headingTitle"
import BackgroundLoader from "@/component/widget/backgroundLoader"
import { useLoadingContext } from "@/context/loadingContext"
import Notification from "@/component/ui/notification"
import ButtonLogout from "@/component/ui/buttonLogout"
import IonIcon from "@/component/ui/common/ionicon"

const HeaderDashboard = ({ data, user }) => {
  const { quote, author } = data || {};
  const { loading } = useLoadingContext()
  const { account: { email = "", createAt= "", role = "" } = {} } = user || {};
  const defaultQuote = "⚡ Motivation will get you started, but discipline will keep you going when motivation disappears — and it always disappears eventually."
  const avatar = email.includes("farid") ? "admin" : "https://raw.githubusercontent.com/fridfn/sourceimage/refs/heads/main/portofolio/logo/cat.jpg";
  const capitalize = str => str[0]?.toUpperCase() + str?.slice(1)
  
  return (
   <div className='header header-dashboard'>
     <HeadingTitle role={role && capitalize(role)}/>
     <BackgroundLoader loading={loading} />
      <div className="wrapper header-description">
      <div className="wrapper wrapper-profile">
       <ButtonLogout />
       <div className="box box-admin">
         <Avatar name={avatar} />
       </div>
       <div className="wrapper-info-admin">
       <DecryptedText
          text={"Hey, " + email.split("@")[0]}
          animateOn="hover"
          speed={120}
          sequential={true}
          className="title"
          parentClassName="greeting"
          encryptedClassName="title"
          revealDirection="start"
          characters="÷×"
          highlightText={"Hey,"}
       />
       <DecryptedText
          text={email}
          speed={120}
          animateOn="hover"
          sequential={true}
          className="description"
          parentClassName="description"
          encryptedClassName="description"
          revealDirection="start"
          characters="÷×"
       />
       </div>
      </div>
      <div className="content">
        <p className="description quote">{ quote || defaultQuote }</p>
        <div className="wrapper">
          <p className="description quote-from">— { author || "Farid Fathoni N" }</p>
          <ClickableAnimateIcons
            className="wrapper action"
            animationClass="animate-popping">
            <IonIcon name="heart" className="icons"></IonIcon>
            <IonIcon name="arrow-redo" className="icons"></IonIcon>
          </ClickableAnimateIcons>
        </div>
      </div>
    </div>
    <Notification />
   </div>
  )
}

export default HeaderDashboard;
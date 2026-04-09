import { switchThemeHelper } from "@/component/widget/header/switchThemeHelper"
import IonIcon from "@/component/ui/common/ionicon"

const ToggleTheme = () => {
  const { theme, themeToggle } = switchThemeHelper()
  
  return (
   <div
     className='box'
     onClick={() => themeToggle()}>
      <IonIcon name={theme === "dark" ? "moon" : "sunny"} className="icon"/>
   </div>
  )
}

export default ToggleTheme;
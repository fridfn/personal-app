import react, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import NProgress from "nprogress"
import "@/styles/app.css";

NProgress.configure({ 
   showSpinner: false, 
   easing: 'ease',
   trickleRate: 0.02,
   trickleSpeed: 500
 });

const NProgressWrapper = ({ }) => {
  const location = useLocation()
  
  useEffect(() => {
    NProgress.start()
    const NPTimer = setTimeout(() => {
      NProgress.done()
    }, 300)
    return () => clearTimeout(NPTimer)
  }, [location.pathname])
  
  return null
}

export default NProgressWrapper;
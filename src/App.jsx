import "swiper/css";
import AOS from "aos";
import "aos/dist/aos.css"
import "@/styles/app.css"
import "@/styles/pseudo.css"
import "@/styles/coloring.css"
import "swiper/css/pagination"
import "@/styles/responsive.css"
import { RoutesComponent } from "@/routes";
import { useState, useEffect, useRef } from "react"
import NProgressWrapper from "@/utils/NProgressWrapper"
import { DeviceFrameset } from "react-device-frameset";
import 'react-device-frameset/styles/marvel-devices.min.css'
import 'react-device-frameset/styles/device-emulator.min.css'
import { useNotificationContext } from "@/context/notificationContext"
import { APP_VERSION } from "@/utils/appVersion"

function App() {
  const  [ isMobile, setIsMobile ] = useState(true)
  const  [ messageNotification, setMessageNotification ] = useState("")
  const notificationRef = useRef(null)
  const { showNotification } = useNotificationContext();
  AOS.init({ mirror: false, once: true });
  
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js", {
         scope: "/"
     }).then(() => console.log("✅ Service Worker registered!"));
    }
  }, []);
  
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
      localStorage.setItem("float-button", JSON.stringify({ 
          x: 209.70501708984375,
          y: 359.132568359375
        })
      )
    };
    
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  
  useEffect(() => {
   if (messageNotification) {
     setTimeout(() => {
       showNotification({
         timer: 3500,
         typeNotification: "info",
         message: messageNotification
       })
     }, 2000)
     
     return () => {
       if (notificationRef.current) {
         clearTimeout(notificationRef.current)
       }
     }
   }
  },[messageNotification])
  
  useEffect(() => {
   const savedVersion = localStorage.getItem("app_version")
  
   if (savedVersion !== APP_VERSION) {
    if ("caches" in window) {
     caches.keys().then(names => {
      names.forEach(name => caches.delete(name))
     })
    }
  
    localStorage.clear()
    sessionStorage.clear()
  
    localStorage.setItem("app_version", APP_VERSION)
  
    window.location.reload()
   }
  }, [])

  
  navigator.serviceWorker.ready.then(async (registration) => {
    const subscription = await registration.pushManager.getSubscription()
    
    if (!subscription) {
      setMessageNotification("Enable notification for info update")
      localStorage.removeItem("notification-permission")
    }
  })
  
  document.fonts.ready.then(() => {
    if (document.fonts.ready) {
      document.documentElement.classList.add('font-loaded');
    }
  });
  
  
  return (
   <>
    <NProgressWrapper />
    {isMobile ? (
      <RoutesComponent />
    ) : (
     <DeviceFrameset 
        device="iPhone X" color="white"
        width="465" height="825" zoom="125%"
      >
       <div style={{ width: "100%", height: "100%" }}>
          <RoutesComponent />
        </div>
     </DeviceFrameset>
    )}
   </>
  )
}

export default App;

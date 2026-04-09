const publicVapidKey = 'BG36Zp6Qg1pM7czK5qVSBOmccF87woXofKRBhI9gPM3C0rMPwlrpvaCLcovgmAGmxJXXKwEpCKWAC9IlDZQXnRg';
import { urlBase64ToUint8Array } from "@/utils/urlBase64ToUint8Array"
import { useNotificationContext } from "@/context/notificationContext"

export const notificationHelper = async ({ showNotification, user }) => {
  try {
   const userUid = user?.uid;
   const permission = await Notification.requestPermission();
   
   const register = await navigator.serviceWorker.register('/service-worker.js', {
     scope: '/',
   });
   
   const subscription = await register.pushManager.subscribe({
     userVisibleOnly: true,
     applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
   });
   
   await fetch('https://pwa-notification-phi.vercel.app/api/subscription', {
     method: 'POST',
     body: JSON.stringify({
      subscription,
      uid: userUid ? userUid : null
     }),
     headers: {
       'Content-Type': 'application/json',
     },
   });
   
   showNotification({
     timer: 5000,
     typeNotification: "success",
     message: "Thank you"
   })
   localStorage.setItem("notification-permission", "granted")
   return permission === "granted"
  } catch (error) {
   showNotification({
     timer: 2500,
     typeNotification: "error",
     message: error.message
   })
  }
}
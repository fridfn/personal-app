import { saveBroadcast } from "/api/saveBroadcast";
import { useNotificationContext } from "@/context/notificationContext"

export const useSendNotification = () => {
  const { showNotification } = useNotificationContext();
  
  const sendNotification = async (data) => {
   const { title, message } = data;
   
   try {
    const respond = await fetch("https://pwa-notification-phi.vercel.app/api/notification", {
     method: "POST",
     headers: {
      "Content-Type": "application/json"
     },
     body: JSON.stringify({
        title,
        body: message,
        icon: "https://raw.githubusercontent.com/fridfn/sourceimage/refs/heads/main/profile_pict.jpg",
        badge: "https://cdn-icons-png.flaticon.com/64/545/545826.png"
       })
    })
    
    if (!respond.ok) {
     const result = await respond.text()
     showNotification({
       timer: true,
       typeNotification: "alert",
       message: "Server send broadcast error!"
     })
     //console.error("❌ Server Error:", result);
     return;
    }
    
    const result = await respond.json()
    await saveBroadcast(data);
    showNotification({
      timer: true,
      typeNotification: "success",
      message: "Success send broadcast!"
    })
    //console.log("✅ Berhasil kirim:", data);
   } catch (err) {
    //console.error("❌ Gagal Kirim:", err);
    showNotification({
      timer: true,
      typeNotification: "error",
      message: "Error process send broadcast!"
    })
   }
  }
  return { sendNotification }
} 
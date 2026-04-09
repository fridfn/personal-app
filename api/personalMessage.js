import { getAuth } from "firebase/auth";

export const personalMessage = async (targetUid, message, account) => {
  const idToken = await getAuth().currentUser.getIdToken(true);
  
   try {
     const respond = await fetch(`https://pwa-notification-phi.vercel.app/api/user/${targetUid}/message`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${idToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message,
        targetUid,
        account,
        icon: "https://raw.githubusercontent.com/fridfn/sourceimage/refs/heads/main/profile_pict.jpg",
        badge: "https://cdn-icons-png.flaticon.com/64/545/545839.png"
      })
    })
    
    if (!respond.ok) {
     const result = await respond.text()
     console.error("❌ Server Error:", result);
     throw new Error("Can't send message, Because user doesn't subscribe.")
    }
    
    const result = await respond.json()
    console.log("✅ Berhasil kirim:", message);
   } catch (err) {
    console.error("❌ Gagal Kirim:", err);
    throw err;
   }
} 
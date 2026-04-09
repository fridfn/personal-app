export const updateActivity = async (data) => {
  try {
   const respond = await fetch("https://pwa-notification-phi.vercel.app/api/user/activity", {
    method: "POST",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
   })
   
   if (!respond.ok) {
    const result = await respond.text()
    console.error("❌ Server Error:", result);
    return;
   }
   
   const result = await respond.json()
   console.log("✅ Berhasil simpan data:", result)
  } catch (err) {
   console.error("❌ gagal fetch :", err)
  }
}
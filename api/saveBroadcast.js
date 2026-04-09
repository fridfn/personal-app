export const saveBroadcast = async (data) => {
  const { title, message } = data || {};
  
  try {
   const respond = await fetch("https://pwa-notification-phi.vercel.app/api/broadcast", {
    method: "POST",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify({
       title,
       body: message,
       createAt: new Date().toISOString()
      })
   })
   
   if (!respond.ok) {
     const result = await respond.text()
     console.error("❌ Server Error:", result);
     return;
   }
   
   const result = await respond.json()
   console.log("✅ Berhasil simapan data:", result);
  } catch (err) {
    console.error("❌ Gagal simpan data:", err);
  }
}
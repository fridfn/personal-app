export const saveFeedback = async (data) => {
  const { name, title, email, message } = data || {}
  
  try {
   const respond = await fetch("https://pwa-notification-phi.vercel.app/api/feedback", {
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
    console.log("✅ Berhasil simpan feedback user:", result);
  } catch (err) {
    console.log("gagal fetching data dari server", err.message)
  }
}
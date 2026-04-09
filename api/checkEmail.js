export const checkEmail = async (data) => {
  try {
   const respond = await fetch("https://pwa-notification-phi.vercel.app/api/checkemail", {
    method: "POST",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify({
     email: data
    })
   })
   
   if (!respond.ok) {
    const result = await respond.text()
    console.error("❌ Server Error:", result);
    return;
   }
   
   const result = await respond.json()
   return result;
   console.log("✅ Berhasil check email:", result)
  } catch (err) {
   console.log("ERROR FETCH", err.message)
  }
}
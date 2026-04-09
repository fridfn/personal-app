import { getAuth } from "firebase/auth";

export const updateRole = async (targetUid, newRole) => {
  const idToken = await getAuth().currentUser.getIdToken(true);
  const signinUser = JSON.parse(localStorage.getItem("user-data"))
  const updaterRole = signinUser.account.role
  
  try {
   const validRoles = ["owner", "administrator", "admin", "visitor", "user"];
    const normalizedRole = newRole.toLowerCase();
    
    if (!validRoles.includes(normalizedRole)) {
      throw new Error(
        `Role must be: ${validRoles.join(", ")}`
      );
    }
    
    const response = await fetch(`https://pwa-notification-phi.vercel.app/api/user/${targetUid}/role`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${idToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ newRole, uid: targetUid })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
     let errorMessage;
     (updaterRole === "owner")
      ? errorMessage = `${updaterRole} can't promote another user to ${newRole}`
      :`Role ${updaterRole} can't promote this user to "${newRole}"`
      
      throw new Error(errorMessage);
    }
    
    return data;
  } catch (err) {
    console.error("Network error:", err);
    throw err
  }
}
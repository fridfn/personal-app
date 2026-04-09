import { db } from "@/firebase"
import { ref, update } from "firebase/database"

export const validateAndUpdateRole = async (uid, role) => {
  if (!role) {
    throw new Error("Role tidak boleh kosong");
  }
  
  const validRoles = ["owner", "administrator", "admin", "visitor", "user"];
  const normalizedRole = role.toLowerCase();

  if (!validRoles.includes(normalizedRole)) {
    throw new Error(
      `Role must be: ${validRoles.join(", ")}`
    );
  }
  
  try {
    const href = ref(db, `users/${uid}/account/`);
    await update(href, {
      role: normalizedRole,
      updatedAt: new Date().toISOString(),
    });
    
    console.log("Updated role:", normalizedRole);
  } catch (err) {
    console.error("Error update role:", err);
    throw err;
  }
  
  return normalizedRole;
};

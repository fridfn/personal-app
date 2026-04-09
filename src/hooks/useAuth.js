import React, { useState, useEffect } from "react"
import { auth, db } from "@/firebase"
import { useNavigate } from "react-router-dom"
import { ref, get, query, orderByChild, equalTo, onValue } from "firebase/database"
import { registerUser } from "/api/register"
import { useNotificationContext } from "@/context/notificationContext"
import { checkEmail } from "/api/checkEmail"
import { migrateSubscription } from "@/utils/migrateSubscription"
import { useLoadingContext } from "@/context/loadingContext"
import { useScrollLock } from "@/hooks/useScrollLock"
import { usePerformance } from "@/utils/usePerformance"
import { 
  onAuthStateChanged,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

export const useAuth = () => {
  const navigate = useNavigate()
  const { dataPerformance } = usePerformance("accounts:")
  const [ user, setUser ] = useState(null)
  const { showNotification } = useNotificationContext();
  const { withLoading, loading } = useLoadingContext()
  useScrollLock(loading)
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      
      if (!currentUser) {
        localStorage.removeItem("user-data")
        setUser(null)
        return;
      }
      
      setUser(currentUser)
      
      const shouldMigrate = localStorage.getItem("should-migrate") === "true"
      if (shouldMigrate) {
        await migrateSubscription(currentUser)
        localStorage.removeItem("should-migrate")
      }
    })
    
    return () => unsubscribe()
  }, [])
  
  const Register = async (email, password) => { 
   try {
     const checkThisEmail = withLoading(async () => {
      return await checkEmail(email)
     }, dataPerformance.duration)
     const result = await checkThisEmail;
     const isAvailable = result?.available;
     
     if (!isAvailable) {
      showNotification({
        timer: true,
        typeNotification: "info",
        message: "This email is registered. Please login!"
      })
      return;
     }
     
     const createUser = await withLoading(async () => {
       return await createUserWithEmailAndPassword(auth, email, password)
     }, dataPerformance.duration)
     
     await showNotification({
       timer: true,
       typeNotification: "success",
       message: "Register success. Please Login!"
     })
     
     await sendEmailVerification(createUser.user)
     const payload = {
       uid: createUser.user.uid,
       email: createUser.user.email,       
       createdAt: createUser.user.metadata.creationTime,
       lastLoginAt: createUser.user.metadata.lastSignInTime,
       password
     }
     console.log(payload)
     await registerUser(payload)
     
     return await signOut(auth)
   } catch (err) {
     console.error("ERROR BRO : ", err.message)
     if (err.message.includes("email-already-in-use")) {
      showNotification({
        timer: true,
        typeNotification: "alert",
        message: "This email is registered. Please login!"
      })
      return;
     }
     
    showNotification({
      timer: true,
      typeNotification: "alert",
      message: "Failed register."
    })
   }
  }
  
  const Login = async (email, password) => {
   try {
    return withLoading(async () => {
      await signInWithEmailAndPassword(auth, email, password)
      localStorage.setItem("should-migrate", "true")
    }, dataPerformance.duration)
    
   } catch (err) {
     console.log("gagal login", err.message)
     showNotification({
       timer: true,
       typeNotification: "alert",
       message: "failed login. please enter valid email and password"
     })
   }
  }
  
  const validateLogin = async (email, password) => {
    try {
      await Login(email, password)
      
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (!currentUser) return;
          
          const userData = await getUserData(currentUser.uid)
          
          localStorage.setItem("user-data", JSON.stringify(userData))
          localStorage.removeItem("mood")
          
          navigate("/home/personality")
          showNotification({
            timer: 5000,
            typeNotification: "info",
            message: `Selamat datang ${currentUser.email.split("@")[0]}`
          })
          
          unsubscribe()
          resolve({
            uid: currentUser.uid,
            ...userData,
          })
        })
      })
    } catch (error) {
      showNotification({
        timer: 5000,
        typeNotification: "alert",
        message: `Failed to login, Please register first.`
      })
      throw error
    }
  }
  
  const getUserData = async (uid) => {
   try {
    const userRef = ref(db, "users/" + uid)
    const snapshot = await get(userRef)
    
    if (snapshot.exists()) {
     const userData = snapshot.val()
     
     return userData;
     
      if (!userData.active) {
       showNotification({
         timer: true,
         typeNotification: "alert",
         message: "Minta admin untuk mengaktifkan akun."
       })
       
       return console.log("user belum di aktifkan")
      }
     }
    } catch (error) {
     console.log("errrorrr kocak")
    throw error
   }
  }
  
  const Logout = async (redirect) => {
   await signOut(auth)
   navigate(redirect)
   
   showNotification({
     timer: 5000,
     typeNotification: "alert",
     message: `Success logout!`
   })
   localStorage.removeItem("user-data")
  }
  
  return {
    user,
    Logout,
    Register,
    getUserData,
    validateLogin,
  }
}
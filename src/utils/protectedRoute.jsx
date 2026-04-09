import React, { useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({ requiredAdmin = false }) => {
   const { user } = useAuth()
   const authentication = JSON.parse(localStorage.getItem("user-data"));
   
   if (!authentication && !user) return <Navigate to="/user/login" />;
   
   if (!authentication && authentication?.length > 0) {
     const superiorRole = ["owner", "admin", "administrator"];
     const { account: { role } } = authentication
     const adminAccess = superiorRole.includes(role);
     
     
     if (requiredAdmin && !adminAccess) {
       return <Navigate to="/home/introduction" />;
     }
   }
   return <Outlet />;
};


export default ProtectedRoute;
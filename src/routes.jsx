import User from "@/pages/user"
import NotFound from "@/NotFound"
import Dasboard from "@/pages/dasboard"
import LoadingPages from "@/pages/loading"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "@/utils/protectedRoute"

export const RoutesComponent = () => {
 return(
  <Routes>
   <Route element={<ProtectedRoute requiredAdmin={false} />}>
     <Route
       path="/dashboard/statistics" 
       element={<Dasboard data="statistics"/>}
     />
   </Route>
   <Route element={<ProtectedRoute requiredAdmin={true} />}>
     <Route 
       path="/dashboard/history"
       element={<Dasboard data="history"/>}
     />
     <Route
       path="/dashboard/broadcast" 
       element={<Dasboard data="broadcast"/>}
     />
   </Route>
   <Route path="/" element={<LoadingPages data="loading dulu bang" />} />
   <Route path="/user/login" element={<User data="login" />} />
   <Route path="/user/register" element={<User data="register" />} />
   <Route path="*" element={<NotFound />} />
  </Routes>
 )
}
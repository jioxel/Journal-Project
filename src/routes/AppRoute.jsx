import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { FirebaseAuth } from "../firebase/config"
import { useCheckAuth } from "../hooks"
import { JournalRoute } from "../journal/routes/JournalRoute"
import { logout,login } from "../store/auth/authSlice"
import { CheckingAuth } from "../ui"

export const AppRoute = () => {

  const {status}=useCheckAuth();
  
  if(status=='checking'){
    return <CheckingAuth/>;
  }

  return (
    <>
     <Routes>
      {
        status==='authenticate' 
        ? <Route path="/*" element={<JournalRoute/>}/>
        : <Route path="/auth/*" element={<AuthRoutes/>}/>
      }
      <Route path='/*' element={<Navigate to='auth/login' />} />
          {/* Login y registro */}

     </Routes>
    </>
  )
}

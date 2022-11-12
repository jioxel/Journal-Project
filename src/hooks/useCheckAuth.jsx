import { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { startLoadingNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {
     const dispatch=useDispatch();
     const {status}=useSelector(state=> state.auth);

     useEffect(() => {
     
     onAuthStateChanged(FirebaseAuth, async( user )=>{
          if(!user) return dispatch(logout());
          const { uid, email,photoURL,displayName}=user;
          dispatch(login({ uid, email,photoURL,displayName}));
          dispatch(startLoadingNotes());
     })
  

  }, [])
  return {status}
}

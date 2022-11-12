import { async } from "@firebase/util";
import { loginWitchEmailPassword, logoutFirebase, registerUserWitchEmailPassword, singInWitchGoogle } from "../../firebase/providers";
import { clearNoteLogout } from "../journal/journalSlice";
import { checkingCredentials, logout,login } from "./authSlice"

export const checkingAuthentication =()=>{
     return async(dispatch)=>{
          dispatch( checkingCredentials() );
     }
}
export const startGoogleSingIn=()=>{
     return async(dispatch)=>{
          dispatch( checkingCredentials() );
          const result = await singInWitchGoogle();
          if(!result.ok) return dispatch( logout(result.errorMessage));
          dispatch ( login(result))
     }
}


export const startCreatingUserWithEmailPassword=({email,password,displayName})=>{
     return async(dispatch)=>{
          
          dispatch(checkingCredentials());
          
          const {ok,uid,photoURL,errorMessage}=await registerUserWitchEmailPassword({email,password,displayName})

          if(!ok) return dispatch(logout({errorMessage}))

          dispatch ( login({uid,displayName,email,photoURL}));
          
     }
}


export const startLoginWithEmailPassword=(email,password)=>{

     return async(dispatch)=>{
          dispatch(checkingCredentials());
          const {ok,uid,photoURL,errorMessage,displayName} = await loginWitchEmailPassword(email,password);

          if(!ok) return dispatch(logout({errorMessage}));
          dispatch(login({email,uid,photoURL,errorMessage,displayName}))
     }
}

export const startLogout=()=>{
     return async(dispatch)=>{
          await logoutFirebase();
          dispatch(clearNoteLogout());
          dispatch(logout({}));
     }
}
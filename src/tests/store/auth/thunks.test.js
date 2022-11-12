
import { loginWitchEmailPassword, logoutFirebase, registerUserWitchEmailPassword, singInWitchGoogle } from '../../../firebase/providers';
import { checkingCredentials, login, logout } from '../../../store/auth/authSlice'
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSingIn, startLoginWithEmailPassword, startLogout } from '../../../store/auth/thunks'
import { clearNoteLogout } from '../../../store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../firebase/providers')

describe('Pruebas en auth thunks', () => { 
     const dispatch=jest.fn();
     beforeEach(()=>jest.clearAllMocks())

     test('Debe de invocar el checkin credencials', async () => { 
          
          await checkingAuthentication()(dispatch);
          expect (dispatch).toHaveBeenCalledWith(checkingCredentials())

     });

     test('startGoogleSingIn debe de llamar Checkin credentials y Login -EXcito',async()=>{
          const loginData={
               ok:true,
               ...demoUser
          }
          await singInWitchGoogle.mockResolvedValue(loginData)
          await startGoogleSingIn()(dispatch)
          expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
          expect(dispatch).toHaveBeenCalledWith(login(loginData))
     })

     test('startGoogleSingIn debe de llamar Checkin credentials y Logout con mensaje de error -ERROR',async()=>{
          const loginData={
               ok:false,
               ...demoUser,
               errorMessage:"ERROR"
          }
          await singInWitchGoogle.mockResolvedValue(loginData)
          await startGoogleSingIn()(dispatch)
          expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
          expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
     })


     test('startCreatingUserWithEmailPassword debe de llamar checkinCredencials y login (caso de Exito)',async()=>{
          const creatingUser={
               ...demoUser,
               password:"passDemo",
               ok:true
          }
          await registerUserWitchEmailPassword.mockResolvedValue(creatingUser)
          await startCreatingUserWithEmailPassword(creatingUser)(dispatch)
          
          expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
          expect(dispatch).toHaveBeenCalledWith(login({uid:creatingUser.uid,displayName:creatingUser.displayName,email:creatingUser.email,photoURL:creatingUser.photoURL}))
     })


     
     test('startCreatingUserWithEmailPassword debe de llamar checkinCredencials y logout (caso de ERROR)',async()=>{
          const creatingUser={
               ...demoUser,
               password:"passDemo",
               errorMessage:"ERROR",
               ok:false
          }
          await registerUserWitchEmailPassword.mockResolvedValue(creatingUser)
          await startCreatingUserWithEmailPassword(creatingUser)(dispatch)
          
          expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
          expect(dispatch).toHaveBeenCalledWith(logout({errorMessage:creatingUser.errorMessage}))
     })

     test('startLoginWithEmailPassword debe de llamar checkinCredencials y login (caso de Exito)',async()=>{
          const creatingUser={
               ...demoUser,
               password:"passDemo",
               errorMessage:"ERROR",
               ok:true
          }
          await loginWitchEmailPassword.mockResolvedValue(creatingUser)
          await startLoginWithEmailPassword(creatingUser.email,creatingUser.password)(dispatch)
          
          expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
          expect(dispatch).toHaveBeenCalledWith(login({
               email:creatingUser.email,
               uid:creatingUser.uid,
               photoURL:creatingUser.photoURL,
               errorMessage:creatingUser.errorMessage,
               displayName:creatingUser.displayName
          }))
     })
     test('startLoginWithEmailPassword debe de llamar checkinCredencials y logout (caso de ERROR)',async()=>{
          const creatingUser={
               ...demoUser,
               password:"passDemo",
               errorMessage:"ERROR",
               ok:false
          }
          await loginWitchEmailPassword.mockResolvedValue(creatingUser)
          await startLoginWithEmailPassword(creatingUser.email,creatingUser.password)(dispatch)
          
          expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
          expect(dispatch).toHaveBeenCalledWith(logout({errorMessage:creatingUser.errorMessage}))
     })


     test("startLogoutv debe llamar logoutFirebase,clearNoteLogout() y logout()",async()=>{

          
          await startLogout()(dispatch)
          expect(logoutFirebase).toHaveBeenCalled()
          expect(dispatch).toHaveBeenCalledWith(clearNoteLogout())
          expect(dispatch).toHaveBeenCalledWith(logout({}))
     })
 })
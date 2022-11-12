import { authSlice,login,logout,checkingCredentials } from "../../../store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticate } from "../../fixtures/authFixtures"

describe('Pruebas en el AuthSlice ', () => { 
     test('debe de regresar el estado inicial y llamarse auth',()=>{
          const state=authSlice.reducer(initialState,{});

          expect(authSlice.name).toBe('auth') //verificar el nombre del Slice
          expect(state).toEqual(initialState) //verificar estado inicial
     })

     test('Debe de realizar la autenticacion', () => { 
          const state=authSlice.reducer(initialState,login(demoUser));
          expect(state).toEqual({
               status: 'authenticate', //'checking', 'not-authenticate', 'authenticate'
               uid: demoUser.uid,
               email:demoUser.email,
               displayName:demoUser.displayName,
               photoURL:demoUser.photoURL,
               errorMessage:null,
          })
     })
     test('debe de realizar el logout sin argumentos',()=>{
          const state=authSlice.reducer(authenticatedState,logout({}))
          expect(state).toEqual({
               status: 'not-authenticate', //'checking', 'not-authenticate', 'authenticate'
               uid: null,
               email:null,
               displayName:null,
               photoURL:null,
               errorMessage:undefined,
          })

     })
     test('debe de realizar el logOut con un mensaje de error',()=>{
          const errorMessage="ERROR"

          const state=authSlice.reducer(authenticatedState,logout({errorMessage}))
          expect(state).toEqual({
               status: 'not-authenticate', //'checking', 'not-authenticate', 'authenticate'
               uid: null,
               email:null,
               displayName:null,
               photoURL:null,
               errorMessage
          })
     })
     test('Debe de cambiar el estado a checking',()=>{
          const state=authSlice.reducer(initialState,checkingCredentials())
          expect(state.status).toBe('checking')
     })
 })
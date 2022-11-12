import { Link as RouterLink} from 'react-router-dom'
import {  Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AutLayout } from '../layout/AutLayout'
import { useForm } from '../../hooks'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'
import { useMemo } from 'react'

const formData={
  displayName:'',
  email:'',
  password:'',
}
const formValidations={
  email: [(value)=> value.includes('@'),'El correo debe de tener una @'],
  password: [(value)=> value.length>=6,'El password debe de tener mas de 6 letras'],
  displayName: [(value)=> value.length>=1,'El nombre es obligatorio'],
  
  
}
export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const {formState,displayName, email, password, onInputChange,
  isFormValid, displayNameValid, emailValid, passwordValid 
  }=useForm(formData,formValidations);

  const dispatch= useDispatch();

  const {status,errorMessage}=useSelector(state => state.auth);
  const isCheckingAuthentication=useMemo(()=>status=== 'checking',[status])


  const onSubmit=( event )=>{
    event.preventDefault();
    setFormSubmitted(true);
    if(!isFormValid) return;


    dispatch(startCreatingUserWithEmailPassword(formState))
  }
  

  return <>
    <AutLayout title="Register ">
      <h1>FormValid {isFormValid ? 'Correcto':'Incorrecto'}</h1>

    <form onSubmit={onSubmit}
    className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
            <Grid item xs={12}  sx ={{mt:2}}>

              <TextField 
              label="Nombre completo" 
              type="text" 
              placeholder="Nombre completo" 
              fullWidth
              name='displayName'
              value= { displayName }
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}/>

            </Grid>
            <Grid item xs={12}  sx ={{mt:2}}>

              <TextField 
              label="Correo" 
              type="email" 
              placeholder="@" 
              fullWidth
              name = 'email'
              value = { email }
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}/>

            </Grid>
            <Grid item xs={12}  sx ={{mt:2}}>

              <TextField 
              label="Contraseña" 
              type="password" 
              placeholder="**********" 
              fullWidth
              name='password'
              value= {password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}/>

            </Grid>

            

            <Grid container spacing={ 2} sx={{ mt:1,mb:2 }}>

            <Grid item xs={ 12 }
            display={!!errorMessage ? "": 'none'}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>


              <Grid item xs={ 12 }>
                <Button 
                disabled={isCheckingAuthentication}
                variant="contained" 
                fullWidth
                type='submit'> Crear cuenta </Button>
              </Grid>
            </Grid>

            <Grid container direction = 'row' justifyContent='end'>
              <Typography sx ={{mr:1}}> ¿Ya tienes una cuenta?</Typography>
              <Link component= { RouterLink } color='inherit' to="/auth/login">
                Ingresar
              </Link>
            </Grid>
          </Grid>
        </form>


    </AutLayout>

  </>
}

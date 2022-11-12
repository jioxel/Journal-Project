import { Link as RouterLink} from 'react-router-dom'
import { Google } from "@mui/icons-material"
import {  Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { padding } from "@mui/system"
import { AutLayout } from '../layout/AutLayout'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { checkingAuthentication, startGoogleSingIn, startLoginWithEmailPassword } from '../../store/auth/thunks'
import { useMemo } from 'react'

const formData={
  email: 'a@l.com',
  password:'123123',
};
export const LoginPage = () => {
  const dispatch=useDispatch()

  const { status,errorMessage }=useSelector( state=> state.auth );


  const {email,password,onInputChange}= useForm(formData);

  const isAuthenticating=useMemo(()=> status === 'checking', [status]);

  const onSubmit=(event)=>{
    event.preventDefault();
  

    dispatch( startLoginWithEmailPassword(email,password) );

  }
  const onGoogleSingInt=()=>{
    dispatch(startGoogleSingIn())
  }

  return <>
    <AutLayout title="Login ">

    <form onSubmit={onSubmit}
    className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
            <Grid item xs={12}  sx ={{mt:2}}>
              <TextField 
              name="email"
              label="Correo" 
              type="email" 
              placeholder="@" 
              fullWidth
              value={ email }
              onChange={ onInputChange }/>
            </Grid>
            <Grid item xs={12}  sx ={{mt:2}}>
              <TextField 
              name="password"
              label="Contraseña"
               type="password" 
               placeholder="*" 
               fullWidth
               value={ password }
               onChange={ onInputChange }/>
            </Grid>


            <Grid container spacing={ 2} sx={{ mt:1,mb:2 }} 
            display= {!!errorMessage ? "":"none"}>
              <Grid item xs={ 12 } >

                <Alert severity='error'>{errorMessage}</Alert>
 
              </Grid>
            </Grid>

            <Grid container spacing={ 2} sx={{ mt:1,mb:2 }}>
            
              <Grid item xs={ 6 }>

                <Button 
                disabled ={isAuthenticating}
                variant="contained" 
                fullWidth 
                type="submit"> Login </Button>

              </Grid>
              <Grid item xs={ 6 }>

                <Button 
                disabled ={isAuthenticating}
                variant="contained" 
                fullWidth 
                onClick={ onGoogleSingInt}> 


                  <Google/>
                  <Typography sx={{ml:1}}> Google </Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction = 'row' justifyContent='end'>
              <Link component= { RouterLink } color='inherit' to="/auth/register">
              Crear una cuenta
              </Link>
              
            </Grid>
          </Grid>
        </form>


    </AutLayout>

  </>
}

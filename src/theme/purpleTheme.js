import { createTheme } from "@mui/material";
import { pink, red } from "@mui/material/colors";

export const purpleTheme= createTheme({
     palette:{
          primary:{
               main:'#E4CC67'
               },
          secondary:{
               // main:'#edc7e4'
               main:'#6ebfb5'
          },
          error:{
               main:red.A400
          }
     }
})
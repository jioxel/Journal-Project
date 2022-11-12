import { Toolbar } from "@mui/material";
import { Box } from "@mui/system"
import { NavBar, SideBar } from "../components";
const drawerWidth = 240;


export const JournalLayout = ({ children }) => {
  return (
     <Box sx={{display:'flex'}}
     className='animate__animated animate__fadeIn animate__faster'>
          {/* NavBar */}
          <NavBar drawerWidth={drawerWidth}/> 


          {/* SiderBar */}
          <SideBar drawerWidth={drawerWidth}/>
          <Box
               component = 'main'
               sx={{flexGrow:1,p:3}}
          >
               {/* toolBar */}
               <Toolbar/>
               { children }

          </Box>

     </Box>
  )
}

import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { LocalFireDepartment, TurnedInNot } from "@mui/icons-material"
import { useMemo } from "react";
import { useSelector,useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice";
export const SideBarItem = ({title="",body,id,date,imageUrls=[]}) => {

     const newTitle=useMemo(()=>{
          return title.length>8 ? title.substring(0,12)+"..." : title;  
     },[title]);
     const dispatch= useDispatch();

     const onClickNote=()=>{
          dispatch(setActiveNote({title,body,id,date,imageUrls}))
     }
  return (
     <ListItem  disablePadding>
          <ListItemButton
          onClick={onClickNote}>
               <ListItemIcon>
                    <TurnedInNot/>
               </ListItemIcon>
               <Grid container>
                    <ListItemText primary={newTitle}/>
                    <ListItemText secondary={body}/>
               </Grid>
               
     </ListItemButton>

     </ListItem>
  )
}

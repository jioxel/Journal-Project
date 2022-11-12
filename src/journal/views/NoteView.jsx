import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"

import { useMemo,useEffect,useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from "../../hooks"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSavingNote, starUploadingFiles } from "../../store/journal/thunks"
import { ImageGallery } from "../components"

export const NoteView = () => {

     const dispatch=useDispatch();
     const {active:note,messageSaved, isSaving}=useSelector(state => state.journal);

     const{ body, title,date, onInputChange,formState}=useForm( note );



     const dateString = useMemo(() => {

          const newDate=new Date(date).toUTCString();
          return newDate;
     }, [date])

     const fileInputRef = useRef()

     useEffect(() => {
          dispatch(setActiveNote(formState))
     }, [formState]);

     useEffect(()=>{
          if(messageSaved.length>0){
               Swal.fire('Nota actualizada',messageSaved,'success');
          }
     },[messageSaved])
     const onSaveNote=()=>{
          dispatch(startSavingNote());
     }
     const onFileInputChange=({target})=>{
          if(target.files==0) return;
          dispatch(starUploadingFiles(target.files));

     }
     const onDelete=()=>{
          dispatch(startDeletingNote());
     }
     
  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx = {{mb:1}}>
          <Grid item>
               <Typography fontSize={ 39 } fontWeight='ligth'> {dateString} </Typography>
          </Grid>

          <input
               type='file'
               multiple
               onChange={onFileInputChange}
               style={{display:'none'}}
               ref={fileInputRef}
          />
          <IconButton
          color='primary'
          onClick={()=>fileInputRef.current.click()}
          disabled={isSaving}>
               <UploadOutlined/>
          </IconButton>

          <Grid item>
               <Button 
               disabled={isSaving}
               color='primary' 
               sx={{padding:2}}
               onClick={onSaveNote}>
                    <SaveOutlined sx={{fontSize:30, mr:1}}/>
                    Guardar
               </Button>
          </Grid>
          <Grid container>
               <TextField
                    type='text'
                    variant="filled"
                    fullWidth
                    placeholder="Ingresa un titulo"
                    label="Título"
                    sx={{ border: 'none', mb:1}}
                    name="title"
                    value={title}
                    onChange={onInputChange}
               />
               <TextField
                    type='text'
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Que paso hoy?"
                    minRows={ 5 }
                    name="body"
                    value={body}
                    onChange={onInputChange}
               />

          </Grid>
          <Grid container justifyContent='end'>
               <Button
               onClick={ onDelete}
               sx={{mt:2}}
               color="error">
                    <DeleteOutline/>
                    Borrar
               </Button>
          </Grid>

          {/* Galeria de imagenes */}
          <ImageGallery images={note.imageUrls}/>

    </Grid>
  )
}

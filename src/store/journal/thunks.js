import { async } from "@firebase/util";
import { ProductionQuantityLimitsRounded } from "@mui/icons-material";
import { collection, deleteDoc, doc, DocumentReference, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNote } from "../../helpers";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNote, setPhotosToActiveNotes, setSaving, updateNote } from "./journalSlice";

export const startNewNote=()=>{
     return async(dispatch, getState)=>{
          dispatch( savingNewNote())
          const {uid}=getState().auth;

          const newNote={
               title:'',
               body:'',
               date: new Date().getTime(),
               imageUrls:[],
          }
          const newDoc=doc(collection(FirebaseDB,`${uid}/journal/notas`))
          await setDoc(newDoc,newNote);
          
          newNote.id=newDoc.id;

          dispatch( addNewEmptyNote(newNote));
          dispatch( setActiveNote(newNote));
          
          

          //! 
     }
}

export const startLoadingNotes=()=>{
     return async(dispatch,getState)=>{

          const {uid}=getState().auth;
          if( !uid) throw new Error("El uid del usuario noexiste")

          const notes=await loadNote(uid);
          
          dispatch(setNote(notes))


     }
}

export const startSavingNote=()=>{
     return async(dispatch,getState)=>{
          dispatch(setSaving);
          const {uid}=getState().auth;
          const {active:note}=getState().journal;

          const noteToFireStore= {...note};
          delete noteToFireStore.id;
          const docRef=doc(FirebaseDB,`${uid}/journal/notas/${note.id}`);
          dispatch(updateNote(note));
          await setDoc(docRef,noteToFireStore,{merge:true})
     }
}

export const starUploadingFiles=(file=[])=>{
     return async(dispatch)=>{
          dispatch(setSaving());
          await fileUpload(file[0]);
          const fileUploadPromises=[];

          for (const fil of file) {
               fileUploadPromises.push(fileUpload(fil))
          }
          const photosUrls=await Promise.all(fileUploadPromises);
          dispatch(setPhotosToActiveNotes(photosUrls));
     }
}
export const startDeletingNote=()=>{
     return async(dispatch,getState)=>{
          const { uid }=getState().auth;
          const { active:note }=getState().journal;
          
          const docRef=doc(FirebaseDB,`${uid}/journal/notas/${note.id}`);

           await deleteDoc(docRef);
           dispatch(deleteNoteById(note.id));

     }
}
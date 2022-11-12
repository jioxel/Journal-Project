import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving:false,
        messageSaved:'',
        note:[],
        active:null,
     //    active:{
     //      id:'',
     //      title:'',
     //      date:1,
     //      imageUrls:[],
     //    }
    },
    reducers: {
        savingNewNote:(state)=>{
            state.isSaving=true;
        },
          addNewEmptyNote: (state,action)=>{
            state.note.push(action.payload);
            state.isSaving=false;
          },
          setActiveNote:(state,action)=>{
            state.active=action.payload;
            state.messageSaved=""
          },
          setNote:(state,action)=>{
            state.note=action.payload;
          },
          setSaving:(state,action)=>{
            state.isSaving=true;
            state.messageSaved=""

          },
          updateNote:(state,action)=>{
            state.isSaving=false;
            console.log(action.payload.id)
            state.note=state.note.map((notes)=>{
              if(notes.id===action.payload.id) {
                return action.payload;
              }
              return notes;
            })

            state.messageSaved=`${action.payload.title}, actualizada correctamente`
          },
          setPhotosToActiveNotes:(state,action)=>{
            state.active.imageUrls = [...state.active.imageUrls,...action.payload];
            state.isSaving=false;
          },
          clearNoteLogout:(state)=>{
            state.isSaving=false;
            state.messageSaved='';
            state.note=[];
            state.active=null;
          },
          deleteNoteById:(state,action)=>{
            state.isSaving=false;
            state.note=state.note.filter(not=> not.id!=action.payload);
            state.active=null;
          },
    }
});
// Action creators are generated for each case reducer function
export const { addNewEmptyNote,setActiveNote,setNote,setSaving,updateNote,deleteNoteById
,savingNewNote,setPhotosToActiveNotes,clearNoteLogout } = journalSlice.actions;
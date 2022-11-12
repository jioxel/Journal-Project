import { initialState,noteSaving,Note } from "../../fixtures/journalFixtures"
import {addNewEmptyNote,setActiveNote,setNote,setSaving,updateNote,deleteNoteById
     ,savingNewNote,setPhotosToActiveNotes,clearNoteLogout, journalSlice } from "../../../store/journal/journalSlice"
     
describe("Test en Journal Slice",()=>{
     test("debe de tener el estado inicial y llamarse journal",()=>{
          const state=journalSlice.reducer(initialState,{})
          expect(journalSlice.name).toEqual("journal")
          expect(state).toEqual(initialState)
     })
     test('savingNewNotes debe de cambiar isSaving a true',()=>{
          const state=journalSlice.reducer(initialState,savingNewNote())
          console.log(state);
          expect(state).toEqual({
               ...initialState,
               isSaving:true
          })
     })
     test('addNewEmptyNote cambiar el isSaving a false ',()=>{
          
          const state=journalSlice.reducer(noteSaving,addNewEmptyNote(Note))
          expect(state).toEqual({
               ...noteSaving,
               isSaving:false,
               note:[Note]
               
          })
     })
     test("setActiveNote",()=>{
          const state=journalSlice.reducer(initialState,setActiveNote(Note))
          expect(state).toEqual({
               ...initialState,
               active:Note,
               messageSaved:""
          })
     })
})
import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"

export const loadNote=async(uid="")=>{
     if( !uid) throw new Error("El uid del usuario noexiste")

     const collectionRef = collection(FirebaseDB, `${uid}/journal/notas`);

     const docs = await getDocs(collectionRef);
     const notes=[]
     docs.forEach(doc => {
          notes.push({id: doc.id, ...doc.data()})
     })
     return notes;

}
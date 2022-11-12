// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmFCVAHK_7LxRtKc60qxKI6cG-_BOcCyo",
  authDomain: "react-cursos-dc95a.firebaseapp.com",
  projectId: "react-cursos-dc95a",
  storageBucket: "react-cursos-dc95a.appspot.com",
  messagingSenderId: "755024962558",
  appId: "1:755024962558:web:1a79a1b3279eb3834156af"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth=getAuth(FirebaseApp);
export const FirebaseDB=getFirestore(FirebaseApp);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {deleteDoc, getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2KbWRs4-sTUGQof4lMqZkEUmsWOu4rH8",
  authDomain: "e-commerce-multimart.firebaseapp.com",
  projectId: "e-commerce-multimart",
  storageBucket: "e-commerce-multimart.appspot.com",
  messagingSenderId: "448491719434",
  appId: "1:448491719434:web:18e8b8a1763ecd040d88f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;
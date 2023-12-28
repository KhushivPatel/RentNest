// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxiGUPJkXRNnNsGa-IHZz28lmXROFH3m8",
  authDomain: "rentnest-dc0aa.firebaseapp.com",
  projectId: "rentnest-dc0aa",
  storageBucket: "rentnest-dc0aa.appspot.com",
  messagingSenderId: "1010442704707",
  appId: "1:1010442704707:web:0b4c019a53c0f1150281f6",

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-fuGCkBOKOJZm1De63u7wW7NYKiGgpNg",
  authDomain: "rent-41e2a.firebaseapp.com",
  projectId: "rent-41e2a",
  storageBucket: "rent-41e2a.appspot.com",
  messagingSenderId: "126196330827",
  appId: "1:126196330827:web:62567d2fa150593e3578ce",
};

// Initialize Firebase
// AIzaSyCfFE009jegcLsHf_-33TgJIszEVnjna40
//initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

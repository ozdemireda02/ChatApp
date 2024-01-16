// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth,GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBmGKQYw4oYo6nZnoQm2yyHBtoF-6fRMo",
  authDomain: "chat-61b6b.firebaseapp.com",
  projectId: "chat-61b6b",
  storageBucket: "chat-61b6b.appspot.com",
  messagingSenderId: "798127327096",
  appId: "1:798127327096:web:df1f22b8a7e93e61b8ea8d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// konsoldaki authenitcation bölümünün referansını alma
export const auth = getAuth(app);

// google sağlayıcının referansını alma
export const provider = new GoogleAuthProvider();

// veri tabanının referansını alır
export const db = getFirestore(app);
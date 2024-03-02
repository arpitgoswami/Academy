// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBl1ClScZmSLxKFiybmwMF9Qq7KLdiVqvg",
  authDomain: "reactfirebase-f43b8.firebaseapp.com",
  projectId: "reactfirebase-f43b8",
  storageBucket: "reactfirebase-f43b8.appspot.com",
  messagingSenderId: "1061604612002",
  appId: "1:1061604612002:web:517a0b03e18c17604cc4fb",
  measurementId: "G-Y74RT8HTXJ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const firestore = getFirestore(app);

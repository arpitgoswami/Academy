import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const firebaseConfig = {
  apiKey: "AIzaSyBl1ClScZmSLxKFiybmwMF9Qq7KLdiVqvg",
  authDomain: "reactfirebase-f43b8.firebaseapp.com",
  projectId: "reactfirebase-f43b8",
  storageBucket: "reactfirebase-f43b8.firebasestorage.app",
  messagingSenderId: "1061604612002",
  appId: "1:1061604612002:web:517a0b03e18c17604cc4fb",
  measurementId: "G-Y74RT8HTXJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return user;
};

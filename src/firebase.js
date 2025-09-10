import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc,setDoc,doc ,getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC4WWkBAMUmyUmPhNZ3c-9l-EoR-QwnAK0",
  authDomain: "swarnbhoomi-887d1.firebaseapp.com",
  projectId: "swarnbhoomi-887d1",
  storageBucket: "swarnbhoomi-887d1.firebasestorage.app",
  messagingSenderId: "139824189881",
  appId: "1:139824189881:web:d5e8a075bbd144e48e2668",
  measurementId: "G-QWF3PND3W2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); 
const messaging = getMessaging(app);

// Export Firestore
export { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, db, collection, addDoc,setDoc,doc ,getDocs,storage,messaging,};

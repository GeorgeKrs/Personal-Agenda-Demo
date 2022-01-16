// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRkQ8ugfOdD0c_I-KOyEu7QRBCPQ1kLYg",
  authDomain: "personal-agenda-demo.firebaseapp.com",
  projectId: "personal-agenda-demo",
  storageBucket: "personal-agenda-demo.appspot.com",
  messagingSenderId: "121035199097",
  appId: "1:121035199097:web:f9582ae884273d63b1baa8",
  measurementId: "G-9TWM9DFKT8",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

// import { getAnalytics } from "firebase/analytics";
// const analytics = getAnalytics(app);

export {
  auth,
  db,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
};

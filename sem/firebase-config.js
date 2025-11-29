// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, increment, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDr1e4s7T1tFckUcx-jlw56GTuZ1uU-Vbk",
    authDomain: "next-gen-browser.firebaseapp.com",
    projectId: "next-gen-browser",
    storageBucket: "next-gen-browser.firebasestorage.app",
    messagingSenderId: "865895937078",
    appId: "1:865895937078:web:e4ce1b695004a82a2fd497",
    measurementId: "G-ZCKZR0PG7C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, setDoc, getDoc, updateDoc, increment, serverTimestamp };

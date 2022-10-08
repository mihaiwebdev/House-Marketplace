import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmKiB2L6iycaa7EFkMzi-tc3x6kSyXssM",
    authDomain: "house-marketplace-70bae.firebaseapp.com",
    projectId: "house-marketplace-70bae",
    storageBucket: "house-marketplace-70bae.appspot.com",
    messagingSenderId: "33584461733",
    appId: "1:33584461733:web:4fc3c661db0f8ed00fda4c"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
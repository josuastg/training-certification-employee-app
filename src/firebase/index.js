// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore"; // If using Firestore
import { getAuth } from "firebase/auth"; // If using Authentication
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYR-DBuiY9xlfX6fVURF7J0PbsRffrTTY",
  authDomain: "certification-app-63e1b.firebaseapp.com",
  projectId: "certification-app-63e1b",
  storageBucket: "certification-app-63e1b.firebasestorage.app",
  messagingSenderId: "849583702648",
  appId: "1:849583702648:web:bf8123005125d32f83638d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp); // Firestore
export const auth = getAuth(firebaseApp); // Authentication

// if (window.location.hostname === "localhost") {
//   connectFirestoreEmulator(db, "localhost", 8080); // Port as defined in firebase.json
// }
export default firebaseApp;
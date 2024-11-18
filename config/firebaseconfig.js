// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import necessay services required from firebase
//Firebase Authentication
import { getAuth } from "firebase/auth";
//Firebase Firestore
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBap0CVEnByHbnnDvcHptmc1vaNU9V53Q8",
  authDomain: "jeff-project-4282e.firebaseapp.com",
  projectId: "jeff-project-4282e",
  storageBucket: "jeff-project-4282e.firebasestorage.app",
  messagingSenderId: "298376931690",
  appId: "1:298376931690:web:dfc9e9ccda5b56a0535d13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//instantiate and export firebase service
//create object of Authentication service and export it
export const auth = getAuth(app)
//create object of Firestore service and export it
export const db = getFirestore(app)
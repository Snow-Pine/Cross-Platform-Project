import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgSXTBt4_rxqMO3drnwg_s5BrTXMJr6g0",
  authDomain: "james-project-cef63.firebaseapp.com",
  projectId: "james-project-cef63",
  storageBucket: "james-project-cef63.firebasestorage.app",
  messagingSenderId: "702520683223",
  appId: "1:702520683223:web:707bc145e8cf782c7c5e92"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export const db = getFirestore(app);
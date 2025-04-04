// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBIy31A_RcxTbANTLA5VZxXEb81a3C93Ug",
  authDomain: "homecare-8ae6f.firebaseapp.com",
  projectId: "homecare-8ae6f",
  storageBucket: "homecare-8ae6f.firebasestorage.app",
  messagingSenderId: "115719520596",
  appId: "1:115719520596:web:9e9aa0df62ac80eb4e88c1",
  measurementId: "G-4D8CS960PT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
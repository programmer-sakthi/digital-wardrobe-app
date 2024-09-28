import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyB0fwX3mf4krTtw2O-Hajx6g4cOlDMV9FY",
  authDomain: "digital-wardrobe-app.firebaseapp.com",
  projectId: "digital-wardrobe-app",
  storageBucket: "digital-wardrobe-app.appspot.com",
  messagingSenderId: "54071732616",
  appId: "1:54071732616:web:5d00b20efb96e82a1e723d"
};


const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage=getStorage(app);
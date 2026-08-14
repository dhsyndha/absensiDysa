import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDk1YCoc3LMvCOUMi-HrQ3ozqzSUGMaXrA",
  authDomain: "absensidysa.firebaseapp.com",
  projectId: "absensidysa",
  storageBucket: "absensidysa.firebasestorage.app",
  messagingSenderId: "80152310099",
  appId: "1:80152310099:web:539af2bf4e8b145bcab1a6",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
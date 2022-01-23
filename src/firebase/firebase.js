import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

initializeApp(firebaseConfig);

const firebaseApp = {
  auth: getAuth(),
  db: getFirestore(),
  storage: getStorage(),
};

export default firebaseApp;

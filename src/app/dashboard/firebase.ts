// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB60_uu4hpDyxLRbjeIdvOqX4W5L1ZBNwQ",
  authDomain: "server-516aa.firebaseapp.com",
  projectId: "server-516aa",
  storageBucket: "server-516aa.firebasestorage.app",
  messagingSenderId: "139336209074",
  appId: "1:139336209074:web:e3878c4a8484cc3a5aafab",
  measurementId: "G-HNTF98YR86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL };
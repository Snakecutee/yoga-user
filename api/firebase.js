
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCzJWndP_u9IOTT1U74_o7pCGd6Ww9e_o8",
  authDomain: "yoga1-1f935.firebaseapp.com",
  databaseURL: "https://yoga1-1f935-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "yoga1-1f935",
  storageBucket: "yoga1-1f935.firebasestorage.app",
  messagingSenderId: "476088000982",
  appId: "1:476088000982:web:3042a3afb3fd19b3e24477",
  measurementId: "G-VMSHKR2MC3"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;

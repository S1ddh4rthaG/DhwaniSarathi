// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChEonLJtA9sQtEHP0e3WccWibbkfqFeCE",
  authDomain: "audiometer-d0f59.firebaseapp.com",
  projectId: "audiometer-d0f59",
  storageBucket: "audiometer-d0f59.appspot.com",
  messagingSenderId: "274459095253",
  appId: "1:274459095253:web:cbd756b80dad5466c9325c"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

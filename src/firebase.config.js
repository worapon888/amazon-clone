// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjPdYoFUbhSAvwU8lcDAjOi_BL2Jw_X1Y",
  authDomain: "fir-b0783.firebaseapp.com",
  projectId: "fir-b0783",
  storageBucket: "fir-b0783.appspot.com",
  messagingSenderId: "780281523748",
  appId: "1:780281523748:web:0d96cc39d6998ea18eb2b1",
  measurementId: "G-LPNHVFTD39",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;

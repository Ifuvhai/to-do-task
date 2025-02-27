import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK6mIuX7IjvpQsDSIeaAVfnshFe83JEe0",
  authDomain: "to-do-task-659d0.firebaseapp.com",
  projectId: "to-do-task-659d0",
  storageBucket: "to-do-task-659d0.firebasestorage.app",
  messagingSenderId: "101613397728",
  appId: "1:101613397728:web:00d9e46be23b4b10c55285"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
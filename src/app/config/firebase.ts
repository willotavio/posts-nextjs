// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyvirGrkxiNJGwM3lzm9Qxxw-3fVIPX0Y",
  authDomain: "fir-posts-759fa.firebaseapp.com",
  projectId: "fir-posts-759fa",
  storageBucket: "fir-posts-759fa.appspot.com",
  messagingSenderId: "459389321534",
  appId: "1:459389321534:web:dbce11054be08678632c6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
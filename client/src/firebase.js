// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// import.meta.env is because I'm using Vite and not create React app
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "the-foxy-blog.firebaseapp.com",
  projectId: "the-foxy-blog",
  storageBucket: "the-foxy-blog.appspot.com",
  messagingSenderId: "812029799826",
  appId: "1:812029799826:web:3cd36edb702ce45346254b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGmFn0cgzrIkITlhA27WsO5RxW0vsovII",
  authDomain: "connectedstreets-4234d.firebaseapp.com",
  projectId: "connectedstreets-4234d",
  storageBucket: "connectedstreets-4234d.appspot.com",
  messagingSenderId: "814421299891",
  appId: "1:814421299891:web:ed0a4b52f823651b4e56c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
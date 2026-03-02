import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeJ5ScLEqe_dUYxUKyhbgbweEKjbfZ328",
  authDomain: "studytrack-247d2.firebaseapp.com",
  projectId: "studytrack-247d2",
  storageBucket: "studytrack-247d2.firebasestorage.app",
  messagingSenderId: "666725501008",
  appId: "1:666725501008:web:19324211214bd7f0d9a955",
  measurementId: "G-SYSMVWG4PJ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
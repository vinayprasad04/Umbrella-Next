// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd8VNjAdbmIcrmxwTLpSGTu_EWhXPY69Q",
  authDomain: "umbrella-04.firebaseapp.com",
  projectId: "umbrella-04",
  storageBucket: "umbrella-04.firebasestorage.app",
  messagingSenderId: "478567464302",
  appId: "1:478567464302:web:08dad360240449abc5d57f",
  measurementId: "G-H7NMSPVNPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
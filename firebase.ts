import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCN5Pxuz-tbWeYeEPvzPy6hAy68ArK6qWI",
  authDomain: "deepaks-mind-10920641-ed594.firebaseapp.com",
  projectId: "deepaks-mind-10920641-ed594",
  storageBucket: "deepaks-mind-10920641-ed594.firebasestorage.app",
  messagingSenderId: "535820398365",
  appId: "1:535820398365:web:14939fcfe3196c5fecfbf4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

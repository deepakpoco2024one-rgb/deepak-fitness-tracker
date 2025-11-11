// FIX: Import firebase to initialize the app and access firebase services.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// IMPORTANT: Replace this with the firebaseConfig object from your Firebase project
const firebaseConfig = {
  apiKey: "AIzaSyCN5Pxuz-tbWeYeEPvzPy6hAy68ArK6qWI",
  authDomain: "deepaks-mind-10920641-ed594.firebaseapp.com",
  projectId: "deepaks-mind-10920641-ed594",
  storageBucket: "deepaks-mind-10920641-ed594.appspot.com",
  messagingSenderId: "535820398365",
  appId: "1:535820398365:web:14939fcfe3196c5fecfbf4"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKn5emoEERzcImK4u8HlYhxWge7tl2Ioo",
  authDomain: "zaio-urbanthreads.firebaseapp.com",
  projectId: "zaio-urbanthreads",
  storageBucket: "zaio-urbanthreads.firebasestorage.app",
  messagingSenderId: "978829573787",
  appId: "1:978829573787:web:5606ac18e7bbb8033c503e",
  measurementId: "G-SLC74F38MC"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();


const auth = firebase.auth();


export { db, auth };
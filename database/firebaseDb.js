import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAIHfBMCvO9v5pSEYkugEDEk9ElvsrvIu8",
    authDomain: "react-native-crud-26cf5.firebaseapp.com",
    projectId: "react-native-crud-26cf5",
    storageBucket: "react-native-crud-26cf5.appspot.com",
    messagingSenderId: "495660244334",
    appId: "1:495660244334:web:47d4b0a7442af3b17e357f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBuV43eZsDBtNCqfEx7JrmoKipJYThgx-Q",
    authDomain: "where-s-waldo-3992c.firebaseapp.com",
    projectId: "where-s-waldo-3992c",
    storageBucket: "where-s-waldo-3992c.appspot.com",
    messagingSenderId: "395870669146",
    appId: "1:395870669146:web:07f6e0b3a7eb41794f0b63"
};

initializeApp(firebaseConfig);

export const db = getFirestore();
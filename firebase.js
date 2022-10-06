import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB-D0tca67BjtPAby8JXlre7V_AHkNFn2Y",
    authDomain: "todoapp-502c1.firebaseapp.com",
    projectId: "todoapp-502c1",
    storageBucket: "todoapp-502c1.appspot.com",
    messagingSenderId: "464254547874",
    appId: "1:464254547874:web:a9486bcaa46bcd9549e4fb",
    measurementId: "G-D1J0L7R4ZW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
// const db = getFirestore();



export {
    auth,
    // db
}
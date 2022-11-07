import { initializeApp, getApp, getApps } from 'firebase/app';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
import {getFirestore} from "firebase/firestore";
//import {...} from "firebase/functions";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyB4r1O8YqrrKshrwXdx4dZw3ATrLZULQNE",
    authDomain: "foodeats-d6eda.firebaseapp.com",
    projectId: "foodeats-d6eda",
    storageBucket: "foodeats-d6eda.appspot.com",
    messagingSenderId: "443713955986",
    appId: "1:443713955986:web:256220cfd44c372d375e4b",
    measurementId: "G-VVYBHJT07Q"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { app, db, storage, firestore };
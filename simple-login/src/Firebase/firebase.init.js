import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const initializeFirebaseAuthentication = () => {
    initializeApp( firebaseConfig );
}

export default initializeFirebaseAuthentication;
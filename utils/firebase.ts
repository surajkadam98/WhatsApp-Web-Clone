import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "./firebase.config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Nueva importación para Auth

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBtfG2WCoqNLEEeQO16YBp3cIEL7QslTig",
  authDomain: "luxurylamps-20e2b.firebaseapp.com",
  projectId: "luxurylamps-20e2b",
  storageBucket: "luxurylamps-20e2b.firebasestorage.app",
  messagingSenderId: "78080453549",
  appId: "1:78080453549:web:579943ee7ce6683ea8cf24",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); // Exporta auth para usar en el contexto

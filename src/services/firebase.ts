import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "feit-code.firebaseapp.com",
  projectId: "feit-code",
  storageBucket: "feit-code.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
});

export const fbStorage = getStorage(app);

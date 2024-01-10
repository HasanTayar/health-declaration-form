import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId:import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);
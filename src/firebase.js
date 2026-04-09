import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD-Ola-LmUx_xj1m0S1iq-zir26PWkMfNU",
  authDomain: "fridfn-pwa-notif.firebaseapp.com",
  databaseURL: "https://fridfn-pwa-notif-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fridfn-pwa-notif",
  storageBucket: "fridfn-pwa-notif.firebasestorage.app",
  messagingSenderId: "352121530034",
  appId: "1:352121530034:web:c551dc00a61c338ff98bab"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);
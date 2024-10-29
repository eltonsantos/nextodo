import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_APP_API_KEY,
  authDomain: "nextodo-885e6.firebaseapp.com",
  projectId: "nextodo-885e6",
  storageBucket: "nextodo-885e6.appspot.com",
  messagingSenderId: process.env.NEXT_APP_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
export const realTimeDatabase = getDatabase(app);
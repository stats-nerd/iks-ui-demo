// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// export const firebaseConfig = {
//   apiKey: "AIzaSyA8YcKfeOIKUr7k4Uv-XXGBmtsQ8gcA2hA",
//   authDomain: "exploringfirebase-34554.firebaseapp.com",
//   projectId: "exploringfirebase-34554",
//   storageBucket: "exploringfirebase-34554.appspot.com",
//   messagingSenderId: "992680271235",
//   appId: "1:992680271235:web:0452050d292d8ea4cd2ab6",
//   measurementId: "G-LBH00PK9X3",
// };

// Yuvraj's config
const firebaseConfig = {
  apiKey: "AIzaSyDUQkgpELYKVm1Z8L1JQGaMg4G1f6-8X9k",
  authDomain: "auth-64c48.firebaseapp.com",
  projectId: "auth-64c48",
  storageBucket: "auth-64c48.appspot.com",
  messagingSenderId: "762804617990",
  appId: "1:762804617990:web:b3557b95a3f15ab25ed487",
  measurementId: "G-EZ9517MTT5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

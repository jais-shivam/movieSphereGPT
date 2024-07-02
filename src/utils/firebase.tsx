// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6qva_HdbIyV_9PDMu0Tvl9nTjMCFLyYI",
  authDomain: "movie-sphere-gpt.firebaseapp.com",
  projectId: "movie-sphere-gpt",
  storageBucket: "movie-sphere-gpt.appspot.com",
  messagingSenderId: "445122147441",
  appId: "1:445122147441:web:6aa0b4c5a6e8ac3216d7d0",
  measurementId: "G-D0J0HSQSV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);
export const auth = getAuth();
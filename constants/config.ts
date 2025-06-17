// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyA0Veo1OHdkAsbepAG98lqcNKHAE4FmML4",
    authDomain: "tasty-spoonacular.firebaseapp.com",
    projectId: "tasty-spoonacular",
    storageBucket: "tasty-spoonacular.firebasestorage.app",
    messagingSenderId: "823077366672",
    appId: "1:823077366672:web:6a822980a91281f1602115"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import Config from "react-native-config";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: Config.ENV_FIREBASE_API_KEY,
    // TODO: use evn variable for this api
    authDomain: "ss2024-5303e.firebaseapp.com",
    projectId: "ss2024-5303e",
    storageBucket: "ss2024-5303e.appspot.com",
    messagingSenderId: "197524388996",
    appId: "1:197524388996:web:1d06dbb48ae36b8ad216d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// FIXME: getAnalytics is not a function
// const analytics = getAnalytics(app).isSupported();
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

AppRegistry.registerComponent(appName, () => App);

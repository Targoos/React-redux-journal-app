import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDECBucnnNXNg9bDawPP6OYhZhKO_rX5Ks",
  authDomain: "react-app-tulio.firebaseapp.com",
  databaseURL: "https://react-app-tulio.firebaseio.com",
  projectId: "react-app-tulio",
  storageBucket: "react-app-tulio.appspot.com",
  messagingSenderId: "550675795848",
  appId: "1:550675795848:web:0ac8f448096dd7c6f1f43d",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
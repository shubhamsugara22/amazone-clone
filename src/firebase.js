// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBXIfx_8sfxNh7J9JtdDpFaLvY5Ju-Hc9A",
    authDomain: "clone-dbfc5.firebaseapp.com",
    projectId: "clone-dbfc5",
    storageBucket: "clone-dbfc5.appspot.com",
    messagingSenderId: "1022223900813",
    appId: "1:1022223900813:web:71b2dfb77a0a2f14b102c4",
    measurementId: "G-MM3SGXTLDG"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  export {db , auth};
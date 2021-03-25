import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZ2wZeFG9_ed39NXDklWp7cjURsqQ5gUU",
  authDomain: "whatsup-clone-9a4d4.firebaseapp.com",
  projectId: "whatsup-clone-9a4d4",
  storageBucket: "whatsup-clone-9a4d4.appspot.com",
  messagingSenderId: "939001698296",
  appId: "1:939001698296:web:f3b84ce5835a2fad70e80d",
  measurementId: "G-K90MMNQ4WW"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = db.app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };

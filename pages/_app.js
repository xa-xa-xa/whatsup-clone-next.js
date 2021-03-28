import { useEffect } from "react";
import "../styles/globals.css";
import { db, auth } from "../firebase";
import Login from "./login";
import Loading from "../components/Loading";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.id).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }
  if (!user && !loading) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;

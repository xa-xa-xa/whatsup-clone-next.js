import { useEffect, useState } from "react";
import "../styles/globals.css";
import { db, auth } from "../firebase";
import Login from "./login";
import Loading from "../components/Loading";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Store from "../store/reactStore";

function MyApp({ Component, pageProps }) {
  const [loaded, setLoaded] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  useEffect(async () => {
    setLoaded(true);
    if (user) {
      await db.collection("users").doc(user.id).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL
        },
        { merge: true }
      );
    }
    if (!loading) setLoaded(false);

  }, [user, loading]);

  if (loaded) {
    return <Loading />;
  }
  if (!user) return <Login />;

  return (
    <Store>
      <Component {...pageProps} />
    </Store>
  );
}

export default MyApp;

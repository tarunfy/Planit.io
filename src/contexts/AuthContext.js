import { createContext, useState, useEffect } from "react";
import nProgress from "nprogress";
import { auth, db, storage } from "../utils/dbConfig";
import firebase from "firebase";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [fetchingUser, setFetchingUser] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const res = await db.collection("users").doc(user.uid).get();
        if (!res.exists) {
          await db.collection("users").doc(user.uid).set({
            userId: user.uid,
            name: user.displayName,
            profilePhoto: user.photoURL,
            email: user.email,
          });
        }
        setCurrentUser({
          userId: user.uid,
          name: user.displayName,
          profilePhoto: user.photoURL,
          email: user.email,
        });
      } else {
        setCurrentUser(null);
      }
      setFetchingUser(false);
    });
  }, []);

  const googleAuth = async () => {
    setIsLoading(true);
    nProgress.start();
    let provider = new firebase.auth.GoogleAuthProvider();

    try {
      await auth.signInWithPopup(provider);
    } catch (err) {
      setAuthError(err.message);
    }

    nProgress.done();
    setIsLoading(false);
  };

  const logout = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        googleAuth,
        isLoading,
        currentUser,
        authError,
        logout,
      }}
    >
      {!fetchingUser && children}
    </AuthContext.Provider>
  );
};

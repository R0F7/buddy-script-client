import { auth } from "../firebase/firebase.config";
import { AuthContext } from "../context/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import useAxiosCommon from "../hooks/useAxiosCommon";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState({ open: false, id: null });
  const axiosCommon = useAxiosCommon();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //sign in with google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const sendPassMail = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      //cookies
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        await axiosCommon.post("/jwt", userInfo);
        setUser(currentUser);
      } else {
        await axiosCommon.post("/logout");
        setUser(null);
      }

      setLoading(false);
    });

    return () => unSubscribe();
  }, [axiosCommon]);

  const authInfo = {
    loading,
    // authReady,
    setLoading,
    user,
    createUser,
    signInWithGoogle,
    sendPassMail,
    signIn,
    updateUserProfile,
    logOut,
    open,
    setOpen,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

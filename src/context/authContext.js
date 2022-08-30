import React, { createContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../firebaseConfig";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const _auth = () => {
    onAuthStateChanged(auth, (user) => (user ? true : false));
  };

  const [getAuth, setAuth] = useState(_auth === null);
  const [data, setData] = useState([]);

  const initialValue = {
    getAuth,
    activeAuth: () => setAuth(true),
    removeAuth: () => setAuth(false),
    data,
    setData,
  };

  return (
    <AuthContext.Provider value={initialValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };

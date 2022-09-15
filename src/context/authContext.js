import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  let user;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const user = localStorage.getItem("user");
  }
  const _auth = () => {
    user ? true : false;
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

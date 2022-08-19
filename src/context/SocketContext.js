import React, { createContext } from "react";
import socketIO from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = socketIO.connect("http://localhost:4000");

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

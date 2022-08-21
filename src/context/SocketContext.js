import React, { createContext } from "react";
import socketIO from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = socketIO.connect(process.env.NEXT_PUBLIC_SERVER);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

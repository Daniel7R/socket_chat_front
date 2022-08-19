import React, { useContext } from "react";

import { SocketContext } from "../context/SocketContext";
import { Home } from "../components";

export default function main() {
  const socket = useContext(SocketContext);

  return <Home socket={socket} />;
}

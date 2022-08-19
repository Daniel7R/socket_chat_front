import React, { useContext, useEffect, useRef, useState } from "react";

import { SocketContext } from "../context/SocketContext";
import { Chatbar } from "./Chatbar";
import { ChatBody } from "./Chatbody";
import { Chatfooter } from "./Chatfooter";
import Styles from "../styles/Chat.module.css";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");

  const lastMessageRef = useRef(null);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("typingResponse"), (data) => setTypingStatus(data);
  }, [socket]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  return (
    <div className={Styles.chat}>
      <Chatbar Styles={Styles} socket={socket} />
      <div className={Styles.chat__main}>
        <ChatBody
          Styles={Styles}
          lastMessageRef={lastMessageRef}
          messages={messages}
          typingStatus={typingStatus}
        />
        <Chatfooter Styles={Styles} socket={socket} />
      </div>
    </div>
  );
};

export { ChatComponent };

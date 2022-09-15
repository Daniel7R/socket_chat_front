import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

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
    try {
      socket.on("typingResponse"), (data) => setTypingStatus(data);
    } catch (err) {
      console.log(err);
    }
  }, [socket]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    try {
      socket.on("messageResponse", (data) => setMessages([...messages, data]));
    } catch (err) {
      console.log(err);
    }
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

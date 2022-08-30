import React, { useContext } from "react";
import { useRouter } from "next/router";

import { AuthContext } from "../context/authContext";
import { auth } from "../../firebaseConfig";

const ChatBody = (props) => {
  const { messages, lastMessageRef, typingStatus, Styles } = props;

  const { removeAuth } = useContext(AuthContext);

  const router = useRouter();

  const handleLeaveChat = () => {
    removeAuth();
    router.push("/");
  };

  return (
    <>
      <header className={Styles.chat__mainHeader}>
        <p>Chat with Colleagues</p>
        <button className={Styles.leaveChat__btn} onClick={handleLeaveChat}>
          Leave Channel
        </button>
      </header>
      <div className={Styles.message__container}>
        {messages.map((message) => {
          return message?.name === auth.currentUser.email ? (
            <div className={Styles.message__chats} key={message?.id}>
              <p className={Styles.sender__name}>You</p>
              <div className={Styles.message__sender}>
                <p style={{ color: "black" }}>{message?.text}</p>
              </div>
            </div>
          ) : (
            <div className={Styles.message__chats} key={message?.id}>
              <p style={{ color: "lightgray" }}>{message?.name}</p>
              <div className={Styles.message__recipient}>
                <p style={{ color: "black" }}>{message?.text}</p>
              </div>
            </div>
          );
        })}
        <div className={Styles.message__status}>
          {typingStatus !== "" && <p>{typingStatus}</p>}
        </div>
        <div ref={lastMessageRef}></div>
      </div>
    </>
  );
};

export { ChatBody };

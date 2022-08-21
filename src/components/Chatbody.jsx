import React from "react";
import { useRouter } from "next/router";

const ChatBody = (props) => {
  const { messages, lastMessageRef, typingStatus, Styles } = props;

  const router = useRouter();

  const handleLeaveChat = () => {
    localStorage.removeItem("username");
    router.push("/");
  };

  return (
    <>
      <header className={Styles.chat__mainHeader}>
        <p>Chat with Colleagues</p>
        <button className={Styles.leaveChat__btn} onClick={handleLeaveChat}>
          LEAVE CHANNEL
        </button>
      </header>
      <div className={Styles.message__container}>
        {messages.map((message) => {
          return message?.name === localStorage.getItem("username") ? (
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

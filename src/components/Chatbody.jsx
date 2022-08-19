import React from "react";
import { useRouter } from "next/router";

const ChatBody = (props) => {
  const { messages, lastMessageRef, typingStatus, Styles } = props;

  const router = useRouter();

  const handleLeaveChat = () => {
    localStorage.removeItem("username");
    router.push("/");
    window.location.reload();
  };

  console.log("M", messages);

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
          message?.name === localStorage.getItem("username") && (
            <div className={Styles.message__chats} key={message?.id}>
              <p className={Styles.sender__name}>You</p>
              <div className={Styles.message__sender}>
                <p>{message?.text}</p>
              </div>
            </div>
          );
        })}
        <div className={Styles.message__status}>
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef}></div>
      </div>
    </>
  );
};

export { ChatBody };

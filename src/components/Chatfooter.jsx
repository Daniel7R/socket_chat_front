import React, { useState } from "react";
// import { UserInfo } from "firebase/auth";

// import { auth } from "../../firebaseConfig";

const Chatfooter = (props) => {
  const { socket, Styles } = props;

  const [message, setMessage] = useState("");

  const handleTyping = () => {
    socket.emit("typing", `${localStorage.getItem("username")} is typing...`);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim() && auth.currentUser) {
      try {
        socket.emit("message", {
          text: message,
          // name: auth.currentUser.email,
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
        });
      } catch (er) {
        console.log(err);
      }
    }
    setMessage("");
  };

  return (
    <div className={Styles.chat__footer}>
      <form className={Styles.form} onSubmit={handleSendMessage}>
        <input
          type={"text"}
          placeholder={"Enter message"}
          className={Styles.message}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className={Styles.sendBtn}>Sent</button>
      </form>
    </div>
  );
};

export { Chatfooter };

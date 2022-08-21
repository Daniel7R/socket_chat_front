import React, { useState, useContext } from "react";
import { useRouter } from "next/router";

import { SocketContext } from "context/SocketContext";
import Styles from "../styles/Home.module.css";

const Home = () => {
  const socket = useContext(SocketContext);

  const router = useRouter();

  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    try {
      socket.emit("newUser", { username, socketID: socket.id });
    } catch (err) {
      console.log(err);
    }
    router.push("/chat");
  };

  return (
    <form className={Styles.homeContainer} onSubmit={handleSubmit}>
      <h2 className={Styles.homeHeader}>Sign in to open the challenge chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className={Styles.usernameInput}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className={Styles.btn}>Sign in</button>
    </form>
  );
};

export { Home };

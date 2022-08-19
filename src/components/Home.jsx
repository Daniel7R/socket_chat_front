import React, { useState } from "react";
import { useRouter } from "next/router";

import Styles from "../styles/Home.module.css";

const Home = (props) => {
  const { socket } = props;

  const router = useRouter();

  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    socket.emit("newUser", { username, socketID: socket.id });
    router.push("/chat");
  };

  return (
    <form className={Styles.homeContainer} onSubmit={handleSubmit}>
      <h2 className={Styles.homeHeader}>Sign in to Open the challenge chat</h2>
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

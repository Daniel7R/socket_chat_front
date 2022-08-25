import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Cats from "../assets/images/cats-keyboard.gif";
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <Image src={Cats} width={300} height={300} />
      <form className={Styles.homeContainer} onSubmit={handleSubmit}>
        <h2 className={Styles.homeHeader}>
          Sign in to open the challenge chat
        </h2>
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
    </div>
  );
};

export { Home };

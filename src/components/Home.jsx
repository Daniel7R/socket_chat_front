import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

import { AuthContext } from "../context/authContext";
import { auth } from "../../firebaseConfig";
import Cats from "../assets/images/cats-keyboard.gif";
import { SocketContext } from "context/SocketContext";
import Styles from "../styles/Home.module.css";

const Home = () => {
  const { activeAuth } = useContext(AuthContext);

  const socket = useContext(SocketContext);

  const router = useRouter();

  //registro
  const [usernameR, setUsernameR] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [errorR, setErrorR] = useState("");
  //login
  const [usernameL, setUsernameL] = useState("");
  const [passwordL, setPasswordL] = useState("");
  const [errorL, setErrorL] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, usernameR, passwordR)
      .then(() => {
        socket.emit("newUser", {
          username: usernameR,
          socketID: socket.id,
        });
        router.push("/chat");
      })
      .then(() => activeAuth())
      .catch((e) => {
        if (e.code === "auth/invalid-email") {
          setErrorR("This email is invalid 😿");
        }
        if (e.code === "auth/weak-password") {
          setErrorR("The password must have at least 6 characters 😿");
        }
        if (e.code === "auth/email-already-in-use") {
          setErrorR("This email is already in use 😿");
        }
      });
  };
  const handleSignIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, usernameL, passwordL)
      .then(() => {
        socket.emit("newUser", {
          username: usernameL,
          socketID: socket.id,
        });
        router.push("/chat");
      })
      .then(() => activeAuth())
      .catch((e) => {
        if (e.code === "auth/user-not-found") {
          setErrorL("User not found 😿");
        }
        if (e.code === "auth/weak-password") {
          setErrorL("Wrong password 😿");
        }
        if (e.code === "auth/invalid-email") {
          setErrorL("This email is invalid 😿");
        }
      });
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
      <Image src={Cats} width={300} height={300} alt="cats" />
      <h1
        style={{
          paddingTop: "20px",
          paddingBottom: "40px",
          fontWeight: "bold",
          fontSize: "30px",
        }}
      >
        Challenge Chat
      </h1>
      <Accordion>
        <AccordionItem>
          <h2>
            <AccordionButton justifyContent={"space-between"} width={400}>
              <Box flex={1} textAlign="left">
                Register
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <form
                style={{ border: "4px inset #70c1ff", padding: "20px 20px" }}
                className={Styles.homeContainer}
                onSubmit={handleSignUp}
              >
                <h2 className={Styles.homeHeader}>
                  Sign up to open the challenge chat
                </h2>
                <label htmlFor="username">Email</label>
                <input
                  type="text"
                  minLength={6}
                  name="username"
                  id="username"
                  className={`${Styles.usernameInput}`}
                  value={usernameR}
                  onChange={(e) => setUsernameR(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  minLength={6}
                  name="password"
                  id="password"
                  className={Styles.usernameInput}
                  value={passwordR}
                  onChange={(e) => setPasswordR(e.target.value)}
                />
                <button className={Styles.btn}>Sign Up</button>
                {errorR !== "" && <small color="#ff3838">{errorR}</small>}
              </form>
            </AccordionPanel>
          </h2>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                Login
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <form
                style={{ border: "4px outset #70c1ff", padding: "20px 20px" }}
                className={Styles.homeContainer}
                onSubmit={handleSignIn}
              >
                <h2
                  className={Styles.homeHeader}
                  style={{ fontWeight: "bold" }}
                >
                  Sign in to open the challenge chat
                </h2>
                <label htmlFor="usernameL">Email</label>
                <input
                  type="text"
                  minLength={6}
                  name="usernameL"
                  id="usernameL"
                  className={Styles.usernameInput}
                  value={usernameL}
                  onChange={(e) => setUsernameL(e.target.value)}
                />
                <label htmlFor="passwordL">Password</label>
                <input
                  type="password"
                  minLength={6}
                  name="passwordL"
                  id="passwordL"
                  className={Styles.usernameInput}
                  value={passwordL}
                  onChange={(e) => setPasswordL(e.target.value)}
                />
                <button className={Styles.btn}>Sign In</button>
                {errorL !== "" && <small color="#ff3838">{errorL}</small>}
              </form>
            </AccordionPanel>
          </h2>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export { Home };

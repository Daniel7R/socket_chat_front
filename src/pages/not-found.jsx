import Link from "next/link";
import React from "react";

import { Seo } from "components";
import Styles from "../styles/notFound.module.css";

const notFound = () => {
  return (
    <>
      <Seo title={"Not Found User"} />
      <div
        style={{
          margin: "0 auto",
          maxWidth: "400px",
          height: "500px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          color: "unset",
          boxShadow: " 0 0 20px #fff",
          border: "1px solid #fff",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            textAlign: "center",
          }}
        >
          You are not registered 😿
        </h1>

        <h3>You must sign in or create a new account </h3>
        <Link href={"/"}>
          <a className={Styles.linkNotRegistered}>Go home</a>
        </Link>
      </div>
    </>
  );
};

export default notFound;

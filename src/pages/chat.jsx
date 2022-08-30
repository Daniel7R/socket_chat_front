import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { AuthContext } from "../context/authContext";
import { Seo } from "../components";
import { ChatComponent } from "../components/ChatComponent";

const Chat = () => {
  const { getAuth } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    getAuth === false && router.push("/not-found");
  }, []);
  return (
    <>
      <Seo title={"Chat"} />
      <ChatComponent />;
    </>
  );
};

export default Chat;

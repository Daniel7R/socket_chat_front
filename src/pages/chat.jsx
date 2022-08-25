import React from "react";

import { Seo } from "../components";
import { ChatComponent } from "../components/ChatComponent";

const chat = () => {
  return (
    <>
      <Seo title={"Chat"} />
      <ChatComponent />;
    </>
  );
};

export default chat;

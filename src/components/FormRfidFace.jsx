import React from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  Input,
} from "@chakra-ui/react";
import { TbFaceId } from "react-icons/tb";
import { AiOutlineIdcard } from "react-icons/ai";

export const FormRfidFace = (props) => {
  const {
    activeAuth,
    socket,
    router,
    errorL,
    setErrorL,
    errorF,
    setErrorF,
    rfId,
    setRfId,
  } = props;
  const handleLoginWithRfid = (e) => {
    e.preventDefault();

    fetch(`${process.env.NEXT_PUBLIC_FLASK_SERVER}login-with-rfid?rfid=${rfId}`)
      .then((r) => r.json())
      .then((r) => {
        activeAuth();
        socket.emit("newUser", {
          username: r?.data,
          socketID: socket?.id,
        });
        localStorage.setItem("user", nombre);

        r?.status === "ok" ? router.push("/chat") : setErrorL(r?.status);
      });
  };

  const handleLoginWithFace = (e) => {
    e.preventDefault();

    fetch(`${process.env.NEXT_PUBLIC_FLASK_SERVER}login-with-face`)
      .then((r) => r.json())
      .then((r) => {
        console.log("r", r?.data);
        activeAuth();
        socket.emit("newUser", {
          username: r?.data,
          socketID: socket?.id,
        });
        localStorage.setItem("user", nombre);

        r?.status === "ok" ? router.push("/chat") : console.log(r);
      })
      .catch((r) => {
        setErrorF(r?.status);
      });
  };
  return (
    <Tabs width={"100%"}>
      <TabList width={"100%"}>
        <Tab textAlign={"left"} width={"50%"}>
          <TbFaceId size={30} /> Face recognition
        </Tab>
        <Tab textAlign={"right"} width={"50%"}>
          <AiOutlineIdcard size={30} /> RFID
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel textAlign={"center"} height="60">
          <Button
            width={"40"}
            height="40"
            flex={1}
            flexDirection="column"
            pb="3"
            onClick={handleLoginWithFace}
          >
            <TbFaceId size={140} />
            Request Face access
          </Button>
          {errorF !== "" && <small color="#ff3838">{errorF}</small>}
        </TabPanel>
        <TabPanel textAlign={"center"} height="60">
          <form onSubmit={handleLoginWithRfid} style={{ margin: "0 auto" }}>
            <Input
              type={"password"}
              placeholder="Here will be your RFid"
              value={rfId}
              onChange={(e) => setRfId(e.target.value)}
              onCopy={false}
            />
            <Button mt={4}>
              <AiOutlineIdcard size={30} />
              Sign in with RFid
            </Button>
            {errorL !== "" && <small color="#ff3838">{errorL}</small>}
          </form>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

import React from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { TbFaceId } from "react-icons/tb";
import { AiOutlineIdcard } from "react-icons/ai";

import { ModalLogin } from "./ModalLogin";

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
    text,
    faceText,
    user,
    setUser,
    header,
    actionRfid,
    actionFace,
    isOpen,
    onClose,
  } = props;

  return (
    <>
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
              onClick={actionFace}
              _hover={{
                color: "#57b3ed",
                backgroundColor: "#fefefe",
              }}
              style={{
                transition: "1s all ease",
              }}
            >
              <TbFaceId size={140} />
              {faceText}
            </Button>
            {errorF !== "" && <small color="#ff3838">{errorF}</small>}
          </TabPanel>
          <TabPanel textAlign={"center"} height="60">
            <form onSubmit={actionRfid} style={{ margin: "0 auto" }}>
              <Input
                type={"password"}
                placeholder="Here will be your RFid"
                value={rfId}
                onChange={(e) => setRfId(e.target.value)}
                onCopy={false}
              />
              <Button
                mt={4}
                backgroundColor="#57b3ed"
                style={{
                  transition: "1s all ease",
                }}
              >
                <AiOutlineIdcard size={30} />
                {text}
              </Button>
              {errorL !== "" && <small color="#ff3838">{errorL}</small>}
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ModalLogin
        header={header}
        user={user}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

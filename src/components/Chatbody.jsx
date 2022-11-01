import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { useRouter } from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { AuthContext } from "../context/authContext";
import { SocketContext } from "context/SocketContext";
import { FormRfidFace } from "./FormRfidFace";

const ChatBody = (props) => {
  const { messages, lastMessageRef, typingStatus, Styles, setTypingStatus } =
    props;

  useEffect(() => {
    setTimeout(() => {
      setTypingStatus("");
    }, 2000);
  }, [typingStatus]);

  //Webcam
  const [image, setImage] = useState("");

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const socket = useContext(SocketContext);

  const { removeAuth } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [disabled, setDisabled] = useState(true);
  const [errorF, setErrorF] = useState(false);
  const [rfId, setRfId] = useState("");
  //login
  const [errorL, setErrorL] = useState("");

  const router = useRouter();

  let cUser;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    cUser = localStorage.getItem("user");
  }

  const handleLeaveChatFace = async () => {
    image !== "" &&
      (await fetch(`${process.env.NEXT_PUBLIC_FLASK_SERVER}logout-with-face`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ imagen: image }),
      })
        .then((r) => r.json())
        .then((r) => r?.status === "ok" && setDisabled(!disabled)));
  };
  const handleLeaveChatRfId = (e) => {
    // e.preventDefault();
    capture();
    fetch(`${process.env.NEXT_PUBLIC_FLASK_SERVER}logout-with-rfid`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ rfId: rfId }),
    })
      .then((r) => r.json())
      .then((r) => r?.status === "ok" && setDisabled(!disabled));
  };

  const confirmLeaving = () => {
    localStorage.removeItem("user");
    removeAuth();
    router.push("/");
  };
  return (
    <>
      <header className={Styles.chat__mainHeader}>
        <p style={{ color: "#3b3b3b", fontWeight: "bold" }}>
          Chat with Colleagues
        </p>
        <Button
          _hover={{ opacity: "0.5" }}
          bg="#ff3838"
          className={Styles.leaveChat__btn}
          onClick={onOpen}
        >
          Leave Channel
        </Button>
        <Modalcito
          isOpen={isOpen}
          onClose={onClose}
          disabled={disabled}
          handleLeaveChatFace={handleLeaveChatFace}
          handleLeaveChatRfId={handleLeaveChatRfId}
          confirm={confirmLeaving}
          socket={socket}
          setErrorL={setErrorL}
          setErrorF={setErrorF}
          errorL={errorL}
          errorF={errorF}
          rfId={rfId}
          setRfId={setRfId}
          router={router}
          capture={capture}
          webcamRef={webcamRef}
        ></Modalcito>
      </header>
      <div className={Styles.message__container}>
        {messages.map((message) => {
          return message?.name === cUser ? (
            <div className={Styles.message__chats} key={message?.id}>
              <p className={Styles.sender__name}>You</p>
              <div className={Styles.message__sender}>
                <p style={{ color: "black" }}>{message?.text}</p>
              </div>
            </div>
          ) : (
            <div className={Styles.message__chats} key={message?.id}>
              <p style={{ color: "lightgray" }}>{message?.name}</p>
              <div className={Styles.message__recipient}>
                <p style={{ color: "black" }}>{message?.text}</p>
              </div>
            </div>
          );
        })}
        <div className={Styles.message__status} style={{ marginTop: "-20px" }}>
          {typingStatus !== "" && (
            <p style={{ marginTop: "-80px", color: "#e78888" }}>
              {typingStatus}
            </p>
          )}
        </div>
        <div ref={lastMessageRef}></div>
      </div>
    </>
  );
};

const Modalcito = ({
  isOpen,
  onClose,
  disabled,
  confirm,
  handleLeaveChatFace,
  handleLeaveChatRfId,
  socket,
  errorL,
  errorF,
  setErrorL,
  setErrorF,
  rfId,
  setRfId,
  router,
  capture,
  webcamRef,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Closing the App</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormRfidFace
          socket={socket}
          errorL={errorL}
          setErrorL={setErrorL}
          errorF={errorF}
          setErrorF={setErrorF}
          rfId={rfId}
          setRfId={setRfId}
          router={router}
          text={"Log out"}
          faceText={"Logout with face"}
          capture={capture}
          webcamRef={webcamRef}
          actionRfid={handleLeaveChatRfId}
          actionFace={handleLeaveChatFace}
        />
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>
        <Button
          _hover={{
            opacity: "0.6",
          }}
          disabled={disabled}
          bg={"#f15757"}
          color="blackAlpha.900"
          onClick={confirm}
        >
          Confirmar
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export { ChatBody };

import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const ModalLogin = ({ user, header, isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{header === "Error" ? user : `Hi ${user}`}</p>
          </ModalBody>
          <ModalFooter>
            <Button background={"#f15757"} mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { ModalLogin };

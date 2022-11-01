import React, {
  useState,
  useContext,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { TbFaceId } from "react-icons/tb";
import { AiOutlineIdcard } from "react-icons/ai";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

import { AuthContext } from "../context/authContext";

import Cats from "../assets/images/cats-keyboard.gif";
import { SocketContext } from "context/SocketContext";
import Styles from "../styles/Home.module.css";
import { FormRfidFace } from "./FormRfidFace";
import { WebcamCapture } from "./WebcamCapture";

const Home = () => {
  const { activeAuth } = useContext(AuthContext);

  const socket = useContext(SocketContext);

  const router = useRouter();

  //All for webcam functionality
  const [image, setImage] = useState("");

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const [image2, setImage2] = useState("");

  const webcamRef2 = useRef(null);

  const capture2 = useCallback(() => {
    const imageSrc2 = webcamRef2.current.getScreenshot();
    setImage2(imageSrc2);
  }, [webcamRef2]);

  //Web cam ends here

  //registro
  const [fieldsRegister, setFieldsRegister] = useState({
    id: "",
    nombre: "",
    edad: "",
    genero: "",
    estrato: "",
    departamento: "",
    rfId: "",
    imagen: "",
  });
  // const [id, setId] = useState("");
  // const [nombre, setNombre] = useState("");
  // const [edad, setEdad] = useState("");
  // const [genero, setGenero] = useState("");
  // const [estrato, setEstrato] = useState("");
  // const [departamento, setDepartamento] = useState("");
  const [rfId, setRfId] = useState("");
  const [errorR, setErrorR] = useState(false);
  const [errorF, setErrorF] = useState(false);
  //login
  const [errorL, setErrorL] = useState("");

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [user, setUser] = useState("");
  const [header, setHeader] = useState("");

  const handleLoginWithRfid = (e) => {
    e.preventDefault();

    fetch(`${process.env.NEXT_PUBLIC_FLASK_SERVER}login-with-rfid`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ rfId }),
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        if (r?.status === "ok") {
          setUser(r?.data);
          activeAuth();
          socket.emit("newUser", {
            username: r?.data,
            socketID: socket?.id,
          });
          localStorage.setItem("user", r?.data);
          setHeader("Welcome");
          onOpen();
          setTimeout(() => {
            router.push("/chat");
          }, 2500);
        } else {
          setHeader("Error");
          setErrorL(r?.status);
        }
      })
      .catch((r) => console.log(r));
  };

  const handleLoginWithFace = async (e) => {
    capture();
    image !== "" &&
      fetch(`${process.env.NEXT_PUBLIC_FLASK_SERVER}login-with-face`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ imagen: image }),
      })
        .then((r) => r.json())
        .then((r) => {
          if (r?.status === "ok") {
            setUser(r?.data);
            activeAuth();
            socket.emit("newUser", {
              username: r?.data,
              socketID: socket?.id,
            });
            setHeader("Welcome");
            localStorage.setItem("user", r?.data);
            onOpen();
            setTimeout(() => {
              router.push("/chat");
            }, 2500);
          } else {
            setHeader("Error");
            onOpen();
          }
        })

        .catch((r) => {
          setErrorF(r?.status);
        });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setFieldsRegister({ ...fieldsRegister, imagen: image2 });
    console.log(fieldsRegister.departamento);
    //Fetch para el registro
    fieldsRegister.imagen !== "" &&
      fetch(`${process.env.NEXT_PUBLIC_FLASK_SERVER}register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(fieldsRegister),
      })
        .then((r) => r.json())
        .then((r) => {
          activeAuth();
          socket.emit("newUser", {
            username: fieldsRegister?.nombre,
            socketID: socket?.id,
          });
          localStorage.setItem("user", fieldsRegister?.nombre);

          r.status === "Done" ? router.push("/chat") : console.log(r);
        })
        .catch((e) => {
          setErrorR("Ha ocurrido un error, verifica todos los campos");
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
        <AccordionItem width={"100%"}>
          <h2>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                Login
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <h2 className={Styles.homeHeader} style={{ fontWeight: "bold" }}>
                How do you want to sign in?
              </h2>
              <FormRfidFace
                activeAuth={activeAuth}
                socket={socket}
                errorL={errorL}
                setErrorL={setErrorL}
                capture={capture}
                webcamRef={webcamRef}
                errorF={errorF}
                setErrorF={setErrorF}
                fields={fieldsRegister}
                setFields={setFieldsRegister}
                router={router}
                text={"Sign in with RFid"}
                faceText="Request Face access"
                user={user}
                setUser={setUser}
                header={header}
                actionRfid={handleLoginWithRfid}
                actionFace={handleLoginWithFace}
                onOpen={onOpen}
                rfId={rfId}
                setRfId={setRfId}
                isOpen={isOpen}
                onClose={onClose}
              />
            </AccordionPanel>
          </h2>
        </AccordionItem>
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
              >
                <h2 className={Styles.homeHeader}>
                  Sign up to open the challenge chat
                </h2>
                <label htmlFor="nombre">Nombre</label>
                <Input
                  type="text"
                  minLength={6}
                  name="nombre"
                  id="nombre"
                  className={`${Styles.usernameInput}`}
                  value={fieldsRegister.nombre}
                  onChange={(e) =>
                    setFieldsRegister({
                      ...fieldsRegister,
                      nombre: e.target.value,
                    })
                  }
                />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="id">Identificación</label>
                    <Input
                      type="text"
                      minLength={6}
                      name="id"
                      id="id"
                      className={`${Styles.usernameInput}`}
                      value={fieldsRegister.id}
                      onChange={(e) =>
                        setFieldsRegister({
                          ...fieldsRegister,
                          id: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="estrato">Estrato</label>
                    <Input
                      type="number"
                      minLength={6}
                      name="estrato"
                      id="estrato"
                      className={`${Styles.usernameInput}`}
                      value={fieldsRegister.estrato}
                      onChange={(e) =>
                        setFieldsRegister({
                          ...fieldsRegister,
                          estrato: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="edad">Edad</label>
                    <Input
                      width={"90%"}
                      type="number"
                      name="edad"
                      id="edad"
                      className={`${Styles.usernameInput}`}
                      value={fieldsRegister.edad}
                      onChange={(e) =>
                        setFieldsRegister({
                          ...fieldsRegister,
                          edad: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="genero">Genero</label>
                    <Input
                      width={"90%"}
                      type="text"
                      name="genero"
                      id="genero"
                      className={`${Styles.usernameInput}`}
                      value={fieldsRegister.genero}
                      onChange={(e) =>
                        setFieldsRegister({
                          ...fieldsRegister,
                          genero: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="departamento">Departamento</label>
                    <Input
                      width={"90%"}
                      type="text"
                      name="departamento"
                      id="departamento"
                      className={`${Styles.usernameInput}`}
                      value={fieldsRegister.departamento}
                      onChange={(e) =>
                        setFieldsRegister({
                          ...fieldsRegister,
                          departamento: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="rfid">RFID</label>
                    <Input
                      width={"90%"}
                      type={"password"}
                      name="rfid"
                      id="rfid"
                      placeholder="Here will be your RFid"
                      value={fieldsRegister.rfId}
                      onChange={(e) =>
                        setFieldsRegister({
                          ...fieldsRegister,
                          rfId: e.target.value,
                        })
                      }
                      onCopy={false}
                    />
                  </div>
                </div>
                <div id="cContainer">
                  <WebcamCapture webcamRef={webcamRef2} />
                  <button type="button" onClick={capture2}>
                    Tomar foto
                  </button>
                </div>
                <h3
                  style={{
                    textAlign: "center",
                    marginBottom: "010px",
                    color: "#A0C1F7",
                  }}
                >
                  Ten en cuenta que en el momento que presiones el botón de
                  registrar, se te tomará una foto para el reconocimiento facial
                </h3>
                <button onClick={handleRegister} className={Styles.btn}>
                  Sign Up
                </button>
                {errorR !== "" && <small color="#ff3838">{errorR}</small>}
              </form>
            </AccordionPanel>
          </h2>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
export { Home };

//Headers

// {
//   method: "GET",
//   mode: "no-cors",
//   headers: {
//     "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_FLASK_SERVER,
//     "Content-Type": "application/json",
//   },
// }

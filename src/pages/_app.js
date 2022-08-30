import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { SocketProvider } from "context/SocketContext";
import { AuthContextProvider } from "context/authContext";
import "../styles/globals.css";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  sizes: {
    "3xs": "14rem",
    "2xs": "16rem",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
  },
};

const theme = extendTheme({ config });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;

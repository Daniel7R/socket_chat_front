import { SocketProvider } from "context/SocketContext";
import { AuthContextProvider } from "context/authContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </AuthContextProvider>
  );
}

export default MyApp;

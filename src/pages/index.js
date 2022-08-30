import React, { useEffect } from "react";
import { useColorMode } from "@chakra-ui/react";

import { Home, Seo } from "../components";

export default function Main() {
  const { colorMode, toggleColorMode } = useColorMode();
  useEffect(() => {
    if (colorMode === "light") {
      toggleColorMode();
    }
  }, []);
  return (
    <>
      <Seo title={"Main Menu"} />
      <Home />;
    </>
  );
}

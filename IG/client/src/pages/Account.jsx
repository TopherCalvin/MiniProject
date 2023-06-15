import { Box, Center, Flex, useMediaQuery } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { useEffect } from "react";

export default function Account() {
  return (
    <Center w={"100vw"} h={"100vh"}>
      <Flex
        paddingTop={"48px"}
        w={"100%"}
        h={"100%"}
        maxH={"667px"}
        justifyContent={"center"}
        flexDir={"column"}
        alignItems={"center"}
      >
        <Profile />
        <NavBar />
      </Flex>
    </Center>
  );
}

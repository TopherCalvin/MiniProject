import { Box, Center, Flex, useMediaQuery } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Post from "../components/content";
import { useEffect } from "react";
import TopBar from "../components/TopBar";

export default function Home() {
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
        <TopBar />
        <Post />
        <NavBar />
      </Flex>
    </Center>
  );
}

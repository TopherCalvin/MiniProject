import { Center, Flex } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import Post from "../components/content";

export default function FokusPost() {
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

import { Avatar, Flex, Icon } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";

export default function NavBar() {
  return (
    <Flex
      position={"sticky"}
      bottom={"0"}
      h={"48px"}
      justifyContent={"space-evenly"}
      w={"100%"}
      maxW={"767px"}
      padding={"5px"}
    >
      <Icon as={FaHome} fontSize={"4xl"} h={"100%"} />
      <Icon as={MdOutlineAddBox} fontSize={"4xl"} h={"100%"} />
      <Avatar h={"auto"} />
    </Flex>
  );
}

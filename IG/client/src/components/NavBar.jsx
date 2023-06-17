import { Avatar, Flex, Icon } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();
  return (
    <Flex
      position={"sticky"}
      bottom={"0"}
      h={"48px"}
      justifyContent={"space-evenly"}
      w={"100%"}
      maxW={"767px"}
      padding={"5px"}
      bgColor={"white"}
    >
      <Icon as={FaHome} fontSize={"4xl"} h={"100%"} onClick={() => nav("/")} />
      <Icon as={MdOutlineAddBox} fontSize={"4xl"} h={"100%"} />
      <Avatar
        onClick={() => nav("/account")}
        h={"auto"}
        src={userSelector.avatar_url}
      />
    </Flex>
  );
}

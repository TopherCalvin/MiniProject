import { Avatar, Box, Flex, Icon, Image } from "@chakra-ui/react";
import images from "../assets/images.png";
import { useSelector } from "react-redux";
import { useState } from "react";
import { LuMailWarning } from "react-icons/lu";

export default function TopBar() {
  const userSelector = useSelector((state) => state.auth);
  const [verif, setVerif] = useState(true);
  const [clicked, setClicked] = useState(false);

  return (
    <Flex
      width={"100%"}
      height={"48px"}
      top={"0"}
      position={"sticky"}
      padding={" 3px 0"}
      borderBottom={"1px solid silver"}
      justifyContent={"center"}
      bgColor={"white"}
      zIndex={"2"}
    >
      <Image src={images} />
      <Icon as={LuMailWarning} h={"48px"} fontSize={"20px"} color={"yellow"} />
      <Box color={"yellow"}>Verify now!!!</Box>
    </Flex>
  );
}

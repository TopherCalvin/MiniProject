import { Avatar, Flex, Image } from "@chakra-ui/react";
import images from "../assets/images.png";

export default function TopBar() {
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
    </Flex>
  );
}

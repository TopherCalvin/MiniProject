import { Avatar, Box, Flex, Icon, Image } from "@chakra-ui/react";
import images from "../assets/images.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LuMailWarning } from "react-icons/lu";
import { api } from "../api/api";

export default function TopBar() {
  const userSelector = useSelector((state) => state.auth);
  const [verif, setVerif] = useState(true);
  const handleClick = async () => {
    await api.get("/user/verify", {
      params: {
        email: userSelector.email,
      },
    });
  };
  useEffect(() => {
    if (userSelector?.id) {
      console.log(userSelector);
      if (!userSelector.verify) setVerif(false);
    }
  }, [userSelector]);

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
      {verif ? (
        <></>
      ) : (
        <Flex color={"orange"} onClick={handleClick}>
          <Icon as={LuMailWarning} h={"48px"} fontSize={"20px"} />
          <Box>Click & Verify!!!</Box>
        </Flex>
      )}
    </Flex>
  );
}

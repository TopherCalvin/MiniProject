import { Avatar, Box, Flex, Icon, Image, useToast } from "@chakra-ui/react";
import images from "../assets/images.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LuMailWarning } from "react-icons/lu";
import { api } from "../api/api";

export default function TopBar() {
  const toast = useToast();
  const userSelector = useSelector((state) => state.auth);
  const [verif, setVerif] = useState(true);
  const handleClick = async () => {
    try {
      await api
        .get("/user/verify", {
          params: {
            email: userSelector.email,
          },
        })
        .then((res) => {
          toast({
            position: "top",
            colorScheme: "cyan",
            title: "Reset Password",
            description: res.data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        });
    } catch (error) {
      console.log(error);
    }
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
        <Flex color={"orange"} onClick={handleClick} cursor={"pointer"}>
          <Icon as={LuMailWarning} h={"48px"} fontSize={"20px"} />
          <Box>Click & Verify!!!</Box>
        </Flex>
      )}
    </Flex>
  );
}

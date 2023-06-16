import {
  Flex,
  Box,
  Image,
  InputGroup,
  Input,
  Icon,
  Center,
  useToast,
} from "@chakra-ui/react";
import images from "../assets/images.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BsShieldLock } from "react-icons/bs";
import { api } from "../api/api";
export default function ForgotBox() {
  const toast = useToast();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  function inputHandler(val) {
    try {
      setEmail(val);
    } catch (error) {
      console.log(error);
    }
  }
  async function onSubmit() {
    try {
      await api
        .get("/user/forgetPass", {
          params: {
            email,
          },
        })
        .then((result) => {
          if (result.data.message == "Email isn't registered") {
            toast({
              position: "top",
              colorScheme: "red",
              title: "Reset Password",
              description: result.data.message,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } else {
            toast({
              position: "top",
              colorScheme: "cyan",
              title: "Reset Password",
              description: result.data.message,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex
      w={"100vw"}
      h={"450px"}
      minW={"175px"}
      maxW={"400px"}
      justifyContent={"space-evenly"}
      flexDir={"column"}
      alignItems={"center"}
      border={"1px solid silver"}
      borderRadius={"10px"}
    >
      <Image w={"175.5px"} h={"60px"} src={images} />
      <Box
        rowGap={"10px"}
        display={"flex"}
        flexDir={"column"}
        w={"90%"}
        alignItems={"center"}
      >
        <Box fontWeight={"700"} fontSize={"20px"}>
          Trouble logging in?
        </Box>
        <Icon as={BsShieldLock} fontSize={"80px"} />
        <Center w={"90%"} textAlign={"center"}>
          Enter your email and we'll send you a link to get back into your
          account.
        </Center>
        <Input
          h={"38px"}
          w={"90%"}
          placeholder="email"
          focusBorderColor="none"
          color={"silver"}
          border={"1px solid #80a9bb"}
          id="email"
          onChange={(e) => inputHandler(e.target.value)}
        ></Input>
        <Flex
          justifyContent={"end"}
          w={"90%"}
          color={"silver"}
          cursor={"pointer"}
          onClick={() => nav("/login")}
        >
          Back to Login
        </Flex>
      </Box>
      <Flex
        h={"32px"}
        w={"90%"}
        justifyContent={"center"}
        borderRadius={"10px"}
        bgColor={"twitter.400"}
        color={"white"}
        alignItems={"center"}
        cursor={"pointer"}
        onClick={onSubmit}
      >
        Send Login Link
      </Flex>
      <Flex
        h={"32px"}
        w={"90%"}
        cursor={"pointer"}
        color={"silver"}
        justifyContent={"center"}
        border={"1px solid silver"}
        borderRadius={"10px"}
        onClick={() => nav("/register")}
      >
        Create new Account
      </Flex>
    </Flex>
  );
}

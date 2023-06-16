import * as Yup from "yup";
import { useFormik } from "formik";
import YupPassword from "yup-password";
import {
  Box,
  Image,
  InputGroup,
  Input,
  Icon,
  InputRightElement,
  useToast,
  Flex,
  Center,
} from "@chakra-ui/react";
import images from "../assets/images.png";
import { TbAlertCircleFilled } from "react-icons/tb";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BsShieldLock } from "react-icons/bs";

export default function ForgotBox() {
  const nav = useNavigate();
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
          Reset Password
        </Box>
        <Icon as={BsShieldLock} fontSize={"80px"} />
        <Center w={"90%"} textAlign={"center"}>
          Enter your new password and we're all set
        </Center>
        <Input
          h={"38px"}
          w={"90%"}
          placeholder="New Password"
          focusBorderColor="none"
          color={"silver"}
          border={"1px solid #80a9bb"}
          id="password"
        ></Input>
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
      >
        Change Password
      </Flex>
    </Flex>
  );
}

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
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { BsShieldLock } from "react-icons/bs";
import { api } from "../api/api";

export default function ForgotBox() {
  const toast = useToast();
  const location = useLocation();
  const nav = useNavigate();
  const [seePassword, setSeePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  YupPassword(Yup);
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required("You need to enter your password")
        .min(
          8,
          "Min.password: 8 chars(uppercase, lowercase, number and symbol)"
        )
        .minLowercase(1, "password must contain at least 1 lower case letter")
        .minUppercase(1, "password must contain at least 1 upper case letter")
        .minNumbers(1, "password must contain at least 1 number")
        .minSymbols(1, "password must contain at least 1 symbol"),
      ConfirmPassword: Yup.string()
        .required("Re-enter your password")
        .oneOf([Yup.ref("password")], "Password do not match"),
    }),
    onSubmit: async () => {
      try {
        setIsLoading(true);
        const { pathname } = location;
        const resetPass = await api.patch(
          "/user/token/changePass",
          formik.values,
          {
            headers: {
              Authorization: `Bearer ${pathname.split("/")[2]}`,
            },
          }
        );
        if (resetPass.data.message == "Password has been Reset") {
          toast({
            position: "top",
            colorScheme: "cyan",
            title: "Reset Password",
            description: resetPass.data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setIsLoading(false);
          nav("/login");
        }
      } catch (err) {
        console.log(err);
        toast({
          position: "top",
          colorScheme: "red",
          title: "Reset Password",
          description: "Token has Expired",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
        nav("/login");
      }
    },
  });

  function inputHandler(event) {
    const { value, id } = event.target;
    formik.setFieldValue(id, value);
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
          Reset Password
        </Box>
        <Icon as={BsShieldLock} fontSize={"80px"} />
        <Center w={"90%"} textAlign={"center"}>
          Enter your new password and we're all set
        </Center>
        <Box w={"90%"}>
          <InputGroup w={"100%"}>
            <Input
              onChange={inputHandler}
              id="password"
              h={"38px"}
              type={seePassword ? "text" : "password"}
              focusBorderColor="none"
              placeholder="Password"
              color={"silver"}
              border={"1px solid #80a9bb"}
            ></Input>
            <InputRightElement h={"38px"} borderLeft={"1px solid #80a9bb"}>
              <Icon
                as={seePassword ? AiOutlineEyeInvisible : AiOutlineEye}
                onClick={() => setSeePassword(!seePassword)}
              />
            </InputRightElement>
          </InputGroup>
          <Box w={"100%"} color={"red"} h={"38px"}>
            {formik.errors.password ? (
              <>
                <Icon as={TbAlertCircleFilled} /> {formik.errors.password}
              </>
            ) : (
              ""
            )}
          </Box>
        </Box>
        <Box w={"90%"}>
          <Input
            onChange={inputHandler}
            id="ConfirmPassword"
            h={"38px"}
            w={"100%"}
            type={seePassword ? "text" : "password"}
            focusBorderColor="none"
            placeholder="Confirm Password"
            color={"silver"}
            border={"1px solid #80a9bb"}
          ></Input>
          <Box w={"100%"} color={"red"} h={"30px"}>
            {formik.errors.ConfirmPassword ? (
              <>
                <Icon as={TbAlertCircleFilled} />{" "}
                {formik.errors.ConfirmPassword}
              </>
            ) : (
              ""
            )}
          </Box>
        </Box>
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
        isLoading={isLoading}
        loadingText="Submitting"
        onClick={formik.handleSubmit}
      >
        Change Password
      </Flex>
    </Flex>
  );
}

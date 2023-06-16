import * as Yup from "yup";
import { useFormik } from "formik";
import YupPassword from "yup-password";
import {
  Flex,
  Box,
  Image,
  InputGroup,
  Input,
  Icon,
  InputRightElement,
  useToast,
  Button,
} from "@chakra-ui/react";
import { api } from "../api/api";
import images from "../assets/images.png";
import { TbAlertCircleFilled } from "react-icons/tb";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function RegisterBox() {
  const toast = useToast();
  const nav = useNavigate();
  const [seePassword, setSeePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  YupPassword(Yup);
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("You need to enter your email.")
        .email("Email is invalid!(example@email.com)"),
      username: Yup.string().required("Enter a username for your profile."),
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
        const regist = await api.post("/user", formik.values);
        if (regist.data.message == "your register was successful") {
          await api.get("/user/verify", {
            params: {
              email: formik.values.email,
            },
          });
          toast({
            position: "top",
            colorScheme: "cyan",
            title: "Account Creation",
            description: regist.data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setIsLoading(false);
          nav("/login");
        } else {
          toast({
            position: "top",
            colorScheme: "red",
            title: "Account Creation",
            description: regist.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  function inputHandler(event) {
    const { value, id } = event.target;
    formik.setFieldValue(id, value);
  }
  return (
    <Flex
      h={"622px"}
      w={"100vw"}
      minW={"175px"}
      maxW={"400px"}
      justifyContent={"space-evenly"}
      flexDir={"column"}
      alignItems={"center"}
      border={"1px solid silver"}
      borderRadius={"10px"}
      paddingBottom={"10px"}
    >
      <Image w={"175.5px"} h={"60px"} src={images} />
      <Box display={"flex"} flexDir={"column"} w={"90%"} alignItems={"center"}>
        <InputGroup
          display={"flex"}
          flexDir={"column"}
          w={"100%"}
          alignItems={"center"}
          rowGap={"10px"}
        >
          <Box w={"90%"}>
            <Input
              onChange={inputHandler}
              h={"38px"}
              w={"100%"}
              placeholder="Email"
              id="email"
              focusBorderColor="none"
              color={"silver"}
              border={"1px solid #80a9bb"}
            ></Input>
            <Box w={"100%"} color={"red"} h={"30px"}>
              {formik.errors.email ? (
                <>
                  <Icon as={TbAlertCircleFilled} /> {formik.errors.email}
                </>
              ) : (
                ""
              )}
            </Box>
          </Box>
          <Box w={"90%"}>
            <Input
              onChange={inputHandler}
              id="username"
              h={"38px"}
              w={"100%"}
              focusBorderColor="none"
              placeholder="Username"
              color={"silver"}
              border={"1px solid #80a9bb"}
            ></Input>
            <Box w={"100%"} color={"red"} h={"30px"}>
              {formik.errors.username ? (
                <>
                  <Icon as={TbAlertCircleFilled} /> {formik.errors.username}
                </>
              ) : (
                ""
              )}
            </Box>
          </Box>
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
        </InputGroup>
      </Box>
      <Button
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
        Sign up
      </Button>
      *when signing up verification will be sent to email
      <Flex
        h={"32px"}
        w={"90%"}
        cursor={"pointer"}
        color={"silver"}
        justifyContent={"center"}
        border={"1px solid silver"}
        borderRadius={"10px"}
        onClick={() => nav("/login")}
      >
        Have an account? Log in
      </Flex>
    </Flex>
  );
}

import {
  Flex,
  Box,
  Image,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import images from "../assets/images.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function LoginBox() {
  const nav = useNavigate();
  const [account, setAccount] = useState({
    emna: "",
    password: "",
  });
  const [seePassword, setSeePassword] = useState(false);
  function inputHandler(event) {
    const { value, id } = event.target;
    const tempObj = {};
    tempObj[id] = value;
    setAccount(...account, ...tempObj);
  }
  return (
    <Flex
      w={"100vw"}
      h={"315.5px"}
      minW={"175px"}
      maxW={"400px"}
      justifyContent={"space-evenly"}
      flexDir={"column"}
      alignItems={"center"}
      border={"1px solid silver"}
      borderRadius={"10px"}
    >
      <Image w={"175.5px"} h={"60px"} src={images} />
      <Box display={"flex"} flexDir={"column"} w={"90%"} alignItems={"center"}>
        <InputGroup
          display={"flex"}
          flexDir={"column"}
          gap={"10px"}
          w={"100%"}
          alignItems={"center"}
          rowGap={"10px"}
        >
          <Input
            h={"38px"}
            w={"90%"}
            placeholder="email/username"
            focusBorderColor="none"
            color={"silver"}
            border={"1px solid #80a9bb"}
            id="emna"
          ></Input>
          <InputGroup w={"90%"}>
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
        </InputGroup>
        <Flex
          justifyContent={"end"}
          w={"90%"}
          color={"silver"}
          cursor={"pointer"}
        >
          Forget Password
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
      >
        Login
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
        Register
      </Flex>
    </Flex>
  );
}

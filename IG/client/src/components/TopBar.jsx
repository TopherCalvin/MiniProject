import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  useToast,
} from "@chakra-ui/react";
import images from "../assets/images.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LuMailWarning } from "react-icons/lu";
import { api } from "../api/api";

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

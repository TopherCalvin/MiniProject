import { Avatar, Box, Flex, Icon, Image } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

export default function PostS() {
  return (
    <Flex
      alignItems={"center"}
      w={"100%"}
      maxW={"375px"}
      flexDir={"column"}
      border={"1px solid silver"}
    >
      <Image
        padding={"3px"}
        borderY={"1px solid silver"}
        w={"100%"}
        h={"auto"}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8B2Lf6O4o3kKWkt3b6ZkMTqLZXnU5tSC81ZbV4OIlcw&s"
      />
    </Flex>
  );
}

import { Avatar, Box, Flex, Icon, Image } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

export default function Post() {
  return (
    <Flex
      alignItems={"center"}
      w={"100%"}
      maxW={"375px"}
      flexDir={"column"}
      h={"500px"}
      border={"1px solid silver"}
    >
      <Flex w={"90%"} h={"70px"} justifyContent={"center"}>
        <Flex alignItems={"center"}>
          <Avatar />
        </Flex>
        <Flex w={"80%"} alignItems={"center"} paddingX={"10px"}>
          user.name
        </Flex>
        <Flex alignItems={"center"}>
          <Icon _hover={{ cursor: "pointer" }} as={BsThreeDots} />
        </Flex>
      </Flex>
      <Image
        padding={"3px"}
        borderY={"1px solid silver"}
        w={"100%"}
        h={"auto"}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8B2Lf6O4o3kKWkt3b6ZkMTqLZXnU5tSC81ZbV4OIlcw&s"
      />
      <Flex w={"90%"} h={"163px"} flexDir={"column"}>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          h={"40px"}
          w={"20%"}
        >
          <Icon
            fontSize={"30px"}
            as={AiOutlineHeart}
            _hover={{ cursor: "pointer" }}
          />
          <Icon
            fontSize={"30px"}
            as={FaRegCommentAlt}
            _hover={{ cursor: "pointer" }}
          />
        </Flex>
        <Box padding={"10px"}>user.id caption</Box>
      </Flex>
    </Flex>
  );
}

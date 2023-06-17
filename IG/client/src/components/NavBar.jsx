import {
  Avatar,
  Button,
  Center,
  Flex,
  Icon,
  Image,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userSelector = useSelector((state) => state.auth);
  return (
    <Flex
      position={"sticky"}
      bottom={"0"}
      h={"48px"}
      justifyContent={"space-evenly"}
      w={"100%"}
      maxW={"767px"}
      padding={"5px"}
      bgColor={"white"}
    >
      <Link to={"/"}>
        <Icon as={FaHome} fontSize={"4xl"} h={"100%"} />
      </Link>

      <Icon
        as={MdOutlineAddBox}
        fontSize={"4xl"}
        h={"100%"}
        cursor={"pointer"}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Flex
            bgColor={"white"}
            maxW={"524px"}
            w={"524px"}
            h="100%"
            borderRadius={"5px"}
            flexDir={"column"}
            pb="20px"
          >
            <Flex
              justifyContent={"space-between"}
              w="100%"
              fontSize="24px"
              padding={"24px"}
            >
              <Flex fontWeight={"bold"}>Create new post</Flex>
              <Flex alignItems={"end"}>
                <Icon
                  as={IoMdClose}
                  color="black"
                  cursor={"pointer"}
                  onClick={() => onClose()}
                ></Icon>
              </Flex>
            </Flex>
            <Flex
              padding={"0px 24px 24px 24px"}
              justifyContent={"space-between"}
            >
              <Flex flexDir={"column"} gap="10px">
                <Image w={"180px"} h="180px"></Image>
                <Input
                  accept="image/png, image/jpeg"
                  type="file"
                  display={"none"}
                ></Input>
                <Button fontWeight={"hairline"}>Change photo</Button>
              </Flex>
              <Flex flexDir={"column"} gap={"10px"}>
                <Textarea
                  w="280px"
                  h="40px"
                  placeholder="Caption"
                  resize={"none"}
                  id="desc"
                ></Textarea>
              </Flex>
            </Flex>

            <Center w="100%">
              <Center
                borderRadius={"5px"}
                fontWeight={"600"}
                color={"white"}
                bgColor={"#38A169"}
                h="48px"
                w="90%"
                cursor={"pointer"}
              >
                SAVE
              </Center>
            </Center>
          </Flex>
        </ModalContent>
      </Modal>

      <Link to={"/account"}>
        <Avatar h={"auto"} src={userSelector.avatar_url} />
      </Link>
    </Flex>
  );
}

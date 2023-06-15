import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BsGearWide, BsPersonAdd } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PostS from "../components/contentS";
import NavBar from "./NavBar";
import TopBar from "./TopBar";

export default function ProfilePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nav = useNavigate();
  return (
    <>
      <Container maxW={"400px"} height={"100vh"}>
        <TopBar />
        <Flex flexDir={"column"} width={"100%"} height={"100%"}>
          <Flex padding={"16px"}>
            <Box display={"flex"} justifyContent={"center"} width={"30%"}>
              <Avatar width={"auto"} height={"77px"}></Avatar>
            </Box>
            <Flex flexDir={"column"} gap={"12px"} width={"70%"}>
              <Flex alignItems={"center"} gap={"12px"}>
                <Text fontSize={"18px"} fontWeight={"semibold"}>
                  Username
                </Text>
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={"80%"}
                >
                  <Menu>
                    <MenuButton display={"flex"}>
                      <Icon
                        cursor={"pointer"}
                        w={"24px"}
                        h={"24px"}
                        as={MdKeyboardArrowDown}
                      ></Icon>
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        color={"red"}
                        onClick={() => {
                          localStorage.removeItem("auth");
                          nav("/login");
                        }}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Flex>
              <Button onClick={onOpen} h={"32px"}>
                Edit profile
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                  <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                      <Flex flexDir={"column"}>
                        <Box>Full Name</Box>
                        <Box>Bio</Box>
                        <Box>username must uniq</Box>
                        <Box>profile picture</Box>
                      </Flex>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="yellow" mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button
                        // variant="ghost"
                        colorScheme="blue"
                      >
                        Secondary Action
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </ModalOverlay>
              </Modal>
            </Flex>
          </Flex>
          <Center width={"100%"} padding={"0 16px 16px 16px"}>
            <Flex flexDir={"column"} width={"100%"}>
              <Text fontWeight={"bold"}>Name</Text>
              <Text>Bio</Text>
            </Flex>
          </Center>
          <Flex flexWrap={"wrap"} gap={"4px"}>
            <Box width={"32%"}>
              <PostS />
            </Box>
            <Box width={"32%"}>
              <PostS />
            </Box>
            <Box width={"32%"}>
              <PostS />
            </Box>
            <Box width={"32%"}>
              <PostS />
            </Box>
            <Box width={"32%"}>
              <PostS />
            </Box>
          </Flex>
        </Flex>
        <NavBar />
      </Container>
    </>
  );
}

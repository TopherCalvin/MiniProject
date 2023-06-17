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
  useToast,
  Input,
  Image,
} from "@chakra-ui/react";
import { BsGearWide, BsPersonAdd } from "react-icons/bs";
import { HiOutlineUpload } from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { LuMailWarning } from "react-icons/lu";
import PostS from "../components/contentS";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { api } from "../api/api";

export default function ProfilePage() {
  const userSelector = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [verif, setVerif] = useState(true);
  const [profile, setProfile] = useState({
    username: "",
    fullname: "",
    bio: "",
  });
  const nav = useNavigate();
  const toast = useToast();
  const inputFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrl, setImgUrl] = useState();
  const dispatch = useDispatch();

  function inputHandler(event) {
    try {
      const { value, id } = event.target;
      const tempObj = {};
      tempObj[id] = value;
      setProfile({ ...profile, ...tempObj });
    } catch (err) {
      console.log(err);
    }
  }
  async function handleFile(event) {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImgUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await api
        .get("/user/verify", {
          params: {
            email: userSelector.email,
          },
        })
        .then((res) => {
          toast({
            position: "top",
            colorScheme: "cyan",
            title: "Reset Password",
            description: res.data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (userSelector?.id) {
      console.log(userSelector);
      if (!userSelector.verify) setVerif(false);
    }
  }, [userSelector]);

  async function onSubmit() {
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    formData.append("fullname", profile.fullname);
    formData.append("username", profile.username);
    formData.append("bio", profile.bio);

    await api.patch("/user/" + userSelector.id, formData).then((res) => {
      toast({
        position: "top",
        colorScheme:
          res.data.message == "username already used" ||
          res.data.message == "No fields to update"
            ? "red"
            : "cyan",
        title: "Edit Profile",
        description:
          res.data.message == "username already used" ||
          res.data.message == "No fields to update"
            ? res.data.message
            : "Edit Success",
        status:
          res.data.message == "username already used" ||
          res.data.message == "No fields to update"
            ? "error"
            : "success",
        duration: 3000,
        isClosable: true,
      });
      dispatch({
        type: "login",
        payload: res.data,
      });
      setSelectedFile("");
      onClose();
      nav("/");
    });
  }
  return (
    <>
      <Container maxW={"400px"} height={"100vh"}>
        <TopBar />
        <Flex flexDir={"column"} width={"100%"} height={"100%"}>
          <Flex padding={"16px"}>
            <Box display={"flex"} justifyContent={"center"} width={"30%"}>
              <Avatar
                width={"auto"}
                height={"77px"}
                src={userSelector.avatar_url}
              ></Avatar>
            </Box>
            <Flex flexDir={"column"} gap={"12px"} width={"70%"}>
              <Flex alignItems={"center"} gap={"12px"}>
                <Text fontSize={"18px"} fontWeight={"semibold"}>
                  {userSelector.username}
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
                          dispatch({
                            type: "logout",
                          });
                          nav("/login");
                        }}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Flex>
              {verif ? (
                <Button onClick={onOpen} h={"32px"}>
                  Edit profile
                </Button>
              ) : (
                <Button
                  isLoading={isLoading}
                  color={"orange"}
                  onClick={handleClick}
                  cursor={"pointer"}
                >
                  <Icon as={LuMailWarning} h={"48px"} fontSize={"20px"} />
                  <Box>Click & Verify!!!</Box>
                </Button>
              )}

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                  <ModalContent>
                    <ModalHeader>Edit Profile</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                      <Flex flexDir={"column"} alignItems={"center"}>
                        <Input
                          h={"38px"}
                          w={"90%"}
                          placeholder="fullname"
                          focusBorderColor="none"
                          color={"silver"}
                          border={"1px solid #80a9bb"}
                          id="fullname"
                          defaultValue={userSelector.fullname}
                          onChange={inputHandler}
                        ></Input>
                        <Input
                          h={"38px"}
                          w={"90%"}
                          placeholder="bio"
                          focusBorderColor="none"
                          color={"silver"}
                          border={"1px solid #80a9bb"}
                          id="bio"
                          defaultValue={userSelector.bio}
                          onChange={inputHandler}
                        ></Input>
                        <Input
                          h={"38px"}
                          w={"90%"}
                          placeholder="username"
                          focusBorderColor="none"
                          color={"silver"}
                          border={"1px solid #80a9bb"}
                          id="username"
                          defaultValue={userSelector.username}
                          onChange={inputHandler}
                        ></Input>

                        <Input
                          accept="image/png, image/jpeg"
                          onChange={(e) => {
                            handleFile(e);
                            // inputHandler(e);
                          }}
                          ref={inputFileRef}
                          type="file"
                          display={"none"}
                          id="filename"
                        ></Input>
                        {!selectedFile ? (
                          <Box
                            display={"flex"}
                            flexDir={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            padding={"16px"}
                            gap={"16px"}
                            w={"140px"}
                            h={"160px"}
                            border={"1px dashed silver"}
                            borderRadius={"8px"}
                            flex={"none"}
                            flexGrow={"0"}
                            textAlign={"center"}
                            fontFamily={"roboto"}
                            fontStyle={"normal"}
                            fontWeight={"400"}
                            fontSize={"12px"}
                            lineHeight={"14px"}
                            color={"#353535"}
                          >
                            <Icon as={HiOutlineUpload} w={"16px"} h={"16px"} />
                            <Text as={"span"}>
                              Drag and Drop File or{" "}
                              <Text
                                as={"span"}
                                onClick={() => inputFileRef.current.click()}
                                cursor={"pointer"}
                                color={"silver"}
                                textDecor={"underline"}
                              >
                                Browse
                              </Text>
                            </Text>
                          </Box>
                        ) : (
                          <Image
                            onClick={() => setSelectedFile(0)}
                            display={"flex"}
                            flexDir={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            padding={"16px"}
                            gap={"16px"}
                            w={"140px"}
                            h={"160px"}
                            border={"1px dashed rgba(53, 53, 53, 0.3);"}
                            borderRadius={"8px"}
                            flex={"none"}
                            flexGrow={"0"}
                            textAlign={"center"}
                            fontFamily={"roboto"}
                            fontStyle={"normal"}
                            fontWeight={"400"}
                            fontSize={"12px"}
                            lineHeight={"14px"}
                            color={"#353535"}
                            src={imgUrl}
                          ></Image>
                        )}
                      </Flex>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="yellow" mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button
                        // variant="ghost"
                        colorScheme="blue"
                        onClick={() => {
                          onSubmit();
                        }}
                      >
                        Submit
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </ModalOverlay>
              </Modal>
            </Flex>
          </Flex>
          <Center width={"100%"} padding={"0 16px 16px 16px"}>
            <Flex flexDir={"column"} width={"100%"}>
              <Text fontWeight={"bold"}>{userSelector.fullname}</Text>
              <Text fontWeight={"bold"}>{userSelector.email}</Text>
              <Text>{userSelector.bio}</Text>
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

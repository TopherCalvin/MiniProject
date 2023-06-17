import {
  Avatar,
  Button,
  Center,
  Flex,
  Icon,
  Image,
  Input,
  Modal,
  Box,
  ModalContent,
  ModalOverlay,
  Textarea,
  useDisclosure,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { HiOutlineUpload } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { api } from "../api/api";

export default function NavBar() {
  const userSelector = useSelector((state) => state.auth);
  const [selectedFile, setSelectedFile] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imgUrl, setImgUrl] = useState();
  const inputFileRef = useRef(null);
  const toast = useToast();
  const [post, setPost] = useState({
    caption: "",
  });
  const nav = useNavigate();

  function inputHandler(event) {
    try {
      const { value, id } = event.target;
      const tempObj = {};
      tempObj[id] = value;
      setPost({ ...post, ...tempObj });
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

  async function onSubmit() {
    const formData = new FormData();
    formData.append("post", selectedFile);
    formData.append("caption", post.caption);
    formData.append("user_id", userSelector.id);
    if (formData.post) {
      return await api.post("/post", formData).then(() => {
        toast({
          position: "top",
          colorScheme: "cyan",
          title: "Posting",
          description: "Post Success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setPost({ caption: "" });
        setSelectedFile("");
        onClose();
        nav("/");
      });
    }
    toast({
      position: "top",
      colorScheme: "red",
      title: "Posting",
      description: "Post Failed (no picture)",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    setPost({ caption: "" });
    setSelectedFile("");
    onClose();
    nav("/");
  }

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
            w={"100%"}
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
            <Flex padding={"0px 24px 24px 24px"} justifyContent={"center"}>
              <Flex flexDir={"column"} gap="10px" alignItems={"center"}>
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
                    w={"180px"}
                    h="180px"
                    border={"1px solid silver"}
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
                    <Text as={"span"} fontWeight={"hairline"}>
                      Drag and Drop File or{" "}
                      <Text
                        fontWeight={"hairline"}
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
                <Flex flexDir={"column"} gap={"10px"}>
                  <Textarea
                    w="280px"
                    h="40px"
                    placeholder="Caption"
                    resize={"none"}
                    id="caption"
                    focusBorderColor="none"
                    onChange={inputHandler}
                  ></Textarea>
                </Flex>
              </Flex>
            </Flex>

            <Center w="100%">
              <Center
                borderRadius={"5px"}
                fontWeight={"600"}
                color={"white"}
                bgColor={"twitter.400"}
                h="48px"
                w="90%"
                cursor={"pointer"}
                onClick={onSubmit}
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

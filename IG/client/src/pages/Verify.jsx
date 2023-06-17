import { Center, Flex, Image, Spinner } from "@chakra-ui/react";
import verifi from "../assets/verifi.gif";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const [expired, setExpired] = useState(false);
  const location = useLocation();
  useEffect(() => {
    onOpen();
  }, []);
  useEffect(() => {
    if (expired == true) {
      setIsLoading(false);
    }
  }, [expired]);
  async function onOpen() {
    try {
      const { pathname } = location;
      const verify = await api.patch("user/token/verify", null, {
        headers: {
          Authorization: `Bearer ${pathname.split("/")[2]}`,
        },
      });
      setIsLoading(false);
    } catch (err) {
      setExpired(true);
      console.log(err);
    }
  }

  return (
    <>
      {isLoading ? (
        <Center h={"100vh"}>
          <Spinner />
        </Center>
      ) : (
        <Center h={"100vh"} w={"100vw"}>
          {expired ? <Flex>Token has Expired</Flex> : <Image src={verifi} />}
        </Center>
      )}
    </>
  );
}

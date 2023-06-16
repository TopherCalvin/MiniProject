import { Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedPage({ children, needLogin, guestOnly }) {
  const userSelector = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    console.log(userSelector);
  }, []);

  useEffect(() => {
    if (needLogin && !userSelector.id) {
      return nav("/login");
    } else if (guestOnly && userSelector.id) {
      return nav("/");
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [userSelector, nav]);

  return (
    <>
      {isLoading ? (
        <Center h={"100vh"}>
          <Spinner />
        </Center>
      ) : (
        children
      )}
    </>
  );
}

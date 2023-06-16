import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "../api/api";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  async function get() {
    try {
      const token = JSON.parse(localStorage.getItem("auth"));
      if (token) {
        const user = await api.get("/user/token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({
          type: "login",
          payload: user.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    get();
  }, []);
  return <>{children}</>;
}

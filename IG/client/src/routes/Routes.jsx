import { Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPass from "../pages/ForgotPass";
import ChangePass from "../pages/ChangePass";
import Verify from "../pages/Verify";
import Home from "../pages/Home";
import ProfilePage from "../components/Profile";
import FokusPost from "../pages/FokucPost";
import ProtectedPage from "./ProtectedPage";

const routes = [
  <Route
    path="/login"
    element={
      <ProtectedPage guestOnly={true}>
        <Login />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/register"
    element={
      <ProtectedPage guestOnly={true}>
        <Register />
      </ProtectedPage>
    }
  ></Route>,
  <Route path="/forgot" element={<ForgotPass />}></Route>,
  <Route path="/forgot/:token" element={<ChangePass />}></Route>,
  <Route path="/verify/:token" element={<Verify />}></Route>,
  <Route
    path="/"
    element={
      <ProtectedPage needLogin={true}>
        <Home />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/account"
    element={
      <ProtectedPage needLogin={true}>
        <ProfilePage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/post"
    element={
      <ProtectedPage needLogin={true}>
        <FokusPost />
      </ProtectedPage>
    }
  ></Route>,
];

export default routes;

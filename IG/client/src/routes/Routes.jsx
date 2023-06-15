import { Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPass from "../pages/ForgotPass";
import ChangePass from "../pages/ChangePass";
import Verify from "../pages/Verify";
import Home from "../pages/Home";
import ProfilePage from "../components/Profile";
import FokusPost from "../pages/FokucPost";

const routes = [
  <Route path="/login" element={<Login />}></Route>,
  <Route path="/register" element={<Register />}></Route>,
  <Route path="/forgot" element={<ForgotPass />}></Route>,
  <Route path="/forgot/:token" element={<ChangePass />}></Route>,
  <Route path="/verify/:token" element={<Verify />}></Route>,
  <Route path="/" element={<Home />}></Route>,
  <Route path="/account" element={<ProfilePage />}></Route>,
  <Route path="/post" element={<FokusPost />}></Route>,
];

export default routes;

const express = require("express");
const { fileUploader } = require("../middlewares/multer");
const router = express.Router();
const userController = require("../controllers").userController;

router.post("/", userController.insertUser); //register

//login
router.get("/v1", userController.getUser); // setItem localstorage token
router.get("/token", userController.getByToken, userController.getUserByToken); //login by token get item localstorage

// verify
router.get("/verify", userController.reqVerify); // verify request
router.patch("/token/verify", userController.getByToken, userController.verify); //verify from email

// edit profile
router.patch("/:id", userController.editUser);

// reset password request
router.get("/forgetPass", userController.forgetPass);
router.patch(
  "/token/changePass",
  userController.getByToken,
  userController.changePass
); // reset password

// avatar upload
router.post(
  "/image/v1/:id",
  fileUploader({ destinationFolder: "Avatar" }).single("Avatar"),
  userController.uploadAvatar
);

module.exports = router;

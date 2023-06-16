const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const verify = require("./middlewares/verify");
const cors = require("cors");

app.use(cors());
app.use(express.json());
const router = require("./routes");
const db = require("./models");
// db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });
app.use("/user", verify, router.userRouter);
app.use("/post", verify, router.postRouter);
app.use("/avatar", express.static(`${__dirname}/public/avatar`));
app.use("/postIMG", express.static(`${__dirname}/public/post`));

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});

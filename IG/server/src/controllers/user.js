const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const moment = require("moment");
const mailer = require("../lib/mailer");
const sharp = require("sharp");
const private_key = process.env.private_key;
const url = process.env.url;
const url_image = process.env.URL_IMAGE;

const userController = {
  insertUser: async (req, res) => {
    try {
      const { fullname, username, email, password } = req.body;

      const hashPassword = await bcrypt.hash(password, 10);

      await db.User.create({
        fullname,
        username,
        email,
        password: hashPassword,
      }).then(() => {
        res.send({
          message: "your register was successful",
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  getUser: async (req, res) => {
    try {
      const { emna, password } = req.query;
      const user = await db.User.findOne({
        where: {
          [Op.or]: [
            {
              name: emna,
            },
            {
              email: emna,
            },
          ],
        },
      });
      if (user) {
        const match = await bcrypt.compare(password, user.dataValues.password);
        if (match) {
          const payload = {
            id: user.dataValues.id,
          };
          const token = await db.Token.create({
            expired: moment().add(1, "days").format(),
            token: nanoid(),
            payload: JSON.stringify(payload),
            valid: true,
          });
          return res.send({
            message: "login berhasil",
            token: token.dataValues.token,
          });
        } else {
          throw new Error("login gagal");
        }
      } else {
        return res.send({
          message: "login gagal",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  editUser: async (req, res) => {
    try {
      const { fullname, username, email, bio } = req.body;
      const upClause = {};
      if (fullname) {
        upClause.fullname = fullname;
      }
      if (username) {
        upClause.username = username;
      }
      if (email) {
        upClause.email = email;
      }
      if (bio) {
        upClause.bio = bio;
      }
      if (!Object.keys(upClause).length) {
        res.status(400).send({ message: "No fields to update" });
      }
      await db.User.update(upClause, {
        where: {
          id: req.params.id,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  getByToken: async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      token = token.split(" ")[1];
      let p = await db.Token.findOne({
        where: {
          [Op.and]: [
            {
              token,
            },
            {
              expired: {
                [Op.gt]: moment("00:00:00", "hh:mm:ss").format(),
                [Op.lte]: moment().add(1, "d").format(),
              },
            },
          ],
        },
      });
      if (!p) {
        throw new Error("token has expired");
      }
      user = await db.User.findOne({
        where: {
          id: JSON.parse(p?.dataValues?.payload).id,
        },
      });
      delete user.dataValues.password;
      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  getUserByToken: async (req, res) => {
    try {
      res.send(req.user);
    } catch (error) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  forgetPass: async (req, res) => {
    try {
      const { emna } = req.query;
      const user = await db.User.findOne({
        where: {
          email: emna,
        },
      });
      if (user.dataValues) {
        await db.Token.update(
          {
            valid: false,
          },
          {
            where: {
              payload: JSON.stringify({ id: user.dataValues.id }),
              status: "FORGOT-PASSWORD",
            },
          }
        );
        const payload = {
          id: user.dataValues.id,
        };
        const generateToken = nanoid();
        const token = await db.Token.create({
          expired: moment().add(1, "d").format(),
          token: generateToken,
          payload: JSON.stringify(payload),
          status: "FORGOT-PASSWORD",
        });

        await mailer({
          subject: "Reset Password",
          to: user.dataValues.email, //email untuk forget password
          text: url + generateToken,
        });

        return res.send({
          message: "silahkan check email anda",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  changePass: async (req, res) => {
    try {
      const { token } = req.query;
      const { password } = req.body;
      const { id } = req.user;
      const hashPassword = await bcrypt.hash(password, 10);
      await db.User.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id,
          },
        }
      );
      await db.Token.update(
        {
          valid: false,
        },
        {
          where: {
            token,
          },
        }
      );
      await db.User.findOne({
        where: {
          id,
        },
      }).then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  reqVerify: async (req, res) => {
    try {
      const { email } = req.query;
      const user = await db.User.findOne({
        where: {
          email: email,
        },
      });
      if (user.dataValues) {
        await db.Token.update(
          {
            valid: false,
          },
          {
            where: {
              payload: JSON.stringify({ id: user.dataValues.id }),
              status: "VERIFY",
            },
          }
        );
        const payload = {
          id: user.dataValues.id,
        };
        const generateToken = nanoid();
        const token = await db.Token.create({
          expired: moment().add(1, "d").format(),
          token: generateToken,
          payload: JSON.stringify(payload),
          status: "VERIFY",
        });

        await mailer({
          subject: "Verify Account",
          to: user.dataValues.email, //email untuk verify
          text: url + generateToken,
        });

        return res.send({
          message: "silahkan check email anda",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  verify: async (req, res) => {
    try {
      const { token } = req.query;
      const { id } = req.user;
      await db.User.update(
        {
          verify: true,
        },
        {
          where: {
            id,
          },
        }
      );
      await db.Token.update(
        {
          valid: false,
        },
        {
          where: {
            token,
          },
        }
      );
      await db.User.findOne({
        where: {
          id,
        },
      }).then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  uploadAvatar: async (req, res) => {
    try {
      const { filename } = req.file;
      await db.User.update(
        {
          avatar_url: url_image + filename,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      await db.User.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) => res.send(result));
    } catch (error) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = userController;

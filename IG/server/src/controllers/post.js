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

const postController = {
  insertPost: async (req, res) => {
    try {
      const { image, caption, user_id } = req.body;

      await db.Post.create({
        image,
        caption,
        user_id,
      }).then(() => {
        res.send({
          message: "Post success",
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  getPost: async (req, res) => {
    try {
      const posts = await db.Post.findAll({
        where: {
          createdAt: {
            [Op.between]: [
              moment(moment("00:00:00", "hh:mm:ss")).format(),
              moment(moment("00:00:00", "hh:mm:ss")).add(1, "days").format(),
            ],
          },
        },
      });
      res.send(posts.dataValues);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  getPost1: async (req, res) => {
    try {
      const { id } = req.params;
      const posts = await db.Post.findOne({
        where: {
          id,
        },
      });
      res.send(posts.dataValues);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  editPost: async (req, res) => {
    try {
      const { user_id, image, caption } = req.body;
      const { id } = req.params;
      const upClause = {};
      if (image) {
        upClause.image = image;
      }
      if (caption) {
        upClause.caption = caption;
      }
      if (!Object.keys(upClause).length) {
        res.status(400).send({ message: "No fields to update" });
      }
      const checker = await db.Comment.findOne({
        where: {
          id,
          user_id,
        },
      });
      if (checker.dataValues.id) {
        await db.Post.update(upClause, {
          where: {
            id,
          },
        }).then(() =>
          res.send({
            message: "Post updated",
          })
        );
      }
      res.send({
        message: "wrong user",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  like: async (req, res) => {
    try {
      const { user_id, post_id } = req.query;
      const check = await db.Like.findOne({
        where: {
          user_id,
          post_id,
        },
      });
      if (check.dataValues.id) {
        await db.Like.update(
          {
            liked: !check.dataValues.liked,
          },
          {
            where: {
              post_id,
              user_id,
            },
          }
        ).then(() => {
          res.send({
            message: "Ok Jempol",
          });
        });
      }
      await db.Like.create({
        post_id,
        user_id,
        liked: true,
      }).then(() => {
        res.send({
          message: "Ok Jempol",
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  getLike: async (req, res) => {
    try {
      const { id } = req.params;
      await db.Like.count({
        where: {
          post_id: id,
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
  comment: async (req, res) => {
    try {
      const { user_id, post_id } = req.query;
      const { content } = req.body;
      await db.Comment.create({
        post_id,
        user_id,
        content: content,
      }).then(() => {
        res.send({
          message: "Ok Jempol",
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  getComment: async (req, res) => {
    try {
      const { id, limit } = req.params;
      await db.Comment.findAll({
        include: [
          {
            model: db.User,
          },
        ],
        where: {
          post_id: id,
        },
        order: [[createdAt, "ASC"]],
        limit: limit ? null : 5,
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
  editComment: async (req, res) => {
    try {
      const { user_id, content, id } = req.body;
      const checker = await db.Comment.findOne({
        where: {
          user_id,
          id,
        },
      });
      if (checker.dataValues.id) {
        await db.Comment.update(
          {
            content: content,
          },
          {
            where: {
              user_id,
              id,
            },
          }
        ).then(() =>
          res.send({
            message: "Comment edited",
          })
        );
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const { user_id } = req.query;
      const checker = await db.Post.findOne({
        where: {
          id,
          user_id,
        },
      });
      if (checker.dataValues.id) {
        await db.Post.destroy({
          where: {
            id,
          },
        }).then(() => {
          res.send({
            message: "Delete post success",
          });
        });
      }
      res.send({
        message: "user doesn't match",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      const { user_id } = req.query;
      const checker = await db.Comment.findOne({
        where: {
          id,
          user_id,
        },
      });
      if (checker.dataValues.id) {
        await db.Comment.destroy({
          where: {
            id,
          },
        }).then(() => {
          res.send({
            message: "Delete comment success",
          });
        });
      }
      res.send({
        message: "user doesn't match",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
};
module.exports = postController;

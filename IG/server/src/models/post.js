module.exports = (sequelize, Sequelize) => {
  const post = sequelize.define(
    "Posts",
    {
      image: Sequelize.STRING,
      caption: Sequelize.STRING,
    },
    {
      paranoid: true,
    }
  );
  return post;
};

module.exports = (sequelize, Sequelize) => {
  const comment = sequelize.define(
    "Comments",
    {
      content: Sequelize.STRING,
    },
    {
      paranoid: true,
    }
  );
  return comment;
};

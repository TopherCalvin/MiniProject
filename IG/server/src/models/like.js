module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define(
    "Likes",
    {
      liked: Sequelize.BOOLEAN,
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      post_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    },
    {
      paranoid: true,
    }
  );
  return Like;
};

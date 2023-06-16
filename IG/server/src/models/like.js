module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define(
    "Likes",
    {
      liked: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
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

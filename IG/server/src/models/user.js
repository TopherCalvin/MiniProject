module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "Users",
    {
      fullname: Sequelize.STRING,
      username: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      bio: Sequelize.STRING,
      avatar_url: Sequelize.STRING,
      verify: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      paranoid: true,
    }
  );
  return user;
};

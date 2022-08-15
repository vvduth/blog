
module.exports = (sequelize:any, Sequelize:any) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      date_created: {
        timestamp: true,
        date_created: true
      }
    });
    return User;
  };
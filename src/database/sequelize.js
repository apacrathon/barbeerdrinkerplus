const Sequelize = require('sequelize');

module.exports = {
  Connect: function(Host, Database, Username, Password)
  {
    return new Sequelize(Database, Username, Password, {
      host: Host,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
    });
  }
};



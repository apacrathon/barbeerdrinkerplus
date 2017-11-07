const config = require('./database/config.json');
const Sequelize = require('./database/sequelize.js').Connect(config.host, config.database, config.username, config.password);

const bar = require('./database/models/bar.js');

module.exports.sequelize = function() { return Sequelize; }

module.exports.run = function() {
  /*
    YOUR "MAIN"
   */
}


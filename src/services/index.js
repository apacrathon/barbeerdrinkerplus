const bars = require('./bars/bars.service.js');
const users = require('./users/users.service.js');
const ratings = require('./ratings/ratings.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(bars);
  app.configure(users);
  app.configure(ratings);
};

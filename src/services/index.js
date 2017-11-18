const bars = require('./bars/bars.service.js');
const drinkers = require('./drinkers/drinkers.service.js');
const users = require('./users/users.service.js');
const ratings = require('./ratings/ratings.service.js');
const sells = require('./sells/sells.service.js');
const happyhour = require('./happyhour/happyhour.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(bars);
  app.configure(drinkers);
  app.configure(users);
  app.configure(ratings);
  app.configure(sells);
  app.configure(happyhour);
};

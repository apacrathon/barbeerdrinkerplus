const bars = require('./bars/bars.service.js');
const drinkers = require('./drinkers/drinkers.service.js');
const users = require('./users/users.service.js');
const ratings = require('./ratings/ratings.service.js');
const sells = require('./sells/sells.service.js');
const happyhour = require('./happyhour/happyhour.service.js');
const frequents = require('./frequents/frequents.service.js');
const checkin = require('./checkin/checkin.service.js');
const drink = require('./drink/drink.service.js');
const likes = require('./likes/likes.service.js');
const bartimes = require('./bartimes/bartimes.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(bars);
  app.configure(drinkers);
  app.configure(users);
  app.configure(ratings);
  app.configure(sells);
  app.configure(happyhour);
  app.configure(frequents);
  app.configure(checkin);
  app.configure(drink);
  app.configure(likes);
  app.configure(bartimes);
};

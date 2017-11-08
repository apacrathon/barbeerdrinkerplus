const bars = require('./bars/bars.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(bars);
};

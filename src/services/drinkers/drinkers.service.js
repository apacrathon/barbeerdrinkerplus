// Initializes the `drinkers` service on path `/drinkers`
const createService = require('feathers-sequelize');
const createModel = require('../../models/drinkers.model');
const hooks = require('./drinkers.hooks');
const filters = require('./drinkers.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'drinkers',
    Model,
    paginate: {
      default: 1,
      max: 15000
    }
  };

  // Initialize our service with any options it requires
  app.use('/drinkers', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('drinkers');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

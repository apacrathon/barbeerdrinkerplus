// Initializes the `drink` service on path `/drink`
const createService = require('feathers-sequelize');
const createModel = require('../../models/drink.model');
const hooks = require('./drink.hooks');
const filters = require('./drink.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'drink',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/drink', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('drink');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

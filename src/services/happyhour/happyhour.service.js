// Initializes the `happyhour` service on path `/happyhour`
const createService = require('feathers-sequelize');
const createModel = require('../../models/happyhour.model');
const hooks = require('./happyhour.hooks');
const filters = require('./happyhour.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'happyhour',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/happyhour', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('happyhour');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

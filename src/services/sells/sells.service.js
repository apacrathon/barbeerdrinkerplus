// Initializes the `sells` service on path `/sells`
const createService = require('feathers-sequelize');
const createModel = require('../../models/sells.model');
const hooks = require('./sells.hooks');
const filters = require('./sells.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'sells',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sells', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('sells');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

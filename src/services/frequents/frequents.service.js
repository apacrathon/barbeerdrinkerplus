// Initializes the `frequents` service on path `/frequents`
const createService = require('feathers-sequelize');
const createModel = require('../../models/frequents.model');
const hooks = require('./frequents.hooks');
const filters = require('./frequents.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'frequents',
    Model,
    paginate: {
      default: 1,
      max: 1001
    }
  };

  // Initialize our service with any options it requires
  app.use('/frequents', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('frequents');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

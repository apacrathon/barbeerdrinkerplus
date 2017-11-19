// Initializes the `following` service on path `/following`
const createService = require('feathers-sequelize');
const createModel = require('../../models/following.model');
const hooks = require('./following.hooks');
const filters = require('./following.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'following',
    Model,
    paginate: {
      default: 1,
      max: 500
    }
  };

  // Initialize our service with any options it requires
  app.use('/following', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('following');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

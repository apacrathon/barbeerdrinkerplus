// Initializes the `bar` service on path `/bar`
const createService = require('feathers-sequelize');
const createModel = require('../../models/bars.model');
const hooks = require('./bars.hooks');
const filters = require('./bars.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'bars',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/bars', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('bars');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

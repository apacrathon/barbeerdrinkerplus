// Initializes the `bartimes` service on path `/bartimes`
const createService = require('feathers-sequelize');
const createModel = require('../../models/bartimes.model');
const hooks = require('./bartimes.hooks');
const filters = require('./bartimes.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'bartimes',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/bartimes', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('bartimes');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

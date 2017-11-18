// Initializes the `checkin` service on path `/checkin`
const createService = require('feathers-sequelize');
const createModel = require('../../models/checkin.model');
const hooks = require('./checkin.hooks');
const filters = require('./checkin.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'checkin',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/checkin', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('checkin');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

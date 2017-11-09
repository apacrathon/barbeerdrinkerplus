'use strict';

module.exports = {
  before: {
    all: [],
    find: [
      function(hook) {
        const sequelize = hook.app.get('sequelizeClient');

        hook.params.sequelize = {
          include: [ Bars ]
        }
      }
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [
      function(hook) {
        if (hook.params.provider == 'rest') { throw new Error('You cannot delete a bar via REST'); }
      }
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
